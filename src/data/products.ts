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
    imagem:
      'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Elegant%20wine%20bottles%20with%20glasses%20on%20wooden%20table%20in%20soft%20natural%20light%2C%20premium%20winery%20photography%2C%20warm%20tones&image_size=square_hd',
    imagemAlt: 'Garrafas de vinhos selecionados da Adega Vista Alegre'
  },
  {
    slug: 'bebidas',
    nome: 'Bebidas',
    descricao:
      'Variedade de bebidas destiladas, espumantes, cervejas especiais e sucos premium para compor seu cardápio.',
    imagem:
      'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Premium%20selection%20of%20spirits%20and%20drinks%20bottles%20elegantly%20arranged%20on%20white%20marble%2C%20soft%20studio%20lighting&image_size=square_hd',
    imagemAlt: 'Seleção premium de bebidas da Adega Vista Alegre'
  },
  {
    slug: 'laticinios',
    nome: 'Laticínios',
    descricao:
      'Queijos artesanais, manteigas, iogurtes e produtos lácteos de qualidade superior de produtores selecionados.',
    imagem:
      'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Artisan%20cheese%20board%20with%20different%20premium%20cheeses%20grapes%20and%20honey%20on%20wooden%20surface%2C%20gourmet%20photography&image_size=square_hd',
    imagemAlt: 'Queijos e laticínios artesanais premium'
  },
  {
    slug: 'embutidos',
    nome: 'Embutidos',
    descricao:
      'Salames, presuntos, linguiças e produtos de charcutaria artesanal, ideal para tábuas de frios e eventos.',
    imagem:
      'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Premium%20charcuterie%20board%20with%20cured%20meats%20salami%20prosciutto%20arranged%20elegantly%2C%20gourmet%20food%20photography&image_size=square_hd',
    imagemAlt: 'Charcutaria e embutidos artesanais selecionados'
  },
  {
    slug: 'cosmeticos',
    nome: 'Cosméticos',
    descricao:
      'Linha de cosméticos e produtos de beleza com ingredientes naturais, elegância e sofisticação para presente e uso pessoal.',
    imagem:
      'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Elegant%20cosmetics%20and%20skincare%20products%20with%20botanical%20ingredients%20on%20cream%20background%2C%20luxury%20beauty%20photography&image_size=square_hd',
    imagemAlt: 'Cosméticos e produtos de beleza premium'
  }
];
