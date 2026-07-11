const db = require('../models/db');
const { parceriaSchema, parceriaUpdateSchema } = require('../validators/schemas');

async function listar(req, res, next) {
  try {
    const { tipo, situacao, ano } = req.query;
    const query = db('parcerias').select('*').orderBy('criado_em', 'desc');

    if (tipo) query.where('tipo', tipo);
    if (situacao) query.where('situacao', situacao);
    if (ano) {
      query.where((qb) => {
        qb.whereRaw(db.yearWhereRaw('vigencia_inicio'), ['vigencia_inicio', String(ano)]).orWhereRaw(
          db.yearWhereRaw('vigencia_fim'),
          ['vigencia_fim', String(ano)]
        );
      });
    }

    const parcerias = await query;
    return res.json(parcerias);
  } catch (err) {
    next(err);
  }
}

async function criar(req, res, next) {
  try {
    const dados = parceriaSchema.parse(req.body);
    const arquivo_pdf_path = req.file ? req.file.url : null;

    const inserted = await db('parcerias')
      .insert({
        ...dados,
        situacao: dados.situacao || 'vigente',
        arquivo_pdf_path,
      })
      .returning('id');
    const id = db.extractInsertId(inserted);
    const parceria = await db('parcerias').where({ id }).first();
    return res.status(201).json(parceria);
  } catch (err) {
    next(err);
  }
}

async function atualizar(req, res, next) {
  try {
    const dados = parceriaUpdateSchema.parse(req.body);
    const parceria = await db('parcerias').where({ id: req.params.id }).first();
    if (!parceria) {
      return res.status(404).json({ erro: 'Parceria não encontrada.' });
    }

    const atualizacao = { ...dados };
    if (req.file) {
      atualizacao.arquivo_pdf_path = req.file.url;
    }

    await db('parcerias').where({ id: req.params.id }).update(atualizacao);
    const atualizada = await db('parcerias').where({ id: req.params.id }).first();
    return res.json(atualizada);
  } catch (err) {
    next(err);
  }
}

async function remover(req, res, next) {
  try {
    const removido = await db('parcerias').where({ id: req.params.id }).delete();
    if (!removido) {
      return res.status(404).json({ erro: 'Parceria não encontrada.' });
    }
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = { listar, criar, atualizar, remover };
