export const ui = {
  fr: {
    allerPlusLoin: 'Aller plus loin',
    decouvrir: 'Découvrir →',
    etreRappele: 'Être rappelé',
    whatsapp: 'Écrire sur WhatsApp',
    appelezNous: 'Appelez-nous',
    aideTitre: "Un projet éligible à l'aide au logement",
    verifierEligibilite: 'Vérifier mon éligibilité',
    ouvrirMenu: 'Ouvrir le menu',
    publieLe: 'Publié le',
    lire: 'Lire →',
  },
  ar: {
    allerPlusLoin: 'لمزيد من المعلومات',
    decouvrir: 'اكتشفوا ←',
    etreRappele: 'نتصل بكم',
    whatsapp: 'راسلونا على واتساب',
    appelezNous: 'اتصلوا بنا',
    aideTitre: 'مشروع مؤهل لدعم السكن',
    verifierEligibilite: 'تحققوا من أهليتكم',
    ouvrirMenu: 'فتح القائمة',
    publieLe: 'نُشر في',
    lire: 'اقرأوا ←',
  },
} as const;

export type UiStrings = (typeof ui)['fr'];
