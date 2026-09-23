import type { APIRoute } from 'astro';

export const prerender = false;

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
      const hoje = new Date(); hoje.setHours(0, 0, 0, 0);
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
    const corpo = montarCorpoTxt(data, tipos);
    const html = montarCorpoHtml(data, tipos);

    try {
      console.log('[CONTATO]', JSON.stringify({
        nome: data.nome,
        tipo: data.tipoParceria,
        empresa: data.empresa,
        email: data.email,
        whatsapp: data.whatsapp,
        recebidoEm: new Date().toISOString()
      }));
    } catch {}

    try {
      await tentarEnviarEmail({
        to: env('CONTACT_EMAIL', 'contato@adegavistaalegre.com.br'),
        from: env('CONTACT_EMAIL', 'no-reply@adegavistaalegre.com.br'),
        replyTo: data.email,
        subject: assunto,
        text: corpo,
        html
      });
    } catch (emailErr) {
      console.warn('[CONTATO] Email não enviado (dados acima estão nos logs):', emailErr instanceof Error ? emailErr.message : emailErr);
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error('[CONTATO] Erro geral:', err instanceof Error ? err.message : err);
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

function env(key: string, fallback: string): string {
  const v = (import.meta.env as Record<string, unknown>)[key];
  if (typeof v === 'string' && v.trim().length > 0) return v.trim();
  return fallback;
}

type ContatoCampos = { nome: string; nascimento: string; cpf: string; rg: string; empresa: string; enderecoEmpresa: string; tipoParceria: string; email: string; whatsapp: string; observacoes: string; lgpd: string; origem: string };

function montarCorpoTxt(d: ContatoCampos, tipos: Record<string, string>): string {
  const linhas = [
    `Novo contato recebido pelo site da Adega Vista Alegre.`,
    '',
    `Dados pessoais:`,
    `  Nome: ${d.nome}`,
    d.nascimento ? `  Nascimento: ${d.nascimento}` : null,
    d.cpf ? `  CPF: ${d.cpf}` : null,
    d.rg ? `  RG: ${d.rg}` : null,
    '',
    `Dados comerciais:`,
    `  Empresa: ${d.empresa || '(não informado)'}`,
    `  Endereço: ${d.enderecoEmpresa || '(não informado)'}`,
    '',
    `Tipo de parceria: ${tipos[d.tipoParceria] || d.tipoParceria}`,
    '',
    `Contato:`,
    `  E-mail: ${d.email}`,
    `  WhatsApp: ${d.whatsapp}`,
    '',
    `Observações: ${d.observacoes || '(nenhuma)'}`,
    '',
    `Aceite LGPD: ${d.lgpd === 'sim' ? 'Sim' : 'Não'}`,
    `Origem: ${d.origem}`,
    `Data/Hora: ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}`
  ];
  return (linhas.filter((l): l is string => l !== null && l !== undefined)).join('\n');
}

function montarCorpoHtml(d: ContatoCampos, tipos: Record<string, string>): string {
  const txt = montarCorpoTxt(d, tipos);
  return txt
    .split('\n')
    .map((l) => (l.trim() === '' ? '<br/>' : `<p style="margin:0 0 8px;line-height:1.6">${escapeHtml(l)}</p>`))
    .join('');
}

async function tentarEnviarEmail(opts: { to: string; from: string; replyTo?: string; subject: string; text: string; html?: string }) {
  const resendKey = (import.meta.env as Record<string, unknown>)['RESEND_API_KEY'];
  if (typeof resendKey === 'string' && resendKey.trim().length > 0) {
    await enviarPorResend(resendKey.trim(), opts);
    return;
  }

  console.warn('[CONTATO] RESEND_API_KEY não configurado. Os dados do contato estão nos logs e o lead foi recebido normalmente. Para receber por e-mail, configure RESEND_API_KEY (recomendado para ambientes serverless).');
}

async function enviarPorResend(apiKey: string, opts: { to: string; from: string; replyTo?: string; subject: string; text: string; html?: string }) {
  const payload = {
    from: opts.from.includes('<') ? opts.from : `Adega Vista Alegre <${opts.from}>`,
    to: [opts.to],
    subject: opts.subject,
    text: opts.text,
    html: opts.html,
    reply_to: opts.replyTo
  };
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(`Resend ${res.status}: ${txt.slice(0, 200)}`);
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
