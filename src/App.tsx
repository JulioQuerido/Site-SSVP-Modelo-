import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { globalStyles } from "@washingtonpost/wpds-ui-kit";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import QuemSomos from "./pages/QuemSomos";
import Governanca from "./pages/Governanca";
import Projetos from "./pages/Projetos";
import Financeiro from "./pages/Financeiro";
import Parcerias from "./pages/Parcerias";
import ProcessosSeletivos from "./pages/ProcessosSeletivos";
import Relatorios from "./pages/Relatorios";
import Ouvidoria from "./pages/Ouvidoria";
import Noticias from "./pages/Noticias";
import Contato from "./pages/Contato";

globalStyles();

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quem-somos" element={<QuemSomos />} />
        <Route path="/governanca" element={<Governanca />} />
        <Route path="/projetos" element={<Projetos />} />
        <Route path="/financeiro" element={<Financeiro />} />
        <Route path="/parcerias" element={<Parcerias />} />
        <Route path="/processos-seletivos" element={<ProcessosSeletivos />} />
        <Route path="/relatorios" element={<Relatorios />} />
        <Route path="/ouvidoria" element={<Ouvidoria />} />
        <Route path="/noticias" element={<Noticias />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <div style={{
      maxWidth: "600px", margin: "80px auto", padding: "0 24px", textAlign: "center",
      fontFamily: "'Montserrat', sans-serif",
    }}>
      <div style={{ fontSize: "64px", marginBottom: "16px" }}>🔍</div>
      <h1 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: "32px", marginBottom: "8px" }}>
        Página não encontrada
      </h1>
      <p style={{ color: "#666", marginBottom: "24px" }}>
        A página que você procura não existe ou foi movida.
      </p>
      <Link to="/" style={{
        display: "inline-block", backgroundColor: "#0064B6", color: "#fff",
        textDecoration: "none", padding: "10px 24px", borderRadius: "4px", fontWeight: "700",
      }}>
        Voltar ao Início
      </Link>
    </div>
  );
}
