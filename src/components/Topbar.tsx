import Link from "next/link";

export function Topbar() {
  return (
    <header className="topbar">
      <Link href="/" className="wordmark" aria-label="Aprendia, inicio">
        aprendia
      </Link>
      <nav aria-label="Principal">
        <Link href="/#estanteria">La estantería</Link>
        <Link href="/#sobre">Sobre Aprendia</Link>
      </nav>
    </header>
  );
}
