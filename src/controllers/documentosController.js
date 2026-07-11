const db = require('../models/db');
const { documentoMetaSchema, documentoUpdateSchema } = require('../validators/schemas');

async function listar(req, res, next) {
  try {
    const { categoria, ano } = req.query;
    const query = db('documentos').where({ publicado: true }).orderBy('criado_em', 'desc');

    if (categoria) query.where('categoria', categoria);
    if (ano) query.where('ano_referencia', Number(ano));

    const documentos = await query;
    return res.json(documentos);
  } catch (err) {
    next(err);
  }
}

async function criar(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ erro: 'Arquivo PDF é obrigatório.' });
    }
    const dados = documentoMetaSchema.parse(req.body);
    const arquivo_pdf_path = req.file.url;

    const inserted = await db('documentos')
      .insert({
        ...dados,
        publicado: dados.publicado ?? true,
        arquivo_pdf_path,
      })
      .returning('id');
    const id = db.extractInsertId(inserted);
    const documento = await db('documentos').where({ id }).first();
    return res.status(201).json(documento);
  } catch (err) {
    next(err);
  }
}

async function atualizar(req, res, next) {
  try {
    const dados = documentoUpdateSchema.parse(req.body);
    const documento = await db('documentos').where({ id: req.params.id }).first();
    if (!documento) {
      return res.status(404).json({ erro: 'Documento não encontrado.' });
    }

    const atualizacao = { ...dados };
    if (req.file) {
      atualizacao.arquivo_pdf_path = req.file.url;
    }

    await db('documentos').where({ id: req.params.id }).update(atualizacao);
    const atualizado = await db('documentos').where({ id: req.params.id }).first();
    return res.json(atualizado);
  } catch (err) {
    next(err);
  }
}

async function remover(req, res, next) {
  try {
    const removido = await db('documentos').where({ id: req.params.id }).delete();
    if (!removido) {
      return res.status(404).json({ erro: 'Documento não encontrado.' });
    }
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = { listar, criar, atualizar, remover };
