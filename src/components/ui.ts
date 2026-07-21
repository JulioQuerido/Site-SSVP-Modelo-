import { styled } from "@washingtonpost/wpds-ui-kit";

export const entity = {
  color: "#0064B6",
  colorLight: "#e8f2fc",
  colorDark: "#004d8a",
};

export const PageSection = styled("section", {
  paddingTop: "$400",
  paddingBottom: "$400",
  "@sm": { paddingTop: "$200", paddingBottom: "$200" },
});

export const SectionTitle = styled("h2", {
  fontFamily: "$headline",
  fontSize: "$300",
  fontWeight: "$bold",
  lineHeight: "$headline",
  color: "$primary",
  marginBottom: "$050",
  "@sm": { fontSize: "$200" },
});

export const SectionLead = styled("p", {
  fontFamily: "$subhead",
  fontSize: "$112",
  lineHeight: "$body",
  color: "$onBackground-subtle",
  marginBottom: "$200",
  maxWidth: "680px",
});

export const Divider = styled("hr", {
  border: "none",
  borderTop: "2px solid",
  borderColor: "$outline",
  marginBottom: "$200",
});

export const Badge = styled("span", {
  display: "inline-block",
  padding: "2px $050",
  borderRadius: "$round",
  fontSize: "$075",
  fontFamily: "$meta",
  fontWeight: "$bold",
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  variants: {
    variant: {
      green: { backgroundColor: "#e8f2fc", color: "#004d8a" },
      blue: { backgroundColor: "$blue600", color: "$blue100" },
      gray: { backgroundColor: "$gray400", color: "$gray40" },
      orange: { backgroundColor: "$orange600", color: "$orange100" },
    },
  },
  defaultVariants: { variant: "green" },
});

export const DownloadLink = styled("a", {
  display: "inline-flex",
  alignItems: "center",
  gap: "$050",
  color: "#0064B6",
  fontFamily: "$meta",
  fontSize: "$087",
  fontWeight: "$bold",
  textDecoration: "none",
  padding: "$050 $075",
  border: "1px solid #0064B6",
  borderRadius: "$025",
  transition: "all 0.15s",
  "&:hover": {
    backgroundColor: "#e8f2fc",
  },
});

export const LegalNotice = styled("div", {
  backgroundColor: "#e8f2fc",
  borderLeft: "4px solid #0064B6",
  padding: "$100 $150",
  borderRadius: "0 $025 $025 0",
  fontSize: "$087",
  fontFamily: "$meta",
  color: "#004d8a",
  lineHeight: "$meta",
});

export const TableWrapper = styled("div", {
  width: "100%",
  overflowX: "auto",
  borderRadius: "$025",
  border: "1px solid $outline",
});

export const Table = styled("table", {
  width: "100%",
  borderCollapse: "collapse",
  fontFamily: "$meta",
  fontSize: "$087",
  "& th": {
    backgroundColor: "#0064B6",
    color: "#fff",
    padding: "$075 $100",
    textAlign: "left",
    fontWeight: "$bold",
    fontSize: "$075",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
  },
  "& td": {
    padding: "$075 $100",
    borderBottom: "1px solid $outline",
    color: "$primary",
    verticalAlign: "middle",
    lineHeight: "$meta",
  },
  "& tr:last-child td": { borderBottom: "none" },
  "& tr:nth-child(even) td": { backgroundColor: "#f4f9fe" },
  "& tr:hover td": { backgroundColor: "#e8f2fc" },
});
