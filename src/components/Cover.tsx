"use client";
import type { Book } from "@/types";

interface CoverProps {
  book: Book;
  size?: "sm" | "md" | "lg";
  hideTitle?: boolean;
  overrideBg?: string;
}

export default function Cover({ book, size = "md", hideTitle = false, overrideBg }: CoverProps) {
  const c = book.cover;
  const bg = overrideBg || c.bg;
  const titleSize =
    size === "lg" ? "clamp(22px, 3vw, 34px)" : size === "sm" ? "10px" : "clamp(13px, 1.6vw, 20px)";
  const monoSize = size === "lg" ? 11 : size === "sm" ? 6 : 9;

  if (hideTitle) {
    return (
      <div className="cover" style={{ background: bg, color: c.ink }}>
        <div style={{ position: "absolute", inset: "7%", border: "1px solid currentColor", opacity: 0.22, borderRadius: 1, pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.5em" }}>
          <span style={{ fontFamily: "var(--mono)", fontSize: monoSize, letterSpacing: ".25em", opacity: 0.55, textTransform: "uppercase" }}>Editorial digital</span>
          <h3 className="serif" style={{ fontStyle: "italic", fontWeight: 400, fontSize: "clamp(28px, 3.4vw, 44px)", letterSpacing: "-0.025em", margin: 0, lineHeight: 1, color: c.ink }}>
            aprendia
          </h3>
          <span style={{ display: "inline-block", width: "32%", height: 1, background: "currentColor", opacity: 0.4, marginTop: 4 }} />
        </div>
      </div>
    );
  }

  return (
    <div className="cover" style={{ background: bg, color: c.ink }}>
      {c.motif === "tri" && (
        <>
          <div className="cover-band top">
            <span className="cover-mono" style={{ fontSize: monoSize }}>APRENDIA</span>
          </div>
          <div className="cover-band bottom">
            <span className="cover-mono" style={{ fontSize: monoSize }}>{book.cat.toUpperCase()}</span>
          </div>
        </>
      )}
      {c.motif === "spine" && (
        <div style={{ position: "absolute", top: "8%", left: "12%", right: "12%", display: "flex", justifyContent: "center", fontFamily: "var(--mono)", fontSize: monoSize, letterSpacing: ".25em", opacity: 0.7 }}>
          <span>APRENDIA</span>
        </div>
      )}
      {c.motif === "rule" && (
        <>
          <div style={{ position: "absolute", left: "12%", right: "12%", top: "11%", height: 1, background: "currentColor", opacity: 0.35 }} />
          <div style={{ position: "absolute", left: "12%", top: "14%", fontFamily: "var(--mono)", fontSize: monoSize, letterSpacing: ".25em", opacity: 0.6 }}>APRENDIA</div>
        </>
      )}
      <div style={{
        position: "absolute",
        left: "12%", right: "12%",
        top: c.motif === "tri" ? "30%" : "28%",
        bottom: c.motif === "tri" ? "22%" : "14%",
        display: "flex", flexDirection: "column", justifyContent: "center",
      }}>
        <h3 style={{
          fontFamily: "var(--serif)",
          fontWeight: 400,
          fontStyle: c.motif === "rule" ? "normal" : "italic",
          fontSize: titleSize,
          letterSpacing: "-0.02em",
          lineHeight: 1.05,
          margin: 0,
          color: c.ink,
        }}>
          {book.title}
        </h3>
      </div>
    </div>
  );
}
