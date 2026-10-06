import { describe, expect, it } from 'vitest'

import { scoreGuess, keyStates, hardModeError, isValidWord } from './engine.js'
import { PUZZLES, dailyPuzzle } from './puzzles.js'

describe('wurdle', () => {
  it('scores greens, yellows and grays', () => expect(scoreGuess('MOLIM', 'VOLIM')).toEqual(['absent', 'correct', 'correct', 'correct', 'correct']))
  it('counts repeated letters once per answer letter', () => expect(scoreGuess('ALLAY', 'LABEL')).toEqual(['present', 'present', 'present', 'absent', 'absent']))
  it('keeps the best colour on the keyboard', () => expect(keyStates(['MOLIM', 'VOLIM'], 'VOLIM').m).toBe('correct'))
  it('hard mode requires revealed clues', () => {
    expect(hardModeError('VHALA', ['VOLIM'], 'VOLIM')).toEqual(['mustBe', { n: 2, l: 'O' }])
    expect(hardModeError('VOLIM', ['VOLIM'], 'VOLIM')).toBeNull()
  })
  it('accepts Serbian letters and rejects others', () => {
    expect(isValidWord('KAFIĆ')).toBe(true)
    expect(isValidWord('WATER')).toBe(false)
  })
  it('has thirty valid, unique 5-letter puzzles', () => {
    expect(PUZZLES).toHaveLength(30)
    PUZZLES.forEach((p) => { expect(isValidWord(p.word)).toBe(true); expect(p.sr && p.en && p.pron && p.english).toBeTruthy() })
    expect(new Set(PUZZLES.map((p) => p.word)).size).toBe(30)
  })
  it('picks a daily puzzle for any day', () => expect(dailyPuzzle(-3)).toBeTruthy())
})

import { STR, translate, LANGUAGES } from './i18n.js'
import { TRANSLATIONS, localized } from './translations.js'

describe('languages', () => {
  it('has every UI string in every language', () => {
    for (const [key, row] of Object.entries(STR)) for (const [code] of LANGUAGES) expect(row[code], `${key}/${code}`).toBeTruthy()
  })
  it('translates every puzzle into every language', () => {
    for (const p of PUZZLES) for (const code of ['sr', 'fr', 'es', 'vi']) expect(TRANSLATIONS[p.id]?.[code]?.[0], `${p.id}/${code}`).toBeTruthy()
  })
  it('fills in values and falls back to English', () => {
    expect(translate('fr', 'solvedIn', { n: 3 })).toContain('3')
    expect(localized(PUZZLES[0], 'en').english).toBe(PUZZLES[0].english)
    expect(localized(PUZZLES[0], 'sr').en).toBeNull()
  })
})
