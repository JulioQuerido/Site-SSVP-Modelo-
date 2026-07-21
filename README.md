# Portal de Transparência — Instituto Raízes do Cerrado

Template de Portal de Transparência institucional para Organizações da Sociedade Civil (OSC, Associação, Fundação, OSCIP), desenvolvido em conformidade com a legislação brasileira vigente.

## Legislação atendida

| Lei / Norma | Conteúdo |
|---|---|
| Lei 13.019/2014 (MROSC) | Arts. 11, 93 e 94 — publicidade e transparência das parcerias |
| Decreto 8.726/2016 | Relatórios de atividades, metas, demonstrações contábeis, processos seletivos |
| Lei 9.790/1999 (OSCIP) | Arts. 4º e 7º — relatório anual e demonstrações financeiras |
| Lei 12.527/2011 (LAI) | Canal de transparência ativa e ouvidoria com protocolo |
| Res. CFC 1.409/2012 / ITG 2002(R1) | Menção à norma contábil para entidades sem fins lucrativos |
| CF/88, Art. 37 | Princípio da publicidade — acesso sem cadastro ou login |
| LGPD (Lei 13.709/2018) | CPF dos dirigentes exibido parcialmente |

## Estrutura de páginas

| Rota | Seção |
|---|---|
| `/` | Home / Capa com indicadores de impacto |
| `/quem-somos` | Histórico, missão, visão, valores e dados cadastrais |
| `/governanca` | Estatuto, atas, diretoria, conselho fiscal e políticas |
| `/projetos` | Projetos com filtros por status e área |
| `/financeiro` | Demonstrações contábeis por exercício (abas) |
| `/parcerias` | Instrumentos de parceria e visitas de monitoramento |
| `/processos-seletivos` | Editais e resultados de seleções |
| `/relatorios` | Relatórios anuais, certidões e registros |
| `/ouvidoria` | Formulário com geração de número de protocolo |
| `/noticias` | Feed de notícias e publicações |
| `/contato` | Endereço, telefone e mapa |

## Tecnologias

- **React 19** + **TypeScript** + **Vite**
- **WPDS (Washington Post Design System)** — tokens, componentes e acessibilidade
- **React Router v7** — navegação client-side
- **Dados estáticos em TypeScript** — sem necessidade de banco de dados

## Personalização — Passo a Passo

### 1. Dados da entidade
Edite `src/data/entity.ts` e substitua todos os valores pelos dados reais da sua organização:

```ts
export const entity = {
  name: "Nome da Sua Organização",
  shortName: "SIGLA",
  cnpj: "XX.XXX.XXX/XXXX-XX",
  mission: "Sua missão institucional...",
  // ...
};
```

### 2. Projetos
Edite `src/data/projects.ts` — adicione, remova ou edite os projetos da sua entidade.

### 3. Dados financeiros
Edite `src/data/financials.ts` — substitua os exercícios e valores reais. Os `url` dos documentos devem apontar para os PDFs reais.

### 4. Parcerias
Edite `src/data/partnerships.ts` — liste os instrumentos de parceria vigentes e encerrados.

### 5. Governança
Edite `src/data/governance.ts` — preencha a composição real da diretoria e do conselho fiscal.

### 6. Processos seletivos
Edite `src/data/selections.ts`.

### 7. Documentos
Edite `src/data/documents.ts` — aponte os `url` para os PDFs reais hospedados no seu servidor ou Google Drive/Dropbox.

### 8. Cor institucional
Em `src/components/ui.ts` e nos componentes, substitua `#2E7D32` pela cor primária da sua entidade.

### 9. Logo
Em `src/components/Header.tsx` e `src/components/Footer.tsx`, substitua o bloco `LogoMark` (que exibe "IRC") pelo seu logo real:
```tsx
<img src="/logo.svg" alt="Logo da Entidade" height="42" />
```

## Hospedagem estática (GitHub Pages / Netlify)

```bash
npm run build
# O diretório `dist/` contém o site estático pronto para deploy
```

Para GitHub Pages, adicione `base: '/nome-do-repositorio/'` no `vite.config.ts`.

Para Netlify / Vercel, adicione um arquivo `public/_redirects`:
```
/*  /index.html  200
```

## Estrutura de arquivos

```
src/
├── data/           # Dados estáticos (substitua pelos dados reais)
│   ├── entity.ts
│   ├── projects.ts
│   ├── financials.ts
│   ├── partnerships.ts
│   ├── governance.ts
│   ├── selections.ts
│   ├── documents.ts
│   └── news.ts
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── PageHero.tsx
│   └── ui.ts        # Componentes e tokens reutilizáveis
└── pages/
    ├── Home.tsx
    ├── QuemSomos.tsx
    ├── Governanca.tsx
    ├── Projetos.tsx
    ├── Financeiro.tsx
    ├── Parcerias.tsx
    ├── ProcessosSeletivos.tsx
    ├── Relatorios.tsx
    ├── Ouvidoria.tsx
    ├── Noticias.tsx
    └── Contato.tsx
```

## Requisitos técnicos atendidos

- ✅ Design responsivo mobile-first (320px a 1920px)
- ✅ Acessibilidade WCAG 2.1: atributos ARIA, navegação por teclado, contrastes
- ✅ SEO básico: meta tags e Open Graph no `index.html`
- ✅ Sem dependência de backend — dados estáticos em TypeScript
- ✅ Downloads de PDF abrem em nova aba (`target="_blank"`)
- ✅ Acesso público sem necessidade de cadastro ou login
- ✅ Cabeçalho fixo com botão de destaque "Pedido de Informação"
- ✅ Rodapé com aviso "Entidade sem fins lucrativos"
- ✅ Filtros de projetos (por status e área)
- ✅ Abas por exercício fiscal na seção financeira
- ✅ FAQ interativo na ouvidoria
- ✅ Formulário com geração automática de número de protocolo
