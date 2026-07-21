import React from "react";
import { styled, Accordion } from "@washingtonpost/wpds-ui-kit";
import PageHero from "../components/PageHero";
import { PageSection, SectionTitle, SectionLead, LegalNotice, DownloadLink, TableWrapper, Table } from "../components/ui";
import { governance } from "../data/governance";
import { entity } from "../data/entity";

const Wrap = styled("div", {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "0 $150",
});

const DocGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "$100",
  marginBottom: "$200",
  "@sm": { gridTemplateColumns: "1fr" },
});

const DocItem = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "$100",
  padding: "$100 $125",
  border: "1px solid $outline",
  borderRadius: "$025",
  backgroundColor: "#fff",
  "@sm": { flexDirection: "column", alignItems: "flex-start" },
});

const DocName = styled("span", {
  fontFamily: "$meta",
  fontSize: "$100",
  color: "$primary",
  lineHeight: "$meta",
  flex: 1,
});

const DocYear = styled("span", {
  fontFamily: "$meta",
  fontSize: "$075",
  color: "$onBackground-subtle",
  backgroundColor: "#e8f2fc",
  borderRadius: "$round",
  padding: "2px 8px",
  fontWeight: "$bold",
  flexShrink: 0,
});

const HierList = styled("ol", {
  listStyle: "none",
  padding: 0,
  margin: "0 0 $200",
  counterReset: "hier",
});

const HierItem = styled("li", {
  display: "flex",
  alignItems: "flex-start",
  gap: "$125",
  padding: "$100 $125",
  border: "1px solid $outline",
  borderLeft: "4px solid #0064B6",
  borderRadius: "$025",
  backgroundColor: "#fff",
  marginBottom: "$075",
});

const HierLevel = styled("div", {
  width: "32px",
  height: "32px",
  flexShrink: 0,
  borderRadius: "$round",
  backgroundColor: "#0064B6",
  color: "#fff",
  fontFamily: "$headline",
  fontWeight: "$bold",
  fontSize: "$112",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const HierName = styled("div", {
  fontFamily: "$meta",
  fontSize: "$100",
  fontWeight: "$bold",
  color: "$primary",
  lineHeight: "$meta",
});

const HierScope = styled("div", {
  fontFamily: "$meta",
  fontSize: "$087",
  color: "$onBackground-subtle",
  lineHeight: "$meta",
});

const DeptGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "$100",
  "@md": { gridTemplateColumns: "repeat(2, 1fr)" },
  "@sm": { gridTemplateColumns: "1fr" },
});

const DeptCard = styled("div", {
  border: "1px solid $outline",
  borderTop: "3px solid #0064B6",
  borderRadius: "$025",
  padding: "$100 $125",
  backgroundColor: "#fff",
});

const DeptSigla = styled("div", {
  fontFamily: "$headline",
  fontSize: "$125",
  fontWeight: "$bold",
  color: "#0064B6",
  marginBottom: "$025",
});

const DeptName = styled("div", {
  fontFamily: "$meta",
  fontSize: "$087",
  color: "$onBackground-subtle",
  lineHeight: "$meta",
});

