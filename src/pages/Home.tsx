import React from "react";
import { Link } from "react-router-dom";
import { styled, Card } from "@washingtonpost/wpds-ui-kit";
import { entity } from "../data/entity";
import { LegalNotice } from "../components/ui";
import { logoSsvp } from "../assets/logo";
import { galleryPhotos, galleryEvent } from "../data/gallery";

const HeroSection = styled("section", {
  position: "relative",
  overflow: "hidden",
  background: "linear-gradient(160deg, #004d8a 0%, #0064B6 50%, #3a86cf 100%)",
  padding: "$500 $150",
  textAlign: "center",
  "@sm": { padding: "$300 $150" },
});

// Camada de foto ao fundo do hero, com gradiente por cima para garantir contraste do texto.
const HeroBg = styled("div", {
  position: "absolute",
  inset: 0,
  backgroundSize: "cover",
  backgroundPosition: "center",
  opacity: 0.28,
  zIndex: 0,
});

const HeroInner = styled("div", {
  position: "relative",
  zIndex: 1,
});

const HeroTitle = styled("h1", {
  fontFamily: "$headline",
  fontSize: "$450",
  fontWeight: "$bold",
  lineHeight: "$headline",
  color: "#fff",
  marginBottom: "$100",
  "@sm": { fontSize: "$250" },
  "@md": { fontSize: "$300" },
});

const HeroMission = styled("p", {
  fontFamily: "$body",
  fontSize: "$150",
  lineHeight: "$body",
  color: "#cfe3f7",
  maxWidth: "700px",
  margin: "0 auto $100",
  fontStyle: "italic",
  "@sm": { fontSize: "$112" },
});

const HeroMotto = styled("p", {
  fontFamily: "$headline",
  fontSize: "$125",
  color: "#e8f2fc",
  marginBottom: "$200",
  letterSpacing: "0.02em",
});

const LogoMark = styled("img", {
  width: "104px",
  height: "104px",
  objectFit: "contain",
  backgroundColor: "#fff",
  borderRadius: "$round",
  border: "3px solid rgba(255,255,255,0.7)",
  boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
  padding: "6px",
  display: "block",
  margin: "0 auto $150",
});

const LaiAlert = styled("div", {
  backgroundColor: "rgba(255,255,255,0.12)",
  border: "1px solid rgba(255,255,255,0.3)",
  borderRadius: "$050",
  padding: "$100 $150",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "$075",
  color: "#e8f2fc",
  fontFamily: "$meta",
  fontSize: "$087",
  marginTop: "$150",
  maxWidth: "720px",
  marginInline: "auto",
});

const IpeaButton = styled("a", {
  display: "inline-flex",
  alignItems: "center",
  gap: "$050",
  backgroundColor: "#fff",
  color: "#0064B6",
  fontFamily: "$meta",
  fontSize: "$087",
  fontWeight: "$bold",
  textDecoration: "none",
  padding: "$050 $125",
  borderRadius: "$round",
  transition: "transform 0.15s, box-shadow 0.15s",
  "&:hover": { transform: "translateY(-1px)", boxShadow: "0 4px 12px rgba(0,0,0,0.25)" },
});

const StatsSection = styled("section", {
  backgroundColor: "#fff",
  borderBottom: "1px solid $outline",
});

const StatsGrid = styled("div", {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "0 $150",
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  "@md": { gridTemplateColumns: "repeat(2, 1fr)" },
  "@sm": { gridTemplateColumns: "repeat(2, 1fr)" },
});

const StatItem = styled("div", {
  padding: "$200 $150",
  textAlign: "center",
  borderRight: "1px solid $outline",
  "&:last-child": { borderRight: "none" },
  "@sm": { padding: "$150 $100" },
});

const StatNumber = styled("div", {
  fontFamily: "$headline",
  fontSize: "$350",
  fontWeight: "$bold",
  color: "#0064B6",
  lineHeight: "1",
  marginBottom: "$025",
  "@sm": { fontSize: "$225" },
});

const StatLabel = styled("div", {
  fontFamily: "$meta",
  fontSize: "$087",
  color: "$onBackground-subtle",
  lineHeight: "$meta",
  textTransform: "uppercase",
  letterSpacing: "0.04em",
});

const GallerySection = styled("section", {
  backgroundColor: "#f4f9fe",
  borderTop: "1px solid $outline",
  borderBottom: "1px solid $outline",
});

const GalleryInner = styled("div", {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "$400 $150",
  "@sm": { padding: "$250 $150" },
});

