import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }

  const body = await req.text();
  const sig = headers().get("stripe-signature");

  if (!sig) return NextResponse.json({ error: "No signature" }, { status: 400 });

  try {
    const { stripe } = await import("@/lib/stripe");
    const { prisma } = await import("@/lib/prisma");
    const { sendDownloadEmail } = await import("@/lib/email");

    const event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as {
        id: string;
        customer_email?: string | null;
        metadata?: { name?: string; itemIds?: string } | null;
        amount_total?: number | null;
      };

      const email = session.customer_email || "";
      const name = session.metadata?.name || "Lector";
      const itemIds: string[] = JSON.parse(session.metadata?.itemIds || "[]");

      const { BOOKS } = await import("@/lib/data");
      const downloads: Array<{ title: string; token: string }> = [];

      try {
        const order = await prisma.order.create({
          data: {
            email,
            name,
            total: (session.amount_total || 0) / 100,
            status: "paid",
            stripeId: session.id,
            items: {
              create: itemIds.map((ebookId) => ({ ebookId, price: 0, qty: 1 })),
            },
          },
        });

        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

        for (const ebookId of itemIds) {
          const dl = await prisma.download.create({
            data: { orderId: order.id, ebookId, expiresAt },
          });
          const ebook = await prisma.ebook.findUnique({ where: { id: ebookId } });
          downloads.push({ title: ebook?.title || ebookId, token: dl.token });
        }
      } catch (dbErr) {
        console.error("[webhook] DB unavailable, sending email without DB tokens:", dbErr);
        const crypto = await import("crypto");
        for (const ebookId of itemIds) {
          const book = BOOKS.find((b) => b.id === ebookId);
          downloads.push({
            title: book?.title || ebookId,
            token: crypto.randomUUID(),
          });
        }
      }

      await sendDownloadEmail({ to: email, name, downloads });
    }

    return NextResponse.json({ received: true });
  } catch (err: unknown) {
    console.error("[webhook]", err);
    return NextResponse.json({ error: "Webhook error" }, { status: 400 });
  }
}
