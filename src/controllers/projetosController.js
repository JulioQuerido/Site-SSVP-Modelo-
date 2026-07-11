const db = require('../models/db');
const { projetoSchema, projetoUpdateSchema } = require('../validators/schemas');

async function listar(req, res, next) {
  try {
    const { status, area, ano } = req.query;
    const query = db('projetos').select('*').orderBy('criado_em', 'desc');

    if (status) query.where('status', status);
    if (area) query.where('area_tematica', area);
    if (ano) {
      query.where((qb) => {
        qb.whereRaw(db.yearWhereRaw('periodo_inicio'), ['periodo_inicio', String(ano)]).orWhereRaw(
          db.yearWhereRaw('periodo_fim'),
          ['periodo_fim', String(ano)]
        );
      });
    }

    const projetos = await query;
    return res.json(projetos);
  } catch (err) {
    next(err);
  }
}

async function detalhar(req, res, next) {
  try {
    const projeto = await db('projetos').where({ id: req.params.id }).first();
    if (!projeto) {
      return res.status(404).json({ erro: 'Projeto não encontrado.' });
    }
    return res.json(projeto);
  } catch (err) {
    next(err);
  }
}

async function criar(req, res, next) {
  try {
    const dados = projetoSchema.parse(req.body);
    const arquivo_pdf_path = req.file ? req.file.url : null;

    const inserted = await db('projetos').insert({ ...dados, arquivo_pdf_path }).returning('id');
    const id = db.extractInsertId(inserted);
    const projeto = await db('projetos').where({ id }).first();
    return res.status(201).json(projeto);
  } catch (err) {
    next(err);
  }
}

async function atualizar(req, res, next) {
  try {
    const dados = projetoUpdateSchema.parse(req.body);
    const projeto = await db('projetos').where({ id: req.params.id }).first();
    if (!projeto) {
      return res.status(404).json({ erro: 'Projeto não encontrado.' });
    }

    const atualizacao = { ...dados, atualizado_em: db.fn.now() };
    if (req.file) {
      atualizacao.arquivo_pdf_path = req.file.url;
    }

    await db('projetos').where({ id: req.params.id }).update(atualizacao);
    const atualizado = await db('projetos').where({ id: req.params.id }).first();
    return res.json(atualizado);
  } catch (err) {
    next(err);
  }
}

async function remover(req, res, next) {
  try {
    const removido = await db('projetos').where({ id: req.params.id }).delete();
    if (!removido) {
      return res.status(404).json({ erro: 'Projeto não encontrado.' });
    }
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = { listar, detalhar, criar, atualizar, remover };
