import { describe, expect, it } from 'vitest'

import { scoreGuess, keyStates, hardModeError, isValidWord, keyRows, WORD_LENGTH } from './engine.js'
import { PUZZLES, dailyPuzzle, lettersOf } from './words/index.js'
import { STR, translate, LANGUAGES } from './i18n.js'

const CODES = LANGUAGES.map(([c]) => c)

describe('wurdle engine', () => {
  it('scores greens, yellows and grays', () => expect(scoreGuess('MOLIM', 'VOLIM')).toEqual(['absent', 'correct', 'correct', 'correct', 'correct']))
  it('counts repeated letters once per answer letter', () => expect(scoreGuess('ALLAY', 'LABEL')).toEqual(['present', 'present', 'present', 'absent', 'absent']))
  it('keeps the best colour on the keyboard', () => expect(keyStates(['MOLIM', 'VOLIM'], 'VOLIM').m).toBe('correct'))
  it('hard mode requires revealed clues', () => {
    expect(hardModeError('VHALA', ['VOLIM'], 'VOLIM')).toEqual(['mustBe', { n: 2, l: 'O' }])
    expect(hardModeError('VOLIM', ['VOLIM'], 'VOLIM')).toBeNull()
  })
  it('checks guesses against the language keyboard', () => {
    expect(isValidWord('KAFIĆ', 'sr')).toBe(true)
    expect(isValidWord('KAFIĆ', 'en')).toBe(false)
    expect(isValidWord('SUEÑO', 'es')).toBe(true)
    expect(isValidWord('NGƯƠI', 'vi')).toBe(true)
    expect(isValidWord('WATER', 'en')).toBe(true)
  })
})

describe('puzzles', () => {
  it('drops accents but keeps real letters', () => {
    expect(lettersOf('fr', 'ÉCOLE')).toBe('ECOLE')
    expect(lettersOf('es', 'SUEÑO')).toBe('SUEÑO')
    expect(lettersOf('es', 'ÁRBOL')).toBe('ARBOL')
    expect(lettersOf('vi', 'NGƯỜI')).toBe('NGƯƠI')
    expect(lettersOf('vi', 'TIẾNG')).toBe('TIÊNG')
  })
  for (const code of CODES) {
    it(`${code}: every answer is 5 letters on that keyboard, unique, with a meaning and example`, () => {
      const list = PUZZLES[code]
      expect(list.length).toBeGreaterThanOrEqual(25)
      for (const p of list) {
        expect(isValidWord(p.word, code), `${code} ${p.shown}`).toBe(true)
        expect([...p.word]).toHaveLength(WORD_LENGTH)
        expect(p.meaning && p.ex, p.shown).toBeTruthy()
        expect(p.meaning.toLowerCase().includes(p.shown.toLowerCase()), `${p.shown} is in its own meaning`).toBe(false)
      }
      expect(new Set(list.map((p) => p.word)).size).toBe(list.length)
      expect(keyRows(code).flat().length).toBeGreaterThan(20)
    })
  }
  it('picks a daily puzzle for any day in every language', () => { for (const c of CODES) expect(dailyPuzzle(c, -3)).toBeTruthy() })
})

describe('languages', () => {
  it('has every UI string in every language', () => {
    for (const [key, row] of Object.entries(STR)) for (const code of CODES) expect(row[code], `${key}/${code}`).toBeTruthy()
  })
  it('fills in values', () => expect(translate('fr', 'solvedIn', { n: 3 })).toContain('3'))
})
