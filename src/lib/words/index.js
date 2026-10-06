import { SR } from './sr.js'
import { EN } from './en.js'
import { FR } from './fr.js'
import { ES } from './es.js'
import { VI } from './vi.js'

// What a guess is made of, per language: accents are dropped, but letters that really are different letters are kept.
//  fr, en: plain a-z.  es: a-z plus ñ.  vi: tone marks dropped, ă â ê ô ơ ư đ kept.  sr: č ć š ž đ kept.
const TONES = new Set(['̀', '́', '̃', '̉', '̣'])
export function lettersOf(lang, shown) {
  const up = shown.normalize('NFC').toUpperCase()
  if (lang === 'en' || lang === 'sr') return up
  const out = [...up.normalize('NFD')].filter((c, i, a) => {
    if (c < '̀' || c > 'ͯ') return true
    if (lang === 'vi') return !TONES.has(c)
    if (lang === 'es' && c === '̃' && a[i - 1] === 'N') return true // keep ñ
    return false
  })
  return out.join('').normalize('NFC')
}

const build = (lang, rows, map) => rows.map((r, i) => ({ id: i + 1, lang, ...map(r) }))

export const PUZZLES = {
  sr: build('sr', SR, ([word, pron, meaning, ex, enMeaning, enEx]) => ({ word, shown: word, pron, meaning, ex, extra: { meaning: enMeaning, ex: enEx } })),
  en: build('en', EN, ([shown, meaning, ex]) => ({ word: lettersOf('en', shown), shown, meaning, ex })),
  fr: build('fr', FR, ([shown, meaning, ex]) => ({ word: lettersOf('fr', shown), shown, meaning, ex })),
  es: build('es', ES, ([shown, meaning, ex]) => ({ word: lettersOf('es', shown), shown, meaning, ex })),
  vi: build('vi', VI, ([shown, meaning, ex]) => ({ word: lettersOf('vi', shown), shown, meaning, ex })),
}

export const puzzlesFor = (lang) => PUZZLES[lang] || PUZZLES.en

// Daily puzzle: one per calendar day (local time), cycling through that language's set.
export const dayNumber = (now = Date.now()) => Math.floor((now - new Date(now).getTimezoneOffset() * 60000) / 86400000)
export function dailyPuzzle(lang, day = dayNumber()) {
  const list = puzzlesFor(lang)
  return list[((day % list.length) + list.length) % list.length]
}
