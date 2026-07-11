const db = require('../models/db');

async function gerarProtocolo() {
  const ano = new Date().getFullYear();
  const prefixo = `SSVP-${ano}-`;

  return db.transaction(async (trx) => {
    const ultimo = await trx('ouvidoria_mensagens')
      .where('protocolo', 'like', `${prefixo}%`)
      .orderBy('id', 'desc')
      .first();

    let proximoSequencial = 1;
    if (ultimo) {
      const partes = ultimo.protocolo.split('-');
      const numero = parseInt(partes[2], 10);
      if (!Number.isNaN(numero)) {
        proximoSequencial = numero + 1;
      }
    }

    const sequencialFormatado = String(proximoSequencial).padStart(5, '0');
    return `${prefixo}${sequencialFormatado}`;
  });
}

module.exports = { gerarProtocolo };
