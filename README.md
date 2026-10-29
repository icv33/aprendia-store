# aprendia.store

Tienda de una editorial inventada de guías de inteligencia artificial. Proyecto de portafolio: **los libros, los autores y los pagos son de demostración** (no se pide ninguna tarjeta ni se cobra nada).

## Qué tiene

- **Libro en 3D hecho solo con CSS**: portada, lomo, contraportada y cantos de páginas. Gira solo, se arrastra con el ratón o el dedo (con inercia) y responde a las flechas del teclado. El giro se escribe directamente en el estilo con `requestAnimationFrame`, sin volver a renderizar React en cada fotograma.
- **Portadas generativas** en SVG, con dos tintas superpuestas (`mix-blend-mode: multiply`) como en una risografía. Una por libro, sin imágenes.
- **Estantería** en lugar de una cuadrícula de tarjetas: cada libro es un lomo; al tocarlo sale de la balda y aparece su ficha.
- **Ficha de cada libro** con sinopsis, índice, un fragmento maquetado como un libro abierto y más títulos apilados.
- **Compra de demostración** que termina en «Es tuyo.» con el libro girando.
- Web 100 % estática (`generateStaticParams`), adaptada al móvil y con «Reducir movimiento» respetado.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · CSS sin librerías · `next/font` (Young Serif y Hanken Grotesk)

## Arrancarlo

```bash
npm install
npm run dev
```

Los libros están en `src/lib/books.ts`; para añadir uno basta con añadirlo a la lista (elige un `motif` para la portada).

---

Hecho por [Ignacio Cabrera Villanova](https://www.linkedin.com/in/ignacio-cabrera-villanova) · Ahora construyendo [Birdeo](https://birdeo.app).

La versión anterior (Next.js 14 + Prisma + Stripe) está en la rama [`version-antigua`](https://github.com/icv33/aprendia-store/tree/version-antigua).
