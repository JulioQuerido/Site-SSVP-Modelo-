// Conteúdo ilustrativo — substituir pelas publicações reais do CNB.
// O campo `image` é opcional: quando presente, é exibido no topo do card.
export interface NewsItem {
  id: number;
  title: string;
  date: string;
  category: string;
  summary: string;
  image?: string;
  url: string;
}

export const news: NewsItem[] = [
  {
    id: 0,
    title: "54ª Romaria Nacional dos Vicentinos reúne confrades de todo o Brasil em Aparecida",
    date: "05/07/2026",
    category: "Eventos",
    summary:
      "Terço no Caminho do Rosário, Via Sacra no Morro do Cruzeiro, Santa Missa e o Festival Cultural Ozanam marcaram a maior peregrinação anual da rede vicentina ao Santuário Nacional.",
    image:
      "https://www.ssvpbrasil.org.br/source/files/c/8791/GALERIA-54_Romaria_VIA_SACRA_18-930487_1920-1080-0-0.jpg",
    url: "https://www.ssvpbrasil.org.br/galeriavicentina/54a-romaria-nacional-dos-vicentinos-a-aparecida",
  },
  {
    id: 1,
    title: "SSVP reafirma compromisso com a transparência e publica portal atualizado",
    date: "01/07/2026",
    category: "Institucional",
    summary:
      "O Conselho Nacional do Brasil disponibiliza seu Portal de Transparência com dados institucionais, financeiros e de governança, em conformidade com o MROSC e a LAI.",
    url: "#",
  },
  {
    id: 2,
    title: "ECAFO abre novas turmas de formação para voluntários vicentinos",
    date: "10/06/2026",
    category: "Processo Seletivo",
    summary:
      "A Escola de Capacitação Antônio Frederico Ozanam oferece formação continuada para voluntários e coordenadores da rede vicentina em todo o país.",
    url: "#",
  },
  {
    id: 3,
    title: "Campanha nacional arrecada alimentos para famílias em vulnerabilidade",
    date: "20/05/2026",
    category: "Projetos",
    summary:
      "As Conferências vicentinas mobilizaram voluntários e comunidades em ação solidária de combate à fome e à pobreza.",
    url: "#",
  },
  {
    id: 4,
    title: "Relatório anual e demonstrações contábeis disponíveis para consulta",
    date: "28/02/2026",
    category: "Transparência",
    summary:
      "As demonstrações contábeis do exercício, elaboradas conforme a ITG 2002(R1) do CFC, estão disponíveis na seção Transparência Financeira do portal.",
    url: "#",
  },
  {
    id: 5,
    title: "Rede de Afeto amplia ações de acolhimento a pessoas idosas",
    date: "20/01/2026",
    category: "Projetos",
    summary:
      "O serviço vicentino de acolhimento e cuidado expande-se para novas unidades, promovendo dignidade e combate à solidão.",
    url: "#",
  },
  {
    id: 6,
    title: "Comissão de Jovens (CNJ) promove encontro nacional de protagonismo juvenil",
    date: "10/11/2025",
    category: "Eventos",
    summary:
      "Jovens vicentinos de todo o Brasil reuniram-se para debater caridade, justiça social e o futuro da rede vicentina.",
    url: "#",
  },
];
