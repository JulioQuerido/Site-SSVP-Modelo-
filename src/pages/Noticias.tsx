import React from "react";
import { Link } from "react-router-dom";
import { styled } from "@washingtonpost/wpds-ui-kit";
import PageHero from "../components/PageHero";
import { PageSection, SectionTitle, Badge } from "../components/ui";
import { news } from "../data/news";
import { entity } from "../data/entity";

const Wrap = styled("div", {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "0 $150",
});

const NewsGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "$150",
  "@md": { gridTemplateColumns: "repeat(2, 1fr)" },
  "@sm": { gridTemplateColumns: "1fr" },
});

const NewsCard = styled("div", {
  border: "1px solid $outline",
  borderRadius: "$050",
  backgroundColor: "#fff",
  overflow: "hidden",
  transition: "box-shadow 0.2s",
  "&:hover": { boxShadow: "$300" },
});

const NewsCardTop = styled("div", {
  height: "4px",
  backgroundColor: "#0064B6",
});

const NewsImage = styled("img", {
  width: "100%",
  height: "180px",
  objectFit: "cover",
  display: "block",
});

const NewsCardBody = styled("div", {
  padding: "$150",
});

const NewsMeta = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$075",
  marginBottom: "$075",
});

const NewsDate = styled("span", {
  fontFamily: "$meta",
  fontSize: "$075",
  color: "$onBackground-subtle",
});

const NewsTitle = styled("h3", {
  fontFamily: "$headline",
  fontSize: "$125",
  fontWeight: "$bold",
  color: "$primary",
  lineHeight: "$headline",
  marginBottom: "$075",
});

const NewsSummary = styled("p", {
  fontFamily: "$meta",
  fontSize: "$087",
  color: "$onBackground-subtle",
  lineHeight: "$body",
  marginBottom: "$100",
});

const ReadMore = styled("a", {
  fontFamily: "$meta",
  fontSize: "$087",
  fontWeight: "$bold",
  color: "#0064B6",
  textDecoration: "none",
  "&:hover": { textDecoration: "underline" },
});

const categoryVariant: Record<string, "green" | "blue" | "gray" | "orange"> = {
  "Institucional": "green",
  "Processo Seletivo": "blue",
  "Projetos": "orange",
  "Transparência": "gray",
  "Eventos": "gray",
};

export default function Noticias() {
  return (
    <main>
      <PageHero
        title="Notícias e Publicações"
        lead="Acompanhe as novidades, projetos em destaque e publicações da Sociedade de São Vicente de Paulo."
        breadcrumb="Notícias"
        lastUpdate={entity.lastUpdate}
      />

      <Wrap>
        <PageSection>
          <SectionTitle>Últimas Notícias</SectionTitle>
          <NewsGrid>
            {news.map((item) => (
              <NewsCard key={item.id}>
                <NewsCardTop />
                {item.image && (
                  <NewsImage src={item.image} alt={item.title} loading="lazy" />
                )}
                <NewsCardBody>
                  <NewsMeta>
                    <Badge variant={categoryVariant[item.category] || "gray"}>{item.category}</Badge>
                    <NewsDate>{item.date}</NewsDate>
                  </NewsMeta>
                  <NewsTitle>{item.title}</NewsTitle>
                  <NewsSummary>{item.summary}</NewsSummary>
                  <ReadMore href={item.url} target="_blank" rel="noopener noreferrer">
                    Leia mais →
                  </ReadMore>
                </NewsCardBody>
              </NewsCard>
            ))}
          </NewsGrid>
        </PageSection>
      </Wrap>
    </main>
  );
}
