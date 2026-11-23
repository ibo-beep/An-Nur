import type { Config } from 'tailwindcss'

// Farben kommen aus CSS-Variablen (app/assets/css/main.css),
// damit Tag- und Nacht-Design dieselben Klassen nutzen.
const v = (name: string) => `rgb(var(--c-${name}) / <alpha-value>)`

export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: v('bg'),
        surf: v('surf'),
        line: v('line'),
        ink: v('ink'),
        mute: v('mute'),
        gold: v('gold'),
        'gold-soft': v('gold-soft'),
        accent: v('accent'),
        'on-accent': v('on-accent'),
        link: v('link'),
        cur: v('cur')
      },
      fontFamily: {
        head: ['Marcellus', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        arabic: ['Amiri', 'Geeza Pro', 'Noto Naskh Arabic', 'serif']
      }
    }
  }
} satisfies Partial<Config>
