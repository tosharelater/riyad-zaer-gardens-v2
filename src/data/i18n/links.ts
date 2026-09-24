export const nav = {
  fr: [
    ['Accueil', '/'],
    ['Le projet', '/le-projet'],
    ['Appartements', '/appartements'],
    ['Fonds de commerce', '/fonds-de-commerce'],
    ['Localisation', '/localisation'],
    ['Contact', '/contact'],
  ],
  ar: [
    ['الرئيسية', '/ar/'],
    ['المشروع', '/ar/le-projet'],
    ['المساكن', '/ar/appartements'],
    ['المحلات التجارية', '/ar/fonds-de-commerce'],
    ['الموقع', '/ar/localisation'],
    ['اتصال', '/ar/contact'],
  ],
} as const;

export const footer = {
  fr: {
    slogan: 'Nouveau pôle urbain à Rabat.',
    about: 'Appartements F3 et F4 et fonds de commerce à Aïn Aouda, à 20 minutes de Rabat.',
    project: 'Le projet',
    info: 'Informations',
    reach: 'Nous joindre',
    wa: 'Écrire sur WhatsApp',
    address: 'Km 25, Avenue Mohammed VI, Rabat — Aïn Aouda',
    projectLinks: [
      ['Le projet', '/le-projet'],
      ['Appartements', '/appartements'],
      ['Fonds de commerce', '/fonds-de-commerce'],
      ['Localisation', '/localisation'],
    ],
    infoLinks: [
      ['Questions fréquentes', '/faq'],
      ['Guides & actualités', '/guides'],
      ['Le promoteur', '/la-manoussa'],
      ['Contact', '/contact'],
    ],
    copy: "© 2026 Riyad Zaer Gardens — by La Manoussa. Tous droits réservés. Projet éligible à l'aide au logement.",
    legal: ['Mentions légales', '/mentions-legales'],
    privacy: ['Confidentialité', '/mentions-legales#confidentialite'],
  },
  ar: {
    slogan: 'قطب حضري جديد بالرباط.',
    about: 'شقق F3 وF4 ومحلات تجارية بعين عودة، على بعد 20 دقيقة من الرباط.',
    project: 'المشروع',
    info: 'معلومات',
    reach: 'اتصلوا بنا',
    wa: 'راسلونا على واتساب',
    address: 'الكيلومتر 25، شارع محمد السادس، الرباط — عين عودة',
    projectLinks: [
      ['المشروع', '/ar/le-projet'],
      ['المساكن', '/ar/appartements'],
      ['المحلات التجارية', '/ar/fonds-de-commerce'],
      ['الموقع', '/ar/localisation'],
    ],
    infoLinks: [
      ['أسئلة شائعة', '/ar/faq'],
      ['أدلة وأخبار', '/ar/guides'],
      ['المطور', '/ar/la-manoussa'],
      ['اتصال', '/ar/contact'],
    ],
    copy: '© 2026 رياض زعير غاردنز — من لا مانوسا. جميع الحقوق محفوظة. مشروع مؤهل لدعم السكن.',
    legal: ['إشعارات قانونية', '/ar/mentions-legales'],
    privacy: ['السرية', '/ar/mentions-legales#confidentialite'],
  },
} as const;

export const switchTo = {
  fr: { label: 'العربية', href: '/ar/' },
  ar: { label: 'FR', href: '/' },
} as const;

export const by = {
  fr: 'by La Manoussa',
  ar: 'من لا مانوسا',
} as const;
