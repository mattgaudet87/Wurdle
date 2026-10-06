import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Icon from '../components/Icons.jsx'
import CopyButton from '../components/CopyButton.jsx'
import { PUZZLES, dailyPuzzle, dayNumber } from '../lib/puzzles.js'
import { DIFFICULTIES, KEY_ROWS, LETTERS, WORD_LENGTH, hardModeError, isValidWord, keyStates, scoreGuess, shareText, showHint } from '../lib/engine.js'
import { useWurdle } from '../lib/store.jsx'

const pickRandom = (not) => {
  const pool = PUZZLES.filter((p) => p.id !== not)
  return pool[Math.floor(Math.random() * pool.length)]
}

export default function WurdleGame({ mode }) {
  const { n } = useParams()
  const navigate = useNavigate()
  const { data, saveGame } = useWurdle()
  const [practice, setPractice] = useState(() => ({ puzzle: pickRandom(), round: 0 }))

  let puzzle, key, title
  if (mode === 'daily') { puzzle = dailyPuzzle(); key = `daily-${dayNumber()}`; title = 'Daily' }
  else if (mode === 'puzzle') { puzzle = PUZZLES.find((p) => p.id === Number(n)); key = `puzzle-${n}`; title = `#${n}` }
  else { puzzle = practice.puzzle; key = null; title = 'Practice' }

  if (!puzzle) return <p className="empty">Puzzle not found. <Link to="/">Back to Wurdle</Link></p>
  // A fresh component per game so no typing state leaks between puzzles.
  return <Board key={key || `practice-${practice.round}`} {...{ puzzle, gameKey: key, title, mode, data, saveGame, navigate, again: () => setPractice((p) => ({ puzzle: pickRandom(p.puzzle.id), round: p.round + 1 })) }} />
}

