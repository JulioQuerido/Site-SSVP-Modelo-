# Portal de Transparência SSVP — Backend

API REST para o Portal de Transparência da **Sociedade de São Vicente de Paulo (SSVP) – Conselho Nacional do Brasil**.

Stack: Node.js 20+, Express, SQLite (`better-sqlite3`) via Knex.js, JWT, Multer, Zod, Nodemailer.

---

## 1. Instalação e execução

```bash
npm install
cp .env.example .env        # edite os valores conforme seu ambiente
npm run migrate             # cria as tabelas no SQLite
npm run seed                # popula usuário admin + dados de exemplo
npm start                   # inicia em produção
# ou, em desenvolvimento com reload automático:
npm run dev
```

O servidor sobe em `http://localhost:3001` (ou na porta definida em `PORT`).

Login do administrador semeado pelo `npm run seed`:

- **E-mail:** `admin@ssvpbrasil.org.br`
- **Senha:** `ssvp@2025`

> Troque essa senha assim que possível criando um novo usuário admin e desativando o padrão (`ativo = false`), já que não há endpoint de troca de senha nesta versão — isso pode ser feito diretamente no banco ou em uma futura rota administrativa.

### Variáveis de ambiente (`.env`)

Veja `.env.example` para a lista completa. Destaques:

| Variável | Descrição |
|---|---|
| `DATABASE_PATH` | Caminho do arquivo SQLite |
| `JWT_SECRET` / `JWT_REFRESH_SECRET` | Segredos de assinatura dos tokens (troque em produção) |
| `CORS_ORIGIN` | URL do frontend autorizada a consumir a API |
| `SMTP_*`, `EMAIL_FROM`, `EMAIL_OUVIDORIA` | Configuração de envio de e-mail (Nodemailer) |
| `UPLOAD_PATH`, `MAX_FILE_SIZE_MB` | Configuração de upload de PDFs |
| `IPEA_FICHA_URL`, `IPEA_CACHE_TTL_HOURS` | Proxy/cache da ficha do Mapa OSC (IPEA) |

Se `SMTP_HOST`/`SMTP_USER` não estiverem configurados, o serviço de e-mail apenas loga um aviso no console e não falha a requisição (ex: ouvidoria continua gerando o protocolo normalmente).

---

## 2. Documentação dos endpoints

Base URL: `/api/v1`

Todas as respostas são JSON. Erros seguem o formato `{ "erro": "mensagem" }` (erros de validação retornam também `detalhes`).

### 2.1 Autenticação

**POST `/auth/login`** — rate limit: 20 tentativas/hora

```json
// Request
{ "email": "admin@ssvpbrasil.org.br", "senha": "ssvp@2025" }

// Response 200
{
  "token": "eyJhbGciOi...",
  "refreshToken": "eyJhbGciOi...",
  "usuario": { "id": 1, "nome": "Administrador SSVP", "email": "admin@ssvpbrasil.org.br", "cargo": "administrador" }
}
```

**POST `/auth/refresh`**

```json
// Request
{ "refreshToken": "eyJhbGciOi..." }
// Response 200
{ "token": "novo-token", "refreshToken": "novo-refresh-token" }
```

**POST `/auth/logout`** → `{ "mensagem": "Sessão encerrada. Descarte o token no cliente." }`
(JWT é stateless; o "logout" real acontece descartando o token no cliente.)

Rotas `/admin/*` exigem header `Authorization: Bearer <token>`.

### 2.2 Projetos

**GET `/projetos?status=&area=&ano=`** — público

```json
[
  {
    "id": 1, "nome": "Assistência Alimentar Vicentina", "status": "em_andamento",
    "periodo_inicio": "2025-01-01", "periodo_fim": "2025-12-31",
    "fonte_recursos": "Doações e Fomento Municipal", "valor_total": 250000,
    "area_tematica": "Segurança Alimentar", "publico_beneficiario": "Famílias em vulnerabilidade social",
    "metas_previstas": "...", "resultados_alcancados": "...", "arquivo_pdf_path": null,
    "criado_em": "...", "atualizado_em": "..."
  }
]
```

**GET `/projetos/:id`** — público, detalhe único (404 se não existir)

**POST `/admin/projetos`** — admin, `multipart/form-data` (campo de arquivo opcional: `arquivo`, PDF)

```
nome, status(em_andamento|concluido|captacao), periodo_inicio, periodo_fim,
fonte_recursos, valor_total, area_tematica, publico_beneficiario,
metas_previstas, resultados_alcancados, arquivo (PDF opcional)
```

