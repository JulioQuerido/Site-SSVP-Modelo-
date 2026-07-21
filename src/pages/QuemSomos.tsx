import React from "react";
import { styled } from "@washingtonpost/wpds-ui-kit";
import PageHero from "../components/PageHero";
import { PageSection, SectionTitle, SectionLead, LegalNotice, Badge, DownloadLink } from "../components/ui";
import { entity } from "../data/entity";

const Wrap = styled("div", {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "0 $150",
});

const MvvGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "$150",
  marginBottom: "$300",
  "@sm": { gridTemplateColumns: "1fr" },
  "@md": { gridTemplateColumns: "1fr 1fr" },
});

const MvvCard = styled("div", {
  borderRadius: "$050",
  padding: "$150",
  border: "1px solid $outline",
  backgroundColor: "#fff",
});

const MvvTitle = styled("h3", {
  fontFamily: "$meta",
  fontWeight: "$bold",
  fontSize: "$087",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  color: "#0064B6",
  marginBottom: "$075",
});

const MvvText = styled("p", {
  fontFamily: "$body",
  fontSize: "$100",
  lineHeight: "$body",
  color: "$primary",
});

const ValuesList = styled("ul", {
  listStyle: "none",
  padding: 0,
  margin: 0,
  "& li": {
    fontFamily: "$body",
    fontSize: "$100",
    lineHeight: "$body",
    color: "$primary",
    paddingLeft: "$100",
    marginBottom: "$025",
    position: "relative",
    "&::before": {
      content: '"✓"',
      color: "#0064B6",
      fontWeight: "$bold",
      position: "absolute",
      left: 0,
    },
  },
});

const DataTable = styled("table", {
  width: "100%",
  borderCollapse: "collapse",
  marginBottom: "$200",
  "& th": {
    textAlign: "left",
    fontFamily: "$meta",
    fontSize: "$087",
    fontWeight: "$bold",
    color: "$onBackground-subtle",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
    padding: "$075 $100 $075 0",
    borderBottom: "2px solid #0064B6",
    width: "40%",
  },
  "& td": {
    fontFamily: "$meta",
    fontSize: "$100",
    color: "$primary",
    padding: "$075 $100 $075 0",
    borderBottom: "1px solid $outline",
    lineHeight: "$meta",
  },
});

const QualifList = styled("ul", {
  listStyle: "none",
  padding: 0,
  margin: 0,
  "& li": {
    display: "flex",
    alignItems: "flex-start",
    gap: "$075",
    fontFamily: "$meta",
    fontSize: "$100",
    color: "$primary",
    lineHeight: "$meta",
    padding: "$075 0",
    borderBottom: "1px solid $outline",
    "&:last-child": { borderBottom: "none" },
  },
});

