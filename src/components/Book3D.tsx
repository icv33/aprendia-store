"use client";
import type { Book } from "@/types";
import Cover from "./Cover";

interface Book3DProps {
  book: Book;
  width?: number;
  height?: number;
  spinSeconds?: number;
  overrideBg?: string;
  hideTitle?: boolean;
}

export default function Book3D({ book, width = 260, height = 380, spinSeconds = 18, overrideBg, hideTitle = false }: Book3DProps) {
  const depth = 30;
  const w = width;
  const h = height;
  const c = book.cover;
  const backBg = overrideBg || c.bg;

  const faceBase: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    backfaceVisibility: "hidden",
  };

  const pagesBg = "repeating-linear-gradient(180deg, #f3ecd9 0 1px, #ddd1ac 1px 2px)";

  return (
    <div className="book-3d-stage" style={{ width: w, height: h }}>
      <div className="book-3d-float">
        <div
          className="book-3d"
          style={{
            ["--book-w" as string]: w + "px",
            ["--book-h" as string]: h + "px",
            ["--book-spin" as string]: spinSeconds + "s",
          }}
        >
          {/* FRONT */}
          <div style={{ ...faceBase, width: w, height: h, marginLeft: -w / 2, marginTop: -h / 2, transform: `translateZ(${depth / 2}px)` }}>
            <Cover book={book} size="lg" overrideBg={overrideBg} hideTitle={hideTitle} />
          </div>
          {/* BACK */}
          <div style={{
            ...faceBase, width: w, height: h,
            marginLeft: -w / 2, marginTop: -h / 2,
            transform: `rotateY(180deg) translateZ(${depth / 2}px)`,
            background: backBg, borderRadius: "4px 2px 2px 4px",
            display: "flex", alignItems: "flex-end", justifyContent: "center",
            padding: 24, color: c.ink, fontFamily: "var(--mono)", fontSize: 10,
            letterSpacing: ".18em", textTransform: "uppercase",
          }}>
            APRENDIA · {book.year}
          </div>
          {/* RIGHT (fore-edge) */}
          <div style={{
            ...faceBase, width: depth, height: h,
            marginLeft: -depth / 2, marginTop: -h / 2,
            transform: `rotateY(90deg) translateZ(${w / 2}px)`,
            background: pagesBg,
          }} />
          {/* LEFT (spine) */}
          <div style={{
            ...faceBase, width: depth, height: h,
            marginLeft: -depth / 2, marginTop: -h / 2,
            transform: `rotateY(-90deg) translateZ(${w / 2}px)`,
            background: backBg, display: "flex", alignItems: "center", justifyContent: "center",
            color: c.ink,
            boxShadow: "inset 2px 0 4px rgba(0,0,0,.18), inset -2px 0 4px rgba(0,0,0,.18)",
          }}>
            <span style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 13, letterSpacing: ".05em" }}>
              aprendia
            </span>
          </div>
          {/* TOP */}
          <div style={{
            ...faceBase, width: w, height: depth,
            marginLeft: -w / 2, marginTop: -depth / 2,
            transform: `rotateX(90deg) translateZ(${h / 2}px)`,
            background: pagesBg,
          }} />
          {/* BOTTOM */}
          <div style={{
            ...faceBase, width: w, height: depth,
            marginLeft: -w / 2, marginTop: -depth / 2,
            transform: `rotateX(-90deg) translateZ(${h / 2}px)`,
            background: pagesBg,
          }} />
        </div>
      </div>
      <div className="book-shadow" />
    </div>
  );
}
