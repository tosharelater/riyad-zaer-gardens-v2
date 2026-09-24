export const contact = {
  fr: {
    meta: {
      title: 'Contact — Riyad Zaer Gardens, Aïn Aouda',
      description: 'Contactez Riyad Zaer Gardens à Aïn Aouda : demande de brochure, prix, visite du site. Un conseiller vous rappelle. Tél. 07 08 08 08 39.',
    },
    hero: {
      eyebrow: 'Contact',
      h1: 'Contacter Riyad Zaer Gardens',
      p: 'Une question sur les typologies, les prix ou l’aide au logement ? Laissez-nous vos coordonnées : un conseiller vous rappelle et vous transmet la brochure du projet.',
    },
    form: {
      eyebrow: 'Être rappelé',
      h2: 'Laissez-nous vos coordonnées',
    },
    joindre: {
      eyebrow: 'Nous joindre directement',
      h2: 'Autres moyens de contact',
      tel: 'Par téléphone',
      wa: 'Sur WhatsApp',
      lieu: 'Sur place',
    },
    visiter: {
      h2: 'Visiter le site du projet',
      p: 'Nous organisons des visites sur le terrain pour situer les immeubles, les espaces verts et les commerces. Indiquez vos disponibilités dans le formulaire, nous convenons d’un créneau avec vous.',
    },
    questions: {
      h2: 'Vous vous posez encore des questions ?',
      p: 'Les réponses aux questions les plus courantes sur les prix, l’aide au logement et la livraison sont regroupées sur une page dédiée.',
      lien: 'Consulter la FAQ →',
    },
  },
  ar: {
    meta: {
      title: 'اتصال — رياض زعير غاردنز، عين عودة',
      description: 'اتصلوا برياض زعير غاردنز بعين عودة: طلب الكتيب، الأسعار، زيارة الموقع. يعاود مستشار الاتصال بكم. الهاتف 07 08 08 08 39.',
    },
    hero: {
      eyebrow: 'اتصال',
      h1: 'اتصلوا برياض زعير غاردنز',
      p: 'سؤال حول الأنواع أو الأسعار أو دعم السكن؟ اتركوا لنا بياناتكم: يعاود مستشار الاتصال بكم ويرسل لكم كتيب المشروع.',
    },
    form: {
      eyebrow: 'نتصل بكم',
      h2: 'اتركوا لنا بياناتكم',
    },
    joindre: {
      eyebrow: 'للتواصل المباشر',
      h2: 'وسائل اتصال أخرى',
      tel: 'عبر الهاتف',
      wa: 'على واتساب',
      lieu: 'في المكان',
    },
    visiter: {
      h2: 'زيارة موقع المشروع',
      p: 'ننظم زيارات ميدانية لتحديد موقع العمارات والمساحات الخضراء والمحلات. ذكروا أوقاتكم المتاحة في النموذج، وسنتفق معكم على موعد.',
    },
    questions: {
      h2: 'لا تزال لديكم أسئلة؟',
      p: 'الإجابات عن الأسئلة الأكثر تداولاً حول الأسعار ودعم السكن والتسليم مجمعة في صفحة مخصصة.',
      lien: 'الأسئلة الشائعة ←',
    },
  },
} as const;

export type ContactStrings = (typeof contact)['fr'];
