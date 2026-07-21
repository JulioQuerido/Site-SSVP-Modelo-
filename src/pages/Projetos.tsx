import React, { useState } from "react";
import { styled } from "@washingtonpost/wpds-ui-kit";
import PageHero from "../components/PageHero";
import { PageSection, SectionTitle, SectionLead, LegalNotice, DownloadLink, Badge } from "../components/ui";
import { projects } from "../data/projects";
import { entity } from "../data/entity";

const Wrap = styled("div", {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "0 $150",
});

const Filters = styled("div", {
  display: "flex",
  gap: "$075",
  flexWrap: "wrap",
  marginBottom: "$200",
  alignItems: "center",
});

const FilterLabel = styled("span", {
  fontFamily: "$meta",
  fontSize: "$087",
  fontWeight: "$bold",
  color: "$onBackground-subtle",
  marginRight: "$025",
});

const FilterBtn = styled("button", {
  fontFamily: "$meta",
  fontSize: "$075",
  fontWeight: "$bold",
  padding: "$025 $075",
  borderRadius: "$round",
  border: "2px solid",
  cursor: "pointer",
  transition: "all 0.15s",
  variants: {
    active: {
      true: { backgroundColor: "#0064B6", borderColor: "#0064B6", color: "#fff" },
      false: { backgroundColor: "transparent", borderColor: "$outline", color: "$primary", "&:hover": { borderColor: "#0064B6", color: "#0064B6" } },
    },
  },
  defaultVariants: { active: false },
});

const ProjectsGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "$150",
  "@sm": { gridTemplateColumns: "1fr" },
  "@md": { gridTemplateColumns: "1fr" },
});

const ProjectCard = styled("div", {
  border: "1px solid $outline",
  borderRadius: "$050",
  backgroundColor: "#fff",
  overflow: "hidden",
  boxShadow: "$100",
});

const ProjectCardTop = styled("div", {
  padding: "$150",
  borderBottom: "1px solid $outline",
});

const ProjectCardBody = styled("div", {
  padding: "$150",
});

const ProjectTitle = styled("h3", {
  fontFamily: "$headline",
  fontSize: "$150",
  fontWeight: "$bold",
  color: "$primary",
  marginBottom: "$075",
  lineHeight: "$headline",
});

const MetaRow = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  gap: "$050",
  marginBottom: "$075",
  alignItems: "center",
});

const MetaItem = styled("span", {
  fontFamily: "$meta",
  fontSize: "$075",
  color: "$onBackground-subtle",
  display: "flex",
  alignItems: "center",
  gap: "4px",
});

const ProgressSection = styled("div", {
  backgroundColor: "#f4f9fe",
  borderRadius: "$025",
  padding: "$100",
  marginTop: "$100",
});

const ProgressLabel = styled("div", {
  fontFamily: "$meta",
  fontSize: "$075",
  fontWeight: "$bold",
  color: "#0064B6",
  marginBottom: "$050",
  textTransform: "uppercase",
  letterSpacing: "0.04em",
});

const ProgressText = styled("p", {
  fontFamily: "$meta",
  fontSize: "$087",
  color: "$primary",
  lineHeight: "$meta",
  marginBottom: "$025",
});

const statusColor: Record<string, "green" | "blue" | "gray"> = {
  "Em andamento": "green",
  "Concluído": "blue",
  "Em captação": "gray",
};

const allStatuses = ["Todos", "Em andamento", "Concluído", "Em captação"];
const allAreas = ["Todas as áreas", ...Array.from(new Set(projects.map((p) => p.area)))];

export default function Projetos() {
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [areaFilter, setAreaFilter] = useState("Todas as áreas");

  const filtered = projects.filter((p) => {
    const statusMatch = statusFilter === "Todos" || p.status === statusFilter;
    const areaMatch = areaFilter === "Todas as áreas" || p.area === areaFilter;
    return statusMatch && areaMatch;
  });

  return (
    <main>
      <PageHero
        title="Projetos e Atividades"
        lead="Acompanhe todos os projetos executados pela entidade, com metas, resultados e relatórios."
        breadcrumb="Projetos e Atividades"
        lastUpdate={entity.lastUpdate}
      />

      <Wrap>
        <PageSection>
          <SectionTitle>Filtrar Projetos</SectionTitle>
          <Filters>
            <FilterLabel>Status:</FilterLabel>
            {allStatuses.map((s) => (
              <FilterBtn key={s} active={statusFilter === s ? true : false} onClick={() => setStatusFilter(s)}>
                {s}
              </FilterBtn>
            ))}
          </Filters>
          <Filters>
            <FilterLabel>Área:</FilterLabel>
            {allAreas.map((a) => (
              <FilterBtn key={a} active={areaFilter === a ? true : false} onClick={() => setAreaFilter(a)}>
                {a}
              </FilterBtn>
            ))}
          </Filters>

          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "13px", color: "var(--wpds-colors-onBackground-subtle)", marginBottom: "16px" }}>
            Exibindo {filtered.length} de {projects.length} projeto(s)
          </p>

          <ProjectsGrid>
            {filtered.map((p) => (
              <ProjectCard key={p.id}>
                <ProjectCardTop>
                  <MetaRow>
                    <Badge variant={statusColor[p.status] || "gray"}>{p.status}</Badge>
                    <Badge variant="blue">{p.area}</Badge>
                  </MetaRow>
                  <ProjectTitle>{p.name}</ProjectTitle>
                  <MetaRow>
                    <MetaItem>📅 {p.period.start} — {p.period.end}</MetaItem>
                    <MetaItem>💰 {p.value}</MetaItem>
                  </MetaRow>
                  <MetaItem>🏦 {p.source}</MetaItem>
                  <div style={{ marginTop: "8px" }}>
                    <MetaItem>👥 {p.beneficiaries}</MetaItem>
                  </div>
                </ProjectCardTop>
                <ProjectCardBody>
                  <ProgressSection>
                    <ProgressLabel>Metas Previstas</ProgressLabel>
                    <ProgressText>{p.goalsPrevised}</ProgressText>
                    <ProgressLabel css={{ marginTop: "$075" }}>Resultados Alcançados</ProgressLabel>
                    <ProgressText>{p.goalsAchieved}</ProgressText>
                  </ProgressSection>
                  <div style={{ marginTop: "16px" }}>
                    <DownloadLink href={p.reportUrl} target="_blank" rel="noopener noreferrer">
                      ↓ Relatório de Execução (PDF)
                    </DownloadLink>
                  </div>
                </ProjectCardBody>
              </ProjectCard>
            ))}
          </ProjectsGrid>

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "48px 0", color: "var(--wpds-colors-onBackground-subtle)", fontFamily: "'Montserrat', sans-serif" }}>
              Nenhum projeto encontrado com os filtros selecionados.
            </div>
          )}
        </PageSection>

        <div style={{ marginBottom: "48px" }}>
          <LegalNotice>
            Relatórios de execução elaborados conforme exigências do Decreto 8.726/2016 e do instrumento de parceria correspondente.
          </LegalNotice>
        </div>
      </Wrap>
    </main>
  );
}
