import React from "react";
import { Link } from "react-router-dom";
import { styled } from "@washingtonpost/wpds-ui-kit";
import { entity } from "../data/entity";
import { logoSsvp } from "../assets/logo";

const FooterWrap = styled("footer", {
  backgroundColor: "#004d8a",
  color: "#e8f2fc",
  paddingTop: "$300",
  paddingBottom: "$150",
  marginTop: "$400",
});

const Inner = styled("div", {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "0 $150",
});

const Grid = styled("div", {
  display: "grid",
  gridTemplateColumns: "2fr 1fr 1fr 1fr",
  gap: "$200",
  marginBottom: "$200",
  "@md": { gridTemplateColumns: "1fr 1fr" },
  "@sm": { gridTemplateColumns: "1fr" },
});

const ColTitle = styled("h3", {
  fontFamily: "$meta",
  fontSize: "$087",
  fontWeight: "$bold",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#9ec8ef",
  marginBottom: "$100",
});

const FooterLink = styled(Link, {
  display: "block",
  fontFamily: "$meta",
  fontSize: "$087",
  color: "#cfe3f7",
  textDecoration: "none",
  marginBottom: "$050",
  lineHeight: "$meta",
  "&:hover": { color: "#fff", textDecoration: "underline" },
});

const FooterAnchor = styled("a", {
  display: "block",
  fontFamily: "$meta",
  fontSize: "$087",
  color: "#cfe3f7",
  textDecoration: "none",
  marginBottom: "$050",
  lineHeight: "$meta",
  "&:hover": { color: "#fff", textDecoration: "underline" },
});

const IpeaCard = styled("a", {
  display: "flex",
  alignItems: "center",
  gap: "$075",
  backgroundColor: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.25)",
  borderRadius: "$050",
  padding: "$100 $125",
  textDecoration: "none",
  color: "#e8f2fc",
  marginBottom: "$200",
  transition: "background 0.15s",
  "&:hover": { backgroundColor: "rgba(255,255,255,0.16)" },
});

const Bottom = styled("div", {
  borderTop: "1px solid #0064B6",
  paddingTop: "$150",
  display: "flex",
  flexWrap: "wrap",
  gap: "$100",
  justifyContent: "space-between",
  alignItems: "flex-start",
  "@sm": { flexDirection: "column" },
});

const BottomText = styled("p", {
  fontFamily: "$meta",
  fontSize: "$075",
  color: "#9ec8ef",
  lineHeight: "$meta",
  maxWidth: "560px",
});

const LegalBadge = styled("div", {
  fontFamily: "$meta",
  fontSize: "$075",
  color: "#9ec8ef",
  lineHeight: "$meta",
  textAlign: "right",
  "@sm": { textAlign: "left" },
});

export default function Footer() {
  return (
    <FooterWrap>
      <Inner>
        <Grid>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <img
                src={logoSsvp}
                alt={`Logo ${entity.shortName}`}
                width={48}
                height={48}
                style={{
                  width: "48px", height: "48px", objectFit: "contain", flexShrink: 0,
                  backgroundColor: "#fff", borderRadius: "50%", padding: "2px",
                }}
              />
              <span style={{ fontFamily: "'EB Garamond', Georgia, serif", fontWeight: "700", fontSize: "16px", color: "#e8f2fc", lineHeight: "1.2" }}>
                Sociedade de São Vicente<br />de Paulo — Brasil
              </span>
            </div>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "13px", color: "#cfe3f7", lineHeight: "1.6", marginBottom: "12px", fontStyle: "italic" }}>
              "{entity.mission}"
            </p>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "13px", color: "#9ec8ef", lineHeight: "1.6" }}>
              CNPJ: {entity.cnpj}<br />
              {entity.address}<br />
              {entity.phone} | <FooterAnchor href={`mailto:${entity.email}`} as="a">{entity.email}</FooterAnchor>
            </p>
          </div>

          <div>
            <ColTitle>Portal</ColTitle>
            <FooterLink to="/">Início</FooterLink>
            <FooterLink to="/quem-somos">Quem Somos</FooterLink>
            <FooterLink to="/governanca">Governança</FooterLink>
            <FooterLink to="/projetos">Projetos</FooterLink>
            <FooterLink to="/financeiro">Transparência Financeira</FooterLink>
            <FooterLink to="/parcerias">Parcerias</FooterLink>
          </div>

          <div>
            <ColTitle>Documentos</ColTitle>
            <FooterLink to="/processos-seletivos">Processos Seletivos</FooterLink>
            <FooterLink to="/relatorios">Relatórios e Docs.</FooterLink>
            <FooterLink to="/noticias">Notícias</FooterLink>
            <FooterLink to="/contato">Contato</FooterLink>
            <FooterLink to="/ouvidoria">Ouvidoria / LAI</FooterLink>
          </div>

          <div>
            <ColTitle>Legislação</ColTitle>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "12px", color: "#9ec8ef", lineHeight: "1.6" }}>
              Lei 13.019/2014 — MROSC<br />
              Decreto 8.726/2016<br />
              Lei 12.527/2011 — LAI<br />
              Res. CFC 1.409/2012<br />
              ITG 2002(R1) — CFC<br />
              CF/88, Art. 37
            </p>
          </div>
        </Grid>

        <IpeaCard href={entity.ipeaUrl} target="_blank" rel="noopener noreferrer" aria-label="Consulte nossa ficha no Mapa das OSCs do IPEA">
          <span style={{ fontSize: "20px" }} aria-hidden="true">🔗</span>
          <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "13px", lineHeight: "1.5" }}>
            <strong>Consulte nossa ficha no Mapa das OSCs do IPEA</strong><br />
            Dados cadastrais, área de atuação e registros públicos no Mapa das Organizações da Sociedade Civil (IPEA) — plataforma oficial do Governo Federal.
          </span>
        </IpeaCard>

        <Bottom>
          <BottomText>
            Sociedade de São Vicente de Paulo – Conselho Nacional do Brasil ·
            Entidade sem fins lucrativos. Não distribui lucros, bonificações ou vantagens a dirigentes,
            associados ou terceiros. · Portal atualizado em: {entity.lastUpdate}
          </BottomText>
          <LegalBadge>
            <div>© {new Date().getFullYear()} Sociedade de São Vicente de Paulo — CNB</div>
            <div style={{ marginTop: "4px" }}>
              <span style={{
                display: "inline-block",
                backgroundColor: "#0064B6",
                color: "#fff",
                borderRadius: "4px",
                padding: "2px 8px",
                fontSize: "11px",
                fontWeight: "700",
                letterSpacing: "0.05em",
              }}>
                🔓 PORTAL DE TRANSPARÊNCIA
              </span>
            </div>
          </LegalBadge>
        </Bottom>
      </Inner>
    </FooterWrap>
  );
}
