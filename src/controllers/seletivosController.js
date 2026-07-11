const db = require('../models/db');
const { seletivoSchema, seletivoUpdateSchema } = require('../validators/schemas');

async function listar(req, res, next) {
  try {
    const { status } = req.query;
    const query = db('processos_seletivos').select('*').orderBy('data_edital', 'desc');
    if (status) query.where('status', status);
    const seletivos = await query;
    return res.json(seletivos);
  } catch (err) {
    next(err);
  }
}

async function criar(req, res, next) {
  try {
    const dados = seletivoSchema.parse(req.body);
    const arquivo_edital_path = req.files?.edital ? req.files.edital[0].url : null;
    const arquivo_resultado_path = req.files?.resultado ? req.files.resultado[0].url : null;

    const inserted = await db('processos_seletivos')
      .insert({
        ...dados,
        status: dados.status || 'aberto',
        arquivo_edital_path,
        arquivo_resultado_path,
      })
      .returning('id');
    const id = db.extractInsertId(inserted);
    const seletivo = await db('processos_seletivos').where({ id }).first();
    return res.status(201).json(seletivo);
  } catch (err) {
    next(err);
  }
}

async function atualizar(req, res, next) {
  try {
    const dados = seletivoUpdateSchema.parse(req.body);
    const seletivo = await db('processos_seletivos').where({ id: req.params.id }).first();
    if (!seletivo) {
      return res.status(404).json({ erro: 'Processo seletivo não encontrado.' });
    }

    const atualizacao = { ...dados };
    if (req.files?.edital) {
      atualizacao.arquivo_edital_path = req.files.edital[0].url;
    }
    if (req.files?.resultado) {
      atualizacao.arquivo_resultado_path = req.files.resultado[0].url;
    }

    await db('processos_seletivos').where({ id: req.params.id }).update(atualizacao);
    const atualizado = await db('processos_seletivos').where({ id: req.params.id }).first();
    return res.json(atualizado);
  } catch (err) {
    next(err);
  }
}

module.exports = { listar, criar, atualizar };
