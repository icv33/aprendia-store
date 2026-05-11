import { NextResponse } from "next/server";
import { sendDownloadEmail } from "@/lib/email";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const to = searchParams.get("to") || "ignacio210307@gmail.com";

  try {
    await sendDownloadEmail({
      to,
      name: "Ignacio",
      downloads: [
        { title: "Cocina con IA: 100 recetas inteligentes", token: "demo-token-test-123" },
      ],
    });
    return NextResponse.json({ ok: true, sentTo: to });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
