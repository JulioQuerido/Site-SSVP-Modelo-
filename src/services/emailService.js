const nodemailer = require('nodemailer');

function buildTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

async function sendMail({ to, subject, html }) {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
    console.warn('[emailService] SMTP não configurado; e-mail não enviado:', subject);
    return { skipped: true };
  }

  const transporter = buildTransport();
  return transporter.sendMail({
    from: process.env.EMAIL_FROM || process.env.SMTP_USER,
    to,
    subject,
    html,
  });
}

async function sendProtocoloConfirmacao({ email, protocolo, prazoDias }) {
  if (!email) return { skipped: true };
  return sendMail({
    to: email,
    subject: `[SSVP] Protocolo de Ouvidoria – ${protocolo}`,
    html: `
      <p>Olá,</p>
      <p>Recebemos sua mensagem através do canal de Ouvidoria da Sociedade de São Vicente de Paulo – Conselho Nacional do Brasil.</p>
      <p><strong>Protocolo:</strong> ${protocolo}</p>
      <p>Sua manifestação será analisada e respondida em até <strong>${prazoDias} dias úteis</strong>.</p>
      <p>Guarde este número de protocolo para consultar o status do seu atendimento.</p>
      <p>Atenciosamente,<br/>Ouvidoria SSVP Brasil</p>
    `,
  });
}

async function sendAlertaOuvidoria({ protocolo, tipo, descricao }) {
  const destinatario = process.env.EMAIL_OUVIDORIA;
  if (!destinatario) return { skipped: true };
  return sendMail({
    to: destinatario,
    subject: `[SSVP] Nova manifestação recebida – ${protocolo}`,
    html: `
      <p>Uma nova manifestação de ouvidoria foi recebida.</p>
      <p><strong>Protocolo:</strong> ${protocolo}</p>
      <p><strong>Tipo:</strong> ${tipo}</p>
      <p><strong>Descrição:</strong></p>
      <p>${descricao}</p>
    `,
  });
}

async function sendRespostaOuvidoria({ email, protocolo, resposta }) {
  if (!email) return { skipped: true };
  return sendMail({
    to: email,
    subject: `[SSVP] Resposta ao protocolo ${protocolo}`,
    html: `
      <p>Olá,</p>
      <p>Sua manifestação de protocolo <strong>${protocolo}</strong> foi respondida:</p>
      <blockquote>${resposta}</blockquote>
      <p>Atenciosamente,<br/>Ouvidoria SSVP Brasil</p>
    `,
  });
}

module.exports = {
  sendMail,
  sendProtocoloConfirmacao,
  sendAlertaOuvidoria,
  sendRespostaOuvidoria,
};
