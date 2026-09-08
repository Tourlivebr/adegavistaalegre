import { e as createAstro, c as createComponent, a as renderTemplate, u as unescapeHTML, b as addAttribute, m as maybeRenderHead, r as renderComponent, f as renderHead, g as renderSlot } from './astro/server_BSdyDsi4.mjs';
import 'kleur/colors';
/* empty css                         */
import 'clsx';

const site = {
  nome: "Adega Vista Alegre",
  slogan: "Qualidade, sabor e boas parcerias em um só lugar.",
  descricao: "Conheça a Adega Vista Alegre, seus produtos e oportunidades de parceria para empresas, guias de turismo e divulgadores.",
  url: "https://adegavistaalegre.com.br",
  whatsapp: {
    numero: "5511999999999",
    numeroFormatado: "(11) 99999-9999",
    mensagemPadrao: "Olá! Acessei o site da Adega Vista Alegre e gostaria de mais informações."
  },
  email: {
    contato: "contato@adegavistaalegre.com.br"
  },
  redes: {
    instagram: "https://instagram.com/adegavistaalegre",
    instagramLabel: "@adegavistaalegre"
  },
  representante: {
    nome: "[Nome da Representante]",
    nomePlaceholder: "Informe o nome da representante comercial",
    apresentacao: "Atendimento personalizado para clientes, empresas, profissionais do turismo e parceiros interessados nos produtos da Adega Vista Alegre.",
    regiao: "[Região de atendimento]",
    regiaoPlaceholder: "Informe a região de atendimento"},
  endereco: {
    logradouroPlaceholder: "[Informe o endereço]",
    cidadePlaceholder: "[Cidade - UF]"
  }};
const menuLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Produtos", href: "#produtos" },
  { label: "Parceiros", href: "#guias" },
  { label: "Vídeos", href: "#videos" },
  { label: "Seja um Parceiro", href: "#contato" },
  { label: "Contato", href: "#rodape" }
];
const footerLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Produtos", href: "#produtos" },
  { label: "Parceiros", href: "#guias" },
  { label: "Vídeos", href: "#videos" },
  { label: "Contato", href: "#contato" },
  { label: "Política de Privacidade", href: "/politica-de-privacidade" }
];
function getWhatsAppLink(message) {
  const texto = encodeURIComponent(message || site.whatsapp.mensagemPadrao);
  return `https://wa.me/${site.whatsapp.numero}?text=${texto}`;
}
function getProductWhatsAppLink(categoria) {
  const mensagem = `Olá! Acessei o site da Adega Vista Alegre e gostaria de receber mais informações sobre ${categoria}.`;
  return getWhatsAppLink(mensagem);
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro$1 = createAstro("https://adegavistaalegre.com.br");
const $$SEO = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$SEO;
  const {
    title,
    description = site.descricao,
    image,
    canonical,
    type = "website",
    noIndex = false,
    publishedTime,
    jsonLd
  } = Astro2.props;
  const fullTitle = title ? `${title} | ${site.nome}` : `${site.nome} | Vinhos, Produtos e Parcerias Comerciais`;
  const pageUrl = canonical ? new URL(canonical, site.url).toString() : new URL(Astro2.url.pathname, site.url).toString();
  const ogImage = image ? new URL(image, site.url).toString() : new URL("/og-image.jpg", site.url).toString();
  const defaultJsonLd = {
    "@context": "https://schema.org",
    "@type": type === "article" ? "Article" : "Organization",
    name: site.nome,
    url: pageUrl,
    description,
    logo: new URL("/favicon.svg", site.url).toString(),
    telephone: site.whatsapp.numeroFormatado,
    email: site.email.contato,
    sameAs: [site.redes.instagram] 
  };
  return renderTemplate(_a || (_a = __template(["<title>", '</title><meta name="description"', '><link rel="canonical"', ">", "", '<meta property="og:site_name"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:type"', '><meta property="og:url"', '><meta property="og:locale" content="pt_BR"><meta property="og:image"', '><meta property="og:image:secure_url"', '><meta property="og:image:type" content="image/jpeg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt"', '><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"', '><meta name="twitter:description"', '><meta name="twitter:image"', '><meta name="twitter:url"', '><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="apple-touch-icon" href="/favicon.svg"><meta name="theme-color" content="#6D1830">', '<script type="application/ld+json">', "<\/script>"])), fullTitle, addAttribute(description, "content"), addAttribute(pageUrl, "href"), noIndex && renderTemplate`<meta name="robots" content="noindex, nofollow">`, !noIndex && renderTemplate`<meta name="robots" content="index, follow, max-image-preview:large">`, addAttribute(site.nome, "content"), addAttribute(fullTitle, "content"), addAttribute(description, "content"), addAttribute(type, "content"), addAttribute(pageUrl, "content"), addAttribute(ogImage, "content"), addAttribute(ogImage, "content"), addAttribute(site.nome, "content"), addAttribute(fullTitle, "content"), addAttribute(description, "content"), addAttribute(ogImage, "content"), addAttribute(pageUrl, "content"), publishedTime && renderTemplate`<meta property="article:published_time"${addAttribute(publishedTime, "content")}>`, unescapeHTML(JSON.stringify(jsonLd || defaultJsonLd)));
}, "C:/Projects/LojaVinhos/src/components/SEO.astro", void 0);