**PUT `/admin/projetos/:id`** — admin, mesmos campos (parciais)

**DELETE `/admin/projetos/:id`** — admin → `204 No Content`

### 2.3 Documentos

**GET `/documentos?categoria=&ano=`** — público, retorna apenas documentos com `publicado = true`

**POST `/admin/documentos`** — admin, `multipart/form-data`, arquivo PDF **obrigatório** (campo `arquivo`)

```
categoria (estatuto|ata|relatorio_anual|demonstracao_financeira|auditoria|certidao|regimento|plano_trabalho|outros)
titulo, ano_referencia, data_validade, publicado, arquivo (PDF, obrigatório)
```

**PUT `/admin/documentos/:id`** — admin, atualiza metadados (arquivo opcional)

**DELETE `/admin/documentos/:id`** — admin

### 2.4 Parcerias

**GET `/parcerias?tipo=&situacao=&ano=`** — público

**POST `/admin/parcerias`** — admin, `multipart/form-data`

```
numero_instrumento, tipo(fomento|colaboracao|convenio|contrato), orgao_concedente,
objeto, valor_total, vigencia_inicio, vigencia_fim, situacao(vigente|encerrado|suspenso),
arquivo (PDF opcional)
```

**PUT `/admin/parcerias/:id`** / **DELETE `/admin/parcerias/:id`** — admin

### 2.5 Processos seletivos

**GET `/seletivos?status=`** — público

**GET `/admin/seletivos`** — admin (mesma listagem, autenticada)

**POST `/admin/seletivos`** — admin, `multipart/form-data` com campos de arquivo `edital` e `resultado` (ambos PDF, opcionais)

```
cargo_funcao, data_edital, status(aberto|encerrado|cancelado), edital, resultado
```

**PUT `/admin/seletivos/:id`** — admin

### 2.6 Ouvidoria

**POST `/ouvidoria`** — público, rate limit: 10 req/15min

```json
// Request
{ "nome": "Fulano", "email": "fulano@email.com", "tipo": "sugestao", "descricao": "Texto da manifestação..." }

// Response 201
{ "protocolo": "SSVP-2026-00001", "prazo_resposta": "20 dias úteis", "status": "recebido" }
```

Ao receber a mensagem: gera protocolo único `SSVP-{ANO}-{NNNNN}`, grava no banco, envia e-mail de confirmação ao solicitante (se e-mail informado) e um alerta para `EMAIL_OUVIDORIA`.

**GET `/ouvidoria/protocolo/:protocolo`** — público, consulta status

```json
{ "protocolo": "SSVP-2026-00001", "tipo": "sugestao", "status": "respondido", "resposta": "...", "criado_em": "...", "respondido_em": "..." }
```

**GET `/admin/ouvidoria?status=&tipo=`** — admin, lista todas as mensagens

**PUT `/admin/ouvidoria/:id/responder`** — admin

```json
// Request
{ "resposta": "Texto da resposta oficial.", "status": "respondido" }
```

Envia e-mail de resposta ao solicitante (se e-mail informado).

### 2.7 Indicadores

**GET `/indicadores`** — público

```json
{
  "total_projetos": 3, "total_parcerias": 2, "total_documentos": 3,
  "total_processos_seletivos": 0, "total_beneficiarios_descritos": 3
}
```

### 2.8 Configurações

**GET `/admin/configuracoes`** — admin

**PUT `/admin/configuracoes`** — admin

```json
// Request
{ "configuracoes": [ { "chave": "aviso_transparencia_ativo", "valor": "false" } ] }
```

### 2.9 Contato

**POST `/contato`** — público, envia e-mail direto para a ouvidoria (não persiste no banco)

```json
{ "nome": "Fulano", "email": "fulano@email.com", "assunto": "Dúvida", "mensagem": "..." }
```

### 2.10 Integração Mapa OSC / IPEA

**GET `/ipea/ficha`** — público, proxy com cache

```json
{
  "nome": "Sociedade de São Vicente de Paulo – Conselho Nacional do Brasil",
  "cnpj": "34.127.563/0001-67",
  "area_atuacao": "Assistência Social, Desenvolvimento Humano",
  "link_ipea": "https://mapaosc.ipea.gov.br/detalhar/844520",
  "status": "ipea" // ou "fallback" se o IPEA estiver indisponível
}
```

Cache em memória (`node-cache`) + arquivo `cache/ipea_ficha.json` para sobreviver a reinícios, TTL configurável via `IPEA_CACHE_TTL_HOURS` (padrão 24h). A extração de CNPJ do HTML é best-effort (regex); se o layout da página do IPEA mudar ou o CNPJ não puder ser identificado com segurança, prefira ajustar `FALLBACK_DATA` em `src/services/ipeaService.js` com os dados oficiais.

