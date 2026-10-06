import { useEffect } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { WurdleProvider, useWurdle } from './lib/store.jsx'
import { HTML_LANG, useT } from './lib/i18n.js'
import WurdleHome from './pages/WurdleHome.jsx'
import WurdleGame from './pages/WurdleGame.jsx'
import WurdleSettings from './pages/WurdleSettings.jsx'

function Shell() {
  const { pathname } = useLocation()
  const { data } = useWurdle()
  const t = useT()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  useEffect(() => { document.documentElement.lang = HTML_LANG[data.language] || 'en' }, [data.language])
  return (
      <main className="page">
        <Routes>
          <Route path="/" element={<WurdleHome />} />
          <Route path="/daily" element={<WurdleGame mode="daily" />} />
          <Route path="/puzzle/:n" element={<WurdleGame mode="puzzle" />} />
          <Route path="/practice" element={<WurdleGame mode="practice" />} />
          <Route path="/settings" element={<WurdleSettings />} />
          <Route path="*" element={<p className="empty">{t('notFound')} <Link to="/">{t('backToWurdle')}</Link></p>} />
        </Routes>
      </main>
  )
}

export default function App() {
  return <WurdleProvider><Shell /></WurdleProvider>
}
