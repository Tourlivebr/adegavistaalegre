export interface SiteConfig {
  nome: string;
  slogan: string;
  descricao: string;
  url: string;
  whatsapp: {
    numero: string;
    numeroFormatado: string;
    mensagemPadrao: string;
  };
  email: {
    contato: string;
  };
  redes: {
    instagram: string;
    instagramLabel: string;
  };
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
    logradouroPlaceholder: string;
    cidadePlaceholder: string;
  };
  emailContatoFormulario: string;
}

export const site: SiteConfig = {
  nome: 'Adega Vista Alegre',
  slogan: 'Qualidade, sabor e boas parcerias em um só lugar.',
  descricao:
    'Conheça a Adega Vista Alegre, seus produtos e oportunidades de parceria para empresas, guias de turismo e divulgadores.',
  url: import.meta.env.PUBLIC_SITE_URL || 'https://adegavistaalegre.com.br',
  whatsapp: {
    numero: import.meta.env.PUBLIC_WHATSAPP_NUMBER || '555554992022449',
    numeroFormatado: '(54) 99202-2449',
    mensagemPadrao:
      'Olá! Acessei o site da Adega Vista Alegre e gostaria de mais informações.'
  },
  email: {
    contato: 'contato@adegavistaalegre.com.br'
  },
  redes: {
    instagram: 'https://instagram.com/adegavistaalegre',
    instagramLabel: '@adegavistaalegre'
  },
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
    logradouroPlaceholder: '[Informe o endereço]',
    cidadePlaceholder: '[Cidade - UF]'
  },
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