export default function Governanca() {
  return (
    <main>
      <PageHero
        title="Governança"
        lead="Documentos normativos, composição da diretoria e conselho, e políticas de integridade."
        breadcrumb="Governança"
        lastUpdate={entity.lastUpdate}
      />

      <Wrap>
        <PageSection>
          <SectionTitle>Estrutura Organizacional</SectionTitle>
          <SectionLead>
            A rede vicentina organiza-se de forma hierárquica, do Conselho Nacional às Conferências locais, garantindo capilaridade e proximidade com as comunidades atendidas.
          </SectionLead>
          <HierList>
            {governance.hierarchy.map((h) => (
              <HierItem key={h.level}>
                <HierLevel aria-hidden="true">{h.level}</HierLevel>
                <div>
                  <HierName>{h.name}</HierName>
                  <HierScope>{h.scope}</HierScope>
                </div>
              </HierItem>
            ))}
          </HierList>

          <SectionTitle css={{ fontSize: "$225" }}>Departamentos, Comissões e Serviços do CNB</SectionTitle>
          <SectionLead>
            Estruturas de apoio do Conselho Nacional do Brasil responsáveis por áreas específicas de atuação vicentina.
          </SectionLead>
          <DeptGrid>
            {governance.departments.map((d) => (
              <DeptCard key={d.sigla}>
                <DeptSigla>{d.sigla}</DeptSigla>
                <DeptName>{d.name}</DeptName>
              </DeptCard>
            ))}
          </DeptGrid>
        </PageSection>

        <PageSection>
          <SectionTitle>Documentos Normativos</SectionTitle>
          <SectionLead>
            Documentos constitutivos e regulatórios da entidade, disponíveis para download público conforme exigência da Lei 13.019/2014 e do Decreto 8.726/2016.
          </SectionLead>
          <DocGrid>
            {governance.documents.map((doc) => (
              <DocItem key={doc.name}>
                <span style={{ fontSize: "18px", flexShrink: 0 }}>📄</span>
                <DocName>{doc.name}</DocName>
                <DocYear>{doc.year}</DocYear>
                <DownloadLink href={doc.url} target="_blank" rel="noopener noreferrer" aria-label={`Baixar ${doc.name}`}>
                  ↓ PDF
                </DownloadLink>
              </DocItem>
            ))}
          </DocGrid>
          <LegalNotice>
            Todos os documentos são disponibilizados como cópia pública, sem necessidade de cadastro ou identificação prévia, em atendimento ao art. 37 da CF/88 e à Lei 12.527/2011 (LAI).
          </LegalNotice>
        </PageSection>

        <PageSection>
          <SectionTitle>Diretoria Executiva</SectionTitle>
          <SectionLead>
            Composição da diretoria eleita para a gestão atual, com dados de mandato e informação de remuneração, conforme exigência do Decreto 8.726/2016.
          </SectionLead>
          <TableWrapper>
            <Table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Cargo</th>
                  <th>CPF (parcial)</th>
                  <th>Início do Mandato</th>
                  <th>Fim do Mandato</th>
                  <th>Remunerado</th>
                </tr>
              </thead>
              <tbody>
                {governance.board.map((m) => (
                  <tr key={m.name}>
                    <td>{m.name}</td>
                    <td>{m.role}</td>
                    <td style={{ fontFamily: "monospace", fontSize: "13px" }}>{m.cpf}</td>
                    <td>{m.mandateStart}</td>
                    <td>{m.mandateEnd}</td>
                    <td>
                      <span style={{
                        color: m.compensated === "Não" ? "#0064B6" : "#E65100",
                        fontWeight: "700",
                        fontSize: "13px",
                      }}>
                        {m.compensated}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableWrapper>
        </PageSection>

        <PageSection>
          <SectionTitle>Conselho Fiscal</SectionTitle>
          <TableWrapper>
            <Table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Cargo</th>
                  <th>CPF (parcial)</th>
                  <th>Início</th>
                  <th>Fim</th>
                  <th>Remunerado</th>
                </tr>
              </thead>
              <tbody>
                {governance.fiscalCouncil.map((m) => (
                  <tr key={m.name}>
                    <td>{m.name}</td>
                    <td>{m.role}</td>
                    <td style={{ fontFamily: "monospace", fontSize: "13px" }}>{m.cpf}</td>
                    <td>{m.mandateStart}</td>
                    <td>{m.mandateEnd}</td>
                    <td style={{ color: "#0064B6", fontWeight: "700", fontSize: "13px" }}>{m.compensated}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableWrapper>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "13px", color: "var(--wpds-colors-onBackground-subtle)", marginTop: "8px" }}>
            * CPF não divulgado neste portal para proteção de dados pessoais (LGPD — Lei 13.709/2018). A composição oficial completa da diretoria e do conselho fiscal, com os respectivos mandatos, consta das atas de eleição e posse, disponíveis mediante solicitação à ouvidoria.
          </p>
        </PageSection>

        <PageSection>
          <SectionTitle>Política de Conflito de Interesses</SectionTitle>
          <div style={{ background: "#fff", border: "1px solid var(--wpds-colors-outline)", borderRadius: "4px", padding: "24px", marginBottom: "24px" }}>
            <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: "16px", lineHeight: "1.7", color: "var(--wpds-colors-primary)" }}>
              {governance.conflictOfInterestPolicy}
            </p>
          </div>
          <LegalNotice>
            Conforme exigência da Lei 13.019/2014, as declarações de conflito de interesse ficam arquivadas na sede da entidade e podem ser consultadas mediante solicitação à ouvidoria.
          </LegalNotice>
        </PageSection>
      </Wrap>
    </main>
  );
}
