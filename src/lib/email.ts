import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendDownloadEmail({
  to,
  name,
  downloads,
}: {
  to: string;
  name: string;
  downloads: Array<{ title: string; token: string }>;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_URL || "https://aprendia-store.vercel.app";

  const linksHtml = downloads
    .map(
      (d) => `
      <div style="margin: 16px 0; padding: 16px; background: #f6f3ec; border-left: 3px solid #13a06a; border-radius: 2px;">
        <strong style="font-family: Georgia, serif; font-size: 16px;">${d.title}</strong><br/>
        <a href="${baseUrl}/api/download/${d.token}"
           style="display: inline-block; margin-top: 10px; padding: 10px 24px; background: #13a06a; color: white; border-radius: 999px; text-decoration: none; font-size: 14px;">
          Descargar ebook →
        </a>
        <p style="margin: 8px 0 0; font-size: 12px; color: #8a8170;">Enlace válido 24 horas</p>
      </div>`
    )
    .join("");

  await transporter.sendMail({
    from: `"aprendia" <${process.env.SMTP_USER}>`,
    to,
    subject: `Tu pedido de aprendia — ${downloads.length} ebook${downloads.length > 1 ? "s" : ""} listo${downloads.length > 1 ? "s" : ""}`,
    html: `
      <!DOCTYPE html>
      <html>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; color: #14110c;">
        <div style="font-family: Georgia, serif; font-size: 28px; font-style: italic; margin-bottom: 8px;">aprendia</div>
        <p style="color: #8a8170; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 32px;">EDITORIAL DIGITAL · DESDE 2025</p>

        <h1 style="font-family: Georgia, serif; font-size: 28px; font-weight: 400; margin-bottom: 8px;">
          Gracias, ${name.split(" ")[0] || "lector"}.
        </h1>
        <p style="font-family: Georgia, serif; font-style: italic; color: #3d362b; margin-bottom: 32px;">
          Tu${downloads.length > 1 ? "s" : ""} ebook${downloads.length > 1 ? "s" : ""} está${downloads.length > 1 ? "n" : ""} listo${downloads.length > 1 ? "s" : ""} para descargar.
        </p>

        ${linksHtml}

        <hr style="border: 0; border-top: 1px solid #e2dccd; margin: 32px 0;"/>
        <p style="font-size: 12px; color: #8a8170;">
          Los enlaces de descarga expiran en 24 horas. Si tienes algún problema, escríbenos a
          <a href="mailto:aprendia.store@gmail.com" style="color: #13a06a;">aprendia.store@gmail.com</a>
        </p>
        <p style="font-size: 11px; color: #8a8170;">© 2026 aprendia.store · Una editorial digital independiente</p>
      </body>
      </html>
    `,
  });
}
