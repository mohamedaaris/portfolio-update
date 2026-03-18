import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

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

function SkillNode({ skill, index, isInView }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className="skill-node"
      initial={{ opacity: 0, scale: 0, y: 50 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{
        delay: 0.15 + index * 0.08,
        duration: 0.6,
        type: 'spring',
        stiffness: 180,
        damping: 15,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderColor: hovered ? `${skill.color}90` : 'rgba(0, 245, 255, 0.12)',
        boxShadow: hovered
          ? `0 0 25px ${skill.color}30, 0 0 50px ${skill.color}15, inset 0 0 30px ${skill.color}08`
          : 'none',
        transition: 'border-color 0.4s, box-shadow 0.4s',
      }}
    >
      {/* Top glow line */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: '10%',
          right: '10%',
          height: '1px',
          background: `linear-gradient(90deg, transparent, ${skill.color}, transparent)`,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s',
        }}
      />

      {/* Icon with pulse */}
      <motion.div
        className="skill-icon"
        animate={hovered ? {
          scale: [1, 1.3, 1.1],
          rotate: [0, -10, 10, 0],
        } : { scale: 1, rotate: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          filter: hovered ? `drop-shadow(0 0 8px ${skill.color})` : 'none',
        }}
      >
        {skill.icon}
      </motion.div>

      <span
        className="skill-label"
        style={{
          color: hovered ? skill.color : undefined,
          transition: 'color 0.3s',
          textShadow: hovered ? `0 0 10px ${skill.color}60` : 'none',
        }}
      >
        {skill.name}
      </span>

      {/* Proficiency bar */}
      <div className="skill-bar-container">
        <motion.div
          className="skill-bar"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.proficiency}%` } : {}}
          transition={{ delay: 0.4 + index * 0.08, duration: 1.2, ease: 'easeOut' }}
          style={{
            background: hovered
              ? `linear-gradient(90deg, ${skill.color}, ${skill.color}80)`
              : undefined,
          }}
        />
      </div>

      {/* Percentage badge */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: hovered ? 1 : 0,
          height: hovered ? 'auto' : 0,
        }}
        transition={{ duration: 0.2 }}
        style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '0.6rem',
          color: skill.color,
          letterSpacing: '1px',
          zIndex: 1,
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        <div>{skill.proficiency}% PROFICIENCY</div>
        <div style={{ color: '#8892b0', fontSize: '0.55rem', marginTop: '2px' }}>
          {skill.desc}
        </div>
      </motion.div>

      {/* Corner decorations */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: '12px', height: '12px',
        borderTop: `1px solid ${hovered ? skill.color + '80' : 'rgba(0,245,255,0.15)'}`,
        borderRight: `1px solid ${hovered ? skill.color + '80' : 'rgba(0,245,255,0.15)'}`,
        transition: 'border-color 0.3s',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0,
        width: '12px', height: '12px',
        borderBottom: `1px solid ${hovered ? skill.color + '80' : 'rgba(0,245,255,0.15)'}`,
        borderLeft: `1px solid ${hovered ? skill.color + '80' : 'rgba(0,245,255,0.15)'}`,
        transition: 'border-color 0.3s',
      }} />
    </motion.div>
  )
}

export default function SkillMatrix() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="section" id="skills" ref={ref}>
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        ⚙️ SKILL MATRIX
      </motion.div>

      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
        animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Technology Arsenal
      </motion.h2>

      {/* Decorative subtitle */}
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
        {'[ HOVER NODES TO INSPECT ]'}
      </motion.p>

      <div className="skill-matrix">
        <div className="skills-grid">
          {skills.map((skill, i) => (
            <SkillNode key={skill.name} skill={skill} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}
