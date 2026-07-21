import React, { useState } from "react";
import { styled } from "@washingtonpost/wpds-ui-kit";
import PageHero from "../components/PageHero";
import { PageSection, SectionTitle, SectionLead, LegalNotice, DownloadLink, TableWrapper, Table, Badge } from "../components/ui";
import { partnerships, monitoringVisits } from "../data/partnerships";
import { entity } from "../data/entity";

const Wrap = styled("div", {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "0 $150",
});

const FilterRow = styled("div", {
  display: "flex",
  gap: "$075",
  flexWrap: "wrap",
  marginBottom: "$150",
  alignItems: "center",
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

export default function Parcerias() {
  const [filter, setFilter] = useState("Todos");

  const filtered = filter === "Todos" ? partnerships : partnerships.filter((p) => p.status === filter);

  return (
    <main>
      <PageHero
        title="Parcerias e Convênios"
        lead="Instrumentos de parceria com órgãos públicos e entidades privadas, conforme a Lei 13.019/2014."
        breadcrumb="Parcerias e Convênios"
        lastUpdate={entity.lastUpdate}
      />

      <Wrap>
        <PageSection>
          <LegalNotice css={{ marginBottom: "$200" }}>
            Publicação conforme arts. 11, 93 e 94 da Lei 13.019/2014 (MROSC) e arts. 9º e 10 do Decreto 8.726/2016. Quando aplicável, os instrumentos podem ser consultados no Portal de Convênios do Governo Federal (Transferegov / SICONV).
          </LegalNotice>

          <SectionTitle>Instrumentos de Parceria</SectionTitle>
          <FilterRow>
            {["Todos", "Vigente", "Encerrado"].map((f) => (
              <FilterBtn key={f} active={filter === f ? true : false} onClick={() => setFilter(f)}>{f}</FilterBtn>
            ))}
          </FilterRow>

          <TableWrapper>
            <Table>
              <thead>
                <tr>
                  <th>Nº do Instrumento</th>
                  <th>Tipo</th>
                  <th>Órgão Concedente</th>
                  <th>Objeto</th>
                  <th>Valor</th>
                  <th>Vigência</th>
                  <th>Situação</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id}>
                    <td style={{ fontFamily: "monospace", fontSize: "12px", whiteSpace: "nowrap" }}>{p.number}</td>
                    <td style={{ whiteSpace: "nowrap" }}>
                      <Badge variant={p.type.includes("Fomento") ? "green" : p.type.includes("Colaboração") ? "blue" : "gray"}>
                        {p.type}
                      </Badge>
                    </td>
                    <td>{p.grantor}</td>
                    <td style={{ maxWidth: "280px" }}>{p.object}</td>
                    <td style={{ whiteSpace: "nowrap", fontWeight: "700" }}>{p.value}</td>
                    <td style={{ whiteSpace: "nowrap", fontSize: "12px" }}>{p.start} a {p.end}</td>
                    <td>
                      <Badge variant={p.status === "Vigente" ? "green" : "gray"}>{p.status}</Badge>
                    </td>
                    <td>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <DownloadLink href={p.reportUrl} target="_blank" rel="noopener noreferrer">
                          ↓ Prestação de Contas
                        </DownloadLink>
                        {p.siconvUrl && (
                          <a
                            href={p.siconvUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "12px", color: "#1565C0" }}
                          >
                            ↗ Transferegov
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableWrapper>
        </PageSection>

        <PageSection>
          <SectionTitle>Visitas de Monitoramento Recebidas</SectionTitle>
          <SectionLead>Registro das visitas de acompanhamento realizadas pelos órgãos concedentes.</SectionLead>
          <TableWrapper>
            <Table>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Órgão</th>
                  <th>Instrumento</th>
                  <th>Resultado</th>
                  <th>Relatório</th>
                </tr>
              </thead>
              <tbody>
                {monitoringVisits.map((v, i) => (
                  <tr key={i}>
                    <td>{v.date}</td>
                    <td>{v.grantor}</td>
                    <td style={{ fontFamily: "monospace", fontSize: "12px" }}>{v.project}</td>
                    <td><Badge variant="green">{v.result}</Badge></td>
                    <td><DownloadLink href={v.reportUrl} target="_blank">↓ Relatório</DownloadLink></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableWrapper>
        </PageSection>

        <div style={{ marginBottom: "48px" }}>
          <LegalNotice>
            Os documentos de prestação de contas são disponibilizados como cópia pública, vedado o uso para fins comerciais, conforme a LAI (Lei 12.527/2011).
          </LegalNotice>
        </div>
      </Wrap>
    </main>
  );
}
