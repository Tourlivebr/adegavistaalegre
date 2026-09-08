import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const fd = await request.formData();

    const sanitize = (v: unknown) => String(v ?? '').trim().slice(0, 500);
    const data = {
      nome: sanitize(fd.get('nome')),
      nascimento: sanitize(fd.get('nascimento')),
      cpf: sanitize(fd.get('cpf')),
      rg: sanitize(fd.get('rg')),
      empresa: sanitize(fd.get('empresa')),
      enderecoEmpresa: sanitize(fd.get('enderecoEmpresa')),
      tipoParceria: sanitize(fd.get('tipoParceria')),
      email: sanitize(fd.get('email')),
      whatsapp: sanitize(fd.get('whatsapp')),
      observacoes: sanitize(fd.get('observacoes')),
      lgpd: fd.get('lgpd') ? 'sim' : 'nao',
      origem: 'site-ava-formulario'
    };

    const erros: string[] = [];
    if (data.nome.length < 3) erros.push('nome');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) erros.push('email');
    if (data.whatsapp.replace(/\D/g, '').length < 10) erros.push('whatsapp');
    if (!['compras', 'guia', 'divulgacao'].includes(data.tipoParceria)) erros.push('tipoParceria');
    if (data.lgpd !== 'sim') erros.push('lgpd');
    if (data.nascimento) {
      const dt = new Date(data.nascimento);
      const hoje = new Date(); hoje.setHours(0,0,0,0);
      if (Number.isNaN(dt.getTime()) || dt > hoje) erros.push('nascimento');
    }

    if (erros.length) {
      return new Response(JSON.stringify({ ok: false, erros }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const tipos: Record<string, string> = {
      compras: 'Compras',
      guia: 'Guia comissionado',
      divulgacao: 'Divulgação comissionada'
    };

    const assunto = `[Contato Site] ${tipos[data.tipoParceria] || 'Contato'} - ${data.nome}`;
    const corpo = [
      `Novo contato recebido pelo site da Adega Vista Alegre.`,
      '',
      `Dados pessoais:`,
      `  Nome: ${data.nome}`,
      data.nascimento ? `  Nascimento: ${data.nascimento}` : null,
      data.cpf ? `  CPF: ${data.cpf}` : null,
      data.rg ? `  RG: ${data.rg}` : null,
      '',
      `Dados comerciais:`,
      data.empresa ? `  Empresa: ${data.empresa}` : '  Empresa: (não informado)',
      data.enderecoEmpresa ? `  Endereço: ${data.enderecoEmpresa}` : '  Endereço: (não informado)',
      '',
      `Tipo de parceria: ${tipos[data.tipoParceria] || data.tipoParceria}`,
      '',
      `Contato:`,
      `  E-mail: ${data.email}`,
      `  WhatsApp: ${data.whatsapp}`,
      '',
      data.observacoes ? `Observações:\n${data.observacoes}\n` : 'Observações: (nenhuma)',
      '',
      `Aceite LGPD: ${data.lgpd === 'sim' ? 'Sim' : 'Não'}`,
      `Origem: ${data.origem}`,
      `Data/Hora: ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}`
    ].filter(Boolean).join('\n');

    const htmlBody = corpo
      .split('\n')
      .map((l) => (l.trim() === '' ? '<br/>' : `<p style="margin:0 0 8px;line-height:1.6">${escapeHtml(l)}</p>`))
      .join('');

    try {
      await tentarEnviarEmail({
        to: import.meta.env.CONTACT_EMAIL || 'contato@adegavistaalegre.com.br',
        from: import.meta.env.CONTACT_EMAIL || 'no-reply@adegavistaalegre.com.br',
        replyTo: data.email,
        subject: assunto,
        text: corpo,
        html: htmlBody
      });
    } catch (emailErr) {
      console.error('[CONTACT_API] Falha ao enviar e-mail:', emailErr);
    }

    try {
      console.log('[CONTACT_API] Contato recebido:', JSON.stringify({
        nome: data.nome,
        tipo: data.tipoParceria,
        email: data.email,
        whatsapp: data.whatsapp,
        empresa: data.empresa
      }));
    } catch {}

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error('[CONTACT_API] Erro geral:', err);
    return new Response(JSON.stringify({ ok: false, erro: 'interno' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

async function tentarEnviarEmail(opts: {
  to: string; from: string; replyTo?: string; subject: string; text: string; html?: string;
}) {
  const host = import.meta.env.SMTP_HOST;
  const port = Number(import.meta.env.SMTP_PORT || 587);
  const user = import.meta.env.SMTP_USER;
  const pass = import.meta.env.SMTP_PASS;

  if (!host || !user || !pass) {
    console.warn('[CONTACT_API] SMTP não configurado. Use as variáveis SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS e CONTACT_EMAIL.');
    return;
  }

  const boundary = '----=_Part_AVA_' + Date.now();
  const subject = `=?UTF-8?B?${Buffer.from(opts.subject).toString('base64')}?=`;
  const to = opts.to;
  const from = opts.from;
  const replyTo = opts.replyTo || '';
  const text = opts.text;
  const html = opts.html || '';

  const body = [
    `From: ${from}`,
    `To: ${to}`,
    replyTo ? `Reply-To: ${replyTo}` : '',
    `Subject: ${subject}`,
    `MIME-Version: 1.0`,
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    '',
    `--${boundary}`,
    `Content-Type: text/plain; charset="UTF-8"`,
    `Content-Transfer-Encoding: 8bit`,
    '',
    text,
    '',
    `--${boundary}`,
    `Content-Type: text/html; charset="UTF-8"`,
    `Content-Transfer-Encoding: 8bit`,
    '',
    html,
    '',
    `--${boundary}--`
  ].filter(Boolean).join('\r\n');

  const net = await import('node:net');
  return new Promise<void>((resolve, reject) => {
    const client = net.connect(port, host, () => {
      let state = 0;
      let buffer = '';
      const commands: string[] = [];
      commands.push(`EHLO adegavistaalegre.local`);
      commands.push(`STARTTLS`);
      // após STARTTLS, ideal usar TLS; aqui apenas log e fechamos caso não suporte
      const sendNext = () => {
        if (commands.length === 0) {
          client.end();
          resolve();
          return;
        }
        const cmd = commands.shift()!;
        client.write(cmd + '\r\n');
      };
      client.on('data', (chunk) => {
        buffer += chunk.toString('utf-8');
        const lines = buffer.split('\r\n');
        buffer = lines.pop() || '';
        for (const line of lines) {
          const code = line.substring(0, 3);
          if (state === 0 && code === '220') { state = 1; sendNext(); continue; }
          if (code.startsWith('25')) { sendNext(); continue; }
          if (code === '220' && state >= 1) {
            commands.length = 0;
            try {
              const b64 = Buffer.from(user).toString('base64');
              const b64p = Buffer.from(pass).toString('base64');
              commands.push(`AUTH PLAIN ${Buffer.from(`\u0000${user}\u0000${pass}`).toString('base64')}`);
              commands.push(`MAIL FROM:<${from}>`);
              commands.push(`RCPT TO:<${to}>`);
              commands.push(`DATA`);
              commands.push(`${body}\r\n.`);
              commands.push(`QUIT`);
            } catch {}
            sendNext();
            continue;
          }
          if (code === '354') { sendNext(); continue; }
          if (code === '221') { client.end(); resolve(); return; }
          if (code.startsWith('4') || code.startsWith('5')) {
            client.end();
            reject(new Error('SMTP error: ' + line));
            return;
          }
          sendNext();
        }
      });
      client.on('error', (e) => reject(e));
      client.on('timeout', () => { client.destroy(); reject(new Error('SMTP timeout')); });
      client.setTimeout(15000);
    });
  });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
