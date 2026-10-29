import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { MotifArt } from "@/components/Cover";
import { type Book, books } from "@/lib/books";

// Imagen que enseñan LinkedIn, WhatsApp, etc. al compartir la web
export const alt = "Aprendia: guías de IA que se leen de una sentada";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fontDir = join(process.cwd(), "assets");

function FlatCover({ book, rotate, x, y }: { book: Book; rotate: number; x: number; y: number }) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 250,
        height: 350,
        display: "flex",
        background: book.color,
        color: book.ink,
        borderRadius: "3px 8px 8px 3px",
        transform: `rotate(${rotate}deg)`,
        boxShadow: "14px 16px 0 rgba(0,0,0,0.35)",
        overflow: "hidden",
      }}
    >
      <svg width="250" height="350" viewBox="0 0 300 420" style={{ position: "absolute", left: 0, top: 0 }}>
        {MotifArt({ motif: book.motif, ink: book.ink, accent: book.accent })}
      </svg>
      <div style={{ display: "flex", flexDirection: "column", padding: "28px 22px 0 28px" }}>
        <div style={{ fontFamily: "Young Serif", fontSize: 32, lineHeight: 1 }}>{book.title}</div>
        <div style={{ fontFamily: "Hanken Grotesk", fontSize: 12, marginTop: 12 }}>{book.author}</div>
      </div>
    </div>
  );
}

export default async function Image() {
  const [serif, sans] = await Promise.all([
    readFile(join(fontDir, "YoungSerif-Regular.woff")),
    readFile(join(fontDir, "HankenGrotesk-SemiBold.woff")),
  ]);
  const [a, b, c] = [books[4], books[1], books[0]];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#24272C",
          color: "#EDEDEA",
          padding: "64px 72px",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 560 }}>
          <div style={{ fontFamily: "Young Serif", fontSize: 34, color: "#D9CDB4" }}>aprendia</div>
          <div style={{ fontFamily: "Young Serif", fontSize: 76, lineHeight: 0.98, letterSpacing: -1.5 }}>
            Guías de IA que se leen de una sentada.
          </div>
          <div style={{ fontFamily: "Hanken Grotesk", fontSize: 22, color: "rgba(237,237,234,0.7)" }}>
            Seis libros cortos y prácticos sobre inteligencia artificial
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            right: 70,
            top: 85,
            width: 460,
            height: 460,
            borderRadius: 999,
            background: "#3A3E45",
          }}
        />
        <FlatCover book={a} rotate={-9} x={690} y={150} />
        <FlatCover book={b} rotate={6} x={880} y={120} />
        <FlatCover book={c} rotate={-2} x={790} y={210} />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Young Serif", data: serif, weight: 400, style: "normal" },
        { name: "Hanken Grotesk", data: sans, weight: 600, style: "normal" },
      ],
    },
  );
}
