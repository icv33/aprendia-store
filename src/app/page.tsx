import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Shelf } from "@/components/Shelf";
import { Topbar } from "@/components/Topbar";

export default function Home() {
  return (
    <>
      <div className="hero-band">
        <Topbar />
        <Hero />
      </div>

      <main>
        <section id="estanteria" className="section shelf-section">
          <div className="section-head">
            <h2>La estantería</h2>
            <p>Toca un lomo para sacar el libro.</p>
          </div>
          <Shelf />
        </section>

        <section id="sobre" className="section about">
          <h2>Una editorial pequeña, a propósito.</h2>
          <div className="about-cols">
            <p>
              Cada guía de Aprendia cabe en una tarde. Empieza con un problema que conoces, lo resuelve con la IA paso a
              paso y termina con instrucciones que puedes copiar y adaptar.
            </p>
            <p>
              Escribimos para quien usa la IA sin ser técnico: profesores, administrativos, estudiantes, familias. Si
              una frase necesita un glosario, la reescribimos.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
