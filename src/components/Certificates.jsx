import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const certificates = [
  {
    id: 'CERT-001',
    title: 'Customer Relationship Management',
    issuer: 'ERPNext - internship',
    date: '2026',
    credentialId: '3456 xxxx xxxx 2026',
    skills: ['python', 'javascript', 'frappe', 'erpnext'],
    accent: '#00f5ff',
    accentAlt: '#0088aa',
    icon: '🌐',
    network: 'FULLSTACK',
    url: 'https://drive.google.com/file/d/1XA2gb8O88K4r7mNBZSg6Yt1FiS2ROWEc/view?usp=sharing'
  },
  {
    id: 'CERT-002',
    title: 'Cascading Style Sheets',
    issuer: 'HackerRank',
    date: '2025',
    credentialId: '3456 xxxx xxxx 2025',
    skills: ['CSS'],
    accent: '#b946ff',
    accentAlt: '#7a2db8',
    icon: '⚡',
    network: 'FRONTEND',
    url: 'https://www.hackerrank.com/certificates/iframe/cd561b525a94'
  },
  {
    id: 'CERT-003',
    title: 'ADMA Conference',
    issuer: 'ADMA',
    date: '2025',
    credentialId: '3456 xxxx xxxx 2025',
    skills: ['Algorithm', 'graphs'],
    accent: '#4d7cff',
    accentAlt: '#2a4fcc',
    icon: '📐',
    network: 'Graph theory',
    url: 'https://drive.google.com/file/d/1Y4QRqGpvQhGpAp7u5tsr1kZBNEuqluDh/view?usp=sharing'
  },
  {
    id: 'CERT-004',
    title: 'Python Foundational Course',
    issuer: 'Infosys Springboard',
    date: '2025',
    credentialId: '3456 xxxx xxxx 2025',
    skills: ['Python', 'Pandas', 'NumPy', 'Analysis'],
    accent: '#00ff88',
    accentAlt: '#009955',
    icon: '🐍',
    network: 'Python',
    url: 'https://drive.google.com/file/d/1QYLzyIflMP2Bt1QRk9H2bH5IwjsWfJIB/view?usp=sharing'
  },
  {
    id: 'CERT-005',
    title: 'Data Science Foundation',
    issuer: 'LinkedIn',
    date: '2025',
    credentialId: '3456 xxxx xxxx 2025',
    skills: ['React', 'Redux', 'Hooks', 'Next.js'],
    accent: '#61dafb',
    accentAlt: '#2196c9',
    icon: '⚛',
    network: 'REACT',
    url: 'https://drive.google.com/file/d/1chiPECEk06fEM23nMVGrfOTw9SNCT5Ea/view?usp=sharing'
  },
  {
    id: 'CERT-006',
    title: 'Python Flask Course (Basic)',
    issuer: 'LinkedIn',
    date: '2025',
    credentialId: '3456 xxxx xxxx 2025',
    skills: ['Python', 'Flask', 'Socket.IO'],
    accent: '#ed8b00',
    accentAlt: '#b86a00',
    icon: '⛁',
    network: 'DATABASE',
    url: 'https://drive.google.com/file/d/1AE_SiBG6i5AOxzT0B8g2E4ddo0iXk51K/view?usp=sharing'
  },
]

/* ── EMV Chip SVG ── */
function CardChip({ accent }) {
  return (
    <svg width="45" height="34" viewBox="0 0 45 34" fill="none" style={{ filter: `drop-shadow(0 0 4px ${accent}40)` }}>
      <rect x="0.5" y="0.5" width="44" height="33" rx="5" fill={`${accent}15`} stroke={accent} strokeWidth="0.8" />
      <line x1="15" y1="0.5" x2="15" y2="33.5" stroke={accent} strokeWidth="0.4" strokeOpacity="0.5" />
      <line x1="30" y1="0.5" x2="30" y2="33.5" stroke={accent} strokeWidth="0.4" strokeOpacity="0.5" />
      <line x1="0.5" y1="11" x2="44.5" y2="11" stroke={accent} strokeWidth="0.4" strokeOpacity="0.5" />
      <line x1="0.5" y1="22" x2="44.5" y2="22" stroke={accent} strokeWidth="0.4" strokeOpacity="0.5" />
      <rect x="16" y="12" width="13" height="9" rx="1" fill={`${accent}25`} stroke={accent} strokeWidth="0.3" />
    </svg>
  )
}

/* ── Contactless / NFC icon ── */
function ContactlessIcon({ accent }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.6 }}>
      <path d="M8 18C12.4183 18 16 14.4183 16 10" stroke={accent} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M6 14C8.20914 14 10 12.2091 10 10" stroke={accent} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M4 10C4 10 4 10 4 10" stroke={accent} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

