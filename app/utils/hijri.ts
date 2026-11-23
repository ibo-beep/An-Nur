// Hijri-Datum lokal berechnen (Umm-al-Qura-Kalender des Browsers bzw. von Node).
// Kein externer API-Aufruf nötig. Je nach Mondsichtung kann ein Tag Abweichung
// vorkommen; dafür gibt es den Korrektur-Wert (offsetDays).

export const hijriMonthNames = [
  'Muḥarram', 'Ṣafar', 'Rabīʿ al-Awwal', 'Rabīʿ ath-Thānī', 'Jumādā al-Ūlā', 'Jumādā al-Ākhira',
  'Rajab', 'Shaʿbān', 'Ramaḍān', 'Shawwāl', 'Dhū l-Qaʿda', 'Dhū l-Ḥijja'
]

const hijriFormat = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura-nu-latn', {
  day: 'numeric', month: 'numeric', year: 'numeric'
})

export interface HijriDate { day: number; month: number; year: number; monthName: string }

export function toHijri(date: Date, offsetDays = 0): HijriDate {
  // 12 Uhr mittags, damit Zeitzonen den Tag nicht verschieben
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate() + offsetDays, 12)
  const parts = hijriFormat.formatToParts(d)
  const get = (type: string) => parseInt(parts.find(p => p.type === type)?.value ?? '0', 10)
  const month = get('month')
  return { day: get('day'), month, year: get('year'), monthName: hijriMonthNames[month - 1] ?? '' }
}

export function formatHijri(h: HijriDate): string {
  return `${h.day}. ${h.monthName} ${h.year}`
}
