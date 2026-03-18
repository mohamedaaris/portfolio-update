import { useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import EntrySequence from './components/EntrySequence'
import NeuralBackground from './components/NeuralBackground'
import Navbar from './components/Navbar'
import CoreIdentity from './components/CoreIdentity'
import SkillMatrix from './components/SkillMatrix'
import ProjectHub from './components/ProjectHub'
import ExperienceTimeline from './components/ExperienceTimeline'
import ContactPortal from './components/ContactPortal'
import Footer from './components/Footer'

function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        left: pos.x - 150,
        top: pos.y - 150,
        width: 300,
        height: 300,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,245,255,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 2,
        transition: 'left 0.1s ease-out, top 0.1s ease-out',
      }}
    />
  )
}

function App() {
  const [entryComplete, setEntryComplete] = useState(false)

  const handleEntryComplete = useCallback(() => {
    setEntryComplete(true)
  }, [])

  return (
    <>
      {/* Entry Sequence */}
      {!entryComplete && <EntrySequence onComplete={handleEntryComplete} />}

      {/* Cursor Glow Effect */}
      {entryComplete && <CursorGlow />}

      {/* Three.js Neural Background */}
      {entryComplete && <NeuralBackground />}

      {/* Grid Overlay */}
      {entryComplete && <div className="grid-overlay" />}

      {/* Scan Line */}
      {entryComplete && <div className="scan-line-effect" />}

      {/* Main Content */}
      {entryComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{ position: 'relative', zIndex: 3 }}
        >
          <Navbar />

          <main>
            <CoreIdentity />
            <SkillMatrix />
            <ProjectHub />
            <ExperienceTimeline />
            <ContactPortal />
          </main>

          <Footer />
        </motion.div>
      )}
    </>
  )
}

export default App
