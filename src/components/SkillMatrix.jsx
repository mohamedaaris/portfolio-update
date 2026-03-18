import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const skills = [
  { name: 'HTML', icon: '⟨/⟩', proficiency: 95, color: '#e44d26', desc: 'Semantic markup & accessibility' },
  { name: 'CSS', icon: '✦', proficiency: 90, color: '#264de4', desc: 'Responsive design & animations' },
  { name: 'JavaScript', icon: '⚡', proficiency: 88, color: '#f7df1e', desc: 'ES6+, async, DOM manipulation' },
  { name: 'React', icon: '⚛', proficiency: 85, color: '#61dafb', desc: 'Hooks, state management, SPA' },
  { name: 'Next.js', icon: '▲', proficiency: 80, color: '#ffffff', desc: 'SSR, SSG, API routes' },
  { name: 'Python', icon: '🐍', proficiency: 82, color: '#3776ab', desc: 'Scripting, automation, ML basics' },
  { name: 'Flask', icon: '🧪', proficiency: 75, color: '#00d4aa', desc: 'REST APIs, backend services' },
  { name: 'Java', icon: '☕', proficiency: 78, color: '#ed8b00', desc: 'OOP, data structures, algorithms' },
  { name: 'MySQL', icon: '⛁', proficiency: 80, color: '#00758f', desc: 'Queries, schemas, optimization' },
  { name: 'Flutter', icon: '◆', proficiency: 72, color: '#02569b', desc: 'Cross-platform mobile apps' },
  { name: 'Git', icon: '⑃', proficiency: 85, color: '#f05032', desc: 'Version control, branching' },
  { name: 'Node.js', icon: '⬢', proficiency: 78, color: '#68a063', desc: 'Server-side JavaScript runtime' },
]

/* ── SVG connection lines from center to each node ── */
function ConnectionLines({ positions, centerX, centerY, hoveredIdx }) {
  return (
    <svg
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {positions.map((pos, i) => {
        const isActive = hoveredIdx === i
        const skill = skills[i]
        return (
          <g key={i}>
            <defs>
              <filter id={`glow-${i}`}>
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <line
              x1={centerX}
              y1={centerY}
              x2={pos.x}
              y2={pos.y}
              stroke={isActive ? skill.color : '#00f5ff'}
              strokeWidth={isActive ? 2 : 0.7}
              strokeOpacity={isActive ? 0.8 : 0.15}
              filter={isActive ? `url(#glow-${i})` : undefined}
              style={{ transition: 'all 0.4s ease' }}
            />
            {isActive && (
              <circle r="3" fill={skill.color} filter={`url(#glow-${i})`}>
                <animateMotion
                  dur="1s"
                  repeatCount="indefinite"
                  path={`M${centerX},${centerY} L${pos.x},${pos.y}`}
                />
              </circle>
            )}
          </g>
        )
      })}
    </svg>
  )
}

