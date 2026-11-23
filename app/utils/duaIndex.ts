// Übersicht aller Texte für Startseite, Suche und Seitentitel.
// Neues Dua: hier eintragen und in pages/[slug].vue den Inhalt verknüpfen.
// "ar" ist der arabische Name (optional), "alt" sind weitere Schreibweisen für die Suche.

export type DuaGroup = 'Duas' | 'Ziyarat' | 'Suren'

export interface DuaEntry {
  id: string
  name: string
  group: DuaGroup
  ar?: string
  alt?: string
}

export const duaGroups: DuaGroup[] = ['Duas', 'Ziyarat', 'Suren']

export const duaIndex: DuaEntry[] = [
  { id: 'kumail', name: 'Dua Kumail', group: 'Duas', ar: 'دعاء كميل', alt: 'kumayl komeil' },
  { id: 'tawassul', name: 'Dua Tawassul', group: 'Duas', ar: 'دعاء التوسل', alt: 'tawasul' },
  { id: 'iftitah', name: 'Dua al-Iftitah', group: 'Duas', ar: 'دعاء الافتتاح', alt: 'eftitah iftitaah' },
  { id: 'ahad', name: 'Dua Ahad', group: 'Duas', ar: 'دعاء العهد', alt: 'ahd' },
  { id: 'jawshan', name: 'Dua Jawshan al-Kabir', group: 'Duas', ar: 'دعاء الجوشن الكبير', alt: 'joshan kabeer' },
  { id: 'abu_hamza', name: 'Dua Abu Hamza al-Thumali', group: 'Duas', ar: 'دعاء أبي حمزة الثمالي', alt: 'somali thumali' },
  { id: 'ya_dhal', name: 'Dua Ya Dhal', group: 'Duas', alt: 'ya zal' },
  { id: 'an_taj´ala', name: 'Dua An Taj´ala', group: 'Duas', alt: 'an tajala' },
  { id: 'hadha_shahr', name: 'Dua Hadha Shahr Ramadan', group: 'Duas', alt: 'haza shahr' },
  { id: 'allahumma', name: 'Dua Allahumma inni amsaytu', group: 'Duas' },
  { id: 'dua_sajjad', name: 'Dua Imam al-Sajjad (a.s.)', group: 'Duas', alt: 'sajad zayn' },
  { id: 'bittgebet_koran', name: 'Das Bittgebet des Quran', group: 'Duas', alt: 'koran quran' },
  { id: 'munajat_taibeen', name: 'Munajat al-Taibeen', group: 'Duas', ar: 'مناجاة التائبين', alt: 'taibin munajaat' },
  { id: 'ashura', name: 'Ziyarat Ashura', group: 'Ziyarat', ar: 'زيارة عاشوراء', alt: 'aschura' },
  { id: 'warith', name: 'Ziyarat Warith', group: 'Ziyarat', ar: 'زيارة وارث', alt: 'waris' },
  { id: 'ziyarat_ale', name: 'Ziyarat Aal-e Yaseen', group: 'Ziyarat', ar: 'زيارة آل يس', alt: 'yasin yasin' },
  { id: 'ziyarat_hussain', name: 'Ziyarat Imam al-Hussain (a.s.) an Qadr', group: 'Ziyarat', alt: 'husain hussein' },
  { id: 'ziyarat_ali', name: 'Ziyarat Imam Ali (a.s.) am 21. Ramadan', group: 'Ziyarat' },
  { id: 'ali_al_akbar', name: 'Ziyarat Ali al-Akbar', group: 'Ziyarat', ar: 'زيارة علي الأكبر' },
  { id: 'shohadaa', name: 'Ziyarat Shohadaa Karbala', group: 'Ziyarat', alt: 'shuhada kerbela' },
  { id: 'abal_fadl', name: 'Ziyarat Abu al-Fadl al-Abbas', group: 'Ziyarat', ar: 'زيارة أبي الفضل العباس', alt: 'abbas abulfazl' },
  { id: 'ziyarat_ameenallah', name: 'Ziyarat Ameenallah', group: 'Ziyarat', ar: 'زيارة أمين الله', alt: 'aminallah aminullah' },
  { id: 'al_ankabut', name: 'Sure al-Ankabut', group: 'Suren', ar: 'سورة العنكبوت', alt: 'ankabut' },
  { id: 'al_room', name: 'Sure ar-Rum', group: 'Suren', ar: 'سورة الروم', alt: 'room rum' },
  { id: 'ad_dukhan', name: 'Sure ad-Dukhan', group: 'Suren', ar: 'سورة الدخان', alt: 'dukhan' },
  { id: 'qadr', name: 'Sure al-Qadr', group: 'Suren', ar: 'سورة القدر', alt: 'qadr kadr' }
]

/** Häufig gelesene Texte, die als Schnellzugriff erscheinen */
export const popularDuaIds = ['kumail', 'tawassul', 'iftitah']

/** Vereinfachter Suchtext: klein, ohne Akzente und Sonderzeichen */
export function normalizeSearch(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9؀-ۿ ]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}
