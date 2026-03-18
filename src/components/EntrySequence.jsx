import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const bootSequence = [
  { text: '> Initializing Neural Core...', delay: 400 },
  { text: '> Mapping synaptic pathways... [OK]', delay: 1000 },
  { text: '> Loading consciousness matrix... [OK]', delay: 1600 },
  { text: '> Calibrating interface protocols...', delay: 2200 },
  { text: '> Establishing quantum link... [OK]', delay: 2800 },
  { text: '> Accessing Neural Interface...', delay: 3400 },
  { text: '> Identity Verified ✓', delay: 4200 },
]

function EntryParticles() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = Array.from({ length: 80 }, () => ({
      x: canvas.width / 2 + (Math.random() - 0.5) * 100,
      y: canvas.height / 2 + (Math.random() - 0.5) * 100,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 2 + 0.5,
      life: 1,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        p.vx *= 1.005
        p.vy *= 1.005

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 245, 255, ${Math.max(0, p.life)})`
        ctx.shadowBlur = 10
        ctx.shadowColor = '#00f5ff'
        ctx.fill()
        ctx.shadowBlur = 0
      })

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    />
  )
}

export default function EntrySequence({ onComplete }) {
  const [phase, setPhase] = useState('boot')
  const [visibleLines, setVisibleLines] = useState([])
  const [showIdentity, setShowIdentity] = useState(false)
  const [coreScale, setCoreScale] = useState(0)
  const [ringPulse, setRingPulse] = useState(false)

  useEffect(() => {
    // Animate core appearing
    setTimeout(() => setCoreScale(1), 200)
    setTimeout(() => setRingPulse(true), 600)

    // Show boot lines sequentially
    bootSequence.forEach((line) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, line.text])
      }, line.delay)
    })

    // Show identity after boot
    setTimeout(() => setShowIdentity(true), 5000)

    // Start zoom transition
    setTimeout(() => setPhase('zoom'), 6500)

    // Complete entry
    setTimeout(() => onComplete(), 7300)
  }, [onComplete])

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="entry-screen"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{ overflow: 'hidden' }}
        >
          {/* Scan lines overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,245,255,0.015) 2px, rgba(0,245,255,0.015) 4px)',
              zIndex: 5,
            }}
          />

          {/* Grid background */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              opacity: 0.5,
            }}
          />

          {/* Entry Particles */}
          <EntryParticles />

          {/* Core Orb */}
          <motion.div
            style={{
              position: 'relative',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            animate={phase === 'zoom' ? { scale: 20, opacity: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeIn' }}
          >
            {/* Outer rings */}
            {[80, 60, 40].map((size, i) => (
              <motion.div
                key={i}
                style={{
                  position: 'absolute',
                  width: `${size + 60}px`,
                  height: `${size + 60}px`,
                  borderRadius: '50%',
                  border: `1px solid rgba(${i === 1 ? '185,70,255' : '0,245,255'}, ${0.15 - i * 0.03})`,
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={ringPulse ? {
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0, 0.5],
                } : { scale: 0, opacity: 0 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: 'easeOut',
                }}
              />
            ))}

            {/* Core glow */}
            <motion.div
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(0,245,255,0.8) 0%, rgba(185,70,255,0.4) 40%, rgba(77,124,255,0.1) 60%, transparent 70%)',
                position: 'relative',
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: coreScale,
                opacity: 1,
                boxShadow: [
                  '0 0 30px rgba(0,245,255,0.3), 0 0 60px rgba(0,245,255,0.2), 0 0 100px rgba(185,70,255,0.1)',
                  '0 0 50px rgba(0,245,255,0.5), 0 0 100px rgba(0,245,255,0.3), 0 0 150px rgba(185,70,255,0.2)',
                  '0 0 30px rgba(0,245,255,0.3), 0 0 60px rgba(0,245,255,0.2), 0 0 100px rgba(185,70,255,0.1)',
                ],
              }}
              transition={{
                scale: { duration: 0.8, type: 'spring', stiffness: 200 },
                opacity: { duration: 0.5 },
                boxShadow: { duration: 2, repeat: Infinity },
              }}
            >
              {/* Inner rotating ring */}
              <motion.div
                style={{
                  position: 'absolute',
                  inset: '10px',
                  borderRadius: '50%',
                  border: '1px solid rgba(0,245,255,0.4)',
                  borderTopColor: 'transparent',
                  borderLeftColor: 'transparent',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />

              {/* Second inner ring */}
              <motion.div
                style={{
                  position: 'absolute',
                  inset: '20px',
                  borderRadius: '50%',
                  border: '1px solid rgba(185,70,255,0.3)',
                  borderBottomColor: 'transparent',
                  borderRightColor: 'transparent',
                }}
                animate={{ rotate: -360 }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              />

              {/* Core center pulse */}
              <motion.div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: '#00f5ff',
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  boxShadow: [
                    '0 0 10px #00f5ff',
                    '0 0 25px #00f5ff, 0 0 50px #b946ff',
                    '0 0 10px #00f5ff',
                  ],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>

          {/* Boot Text */}
          <motion.div
            style={{
              marginTop: '2.5rem',
              minHeight: '200px',
              position: 'relative',
              zIndex: 10,
              width: '100%',
              maxWidth: '400px',
              padding: '0 1rem',
            }}
            animate={phase === 'zoom' ? { opacity: 0, y: -30 } : {}}
            transition={{ duration: 0.3 }}
          >
            {visibleLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30, filter: 'blur(4px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  color: line.includes('✓') ? '#00ff88' : line.includes('[OK]') ? '#00f5ff' : '#8892b0',
                  textAlign: 'left',
                  marginBottom: '0.4rem',
                  fontSize: '0.8rem',
                  letterSpacing: '1px',
                }}
              >
                {line}
              </motion.div>
            ))}

            {/* Identity Reveal */}
            <AnimatePresence>
              {showIdentity && (
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.8, type: 'spring', stiffness: 150 }}
                  style={{ marginTop: '2rem', textAlign: 'center' }}
                >
                  {/* Decorative line */}
                  <motion.div
                    style={{
                      width: '0%',
                      height: '1px',
                      background: 'linear-gradient(90deg, transparent, #00f5ff, transparent)',
                      margin: '0 auto 1rem',
                    }}
                    animate={{ width: '80%' }}
                    transition={{ duration: 0.6 }}
                  />

                  <motion.div
                    style={{
                      fontFamily: "'Orbitron', sans-serif",
                      fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
                      fontWeight: 800,
                      background: 'linear-gradient(135deg, #00f5ff, #b946ff, #4d7cff)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      letterSpacing: '4px',
                      backgroundSize: '200% 200%',
                      animation: 'border-flow 3s ease infinite',
                    }}
                  >
                    P MOHAMED AARIS
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      color: '#4a5568',
                      fontSize: '0.75rem',
                      letterSpacing: '4px',
                      marginTop: '0.5rem',
                    }}
                  >
                    {'// DIGITAL PROFILE LOADED'}
                  </motion.div>

                  {/* Decorative line */}
                  <motion.div
                    style={{
                      width: '0%',
                      height: '1px',
                      background: 'linear-gradient(90deg, transparent, #b946ff, transparent)',
                      margin: '1rem auto 0',
                    }}
                    animate={{ width: '60%' }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: '2.5rem',
              width: '250px',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <motion.span
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: '0.6rem',
                color: '#4a5568',
                letterSpacing: '2px',
              }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              LOADING NEURAL INTERFACE
            </motion.span>
            <div
              style={{
                width: '100%',
                height: '2px',
                background: 'rgba(0, 245, 255, 0.1)',
                borderRadius: '1px',
                overflow: 'hidden',
              }}
            >
              <motion.div
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #00f5ff, #b946ff, #4d7cff)',
                  borderRadius: '1px',
                  boxShadow: '0 0 10px rgba(0, 245, 255, 0.5), 0 0 20px rgba(185, 70, 255, 0.3)',
                }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 6.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
