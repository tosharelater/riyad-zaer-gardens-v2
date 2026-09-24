export const site = {
  name: 'Riyad Zaer Gardens',
  promoter: 'La Manoussa',
  architect: 'Mabani Architects',
  slogan: 'Nouveau pôle urbain à Rabat',
  phone: '07 08 08 08 39',
  phoneTel: '+212708080839',
  whatsapp: 'https://wa.me/212708080839',
  domain: 'riyadzaergardens.com',
  address: 'Km 25, Avenue Mohammed VI, Rabat',
  location: 'Aïn Aouda',
  distance: 'à 20 minutes de Rabat',
  priceFrom: '420 000 DH',
  priceWithAid: '350 000 DH',
  commercePrice: '15 000 DH le m²',
  apartments: 120,
  commercial: 49,
  buildings: 9,
  surfaceRange: 'de 65 à 86 m²',
  commerceSurface: 'de 13 à 30 m²',
  delivery: 'septembre 2028',
} as const;

export const nav = [
  { label: 'Accueil', href: '/' },
  { label: 'Le projet', href: '/le-projet' },
  { label: 'Appartements', href: '/appartements' },
  { label: 'Fonds de commerce', href: '/fonds-de-commerce' },
  { label: 'Localisation', href: '/localisation' },
  { label: 'Contact', href: '/contact' },
] as const;

export const footerProject = [
  { label: 'Le projet', href: '/le-projet' },
  { label: 'Appartements', href: '/appartements' },
  { label: 'Fonds de commerce', href: '/fonds-de-commerce' },
  { label: 'Localisation', href: '/localisation' },
] as const;

export const footerInfo = [
  { label: 'Questions fréquentes', href: '/faq' },
  { label: 'Guides & actualités', href: '/guides' },
  { label: 'Le promoteur', href: '/la-manoussa' },
  { label: 'Contact', href: '/contact' },
] as const;

export const contactInterests = [
  'Appartement F3',
  'Appartement F4',
  'Fonds de commerce',
  'Investissement locatif',
  "Je me renseigne depuis l'étranger",
] as const;
