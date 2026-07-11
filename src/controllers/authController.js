const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models/db');
const { loginSchema } = require('../validators/schemas');

function gerarAccessToken(usuario) {
  return jwt.sign(
    { id: usuario.id, email: usuario.email, cargo: usuario.cargo },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
  );
}

function gerarRefreshToken(usuario) {
  return jwt.sign(
    { id: usuario.id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' }
  );
}

async function login(req, res, next) {
  try {
    const { email, senha } = loginSchema.parse(req.body);

    const usuario = await db('usuarios').where({ email, ativo: true }).first();
    if (!usuario) {
      return res.status(401).json({ erro: 'Credenciais inválidas.' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);
    if (!senhaValida) {
      return res.status(401).json({ erro: 'Credenciais inválidas.' });
    }

    const accessToken = gerarAccessToken(usuario);
    const refreshToken = gerarRefreshToken(usuario);

    return res.json({
      token: accessToken,
      refreshToken,
      usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email, cargo: usuario.cargo },
    });
  } catch (err) {
    next(err);
  }
}

async function refresh(req, res, next) {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ erro: 'refreshToken é obrigatório.' });
    }

    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const usuario = await db('usuarios').where({ id: payload.id, ativo: true }).first();
    if (!usuario) {
      return res.status(401).json({ erro: 'Sessão inválida.' });
    }

    const novoAccessToken = gerarAccessToken(usuario);
    const novoRefreshToken = gerarRefreshToken(usuario);

    return res.json({ token: novoAccessToken, refreshToken: novoRefreshToken });
  } catch (err) {
    return res.status(401).json({ erro: 'Refresh token inválido ou expirado.' });
  }
}

async function logout(req, res) {
  return res.json({ mensagem: 'Sessão encerrada. Descarte o token no cliente.' });
}

module.exports = { login, refresh, logout };