const $$Header = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<header id="header" class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-transparent" data-astro-cid-3ef6ksr2> <div class="container" data-astro-cid-3ef6ksr2> <div class="flex items-center justify-between h-16 md:h-20" data-astro-cid-3ef6ksr2> <a href="#inicio" class="flex items-center gap-2.5 group shrink-0" aria-label="Adega Vista Alegre - Ir para o início" data-astro-cid-3ef6ksr2> <span class="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-wine-700 text-white flex items-center justify-center font-display text-lg font-bold transition-transform duration-300 group-hover:scale-105" aria-hidden="true" data-astro-cid-3ef6ksr2>
V
</span> <span class="flex flex-col leading-tight" data-astro-cid-3ef6ksr2> <span class="font-display text-lg md:text-xl font-semibold text-ink-900 tracking-tight" data-astro-cid-3ef6ksr2>
Vista Alegre
</span> <span class="text-[10px] md:text-xs uppercase tracking-[0.18em] text-wine-700 font-semibold" data-astro-cid-3ef6ksr2>
Adega
</span> </span> </a> <nav class="hidden lg:flex items-center gap-8" aria-label="Navegação principal" data-astro-cid-3ef6ksr2> ${menuLinks.map((link) => renderTemplate`<a${addAttribute(link.href, "href")} class="text-sm font-medium text-ink-700 hover:text-wine-700 transition-colors duration-200 relative py-2 after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-0 after:bg-wine-700 hover:after:w-full after:transition-all after:duration-300" data-astro-cid-3ef6ksr2> ${link.label} </a>`)} </nav> <div class="hidden lg:flex items-center gap-3" data-astro-cid-3ef6ksr2> <a${addAttribute(getWhatsAppLink(), "href")} target="_blank" rel="noopener noreferrer" class="btn-primary !py-2.5 !px-4 text-sm" aria-label="Falar no WhatsApp" data-astro-cid-3ef6ksr2> <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-astro-cid-3ef6ksr2> <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" data-astro-cid-3ef6ksr2></path> </svg>
WhatsApp
</a> </div> <button id="menu-toggle" type="button" class="lg:hidden w-11 h-11 -mr-2 inline-flex items-center justify-center rounded-lg text-ink-800 hover:bg-cream-100 transition-colors" aria-label="Abrir menu" aria-expanded="false" aria-controls="mobile-menu" data-astro-cid-3ef6ksr2> <svg id="icon-open" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-astro-cid-3ef6ksr2> <line x1="3" y1="7" x2="21" y2="7" data-astro-cid-3ef6ksr2></line> <line x1="3" y1="12" x2="21" y2="12" data-astro-cid-3ef6ksr2></line> <line x1="3" y1="17" x2="21" y2="17" data-astro-cid-3ef6ksr2></line> </svg> <svg id="icon-close" class="w-6 h-6 hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-astro-cid-3ef6ksr2> <line x1="18" y1="6" x2="6" y2="18" data-astro-cid-3ef6ksr2></line> <line x1="6" y1="6" x2="18" y2="18" data-astro-cid-3ef6ksr2></line> </svg> </button> </div> </div> <div id="mobile-menu" class="lg:hidden hidden bg-white border-t border-cream-200 max-h-[calc(100vh-5rem)] overflow-y-auto" data-astro-cid-3ef6ksr2> <div class="container py-4 flex flex-col gap-1" data-astro-cid-3ef6ksr2> ${menuLinks.map((link) => renderTemplate`<a${addAttribute(link.href, "href")} class="mobile-link px-4 py-3 rounded-lg text-ink-800 hover:bg-cream-100 hover:text-wine-700 font-medium transition-colors" data-astro-cid-3ef6ksr2> ${link.label} </a>`)} <div class="pt-4 mt-2 border-t border-cream-200" data-astro-cid-3ef6ksr2> <a${addAttribute(getWhatsAppLink(), "href")} target="_blank" rel="noopener noreferrer" class="btn-primary w-full" data-astro-cid-3ef6ksr2> <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-astro-cid-3ef6ksr2> <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" data-astro-cid-3ef6ksr2></path> </svg>
Fale no WhatsApp
</a> </div> </div> </div> </header>  `;
}, "C:/Projects/LojaVinhos/src/components/Header.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const ano = (/* @__PURE__ */ new Date()).getFullYear();
  return renderTemplate`${maybeRenderHead()}<footer id="rodape" class="relative bg-ink-900 text-white mt-0"> <div class="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-wine-700 via-wine-600 to-wine-800"></div> <div class="container pt-16 md:pt-20 pb-8"> <div class="grid gap-10 md:gap-12 md:grid-cols-2 lg:grid-cols-12"> <div class="lg:col-span-5"> <div class="flex items-center gap-3 mb-5"> <span class="w-11 h-11 rounded-lg bg-wine-700 text-white flex items-center justify-center font-display text-xl font-bold" aria-hidden="true">
