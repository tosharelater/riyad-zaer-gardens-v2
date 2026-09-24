export const manoussa = {
  fr: {
    meta: {
      title: 'La Manoussa, promoteur de Riyad Zaer Gardens',
      description: 'La Manoussa est le promoteur de Riyad Zaer Gardens à Aïn Aouda : 9 immeubles, 120 appartements et 49 commerces, livraison prévue en 2028.',
    },
    hero: {
      eyebrow: 'Le promoteur',
      h1: '{promoter}, promoteur de Riyad Zaer Gardens',
      p: 'Riyad Zaer Gardens est développé par {promoter}, promoteur immobilier actif dans la région de Rabat. La conception architecturale du projet est signée <strong class="text-cream">{architect}</strong>.',
    },
    approche: {
      eyebrow: 'Notre approche',
      h2: 'Une approche factuelle',
      p: 'Ce qui rassure un acheteur, ce sont les projets livrés et les délais tenus. {promoter} conçoit chaque programme avec cette exigence : un emplacement choisi avec soin, une construction suivie de près, et une relation directe avec ses clients tout au long du projet.',
    },
    projets: {
      eyebrow: 'Nos projets',
      h2: 'Nos projets',
      cardTitle: 'Riyad Zaer Gardens',
      cardText: '{buildings} immeubles, {apartments} appartements et {commercial} fonds de commerce à {location}, sur l’Avenue Mohammed VI. Livraison prévue en {delivery}.',
    },
    cta: {
      title: 'Une question sur le projet ?',
      text: "Notre équipe commerciale répond à vos questions et vous accompagne dans votre projet d'achat.",
    },
  },
  ar: {
    meta: {
      title: 'لا مانوسا، مطور رياض زعير غاردنز',
      description: 'لا مانوسا هي مطور رياض زعير غاردنز بعين عودة: 9 عمارات، 120 شقة و49 محلاً تجارياً، التسليم المتوقع في 2028.',
    },
    hero: {
      eyebrow: 'المطور',
      h1: '{promoter}، مطور رياض زعير غاردنز',
      p: 'يطور رياض زعير غاردنز {promoter}، مطور عقاري نشيط في جهة الرباط. التصميم المعماري للمشروع من توقيع <strong class="text-cream">{architect}</strong>.',
    },
    approche: {
      eyebrow: 'منهجنا',
      h2: 'منهج قائم على الواقع',
      p: 'ما يطمئن المشتري هو المشاريع المسلَّمة والمواعيد المحترمة. يصمم {promoter} كل برنامج بهذا الالتزام: موقع مختار بعناية، وبناء متتبَّع عن قرب، وعلاقة مباشرة مع زبنائه طوال المشروع.',
    },
    projets: {
      eyebrow: 'مشاريعنا',
      h2: 'مشاريعنا',
      cardTitle: 'رياض زعير غاردنز',
      cardText: '{buildings} عمارات، {apartments} شقة و{commercial} محلاً تجارياً بـ{location}، على شارع محمد السادس. التسليم المتوقع في {delivery}.',
    },
    cta: {
      title: 'سؤال حول المشروع؟',
      text: 'يجيبكم فريقنا التجاري عن أسئلتكم ويرافقكم في مشروع شرائكم.',
    },
  },
} as const;

export type ManoussaStrings = (typeof manoussa)['fr'];
