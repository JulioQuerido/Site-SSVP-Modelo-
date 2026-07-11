const { z } = require('zod');

const loginSchema = z.object({
  email: z.string().email('E-mail inválido.'),
  senha: z.string().min(6, 'Senha deve ter ao menos 6 caracteres.'),
});

const projetoSchema = z.object({
  nome: z.string().min(3),
  status: z.enum(['em_andamento', 'concluido', 'captacao']),
  periodo_inicio: z.string().optional().nullable(),
  periodo_fim: z.string().optional().nullable(),
  fonte_recursos: z.string().optional().nullable(),
  valor_total: z.coerce.number().optional().nullable(),
  area_tematica: z.string().optional().nullable(),
  publico_beneficiario: z.string().optional().nullable(),
  metas_previstas: z.string().optional().nullable(),
  resultados_alcancados: z.string().optional().nullable(),
});

const projetoUpdateSchema = projetoSchema.partial();

const documentoMetaSchema = z.object({
  categoria: z.enum([
    'estatuto',
    'ata',
    'relatorio_anual',
    'demonstracao_financeira',
    'auditoria',
    'certidao',
    'regimento',
    'plano_trabalho',
    'outros',
  ]),
  titulo: z.string().min(3),
  ano_referencia: z.coerce.number().int().optional().nullable(),
  data_validade: z.string().optional().nullable(),
  publicado: z.coerce.boolean().optional(),
});

const documentoUpdateSchema = documentoMetaSchema.partial();

const parceriaSchema = z.object({
  numero_instrumento: z.string().min(1),
  tipo: z.enum(['fomento', 'colaboracao', 'convenio', 'contrato']),
  orgao_concedente: z.string().min(1),
  objeto: z.string().min(1),
  valor_total: z.coerce.number().optional().nullable(),
  vigencia_inicio: z.string().optional().nullable(),
  vigencia_fim: z.string().optional().nullable(),
  situacao: z.enum(['vigente', 'encerrado', 'suspenso']).optional(),
});

const parceriaUpdateSchema = parceriaSchema.partial();

const seletivoSchema = z.object({
  cargo_funcao: z.string().min(1),
  data_edital: z.string(),
  status: z.enum(['aberto', 'encerrado', 'cancelado']).optional(),
});

const seletivoUpdateSchema = seletivoSchema.partial();

const ouvidoriaSchema = z.object({
  nome: z.string().max(150).optional().nullable(),
  email: z.string().email('E-mail inválido.').optional().nullable(),
  tipo: z.enum(['informacao', 'denuncia', 'sugestao', 'elogio', 'outro']),
  descricao: z.string().min(10, 'Descreva sua mensagem com ao menos 10 caracteres.').max(5000),
});

const ouvidoriaResponderSchema = z.object({
  resposta: z.string().min(1),
  status: z.enum(['recebido', 'em_analise', 'respondido', 'arquivado']).optional(),
});

const configuracoesSchema = z.object({
  configuracoes: z.array(
    z.object({
      chave: z.string().min(1),
      valor: z.string(),
    })
  ),
});

const contatoSchema = z.object({
  nome: z.string().min(2).max(150),
  email: z.string().email('E-mail inválido.'),
  assunto: z.string().min(2).max(200).optional().nullable(),
  mensagem: z.string().min(10).max(5000),
});

module.exports = {
  loginSchema,
  projetoSchema,
  projetoUpdateSchema,
  documentoMetaSchema,
  documentoUpdateSchema,
  parceriaSchema,
  parceriaUpdateSchema,
  seletivoSchema,
  seletivoUpdateSchema,
  ouvidoriaSchema,
  ouvidoriaResponderSchema,
  configuracoesSchema,
  contatoSchema,
};