V
</span> <div class="flex flex-col leading-tight"> <span class="font-display text-xl md:text-2xl font-semibold tracking-tight">
Vista Alegre
</span> <span class="text-[11px] md:text-xs uppercase tracking-[0.18em] text-wine-300 font-semibold">
Adega
</span> </div> </div> <p class="text-cream-400/80 max-w-md leading-relaxed mb-6"> ${site.slogan} Produtos selecionados, atendimento personalizado e oportunidades de parceria comercial para empresas e profissionais.
</p> <div class="flex flex-wrap gap-3"> <a${addAttribute(getWhatsAppLink(), "href")} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#25D366]/40 transition-all text-sm"> <svg class="w-4 h-4 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"> <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"></path> </svg>
WhatsApp
</a> <a${addAttribute(site.redes.instagram, "href")} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-pink-500/40 transition-all text-sm"> <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"> <path d="M12 2.163c3.204 0 3.584.012 4.849.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.849.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path> </svg> ${site.redes.instagramLabel} </a> <a${addAttribute(`mailto:${site.email.contato}`, "href")} class="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-wine-400/40 transition-all text-sm"> <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"> <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path> <polyline points="22,6 12,13 2,6"></polyline> </svg>
E-mail
</a> </div> </div> <div class="lg:col-span-3"> <h3 class="font-display text-lg font-semibold mb-4 text-white">Navegação</h3> <ul class="space-y-2.5"> ${footerLinks.map((link) => renderTemplate`<li> <a${addAttribute(link.href, "href")} class="text-cream-400/80 hover:text-wine-300 transition-colors text-sm"> ${link.label} </a> </li>`)} </ul> </div> <div class="lg:col-span-4"> <h3 class="font-display text-lg font-semibold mb-4 text-white">Entre em contato</h3> <ul class="space-y-4"> <li class="flex items-start gap-3"> <span class="shrink-0 mt-0.5 w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-wine-300" aria-hidden="true"> <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path> <circle cx="12" cy="10" r="3"></circle> </svg> </span> <div class="text-sm text-cream-400/80"> <p>${site.endereco.logradouroPlaceholder}</p> <p>${site.endereco.cidadePlaceholder}</p> </div> </li> <li class="flex items-start gap-3"> <span class="shrink-0 mt-0.5 w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#25D366]" aria-hidden="true"> <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"> <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"></path> </svg> </span> <div class="text-sm"> <a${addAttribute(getWhatsAppLink(), "href")} target="_blank" rel="noopener noreferrer" class="text-cream-400/80 hover:text-[#25D366] transition-colors"> ${site.whatsapp.numeroFormatado} </a> <p class="text-cream-400/60 text-xs mt-0.5">Atendimento comercial</p> </div> </li> <li class="flex items-start gap-3"> <span class="shrink-0 mt-0.5 w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-wine-300" aria-hidden="true"> <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path> <polyline points="22,6 12,13 2,6"></polyline> </svg> </span> <a${addAttribute(`mailto:${site.email.contato}`, "href")} class="text-cream-400/80 hover:text-wine-300 transition-colors text-sm break-all"> ${site.email.contato} </a> </li> </ul> </div> </div> <div class="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3"> <p class="text-xs md:text-sm text-cream-400/60">
&copy; ${ano} ${site.nome}. Todos os direitos reservados.
</p> <p class="text-xs text-cream-400/50">
Feito com parceria comercial.
</p> </div> </div> </footer>`;
}, "C:/Projects/LojaVinhos/src/components/Footer.astro", void 0);

const $$WhatsAppButton = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(getWhatsAppLink(), "href")} target="_blank" rel="noopener noreferrer" id="wa-fab" class="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 group" aria-label="Falar com a Adega Vista Alegre no WhatsApp"> <span class="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30 group-hover:opacity-50"></span> <span class="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] text-white shadow-[0_10px_40px_-8px_rgba(37,211,102,0.55)] transition-transform duration-300 group-hover:scale-110"> <svg class="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"> <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path> </svg> </span> <span class="sr-only">${site.whatsapp.mensagemPadrao}</span> </a> `;
}, "C:/Projects/LojaVinhos/src/components/WhatsAppButton.astro", void 0);

const $$Astro = createAstro("https://adegavistaalegre.com.br");
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title, description, image, canonical, type, noIndex } = Astro2.props;
  return renderTemplate`<html lang="pt-BR" class="scroll-smooth"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="format-detection" content="telephone=no">${renderComponent($$result, "SEO", $$SEO, { "title": title, "description": description, "image": image, "canonical": canonical, "type": type, "noIndex": noIndex })}${renderHead()}</head> <body class="min-h-screen flex flex-col"> <a href="#conteudo" class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-wine-700 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg">
Pular para o conteúdo
</a> ${renderComponent($$result, "Header", $$Header, {})} <main id="conteudo" class="flex-1"> ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "Footer", $$Footer, {})} ${renderComponent($$result, "WhatsAppButton", $$WhatsAppButton, {})} </body></html>`;
}, "C:/Projects/LojaVinhos/src/layouts/Layout.astro", void 0);

export { $$Layout as $, getProductWhatsAppLink as a, getWhatsAppLink as g, site as s };
