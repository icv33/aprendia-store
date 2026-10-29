import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw || req.headers.get("x-admin-password") !== pw) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes("placeholder")) {
    return NextResponse.json([]);
  }

  try {
    const { prisma } = await import("@/lib/prisma");
    const ebooks = await prisma.ebook.findMany({
      select: { id: true, title: true, price: true, category: true, badge: true, published: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(ebooks);
  } catch {
    return NextResponse.json([]);
  }
}
