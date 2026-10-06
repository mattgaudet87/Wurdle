import { useEffect } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { WurdleProvider } from './lib/store.jsx'
import WurdleHome from './pages/WurdleHome.jsx'
import WurdleGame from './pages/WurdleGame.jsx'
import WurdleSettings from './pages/WurdleSettings.jsx'

export default function App() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return (
    <WurdleProvider>
      <main className="page">
        <Routes>
          <Route path="/" element={<WurdleHome />} />
          <Route path="/daily" element={<WurdleGame mode="daily" />} />
          <Route path="/puzzle/:n" element={<WurdleGame mode="puzzle" />} />
          <Route path="/practice" element={<WurdleGame mode="practice" />} />
          <Route path="/settings" element={<WurdleSettings />} />
          <Route path="*" element={<p className="empty">Page not found. <Link to="/">Back to Wurdle</Link></p>} />
        </Routes>
      </main>
    </WurdleProvider>
  )
}
