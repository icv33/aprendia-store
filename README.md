# aprendia.store

Una editorial digital independiente. Tienda de ebooks con diseño editorial premium.

## Stack

- **Next.js 14** — App Router, SSG/SSR
- **TypeScript** — Tipado completo
- **Tailwind CSS** — Utilidades + CSS custom properties
- **Prisma 5 + PostgreSQL** — Base de datos (Supabase)
- **Stripe** — Pagos (tarjeta, Apple Pay, Google Pay, Bizum)
- **Nodemailer** — Email de confirmación con enlace de descarga

## Páginas

| Ruta | Descripción |
|------|-------------|
| `/` | Home: hero 3D, bestsellers, bento de categorías, novedades |
| `/coleccion` | Catálogo con filtros y ordenación |
| `/categorias` | Grid de 6 categorías |
| `/categorias/[slug]` | Libros de una categoría |
| `/ebooks/[slug]` | Producto: visor de muestra, compra, reseñas |
| `/cesta` | Carrito de compra |
| `/checkout` | Pago con Stripe |
| `/success` | Confirmación tras pago |
| `/sobre-nosotros` | Página editorial |
| `/admin` | Panel de gestión (protegido por contraseña) |

## Instalación rápida

```bash
git clone https://github.com/TU_USUARIO/aprendia-store
cd aprendia-store
npm install
cp .env.example .env.local
# Edita .env.local con tus claves
npx prisma generate
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Configuración de Supabase (base de datos)

1. Crea un proyecto en [supabase.com](https://supabase.com)
2. Ve a **Project > Settings > Database > Connection string (URI)**
3. Pégala en `DATABASE_URL` de `.env.local`
4. Aplica el schema:

```bash
npx prisma db push
```

5. (Opcional) Seed con 8 ebooks de ejemplo:

```bash
npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/seed.ts
```

## Configuración de Stripe

1. Crea una cuenta en [stripe.com](https://stripe.com)
2. **Developers > API Keys** → copia las claves en `.env.local`
3. Para webhook en local:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
# Copia el whsec_xxx en STRIPE_WEBHOOK_SECRET
```

4. En producción: configura el webhook en el dashboard de Stripe apuntando a `https://tu-dominio.com/api/webhooks/stripe`

## Configuración de Email (Gmail)

1. Activa verificación en dos pasos en tu cuenta Google
2. **Cuenta Google > Seguridad > Contraseñas de aplicación**
3. Genera contraseña para "Correo"
4. Úsala en `SMTP_PASS`

## Despliegue en Vercel

### Opción A: Vercel CLI

```bash
npm i -g vercel
vercel --prod
```

### Opción B: Desde vercel.com

1. **New Project** → importa desde GitHub
2. **Framework**: Next.js (auto-detectado)
3. Añade todas las variables de entorno del `.env.example`
4. **Deploy**

El `vercel.json` ya incluye `prisma generate` en el build.

## Panel de administración

Accede a `/admin` con la contraseña definida en `ADMIN_PASSWORD` (por defecto: `aprendia2025admin`).

Para gestionar ebooks con interfaz visual:

```bash
npx prisma studio
```

## Estructura

```
src/
├── app/                       — Páginas (App Router)
│   └── api/                   — API routes (checkout, webhook, download)
├── components/
│   ├── home/                  — Secciones de la home
│   ├── Book3D.tsx             — Libro 3D animado (CSS 3D)
│   ├── Cover.tsx              — Portada estilo Penguin
│   ├── BookCartDrawer.tsx     — Carrito tipo libro que se abre
│   └── SampleReader.tsx       — Visor de muestra integrado
├── lib/
│   ├── data.ts                — Catálogo estático (8 ebooks de ejemplo)
│   ├── prisma.ts              — Cliente Prisma
│   ├── stripe.ts              — Cliente Stripe
│   └── email.ts              — Email con Nodemailer
└── store/
    └── cartStore.ts           — Carrito con Zustand (localStorage)
```

## Contacto

[aprendia.store@gmail.com](mailto:aprendia.store@gmail.com)
