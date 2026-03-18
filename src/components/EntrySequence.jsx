import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const bootSequence = [
  { text: '> Initializing Neural Core...', delay: 0 },
  { text: '> Loading synaptic pathways...', delay: 600 },
  { text: '> Calibrating interface matrix...', delay: 1200 },
  { text: '> Accessing Neural Interface...', delay: 1800 },
  { text: '> Identity Verified ✓', delay: 2600 },
]

export default function EntrySequence({ onComplete }) {
  const [phase, setPhase] = useState('boot') // boot -> reveal -> zoom -> done
  const [visibleLines, setVisibleLines] = useState([])
  const [showIdentity, setShowIdentity] = useState(false)

  useEffect(() => {
    // Show boot lines sequentially
    bootSequence.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, line.text])
      }, line.delay)
    })

    // Show identity after boot
    setTimeout(() => {
      setShowIdentity(true)
    }, 3400)

    // Start zoom transition
    setTimeout(() => {
      setPhase('zoom')
    }, 5000)

    // Complete entry
    setTimeout(() => {
      onComplete()
    }, 5800)
  }, [onComplete])

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="entry-screen"
          exit={{ opacity: 0, scale: 3 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Core Orb */}
          <motion.div
            className="core-orb"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: phase === 'zoom' ? [1, 15] : 1,
              opacity: phase === 'zoom' ? [1, 0] : 1,
            }}
            transition={{
              scale: { duration: 0.3, ease: 'easeOut' },
              opacity: { duration: phase === 'zoom' ? 0.8 : 0.5 },
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: '-20px',
                borderRadius: '50%',
                border: '1px solid rgba(0, 245, 255, 0.2)',
                animation: 'wave-pulse 2s ease-out infinite',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: '-40px',
                borderRadius: '50%',
                border: '1px solid rgba(185, 70, 255, 0.15)',
                animation: 'wave-pulse 2s ease-out infinite 0.5s',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: '-60px',
                borderRadius: '50%',
                border: '1px solid rgba(0, 245, 255, 0.1)',
                animation: 'wave-pulse 2s ease-out infinite 1s',
              }}
            />
          </motion.div>

          {/* Boot Text */}
          <div style={{ marginTop: '2rem', minHeight: '160px' }}>
            <AnimatePresence>
              {visibleLines.map((line, i) => (
                <motion.div
                  key={i}
                  className="entry-text"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    color: line.includes('✓') ? '#00ff88' : '#00f5ff',
                    textAlign: 'left',
                    marginBottom: '0.3rem',
                    fontSize: '0.85rem',
                  }}
                >
                  {line}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Identity Reveal */}
            <AnimatePresence>
              {showIdentity && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  style={{ marginTop: '1.5rem', textAlign: 'center' }}
                >
                  <div className="identity-text">
                    P MOHAMED AARIS
                  </div>
                  <div
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      color: '#8892b0',
                      fontSize: '0.8rem',
                      letterSpacing: '3px',
                      marginTop: '0.5rem',
                    }}
                  >
                    // DIGITAL PROFILE
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Progress Bar */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: '3rem',
              width: '200px',
              height: '2px',
              background: 'rgba(0, 245, 255, 0.1)',
              borderRadius: '1px',
            }}
          >
            <motion.div
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #00f5ff, #b946ff)',
                borderRadius: '1px',
                boxShadow: '0 0 10px rgba(0, 245, 255, 0.5)',
              }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 5, ease: 'easeInOut' }}
            />
          </motion.div>

          {/* Scan Lines */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 245, 255, 0.01) 2px, rgba(0, 245, 255, 0.01) 4px)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
