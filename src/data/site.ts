export interface SiteConfig {
  nome: string;
  slogan: string;
  descricao: string;
  descricaoLonga: string;
  url: string;
  keywords: string;
  locale: string;
  author: string;
  publisher: string;
  ogImage: string;
  ogImageAlt: string;
  ogImageType: string;
  ogImageWidth: number;
  ogImageHeight: number;
  whatsapp: {
    numero: string;
    numeroFormatado: string;
    numeroE164: string;
    mensagemPadrao: string;
  };
  email: {
    contato: string;
  };
  redes: {
    instagram: string;
    instagramLabel: string;
    facebook?: string;
  };
  twitterHandle?: string;
  representante: {
    nome: string;
    nomePlaceholder: string;
    foto: string;
    apresentacao: string;
    regiao: string;
    regiaoPlaceholder: string;
    whatsapp: string;
    instagram: string;
    email: string;
  };
  endereco: {
    logradouro: string;
    logradouroPlaceholder: string;
    cidade: string;
    cidadePlaceholder: string;
    estado: string;
    uf: string;
    pais: string;
    cep: string;
    latitude?: number;
    longitude?: number;
  };
  horarioFuncionamento: string[];
  faixaPreco: string;
  areaAtendimento: string;
  categorias: string[];
  emailContatoFormulario: string;
}

export const site: SiteConfig = {
  nome: 'Adega Vista Alegre',
  slogan: 'Qualidade, sabor e boas parcerias em um só lugar.',
  descricao:
    'Adega Vista Alegre em Gramado, RS: vinhos selecionados, bebidas, laticínios, embutidos e cosméticos. Parcerias para guias de turismo, empresas e revendedores de todo o Brasil.',
  descricaoLonga:
    'A Adega Vista Alegre oferece curadoria especial de vinhos nacionais e importados, bebidas premium, laticínios da Serra Gaúcha, embutidos artesanais e cosméticos exclusivos. Atendemos clientes finais, hotéis, restaurantes, guias de turismo, agências e parceiros comerciais em todo o Brasil, com atendimento personalizado e entrega rápida.',
  url: import.meta.env.PUBLIC_SITE_URL || 'https://adegavistaalegre.com.br',
  keywords:
    'adega gramado, vinhos gramado, adega vista alegre, vinhos serra gaucha, bebidas importadas gramado, parceria turismo, revenda vinhos, laticinios gramado, embutidos serra gaucha, cosmeticos vinho, guia turistico gramado, adega rs, vinicultura brasileira, presente corporativo gramado',
  locale: 'pt_BR',
  author: 'Adega Vista Alegre',
  publisher: 'Adega Vista Alegre',
  ogImage: '/og-image.svg',
  ogImageAlt: 'Adega Vista Alegre - Vinhos e Sabores de Gramado, Serra Gaúcha',
  ogImageType: 'image/svg+xml',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  whatsapp: {
    numero: import.meta.env.PUBLIC_WHATSAPP_NUMBER || '5554992022449',
    numeroFormatado: '(54) 99202-2449',
    numeroE164: '+55 54 99202-2449',
    mensagemPadrao:
      'Olá! Acessei o site da Adega Vista Alegre e gostaria de mais informações.'
  },
  email: {
    contato: 'contato@adegavistaalegre.com.br'
  },
  redes: {
    instagram: 'https://instagram.com/adegavistaalegre',
    instagramLabel: '@adegavistaalegre',
    facebook: 'https://facebook.com/adegavistaalegre'
  },
  twitterHandle: '@adegavistaalegre',
  representante: {
    nome: 'Nathalia',
    nomePlaceholder: 'Representante comercial',
    foto: '/img/foto-nathalia.jpeg',
    apresentacao:
      'Atendimento personalizado para clientes, empresas, profissionais do turismo e parceiros interessados nos produtos da Adega Vista Alegre.',
    regiao: 'Atendimento em todo o Brasil',
    regiaoPlaceholder: '',
    whatsapp: '',
    instagram: '',
    email: ''
  },
  endereco: {
    logradouro: 'Av. das Hortênsias, 5485',
    logradouroPlaceholder: 'Av. das Hortênsias, 5485 – Bairro Carniel',
    cidade: 'Gramado',
    cidadePlaceholder: 'Gramado - RS',
    estado: 'Rio Grande do Sul',
    uf: 'RS',
    pais: 'BR',
    cep: '95670-000',
    latitude: -29.3696,
    longitude: -50.8625
  },
  horarioFuncionamento: [
    'Seg-Sex 09:00-19:00',
    'Sáb 09:00-18:00',
    'Dom 10:00-13:00'
  ],
  faixaPreco: '$$',
  areaAtendimento: 'Brasil',
  categorias: [
    'Vinhos',
    'Bebidas',
    'Laticínios',
    'Embutidos',
    'Cosméticos'
  ],
  emailContatoFormulario:
    import.meta.env.CONTACT_EMAIL || 'contato@adegavistaalegre.com.br'
};

export const menuLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Produtos', href: '#produtos' },
  { label: 'Parceiros', href: '#guias' },
  { label: 'Vídeos', href: '#videos' },
  { label: 'Seja um Parceiro', href: '#contato' },
  { label: 'Contato', href: '#rodape' }
];

export const footerLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Produtos', href: '#produtos' },
  { label: 'Parceiros', href: '#guias' },
  { label: 'Vídeos', href: '#videos' },
  { label: 'Contato', href: '#contato' },
  { label: 'Política de Privacidade', href: '/politica-de-privacidade' }
];

export function getWhatsAppLink(message?: string): string {
  const texto = encodeURIComponent(message || site.whatsapp.mensagemPadrao);
  return `https://wa.me/${site.whatsapp.numero}?text=${texto}`;
}

export function getProductWhatsAppLink(categoria: string): string {
  const mensagem = `Olá! Acessei o site da Adega Vista Alegre e gostaria de receber mais informações sobre ${categoria}.`;
  return getWhatsAppLink(mensagem);
}
