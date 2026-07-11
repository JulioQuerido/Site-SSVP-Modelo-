const validator = require('validator');
const db = require('../models/db');
const { ouvidoriaSchema, ouvidoriaResponderSchema } = require('../validators/schemas');
const { gerarProtocolo } = require('../services/protocoloService');
const { sendProtocoloConfirmacao, sendAlertaOuvidoria, sendRespostaOuvidoria } = require('../services/emailService');

const PRAZO_PADRAO_DIAS = 20;

async function getPrazoResposta() {
  const config = await db('configuracoes').where({ chave: 'prazo_resposta_ouvidoria_dias' }).first();
  const prazo = config ? Number(config.valor) : PRAZO_PADRAO_DIAS;
  return Number.isNaN(prazo) ? PRAZO_PADRAO_DIAS : prazo;
}

async function criar(req, res, next) {
  try {
    const dados = ouvidoriaSchema.parse(req.body);

    const nomeSanitizado = dados.nome ? validator.escape(validator.trim(dados.nome)) : null;
    const descricaoSanitizada = validator.escape(validator.trim(dados.descricao));

    const protocolo = await gerarProtocolo();
    const prazoDias = await getPrazoResposta();

    await db('ouvidoria_mensagens').insert({
      protocolo,
      nome: nomeSanitizado,
      email: dados.email || null,
      tipo: dados.tipo,
      descricao: descricaoSanitizada,
      status: 'recebido',
    });

    sendProtocoloConfirmacao({ email: dados.email, protocolo, prazoDias }).catch((err) =>
      console.error('Erro ao enviar e-mail de confirmação:', err.message)
    );
    sendAlertaOuvidoria({ protocolo, tipo: dados.tipo, descricao: descricaoSanitizada }).catch((err) =>
      console.error('Erro ao enviar alerta de ouvidoria:', err.message)
    );

    return res.status(201).json({
      protocolo,
      prazo_resposta: `${prazoDias} dias úteis`,
      status: 'recebido',
    });
  } catch (err) {
    next(err);
  }
}

async function consultarProtocolo(req, res, next) {
  try {
    const mensagem = await db('ouvidoria_mensagens')
      .select('protocolo', 'tipo', 'status', 'resposta', 'criado_em', 'respondido_em')
      .where({ protocolo: req.params.protocolo })
      .first();

    if (!mensagem) {
      return res.status(404).json({ erro: 'Protocolo não encontrado.' });
    }

    return res.json(mensagem);
  } catch (err) {
    next(err);
  }
}

async function listar(req, res, next) {
  try {
    const { status, tipo } = req.query;
    const query = db('ouvidoria_mensagens').select('*').orderBy('criado_em', 'desc');
    if (status) query.where('status', status);
    if (tipo) query.where('tipo', tipo);
    const mensagens = await query;
    return res.json(mensagens);
  } catch (err) {
    next(err);
  }
}

async function responder(req, res, next) {
  try {
    const { resposta, status } = ouvidoriaResponderSchema.parse(req.body);
    const mensagem = await db('ouvidoria_mensagens').where({ id: req.params.id }).first();
    if (!mensagem) {
      return res.status(404).json({ erro: 'Mensagem não encontrada.' });
    }

    await db('ouvidoria_mensagens')
      .where({ id: req.params.id })
      .update({
        resposta,
        status: status || 'respondido',
        respondido_em: db.fn.now(),
      });

    sendRespostaOuvidoria({ email: mensagem.email, protocolo: mensagem.protocolo, resposta }).catch((err) =>
      console.error('Erro ao enviar e-mail de resposta:', err.message)
    );

    const atualizada = await db('ouvidoria_mensagens').where({ id: req.params.id }).first();
    return res.json(atualizada);
  } catch (err) {
    next(err);
  }
}

module.exports = { criar, consultarProtocolo, listar, responder };
