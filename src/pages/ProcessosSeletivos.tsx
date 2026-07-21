import React from "react";
import { styled } from "@washingtonpost/wpds-ui-kit";
import PageHero from "../components/PageHero";
import { PageSection, SectionTitle, SectionLead, LegalNotice, DownloadLink, TableWrapper, Table, Badge } from "../components/ui";
import { selections } from "../data/selections";
import { entity } from "../data/entity";

const Wrap = styled("div", {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "0 $150",
});

const statusColor: Record<string, "green" | "blue" | "gray"> = {
  "Em andamento": "green",
  "Encerrado": "gray",
};

export default function ProcessosSeletivos() {
  const active = selections.filter((s) => s.status === "Em andamento");
  const closed = selections.filter((s) => s.status === "Encerrado");

  return (
    <main>
      <PageHero
        title="Processos Seletivos"
        lead="Editais de seleção de colaboradores, voluntários e prestadores de serviço, conforme o Decreto 8.726/2016."
        breadcrumb="Processos Seletivos"
        lastUpdate={entity.lastUpdate}
      />

      <Wrap>
        <PageSection>
          <LegalNotice css={{ marginBottom: "$200" }}>
            Publicação conforme art. 10 do Decreto 8.726/2016, que regulamenta a Lei 13.019/2014 (MROSC). Todos os processos seletivos são conduzidos com isonomia e publicidade, sendo os editais disponibilizados neste portal e no quadro de avisos da sede.
          </LegalNotice>

          <SectionTitle>Seleções em Andamento</SectionTitle>
          {active.length === 0 ? (
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "15px", color: "var(--wpds-colors-onBackground-subtle)", marginBottom: "32px" }}>
              Não há processos seletivos em andamento no momento.
            </p>
          ) : (
            <TableWrapper css={{ marginBottom: "$300" }}>
              <Table>
                <thead>
                  <tr>
                    <th>Cargo / Função</th>
                    <th>Data do Edital</th>
                    <th>Status</th>
                    <th>Edital</th>
                    <th>Resultado</th>
                  </tr>
                </thead>
                <tbody>
                  {active.map((s) => (
                    <tr key={s.id}>
                      <td style={{ fontWeight: "700" }}>{s.role}</td>
                      <td>{s.editalDate}</td>
                      <td><Badge variant="green">{s.status}</Badge></td>
                      <td><DownloadLink href={s.editalUrl} target="_blank">↓ Edital PDF</DownloadLink></td>
                      <td style={{ fontSize: "13px", color: "var(--wpds-colors-onBackground-subtle)" }}>
                        {s.result}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </TableWrapper>
          )}

          <SectionTitle>Arquivo Histórico — Seleções Encerradas</SectionTitle>
          <TableWrapper>
            <Table>
              <thead>
                <tr>
                  <th>Cargo / Função</th>
                  <th>Data do Edital</th>
                  <th>Status</th>
                  <th>Edital</th>
                  <th>Resultado</th>
                </tr>
              </thead>
              <tbody>
                {closed.map((s) => (
                  <tr key={s.id}>
                    <td>{s.role}</td>
                    <td>{s.editalDate}</td>
                    <td><Badge variant="gray">{s.status}</Badge></td>
                    <td><DownloadLink href={s.editalUrl} target="_blank">↓ Edital</DownloadLink></td>
                    <td>
                      <div style={{ fontSize: "13px" }}>{s.result}</div>
                      {s.resultUrl && (
                        <DownloadLink href={s.resultUrl} target="_blank" css={{ marginTop: "4px", fontSize: "12px" }}>
                          ↓ Resultado PDF
                        </DownloadLink>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableWrapper>
        </PageSection>

        <div style={{ marginBottom: "48px" }}>
          <LegalNotice>
            Os processos seletivos desta entidade são abertos ao público, sem discriminação. Candidatos com deficiência são incentivados a se inscrever. Para informações, contate: {entity.email}
          </LegalNotice>
        </div>
      </Wrap>
    </main>
  );
}
