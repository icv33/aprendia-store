"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { BOOKS } from "@/lib/data";
import Cover from "./Cover";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ open, onClose }: Props) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
    else setQ("");
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const results = q.length < 2 ? [] : BOOKS.filter((b) =>
    b.title.toLowerCase().includes(q.toLowerCase()) ||
    b.author.toLowerCase().includes(q.toLowerCase())
  );

  if (!open) return null;

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 220,
      background: "rgba(20,17,12,.55)",
      backdropFilter: "blur(8px)",
      animation: "fadeIn .2s",
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: "var(--paper)", maxWidth: 720, margin: "100px auto 0",
        borderRadius: 4, border: "1px solid var(--rule)", overflow: "hidden",
        boxShadow: "0 30px 80px rgba(0,0,0,.3)",
      }}>
        <div style={{ display: "flex", alignItems: "center", padding: "0 24px", borderBottom: "1px solid var(--rule)" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7" fill="none">
            <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="Busca por título, autor o tema…"
            style={{
              flex: 1, height: 64, border: 0, background: "transparent", outline: "none",
              fontFamily: "var(--serif)", fontSize: 22, fontStyle: "italic",
              padding: "0 16px", color: "var(--ink)",
            }} />
          <span className="caption">ESC ↩</span>
        </div>
        <div style={{ padding: 16, maxHeight: 420, overflowY: "auto" }}>
          {q.length < 2 ? (
            <div style={{ padding: 32 }}>
              <div className="caption" style={{ marginBottom: 12 }}>SUGERENCIAS</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["Pan de masa madre", "Prompts IA", "Maternidad", "Productividad"].map((s) => (
                  <button key={s} className="tag outline" style={{ height: 30, cursor: "pointer" }} onClick={() => setQ(s)}>{s}</button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div style={{ padding: 32, color: "var(--ink-mute)" }}>Sin resultados para &quot;{q}&quot;.</div>
          ) : (
            results.map((r) => (
              <button key={r.id} onClick={() => { router.push(`/ebooks/${r.id}`); onClose(); }} style={{
                display: "flex", gap: 16, padding: 12, alignItems: "center",
                background: "transparent", border: 0, width: "100%", textAlign: "left",
                cursor: "pointer", borderBottom: "1px solid var(--rule-soft)",
              }}>
                <div style={{ width: 44 }}><Cover book={r} size="sm" /></div>
                <div style={{ flex: 1 }}>
                  <div className="serif" style={{ fontSize: 18, fontWeight: 500 }}>{r.title}</div>
                  <div className="caption">{r.author}</div>
                </div>
                <div className="serif" style={{ fontSize: 18 }}>{r.price}€</div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
