import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { styled } from "@washingtonpost/wpds-ui-kit";
import { entity } from "../data/entity";
import { logoSsvp } from "../assets/logo";

const HeaderWrap = styled("header", {
  position: "sticky",
  top: 0,
  zIndex: "$shell",
  backgroundColor: "#fff",
  borderBottom: "3px solid #0064B6",
  boxShadow: "$200",
});

const Inner = styled("div", {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "0 $150",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: "64px",
  gap: "$100",
});

const LogoWrap = styled(Link, {
  display: "flex",
  alignItems: "center",
  gap: "$075",
  textDecoration: "none",
  flexShrink: 0,
});

const LogoImg = styled("img", {
  width: "46px",
  height: "46px",
  objectFit: "contain",
  flexShrink: 0,
  display: "block",
});

const OrgNameWrap = styled("span", {
  display: "flex",
  flexDirection: "column",
  lineHeight: 1.15,
  "@sm": { display: "none" },
});

const OrgName = styled("span", {
  fontFamily: "$headline",
  fontWeight: "$bold",
  fontSize: "$100",
  color: "#0064B6",
  lineHeight: "$headline",
  "@md": { fontSize: "$087" },
});

const OrgUnit = styled("span", {
  fontFamily: "$meta",
  fontWeight: "$bold",
  fontSize: "$075",
  color: "$onBackground-subtle",
  letterSpacing: "0.02em",
  textTransform: "uppercase",
  marginTop: "2px",
  "@md": { fontSize: "10px" },
});

const Nav = styled("nav", {
  display: "flex",
  alignItems: "center",
  gap: "$025",
  flexWrap: "nowrap",
  "@sm": { display: "none" },
  "@md": { display: "none" },
});

const NavLink = styled(Link, {
  fontFamily: "$meta",
  fontSize: "$075",
  fontWeight: "$bold",
  color: "$primary",
  textDecoration: "none",
  padding: "$050 $075",
  borderRadius: "$025",
  whiteSpace: "nowrap",
  letterSpacing: "0.02em",
  textTransform: "uppercase",
  transition: "background 0.15s, color 0.15s",
  "&:hover": { backgroundColor: "#e8f2fc", color: "#0064B6" },
  variants: {
    active: {
      true: { backgroundColor: "#e8f2fc", color: "#0064B6" },
    },
  },
});

const OuvidoriaBtn = styled(Link, {
  fontFamily: "$meta",
  fontSize: "$075",
  fontWeight: "$bold",
  backgroundColor: "#0064B6",
  color: "#fff",
  textDecoration: "none",
  padding: "$050 $100",
  borderRadius: "$025",
  whiteSpace: "nowrap",
  flexShrink: 0,
  letterSpacing: "0.02em",
  transition: "background 0.15s",
  "&:hover": { backgroundColor: "#004d8a" },
  "@sm": { fontSize: "$075", padding: "$025 $075" },
});

const HamburgerBtn = styled("button", {
  display: "none",
  "@sm": { display: "flex" },
  "@md": { display: "flex" },
  alignItems: "center",
  justifyContent: "center",
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: "$050",
  color: "$primary",
});

const MobileMenu = styled("div", {
  position: "fixed",
  top: "64px",
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "#fff",
  zIndex: "$offer",
  overflowY: "auto",
  padding: "$150",
  display: "flex",
  flexDirection: "column",
  gap: "$025",
  borderTop: "1px solid $outline",
});

const MobileNavLink = styled(Link, {
  fontFamily: "$meta",
  fontSize: "$100",
  fontWeight: "$bold",
  color: "$primary",
  textDecoration: "none",
  padding: "$075 $100",
  borderRadius: "$025",
  display: "block",
  "&:hover": { backgroundColor: "#e8f2fc", color: "#0064B6" },
  variants: {
    active: { true: { backgroundColor: "#e8f2fc", color: "#0064B6" } },
  },
});

const navLinks = [
  { path: "/quem-somos", label: "Quem Somos" },
  { path: "/governanca", label: "Governança" },
  { path: "/projetos", label: "Projetos" },
  { path: "/financeiro", label: "Financeiro" },
  { path: "/parcerias", label: "Parcerias" },
  { path: "/processos-seletivos", label: "Seleções" },
  { path: "/relatorios", label: "Documentos" },
  { path: "/noticias", label: "Notícias" },
  { path: "/contato", label: "Contato" },
];

export default function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <HeaderWrap role="banner">
      <Inner>
        <LogoWrap to="/" onClick={() => setMenuOpen(false)} aria-label={`${entity.name} — Início`}>
          <LogoImg src={logoSsvp} alt={`Logo ${entity.shortName}`} />
          <OrgNameWrap>
            <OrgName>Sociedade de São Vicente de Paulo</OrgName>
            <OrgUnit>{entity.unit}</OrgUnit>
          </OrgNameWrap>
        </LogoWrap>

        <Nav aria-label="Navegação principal">
          {navLinks.map((l) => (
            <NavLink
              key={l.path}
              to={l.path}
              active={location.pathname === l.path ? true : undefined}
            >
              {l.label}
            </NavLink>
          ))}
        </Nav>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <OuvidoriaBtn to="/ouvidoria">Pedido de Informação</OuvidoriaBtn>
          <HamburgerBtn
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </HamburgerBtn>
        </div>
      </Inner>

      {menuOpen && (
        <MobileMenu role="dialog" aria-label="Menu de navegação mobile">
          {navLinks.map((l) => (
            <MobileNavLink
              key={l.path}
              to={l.path}
              active={location.pathname === l.path ? true : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </MobileNavLink>
          ))}
          <hr style={{ border: "none", borderTop: "1px solid #ddd", margin: "8px 0" }} />
          <MobileNavLink to="/ouvidoria" onClick={() => setMenuOpen(false)}
            style={{ backgroundColor: "#0064B6", color: "#fff" }}>
            Pedido de Informação / Ouvidoria
          </MobileNavLink>
        </MobileMenu>
      )}
    </HeaderWrap>
  );
}
