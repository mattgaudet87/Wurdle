import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icons.jsx'
import { Segment } from '../components/Controls.jsx'
import { PUZZLES, dailyPuzzle, dayNumber } from '../lib/puzzles.js'
import { DIFFICULTIES } from '../lib/engine.js'
import { useWurdle } from '../lib/store.jsx'

function Stats({ stats }) {
  const winPct = stats.played ? Math.round((stats.won / stats.played) * 100) : 0
  const rows = [1, 2, 3, 4, 5, 6, 7]
  const max = Math.max(1, ...rows.map((r) => stats.dist[r] || 0))
  return (
    <div className="set-card wstats">
      <div className="wstat-nums">
        {[[stats.played, 'Played'], [`${winPct}%`, 'Win rate'], [stats.streak, 'Streak'], [stats.best, 'Best streak']].map(([v, l]) => (
          <div key={l}><strong>{v}</strong><span>{l}</span></div>
        ))}
      </div>
      <div className="wdist" aria-label="Guess distribution">
        {rows.map((r) => (
          <div key={r} className="wdist-row">
            <span>{r}</span>
            <div className="wbar" style={{ width: `${Math.max(8, ((stats.dist[r] || 0) / max) * 100)}%` }} data-zero={!stats.dist[r] || undefined}>{stats.dist[r] || 0}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

const SEEN = 'wurdle-seen-intro'
function useFirstVisit() {
  const [open, setOpen] = useState(() => { try { return !localStorage.getItem(SEEN) } catch { return false } })
  const close = () => { setOpen(false); try { localStorage.setItem(SEEN, '1') } catch { /* private mode */ } }
  return [open, close]
}

function Intro({ onClose }) {
  return (
    <div className="wmodal" role="dialog" aria-modal="true" aria-label="How to play" onClick={onClose}>
      <div className="wmodal-card" onClick={(e) => e.stopPropagation()}>
        <h2>How to play</h2>
        <p>Guess the 5-letter Serbian word. Each guess shows how close you are:</p>
        <div className="wex"><span className="wtile correct">V</span><span className="wtile">O</span><span className="wtile present">L</span><span className="wtile absent">I</span><span className="wtile">M</span></div>
        <p><b className="inl correct">Green</b> right letter, right spot. <b className="inl present">Yellow</b> right letter, wrong spot. <b className="inl absent">Gray</b> not in the word.</p>
        <p>č, ć, š, ž and đ are single letters. Finish a puzzle to learn how to say the word.</p>
        <button className="copy" onClick={onClose}>Got it</button>
      </div>
    </div>
  )
}

export default function WurdleHome() {
  const [intro, closeIntro] = useFirstVisit()
  const { data, set } = useWurdle()
  const daily = data.games[`daily-${dayNumber()}`]
  const dailyDone = daily && daily.status !== 'playing'
  const solved = PUZZLES.filter((p) => data.games[`puzzle-${p.id}`]?.status === 'won').length
  const nextId = (PUZZLES.find((p) => data.games[`puzzle-${p.id}`]?.status !== 'won') || PUZZLES[0]).id

  return (
    <div className="wurdle" data-cb={data.colorBlind ? '' : undefined}>
      {intro && <Intro onClose={closeIntro} />}
      <div className="entry-bar">
        <span className="back" />
        <Link to="/settings" className="back" aria-label="Wurdle settings"><Icon name="settings" size={22} /></Link>
      </div>
      <header className="whero">
        <div className="wlogo" aria-label="Wurdle">
          {[...'WURDLE'].map((c, i) => <span key={i} className={['correct', 'present', 'absent'][i % 3]}>{c}</span>)}
        </div>
        <p>Guess the Serbian word. Learn it for good.</p>
      </header>

      <h2 className="group-title">Statistics</h2>
      <Stats stats={data.stats} />

      <h2 className="group-title">Difficulty</h2>
      <div className="set-card">
        <Segment label="Difficulty" value={data.difficulty} options={Object.entries(DIFFICULTIES).map(([k, d]) => [k, d.label])} onChange={(v) => set({ difficulty: v })} />
      </div>
      <p className="hint">{DIFFICULTIES[data.difficulty].desc}</p>

      <h2 className="group-title">Game modes</h2>
      <div className="wmodes">
        <Link to="/daily" className="wmode daily">
          <span className="wmode-tag">Daily</span>
          <strong>Today's word</strong>
          <span>{dailyDone ? (daily.status === 'won' ? `Solved in ${daily.guesses.length}. Come back tomorrow.` : 'Not today. Come back tomorrow.') : daily ? 'In progress, pick up where you left off' : 'One new puzzle every day'}</span>
          <em>{dailyDone ? 'View result' : daily ? 'Continue' : 'Play'}</em>
        </Link>
        <Link to="/practice" className="wmode">
          <span className="wmode-tag">Practice</span>
          <strong>Random word</strong>
          <span>Doesn't affect your stats</span>
          <em>Play</em>
        </Link>
      </div>

      <div className="sheet-head wsh"><h2>Puzzles</h2><span className="muted">{solved} of {PUZZLES.length} solved</span></div>
      <div className="wpuzzles">
        {PUZZLES.map((p) => {
          const g = data.games[`puzzle-${p.id}`]
          const st = g?.status === 'won' ? 'won' : g?.status === 'lost' ? 'lost' : g ? 'going' : ''
          return (
            <Link key={p.id} to={`/puzzle/${p.id}`} className={`wpz ${st} ${p.id === nextId && !st ? 'next' : ''}`} aria-label={`Puzzle ${p.id}${st ? `, ${st}` : ''}`}>
              <strong>{p.id}</strong>
              <span>{st === 'won' ? `${g.guesses.length} ✓` : st === 'lost' ? 'missed' : st === 'going' ? '…' : ''}</span>
            </Link>
          )
        })}
      </div>
      <p className="hint">Play them in any order. Solve all {PUZZLES.length} to see how far you've come.</p>

      <details className="wrules">
        <summary>How to play</summary>
        <ul>
          <li>Guess the 5-letter Serbian word. Type with the on-screen keyboard (č, ć, š, ž and đ each count as one letter).</li>
          <li><b className="inl correct">Green</b> means right letter, right spot. <b className="inl present">Yellow</b> means the word has it, elsewhere. <b className="inl absent">Gray</b> means it isn't there.</li>
          <li>Any 5 letters are accepted as a guess; there is no dictionary check.</li>
          <li>Finish a puzzle to see its pronunciation and an example sentence.</li>
        </ul>
      </details>
    </div>
  )
}