/* ── Single Orbital Skill Node (circular) ── */
function OrbitalNode({ skill, index, isInView, angle, radius, hovered, onHover, onLeave, onClick, containerW, containerH }) {
  const cx = containerW / 2
  const cy = containerH / 2
  const x = cx + Math.cos(angle) * radius * 1.1
  const y = cy + Math.sin(angle) * radius * 0.85

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: 0.2 + index * 0.08, type: 'spring', stiffness: 160, damping: 14 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
        zIndex: hovered ? 20 : 5,
        cursor: 'pointer',
      }}
    >
      {/* Outer pulse ring */}
      <motion.div
        animate={hovered ? {
          scale: [1, 1.8, 1],
          opacity: [0.5, 0, 0.5],
        } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{
          position: 'absolute',
          inset: -8,
          borderRadius: '50%',
          border: `1px solid ${skill.color}`,
          opacity: 0,
        }}
      />

      {/* Node circle */}
      <motion.div
        animate={{
          y: [0, -4 - (index % 3) * 2, 0],
          boxShadow: hovered
            ? `0 0 30px ${skill.color}80, 0 0 60px ${skill.color}40, inset 0 0 20px ${skill.color}30`
            : `0 0 10px ${skill.color}30`,
        }}
        transition={{
          y: { duration: 3 + (index % 4) * 0.5, repeat: Infinity, ease: 'easeInOut' },
          boxShadow: { duration: 0.3 },
        }}
        whileHover={{ scale: 1.25 }}
        style={{
          width: hovered ? 80 : 60,
          height: hovered ? 80 : 60,
          borderRadius: '50%',
          background: `radial-gradient(circle at 40% 35%, ${skill.color}25, rgba(10,10,26,0.95) 70%)`,
          border: `1.5px solid ${hovered ? skill.color : skill.color + '50'}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'width 0.3s, height 0.3s, border-color 0.3s',
          position: 'relative',
        }}
      >
        <span style={{
          fontSize: hovered ? '1.4rem' : '1.1rem',
          transition: 'font-size 0.3s',
          filter: hovered ? `drop-shadow(0 0 6px ${skill.color})` : 'none',
        }}>
          {skill.icon}
        </span>
        <span style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '0.5rem',
          color: hovered ? skill.color : '#8892b0',
          letterSpacing: '1px',
          marginTop: '2px',
          transition: 'color 0.3s',
          textShadow: hovered ? `0 0 8px ${skill.color}` : 'none',
          whiteSpace: 'nowrap',
        }}>
          {skill.name}
        </span>
      </motion.div>
    </motion.div>
  )
}

/* ── Expanded detail panel on click ── */
function SkillDetailPanel({ skill, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.7, y: 20 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 100,
        background: 'rgba(10,10,26,0.95)',
        border: `1px solid ${skill.color}60`,
        borderRadius: '16px',
        padding: '2rem 2.5rem',
        minWidth: 280,
        maxWidth: 340,
        backdropFilter: 'blur(20px)',
        boxShadow: `0 0 40px ${skill.color}30, 0 0 80px ${skill.color}15`,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <motion.button
        onClick={onClose}
        whileHover={{ scale: 1.2, color: '#ff5f56' }}
        style={{
          position: 'absolute', top: 12, right: 14,
          background: 'none', border: 'none', color: '#4a5568',
          fontFamily: "'Share Tech Mono', monospace", fontSize: '0.9rem', cursor: 'pointer',
        }}
      >✕</motion.button>

      <div style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '0.75rem', filter: `drop-shadow(0 0 12px ${skill.color})` }}>
        {skill.icon}
      </div>

      <h3 style={{
        fontFamily: "'Orbitron', sans-serif", fontSize: '1.1rem', fontWeight: 700,
        color: skill.color, textAlign: 'center', letterSpacing: '2px', marginBottom: '0.25rem',
      }}>{skill.name}</h3>

      <p style={{
        fontFamily: "'Rajdhani', sans-serif", fontSize: '0.85rem', color: '#8892b0',
        textAlign: 'center', lineHeight: 1.6, marginBottom: '1.25rem',
      }}>{skill.desc}</p>

      <div style={{
        fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: '#4a5568',
        letterSpacing: '2px', marginBottom: '0.4rem', display: 'flex', justifyContent: 'space-between',
      }}>
        <span>PROFICIENCY</span>
        <span style={{ color: skill.color }}>{skill.proficiency}%</span>
      </div>
      <div style={{ width: '100%', height: 6, background: 'rgba(255,255,255,0.05)', borderRadius: 3, overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${skill.proficiency}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{
            height: '100%', borderRadius: 3,
            background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)`,
            boxShadow: `0 0 12px ${skill.color}80`,
          }}
        />
      </div>

      <div style={{
        marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#00ff88', letterSpacing: '1px',
      }}>
        <motion.span
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          style={{ width: 5, height: 5, borderRadius: '50%', background: '#00ff88', display: 'inline-block' }}
        />
        MODULE ACTIVE
      </div>
    </motion.div>
  )
}

