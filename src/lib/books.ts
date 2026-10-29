// Catálogo de Aprendia. Los libros y los autores son inventados (proyecto de portafolio).

export type Motif = "orbits" | "halftone" | "stairs" | "waves" | "eclipse" | "spark";

export type Book = {
  slug: string;
  title: string;
  subtitle: string;
  author: string;
  /** Fondo de la portada */
  color: string;
  /** Tinta principal (título y dibujo) */
  ink: string;
  /** Segunda tinta, se superpone como en una risografía */
  accent: string;
  motif: Motif;
  pages: number;
  /** Céntimos de euro */
  price: number;
  hook: string;
  synopsis: string[];
  chapters: string[];
  excerpt: { chapter: string; paragraphs: string[] };
};

export const books: Book[] = [
  {
    slug: "prompts-que-funcionan",
    title: "Prompts que funcionan",
    subtitle: "Cómo pedirle las cosas a una IA para que te entienda a la primera",
    author: "Lucía Marín Sotelo",
    color: "#8FA3B8",
    ink: "#1C1E22",
    accent: "#B4735A",
    motif: "orbits",
    pages: 148,
    price: 1490,
    hook: "Deja de pelearte con el chat y empieza a darle contexto.",
    synopsis: [
      "La mayoría de las respuestas malas de una IA vienen de preguntas a medias. Este libro enseña a escribir instrucciones con contexto, ejemplos y un formato de salida claro.",
      "Cada capítulo parte de un encargo real (un correo difícil, un resumen de 40 páginas, una hoja de cálculo rota) y lo resuelve en tres intentos: el que falla, el que casi funciona y el bueno.",
    ],
    chapters: [
      "Por qué la IA no te entiende",
      "Contexto: lo que tú sabes y ella no",
      "Ejemplos que valen más que instrucciones",
      "Pedir un formato concreto",
      "Conversaciones largas sin perder el hilo",
      "Revisar lo que te devuelve",
    ],
    excerpt: {
      chapter: "Contexto: lo que tú sabes y ella no",
      paragraphs: [
        "Imagina que le pides a alguien que acaba de llegar a tu oficina que «arregle el informe». No sabe qué informe, para quién es ni qué está mal. Hará algo, pero no lo que querías.",
        "Con una IA pasa exactamente lo mismo. Antes de pedir nada, escribe tres frases: quién eres, para quién es el resultado y qué significa que esté bien hecho. Esas tres frases cambian más una respuesta que cualquier truco.",
      ],
    },
  },
  {
    slug: "tu-primer-agente",
    title: "Tu primer agente",
    subtitle: "Automatiza tareas repetitivas con agentes de IA, sin ser programador",
    author: "Daniel Ortega Lluch",
    color: "#D9CDB4",
    ink: "#1C1E22",
    accent: "#8FA3B8",
    motif: "stairs",
    pages: 196,
    price: 1990,
    hook: "Lo que haces cada lunes a mano, que lo haga otro.",
    synopsis: [
      "Un agente es una IA que no solo contesta: usa herramientas, toma pequeñas decisiones y termina tareas enteras. Este libro explica cuándo merece la pena montar uno y cuándo no.",
      "Construirás tres agentes paso a paso: uno que ordena tu correo, otro que prepara informes semanales y otro que vigila precios. Con límites claros para que nunca haga algo que no quieres.",
    ],
    chapters: [
      "Qué es un agente y qué no",
      "Elegir la primera tarea",
      "Herramientas: darle manos a la IA",
      "Límites y permisos",
      "El agente del correo",
      "El agente de los informes",
      "Cuando algo sale mal",
    ],
    excerpt: {
      chapter: "Elegir la primera tarea",
      paragraphs: [
        "La primera tarea de un agente tiene que ser aburrida. Si es emocionante, probablemente es demasiado importante para dejarla en manos de algo que aún no conoces.",
        "Busca algo que hagas al menos una vez por semana, que tenga pasos claros y en lo que un error se arregle en un minuto. Ordenar descargas, renombrar facturas o resumir un canal de mensajes son buenos candidatos.",
      ],
    },
  },
  {
    slug: "la-ia-en-casa",
    title: "La IA en casa",
    subtitle: "Menús, viajes, papeleo y deberes: la IA para el día a día",
    author: "Marta Echeverría Gil",
    color: "#A8B5A0",
    ink: "#1C1E22",
    accent: "#D9CDB4",
    motif: "halftone",
    pages: 132,
    price: 990,
    hook: "Menos tiempo con el papeleo, más tiempo para lo demás.",
    synopsis: [
      "Un libro práctico para usar la IA en las tareas de casa: planificar la compra de la semana, organizar un viaje con niños, entender una carta de Hacienda o ayudar con los deberes sin hacerlos por ellos.",
      "Incluye cuarenta instrucciones listas para copiar y una guía para proteger tus datos personales cuando hablas con un chat.",
    ],
    chapters: [
      "La compra y el menú de la semana",
      "Viajes sin quinientas pestañas",
      "Cartas, contratos y letra pequeña",
      "Deberes: ayudar sin hacer trampas",
      "Tus datos, a salvo",
    ],
    excerpt: {
      chapter: "Cartas, contratos y letra pequeña",
      paragraphs: [
        "Antes de pegar un contrato en un chat, tapa tu nombre, tu DNI y tu número de cuenta. La IA no los necesita para explicarte qué estás firmando.",
        "Después pídele dos cosas por separado: un resumen en cinco frases y una lista de lo que podría salirte caro. La segunda lista es la que de verdad importa.",
      ],
    },
  },
  {
    slug: "aprende-con-ia",
    title: "Aprende con IA",
    subtitle: "Estudia mejor con un tutor que nunca se cansa",
    author: "Pablo Serrano Ibáñez",
    color: "#B4735A",
    ink: "#1C1E22",
    accent: "#D9CDB4",
    motif: "waves",
    pages: 164,
    price: 1290,
    hook: "Que la IA te pregunte a ti, no al revés.",
    synopsis: [
      "Usar la IA para que te haga los trabajos es fácil y no sirve de nada. Usarla para aprender de verdad requiere otras preguntas: que te examine, que te explique con otro ejemplo, que encuentre el hueco en lo que crees saber.",
      "Basado en técnicas de estudio con evidencia (práctica de recuerdo, repaso espaciado, explicar con tus palabras), adaptadas a un tutor que está disponible a las dos de la madrugada.",
    ],
    chapters: [
      "Por qué copiar no es aprender",
      "La IA como examinador",
      "Explicaciones a tu medida",
      "Repasar en el momento justo",
      "Idiomas con conversación",
      "Preparar un examen en dos semanas",
    ],
    excerpt: {
      chapter: "La IA como examinador",
      paragraphs: [
        "Prueba esto: pega tus apuntes y pide diez preguntas, una a una, sin darte las respuestas. Contesta de memoria. Solo al final pide la corrección.",
        "Es incómodo, porque descubres lo poco que recordabas. Precisamente por eso funciona: lo que te cuesta recordar hoy es lo que se queda mañana.",
      ],
    },
  },
  {
    slug: "datos-sin-miedo",
    title: "Datos sin miedo",
    subtitle: "Hojas de cálculo, gráficos y conclusiones con ayuda de la IA",
    author: "Irene Calvo Mendoza",
    color: "#7A5C6E",
    ink: "#EDEDEA",
    accent: "#A8B5A0",
    motif: "eclipse",
    pages: 210,
    price: 1890,
    hook: "Tu Excel tiene respuestas. Aprende a preguntarle.",
    synopsis: [
      "No hace falta saber estadística para sacar conclusiones de tus datos, pero sí saber qué preguntar y cuándo desconfiar. Este libro te lleva de una hoja de cálculo desordenada a un gráfico que se entiende.",
      "Aprenderás a limpiar datos con la IA, a pedir fórmulas que funcionan y, sobre todo, a comprobar que lo que te dice tiene sentido antes de presentarlo en una reunión.",
    ],
    chapters: [
      "Ordenar una hoja desordenada",
      "Fórmulas que no se rompen",
      "Preguntas que los datos pueden contestar",
      "Gráficos que se entienden",
      "Cuándo desconfiar de la IA",
      "Contarlo en una reunión",
    ],
    excerpt: {
      chapter: "Cuándo desconfiar de la IA",
      paragraphs: [
        "Si la IA te da un número, pídele también cómo lo ha calculado. Si no puede enseñártelo paso a paso, no lo pongas en una diapositiva.",
        "Una buena costumbre: elige tres filas al azar y comprueba el resultado a mano. Si las tres cuadran, puedes seguir con más confianza.",
      ],
    },
  },
  {
    slug: "crear-con-maquinas",
    title: "Crear con máquinas",
    subtitle: "Imagen, música y vídeo con IA generativa, con criterio propio",
    author: "Hugo Peralta Ruiz",
    color: "#3E4A5A",
    ink: "#D9CDB4",
    accent: "#B4735A",
    motif: "spark",
    pages: 182,
    price: 1690,
    hook: "La máquina propone. Decides tú.",
    synopsis: [
      "Las herramientas generativas producen cientos de imágenes en minutos; elegir la buena sigue siendo cosa tuya. Este libro trata de la parte que no se automatiza: tener una idea y saber cuándo está terminada.",
      "Recorre imagen, música y vídeo con proyectos cortos, y dedica un capítulo entero a derechos de autor, licencias y cómo contar que has usado IA.",
    ],
    chapters: [
      "Tener una idea antes que una herramienta",
      "Imagen: describir lo que ves",
      "Música: de una melodía a una canción",
      "Vídeo: planos, ritmo y montaje",
      "Derechos, licencias y honestidad",
    ],
    excerpt: {
      chapter: "Tener una idea antes que una herramienta",
      paragraphs: [
        "Abre la herramienta solo cuando puedas describir tu idea en una frase sin usar la palabra «chulo». Si no puedes, todavía no tienes una idea: tienes ganas de jugar, que también está bien, pero es otra cosa.",
        "Escribe la frase en un papel y déjala a la vista. Cuando lleves cuarenta imágenes generadas, léela otra vez y quédate solo con las que la cumplen.",
      ],
    },
  },
];

export function getBook(slug: string): Book | undefined {
  return books.find((b) => b.slug === slug);
}

const euros = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" });

export function formatPrice(cents: number): string {
  return euros.format(cents / 100);
}
