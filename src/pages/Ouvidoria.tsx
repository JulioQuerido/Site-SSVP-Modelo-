import React, { useState } from "react";
import { styled } from "@washingtonpost/wpds-ui-kit";
import PageHero from "../components/PageHero";
import { PageSection, SectionTitle, SectionLead, LegalNotice } from "../components/ui";
import { entity } from "../data/entity";

const Wrap = styled("div", {
  maxWidth: "900px",
  margin: "0 auto",
  padding: "0 $150",
});

const Form = styled("form", {
  backgroundColor: "#fff",
  border: "1px solid $outline",
  borderRadius: "$050",
  padding: "$200",
  boxShadow: "$100",
  "@sm": { padding: "$150" },
});

const FieldGroup = styled("div", {
  marginBottom: "$150",
});

const Label = styled("label", {
  display: "block",
  fontFamily: "$meta",
  fontSize: "$087",
  fontWeight: "$bold",
  color: "$primary",
  marginBottom: "$050",
  "& span": { color: "#E53935", marginLeft: "2px" },
});

const Input = styled("input", {
  width: "100%",
  padding: "$075 $100",
  border: "1px solid $outline",
  borderRadius: "$025",
  fontFamily: "$meta",
  fontSize: "$100",
  color: "$primary",
  backgroundColor: "#fff",
  transition: "border 0.15s",
  boxSizing: "border-box",
  "&:focus": { outline: "none", borderColor: "#0064B6", boxShadow: "0 0 0 2px rgba(0,100,182,0.2)" },
});

const Select = styled("select", {
  width: "100%",
  padding: "$075 $100",
  border: "1px solid $outline",
  borderRadius: "$025",
  fontFamily: "$meta",
  fontSize: "$100",
  color: "$primary",
  backgroundColor: "#fff",
  transition: "border 0.15s",
  boxSizing: "border-box",
  "&:focus": { outline: "none", borderColor: "#0064B6", boxShadow: "0 0 0 2px rgba(0,100,182,0.2)" },
});

const Textarea = styled("textarea", {
  width: "100%",
  padding: "$075 $100",
  border: "1px solid $outline",
  borderRadius: "$025",
  fontFamily: "$meta",
  fontSize: "$100",
  color: "$primary",
  backgroundColor: "#fff",
  resize: "vertical",
  minHeight: "120px",
  transition: "border 0.15s",
  boxSizing: "border-box",
  "&:focus": { outline: "none", borderColor: "#0064B6", boxShadow: "0 0 0 2px rgba(0,100,182,0.2)" },
});

const SubmitBtn = styled("button", {
  backgroundColor: "#0064B6",
  color: "#fff",
  fontFamily: "$meta",
  fontSize: "$100",
  fontWeight: "$bold",
  padding: "$100 $200",
  border: "none",
  borderRadius: "$025",
  cursor: "pointer",
  transition: "background 0.15s",
  "&:hover": { backgroundColor: "#004d8a" },
  "&:disabled": { backgroundColor: "$disabled", cursor: "not-allowed" },
});

const SuccessCard = styled("div", {
  backgroundColor: "#e8f2fc",
  border: "2px solid #0064B6",
  borderRadius: "$050",
  padding: "$200",
  textAlign: "center",
});

const ProtocolBadge = styled("div", {
  display: "inline-block",
  fontFamily: "monospace",
  fontSize: "$150",
  fontWeight: "$bold",
  color: "#0064B6",
  backgroundColor: "#fff",
  border: "2px solid #0064B6",
  borderRadius: "$025",
  padding: "$075 $150",
  margin: "$100 0",
  letterSpacing: "0.1em",
});

const FaqSection = styled("div", {
  marginTop: "$300",
});

const FaqItem = styled("div", {
  border: "1px solid $outline",
  borderRadius: "$025",
  marginBottom: "$075",
  overflow: "hidden",
});

