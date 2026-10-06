import { Link } from 'react-router-dom'
import Icon from '../components/Icons.jsx'
import { Segment, Toggle } from '../components/Controls.jsx'
import { DIFFICULTIES } from '../lib/engine.js'
import { LANGUAGES, useT } from '../lib/i18n.js'
import { useWurdle } from '../lib/store.jsx'

export default function WurdleSettings() {
  const { data, set, resetStats, resetAll } = useWurdle()
  const t = useT()
  const confirmDo = (msg, fn) => { if (window.confirm(msg)) fn() }
  return (
    <div className="wurdle">
      <div className="entry-bar">
        <Link to="/" className="back" aria-label="Back to Wurdle"><Icon name="chevronL" size={26} /></Link>
      </div>
      <h1 className="title">{t('settingsTitle')}</h1>

      <h2 className="group-title">{t('language')}</h2>
      <div className="set-card">
        <div className="set-row">
          <div className="set-label" id="l-lang">{t('language')}</div>
          <select className="langsel" aria-labelledby="l-lang" value={data.language} onChange={(e) => set({ language: e.target.value })}>
            {LANGUAGES.map(([code, name]) => <option key={code} value={code}>{name}</option>)}
          </select>
        </div>
      </div>
      <p className="hint">{t('languageDesc')}</p>

      <h2 className="group-title">{t('difficulty')}</h2>
      <div className="set-card">
        <Segment label={t('difficulty')} value={data.difficulty} options={Object.keys(DIFFICULTIES).map((k) => [k, t(k)])} onChange={(v) => set({ difficulty: v })} />
      </div>
      <p className="hint">{t('desc' + data.difficulty[0].toUpperCase() + data.difficulty.slice(1))} {t('startedNote')}</p>

      <h2 className="group-title">{t('display')}</h2>
      <div className="set-card">
        <Toggle label={t('colorBlind')} desc={t('colorBlindDesc')} on={data.colorBlind} onChange={(v) => set({ colorBlind: v })} />
        <Toggle label={t('showPron')} desc={t('showPronDesc')} on={data.showPron} onChange={(v) => set({ showPron: v })} />
      </div>

      <h2 className="group-title">{t('data')}</h2>
      <div className="set-card">
        <div className="set-row"><div><div className="set-label">{t('resetStats')}</div><div className="set-desc">{t('resetStatsDesc')}</div></div>
          <button className="chip" onClick={() => confirmDo(t('confirmStats'), resetStats)}>{t('reset')}</button></div>
        <div className="set-row"><div><div className="set-label">{t('resetAll')}</div><div className="set-desc">{t('resetAllDesc')}</div></div>
          <button className="chip" onClick={() => confirmDo(t('confirmAll'), resetAll)}>{t('reset')}</button></div>
      </div>
      <p className="hint">{t('savedHere')}</p>
    </div>
  )
}
