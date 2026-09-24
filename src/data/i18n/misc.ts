export const misc = {
  fr: {
    merci: {
      meta: {
        title: 'Merci pour votre demande — Riyad Zaer Gardens',
        description: 'Votre demande a bien été envoyée. Un conseiller Riyad Zaer Gardens vous rappelle prochainement.',
      },
      eyebrow: 'Demande envoyée',
      h1: 'Merci, votre demande est bien enregistrée',
      p1: 'Un conseiller vous rappelle au plus vite pour répondre à vos questions et vous transmettre la brochure du projet.',
      p2: 'Vous préférez ne pas attendre ? Appelez-nous directement au {phone}.',
      call: 'Appeler maintenant',
      project: 'Découvrir le projet',
    },
    notFound: {
      title: "Page introuvable — Riyad Zaer Gardens",
      h1: "Cette page n'existe pas",
      p: 'Le lien que vous avez suivi ne mène nulle part. Revenez à l’accueil ou découvrez directement les appartements disponibles.',
      home: "Retour à l'accueil",
      homes: 'Voir les appartements',
    },
    guides: {
      meta: {
        title: 'Guides & actualités — Riyad Zaer Gardens',
        description: 'Nos guides pour acheter à Aïn Aouda : aide au logement, choix entre F3 et F4, investissement locatif près de Rabat. Conseils clairs et à jour.',
      },
      eyebrow: 'Guides & actualités',
      h1: 'Guides & actualités',
      p: 'Des repères simples pour préparer votre achat à Aïn Aouda : comprendre l’aide au logement, choisir entre un F3 et un F4, ou évaluer un investissement locatif près de Rabat.',
    },
    guide: {
      published: 'Publié le {date}',
    },
  },
  ar: {
    merci: {
      meta: {
        title: 'شكراً على طلبكم — رياض زعير غاردنز',
        description: 'أُرسل طلبكم بنجاح. سيعاود مستشار رياض زعير غاردنز الاتصال بكم قريباً.',
      },
      eyebrow: 'أُرسل الطلب',
      h1: 'شكراً، سُجل طلبكم بنجاح',
      p1: 'يعاود مستشار الاتصال بكم في أقرب وقت للإجابة عن أسئلتكم وإرسال كتيب المشروع.',
      p2: 'تفضلون عدم الانتظار؟ اتصلوا بنا مباشرة على {phone}.',
      call: 'اتصلوا الآن',
      project: 'اكتشفوا المشروع',
    },
    notFound: {
      title: 'الصفحة غير موجودة — رياض زعير غاردنز',
      h1: 'هذه الصفحة غير موجودة',
      p: 'الرابط الذي تتبعتموه لا يقود إلى أي مكان. عودوا إلى الرئيسية أو اكتشفوا مباشرة الشقق المتوفرة.',
      home: 'العودة إلى الرئيسية',
      homes: 'شاهدوا المساكن',
    },
    guides: {
      meta: {
        title: 'أدلة وأخبار — رياض زعير غاردنز',
        description: 'أدلتنا للشراء بعين عودة: دعم السكن، الاختيار بين F3 وF4، الاستثمار العقاري قرب الرباط. نصائح واضحة ومحينة.',
      },
      eyebrow: 'أدلة وأخبار',
      h1: 'أدلة وأخبار',
      p: 'معالم بسيطة للتحضير لشرائكم بعين عودة: فهم دعم السكن، الاختيار بين F3 وF4، أو تقييم استثمار للكراء قرب الرباط.',
    },
    guide: {
      published: 'نُشر في {date}',
    },
  },
} as const;

export type MiscStrings = (typeof misc)['fr'];