const FaqQuestion = styled("button", {
  width: "100%",
  padding: "$100 $150",
  textAlign: "left",
  background: "#fff",
  border: "none",
  cursor: "pointer",
  fontFamily: "$meta",
  fontSize: "$100",
  fontWeight: "$bold",
  color: "$primary",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  "&:hover": { backgroundColor: "#f4f9fe" },
});

const FaqAnswer = styled("div", {
  padding: "$100 $150",
  fontFamily: "$meta",
  fontSize: "$100",
  color: "$primary",
  lineHeight: "$body",
  borderTop: "1px solid $outline",
  backgroundColor: "#FAFAFA",
});

const faqs = [
  {
    q: "Quem pode fazer um pedido de informação?",
    a: "Qualquer pessoa física ou jurídica pode solicitar informações sobre as atividades da entidade. Não é obrigatório identificar-se ou justificar o pedido.",
  },
  {
    q: "Qual é o prazo de resposta?",
    a: "Respondemos em até 20 dias úteis, conforme os prazos da Lei 12.527/2011 (LAI). Em casos de maior complexidade, o prazo pode ser prorrogado por mais 10 dias úteis, com notificação ao solicitante.",
  },
  {
    q: "Como posso acompanhar meu pedido?",
    a: "Após o envio, você receberá um número de protocolo. Caso tenha informado um e-mail, enviaremos a resposta diretamente. Você também pode entrar em contato informando o número do protocolo.",
  },
  {
    q: "Quais informações não podem ser disponibilizadas?",
    a: "Informações que ponham em risco a privacidade de beneficiários e colaboradores (LGPD — Lei 13.709/2018) ou sigilo comercial de parceiros podem ter acesso restrito, com justificativa fundamentada.",
  },
  {
    q: "Posso fazer uma denúncia anonimamente?",
    a: "Sim. O campo 'Nome' é opcional e você pode selecionar 'Denúncia' como tipo de solicitação sem se identificar. A entidade garantirá o sigilo da identidade do denunciante.",
  },
];

function generateProtocol() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const rand = Math.floor(Math.random() * 90000) + 10000;
  return `SSVP-${y}${m}${d}-${rand}`;
}

