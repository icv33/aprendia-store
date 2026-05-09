"use client";
import { useMemo } from "react";

export default function Particles({ count = 14 }: { count?: number }) {
  const dots = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: 60 + Math.random() * 40,
      size: 2 + Math.random() * 3,
      delay: Math.random() * 12,
      duration: 14 + Math.random() * 10,
    })),
    [count]
  );

  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 1 }}>
      {dots.map((d) => (
        <span key={d.id} style={{
          position: "absolute",
          left: d.left + "%",
          top: d.top + "%",
          width: d.size,
          height: d.size,
          borderRadius: "50%",
          background: "var(--accent)",
          filter: "blur(.5px)",
          opacity: 0,
          animation: `drift ${d.duration}s ease-in-out ${d.delay}s infinite`,
        }} />
      ))}
    </div>
  );
}
