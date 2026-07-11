const multer = require('multer');

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof multer.MulterError) {
    return res.status(400).json({ erro: `Erro no upload: ${err.message}` });
  }

  if (err && err.message === 'Apenas arquivos PDF são permitidos.') {
    return res.status(400).json({ erro: err.message });
  }

  if (err && err.name === 'ZodError') {
    return res.status(422).json({
      erro: 'Dados inválidos.',
      detalhes: err.issues.map((i) => ({ campo: i.path.join('.'), mensagem: i.message })),
    });
  }

  console.error(err);
  const status = err.status || 500;
  return res.status(status).json({ erro: err.publicMessage || 'Erro interno no servidor.' });
}

module.exports = errorHandler;
