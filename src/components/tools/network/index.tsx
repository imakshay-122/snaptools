import UrlEncoderDecoder from './UrlEncoderDecoder';

export {
  UrlEncoderDecoder,
};

export const networkTools = [
  {
    name: 'URL Encoder/Decoder',
    description: 'Encode and decode URLs for safe transmission',
    icon: '🔗',
    component: UrlEncoderDecoder,
    category: 'Network Tools',
  },
];