### Arquivos enviados

PDFs enviados via upload ficam acessíveis publicamente em `GET /uploads/<nome-do-arquivo>.pdf` (servidos como arquivos estáticos).

---

## 3. Segurança implementada

- **Helmet** para cabeçalhos de segurança.
- **Rate limiting** (`express-rate-limit`): 100 req/15min em rotas públicas, 10 req/15min em `POST /ouvidoria`, 20 tentativas/hora em `POST /auth/login`.
- **Validação de payloads** com Zod em todos os endpoints de escrita.
- **Sanitização de texto livre** (nome/descrição da ouvidoria, mensagem de contato) com `validator.js`.
- **Upload restrito a PDF** (validação de mimetype + extensão), limite de tamanho configurável.
- **Senhas com bcrypt** (`bcryptjs`, salt rounds 12).
- **JWT** de acesso (padrão 8h) + refresh token (padrão 7 dias) com segredos distintos.
- **CORS** restrito à origem configurada em `CORS_ORIGIN`.

---

## 4. Deploy

### 4.1 Railway / Render (free tier)

1. Suba este repositório para o GitHub.
2. Crie um novo serviço apontando para a raiz do repositório.
3. Configure as variáveis de ambiente do `.env.example` no painel do serviço (não faça commit do `.env`).
4. Comando de build: `npm install`.
5. Comando de start: `npm start` (o próprio `server.js` roda as migrações automaticamente antes de subir o servidor).
6. **Persistência do SQLite:** tanto Railway quanto Render usam sistemas de arquivo efêmeros nos planos free — a cada novo deploy o arquivo `.db` pode ser recriado. Para persistência real, anexe um **volume persistente** (Railway: "Volumes"; Render: "Disks") montado no caminho de `DATABASE_PATH` (e também em `UPLOAD_PATH`, para não perder os PDFs enviados).
7. Rode o seed uma única vez após o primeiro deploy (via shell/console do provedor): `npm run seed`.

### 4.2 Vercel (serverless) — Postgres + Blob

> **Por que não SQLite no Vercel:** funções serverless rodam em instâncias efêmeras com sistema de
> arquivos somente leitura (exceto `/tmp`). Um arquivo `.db` local ou PDFs salvos em disco não
> sobrevivem entre invocações/deploys e podem ficar inconsistentes entre instâncias concorrentes.
> Por isso, para produção no Vercel este backend usa **Postgres** (via Knex + `pg`) no lugar do
> SQLite e **Vercel Blob** no lugar do disco local para os PDFs — ativados automaticamente quando
> `DATABASE_URL` e `BLOB_READ_WRITE_TOKEN` estão definidos (veja `src/models/db.js` e
> `src/middlewares/upload.js`). Sem essas variáveis, o deploy sobe mas todo endpoint que grava dados
> falha com erro claro em vez de corromper dados silenciosamente.

Passo a passo:

1. **Importar o projeto no Vercel**: no painel do Vercel, "Add New… → Project" e selecione o repositório do GitHub (`ssvp-portal-backend`). O `vercel.json` já direciona todas as rotas para a função serverless em `api/index.js`, que exporta o Express app (`src/app.js`).
2. **Adicionar um banco Postgres**: na aba **Storage** do projeto, clique em "Create Database" → **Neon (Postgres)** (tier gratuito). O Vercel injeta automaticamente a variável `DATABASE_URL` (ou similar, ex. `POSTGRES_URL`) no projeto — se o nome vier diferente de `DATABASE_URL`, adicione manualmente uma variável de ambiente `DATABASE_URL` apontando para a mesma connection string (de preferência a **pooled connection**, recomendada para serverless).
3. **Adicionar um Blob store**: ainda em **Storage**, "Create Database" → **Blob**. Isso injeta `BLOB_READ_WRITE_TOKEN` automaticamente no projeto.
4. **Demais variáveis de ambiente**: copie do `.env.example` (`JWT_SECRET`, `JWT_REFRESH_SECRET`, `CORS_ORIGIN`, `SMTP_*`, `EMAIL_FROM`, `EMAIL_OUVIDORIA`, `MAX_FILE_SIZE_MB`) na aba **Settings → Environment Variables**. Não defina `DATABASE_PATH`/`UPLOAD_PATH` (são ignorados quando `DATABASE_URL`/`BLOB_READ_WRITE_TOKEN` existem).
5. **Rodar as migrações uma única vez** contra o Postgres de produção (o `api/index.js` **não** roda migrações a cada invocação, para evitar corrida entre instâncias). Da sua máquina, com a `DATABASE_URL` de produção (pegue em Settings → Environment Variables ou via `vercel env pull`):
   ```bash
   DATABASE_URL="postgresql://...sua-connection-string..." npm run migrate
   DATABASE_URL="postgresql://...sua-connection-string..." npm run seed   # opcional, dados de exemplo
   ```
