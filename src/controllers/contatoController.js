const validator = require('validator');
const { contatoSchema } = require('../validators/schemas');
const { sendMail } = require('../services/emailService');

async function enviar(req, res, next) {
  try {
    const dados = contatoSchema.parse(req.body);
    const mensagemSanitizada = validator.escape(validator.trim(dados.mensagem));
    const nomeSanitizado = validator.escape(validator.trim(dados.nome));

    await sendMail({
      to: process.env.EMAIL_OUVIDORIA || process.env.SMTP_USER,
      subject: `[SSVP] Contato do site: ${dados.assunto || 'Sem assunto'}`,
      html: `
        <p><strong>Nome:</strong> ${nomeSanitizado}</p>
        <p><strong>E-mail:</strong> ${dados.email}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${mensagemSanitizada}</p>
      `,
    });

    return res.status(201).json({ mensagem: 'Mensagem enviada com sucesso.' });
  } catch (err) {
    next(err);
  }
}

module.exports = { enviar };
