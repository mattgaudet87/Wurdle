import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const KEY = 'wurdle-state'
const EMPTY_STATS = { played: 0, won: 0, streak: 0, best: 0, dist: {} }
const DEFAULTS = { difficulty: 'normal', colorBlind: false, showPron: true, stats: EMPTY_STATS, games: {} }

const Ctx = createContext(null)

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || '{}')
    return { ...DEFAULTS, ...saved, stats: { ...EMPTY_STATS, ...saved.stats } }
  } catch {
    return DEFAULTS
  }
}

export function WurdleProvider({ children }) {
  const [data, setData] = useState(load)

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(data)) } catch { /* private mode: progress just won't persist */ }
  }, [data])

  useEffect(() => {
    const onStorage = (ev) => { if (ev.key === KEY) setData(load()) }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const value = useMemo(() => ({
    data,
    set: (patch) => setData((d) => ({ ...d, ...patch })),
    // Save a game in progress; the first time it flips to won/lost it also updates the statistics (unless it is practice).
    saveGame: (key, game, counted = true) => setData((d) => {
      const wasDone = d.games[key]?.status && d.games[key].status !== 'playing'
      const next = { ...d, games: { ...d.games, [key]: game } }
      if (counted && !wasDone && game.status !== 'playing') {
        const s = d.stats
        const won = game.status === 'won'
        const streak = won ? s.streak + 1 : 0
        next.stats = {
          played: s.played + 1,
          won: s.won + (won ? 1 : 0),
          streak,
          best: Math.max(s.best, streak),
          dist: won ? { ...s.dist, [game.guesses.length]: (s.dist[game.guesses.length] || 0) + 1 } : s.dist,
        }
      }
      return next
    }),
    resetStats: () => setData((d) => ({ ...d, stats: EMPTY_STATS })),
    resetAll: () => setData((d) => ({ ...DEFAULTS, difficulty: d.difficulty, colorBlind: d.colorBlind, showPron: d.showPron })),
  }), [data])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export const useWurdle = () => useContext(Ctx)