/* ── Circuit pattern background ── */
function CircuitPattern({ accent }) {
  return (
    <svg
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.04, pointerEvents: 'none' }}
      viewBox="0 0 400 250"
      preserveAspectRatio="none"
    >
      {/* Horizontal circuit lines */}
      <line x1="0" y1="40" x2="120" y2="40" stroke={accent} strokeWidth="1" />
      <line x1="140" y1="40" x2="200" y2="40" stroke={accent} strokeWidth="1" />
      <circle cx="130" cy="40" r="4" fill={accent} />
      <line x1="280" y1="80" x2="400" y2="80" stroke={accent} strokeWidth="1" />
      <circle cx="280" cy="80" r="3" fill={accent} />
      {/* Vertical */}
      <line x1="130" y1="40" x2="130" y2="120" stroke={accent} strokeWidth="1" />
      <line x1="300" y1="0" x2="300" y2="60" stroke={accent} strokeWidth="1" />
      <circle cx="300" cy="60" r="3" fill={accent} />
      {/* Diagonal */}
      <line x1="50" y1="180" x2="150" y2="130" stroke={accent} strokeWidth="0.5" />
      <line x1="250" y1="200" x2="380" y2="150" stroke={accent} strokeWidth="0.5" />
      {/* Nodes */}
      <circle cx="50" cy="180" r="2" fill={accent} />
      <circle cx="380" cy="150" r="2" fill={accent} />
      <rect x="320" y="170" width="8" height="8" rx="1" fill="none" stroke={accent} strokeWidth="0.5" />
      <rect x="60" y="90" width="6" height="6" rx="1" fill="none" stroke={accent} strokeWidth="0.5" />
    </svg>
  )
}

/* ── Holographic strip ── */
function HoloStrip({ accent, accentAlt, active }) {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      right: 55,
      width: 40,
      height: '100%',
      overflow: 'hidden',
      opacity: active ? 0.25 : 0.1,
      transition: 'opacity 0.4s',
      pointerEvents: 'none',
    }}>
      <motion.div
        animate={active ? {
          backgroundPosition: ['0% 0%', '200% 200%'],
        } : {}}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        style={{
          width: '100%',
          height: '100%',
          background: `repeating-linear-gradient(
            135deg,
            ${accent}00 0px,
            ${accent}40 10px,
            ${accentAlt}30 20px,
            ${accent}00 30px,
            ${accentAlt}20 40px,
            ${accent}00 50px
          )`,
          backgroundSize: '200% 200%',
        }}
      />
    </div>
  )
}