export default function Ouvidoria() {
  const [submitted, setSubmitted] = useState(false);
  const [protocol, setProtocol] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({
    name: "", email: "", type: "Pedido de informação", description: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.description.trim()) return;
    const p = generateProtocol();
    setProtocol(p);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main>
      <PageHero
        title="Ouvidoria / Pedido de Informação"
        lead="Canal de transparência ativa, conforme a Lei 12.527/2011 (LAI) e a Lei 13.019/2014 (MROSC)."
        breadcrumb="Ouvidoria"
        lastUpdate={entity.lastUpdate}
      />

      <Wrap>
        <PageSection>
          <LegalNotice css={{ marginBottom: "$200" }}>
            Conforme a Lei 12.527/2011 (Lei de Acesso à Informação), entidades que recebem recursos públicos devem manter canal de atendimento a pedidos de informação. Respondemos em até <strong>20 dias úteis</strong>. Não é necessário se identificar para pedidos de informação de caráter público.
          </LegalNotice>

          {submitted ? (
            <SuccessCard>
              <div style={{ fontSize: "48px", marginBottom: "8px" }}>✅</div>
              <h2 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: "24px", color: "#004d8a", marginBottom: "8px" }}>
                Solicitação Recebida com Sucesso!
              </h2>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "15px", color: "#0064B6", marginBottom: "8px" }}>
                Seu número de protocolo é:
              </p>
              <ProtocolBadge>{protocol}</ProtocolBadge>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "14px", color: "#3a86cf", marginTop: "8px" }}>
                Guarde este número. Responderemos em até <strong>20 dias úteis</strong>.
                {form.email && ` A resposta será enviada para ${form.email}.`}
              </p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: "", email: "", type: "Pedido de informação", description: "" }); }}
                style={{ marginTop: "16px", background: "#0064B6", color: "#fff", border: "none", borderRadius: "4px", padding: "8px 20px", cursor: "pointer", fontFamily: "'Montserrat', sans-serif", fontWeight: "700" }}
              >
                Nova Solicitação
              </button>
            </SuccessCard>
          ) : (
            <>
              <SectionTitle>Enviar Solicitação</SectionTitle>
              <Form onSubmit={handleSubmit} aria-label="Formulário de solicitação à ouvidoria" noValidate>
                <FieldGroup>
                  <Label htmlFor="name">Nome <span style={{ color: "var(--wpds-colors-onBackground-subtle)", fontSize: "12px" }}>(opcional — para garantir anonimato, deixe em branco)</span></Label>
                  <Input id="name" type="text" placeholder="Seu nome (opcional)" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </FieldGroup>
                <FieldGroup>
                  <Label htmlFor="email">E-mail para resposta <span style={{ color: "var(--wpds-colors-onBackground-subtle)", fontSize: "12px" }}>(opcional)</span></Label>
                  <Input id="email" type="email" placeholder="seu@email.com.br" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </FieldGroup>
                <FieldGroup>
                  <Label htmlFor="type">Tipo de solicitação <span>*</span></Label>
                  <Select id="type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} required>
                    <option>Pedido de informação</option>
                    <option>Denúncia</option>
                    <option>Sugestão</option>
                    <option>Elogio</option>
                    <option>Outro</option>
                  </Select>
                </FieldGroup>
                <FieldGroup>
                  <Label htmlFor="description">Descrição da solicitação <span>*</span></Label>
                  <Textarea
                    id="description"
                    placeholder="Descreva detalhadamente sua solicitação, pedido de informação ou mensagem..."
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    required
                  />
                </FieldGroup>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "13px", color: "var(--wpds-colors-onBackground-subtle)", marginBottom: "16px" }}>
                  Prazo de resposta: até <strong>20 dias úteis</strong>, conforme a Lei 12.527/2011 (LAI).
                </p>
                <SubmitBtn type="submit" disabled={!form.description.trim()}>
                  Enviar Solicitação
                </SubmitBtn>
              </Form>

              <div style={{ marginTop: "32px", padding: "20px", backgroundColor: "#f4f9fe", borderRadius: "8px", border: "1px solid var(--wpds-colors-outline)" }}>
                <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: "700", fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--wpds-colors-onBackground-subtle)", marginBottom: "12px" }}>
                  Canais Alternativos de Contato
                </h3>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "14px", color: "var(--wpds-colors-primary)", lineHeight: "1.6" }}>
                  📧 E-mail: <a href={`mailto:${entity.ombudsman}`} style={{ color: "#0064B6" }}>{entity.ombudsman}</a><br />
                  📞 Telefone: {entity.phone}<br />
                  🏢 Presencial: {entity.address}<br />
                  🕒 Horário de atendimento: Segunda a sexta, das 8h às 17h
                </p>
              </div>
            </>
          )}
        </PageSection>

        <FaqSection>
          <SectionTitle>Perguntas Frequentes</SectionTitle>
          {faqs.map((faq, i) => (
            <FaqItem key={i}>
              <FaqQuestion
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                aria-expanded={openFaq === i}
              >
                {faq.q}
                <span style={{ fontSize: "20px", flexShrink: 0 }}>{openFaq === i ? "−" : "+"}</span>
              </FaqQuestion>
              {openFaq === i && <FaqAnswer>{faq.a}</FaqAnswer>}
            </FaqItem>
          ))}
        </FaqSection>

        <div style={{ marginBottom: "48px", marginTop: "32px" }}>
          <LegalNotice>
            Este canal é gerido conforme a Lei 12.527/2011 (LAI) e os princípios do controle social estabelecidos na CF/88. Informações prestadas por este canal são de caráter público, salvo aquelas protegidas pela LGPD (Lei 13.709/2018).
          </LegalNotice>
        </div>
      </Wrap>
    </main>
  );
}
