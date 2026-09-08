export { renderers } from '../../renderers.mjs';

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": "https://adegavistaalegre.com.br", "SSR": true};
const prerender = false;
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
    const corpo = montarCorpoTxt(data, tipos);
    const html = montarCorpoHtml(data, tipos);
    try {
      console.log("[CONTATO]", JSON.stringify({
        nome: data.nome,
        tipo: data.tipoParceria,
        empresa: data.empresa,
        email: data.email,
        whatsapp: data.whatsapp,
        recebidoEm: (/* @__PURE__ */ new Date()).toISOString()
      }));
    } catch {
    }
    try {
      await tentarEnviarEmail({
        to: env("CONTACT_EMAIL", "contato@adegavistaalegre.com.br"),
        from: env("CONTACT_EMAIL", "no-reply@adegavistaalegre.com.br"),
        replyTo: data.email,
        subject: assunto,
        text: corpo,
        html
      });
    } catch (emailErr) {
      console.warn("[CONTATO] Email não enviado (dados acima estão nos logs):", emailErr instanceof Error ? emailErr.message : emailErr);
    }
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("[CONTATO] Erro geral:", err instanceof Error ? err.message : err);
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }
};
function env(key, fallback) {
  const v = Object.assign(__vite_import_meta_env__, { OS: process.env.OS })[key];
  if (typeof v === "string" && v.trim().length > 0) return v.trim();
  return fallback;
}
function montarCorpoTxt(d, tipos) {
  const linhas = [
    `Novo contato recebido pelo site da Adega Vista Alegre.`,
    "",
    `Dados pessoais:`,
    `  Nome: ${d.nome}`,
    d.nascimento ? `  Nascimento: ${d.nascimento}` : null,
    d.cpf ? `  CPF: ${d.cpf}` : null,
    d.rg ? `  RG: ${d.rg}` : null,
    "",
    `Dados comerciais:`,
    `  Empresa: ${d.empresa || "(não informado)"}`,
    `  Endereço: ${d.enderecoEmpresa || "(não informado)"}`,
    "",
    `Tipo de parceria: ${tipos[d.tipoParceria] || d.tipoParceria}`,
    "",
    `Contato:`,
    `  E-mail: ${d.email}`,
    `  WhatsApp: ${d.whatsapp}`,
    "",
    `Observações: ${d.observacoes || "(nenhuma)"}`,
    "",
    `Aceite LGPD: ${d.lgpd === "sim" ? "Sim" : "Não"}`,
    `Origem: ${d.origem}`,
    `Data/Hora: ${(/* @__PURE__ */ new Date()).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}`
  ];
  return linhas.filter((l) => l !== null && l !== void 0).join("\n");
}
function montarCorpoHtml(d, tipos) {
  const txt = montarCorpoTxt(d, tipos);
  return txt.split("\n").map((l) => l.trim() === "" ? "<br/>" : `<p style="margin:0 0 8px;line-height:1.6">${escapeHtml(l)}</p>`).join("");
}
async function tentarEnviarEmail(opts) {
  const resendKey = Object.assign(__vite_import_meta_env__, { OS: process.env.OS })["RESEND_API_KEY"];
  if (typeof resendKey === "string" && resendKey.trim().length > 0) {
    await enviarPorResend(resendKey.trim(), opts);
    return;
  }
  const smtpHost = Object.assign(__vite_import_meta_env__, { OS: process.env.OS })["SMTP_HOST"];
  const smtpUser = Object.assign(__vite_import_meta_env__, { OS: process.env.OS })["SMTP_USER"];
  const smtpPass = Object.assign(__vite_import_meta_env__, { OS: process.env.OS })["SMTP_PASS"];
  if (typeof smtpHost === "string" && smtpHost.trim().length > 0 && typeof smtpUser === "string" && smtpUser.trim().length > 0 && typeof smtpPass === "string" && smtpPass.trim().length > 0) {
    try {
      await enviarPorSmtpTcp({ ...opts, host: smtpHost.trim(), port: Number(Object.assign(__vite_import_meta_env__, { OS: process.env.OS })["SMTP_PORT"] || 587), user: smtpUser.trim(), pass: smtpPass.trim() });
      return;
    } catch (smtpErr) {
      console.warn("[CONTATO] SMTP falhou (tentando fallback logs apenas):", smtpErr instanceof Error ? smtpErr.message : smtpErr);
    }
  }
  console.warn("[CONTATO] Nenhum provedor de e-mail configurado. Os dados do contato estão nos logs e o lead foi recebido normalmente. Para receber por e-mail, configure RESEND_API_KEY (recomendado para Vercel) ou SMTP_HOST/SMTP_USER/SMTP_PASS.");
}
async function enviarPorResend(apiKey, opts) {
  const payload = {
    from: opts.from.includes("<") ? opts.from : `Adega Vista Alegre <${opts.from}>`,
    to: [opts.to],
    subject: opts.subject,
    text: opts.text,
    html: opts.html,
    reply_to: opts.replyTo
  };
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`Resend ${res.status}: ${txt.slice(0, 200)}`);
  }
}
async function enviarPorSmtpTcp(opts) {
  const boundary = "----=_Part_AVA_" + Date.now();
  const subject = `=?UTF-8?B?${b64EncodeUtf8(opts.subject)}?=`;
  const bodyLines = [
    `From: ${opts.from}`,
    `To: ${opts.to}`,
    opts.replyTo ? `Reply-To: ${opts.replyTo}` : "",
    `Subject: ${subject}`,
    `MIME-Version: 1.0`,
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    "",
    `--${boundary}`,
    `Content-Type: text/plain; charset="UTF-8"`,
    `Content-Transfer-Encoding: 8bit`,
    "",
    opts.text,
    "",
    `--${boundary}`,
    `Content-Type: text/html; charset="UTF-8"`,
    `Content-Transfer-Encoding: 8bit`,
    "",
    opts.html || "",
    "",
    `--${boundary}--`
  ].filter(Boolean).join("\r\n");
  const net = await import('node:net');
  const tls = await import('node:tls');
  const BufferCtor = (await import('node:buffer')).Buffer;
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      try {
        client.destroy();
      } catch {
      }
      reject(new Error("SMTP timeout"));
    }, 2e4);
    const client = net.connect(opts.port, opts.host);
    let buf = "";
    let state = "init";
    let tlsSocket = null;
    const sendRaw = (s) => {
      const socket = tlsSocket || client;
      socket.write(s + "\r\n");
    };
    const cmdEhlo = () => {
      sendRaw(`EHLO adegavistaalegre.local`);
      state = "ehlo";
    };
    const cmdStartTls = () => {
      sendRaw(`STARTTLS`);
      state = "starttls";
    };
    const cmdAuthPlain = () => {
      const auth = `\0${opts.user}\0${opts.pass}`;
      sendRaw(`AUTH PLAIN ${BufferCtor.from(auth, "utf-8").toString("base64")}`);
      state = "auth";
    };
    const cmdMailFrom = () => {
      sendRaw(`MAIL FROM:<${opts.from}>`);
      state = "mail";
    };
    const cmdRcptTo = () => {
      sendRaw(`RCPT TO:<${opts.to}>`);
      state = "rcpt";
    };
    const cmdData = () => {
      sendRaw(`DATA`);
      state = "data";
    };
    const sendBody = () => {
      const socket = tlsSocket || client;
      socket.write(bodyLines + "\r\n.\r\n");
      state = "dot";
    };
    const cmdQuit = () => {
      sendRaw(`QUIT`);
      state = "quit";
    };
    const handleLine = (line) => {
      const code = line.substring(0, 3);
      if (state === "init" && code === "220") {
        cmdEhlo();
        return;
      }
      if (state === "ehlo" && code.startsWith("25")) {
        cmdStartTls();
        return;
      }
      if (state === "starttls" && code === "220") {
        const socketOpts = {
          socket: client,
          servername: opts.host,
          rejectUnauthorized: false
        };
        try {
          tlsSocket = tls.connect(socketOpts, () => {
            state = "ehlo";
            sendRaw(`EHLO adegavistaalegre.local`);
          });
          tlsSocket.on("data", onData);
        } catch (e) {
          reject(e);
        }
        return;
      }
      if (state === "ehlo" && code.startsWith("25")) {
        cmdAuthPlain();
        return;
      }
      if (state === "auth" && code.startsWith("2")) {
        cmdMailFrom();
        return;
      }
      if (state === "mail" && code.startsWith("2")) {
        cmdRcptTo();
        return;
      }
      if (state === "rcpt" && code.startsWith("2")) {
        cmdData();
        return;
      }
      if (state === "data" && code === "354") {
        sendBody();
        return;
      }
      if (state === "dot" && code.startsWith("2")) {
        cmdQuit();
        return;
      }
      if (state === "quit" && (code === "221" || code.startsWith("2"))) {
        clearTimeout(timeoutId);
        try {
          tlsSocket ? tlsSocket.end() : client.end();
        } catch {
        }
        resolve();
        state = "done";
        return;
      }
      if (code.startsWith("4") || code.startsWith("5")) {
        clearTimeout(timeoutId);
        try {
          tlsSocket ? tlsSocket.destroy() : client.destroy();
        } catch {
        }
        reject(new Error("SMTP " + code + ": " + line));
        return;
      }
    };
    const onData = (chunk) => {
      buf += chunk.toString("utf-8");
      const lines = buf.split("\r\n");
      buf = lines.pop() || "";
      for (const line of lines) handleLine(line);
    };
    client.on("data", onData);
    client.on("error", (e) => {
      clearTimeout(timeoutId);
      reject(e);
    });
  });
}
function b64EncodeUtf8(s) {
  if (typeof btoa === "function") {
    try {
      const bytes = new TextEncoder().encode(s);
      let bin = "";
      bytes.forEach((b) => bin += String.fromCharCode(b));
      return btoa(bin);
    } catch {
    }
  }
  return Buffer.from(s, "utf-8").toString("base64");
}
function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
