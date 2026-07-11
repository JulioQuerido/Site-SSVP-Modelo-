const db = require('./db');

async function runMigrations() {
  const hasUsuarios = await db.schema.hasTable('usuarios');
  if (!hasUsuarios) {
    await db.schema.createTable('usuarios', (table) => {
      table.increments('id').primary();
      table.string('nome').notNullable();
      table.string('email').notNullable().unique();
      table.string('senha_hash').notNullable();
      table.string('cargo').notNullable().defaultTo('administrador');
      table.boolean('ativo').notNullable().defaultTo(true);
      table.timestamp('criado_em').defaultTo(db.fn.now());
    });
    console.log('Tabela "usuarios" criada.');
  }

  const hasProjetos = await db.schema.hasTable('projetos');
  if (!hasProjetos) {
    await db.schema.createTable('projetos', (table) => {
      table.increments('id').primary();
      table.string('nome').notNullable();
      table.enu('status', ['em_andamento', 'concluido', 'captacao']).notNullable().defaultTo('em_andamento');
      table.date('periodo_inicio');
      table.date('periodo_fim');
      table.string('fonte_recursos');
      table.decimal('valor_total', 14, 2);
      table.string('area_tematica');
      table.text('publico_beneficiario');
      table.text('metas_previstas');
      table.text('resultados_alcancados');
      table.string('arquivo_pdf_path');
      table.timestamp('criado_em').defaultTo(db.fn.now());
      table.timestamp('atualizado_em').defaultTo(db.fn.now());
    });
    console.log('Tabela "projetos" criada.');
  }

  const hasDocumentos = await db.schema.hasTable('documentos');
  if (!hasDocumentos) {
    await db.schema.createTable('documentos', (table) => {
      table.increments('id').primary();
      table.enu('categoria', [
        'estatuto',
        'ata',
        'relatorio_anual',
        'demonstracao_financeira',
        'auditoria',
        'certidao',
        'regimento',
        'plano_trabalho',
        'outros',
      ]).notNullable();
      table.string('titulo').notNullable();
      table.integer('ano_referencia');
      table.string('arquivo_pdf_path');
      table.date('data_validade');
      table.boolean('publicado').notNullable().defaultTo(true);
      table.timestamp('criado_em').defaultTo(db.fn.now());
    });
    console.log('Tabela "documentos" criada.');
  }

  const hasParcerias = await db.schema.hasTable('parcerias');
  if (!hasParcerias) {
    await db.schema.createTable('parcerias', (table) => {
      table.increments('id').primary();
      table.string('numero_instrumento').notNullable();
      table.enu('tipo', ['fomento', 'colaboracao', 'convenio', 'contrato']).notNullable();
      table.string('orgao_concedente').notNullable();
      table.text('objeto').notNullable();
      table.decimal('valor_total', 14, 2);
      table.date('vigencia_inicio');
      table.date('vigencia_fim');
      table.enu('situacao', ['vigente', 'encerrado', 'suspenso']).notNullable().defaultTo('vigente');
      table.string('arquivo_pdf_path');
      table.timestamp('criado_em').defaultTo(db.fn.now());
    });
    console.log('Tabela "parcerias" criada.');
  }

  const hasSeletivos = await db.schema.hasTable('processos_seletivos');
  if (!hasSeletivos) {
    await db.schema.createTable('processos_seletivos', (table) => {
      table.increments('id').primary();
      table.string('cargo_funcao').notNullable();
      table.date('data_edital').notNullable();
      table.enu('status', ['aberto', 'encerrado', 'cancelado']).notNullable().defaultTo('aberto');
      table.string('arquivo_edital_path');
      table.string('arquivo_resultado_path');
      table.timestamp('criado_em').defaultTo(db.fn.now());
    });
    console.log('Tabela "processos_seletivos" criada.');
  }

  const hasOuvidoria = await db.schema.hasTable('ouvidoria_mensagens');
  if (!hasOuvidoria) {
    await db.schema.createTable('ouvidoria_mensagens', (table) => {
      table.increments('id').primary();
      table.string('protocolo').notNullable().unique();
      table.string('nome');
      table.string('email');
      table.enu('tipo', ['informacao', 'denuncia', 'sugestao', 'elogio', 'outro']).notNullable();
      table.text('descricao').notNullable();
      table.enu('status', ['recebido', 'em_analise', 'respondido', 'arquivado']).notNullable().defaultTo('recebido');
      table.text('resposta');
      table.timestamp('criado_em').defaultTo(db.fn.now());
      table.timestamp('respondido_em');
    });
    console.log('Tabela "ouvidoria_mensagens" criada.');
  }

  const hasConfiguracoes = await db.schema.hasTable('configuracoes');
  if (!hasConfiguracoes) {
    await db.schema.createTable('configuracoes', (table) => {
      table.increments('id').primary();
      table.string('chave').notNullable().unique();
      table.text('valor');
      table.timestamp('atualizado_em').defaultTo(db.fn.now());
    });
    console.log('Tabela "configuracoes" criada.');
  }

  console.log('Migrações concluídas com sucesso.');
}

if (require.main === module) {
  runMigrations()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('Erro ao rodar migrações:', err);
      process.exit(1);
    });
}

module.exports = runMigrations;
