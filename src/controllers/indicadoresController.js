const db = require('../models/db');

async function indicadores(req, res, next) {
  try {
    const [totalProjetos] = await db('projetos').count('id as total');
    const [totalParcerias] = await db('parcerias').count('id as total');
    const [totalDocumentos] = await db('documentos').where({ publicado: true }).count('id as total');
    const [totalSeletivos] = await db('processos_seletivos').count('id as total');

    const beneficiariosRows = await db('projetos').select('publico_beneficiario');

    return res.json({
      total_projetos: Number(totalProjetos.total),
      total_parcerias: Number(totalParcerias.total),
      total_documentos: Number(totalDocumentos.total),
      total_processos_seletivos: Number(totalSeletivos.total),
      total_beneficiarios_descritos: beneficiariosRows.filter((p) => p.publico_beneficiario).length,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { indicadores };