const GalleryHead = styled("div", {
  textAlign: "center",
  marginBottom: "$200",
});

const GalleryGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "$100",
  "@md": { gridTemplateColumns: "repeat(2, 1fr)" },
  "@sm": { gridTemplateColumns: "1fr" },
});

const GalleryFigure = styled("figure", {
  position: "relative",
  margin: 0,
  borderRadius: "$050",
  overflow: "hidden",
  border: "1px solid $outline",
  backgroundColor: "#fff",
  aspectRatio: "4 / 3",
  boxShadow: "$100",
  // A primeira foto ocupa duas colunas/linhas para criar um destaque visual.
  "&:first-of-type": {
    gridColumn: "span 2",
    gridRow: "span 2",
    "@sm": { gridColumn: "auto", gridRow: "auto" },
  },
  "&:hover img": { transform: "scale(1.05)" },
});

const GalleryImg = styled("img", {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
  transition: "transform 0.4s ease",
});

const GalleryCaption = styled("figcaption", {
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  padding: "$100 $100 $075",
  background: "linear-gradient(to top, rgba(0,45,82,0.85) 0%, rgba(0,45,82,0) 100%)",
  color: "#fff",
  fontFamily: "$meta",
  fontSize: "$075",
  fontWeight: "$bold",
  lineHeight: "$meta",
  textAlign: "left",
});

const GalleryLink = styled("a", {
  display: "inline-flex",
  alignItems: "center",
  gap: "$050",
  marginTop: "$200",
  color: "#0064B6",
  fontFamily: "$meta",
  fontSize: "$087",
  fontWeight: "$bold",
  textDecoration: "none",
  "&:hover": { textDecoration: "underline" },
});

const CardsSection = styled("section", {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "$400 $150",
  "@sm": { padding: "$200 $150" },
});

const SectionTitle = styled("h2", {
  fontFamily: "$headline",
  fontSize: "$225",
  fontWeight: "$bold",
  color: "$primary",
  marginBottom: "$200",
  textAlign: "center",
});

const CardsGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "$150",
  "@md": { gridTemplateColumns: "repeat(2, 1fr)" },
  "@sm": { gridTemplateColumns: "1fr" },
});

const NavCard = styled(Link, {
  display: "block",
  textDecoration: "none",
  borderRadius: "$050",
  border: "1px solid $outline",
  overflow: "hidden",
  transition: "box-shadow 0.2s, transform 0.2s",
  backgroundColor: "#fff",
  "&:hover": { boxShadow: "$300", transform: "translateY(-2px)" },
});

const NavCardHeader = styled("div", {
  height: "6px",
  backgroundColor: "#0064B6",
});

const NavCardBody = styled("div", {
  padding: "$150",
});

const NavCardIcon = styled("div", {
  fontSize: "28px",
  marginBottom: "$075",
});

const NavCardTitle = styled("h3", {
  fontFamily: "$headline",
  fontSize: "$150",
  fontWeight: "$bold",
  color: "#0064B6",
  marginBottom: "$050",
  lineHeight: "$headline",
});

const NavCardDesc = styled("p", {
  fontFamily: "$meta",
  fontSize: "$087",
  color: "$onBackground-subtle",
  lineHeight: "$meta",
});

const sections = [
  { path: "/quem-somos", icon: "🏛️", title: "Quem Somos", desc: "Missão, história, valores e identidade da Sociedade de São Vicente de Paulo" },
  { path: "/governanca", icon: "📋", title: "Governança", desc: "Estrutura organizacional, conselhos, departamentos e documentos normativos" },
  { path: "/projetos", icon: "📁", title: "Projetos e Atividades", desc: "Ações de assistência social, desenvolvimento humano e combate à pobreza" },
  { path: "/financeiro", icon: "💰", title: "Transparência Financeira", desc: "Demonstrações contábeis, auditorias e orçamentos por exercício" },
  { path: "/parcerias", icon: "🤝", title: "Parcerias e Convênios", desc: "Instrumentos vigentes e encerrados com órgãos públicos e privados" },
  { path: "/processos-seletivos", icon: "📢", title: "Processos Seletivos", desc: "Editais de seleção de colaboradores, voluntários e prestadores" },
  { path: "/relatorios", icon: "📄", title: "Relatórios e Documentos", desc: "Relatórios anuais, certidões, registros e comprovantes institucionais" },
  { path: "/ouvidoria", icon: "📬", title: "Ouvidoria / LAI", desc: "Pedido de informação, denúncia e canal de transparência ativa" },
  { path: "/noticias", icon: "📰", title: "Notícias e Publicações", desc: "Novidades, projetos em destaque e publicações institucionais" },
];

