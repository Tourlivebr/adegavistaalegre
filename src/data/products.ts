export interface CategoriaProduto {
  slug: string;
  nome: string;
  descricao: string;
  imagem: string;
  imagemAlt: string;
  destaques?: string[];
}

export const categoriasProdutos: CategoriaProduto[] = [
  {
    slug: 'vinhos',
    nome: 'Vinhos',
    descricao:
      'Seleção criteriosa de vinhos nacionais e importados, de diferentes regiões e safras para ocasiões especiais.',
    imagem: '/img/vinhos.jpeg',
    imagemAlt: 'Garrafas de vinhos selecionados da Adega Vista Alegre'
  },
  {
    slug: 'bebidas',
    nome: 'Bebidas',
    descricao:
      'Variedade de bebidas destiladas, espumantes, cervejas especiais e sucos premium para compor seu cardápio.',
    imagem: '/img/bebidas.jpeg',
    imagemAlt: 'Seleção premium de bebidas da Adega Vista Alegre'
  },
  {
    slug: 'laticinios',
    nome: 'Laticínios',
    descricao:
      'Queijos artesanais, manteigas, iogurtes e produtos lácteos de qualidade superior de produtores selecionados.',
    imagem: '/img/laticinios.jpeg',
    imagemAlt: 'Queijos e laticínios artesanais premium'
  },
  {
    slug: 'embutidos',
    nome: 'Embutidos',
    descricao:
      'Salames, presuntos, linguiças e produtos de charcutaria artesanal, ideal para tábuas de frios e eventos.',
    imagem: '/img/embutidos.jpeg',
    imagemAlt: 'Charcutaria e embutidos artesanais selecionados'
  },
  {
    slug: 'cosmeticos',
    nome: 'Cosméticos',
    descricao:
      'Linha de cosméticos e produtos de beleza com ingredientes naturais, elegância e sofisticação para presente e uso pessoal.',
    imagem: '/img/cosmeticos.jpeg',
    imagemAlt: 'Cosméticos e produtos de beleza premium'
  }
];
