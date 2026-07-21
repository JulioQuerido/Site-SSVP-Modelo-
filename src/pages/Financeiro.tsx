import React, { useState } from "react";
import { styled, Tabs } from "@washingtonpost/wpds-ui-kit";
import PageHero from "../components/PageHero";
import { PageSection, SectionTitle, SectionLead, LegalNotice, DownloadLink, TableWrapper, Table } from "../components/ui";
import { financials } from "../data/financials";
import { entity } from "../data/entity";

const Wrap = styled("div", {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "0 $150",
});

const DocList = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$075",
  marginBottom: "$200",
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
  transition: "background 0.15s",
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
});

const BarChart = styled("div", {
  marginBottom: "$200",
});

const BarRow = styled("div", {
  marginBottom: "$100",
});

const BarLabel = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  fontFamily: "$meta",
  fontSize: "$087",
  color: "$primary",
  marginBottom: "$025",
});

const BarTrack = styled("div", {
  height: "12px",
  borderRadius: "$round",
  backgroundColor: "#e8f2fc",
  overflow: "hidden",
});

const BarFill = styled("div", {
  height: "100%",
  backgroundColor: "#0064B6",
  borderRadius: "$round",
  transition: "width 0.6s ease",
});

const SummaryGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "$100",
  marginBottom: "$200",
  "@sm": { gridTemplateColumns: "1fr" },
});

const SummaryCard = styled("div", {
  textAlign: "center",
  padding: "$150",
  border: "1px solid $outline",
  borderRadius: "$050",
  backgroundColor: "#fff",
});

const SummaryValue = styled("div", {
  fontFamily: "$headline",
  fontSize: "$200",
  fontWeight: "$bold",
  marginBottom: "$025",
});

const SummaryLabel = styled("div", {
  fontFamily: "$meta",
  fontSize: "$075",
  color: "$onBackground-subtle",
  textTransform: "uppercase",
  letterSpacing: "0.04em",
});

export default function Financeiro() {
  return (
    <main>
      <PageHero
        title="Transparência Financeira"
        lead="Demonstrações contábeis, relatórios de auditoria e informações orçamentárias por exercício."
        breadcrumb="Transparência Financeira"
        lastUpdate={entity.lastUpdate}
      />

      <Wrap>
        <PageSection>
          <LegalNotice css={{ marginBottom: "$200" }}>
            Demonstrações elaboradas conforme a ITG 2002(R1) do Conselho Federal de Contabilidade (CFC) — norma aplicável a entidades sem fins lucrativos. Auditadas por auditor independente registrado no CRC. Conforme exigência dos arts. 4º e 7º da Lei 9.790/1999 e do Decreto 8.726/2016.
          </LegalNotice>

          <SectionTitle>Demonstrações por Exercício</SectionTitle>

          <Tabs.Root defaultValue={financials[0].year}>
            <Tabs.List aria-label="Selecionar exercício fiscal">
              {financials.map((f) => (
                <Tabs.Trigger key={f.year} value={f.year}>{f.year}</Tabs.Trigger>
              ))}
            </Tabs.List>

            {financials.map((f) => (
              <Tabs.Content key={f.year} value={f.year}>
                <div style={{ paddingTop: "32px" }}>
                  <SummaryGrid>
                    <SummaryCard>
                      <SummaryValue style={{ color: "#0064B6" }}>{f.totalRevenue}</SummaryValue>
                      <SummaryLabel>Total de Receitas</SummaryLabel>
                    </SummaryCard>
                    <SummaryCard>
                      <SummaryValue style={{ color: "#E65100" }}>{f.totalExpenses}</SummaryValue>
                      <SummaryLabel>Total de Despesas</SummaryLabel>
                    </SummaryCard>
                    <SummaryCard>
                      <SummaryValue style={{ color: "#1565C0" }}>{f.surplus}</SummaryValue>
                      <SummaryLabel>Superávit do Período</SummaryLabel>
                    </SummaryCard>
                  </SummaryGrid>

                  <SectionTitle>Composição das Receitas — {f.year}</SectionTitle>
                  <BarChart>
                    {f.revenues.map((r) => (
                      <BarRow key={r.source}>
                        <BarLabel>
                          <span>{r.source}</span>
                          <span style={{ fontWeight: "700", color: "#0064B6" }}>{r.value} ({r.pct}%)</span>
                        </BarLabel>
                        <BarTrack>
                          <BarFill style={{ width: `${r.pct}%` }} />
                        </BarTrack>
                      </BarRow>
                    ))}
                  </BarChart>

                  <SectionTitle>Documentos — Exercício {f.year}</SectionTitle>
                  <DocList>
                    {f.documents.map((doc) => (
                      <DocRow key={doc.name}>
                        <DocName>
                          <span style={{ fontSize: "16px" }}>📄</span>
                          {doc.name}
                        </DocName>
                        <DownloadLink href={doc.url} target="_blank" rel="noopener noreferrer" aria-label={`Baixar ${doc.name}`}>
                          ↓ PDF
                        </DownloadLink>
                      </DocRow>
                    ))}
                  </DocList>
                </div>
              </Tabs.Content>
            ))}
          </Tabs.Root>
        </PageSection>
      </Wrap>
    </main>
  );
}