export default function SkillMatrix() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [hoveredIdx, setHoveredIdx] = useState(-1)
  const [selectedSkill, setSelectedSkill] = useState(null)
  const [containerSize, setContainerSize] = useState({ w: 800, h: 600 })
  const containerRef = useRef(null)

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setContainerSize({ w: rect.width, h: rect.height })
      }
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const W = containerSize.w
  const H = containerSize.h
  const cx = W / 2
  const cy = H / 2

  const innerCount = 6
  const outerCount = skills.length - innerCount
  const radiusInner = Math.min(W, H) * 0.28
  const radiusOuter = Math.min(W, H) * 0.44

  const nodePositions = skills.map((_, i) => {
    const isInner = i < innerCount
    const subIndex = isInner ? i : i - innerCount
    const total = isInner ? innerCount : outerCount
    const r = isInner ? radiusInner : radiusOuter
    const offset = isInner ? -Math.PI / 2 : -Math.PI / 2 + Math.PI / total
    const angle = offset + (subIndex / total) * Math.PI * 2
    return {
      x: cx + Math.cos(angle) * r * 1.15,
      y: cy + Math.sin(angle) * r * 0.85,
      angle,
      radius: r,
    }
  })

  return (
    <section className="section" id="skills" ref={ref}>
      <motion.div className="section-header" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
        ⚙️ SKILL MATRIX
      </motion.div>

      <motion.h2 className="section-title" initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }} animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}} transition={{ delay: 0.2, duration: 0.6 }}>
        Technology Arsenal
      </motion.h2>

      <motion.p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.7rem', color: '#4a5568', letterSpacing: '3px', marginBottom: '1rem', marginTop: '-1.5rem' }} initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}>
        {'[ HOVER TO INSPECT // CLICK TO EXPAND ]'}
      </motion.p>

      {/* ── Orbital Arena ── */}
      <div ref={containerRef} onClick={() => setSelectedSkill(null)} style={{ position: 'relative', width: '100%', maxWidth: 900, height: '65vh', minHeight: 500 }}>
        <ConnectionLines positions={nodePositions} centerX={cx} centerY={cy} hoveredIdx={hoveredIdx} />

        {/* Orbit ring guides */}
        {[radiusInner, radiusOuter].map((r, i) => (
          <motion.div key={i} initial={{ opacity: 0, scale: 0.6 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.3 + i * 0.2, duration: 0.8 }}
            style={{ position: 'absolute', left: cx, top: cy, width: r * 2.3, height: r * 1.7, marginLeft: -r * 1.15, marginTop: -r * 0.85, borderRadius: '50%', border: `1px solid rgba(0,245,255,${0.06 - i * 0.02})`, pointerEvents: 'none' }}
          />
        ))}

        {/* Center core node */}
        <motion.div initial={{ scale: 0 }} animate={isInView ? { scale: 1 } : {}} transition={{ delay: 0.1, type: 'spring', stiffness: 120 }}
          style={{ position: 'absolute', left: cx, top: cy, transform: 'translate(-50%, -50%)', zIndex: 10 }}
        >
          <motion.div
            animate={{ boxShadow: ['0 0 20px rgba(0,245,255,0.3), 0 0 50px rgba(0,245,255,0.15)', '0 0 35px rgba(0,245,255,0.5), 0 0 70px rgba(185,70,255,0.2)', '0 0 20px rgba(0,245,255,0.3), 0 0 50px rgba(0,245,255,0.15)'] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ width: 90, height: 90, borderRadius: '50%', background: 'radial-gradient(circle at 40% 35%, rgba(0,245,255,0.15), rgba(10,10,26,0.98) 70%)', border: '2px solid rgba(0,245,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}
          >
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.55rem', fontWeight: 700, color: '#00f5ff', letterSpacing: '2px', textAlign: 'center', lineHeight: 1.4 }}>
              SKILL<br/>CORE
            </span>
          </motion.div>
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            style={{ position: 'absolute', inset: -12, borderRadius: '50%', border: '1px solid rgba(0,245,255,0.2)', borderTopColor: 'transparent', borderLeftColor: 'transparent' }}
          />
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            style={{ position: 'absolute', inset: -24, borderRadius: '50%', border: '1px dashed rgba(185,70,255,0.12)', borderBottomColor: 'transparent' }}
          />
        </motion.div>

        {/* Orbital skill nodes */}
        {skills.map((skill, i) => (
          <OrbitalNode key={skill.name} skill={skill} index={i} isInView={isInView}
            angle={nodePositions[i].angle} radius={nodePositions[i].radius}
            hovered={hoveredIdx === i}
            onHover={() => setHoveredIdx(i)} onLeave={() => setHoveredIdx(-1)}
            onClick={(e) => { e.stopPropagation(); setSelectedSkill(skill) }}
            containerW={W} containerH={H}
          />
        ))}

        <AnimatePresence>
          {selectedSkill && <SkillDetailPanel skill={selectedSkill} onClose={() => setSelectedSkill(null)} />}
        </AnimatePresence>
      </div>
    </section>
  )
}
