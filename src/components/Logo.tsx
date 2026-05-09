export function LogoMark({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="14" height="18" rx="1" fill="currentColor" />
      <rect x="6" y="3" width="14" height="18" rx="1" fill="var(--accent)" stroke="currentColor" strokeWidth="1" />
      <line x1="6" y1="3" x2="6" y2="21" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <LogoMark size={22} />
      <span className="serif" style={{ fontSize: 22, fontStyle: "italic", letterSpacing: "-0.02em" }}>aprendia</span>
      <span className="caption" style={{ marginLeft: 4 }}>· STORE</span>
    </div>
  );
}
