import { Link } from 'react-router-dom'
import Icon from '../components/Icons.jsx'
import { Segment, Toggle } from '../components/Controls.jsx'
import { DIFFICULTIES } from '../lib/engine.js'
import { useWurdle } from '../lib/store.jsx'

export default function WurdleSettings() {
  const { data, set, resetStats, resetAll } = useWurdle()
  const confirmDo = (msg, fn) => { if (window.confirm(msg)) fn() }
  return (
    <div className="wurdle">
      <div className="entry-bar">
        <Link to="/" className="back" aria-label="Back to Wurdle"><Icon name="chevronL" size={26} /></Link>
      </div>
      <h1 className="title">Wurdle settings</h1>

      <h2 className="group-title">Difficulty</h2>
      <div className="set-card">
        <Segment label="Difficulty" value={data.difficulty} options={Object.entries(DIFFICULTIES).map(([k, d]) => [k, d.label])} onChange={(v) => set({ difficulty: v })} />
      </div>
      <p className="hint">{DIFFICULTIES[data.difficulty].desc} A game already started keeps the difficulty it began with.</p>

      <h2 className="group-title">Display</h2>
      <div className="set-card">
        <Toggle label="Color-blind colors" desc="Orange and blue instead of green and yellow." on={data.colorBlind} onChange={(v) => set({ colorBlind: v })} />
        <Toggle label="Show pronunciation" desc="Show how to say the word on the result screen." on={data.showPron} onChange={(v) => set({ showPron: v })} />
      </div>

      <h2 className="group-title">Data</h2>
      <div className="set-card">
        <div className="set-row"><div><div className="set-label">Reset statistics</div><div className="set-desc">Clears played, win rate and streaks. Solved puzzles stay solved.</div></div>
          <button className="chip" onClick={() => confirmDo('Reset your Wurdle statistics?', resetStats)}>Reset</button></div>
        <div className="set-row"><div><div className="set-label">Reset everything</div><div className="set-desc">Clears statistics and all puzzle progress.</div></div>
          <button className="chip" onClick={() => confirmDo('Erase all Wurdle progress?', resetAll)}>Reset</button></div>
      </div>
      <p className="hint">Saved in this browser only.</p>
    </div>
  )
}
