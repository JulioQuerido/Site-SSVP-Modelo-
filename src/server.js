require('dotenv').config();
const app = require('./app');
const runMigrations = require('./models/migrations');

const PORT = process.env.PORT || 3001;

async function start() {
  await runMigrations();

  app.listen(PORT, () => {
    console.log(`Portal de Transparência SSVP - API rodando na porta ${PORT}`);
    console.log(`CORS liberado para: ${process.env.CORS_ORIGIN || 'http://localhost:5173'}`);
  });
}

start().catch((err) => {
  console.error('Falha ao iniciar o servidor:', err);
  process.exit(1);
});
