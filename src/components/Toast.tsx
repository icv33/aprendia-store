"use client";
import { useEffect, useState } from "react";

interface ToastMsg { title: string; msg: string }

let _listener: ((t: ToastMsg | null) => void) | null = null;

export function showToast(t: ToastMsg) {
  _listener?.(t);
  setTimeout(() => _listener?.(null), 2400);
}

export default function Toast() {
  const [toast, setToast] = useState<ToastMsg | null>(null);

  useEffect(() => {
    _listener = setToast;
    return () => { _listener = null; };
  }, []);

  return (
    <div style={{
      position: "fixed", bottom: 32, left: "50%",
      transform: `translateX(-50%) translateY(${toast ? 0 : 12}px)`,
      zIndex: 250,
      background: "var(--ink)", color: "var(--paper)",
      borderRadius: 999, padding: "12px 24px",
      display: "flex", alignItems: "center", gap: 12,
      opacity: toast ? 1 : 0,
      transition: "opacity .25s, transform .25s",
      boxShadow: "0 12px 36px rgba(0,0,0,.25)",
      pointerEvents: "none",
    }}>
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)" }} />
      <span className="caption" style={{ color: "var(--paper)" }}>{toast?.msg || ""}</span>
      <span className="serif" style={{ fontStyle: "italic", maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {toast?.title || ""}
      </span>
    </div>
  );
}
