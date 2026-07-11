const db = require('../models/db');
const { configuracoesSchema } = require('../validators/schemas');

async function listar(req, res, next) {
  try {
    const configs = await db('configuracoes').select('chave', 'valor', 'atualizado_em');
    return res.json(configs);
  } catch (err) {
    next(err);
  }
}

async function atualizar(req, res, next) {
  try {
    const { configuracoes } = configuracoesSchema.parse(req.body);

    for (const { chave, valor } of configuracoes) {
      const existente = await db('configuracoes').where({ chave }).first();
      if (existente) {
        await db('configuracoes').where({ chave }).update({ valor, atualizado_em: db.fn.now() });
      } else {
        await db('configuracoes').insert({ chave, valor });
      }
    }

    const atualizadas = await db('configuracoes').select('chave', 'valor', 'atualizado_em');
    return res.json(atualizadas);
  } catch (err) {
    next(err);
  }
}

module.exports = { listar, atualizar };
