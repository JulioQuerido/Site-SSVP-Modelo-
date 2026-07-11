const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const { publicLimiter } = require('./middlewares/rateLimiters');
const errorHandler = require('./middlewares/errorHandler');

const authRoutes = require('./routes/auth');
const projetosRoutes = require('./routes/projetos');
const documentosRoutes = require('./routes/documentos');
const parceriasRoutes = require('./routes/parcerias');
const seletivosRoutes = require('./routes/seletivos');
const ouvidoriaRoutes = require('./routes/ouvidoria');
const indicadoresRoutes = require('./routes/indicadores');
const ipeaRoutes = require('./routes/ipea');
const contatoRoutes = require('./routes/contato');
const configuracoesRoutes = require('./routes/configuracoes');

const app = express();

// Necessário no Vercel (e em qualquer host atrás de um reverse proxy) para que
// express-rate-limit e req.ip leiam corretamente o X-Forwarded-For.
if (process.env.VERCEL || process.env.TRUST_PROXY === 'true') {
  app.set('trust proxy', 1);
}

app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  })
);
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

const uploadPath = process.env.UPLOAD_PATH || './public/uploads';
app.use('/uploads', express.static(path.isAbsolute(uploadPath) ? uploadPath : path.join(process.cwd(), uploadPath)));

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/v1', publicLimiter);
app.use('/api/v1', authRoutes);
app.use('/api/v1', projetosRoutes);
app.use('/api/v1', documentosRoutes);
app.use('/api/v1', parceriasRoutes);
app.use('/api/v1', seletivosRoutes);
app.use('/api/v1', ouvidoriaRoutes);
app.use('/api/v1', indicadoresRoutes);
app.use('/api/v1', ipeaRoutes);
app.use('/api/v1', contatoRoutes);
app.use('/api/v1', configuracoesRoutes);

app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada.' });
});

app.use(errorHandler);

module.exports = app;
