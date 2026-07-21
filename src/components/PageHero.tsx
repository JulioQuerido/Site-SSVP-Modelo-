import React from "react";
import { styled } from "@washingtonpost/wpds-ui-kit";

const HeroWrap = styled("div", {
  background: "linear-gradient(135deg, #0064B6 0%, #004d8a 100%)",
  paddingTop: "$300",
  paddingBottom: "$300",
  "@sm": { paddingTop: "$200", paddingBottom: "$200" },
});

const Inner = styled("div", {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "0 $150",
});

const Breadcrumb = styled("div", {
  fontFamily: "$meta",
  fontSize: "$075",
  color: "#9ec8ef",
  marginBottom: "$075",
  letterSpacing: "0.04em",
});

const Title = styled("h1", {
  fontFamily: "$headline",
  fontSize: "$350",
  fontWeight: "$bold",
  lineHeight: "$headline",
  color: "#fff",
  marginBottom: "$075",
  "@sm": { fontSize: "$200" },
  "@md": { fontSize: "$250" },
});

const Lead = styled("p", {
  fontFamily: "$subhead",
  fontSize: "$125",
  lineHeight: "$body",
  color: "#cfe3f7",
  maxWidth: "640px",
  "@sm": { fontSize: "$100" },
});

const UpdateBadge = styled("div", {
  display: "inline-flex",
  alignItems: "center",
  gap: "$050",
  backgroundColor: "rgba(0,0,0,0.25)",
  color: "#cfe3f7",
  fontFamily: "$meta",
  fontSize: "$075",
  padding: "$025 $075",
  borderRadius: "$round",
  marginTop: "$100",
});

interface PageHeroProps {
  title: string;
  lead?: string;
  breadcrumb?: string;
  lastUpdate?: string;
}

export default function PageHero({ title, lead, breadcrumb, lastUpdate }: PageHeroProps) {
  return (
    <HeroWrap>
      <Inner>
        {breadcrumb && <Breadcrumb>Portal de Transparência → {breadcrumb}</Breadcrumb>}
        <Title>{title}</Title>
        {lead && <Lead>{lead}</Lead>}
        {lastUpdate && (
          <UpdateBadge>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            Última atualização: {lastUpdate}
          </UpdateBadge>
        )}
      </Inner>
    </HeroWrap>
  );
}
