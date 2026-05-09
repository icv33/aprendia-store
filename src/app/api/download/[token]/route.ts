import { NextRequest, NextResponse } from "next/server";

const RATE_LIMIT = new Map<string, number>();

export async function GET(req: NextRequest, { params }: { params: { token: string } }) {
  const { token } = params;
  const ip = req.headers.get("x-forwarded-for") || "unknown";

  // Simple rate limiting: 10 requests per minute per IP
  const now = Date.now();
  const key = `${ip}-${Math.floor(now / 60000)}`;
  const count = (RATE_LIMIT.get(key) || 0) + 1;
  RATE_LIMIT.set(key, count);
  if (count > 10) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes("placeholder")) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  try {
    const { prisma } = await import("@/lib/prisma");

    const dl = await prisma.download.findUnique({ where: { token } });
    if (!dl) return NextResponse.json({ error: "Enlace no encontrado" }, { status: 404 });
    if (dl.expiresAt < new Date()) return NextResponse.json({ error: "Enlace expirado" }, { status: 410 });

    await prisma.download.update({ where: { token }, data: { usedAt: new Date() } });

    const ebook = await prisma.ebook.findUnique({ where: { id: dl.ebookId } });
    if (!ebook?.pdfUrl) return NextResponse.json({ error: "Archivo no disponible" }, { status: 404 });

    return NextResponse.redirect(ebook.pdfUrl);
  } catch (err: unknown) {
    console.error("[download]", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
