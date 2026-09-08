export { renderers } from '../../renderers.mjs';

const POST = async ({ request }) => {
  try {
    const fd = await request.formData();
    const sanitize = (v) => String(v ?? "").trim().slice(0, 500);
    const data = {
      nome: sanitize(fd.get("nome")),
      nascimento: sanitize(fd.get("nascimento")),
      cpf: sanitize(fd.get("cpf")),
      rg: sanitize(fd.get("rg")),
      empresa: sanitize(fd.get("empresa")),
      enderecoEmpresa: sanitize(fd.get("enderecoEmpresa")),
      tipoParceria: sanitize(fd.get("tipoParceria")),
      email: sanitize(fd.get("email")),
      whatsapp: sanitize(fd.get("whatsapp")),
      observacoes: sanitize(fd.get("observacoes")),
      lgpd: fd.get("lgpd") ? "sim" : "nao",
      origem: "site-ava-formulario"
    };
    const erros = [];
    if (data.nome.length < 3) erros.push("nome");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) erros.push("email");
    if (data.whatsapp.replace(/\D/g, "").length < 10) erros.push("whatsapp");
    if (!["compras", "guia", "divulgacao"].includes(data.tipoParceria)) erros.push("tipoParceria");
    if (data.lgpd !== "sim") erros.push("lgpd");
    if (data.nascimento) {
      const dt = new Date(data.nascimento);
      const hoje = /* @__PURE__ */ new Date();
      hoje.setHours(0, 0, 0, 0);
      if (Number.isNaN(dt.getTime()) || dt > hoje) erros.push("nascimento");
    }
    if (erros.length) {
      return new Response(JSON.stringify({ ok: false, erros }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const tipos = {
      compras: "Compras",
      guia: "Guia comissionado",
      divulgacao: "Divulgação comissionada"
    };
    const assunto = `[Contato Site] ${tipos[data.tipoParceria] || "Contato"} - ${data.nome}`;
    const corpo = [
      `Novo contato recebido pelo site da Adega Vista Alegre.`,
      "",
      `Dados pessoais:`,
      `  Nome: ${data.nome}`,
      data.nascimento ? `  Nascimento: ${data.nascimento}` : null,
      data.cpf ? `  CPF: ${data.cpf}` : null,
      data.rg ? `  RG: ${data.rg}` : null,
      "",
      `Dados comerciais:`,
      data.empresa ? `  Empresa: ${data.empresa}` : "  Empresa: (não informado)",
      data.enderecoEmpresa ? `  Endereço: ${data.enderecoEmpresa}` : "  Endereço: (não informado)",
      "",
      `Tipo de parceria: ${tipos[data.tipoParceria] || data.tipoParceria}`,
      "",
      `Contato:`,
      `  E-mail: ${data.email}`,
      `  WhatsApp: ${data.whatsapp}`,
      "",
      data.observacoes ? `Observações:
${data.observacoes}
` : "Observações: (nenhuma)",
      "",
      `Aceite LGPD: ${data.lgpd === "sim" ? "Sim" : "Não"}`,
      `Origem: ${data.origem}`,
      `Data/Hora: ${(/* @__PURE__ */ new Date()).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}`
    ].filter(Boolean).join("\n");
    const htmlBody = corpo.split("\n").map((l) => l.trim() === "" ? "<br/>" : `<p style="margin:0 0 8px;line-height:1.6">${escapeHtml(l)}</p>`).join("");
    try {
      await tentarEnviarEmail({
        to: undefined                              || "contato@adegavistaalegre.com.br",
        from: undefined                              || "no-reply@adegavistaalegre.com.br",
        replyTo: data.email,
        subject: assunto,
        text: corpo,
        html: htmlBody
      });
    } catch (emailErr) {
      console.error("[CONTACT_API] Falha ao enviar e-mail:", emailErr);
    }
    try {
      console.log("[CONTACT_API] Contato recebido:", JSON.stringify({
        nome: data.nome,
        tipo: data.tipoParceria,
        email: data.email,
        whatsapp: data.whatsapp,
        empresa: data.empresa
      }));
    } catch {
    }
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("[CONTACT_API] Erro geral:", err);
    return new Response(JSON.stringify({ ok: false, erro: "interno" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
async function tentarEnviarEmail(opts) {
  {
    console.warn("[CONTACT_API] SMTP não configurado. Use as variáveis SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS e CONTACT_EMAIL.");
    return;
  }
}
function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
