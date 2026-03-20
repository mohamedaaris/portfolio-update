import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'


function TypewriterText({ text, delay = 0, speed = 40 }) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    let i = 0
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1))
          i++
        } else {
          clearInterval(interval)
        }
      }, speed)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(timeout)
  }, [text, delay, speed])

  return (
    <span>
      {displayed}
      <span style={{ animation: 'pulse-text 0.8s infinite', color: 'var(--color-cyan)' }}>|</span>
    </span>
  )
}

function HexGrid() {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
      opacity: 0.03,
    }}>
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: '80px',
            height: '80px',
            border: '1px solid #00f5ff',
            transform: 'rotate(45deg)',
            left: `${(i % 5) * 22}%`,
            top: `${Math.floor(i / 5) * 30}%`,
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  )
}

export default function CoreIdentity() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section className="section core-identity" id="identity" ref={ref}>
      <HexGrid />

      <motion.div
        className="core-center"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        {/* Core Avatar with multiple rings */}
        <motion.div
          className="core-avatar"
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : {}}
          transition={{ duration: 1, type: 'spring', stiffness: 100 }}
          whileHover={{ scale: 1.1 }}
          style={{ cursor: 'pointer' }}
        >
          {/* Rotating Ring 1 */}
          <motion.div
            className="core-avatar-ring"
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          />
          {/* Rotating Ring 2 */}
          <motion.div
            className="core-avatar-ring-2"
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          />
          {/* Third ring */}
          <motion.div
            style={{
              position: 'absolute',
              inset: '-45px',
              borderRadius: '50%',
              border: '1px dotted rgba(77, 124, 255, 0.15)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
          />

          {/* User Photo */}
          <img
            src="/assets/aaris.jpeg"
            alt="P Mohamed Aaris"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '50%',
              position: 'relative',
              zIndex: 10,
              boxShadow: '0 0 20px rgba(0, 245, 255, 0.4)',
            }}
          />

          {/* Pulse waves on hover */}
          {[1, 2, 3].map(i => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                inset: '-5px',
                borderRadius: '50%',
                border: '1px solid rgba(0, 245, 255, 0.2)',
              }}
              animate={{
                scale: [1, 2 + i * 0.5],
                opacity: [0.4, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.5,
                ease: 'easeOut',
              }}
            />
          ))}
        </motion.div>

        {/* Name */}
        <motion.h1
          className="core-name"
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          P MOHAMED AARIS
        </motion.h1>

        {/* Role with typewriter effect */}
        <motion.div
          className="core-role"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          {isInView && <TypewriterText text="Full Stack Developer & Digital Architect" delay={800} speed={35} />}
        </motion.div>

        {/* Decorative divider */}
        <motion.div
          style={{
            width: '0px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, #00f5ff, #b946ff, transparent)',
            marginTop: '1.5rem',
          }}
          animate={isInView ? { width: '300px' } : {}}
          transition={{ delay: 1.5, duration: 0.8 }}
        />

        {/* Bio */}
        <motion.p
          className="core-bio"
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.7 }}
        >
          A skilled web and full-stack developer with comprehensive expertise in front-end 
          and back-end technologies. Currently pursuing a CSE degree at Rajalakshmi Engineering 
          College, Chennai — graduating in 2028. Passionate about crafting visually stunning, 
          highly functional digital experiences that push the boundaries of web technology.
        </motion.p>

        {/* Status */}
        <motion.div
          className="core-status"
          initial={{ opacity: 0, scale: 0.5, rotate: -5 }}
          animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
          transition={{ delay: 1.3, duration: 0.5, type: 'spring' }}
          whileHover={{
            boxShadow: '0 0 25px rgba(0, 255, 136, 0.2)',
            scale: 1.05,
          }}
        >
          <span className="core-status-dot" />
          SYSTEM ACTIVE
        </motion.div>

        {/* Meta Information */}
        <motion.div
          className="core-meta"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          {[
            { label: 'LOCATION', value: 'Chennai, India' },
            { label: 'INSTITUTE', value: 'REC' },
            { label: 'DEGREE', value: 'CSE (2028)' },
          ].map((item, i) => (
            <motion.span
              key={item.label}
              className="core-meta-item"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.6 + i * 0.1 }}
              whileHover={{ color: '#00f5ff' }}
            >
              {item.label}: <span className="core-meta-value">{item.value}</span>
            </motion.span>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: '-5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
          }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 2 }}
        >
          <motion.span
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '0.6rem',
              color: '#4a5568',
              letterSpacing: '3px',
            }}
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            SCROLL TO EXPLORE
          </motion.span>
          <motion.div
            style={{
              width: '1px',
              height: '0px',
              background: 'linear-gradient(180deg, #00f5ff, transparent)',
            }}
            animate={{ height: '30px', opacity: [0.5, 1, 0.5] }}
            transition={{
              height: { delay: 2.2, duration: 0.5 },
              opacity: { duration: 2, repeat: Infinity },
            }}
          />
          <motion.div
            style={{
              width: '6px',
              height: '6px',
              borderRight: '1px solid #00f5ff',
              borderBottom: '1px solid #00f5ff',
              transform: 'rotate(45deg)',
            }}
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
