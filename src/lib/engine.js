// Pure Wurdle rules: scoring, keyboard colours, hard-mode checks, difficulty table.
export const WORD_LENGTH = 5

// Serbian Latin letters that fit in one tile (lj, nj, dž are not used in answers).
export const KEY_ROWS = [
  ['e', 'r', 't', 'z', 'u', 'i', 'o', 'p', 'š', 'đ'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'č', 'ć'],
  ['enter', 'ž', 'c', 'v', 'b', 'n', 'm', 'back'],
]
export const LETTERS = new Set(KEY_ROWS.flat().filter((k) => k.length === 1))

export const DIFFICULTIES = {
  easy: { label: 'Easy', tries: 7, hint: 'always', desc: '7 tries. The English meaning is shown from the start.' },
  normal: { label: 'Normal', tries: 6, hint: 3, desc: '6 tries. The meaning appears after 3 guesses.' },
  hard: { label: 'Hard', tries: 5, hint: 'never', desc: '5 tries. No meaning until the end, and revealed clues must be reused.' },
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

// Hard mode: green letters stay in place, yellow letters must appear again. Returns an error message or null.
export function hardModeError(guess, guesses, answer) {
  const g = [...guess.toLowerCase()]
  for (const prev of guesses) {
    const p = [...prev.toLowerCase()]
    const scores = scoreGuess(prev, answer)
    for (let i = 0; i < p.length; i++) {
      if (scores[i] === 'correct' && g[i] !== p[i]) return `Letter ${i + 1} must be ${p[i].toUpperCase()}`
      if (scores[i] === 'present' && !g.includes(p[i])) return `Guess must contain ${p[i].toUpperCase()}`
    }
  }
  return null
}

export const isValidWord = (guess) => [...guess.toLowerCase()].length === WORD_LENGTH && [...guess.toLowerCase()].every((c) => LETTERS.has(c))

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