/* ── Single Crypto Card ── */
function CryptoCard({ cert, index, isInView }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -15
    setTilt({ x: y, y: x })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setIsFlipped(false)
    setTilt({ x: 0, y: 0 })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: 20 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ delay: 0.1 + index * 0.12, duration: 0.7, type: 'spring', stiffness: 80 }}
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => setIsFlipped(!isFlipped)}
      style={{
        perspective: '1200px',
        cursor: 'pointer',
        /* Credit card ratio: 85.6mm × 53.98mm ≈ 1.586:1 */
        aspectRatio: '1.586 / 1',
        width: '100%',
        maxWidth: 420,
      }}
    >
      <motion.div
        animate={{
          rotateY: isFlipped ? 180 : 0,
          rotateX: isHovered && !isFlipped ? tilt.x : 0,
          rotateZ: isHovered && !isFlipped ? tilt.y * 0.1 : 0,
        }}
        transition={{
          rotateY: { duration: 0.6, type: 'spring', stiffness: 100 },
          rotateX: { duration: 0.15, ease: 'easeOut' },
          rotateZ: { duration: 0.15, ease: 'easeOut' },
        }}
        style={{
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          position: 'relative',
        }}
      >
        {/* ═══════════ FRONT FACE ═══════════ */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backfaceVisibility: 'hidden',
          borderRadius: '16px',
          overflow: 'hidden',
          background: `linear-gradient(145deg, rgba(12,12,30,0.97) 0%, ${cert.accent}08 50%, rgba(8,8,22,0.98) 100%)`,
          border: `1px solid ${isHovered ? cert.accent + '50' : 'rgba(255,255,255,0.06)'}`,
          boxShadow: isHovered
            ? `0 20px 60px rgba(0,0,0,0.6), 0 0 40px ${cert.accent}20, inset 0 1px 0 ${cert.accent}15`
            : '0 10px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03)',
          padding: '1.5rem 1.75rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transition: 'border-color 0.4s, box-shadow 0.4s',
        }}>
          <CircuitPattern accent={cert.accent} />
          <HoloStrip accent={cert.accent} accentAlt={cert.accentAlt} active={isHovered} />

          {/* ── Top Row: issuer + network ── */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 1 }}>
            <div>
              <div style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: '0.65rem',
                fontWeight: 700,
                color: cert.accent,
                letterSpacing: '3px',
                marginBottom: '2px',
                textShadow: isHovered ? `0 0 12px ${cert.accent}60` : 'none',
                transition: 'text-shadow 0.3s',
              }}>
                {cert.issuer}
              </div>
              <div style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: '0.45rem',
                color: '#4a5568',
                letterSpacing: '2px',
              }}>
                {cert.id}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ContactlessIcon accent={cert.accent} />
              <motion.span
                animate={isHovered ? { scale: [1, 1.15, 1] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ fontSize: '1.3rem', filter: isHovered ? `drop-shadow(0 0 8px ${cert.accent})` : 'none' }}
              >
                {cert.icon}
              </motion.span>
            </div>
          </div>

          {/* ── Chip + holographic area ── */}
          <div style={{ zIndex: 1, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <CardChip accent={cert.accent} />
            {/* Mini verified indicator */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 4,
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '0.45rem', color: '#00ff88', letterSpacing: '1px',
            }}>
              <span style={{
                width: 4, height: 4, borderRadius: '50%', background: '#00ff88',
                boxShadow: '0 0 4px #00ff88', display: 'inline-block',
                animation: 'pulse-text 1.5s infinite',
              }} />
              VALID
            </div>
          </div>

          {/* ── Card Number ── */}
          <div style={{ zIndex: 1 }}>
            <motion.div
              animate={isHovered ? { letterSpacing: '4px' } : { letterSpacing: '3px' }}
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: 'clamp(0.85rem, 2vw, 1.05rem)',
                color: '#e0e8ff',
                textShadow: isHovered ? `0 0 12px ${cert.accent}40` : 'none',
                transition: 'text-shadow 0.3s',
                fontWeight: 500,
              }}
            >
              {cert.credentialId}
            </motion.div>
          </div>

          {/* ── Bottom Row: title + date ── */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', zIndex: 1 }}>
            <div>
              <div style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: '0.4rem',
                color: '#4a5568',
                letterSpacing: '2px',
                marginBottom: '2px',
              }}>
                CERTIFICATE HOLDER
              </div>
              <div style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: '0.55rem',
                fontWeight: 600,
                color: '#e0e8ff',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                maxWidth: 200,
                lineHeight: 1.3,
              }}>
                {cert.title}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: '0.4rem',
                color: '#4a5568',
                letterSpacing: '2px',
                marginBottom: '2px',
              }}>
                VALID THRU
              </div>
              <div style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: '0.7rem',
                color: '#e0e8ff',
                letterSpacing: '1px',
              }}>
                ∞/{cert.date}
              </div>
            </div>
          </div>

          {/* ── Network logo (bottom-right corner) ── */}
          <div style={{
            position: 'absolute',
            bottom: 12,
            right: 18,
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '0.4rem',
            fontWeight: 600,
            color: cert.accent,
            letterSpacing: '2px',
            opacity: 0.4,
            zIndex: 1,
          }}>
            {cert.network}
          </div>

          {/* ── Edge glow on hover ── */}
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '16px',
                pointerEvents: 'none',
                background: `radial-gradient(ellipse at ${50 + tilt.y * 3}% ${50 - tilt.x * 3}%, ${cert.accent}12, transparent 60%)`,
                zIndex: 0,
              }}
            />
          )}
        </div>

        {/* ═══════════ BACK FACE ═══════════ */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          borderRadius: '16px',
          overflow: 'hidden',
          background: `linear-gradient(160deg, rgba(12,12,30,0.98), ${cert.accent}10, rgba(8,8,22,0.99))`,
          border: `1px solid ${cert.accent}40`,
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
        }}>
          <CircuitPattern accent={cert.accent} />

          {/* Magnetic strip */}
          <div style={{
            width: '100%',
            height: 38,
            background: `linear-gradient(90deg, ${cert.accent}20, rgba(20,20,40,0.9), ${cert.accentAlt}15)`,
            marginTop: '1rem',
          }} />

          {/* Signature strip / credential area */}
          <div style={{
            margin: '0.75rem 1.5rem',
            padding: '0.6rem 0.75rem',
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div>
              <div style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: '0.4rem',
                color: '#4a5568',
                letterSpacing: '2px',
                marginBottom: 3,
              }}>
                CREDENTIAL VERIFICATION
              </div>
              <div style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: '0.65rem',
                color: '#e0e8ff',
                letterSpacing: '2px',
              }}>
                {cert.credentialId}
              </div>
            </div>
            <div style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '0.7rem',
              fontWeight: 800,
              color: cert.accent,
              letterSpacing: '1px',
              opacity: 0.7,
            }}>
              CVV
            </div>
          </div>

          {/* Skills encoded as "security features" */}
          <div style={{ padding: '0 1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <div style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '0.4rem',
              color: '#4a5568',
              letterSpacing: '2px',
            }}>
              ENCODED TECHNOLOGIES
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
              {cert.skills.map(skill => (
                <span key={skill} style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: '0.5rem',
                  padding: '0.15rem 0.5rem',
                  border: `1px solid ${cert.accent}30`,
                  borderRadius: '2px',
                  color: cert.accent,
                  letterSpacing: '1px',
                  background: `${cert.accent}08`,
                }}>
                  {skill}
                </span>
              ))}
            </div>

            {/* View Certificate Button */}
            <motion.button
              whileHover={cert.url ? { scale: 1.03, boxShadow: `0 0 20px ${cert.accent}40` } : {}}
              whileTap={cert.url ? { scale: 0.97 } : {}}
              onClick={(e) => {
                e.stopPropagation()
                if (cert.url) window.open(cert.url, '_blank')
              }}
              style={{
                width: '100%',
                padding: '0.5rem',
                background: cert.url ? `${cert.accent}10` : 'rgba(255,255,255,0.02)',
                border: `1px solid ${cert.url ? cert.accent + '50' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: '4px',
                color: cert.url ? cert.accent : '#4a5568',
                fontFamily: "'Orbitron', sans-serif",
                fontSize: '0.5rem',
                fontWeight: 600,
                letterSpacing: '3px',
                cursor: cert.url ? 'pointer' : 'default',
                transition: 'all 0.3s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              {cert.url ? '◈ VIEW CERTIFICATE →' : '◈ LINK PENDING'}
            </motion.button>
          </div>

          {/* Bottom info */}
          <div style={{
            padding: '0.6rem 1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: `1px solid ${cert.accent}10`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{
                width: 5, height: 5, borderRadius: '50%', background: '#00ff88',
                boxShadow: '0 0 6px #00ff88',
                animation: 'pulse-text 1.5s infinite',
              }} />
              <span style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: '0.45rem',
                color: '#00ff88',
                letterSpacing: '1px',
              }}>
                BLOCKCHAIN VERIFIED
              </span>
            </div>
            <span style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '0.4rem',
              color: cert.accent,
              letterSpacing: '2px',
              opacity: 0.5,
            }}>
              {cert.network}
            </span>
          </div>

          {/* Flip hint */}
          <motion.div
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              position: 'absolute',
              bottom: 6,
              left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '0.4rem',
              color: '#4a5568',
              letterSpacing: '1px',
            }}
          >
            ↻ TAP TO RETURN
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Certificates() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="section" id="certificates" ref={ref}>
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        🏆 CREDENTIAL VAULT
      </motion.div>

      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
        animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Crypto Credentials
      </motion.h2>

      <motion.p
        style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '0.7rem',
          color: '#4a5568',
          letterSpacing: '3px',
          marginBottom: '2.5rem',
          marginTop: '-1.5rem',
        }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.4 }}
      >
        {'[ HOVER TO INSPECT // CLICK TO FLIP ]'}
      </motion.p>

      {/* Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2rem',
        width: '100%',
        maxWidth: '920px',
        justifyItems: 'center',
      }}>
        {certificates.map((cert, i) => (
          <CryptoCard key={cert.id} cert={cert} index={i} isInView={isInView} />
        ))}
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1, duration: 0.6 }}
        style={{
          display: 'flex',
          gap: '2rem',
          marginTop: '3rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {[
          { label: 'CARDS ISSUED', value: certificates.length, color: '#00f5ff' },
          { label: 'VERIFIED', value: certificates.length, color: '#00ff88' },
          { label: 'NETWORKS', value: [...new Set(certificates.map(c => c.issuer))].length, color: '#b946ff' },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            whileHover={{ scale: 1.08, borderColor: stat.color + '50' }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.3rem',
              padding: '0.75rem 1.5rem',
              border: '1px solid rgba(0,245,255,0.08)',
              borderRadius: '8px',
              background: 'rgba(10,10,26,0.4)',
              transition: 'all 0.3s',
            }}
          >
            <span style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '1.4rem',
              fontWeight: 800,
              color: stat.color,
              textShadow: `0 0 15px ${stat.color}40`,
            }}>
              {stat.value}
            </span>
            <span style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '0.5rem',
              color: '#4a5568',
              letterSpacing: '2px',
            }}>
              {stat.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
