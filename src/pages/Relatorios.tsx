import React from "react";
import { styled, Accordion } from "@washingtonpost/wpds-ui-kit";
import PageHero from "../components/PageHero";
import { PageSection, SectionTitle, SectionLead, LegalNotice, DownloadLink } from "../components/ui";
import { documents } from "../data/documents";
import { entity } from "../data/entity";

const Wrap = styled("div", {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "0 $150",
});

const IpeaCard = styled("a", {
  display: "flex",
  alignItems: "center",
  gap: "$125",
  backgroundColor: "#e8f2fc",
  border: "1px solid #0064B6",
  borderLeft: "5px solid #0064B6",
  borderRadius: "$050",
  padding: "$150 $175",
  textDecoration: "none",
  color: "$primary",
  marginBottom: "$300",
  transition: "box-shadow 0.15s, transform 0.15s",
  "&:hover": { boxShadow: "$200", transform: "translateY(-1px)" },
});

const DocGroup = styled("div", {
  marginBottom: "$300",
});

const DocList = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$075",
});

const DocRow = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "$100",
  padding: "$100 $125",
  border: "1px solid $outline",
  borderRadius: "$025",
  backgroundColor: "#fff",
  "&:hover": { backgroundColor: "#f4f9fe" },
  "@sm": { flexDirection: "column", alignItems: "flex-start" },
});

const DocName = styled("span", {
  fontFamily: "$meta",
  fontSize: "$100",
  color: "$primary",
  display: "flex",
  alignItems: "center",
  gap: "$075",
  flex: 1,
});

const ValidityChip = styled("span", {
  fontFamily: "$meta",
  fontSize: "$075",
  borderRadius: "$round",
  padding: "2px 10px",
  whiteSpace: "nowrap",
  fontWeight: "$bold",
  variants: {
    expired: {
      true: { backgroundColor: "#FFEBEE", color: "#C62828" },
      false: { backgroundColor: "#e8f2fc", color: "#004d8a" },
    },
  },
  defaultVariants: { expired: false },
});

function isExpiringSoon(dateStr: string) {
  const [d, m, y] = dateStr.split("/").map(Number);
  const date = new Date(y, m - 1, d);
  const now = new Date();
  const diff = (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  return diff < 30;
}

export default function Relatorios() {
  return (
    <main>
      <PageHero
        title="Relatórios e Documentos"
        lead="Relatórios anuais, certidões negativas, registros e comprovantes institucionais."
        breadcrumb="Relatórios e Documentos"
        lastUpdate={entity.lastUpdate}
      />

      <Wrap>
        <PageSection>
          <DocGroup>
            <SectionTitle>Relatórios Anuais de Atividades</SectionTitle>
            <SectionLead>Publicação anual exigida pelos arts. 4º e 7º da Lei 9.790/1999 e pelo Decreto 8.726/2016.</SectionLead>
            <DocList>
              {documents.annualReports.map((doc) => (
                <DocRow key={doc.name}>
                  <DocName><span>📋</span> {doc.name}</DocName>
                  <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "12px", color: "var(--wpds-colors-onBackground-subtle)", backgroundColor: "#e8f2fc", padding: "2px 8px", borderRadius: "99px", fontWeight: "700" }}>
                    {doc.year}
                  </span>
                  <DownloadLink href={doc.url} target="_blank">↓ PDF</DownloadLink>
                </DocRow>
              ))}
            </DocList>
          </DocGroup>

          <DocGroup>
            <SectionTitle>Relatórios de Impacto Social</SectionTitle>
            <DocList>
              {documents.impactReports.map((doc) => (
                <DocRow key={doc.name}>
                  <DocName><span>📊</span> {doc.name}</DocName>
                  <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "12px", color: "var(--wpds-colors-onBackground-subtle)", backgroundColor: "#e8f2fc", padding: "2px 8px", borderRadius: "99px", fontWeight: "700" }}>
                    {doc.year}
                  </span>
                  <DownloadLink href={doc.url} target="_blank">↓ PDF</DownloadLink>
                </DocRow>
              ))}
            </DocList>
          </DocGroup>

          <DocGroup>
            <SectionTitle>Planos de Trabalho</SectionTitle>
            <SectionLead>Planos aprovados pelos órgãos concedentes para cada parceria.</SectionLead>
            <DocList>
              {documents.workPlans.map((doc) => (
                <DocRow key={doc.name}>
                  <DocName><span>📝</span> {doc.name}</DocName>
                  <DownloadLink href={doc.url} target="_blank">↓ PDF</DownloadLink>
                </DocRow>
              ))}
            </DocList>
          </DocGroup>

          <DocGroup>
            <SectionTitle>Certidões Negativas</SectionTitle>
            <SectionLead>Certidões de regularidade fiscal e trabalhista, com data de validade.</SectionLead>
            <DocList>
              {documents.certificates.map((cert) => {
                const expiring = isExpiringSoon(cert.validity);
                return (
                  <DocRow key={cert.name}>
                    <DocName><span>📜</span> {cert.name}</DocName>
                    <ValidityChip expired={expiring ? true : false}>
                      Válida até: {cert.validity}
                    </ValidityChip>
                    <DownloadLink href={cert.url} target="_blank">↓ PDF</DownloadLink>
                  </DocRow>
                );
              })}
            </DocList>
          </DocGroup>

          <DocGroup>
            <SectionTitle>Documentos e Certificações — Fonte Pública</SectionTitle>
            <SectionLead>Consulte os dados cadastrais e registros públicos da entidade na plataforma oficial do Governo Federal.</SectionLead>
            <IpeaCard href={entity.ipeaUrl} target="_blank" rel="noopener noreferrer" aria-label="Consulte nossa ficha no Mapa das OSCs do IPEA">
              <span style={{ fontSize: "32px" }} aria-hidden="true">🔗</span>
              <span>
                <strong style={{ display: "block", fontFamily: "'EB Garamond', Georgia, serif", fontSize: "18px", color: "#0064B6", marginBottom: "4px" }}>
                  Consulte nossa ficha no Mapa das OSCs do IPEA
                </strong>
                <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "14px", color: "var(--wpds-colors-primary)", lineHeight: "1.5" }}>
                  Dados cadastrais, área de atuação e registros públicos disponíveis no Mapa das Organizações da Sociedade
                  Civil do Instituto de Pesquisa Econômica Aplicada (IPEA), plataforma oficial do Governo Federal. →
                </span>
              </span>
            </IpeaCard>
          </DocGroup>

          <DocGroup>
            <SectionTitle>Registros e Qualificações Institucionais</SectionTitle>
            <SectionLead>Comprovantes de inscrição em cadastros e títulos de qualificação.</SectionLead>
            <DocList>
              {documents.registrations.map((doc) => (
                <DocRow key={doc.name}>
                  <DocName><span>🏅</span> {doc.name}</DocName>
                  <DownloadLink href={doc.url} target="_blank">↓ PDF</DownloadLink>
                </DocRow>
              ))}
            </DocList>
          </DocGroup>

          <LegalNotice>
            Todos os documentos disponibilizados neste portal constituem cópias públicas. Documentos originais estão arquivados na sede da entidade e podem ser consultados mediante agendamento.
          </LegalNotice>
        </PageSection>
      </Wrap>
    </main>
  );
}
