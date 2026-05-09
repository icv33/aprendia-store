import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

export async function POST(req: NextRequest) {
  try {
    const { items, email, name } = await req.json();

    if (!items?.length || !email || !name) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }

    // Only import stripe if secret key is set
    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === "sk_test_placeholder") {
      // Demo mode: redirect to success
      return NextResponse.json({ url: `${BASE_URL}/success?demo=1` });
    }

    const { stripe } = await import("@/lib/stripe");

    const lineItems = items.map((it: { title: string; price: number; qty: number }) => ({
      price_data: {
        currency: "eur",
        product_data: { name: it.title },
        unit_amount: Math.round(it.price * 100),
      },
      quantity: it.qty,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      customer_email: email,
      metadata: { name, itemIds: JSON.stringify(items.map((i: { id: string }) => i.id)) },
      success_url: `${BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/checkout`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    console.error("[checkout]", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
