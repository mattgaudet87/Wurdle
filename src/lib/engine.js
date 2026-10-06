// Pure Wurdle rules: scoring, keyboard colours, hard-mode checks, difficulty table.
export const WORD_LENGTH = 5

// On-screen keyboard per language (each key is one tile). Accents are not typed in en, fr, es (except ñ) and vi tones.
const ROW3 = (keys) => ['enter', ...keys, 'back']
export const KEYBOARDS = {
  en: [['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'], ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'], ROW3(['z', 'x', 'c', 'v', 'b', 'n', 'm'])],
  fr: [['a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'], ['q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm'], ROW3(['w', 'x', 'c', 'v', 'b', 'n'])],
  es: [['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'], ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ñ'], ROW3(['z', 'x', 'c', 'v', 'b', 'n', 'm'])],
  sr: [['e', 'r', 't', 'z', 'u', 'i', 'o', 'p', 'š', 'đ'], ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'č', 'ć'], ROW3(['ž', 'c', 'v', 'b', 'n', 'm'])],
  vi: [['a', 'ă', 'â', 'e', 'ê', 'i', 'o', 'ô', 'ơ', 'u', 'ư', 'y'], ['b', 'c', 'd', 'đ', 'g', 'h', 'k', 'l', 'm', 'n'], ROW3(['p', 'q', 'r', 's', 't', 'v', 'x'])],
}
export const keyRows = (lang) => KEYBOARDS[lang] || KEYBOARDS.en
export const lettersFor = (lang) => new Set(keyRows(lang).flat().filter((k) => k.length === 1))

export const DIFFICULTIES = {
  easy: { tries: 7, hint: 'always' },
  normal: { tries: 6, hint: 3 },
  hard: { tries: 5, hint: 'never' },
}

// Standard two-pass scoring so repeated letters are counted correctly.
export function scoreGuess(guess, answer) {
  const g = [...guess.toLowerCase()]
  const a = [...answer.toLowerCase()]
  const out = Array(g.length).fill('absent')
  const left = {}
  a.forEach((ch, i) => { if (g[i] === ch) out[i] = 'correct'; else left[ch] = (left[ch] || 0) + 1 })
  g.forEach((ch, i) => {
    if (out[i] === 'absent' && left[ch] > 0) { out[i] = 'present'; left[ch] -= 1 }
  })
  return out
}

const RANK = { absent: 1, present: 2, correct: 3 }
export function keyStates(guesses, answer) {
  const states = {}
  for (const guess of guesses) {
    scoreGuess(guess, answer).forEach((s, i) => {
      const ch = guess[i].toLowerCase()
      if (!states[ch] || RANK[s] > RANK[states[ch]]) states[ch] = s
    })
  }
  return states
}

// Hard mode: green letters stay in place, yellow letters must appear again. Returns [message key, values] or null.
export function hardModeError(guess, guesses, answer) {
  const g = [...guess.toLowerCase()]
  for (const prev of guesses) {
    const p = [...prev.toLowerCase()]
    const scores = scoreGuess(prev, answer)
    for (let i = 0; i < p.length; i++) {
      if (scores[i] === 'correct' && g[i] !== p[i]) return ['mustBe', { n: i + 1, l: p[i].toUpperCase() }]
      if (scores[i] === 'present' && !g.includes(p[i])) return ['mustContain', { l: p[i].toUpperCase() }]
    }
  }
  return null
}

export const isValidWord = (guess, lang) => {
  const letters = [...guess.toLowerCase()]
  const ok = lettersFor(lang)
  return letters.length === WORD_LENGTH && letters.every((c) => ok.has(c))
}

export const showHint = (difficulty, guessCount, finished) => {
  if (finished) return true
  const h = DIFFICULTIES[difficulty].hint
  return h === 'always' || (typeof h === 'number' && guessCount >= h)
}

// Share text: coloured squares only, no letters.
export function shareText(title, guesses, answer, tries, won) {
  const sq = { correct: '🟩', present: '🟨', absent: '⬛' }
  const rows = guesses.map((g) => scoreGuess(g, answer).map((s) => sq[s]).join('')).join('\n')
  return `Wurdle ${title} ${won ? guesses.length : 'X'}/${tries}\n${rows}`
}
