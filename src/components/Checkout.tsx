"use client";

import Link from "next/link";
import { useState } from "react";
import { type Book, formatPrice } from "@/lib/books";
import { Book3D } from "./Book3D";

type Step = "review" | "paying" | "done";

/** Compra de demostración: no pide datos ni cobra nada. */
export function Checkout({ book }: { book: Book }) {
  const [step, setStep] = useState<Step>("review");

  const pay = () => {
    setStep("paying");
    setTimeout(() => setStep("done"), 1100);
  };

  return (
    <main className="checkout">
      <Book3D book={book} autoSpin={step === "done"} spinKey={step === "done" ? 1 : 0} className="checkout-book" />

      <div className="checkout-panel" aria-live="polite">
        {step === "done" ? (
          <>
            <h1>Es tuyo.</h1>
            <p>
              Pedido de prueba confirmado: «{book.title}» ya estaría en tu correo. Como esto es una demostración, no se
              ha cobrado nada ni se ha enviado ningún correo.
            </p>
            <div className="buy-row">
              <Link className="btn btn-sand" href={`/libros/${book.slug}#muestra`}>
                Leer el fragmento
              </Link>
              <Link className="btn btn-line" href="/#estanteria">
                Volver a la estantería
              </Link>
            </div>
          </>
        ) : (
          <>
            <h1>Tu pedido</h1>
            <dl className="order">
              <div>
                <dt>{book.title}</dt>
                <dd>{formatPrice(book.price)}</dd>
              </div>
              <div>
                <dt>Formato</dt>
                <dd>PDF y EPUB</dd>
              </div>
              <div className="order-total">
                <dt>Total</dt>
                <dd>{formatPrice(book.price)}</dd>
              </div>
            </dl>
            <p className="demo-banner">
              Esta tienda es una demostración. Al pagar no se te pide ninguna tarjeta ni se cobra nada.
            </p>
            <button type="button" className="btn btn-sand btn-wide" onClick={pay} disabled={step === "paying"}>
              {step === "paying" ? "Pagando…" : `Pagar ${formatPrice(book.price)} (demo)`}
            </button>
            <Link className="back-link" href={`/libros/${book.slug}`}>
              Volver al libro
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
