import { useState } from 'react'
import Icon from './Icons.jsx'

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

export default function CopyButton({ text, label = 'Copy' }) {
  const [state, setState] = useState('idle')
  async function onClick() {
    setState((await copyText(text)) ? 'done' : 'fail')
    setTimeout(() => setState('idle'), 1500)
  }
  return (
    <button className="copy" onClick={onClick} aria-live="polite">
      <Icon name={state === 'done' ? 'check' : 'copy'} size={20} />
      <span>{state === 'done' ? 'Copied' : state === 'fail' ? 'Copy failed' : label}</span>
    </button>
  )
}
