import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const skills = [
  { name: 'HTML', icon: '⟨/⟩', proficiency: 95, color: '#e44d26' },
  { name: 'CSS', icon: '✦', proficiency: 90, color: '#264de4' },
  { name: 'JavaScript', icon: '⚡', proficiency: 88, color: '#f7df1e' },
  { name: 'React', icon: '⚛', proficiency: 85, color: '#61dafb' },
  { name: 'Next.js', icon: '▲', proficiency: 80, color: '#ffffff' },
  { name: 'Python', icon: '🐍', proficiency: 82, color: '#3776ab' },
  { name: 'Flask', icon: '🧪', proficiency: 75, color: '#00d4aa' },
  { name: 'Java', icon: '☕', proficiency: 78, color: '#ed8b00' },
  { name: 'MySQL', icon: '⛁', proficiency: 80, color: '#00758f' },
  { name: 'Flutter', icon: '◆', proficiency: 72, color: '#02569b' },
  { name: 'Git', icon: '⑃', proficiency: 85, color: '#f05032' },
  { name: 'Node.js', icon: '⬢', proficiency: 78, color: '#68a063' },
]

export default function SkillMatrix() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [hoveredSkill, setHoveredSkill] = useState(null)

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
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Technology Arsenal
      </motion.h2>

      <div className="skill-matrix">
        {/* Skills Grid */}
        <div className="skills-grid">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              className="skill-node"
              initial={{ opacity: 0, scale: 0.5, y: 30 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{
                delay: 0.1 + i * 0.07,
                duration: 0.5,
                type: 'spring',
                stiffness: 200,
              }}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
              whileHover={{ scale: 1.08 }}
              style={{
                borderColor: hoveredSkill === skill.name
                  ? skill.color
                  : 'rgba(0, 245, 255, 0.15)',
                boxShadow: hoveredSkill === skill.name
                  ? `0 0 25px ${skill.color}40, 0 0 50px ${skill.color}20`
                  : 'none',
              }}
            >
              <motion.div
                className="skill-icon"
                animate={hoveredSkill === skill.name ? {
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                } : {}}
                transition={{ duration: 0.5 }}
              >
                {skill.icon}
              </motion.div>
              <span className="skill-label">{skill.name}</span>
              <div className="skill-bar-container">
                <motion.div
                  className="skill-bar"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.proficiency}%` } : {}}
                  transition={{ delay: 0.3 + i * 0.07, duration: 1, ease: 'easeOut' }}
                  style={{
                    background: hoveredSkill === skill.name
                      ? `linear-gradient(90deg, ${skill.color}, ${skill.color}80)`
                      : undefined,
                  }}
                />
              </div>
              {hoveredSkill === skill.name && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: '0.65rem',
                    color: skill.color,
                    letterSpacing: '1px',
                    zIndex: 1,
                  }}
                >
                  {skill.proficiency}%
                </motion.span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
