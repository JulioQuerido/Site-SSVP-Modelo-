import React from "react";
import { styled } from "@washingtonpost/wpds-ui-kit";
import PageHero from "../components/PageHero";
import { PageSection, SectionTitle, SectionLead } from "../components/ui";
import { entity } from "../data/entity";

const Wrap = styled("div", {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "0 $150",
});

const Grid = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "$200",
  "@sm": { gridTemplateColumns: "1fr" },
  "@md": { gridTemplateColumns: "1fr" },
});

const ContactCard = styled("div", {
  backgroundColor: "#fff",
  border: "1px solid $outline",
  borderRadius: "$050",
  padding: "$200",
  boxShadow: "$100",
});

const ContactTitle = styled("h3", {
  fontFamily: "$headline",
  fontSize: "$175",
  fontWeight: "$bold",
  color: "#0064B6",
  marginBottom: "$150",
  borderBottom: "2px solid #0064B6",
  paddingBottom: "$075",
});

const ContactItem = styled("div", {
  display: "flex",
  gap: "$100",
  alignItems: "flex-start",
  marginBottom: "$125",
});

const ContactIcon = styled("span", {
  fontSize: "20px",
  flexShrink: 0,
  lineHeight: 1.4,
});

const ContactText = styled("div", {
  fontFamily: "$meta",
  fontSize: "$100",
  color: "$primary",
  lineHeight: "$body",
  "& a": { color: "#0064B6", textDecoration: "none", "&:hover": { textDecoration: "underline" } },
});

const MapPlaceholder = styled("div", {
  width: "100%",
  height: "300px",
  backgroundColor: "#e8f2fc",
  borderRadius: "$025",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  color: "#0064B6",
  fontFamily: "$meta",
  fontSize: "$087",
  border: "2px dashed #6ba9e0",
  marginTop: "$150",
});

const SocialLink = styled("a", {
  display: "inline-flex",
  alignItems: "center",
  gap: "$050",
  fontFamily: "$meta",
  fontSize: "$087",
  color: "#0064B6",
  textDecoration: "none",
  padding: "$050 $100",
  border: "1px solid #0064B6",
  borderRadius: "$025",
  marginRight: "$075",
  marginBottom: "$075",
  transition: "all 0.15s",
  "&:hover": { backgroundColor: "#0064B6", color: "#fff" },
});

export default function Contato() {
  return (
    <main>
      <PageHero
        title="Contato"
        lead="Entre em contato com a Sociedade de São Vicente de Paulo — Conselho Nacional do Brasil."
        breadcrumb="Contato"
        lastUpdate={entity.lastUpdate}
      />

      <Wrap>
        <PageSection>
          <Grid>
            <div>
              <ContactCard>
                <ContactTitle>Informações de Contato</ContactTitle>

                <ContactItem>
                  <ContactIcon>🏢</ContactIcon>
                  <ContactText>
                    <strong>Endereço</strong><br />
                    {entity.address}
                  </ContactText>
                </ContactItem>

                <ContactItem>
                  <ContactIcon>📞</ContactIcon>
                  <ContactText>
                    <strong>Telefone / WhatsApp</strong><br />
                    <a href={`tel:${entity.phone.replace(/\D/g,"")}`}>{entity.phone}</a>
                  </ContactText>
                </ContactItem>

                <ContactItem>
                  <ContactIcon>📧</ContactIcon>
                  <ContactText>
                    <strong>E-mail Institucional</strong><br />
                    <a href={`mailto:${entity.email}`}>{entity.email}</a>
                  </ContactText>
                </ContactItem>

                <ContactItem>
                  <ContactIcon>📬</ContactIcon>
                  <ContactText>
                    <strong>Ouvidoria / LAI</strong><br />
                    <a href={`mailto:${entity.ombudsman}`}>{entity.ombudsman}</a>
                  </ContactText>
                </ContactItem>

                <ContactItem>
                  <ContactIcon>🌐</ContactIcon>
                  <ContactText>
                    <strong>Site</strong><br />
                    <a href={`https://${entity.website}`} target="_blank" rel="noopener noreferrer">{entity.website}</a>
                  </ContactText>
                </ContactItem>

                <ContactItem>
                  <ContactIcon>🕒</ContactIcon>
                  <ContactText>
                    <strong>Horário de Atendimento</strong><br />
                    Segunda a sexta-feira, das 8h às 17h<br />
                    <span style={{ fontSize: "13px", color: "var(--wpds-colors-onBackground-subtle)" }}>
                      Fechado em feriados nacionais, estaduais e municipais
                    </span>
                  </ContactText>
                </ContactItem>

                <div style={{ marginTop: "8px" }}>
                  <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "13px", fontWeight: "700", color: "var(--wpds-colors-onBackground-subtle)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "8px" }}>
                    Redes Sociais e Canais Oficiais
                  </p>
                  <SocialLink href={entity.socialMedia.instagram} target="_blank" rel="noopener noreferrer">
                    📷 Instagram @ssvp.brasil
                  </SocialLink>
                  <SocialLink href={entity.socialMedia.website} target="_blank" rel="noopener noreferrer">
                    🌐 Site Oficial
                  </SocialLink>
                  <SocialLink href={entity.socialMedia.store} target="_blank" rel="noopener noreferrer">
                    🛒 Loja Oficial
                  </SocialLink>
                </div>
              </ContactCard>
            </div>

            <div>
              <ContactCard>
                <ContactTitle>Localização</ContactTitle>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "14px", color: "var(--wpds-colors-onBackground-subtle)", marginBottom: "8px" }}>
                  {entity.address}
                </p>
                <MapPlaceholder>
                  <span style={{ fontSize: "40px", marginBottom: "8px" }}>🗺️</span>
                  <strong>Mapa — Rio de Janeiro, RJ</strong>
                  <span style={{ marginTop: "4px" }}>SSVP — Conselho Nacional do Brasil</span>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(entity.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginTop: "12px", color: "#004d8a", fontWeight: "700", fontSize: "13px" }}
                  >
                    ↗ Abrir no Google Maps
                  </a>
                </MapPlaceholder>

                <div style={{ marginTop: "24px", padding: "16px", backgroundColor: "#f4f9fe", borderRadius: "4px", border: "1px solid var(--wpds-colors-outline)" }}>
                  <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "14px", color: "var(--wpds-colors-primary)", lineHeight: "1.6" }}>
                    <strong>Pedido de Informação (LAI)</strong><br />
                    Para pedidos de informação com base na Lei 12.527/2011, utilize nosso canal de ouvidoria ou envie e-mail para {" "}
                    <a href={`mailto:${entity.ombudsman}`} style={{ color: "#0064B6" }}>{entity.ombudsman}</a>.
                    Respondemos em até <strong>20 dias úteis</strong>.
                  </p>
                </div>
              </ContactCard>
            </div>
          </Grid>
        </PageSection>
      </Wrap>
    </main>
  );
}