const stats = [
  { value: entity.indicators.activeProjects.toString(), label: "Frentes de Atuação" },
  { value: entity.indicators.beneficiaries.toLocaleString("pt-BR"), label: "Pessoas Atendidas / ano" },
  { value: entity.indicators.partners.toString(), label: "Parcerias Institucionais" },
  { value: "+" + entity.indicators.municipalities, label: "Países com Presença SSVP" },
];

export default function Home() {
  return (
    <main>
      <HeroSection>
        <HeroBg
          aria-hidden="true"
          style={{ backgroundImage: `url(${galleryPhotos[0].src})` }}
        />
        <HeroInner>
          <LogoMark src={logoSsvp} alt={`Logo ${entity.shortName}`} />
          <HeroTitle>{entity.name}</HeroTitle>
          <HeroMission>"{entity.mission}"</HeroMission>
          <HeroMotto>{entity.motto} — "{entity.mottoTranslation}"</HeroMotto>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "14px", color: "#cfe3f7", letterSpacing: "0.06em", textTransform: "uppercase" }}>
            {entity.unit} · CNPJ {entity.cnpj} · {entity.city}, {entity.state}
          </p>
          <LaiAlert>
            <span>🔓 Este portal cumpre as exigências da Lei 13.019/2014 (MROSC) e da Lei 12.527/2011 (LAI). Consulte também nossa ficha pública no Mapa das OSCs do IPEA.</span>
            <IpeaButton href={entity.ipeaUrl} target="_blank" rel="noopener noreferrer">
              Ver no IPEA →
            </IpeaButton>
          </LaiAlert>
        </HeroInner>
      </HeroSection>

      <StatsSection aria-label="Indicadores institucionais">
        <StatsGrid>
          {stats.map((s) => (
            <StatItem key={s.label}>
              <StatNumber>{s.value}</StatNumber>
              <StatLabel>{s.label}</StatLabel>
            </StatItem>
          ))}
        </StatsGrid>
      </StatsSection>

      <GallerySection aria-labelledby="galeria-titulo">
        <GalleryInner>
          <GalleryHead>
            <SectionTitle id="galeria-titulo">{galleryEvent.title}</SectionTitle>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "15px", color: "#4a5568", lineHeight: 1.6, maxWidth: "760px", margin: "8px auto 0" }}>
              {galleryEvent.description}
            </p>
          </GalleryHead>
          <GalleryGrid>
            {galleryPhotos.map((photo) => (
              <GalleryFigure key={photo.src}>
                <GalleryImg src={photo.src} alt={photo.alt} loading="lazy" />
                <GalleryCaption>{photo.caption}</GalleryCaption>
              </GalleryFigure>
            ))}
          </GalleryGrid>
          <div style={{ textAlign: "center" }}>
            <GalleryLink href={galleryEvent.sourceUrl} target="_blank" rel="noopener noreferrer">
              Ver galeria completa na Galeria Vicentina →
            </GalleryLink>
          </div>
        </GalleryInner>
      </GallerySection>

      <CardsSection>
        <SectionTitle>Portal de Transparência</SectionTitle>
        <CardsGrid>
          {sections.map((s) => (
            <NavCard key={s.path} to={s.path} aria-label={`Ir para ${s.title}`}>
              <NavCardHeader />
              <NavCardBody>
                <NavCardIcon aria-hidden="true">{s.icon}</NavCardIcon>
                <NavCardTitle>{s.title}</NavCardTitle>
                <NavCardDesc>{s.desc}</NavCardDesc>
              </NavCardBody>
            </NavCard>
          ))}
        </CardsGrid>
      </CardsSection>

      <div style={{ maxWidth: "1200px", margin: "0 auto $400", padding: "0 24px" }}>
        <LegalNotice>
          <strong>Base legal deste portal:</strong> Lei 13.019/2014 (MROSC), arts. 11, 93 e 94 · Decreto 8.726/2016 ·
          Lei 12.527/2011 (LAI) · Res. CFC 1.409/2012 e ITG 2002(R1) ·
          Princípio da Publicidade (CF/88, art. 37). Todos os documentos públicos são disponibilizados sem necessidade de cadastro ou login.
        </LegalNotice>
      </div>
    </main>
  );
}
