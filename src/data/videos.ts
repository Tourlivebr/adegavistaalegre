export interface Video {
  id: string;
  titulo: string;
  descricao: string;
  thumbnail: string;
  url: string;
  tipo: 'youtube' | 'vimeo' | 'self';
}

export const videos: Video[] = [
  {
    id: '1',
    titulo: 'Conheça a Adega Vista Alegre',
    descricao:
      'Apresentação institucional da Adega Vista Alegre, nossa história, estrutura e compromisso com a qualidade.',
    thumbnail:
      'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Elegant%20winery%20interior%20with%20wine%20barrels%20bottles%20on%20wooden%20shelves%2C%20warm%20lighting%2C%20premium%20photography&image_size=landscape_16_9',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    tipo: 'youtube'
  },
  {
    id: '2',
    titulo: 'Nossos Produtos Selecionados',
    descricao:
      'Um passeio pelos principais produtos comercializados pela Adega Vista Alegre: vinhos, laticínios, embutidos e mais.',
    thumbnail:
      'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Gourmet%20cheese%20and%20wine%20tasting%20experience%2C%20elegant%20table%20setting%20with%20premium%20products%2C%20soft%20natural%20light&image_size=landscape_16_9',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    tipo: 'youtube'
  },
  {
    id: '3',
    titulo: 'Parcerias e Oportunidades Comerciais',
    descricao:
      'Conheça as oportunidades de parceria com a Adega Vista Alegre para guias de turismo, divulgadores e empresas.',
    thumbnail:
      'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Business%20handshake%20in%20elegant%20wine%20cellar%20background%2C%20commercial%20partnership%20meeting%2C%20professional%20photography&image_size=landscape_16_9',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    tipo: 'youtube'
  }
];

export function extractVideoId(url: string, tipo: Video['tipo']): string {
  if (tipo === 'youtube') {
    const padroes = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
    ];
    for (const regex of padroes) {
      const match = url.match(regex);
      if (match) return match[1];
    }
  }
  if (tipo === 'vimeo') {
    const match = url.match(/vimeo\.com\/(\d+)/);
    if (match) return match[1];
  }
  return '';
}