function Board({ puzzle, gameKey, title, mode, data, saveGame, navigate, again }) {
  const saved = gameKey ? data.games[gameKey] : null
  // Difficulty is locked in once the first guess is made, so it can't be switched mid-game.
  const [guesses, setGuesses] = useState(saved?.guesses || [])
  const [status, setStatus] = useState(saved?.status || 'playing')
  const difficulty = saved?.difficulty || data.difficulty
  const { tries } = DIFFICULTIES[difficulty]
  // The typed letters live in a ref too, so fast typing followed by Enter never reads a stale value.
  const [current, setCurrentState] = useState('')
  const currentRef = useRef('')
  const setCurrent = (v) => { currentRef.current = v; setCurrentState(v) }
  const [toast, setToast] = useState('')
  const [shake, setShake] = useState(false)
  const [fresh, setFresh] = useState(-1) // row that is being revealed right now
  const [showEnd, setShowEnd] = useState(status !== 'playing')
  const timers = useRef([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])
  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms))

  const answer = puzzle.word
  const finished = status !== 'playing'
  const states = keyStates(guesses, answer)

  const flash = (msg) => {
    setToast(msg); setShake(true)
    later(() => setShake(false), 450)
    later(() => setToast((t) => (t === msg ? '' : t)), 1800)
  }

  const submit = useCallback(() => {
    if (finished || fresh >= 0) return
    const guess = currentRef.current.toUpperCase()
    if (!isValidWord(guess)) return flash(`Needs ${WORD_LENGTH} letters`)
    if (difficulty === 'hard') {
      const err = hardModeError(guess, guesses, answer)
      if (err) return flash(err)
    }
    const next = [...guesses, guess]
    const result = guess === answer ? 'won' : next.length >= tries ? 'lost' : 'playing'
    setGuesses(next); setCurrent(''); setFresh(next.length - 1)
    if (gameKey) saveGame(gameKey, { guesses: next, status: result, difficulty }, true)
    later(() => {
      setFresh(-1); setStatus(result)
      if (result !== 'playing') later(() => setShowEnd(true), 300)
    }, WORD_LENGTH * 250 + 300)
  }, [finished, fresh, guesses, difficulty, answer, tries, gameKey, saveGame])

  const press = useCallback((k) => {
    if (finished || fresh >= 0) return
    if (k === 'enter') submit()
    else if (k === 'back') setCurrent([...currentRef.current].slice(0, -1).join(''))
    else if (LETTERS.has(k) && [...currentRef.current].length < WORD_LENGTH) setCurrent(currentRef.current + k)
  }, [finished, fresh, submit])

  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.target.closest?.('button, a, input, textarea')) return
      if (e.key === 'Enter') { e.preventDefault(); press('enter') }
      else if (e.key === 'Backspace') press('back')
      else if (e.key.length === 1) press(e.key.toLowerCase())
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [press])

  const rows = Array.from({ length: tries }, (_, r) => {
    if (r < guesses.length) return { letters: [...guesses[r]], scores: scoreGuess(guesses[r], answer) }
    if (r === guesses.length) return { letters: [...current.toUpperCase()], scores: null, active: true }
    return { letters: [], scores: null }
  })
  const hinted = showHint(difficulty, guesses.length, finished)
  const won = status === 'won'

  return (
    <div className="wurdle wgame" data-cb={data.colorBlind ? '' : undefined}>
      <div className="entry-bar">
        <Link to="/" className="back" aria-label="Back to Wurdle home"><Icon name="chevronL" size={26} /></Link>
        <div className="wg-title"><strong>{title}</strong><span>{DIFFICULTIES[difficulty].label} · {tries} tries</span></div>
        <Link to="/settings" className="back" aria-label="Wurdle settings"><Icon name="settings" size={22} /></Link>
      </div>

      <p className={`wg-hint ${hinted ? '' : 'locked'}`}>
        {hinted ? <><span>Meaning</span> {puzzle.english}</> : `Meaning unlocks after ${DIFFICULTIES[difficulty].hint === 'never' ? 'the game' : `${DIFFICULTIES[difficulty].hint} guesses`}`}
      </p>
      <div className="wg-toast" role="status">{toast}</div>

      <div className="wgrid" role="grid" aria-label="Guesses">
        {rows.map((row, r) => (
          <div key={r} className={`wrow ${row.active && shake ? 'shake' : ''}`} role="row">
            {Array.from({ length: WORD_LENGTH }, (_, i) => {
              const ch = row.letters[i]
              const s = row.scores?.[i]
              return <div key={i} role="gridcell" aria-label={ch ? `${ch} ${s || ''}` : 'empty'} className={`wtile ${s || ''} ${ch && !s ? 'filled' : ''} ${r === fresh ? 'flip' : ''}`} style={{ '--i': i }}>{ch}</div>
            })}
          </div>
        ))}
      </div>

      {showEnd ? (
        <div className="wend">
          <h2>{won ? (guesses.length === 1 ? 'Wow, first try!' : 'Bravo!') : 'Next time!'}</h2>
          <div className="wend-word">{answer}</div>
          {data.showPron && <div className="wend-pron">{puzzle.pron}</div>}
          <div className="wend-en">{puzzle.english}</div>
          <div className="wend-ex"><em>{puzzle.sr}</em><span>{puzzle.en}</span></div>
          <div className="wend-actions">
            <CopyButton text={shareText(title, guesses, answer, tries, won)} label="Share result" />
            {mode === 'practice' && <button className="wbtn" onClick={again}>Play another</button>}
            {mode === 'puzzle' && Number(puzzle.id) < PUZZLES.length && <button className="wbtn" onClick={() => navigate(`/puzzle/${puzzle.id + 1}`)}>Next puzzle</button>}
            {mode !== 'practice' && !(mode === 'puzzle' && Number(puzzle.id) < PUZZLES.length) && <button className="wbtn" onClick={() => navigate('/')}>Back to Wurdle</button>}
            <Link to="/" className="wlink">Wurdle home</Link>
          </div>
        </div>
      ) : (
        <div className="wkeys" aria-label="Keyboard">
          {KEY_ROWS.map((row, i) => (
            <div key={i} className="wkrow">
              {row.map((k) => (
                <button key={k} className={`wkey ${states[k] || ''} ${k.length > 1 ? 'wide' : ''}`} onClick={() => press(k)} aria-label={k === 'back' ? 'Delete' : k === 'enter' ? 'Enter' : k}>
                  {k === 'back' ? '⌫' : k === 'enter' ? 'Enter' : k}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
