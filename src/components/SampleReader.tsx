"use client";
import { useState, useEffect } from "react";
import type { Book } from "@/types";
import { CATEGORIES } from "@/lib/data";

export default function SampleReader({ book }: { book: Book }) {
  const cat = CATEGORIES.find((c) => c.id === book.cat);
  const [spread, setSpread] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [mPage, setMPage] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 720px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const tocItems = book.includes.slice(0, 6);

  const pages = [
    // Page 0 — cover
    <div key="cover" style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "10% 12%", textAlign: "center" }}>
      <div className="cover-mono" style={{ opacity: 0.55, marginBottom: 18 }}>APRENDIA · {(cat?.name || "").toUpperCase()}</div>
      <div style={{ width: 28, height: 1, background: "var(--ink)", opacity: 0.3, marginBottom: 28 }} />
      <h4 className="serif" style={{ fontSize: "clamp(20px, 2.4vw, 30px)", fontStyle: "italic", fontWeight: 400, lineHeight: 1.15, margin: 0, letterSpacing: "-0.02em" }}>
        {book.title}
      </h4>
      <div className="caption" style={{ marginTop: 22, opacity: 0.7 }}>{book.author}</div>
      <div style={{ flex: 1 }} />
      <div className="cover-mono" style={{ opacity: 0.45, fontSize: 9 }}>EDICIÓN DIGITAL · {book.year}</div>
    </div>,

    // Page 1 — Index
    <div key="toc" style={{ height: "100%", padding: "12% 12% 10%", display: "flex", flexDirection: "column" }}>
      <div className="cover-mono" style={{ opacity: 0.55, marginBottom: 8 }}>ÍNDICE</div>
      <div style={{ height: 1, background: "var(--ink)", opacity: 0.15, marginBottom: 24 }} />
      <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
        {tocItems.map((x, i) => (
          <li key={i} style={{ display: "flex", alignItems: "baseline", gap: 10, fontFamily: "var(--serif)", fontSize: "clamp(13px, 1.1vw, 16px)" }}>
            <span className="cover-mono" style={{ width: 22, opacity: 0.55, fontSize: 10 }}>{String(i + 1).padStart(2, "0")}</span>
            <span style={{ flex: 1, fontStyle: "italic" }}>{x}</span>
            <span style={{ flex: 1, borderBottom: "1px dotted var(--rule)", margin: "0 6px", transform: "translateY(-3px)" }} />
            <span className="cover-mono" style={{ opacity: 0.55, fontSize: 10 }}>{String((i + 1) * 14).padStart(3, "0")}</span>
          </li>
        ))}
      </ol>
      <div style={{ flex: 1 }} />
      <div className="cover-mono" style={{ opacity: 0.4, fontSize: 9, alignSelf: "flex-end" }}>— III —</div>
    </div>,

    // Page 2 — First content
    <div key="content" style={{ height: "100%", padding: "12% 12% 10%", display: "flex", flexDirection: "column" }}>
      <div className="cover-mono" style={{ opacity: 0.55, marginBottom: 8 }}>CAPÍTULO I</div>
      <h4 className="serif" style={{ fontSize: "clamp(20px, 2.2vw, 28px)", fontStyle: "italic", fontWeight: 400, margin: "4px 0 24px", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
        {tocItems[0] || "Introducción"}
      </h4>
      <p className="serif" style={{ fontSize: "clamp(13px, 1.05vw, 15px)", lineHeight: 1.65, margin: 0, color: "var(--ink-soft)" }}>
        <span style={{ float: "left", fontFamily: "var(--serif)", fontSize: "3.4em", lineHeight: 0.85, paddingRight: 8, paddingTop: 4, fontStyle: "italic" }}>L</span>
        {book.long}
      </p>
      <p className="serif" style={{ fontSize: "clamp(13px, 1.05vw, 15px)", lineHeight: 1.65, marginTop: 16, color: "var(--ink-soft)", fontStyle: "italic" }}>
        {book.short}
      </p>
      <div style={{ flex: 1 }} />
      <div className="cover-mono" style={{ opacity: 0.4, fontSize: 9, alignSelf: "flex-end" }}>— 1 —</div>
    </div>,
  ];

  const totalSpreads = pages.length - 1;
  const canPrev = isMobile ? mPage > 0 : spread > 0;
  const canNext = isMobile ? mPage < pages.length - 1 : spread < totalSpreads - 1;
  const onPrev = () => isMobile ? setMPage((p) => Math.max(0, p - 1)) : setSpread((s) => Math.max(0, s - 1));
  const onNext = () => isMobile ? setMPage((p) => Math.min(pages.length - 1, p + 1)) : setSpread((s) => Math.min(totalSpreads - 1, s + 1));
  const leftIdx = spread;
  const rightIdx = spread + 1;

  const arrowStyle = (active: boolean): React.CSSProperties => ({
    position: "absolute", top: "50%", transform: "translateY(-50%)",
    background: "transparent", border: 0, cursor: active ? "pointer" : "default",
    opacity: active ? 0.7 : 0.18, transition: "opacity .2s",
    padding: 8, color: "var(--ink)",
  });

  return (
    <div style={{ marginTop: 8, marginBottom: 8 }}>
      <div className="eyebrow" style={{ marginBottom: 14 }}>Muestra</div>
      <h3 className="serif" style={{ fontSize: "clamp(22px, 2.4vw, 32px)", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.02em", margin: "0 0 22px", lineHeight: 1.1 }}>
        Leer las primeras páginas
      </h3>

      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", padding: "8px 28px" }}>
        <button onClick={onPrev} disabled={!canPrev} aria-label="Página anterior" style={{ ...arrowStyle(canPrev), left: -4 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><polyline points="15 18 9 12 15 6" /></svg>
        </button>

        <div style={{
          width: "100%", maxWidth: 560,
          aspectRatio: isMobile ? "0.72 / 1" : "1.42 / 1",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          position: "relative",
        }}>
          {isMobile ? (
            <div style={{ background: "var(--paper)", boxShadow: "0 1px 2px rgba(20,17,12,.05), 0 18px 40px -18px rgba(20,17,12,.25), 0 6px 14px -6px rgba(20,17,12,.12)", borderRadius: 2, overflow: "hidden", position: "relative" }}>
              {pages[mPage]}
            </div>
          ) : (
            <>
              <div style={{ background: "var(--paper)", boxShadow: "inset -8px 0 18px -10px rgba(20,17,12,.18), 0 18px 40px -18px rgba(20,17,12,.28), 0 6px 14px -6px rgba(20,17,12,.12)", borderRadius: "2px 0 0 2px", overflow: "hidden", position: "relative" }}>
                {pages[leftIdx]}
              </div>
              <div style={{ background: "var(--paper)", boxShadow: "inset 8px 0 18px -10px rgba(20,17,12,.18), 0 18px 40px -18px rgba(20,17,12,.28), 0 6px 14px -6px rgba(20,17,12,.12)", borderRadius: "0 2px 2px 0", overflow: "hidden", position: "relative" }}>
                {pages[rightIdx]}
              </div>
              <div aria-hidden style={{ position: "absolute", top: "3%", bottom: "3%", left: "50%", width: 1, background: "linear-gradient(180deg, transparent, rgba(20,17,12,.18), transparent)", transform: "translateX(-0.5px)", pointerEvents: "none" }} />
            </>
          )}
        </div>

        <button onClick={onNext} disabled={!canNext} aria-label="Página siguiente" style={{ ...arrowStyle(canNext), right: -4 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 14, gap: 16, flexWrap: "wrap" }}>
        <div className="caption" style={{ color: "var(--ink-mute)", letterSpacing: ".14em" }}>
          MUESTRA GRATUITA · 3 PÁGINAS · SIN REGISTRO
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {[0, 1, 2].map((i) => {
            const active = isMobile ? i === mPage : (i === leftIdx || i === rightIdx);
            return (
              <span key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: active ? "var(--ink)" : "var(--rule)", opacity: active ? 0.55 : 1, transition: "background .2s" }} />
            );
          })}
        </div>
      </div>
    </div>
  );
}