export default function QuemSomos() {
  return (
    <main>
      <PageHero
        title="Quem Somos"
        lead="Conheça a história, a missão e a identidade da Sociedade de São Vicente de Paulo — Conselho Nacional do Brasil."
        breadcrumb="Quem Somos"
        lastUpdate={entity.lastUpdate}
      />

      <Wrap>
        <PageSection>
          <SectionTitle>Histórico Institucional</SectionTitle>
          <SectionLead>Fundada em {entity.founded}, em Paris, por Antônio Frederico Ozanam e um grupo de amigos.</SectionLead>
          <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: "18px", lineHeight: "1.7", color: "var(--wpds-colors-primary)", maxWidth: "760px", marginBottom: "16px" }}>
            A Sociedade de São Vicente de Paulo (SSVP) foi fundada em {entity.founded} por Antônio Frederico Ozanam e um grupo de amigos, em Paris. É uma organização sem fins lucrativos dedicada a promover a dignidade e o bem-estar de comunidades em situação de vulnerabilidade social, hoje presente em mais de 150 países. No Brasil, o Conselho Nacional coordena todas as unidades vicentinas, articulando a rede de caridade em torno do serviço ao necessitado e da defesa da justiça social.
          </p>
          <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: "18px", lineHeight: "1.7", color: "var(--wpds-colors-primary)", maxWidth: "760px", marginBottom: "32px" }}>
            Nossa atuação é inspirada no lema internacional <strong>{entity.motto}</strong> — "{entity.mottoTranslation}" — e na frase de Ozanam: <em>"Desejo reunir o mundo inteiro numa grande rede de caridade."</em> Como entidade que presta serviços de relevância pública, a SSVP pauta suas ações pela transparência, pela participação e pelo controle social.
          </p>
        </PageSection>

        <PageSection>
          <SectionTitle>Identidade Visual e Simbologia</SectionTitle>
          <SectionLead>O logotipo internacional único foi aprovado em 1999, na Assembleia Plenária Internacional de Fátima (Portugal), e modernizado em 2018, na Assembleia de Salamanca (Espanha).</SectionLead>
          <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: "18px", lineHeight: "1.7", color: "var(--wpds-colors-primary)", maxWidth: "760px", marginBottom: "16px" }}>
            O símbolo representa um peixe — sinal do cristianismo — inscrito em um círculo azul, que representa a humanidade, em referência à frase de Ozanam: <em>"Desejo reunir o mundo inteiro numa grande rede de caridade."</em> As cores institucionais oficiais são o <strong>azul #0064B6</strong> e o <strong>vermelho #FF0000</strong>, conforme o Manual da Marca (v. 01.06.2024).
          </p>
        </PageSection>

        <PageSection>
          <SectionTitle>Missão, Visão e Valores</SectionTitle>
          <MvvGrid>
            <MvvCard>
              <MvvTitle>🐟 Missão</MvvTitle>
              <MvvText>"{entity.mission}"</MvvText>
            </MvvCard>
            <MvvCard>
              <MvvTitle>🔭 Visão</MvvTitle>
              <MvvText>{entity.vision}</MvvText>
            </MvvCard>
            <MvvCard>
              <MvvTitle>⭐ Valores</MvvTitle>
              <ValuesList>
                {entity.values.map((v) => <li key={v}>{v}</li>)}
              </ValuesList>
            </MvvCard>
          </MvvGrid>
        </PageSection>

        <PageSection>
          <SectionTitle>Dados Cadastrais</SectionTitle>
          <DataTable>
            <tbody>
              <tr><th>Denominação Social</th><td>{entity.name}</td></tr>
              <tr><th>Unidade</th><td>{entity.unit}</td></tr>
              <tr><th>Natureza Jurídica</th><td>{entity.type}</td></tr>
              <tr><th>CNPJ</th><td>{entity.cnpj}</td></tr>
              <tr><th>Ano de Fundação</th><td>{entity.founded} (Paris, França)</td></tr>
              <tr><th>Área de Atuação</th><td>{entity.area}</td></tr>
              <tr><th>Endereço</th><td>{entity.address}</td></tr>
              <tr><th>Telefone / WhatsApp</th><td>{entity.phone}</td></tr>
              <tr><th>E-mail Institucional</th><td><a href={`mailto:${entity.email}`} style={{ color: "#0064B6" }}>{entity.email}</a></td></tr>
              <tr><th>Site</th><td><a href={`https://${entity.website}`} target="_blank" rel="noopener noreferrer" style={{ color: "#0064B6" }}>{entity.website}</a></td></tr>
              <tr><th>Loja Oficial</th><td><a href={`https://${entity.store}`} target="_blank" rel="noopener noreferrer" style={{ color: "#0064B6" }}>{entity.store}</a></td></tr>
              <tr><th>Instagram</th><td><a href={entity.socialMedia.instagram} target="_blank" rel="noopener noreferrer" style={{ color: "#0064B6" }}>@ssvp.brasil</a></td></tr>
              <tr><th>Ficha Pública</th><td><a href={entity.ipeaUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#0064B6" }}>Mapa das OSCs — IPEA</a></td></tr>
            </tbody>
          </DataTable>
        </PageSection>

        <PageSection>
          <SectionTitle>Qualificações e Registros</SectionTitle>
          <SectionLead>Informações institucionais e registros públicos que conferem legitimidade e reconhecimento à atuação da entidade.</SectionLead>
          <QualifList>
            {entity.qualifications.map((q) => (
              <li key={q}>
                <span style={{ color: "#0064B6", fontSize: "18px", flexShrink: 0 }}>✓</span>
                <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "15px" }}>{q}</span>
              </li>
            ))}
          </QualifList>
          <div style={{ marginTop: "24px" }}>
            <LegalNotice>
              Os documentos comprobatórios de qualificações e registros estão disponíveis na seção{" "}
              <a href="/relatorios" style={{ color: "#004d8a", fontWeight: "700" }}>Relatórios e Documentos</a>.
            </LegalNotice>
          </div>
        </PageSection>
      </Wrap>
    </main>
  );
}
