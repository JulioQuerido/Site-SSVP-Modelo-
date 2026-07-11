const { buscarFichaIpea } = require('../services/ipeaService');

async function ficha(req, res, next) {
  try {
    const dados = await buscarFichaIpea();
    return res.json(dados);
  } catch (err) {
    next(err);
  }
}

module.exports = { ficha };