6. **Deploy**: qualquer push para a branch de produção conectada dispara um novo deploy automaticamente (padrão do Vercel ao importar do GitHub).
7. **Limitação conhecida**: o rate limiting (`express-rate-limit`) guarda contadores em memória por instância — em serverless isso significa que o limite é "por instância quente", não um limite global exato. Para um limite rigoroso entre instâncias, seria necessário um store externo (ex. Redis/Upstash), fora do escopo desta versão.

### 4.3 VPS simples (Ubuntu/Debian)

```bash
# instalar Node 20+
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs build-essential

git clone <seu-repositorio>
cd ssvp-portal-backend
npm install
cp .env.example .env   # edite com os valores de produção
npm run migrate
npm run seed

# manter o processo vivo com pm2
sudo npm install -g pm2
pm2 start src/server.js --name ssvp-backend
pm2 save
pm2 startup
```

Configure um proxy reverso (Nginx/Caddy) apontando para a porta definida em `PORT`, com HTTPS via Let's Encrypt.

### 4.4 Conectando ao frontend

No frontend, aponte a URL base da API para o backend publicado (ex: `https://api.seudominio.org.br/api/v1`) e, no backend, defina:

```
CORS_ORIGIN=https://seu-frontend.vercel.app
```

Apenas uma origem é suportada nativamente pela configuração atual do CORS; para múltiplas origens (ex: produção + preview), ajuste `src/app.js` para aceitar uma lista separada por vírgulas em `CORS_ORIGIN`.

---

## 5. Estrutura de pastas

```
/ssvp-portal-backend
  /api
    index.js       # entrypoint serverless para o Vercel (exporta o Express app)
  /src
    /controllers   # lógica de cada recurso
    /routes        # definição das rotas Express (públicas + admin)
    /middlewares   # authenticate, upload (Multer/Blob), errorHandler, rateLimiters
    /models        # db.js (conexão Knex, SQLite ou Postgres), migrations.js
    /services      # emailService (Nodemailer), protocoloService, ipeaService
    /validators    # schemas Zod
    app.js
    server.js      # bootstrap para uso local/VPS (app.listen)
    seed.js
  /public/uploads  # PDFs enviados em modo disco local (servidos em /uploads)
  /data            # banco SQLite (modo local/VPS)
  /cache           # cache em disco da ficha IPEA
  vercel.json      # roteia todas as requisições para api/index.js
  .env.example
  package.json
```

## 6. SQLite vs. Postgres — como a troca funciona

O acesso ao banco é feito inteiramente via Knex.js. `src/models/db.js` escolhe o driver automaticamente:

- **Sem `DATABASE_URL` definida** → usa SQLite (`better-sqlite3`), lendo/gravando o arquivo de `DATABASE_PATH`. Ideal para rodar localmente ou em uma unidade vicentina com um VPS/Railway/Render simples.
- **Com `DATABASE_URL` definida** → usa Postgres (`pg`). É o modo usado no deploy do Vercel (seção 4.2).

Alguns pontos que tornam o código portável entre os dois:

- Filtros por ano (`projetos`, `parcerias`) usam `db.yearWhereRaw(coluna)`, que gera `strftime('%Y', ...)` no SQLite e `EXTRACT(YEAR FROM ...)` no Postgres.
- Inserções que precisam do id gerado usam `.returning('id')` + `db.extractInsertId(...)`, porque o Postgres — ao contrário do SQLite/MySQL — só devolve o id se `.returning()` for pedido explicitamente.
- Upload de PDF é abstraído em `src/middlewares/upload.js`: grava em disco local por padrão, ou no Vercel Blob quando `BLOB_READ_WRITE_TOKEN` está definido; os controllers sempre leem `req.file.url` (ou `req.files.<campo>[0].url`), sem se importar com qual dos dois foi usado.

Se quiser migrar um VPS existente de SQLite para Postgres, basta provisionar um banco Postgres (Neon, RDS, etc.), rodar `DATABASE_URL=... npm run migrate` para criar as tabelas, migrar os dados manualmente (ou reexecutar o `seed.js`) e definir `DATABASE_URL` no ambiente de produção.
