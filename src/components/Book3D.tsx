"use client";

import { useEffect, useRef } from "react";
import type { Book } from "@/lib/books";
import { Cover } from "./Cover";

type Props = {
  book: Book;
  /** Gira solo, despacio (se para con «Reducir movimiento») */
  autoSpin?: boolean;
  /** Cambia este número para darle un giro completo (p. ej. al cambiar de libro) */
  spinKey?: string | number;
  className?: string;
};

const IDLE_SPEED = 14; // grados por segundo
const REST_ANGLE = -28;

/**
 * Libro en 3D con CSS: portada, contraportada, lomo y cantos de páginas.
 * Se arrastra con el dedo o el ratón y tiene inercia; el giro se escribe
 * directamente en el estilo (sin re-render en cada fotograma).
 */
export function Book3D({ book, autoSpin = false, spinKey, className }: Props) {
  const bookRef = useRef<HTMLDivElement>(null);
  const state = useRef({ angle: REST_ANGLE, velocity: 0, dragging: false, lastX: 0, lastT: 0 });
  const reduced = useRef(false);
  const prevKey = useRef(spinKey);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduced.current = mq.matches;
    const onChange = () => (reduced.current = mq.matches);
    mq.addEventListener("change", onChange);

    let frame = 0;
    let prev = performance.now();
    const tick = (now: number) => {
      const dt = Math.min((now - prev) / 1000, 0.05);
      prev = now;
      const s = state.current;
      if (!s.dragging) {
        const target = autoSpin && !reduced.current ? IDLE_SPEED : 0;
        // La velocidad vuelve poco a poco a la de reposo (inercia)
        s.velocity += (target - s.velocity) * Math.min(dt * 1.6, 1);
        s.angle += s.velocity * dt;
        if (!autoSpin || reduced.current) {
          // Sin giro automático, vuelve suave a mostrar la portada en tres cuartos
          const rest = REST_ANGLE + Math.round((s.angle - REST_ANGLE) / 360) * 360;
          if (Math.abs(s.velocity) < 30) s.angle += (rest - s.angle) * Math.min(dt * 3, 1);
        }
      }
      if (bookRef.current) {
        bookRef.current.style.transform = `rotateX(-9deg) rotateY(${s.angle}deg)`;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      mq.removeEventListener("change", onChange);
    };
  }, [autoSpin]);

  // Giro al cambiar de libro (solo si la clave cambia de verdad)
  useEffect(() => {
    if (prevKey.current === spinKey) return;
    prevKey.current = spinKey;
    if (!reduced.current) state.current.velocity = 720;
  }, [spinKey]);

  const onPointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    Object.assign(state.current, { dragging: true, lastX: e.clientX, lastT: performance.now(), velocity: 0 });
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const s = state.current;
    if (!s.dragging) return;
    const now = performance.now();
    const dx = e.clientX - s.lastX;
    s.angle += dx * 0.6;
    s.velocity = (dx * 0.6) / Math.max((now - s.lastT) / 1000, 0.008);
    s.lastX = e.clientX;
    s.lastT = now;
  };
  const onPointerUp = () => {
    state.current.dragging = false;
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") state.current.velocity -= 240;
    if (e.key === "ArrowRight") state.current.velocity += 240;
  };

  return (
    <div
      className={`book3d ${className ?? ""}`}
      role="img"
      aria-label={`Libro «${book.title}», de ${book.author}. Arrástralo o usa las flechas para girarlo.`}
      tabIndex={0}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onKeyDown={onKeyDown}
      style={{ "--spine": book.color, "--spine-ink": book.ink } as React.CSSProperties}
    >
      <div className="book" ref={bookRef}>
        <div className="face front">
          <Cover book={book} />
        </div>
        <div className="face back" style={{ background: book.color, color: book.ink }}>
          <p className="back-hook">{book.hook}</p>
          <p className="back-meta">
            {book.pages} páginas
            <br />
            Aprendia, 2026
          </p>
        </div>
        <div className="face spine">
          <span>{book.title}</span>
        </div>
        <div className="face pages-right" />
        <div className="face pages-top" />
        <div className="face pages-bottom" />
      </div>
      <div className="book-shadow" />
    </div>
  );
}