export const guides = {
  fr: [
    {
      slug: 'aide-au-logement-maroc',
      title: "L'aide au logement au Maroc : comment ça marche",
      date: '2026-01-15',
      excerpt: "Comprendre le programme d'aide au logement de l'État et savoir si vous pouvez en bénéficier.",
      body: [
        "Le programme d'aide au logement de l'État marocain vise à faciliter l'accès à la propriété pour les ménages qui achètent un premier logement. Concrètement, il prend la forme d'une contribution qui vient réduire le prix d'achat d'un appartement neuf, sous certaines conditions.",
        "L'éligibilité dépend de la situation personnelle de l'acquéreur : il s'agit notamment d'un achat pour une résidence principale, dans le cadre d'un premier accès à la propriété. Les conditions précises et les critères officiels sont vérifiés au cas par cas par nos conseillers, car ils dépendent de chaque dossier.",
        "Ce que cela change concrètement, c'est le prix d'entrée. Sur un projet comme Riyad Zaer Gardens, un appartement qui démarre à 420 000 DH peut, pour un acquéreur éligible, être proposé à partir de 350 000 DH. C'est une différence qui rend l'accession à la propriété plus accessible pour de nombreux ménages.",
        "Les démarches se font en général en parallèle du processus d'achat : le conseiller commercial vérifie votre éligibilité, vous accompagne dans la constitution du dossier, et le notaire intègre les éléments du dispositif au moment de la signature.",
        "Riyad Zaer Gardens a été conçu dès l'origine pour répondre aux conditions du programme : les surfaces et les prix des appartements F3 et F4 s'inscrivent dans les plafonds prévus par le dispositif.",
        'Vous souhaitez savoir si vous êtes éligible ? Contactez-nous, nos conseillers étudient votre situation gratuitement et sans engagement.',
      ],
      link: { href: '/contact', label: 'Vérifier mon éligibilité' },
    },
    {
      slug: 'f3-ou-f4-comment-choisir',
      title: 'F3 ou F4 : comment choisir son appartement',
      date: '2026-01-22',
      excerpt: 'Comprendre la différence entre un F3 et un F4, et savoir lequel correspond à votre projet.',
      body: [
        "F3 et F4 sont des désignations courantes dans l'immobilier marocain : le chiffre indique le nombre de pièces principales, hors cuisine et salle de bain. Un F3 comprend un séjour et deux chambres ; un F4 comprend un séjour et trois chambres.",
        "Dans la pratique, un F3 se situe le plus souvent entre 65 et 75 m², avec une cuisine, une salle de bain, et selon les projets un balcon ou une terrasse. Un F4 offre une pièce supplémentaire et une surface généralement comprise entre 75 et 90 m², avec parfois un WC séparé en plus de la salle de bain.",
        "Le F3 convient bien à un couple, une petite famille avec un enfant, ou un investisseur qui vise la location : la surface reste facile à louer et à entretenir, pour un budget d'entrée plus accessible.",
        "Le F4 s'adresse plutôt aux familles avec plusieurs enfants, ou à ceux qui veulent une chambre supplémentaire pour un bureau ou des invités. Le budget est un peu plus élevé, mais la surface additionnelle se traduit aussi par un loyer ou une valeur de revente plus importants.",
        "Un critère souvent oublié : pensez à la revente et à la location futures. Dans certains quartiers, les F3 se louent plus vite grâce à une demande plus large ; dans d'autres, les familles recherchent en priorité des F4. Se renseigner sur la demande locale reste utile avant de trancher.",
        "À Riyad Zaer Gardens, les deux typologies sont proposées, de 65 à 86 m², avec les mêmes finitions et les mêmes équipements de résidence. Le choix dépend surtout de votre usage : y vivre, y investir, ou y revenir régulièrement.",
      ],
      link: { href: '/appartements', label: 'Voir les appartements' },
    },
    {
      slug: 'acheter-a-ain-aouda',
      title: "Acheter à Aïn Aouda : ce qu'il faut savoir",
      date: '2026-02-03',
      excerpt: 'Un point complet sur la zone avant de vous décider : distance, développement, cadre de vie et accès.',
      body: [
        "Aïn Aouda se situe à environ 20 minutes de Rabat, sur l'Avenue Mohammed VI. C'est une zone qui a longtemps été considérée comme périphérique, mais qui connaît depuis plusieurs années un développement rapide, porté par de nouveaux programmes résidentiels et commerciaux.",
        "Ce développement s'explique par la pression immobilière sur Rabat et Témara, qui pousse de nombreux ménages à chercher des logements neufs à un prix plus accessible, sans s'éloigner excessivement de la capitale.",
        "Le cadre de vie y reste, pour l'instant, plus calme et plus vert qu'en ville : les terrains sont plus grands, les projets intègrent des espaces extérieurs plantés, et la densité reste inférieure à celle des quartiers centraux de Rabat.",
        "Côté accès, la zone est reliée directement à l'autoroute et aux axes qui desservent Rabat, Témara et Salé. Le trajet vers le centre de Rabat prend environ 20 minutes par la route, sans traversée de centre-ville dense.",
        "Avant d'acheter dans une zone en développement, quelques points méritent votre attention : le calendrier réel des équipements publics à proximité, la qualité de gestion prévue pour la résidence, et le sérieux du promoteur sur ses précédentes livraisons.",
        "Riyad Zaer Gardens s'inscrit dans cette dynamique : un projet neuf, avec une gestion professionnelle prévue dès la livraison, à proximité de commerces et de services déjà installés dans le quartier.",
      ],
      link: { href: '/localisation', label: 'Voir la localisation' },
    },
    {
      slug: 'investir-neuf-pres-de-rabat',
      title: "Investir dans l'immobilier neuf près de Rabat",
      date: '2026-02-14',
      excerpt: "Ce qu'il faut regarder avant d'investir dans un logement ou un local commercial en périphérie de Rabat.",
      body: [
        "Les zones périphériques comme Aïn Aouda attirent de plus en plus d'investisseurs, pour une raison simple : le ticket d'entrée reste plus accessible qu'à Rabat ou Témara, alors que la demande locative progresse avec l'arrivée de nouveaux habitants.",
        "Investir dans un logement ou dans un local commercial répond à deux logiques différentes. Le logement vise une demande locative résidentielle, plus stable et plus large. Le local commercial vise des professionnels ou des commerçants, avec un potentiel de loyer parfois plus élevé, mais une demande plus dépendante de l'emplacement précis.",
        "Avant d'investir, quelques éléments méritent d'être regardés de près : la visibilité et l'accessibilité de l'emplacement, le nombre de logements livrés à proximité immédiate, le sérieux de la gestion prévue pour la résidence, et bien sûr le prix d'achat rapporté à la surface.",
        "Les points de vigilance sont les mêmes que pour tout achat dans une zone en développement : vérifier le calendrier de livraison, la solidité du promoteur, et ne pas se fier uniquement aux plans commerciaux sans visiter le site.",
        "Riyad Zaer Gardens propose les deux profils d'investissement : des appartements F3 et F4 pour la location résidentielle, et 49 fonds de commerce en rez-de-chaussée pour un usage commercial, au sein d'une même résidence organisée autour d'une cour plantée.",
        "Que vous visiez un logement ou un local, nos conseillers peuvent vous présenter les disponibilités actuelles et les conditions de réservation.",
      ],
      link: { href: '/appartements', label: 'Voir les appartements' },
    },
  ],
  ar: [
    {
      slug: 'aide-au-logement-maroc',
      title: 'دعم السكن في المغرب: كيف يعمل',
      date: '2026-01-15',
      excerpt: 'افهموا برنامج دعم السكن الحكومي واعرفوا إن كنتم يمكنكم الاستفادة منه.',
      body: [
        'يهدف برنامج دعم السكن الحكومي المغربي إلى تسهيل الولوج إلى التملك للأسر التي تشتري مسكناً أول. عملياً، يتخذ شكل مساهمة تخفض ثمن شراء شقة جديدة، في إطار شروط معينة.',
        'تتوقف الأهلية على الوضعية الشخصية للمشتري: يتعلق الأمر خصوصاً بشراء لسكن رئيسي، في إطار أول ولوج للتملك. تتحقق مستشارونا من الشروط الدقيقة والمعايير الرسمية حالة بحالة، لأنها تتوقف على كل ملف.',
        'ما يغيره هذا عملياً هو ثمن الدخول. في مشروع مثل رياض زعير غاردنز، شقة تبدأ من 420 000 درهم يمكن، للمشتري المؤهل، أن تُعرض ابتداءً من 350 000 درهم. فرق يجعل التملك أكثر تناولاً للعديد من الأسر.',
        'تتم الإجراءات عموماً بالتوازي مع عملية الشراء: يتحقق المستشار التجاري من أهليتكم، ويرافقكم في تكوين الملف، ويضم الموثق عناصر النظام عند التوقيع.',
        'صُمم رياض زعير غاردنز منذ البداية لتلبية شروط البرنامج: مساحات وأسعار شقق F3 وF4 تندرج ضمن السقوف المتوفرة في النظام.',
        'تريدون معرفة إن كنتم مؤهلين؟ اتصلوا بنا، يدرس مستشارونا وضعيتكم مجاناً ودون التزام.',
      ],
      link: { href: '/ar/contact', label: 'تحققوا من أهليتكم' },
    },
    {
      slug: 'f3-ou-f4-comment-choisir',
      title: 'F3 أو F4: كيف تختارون شقتكم',
      date: '2026-01-22',
      excerpt: 'افهموا الفرق بين F3 وF4، واعرفوا أيهما يناسب مشروعكم.',
      body: [
        'F3 وF4 تسميات شائعة في العقار المغربي: الرقم يدل على عدد الغرف الرئيسية، غير المطبخ والحمام. تضم F3 صالوناً وغرفتين؛ وتضم F4 صالوناً وثلاث غرف.',
        'عملياً، تندرج F3 غالباً بين 65 و75 م²، مع مطبخ وحمام، وحسب المشاريع شرفة أو تراس. تقدم F4 غرفة إضافية ومساحة تتراوح عادة بين 75 و90 م²، مع أحياناً مرحاض منفصل إضافة إلى الحمام.',
        'تناسب F3 الزوجين أو الأسرة الصغيرة بطفل، أو المستثمر الذي يستهدف الكراء: تبقى المساحة سهلة التكرين والصيانة، بميزانية دخول أكثر تناولاً.',
        'توجه F4 بالأسرة لذوي الأطفال المتعددين، أو لمن يريدون غرفة إضافية لمكتب أو للضيوف. الميزانية أعلى قليلاً، لكن المساحة الإضافية تنعكس أيضاً على كراء أعلى أو قيمة إعادة بيع أهم.',
        'معيار يُنسى غالباً: فكروا في إعادة البيع والكراء مستقبلاً. في بعض الأحياء، تُكرى F3 أسرع بفضل طلب أوسع؛ وفي غيرها، تبحث الأسر بالأساس عن F4. الاستفسار عن الطلب المحلي يبقى مفيداً قبل الحسم.',
        'في رياض زعير غاردنز، النوعان معروضان، من 65 إلى 86 م²، بنفس التشطيبات ونفس تجهيزات الإقامة. يتوقف الاختيار بالأساس على استعمالكم: للسكن، للاستثمار، أو للعودة بانتظام.',
      ],
      link: { href: '/ar/appartements', label: 'شاهدوا المساكن' },
    },
    {
      slug: 'acheter-a-ain-aouda',
      title: 'الشراء بعين عودة: ما يجب معرفته',
      date: '2026-02-03',
      excerpt: 'نظرة شاملة على المنطقة قبل الحسم: المسافة، التطور، إطار العيش والولوج.',
      body: [
        'تقع عين عودة على بعد حوالي 20 دقيقة من الرباط، على شارع محمد السادس. منطقة اعتُبرت منذ زمن طويل طرفية، لكنها تعرف منذ عدة سنوات تطوراً سريعاً، تقوده برامج سكنية وتجارية جديدة.',
        'يفسر هذا التطور بالضغط العقاري على الرباط وتمارة، الذي يدفع العديد من الأسر للبحث عن مساكن جديدة بسعر أكثر تناولاً، دون ابتعاد مفرط عن العاصمة.',
        'يبقى إطار العيش، إلى الآن، أهدأ وأخضر من المدينة: الأراضي أوسع، والمشاريع تدمج فضاءات خارجية مغروسة، وتبقى الكثافة أقل منها في أحياء وسط الرباط.',
        'في جانب الولوج، ترتبط المنطقة مباشرة بالطريق السيار والمحاور التي تخدم الرباط وتمارة وسلا. يستغرق الطريق إلى وسط الرباط حوالي 20 دقيقة براً، دون عبور وسط مدينة مزدحم.',
        'قبل الشراء في منطقة في طور التطور، تستحق بعض النقاط انتباهكم: الجدول الزمني الحقيقي للتجهيزات العمومية القريبة، جودة التدبير المتوقعة للإقامة، وجدية المطور في تسليماته السابقة.',
        'يدرج رياض زعير غاردنز نفسه في هذا الديناميك: مشروع جديد، بتدبير محترف متوقع منذ التسليم، على مقربة من محلات وخدمات مثبتة منذ الآن في الحي.',
      ],
      link: { href: '/ar/localisation', label: 'شاهدوا الموقع' },
    },
    {
      slug: 'investir-neuf-pres-de-rabat',
      title: 'الاستثمار في العقار الجديد قرب الرباط',
      date: '2026-02-14',
      excerpt: 'ما يجب مراقبته قبل الاستثمار في مسكن أو محل تجاري في محيط الرباط.',
      body: [
        'تجذب المناطق الطرفية مثل عين عودة عدداً متزايداً من المستثمرين، لسبب بسيط: يبقى ثمن الدخول أكثر تناولاً منه في الرباط أو تمارة، بينما يتقدم الطلب على الكراء مع وصول سكان جدد.',
        'الاستثمار في مسكن أو في محل تجاري يجيب عن منطقين مختلفين. يستهدف المسكن طلب كراء سكنياً، أكثر استقراراً واتساعاً. يستهدف المحل التجاري المهنيين والتجار، بإمكان كراء أعلى أحياناً، لكن بطلب أكثر ارتباطاً بالموقع الدقيق.',
        'قبل الاستثمار، تستحق بعض العناصر النظر عن قرب: ظهور الموقع وسهولة الولوج إليه، عدد المساكن المسلَّمة في المحيط المباشر، جدية التدبير المتوقع للإقامة، وبالطبع ثمن الشراء مقارنة بالمساحة.',
        'نقاط اليقظة هي نفسها لأي شراء في منطقة في طور التطور: التحقق من جدول التسليم، وصلابة المطور، وعدم الاكتفاء بالتصاميم التجارية دون زيارة الموقع.',
        'يقدم رياض زعير غاردنز ملفي الاستثمار معاً: شقق F3 وF4 للكراء السكني، و49 محلاً تجارياً في الطابق الأرضي للاستعمال التجاري، في إقامة واحدة منتظمة حول فناء مغروس.',
        'سواء استهدفتم مسكناً أو محلاً، يمكن لمستشارينا عرض المتوفر حالياً وشروط الحجز عليكم.',
      ],
      link: { href: '/ar/appartements', label: 'شاهدوا المساكن' },
    },
  ],
} as const;

export type Guide = (typeof guides)['fr'][number];
