const bcrypt = require('bcryptjs');
const db = require('./models/db');
const runMigrations = require('./models/migrations');

async function seed() {
  await runMigrations();

  const existingAdmin = await db('usuarios').where({ email: 'admin@ssvpbrasil.org.br' }).first();
  if (!existingAdmin) {
    const senhaHash = await bcrypt.hash('ssvp@2025', 12);
    await db('usuarios').insert({
      nome: 'Administrador SSVP',
      email: 'admin@ssvpbrasil.org.br',
      senha_hash: senhaHash,
      cargo: 'administrador',
      ativo: true,
    });
    console.log('Usuário admin criado (email: admin@ssvpbrasil.org.br / senha: ssvp@2025)');
  } else {
    console.log('Usuário admin já existe, pulando.');
  }

  const projetosCount = await db('projetos').count('id as count').first();
  if (Number(projetosCount.count) === 0) {
    await db('projetos').insert([
      {
        nome: 'Assistência Alimentar Vicentina',
        status: 'em_andamento',
        periodo_inicio: '2025-01-01',
        periodo_fim: '2025-12-31',
        fonte_recursos: 'Doações e Fomento Municipal',
        valor_total: 250000.0,
        area_tematica: 'Segurança Alimentar',
        publico_beneficiario: 'Famílias em vulnerabilidade social',
        metas_previstas: 'Distribuir 12.000 cestas básicas no ano',
        resultados_alcancados: '7.200 cestas básicas distribuídas até o momento',
        arquivo_pdf_path: null,
      },
      {
        nome: 'Capacitação Profissional Jovem Aprendiz',
        status: 'concluido',
        periodo_inicio: '2024-02-01',
        periodo_fim: '2024-12-20',
        fonte_recursos: 'Convênio Federal',
        valor_total: 180000.0,
        area_tematica: 'Desenvolvimento Humano',
        publico_beneficiario: 'Jovens de 16 a 21 anos',
        metas_previstas: 'Capacitar 150 jovens',
        resultados_alcancados: '162 jovens capacitados, 98 inseridos no mercado de trabalho',
        arquivo_pdf_path: null,
      },
      {
        nome: 'Reforma do Centro de Acolhimento Ozanam',
        status: 'captacao',
        periodo_inicio: null,
        periodo_fim: null,
        fonte_recursos: 'Em captação - editais e doações',
        valor_total: 400000.0,
        area_tematica: 'Infraestrutura Social',
        publico_beneficiario: 'Pessoas em situação de rua',
        metas_previstas: 'Reformar 100% da estrutura física do centro',
        resultados_alcancados: null,
        arquivo_pdf_path: null,
      },
    ]);
    console.log('3 projetos de exemplo inseridos.');
  } else {
    console.log('Projetos já existentes, pulando.');
  }

  const parceriasCount = await db('parcerias').count('id as count').first();
  if (Number(parceriasCount.count) === 0) {
    await db('parcerias').insert([
      {
        numero_instrumento: 'TF-2025-0012',
        tipo: 'fomento',
        orgao_concedente: 'Secretaria Municipal de Assistência Social',
        objeto: 'Manutenção de programa de segurança alimentar',
        valor_total: 250000.0,
        vigencia_inicio: '2025-01-01',
        vigencia_fim: '2025-12-31',
        situacao: 'vigente',
        arquivo_pdf_path: null,
      },
      {
        numero_instrumento: 'CV-2023-0007',
        tipo: 'convenio',
        orgao_concedente: 'Ministério do Desenvolvimento Social',
        objeto: 'Programa de capacitação profissional para jovens',
        valor_total: 180000.0,
        vigencia_inicio: '2023-03-01',
        vigencia_fim: '2024-12-20',
        situacao: 'encerrado',
        arquivo_pdf_path: null,
      },
    ]);
    console.log('2 parcerias de exemplo inseridas.');
  } else {
    console.log('Parcerias já existentes, pulando.');
  }

  const documentosCount = await db('documentos').count('id as count').first();
  if (Number(documentosCount.count) === 0) {
    await db('documentos').insert([
      {
        categoria: 'estatuto',
        titulo: 'Estatuto Social da SSVP - Conselho Nacional do Brasil',
        ano_referencia: 2023,
        arquivo_pdf_path: null,
        data_validade: null,
        publicado: true,
      },
      {
        categoria: 'ata',
        titulo: 'Ata da Assembleia Geral Ordinária 2025',
        ano_referencia: 2025,
        arquivo_pdf_path: null,
        data_validade: null,
        publicado: true,
      },
      {
        categoria: 'relatorio_anual',
        titulo: 'Relatório Anual de Atividades 2024',
        ano_referencia: 2024,
        arquivo_pdf_path: null,
        data_validade: null,
        publicado: true,
      },
    ]);
    console.log('3 documentos de exemplo inseridos.');
  } else {
    console.log('Documentos já existentes, pulando.');
  }

  const configs = [
    { chave: 'ultima_atualizacao', valor: new Date().toISOString().slice(0, 10) },
    { chave: 'aviso_transparencia_ativo', valor: 'true' },
    { chave: 'prazo_resposta_ouvidoria_dias', valor: '20' },
  ];
  for (const cfg of configs) {
    const existing = await db('configuracoes').where({ chave: cfg.chave }).first();
    if (!existing) {
      await db('configuracoes').insert(cfg);
    }
  }
  console.log('Configurações padrão garantidas.');

  console.log('Seed concluído com sucesso.');
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Erro ao rodar seed:', err);
    process.exit(1);
  });
