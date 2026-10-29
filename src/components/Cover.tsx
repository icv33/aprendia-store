import type { Book, Motif } from "@/lib/books";

// Portada dibujada: dos tintas que se superponen (multiply), como una risografía.
export function MotifArt({ motif, ink, accent }: { motif: Motif; ink: string; accent: string }) {
  switch (motif) {
    case "orbits":
      return (
        <g>
          <g fill="none" stroke={ink} strokeWidth="7">
            {[40, 75, 110, 145].map((r) => (
              <circle key={r} cx="210" cy="300" r={r} />
            ))}
          </g>
          <circle cx="120" cy="250" r="78" fill={accent} className="riso" />
          <circle cx="210" cy="300" r="16" fill={ink} />
        </g>
      );
    case "stairs":
      return (
        <g>
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={40 + i * 46} y={380 - (i + 1) * 40} width="46" height={(i + 1) * 40} fill={ink} />
          ))}
          <rect x="150" y="150" width="120" height="120" fill={accent} className="riso" transform="rotate(12 210 210)" />
        </g>
      );
    case "halftone":
      return (
        <g>
          {Array.from({ length: 9 }).map((_, row) =>
            Array.from({ length: 7 }).map((_, col) => (
              <circle
                key={`${row}-${col}`}
                cx={36 + col * 38}
                cy={186 + row * 26}
                r={2 + ((row + col) % 9) * 1.4}
                fill={ink}
              />
            )),
          )}
          <rect x="30" y="230" width="150" height="150" rx="75" fill={accent} className="riso" />
        </g>
      );
    case "waves":
      return (
        <g>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <path
              key={i}
              d={`M -10 ${210 + i * 30} q 40 -26 80 0 t 80 0 t 80 0 t 80 0`}
              fill="none"
              stroke={ink}
              strokeWidth="9"
            />
          ))}
          <circle cx="230" cy="215" r="62" fill={accent} className="riso" />
        </g>
      );
    case "eclipse":
      return (
        <g>
          <circle cx="150" cy="290" r="105" fill={ink} />
          <circle cx="196" cy="262" r="92" fill={accent} className="riso" />
          <rect x="0" y="372" width="300" height="10" fill={ink} />
        </g>
      );
    case "spark":
      return (
        <g>
          <g stroke={ink} strokeWidth="6" strokeLinecap="round">
            {Array.from({ length: 16 }).map((_, i) => {
              const a = (i / 16) * Math.PI * 2;
              const r1 = i % 2 ? 40 : 30;
              const r2 = i % 2 ? 105 : 135;
              return (
                <line
                  key={i}
                  x1={150 + Math.cos(a) * r1}
                  y1={285 + Math.sin(a) * r1}
                  x2={150 + Math.cos(a) * r2}
                  y2={285 + Math.sin(a) * r2}
                />
              );
            })}
          </g>
          <circle cx="150" cy="285" r="34" fill={accent} className="riso" />
        </g>
      );
  }
}

function isDark(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [n >> 16, (n >> 8) & 255, n & 255];
  return 0.299 * r + 0.587 * g + 0.114 * b < 110;
}

export function Cover({ book }: { book: Book }) {
  return (
    <div
      className="cover"
      data-dark={isDark(book.color) || undefined}
      style={{ background: book.color, color: book.ink }}
    >
      <svg className="cover-art" viewBox="0 0 300 420" aria-hidden="true">
        <MotifArt motif={book.motif} ink={book.ink} accent={book.accent} />
      </svg>
      <div className="cover-text">
        <p className="cover-title">{book.title}</p>
        <p className="cover-author">{book.author}</p>
      </div>
      <span className="cover-imprint">aprendia</span>
    </div>
  );
}
