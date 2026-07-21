// Galeria de imagens institucionais.
//
// Fotos da 54ª Romaria Nacional dos Vicentinos a Aparecida, publicadas na
// Galeria Vicentina oficial da SSVP Brasil:
//   https://www.ssvpbrasil.org.br/galeriavicentina/54a-romaria-nacional-dos-vicentinos-a-aparecida
//
// As URLs apontam para o próprio servidor da SSVP (mesma origem do site oficial).
// Se quiser hospedar as imagens junto do portal, baixe cada arquivo para
// `public/img/` e troque a `src` por um caminho local (ex.: "/img/romaria-terco.jpg").

export interface GalleryPhoto {
  src: string;
  alt: string;
  caption: string;
  credit: string;
}

export const galleryEvent = {
  title: "54ª Romaria Nacional dos Vicentinos a Aparecida",
  description:
    "Registros da maior peregrinação anual da rede vicentina brasileira ao Santuário Nacional de Aparecida, reunindo confrades e voluntários de todo o país em momentos de fé, formação e fraternidade.",
  sourceUrl:
    "https://www.ssvpbrasil.org.br/galeriavicentina/54a-romaria-nacional-dos-vicentinos-a-aparecida",
};

export const galleryPhotos: GalleryPhoto[] = [
  {
    src: "https://www.ssvpbrasil.org.br/source/files/c/8791/GALERIA-54_Romaria_VIA_SACRA_18-930487_1920-1080-0-0.jpg",
    alt: "Vicentinos em procissão na Via Sacra no Morro do Cruzeiro durante a Romaria a Aparecida",
    caption: "Via Sacra no Morro do Cruzeiro",
    credit: "SSVP Brasil",
  },
  {
    src: "https://www.ssvpbrasil.org.br/source/files/c/8648/GALERIA-54_Romaria_TERCO_11-769988_1280-853-0-0.jpg",
    alt: "Confrades rezando o terço no Caminho do Rosário",
    caption: "Terço no Caminho do Rosário",
    credit: "SSVP Brasil",
  },
  {
    src: "https://www.ssvpbrasil.org.br/source/files/c/9280/GALERIA-54_Romaria_CELEBRACAO_DA_SANTA_MISSA_23-126909_1920-1080-0-0.jpg",
    alt: "Celebração da Santa Missa durante a 54ª Romaria Nacional dos Vicentinos",
    caption: "Celebração da Santa Missa",
    credit: "SSVP Brasil",
  },
  {
    src: "https://www.ssvpbrasil.org.br/source/files/c/9146/GALERIA-54_Romaria_FESTA_REGULAMENTAR_32-937615_1920-1081-0-0.jpg",
    alt: "Vicentinos reunidos na Festa Regulamentar da Romaria",
    caption: "Festa Regulamentar",
    credit: "SSVP Brasil",
  },
  {
    src: "https://www.ssvpbrasil.org.br/source/files/c/8942/GALERIA-54_Romaria_WORKSHOP_FORMAR_E_ENCANTAR_PARA_SERVIR_3-328462_1920-1080-0-0.jpg",
    alt: "Participantes no workshop Formar e Encantar para Servir",
    caption: "Workshop “Formar e Encantar para Servir”",
    credit: "SSVP Brasil",
  },
  {
    src: "https://www.ssvpbrasil.org.br/source/files/c/8857/GALERIA-54_Romaria_SHOW_DE_TALENTOS_CCA_53-441724_1280-853-0-0.jpg",
    alt: "Apresentação no Show de Talentos do CCA durante a Romaria",
    caption: "Show de Talentos do CCA",
    credit: "SSVP Brasil",
  },
  {
    src: "https://www.ssvpbrasil.org.br/source/files/c/9046/GALERIA-54_Romaria_FESTIVAL_CULTURAL_OZANAM_46-352303_1920-1280-0-0.jpg",
    alt: "Apresentação cultural no Festival Cultural Ozanam",
    caption: "Festival Cultural Ozanam",
    credit: "SSVP Brasil",
  },
];
