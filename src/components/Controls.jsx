export function Segment({ label, value, options, onChange }) {
  return (
    <div className="set-row">
      <div className="set-label" id={`l-${label}`}>{label}</div>
      <div className="seg" role="radiogroup" aria-labelledby={`l-${label}`}>
        {options.map(([v, text]) => (
          <button key={v} role="radio" aria-checked={value === v} className={value === v ? 'on' : ''} onClick={() => onChange(v)}>{text}</button>
        ))}
      </div>
    </div>
  )
}

export function Toggle({ label, desc, on, onChange }) {
  return (
    <div className="set-row toggle-row">
      <div>
        <div className="set-label">{label}</div>
        <div className="set-desc">{desc}</div>
      </div>
      <button role="switch" aria-checked={on} aria-label={label} className={`switch ${on ? 'on' : ''}`} onClick={() => onChange(!on)}><span /></button>
    </div>
  )
}
