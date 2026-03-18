import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function CoreIdentity() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="section core-identity" id="identity" ref={ref}>
      <motion.div
        className="core-center"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Core Avatar */}
        <motion.div
          className="core-avatar"
          animate={{ boxShadow: ['0 0 20px rgba(0,245,255,0.3)', '0 0 60px rgba(0,245,255,0.5)', '0 0 20px rgba(0,245,255,0.3)'] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="core-avatar-ring" />
          <div className="core-avatar-ring-2" />
          {/* Initials inside the orb */}
          <span
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '2.5rem',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #00f5ff, #b946ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            A
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          className="core-name"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          P MOHAMED AARIS
        </motion.h1>

        {/* Role */}
        <motion.p
          className="core-role"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Full Stack Developer & Digital Architect
        </motion.p>

        {/* Bio */}
        <motion.p
          className="core-bio"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          A skilled web and full-stack developer with comprehensive expertise in front-end 
          and back-end technologies. Currently pursuing a CSE degree at Rajalakshmi Engineering 
          College, Chennai — graduating in 2028. Passionate about crafting visually stunning, 
          highly functional digital experiences that push the boundaries of web technology.
        </motion.p>

        {/* Status */}
        <motion.div
          className="core-status"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.4 }}
        >
          <span className="core-status-dot" />
          SYSTEM ACTIVE
        </motion.div>

        {/* Meta Information */}
        <motion.div
          className="core-meta"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          <span className="core-meta-item">
            LOCATION: <span className="core-meta-value">Chennai, India</span>
          </span>
          <span className="core-meta-item">
            INSTITUTE: <span className="core-meta-value">Rajalakshmi Engineering College</span>
          </span>
          <span className="core-meta-item">
            DEGREE: <span className="core-meta-value">CSE (2028)</span>
          </span>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: '-4rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
          }}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '0.65rem',
              color: '#4a5568',
              letterSpacing: '2px',
            }}
          >
            SCROLL TO EXPLORE
          </span>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
            <rect x="1" y="1" width="14" height="22" rx="7" stroke="#4a5568" strokeWidth="1" />
            <motion.circle
              cx="8"
              cy="8"
              r="2"
              fill="#00f5ff"
              animate={{ cy: [8, 16, 8] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
