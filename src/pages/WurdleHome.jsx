import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icons.jsx'
import { Segment } from '../components/Controls.jsx'
import { PUZZLES, dailyPuzzle, dayNumber } from '../lib/puzzles.js'
import { DIFFICULTIES } from '../lib/engine.js'
import { useT } from '../lib/i18n.js'
import { useWurdle } from '../lib/store.jsx'

function Stats({ stats }) {
  const t = useT()
  const winPct = stats.played ? Math.round((stats.won / stats.played) * 100) : 0
  const rows = [1, 2, 3, 4, 5, 6, 7]
  const max = Math.max(1, ...rows.map((r) => stats.dist[r] || 0))
  return (
    <div className="set-card wstats">
      <div className="wstat-nums">
        {[[stats.played, t('played')], [`${winPct}%`, t('winRate')], [stats.streak, t('streak')], [stats.best, t('bestStreak')]].map(([v, l]) => (
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
  const t = useT()
  return (
    <div className="wmodal" role="dialog" aria-modal="true" aria-label={t('howToPlay')} onClick={onClose}>
      <div className="wmodal-card" onClick={(e) => e.stopPropagation()}>
        <h2>{t('howToPlay')}</h2>
        <p>{t('introGuess')}</p>
        <div className="wex"><span className="wtile correct">V</span><span className="wtile">O</span><span className="wtile present">L</span><span className="wtile absent">I</span><span className="wtile">M</span></div>
        <p><b className="inl correct">{t('green')}</b> {t('greenDesc')} <b className="inl present">{t('yellow')}</b> {t('yellowDesc')} <b className="inl absent">{t('gray')}</b> {t('grayDesc')}</p>
        <p>{t('introLetters')}</p>
        <button className="copy" onClick={onClose}>{t('gotIt')}</button>
      </div>
    </div>
  )
}

export default function WurdleHome() {
  const [intro, closeIntro] = useFirstVisit()
  const t = useT()
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
        <p>{t('tagline')}</p>
      </header>

      <h2 className="group-title">{t('statistics')}</h2>
      <Stats stats={data.stats} />

      <h2 className="group-title">{t('difficulty')}</h2>
      <div className="set-card">
        <Segment label={t('difficulty')} value={data.difficulty} options={Object.keys(DIFFICULTIES).map((k) => [k, t(k)])} onChange={(v) => set({ difficulty: v })} />
      </div>
      <p className="hint">{t('desc' + data.difficulty[0].toUpperCase() + data.difficulty.slice(1))}</p>

      <h2 className="group-title">{t('gameModes')}</h2>
      <div className="wmodes">
        <Link to="/daily" className="wmode daily">
          <span className="wmode-tag">{t('daily')}</span>
          <strong>{t('todaysWord')}</strong>
          <span>{dailyDone ? (daily.status === 'won' ? t('solvedIn', { n: daily.guesses.length }) : t('missedToday')) : daily ? t('inProgress') : t('dailySub')}</span>
          <em>{dailyDone ? t('viewResult') : daily ? t('continue') : t('play')}</em>
        </Link>
        <Link to="/practice" className="wmode">
          <span className="wmode-tag">{t('practice')}</span>
          <strong>{t('randomWord')}</strong>
          <span>{t('noStats')}</span>
          <em>{t('play')}</em>
        </Link>
      </div>

      <div className="sheet-head wsh"><h2>{t('puzzles')}</h2><span className="muted">{t('nOfM', { n: solved, m: PUZZLES.length })}</span></div>
      <div className="wpuzzles">
        {PUZZLES.map((p) => {
          const g = data.games[`puzzle-${p.id}`]
          const st = g?.status === 'won' ? 'won' : g?.status === 'lost' ? 'lost' : g ? 'going' : ''
          return (
            <Link key={p.id} to={`/puzzle/${p.id}`} className={`wpz ${st} ${p.id === nextId && !st ? 'next' : ''}`} aria-label={`Puzzle ${p.id}${st ? `, ${st}` : ''}`}>
              <strong>{p.id}</strong>
              <span>{st === 'won' ? `${g.guesses.length} ✓` : st === 'lost' ? t('missed') : st === 'going' ? '…' : ''}</span>
            </Link>
          )
        })}
      </div>
      <p className="hint">{t('anyOrder', { m: PUZZLES.length })}</p>

      <details className="wrules">
        <summary>{t('howToPlay')}</summary>
        <ul>
          <li>{t('rule1')}</li>
          <li><b className="inl correct">{t('green')}</b> {t('greenDesc')} <b className="inl present">{t('yellow')}</b> {t('yellowDesc')} <b className="inl absent">{t('gray')}</b> {t('grayDesc')}</li>
          <li>{t('rule3')}</li>
          <li>{t('rule4')}</li>
        </ul>
      </details>
    </div>
  )
}
