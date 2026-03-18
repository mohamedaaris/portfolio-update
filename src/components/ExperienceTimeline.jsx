import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const experiences = [
  {
    date: '2024 — PRESENT',
    title: 'Full Stack Development',
    org: 'Self-Directed & Freelance',
    description: 'Building production-grade web apps using React, Next.js, and full-stack technologies. Developing client projects and open-source contributions.',
    icon: '⚡',
    color: '#00f5ff',
  },
  {
    date: '2024 — PRESENT',
    title: 'B.Tech CSE',
    org: 'Rajalakshmi Engineering College',
    description: 'Pursuing Computer Science with focus on software engineering, data structures, algorithms, and modern web technologies. Graduating 2028.',
    icon: '🎓',
    color: '#b946ff',
  },
  {
    date: '2023 — 2024',
    title: 'Web Dev Certifications',
    org: 'Online Learning Platforms',
    description: 'Completed multiple courses in HTML, CSS, JavaScript, React, Python, and databases. Built capstone projects to solidify practical skills.',
    icon: '📜',
    color: '#4d7cff',
  },
  {
    date: '2023',
    title: 'Programming Foundations',
    org: 'Academic & Self-Study',
    description: 'Built strong foundations in Java and Python. Developed understanding of OOP, data structures, and algorithm design through projects.',
    icon: '🧱',
    color: '#00ff88',
  },
]

export default function ExperienceTimeline() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [hoveredIdx, setHoveredIdx] = useState(-1)

  return (
    <section className="section" id="experience" ref={ref}>
      <motion.div className="section-header" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
        📡 DATA STREAM
      </motion.div>
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }} animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}} transition={{ delay: 0.2, duration: 0.6 }}>
        Experience Timeline
      </motion.h2>

      <div className="timeline-stream">
        <motion.div className="timeline-line" initial={{ scaleY: 0, transformOrigin: 'top' }} animate={isInView ? { scaleY: 1 } : {}} transition={{ duration: 2, ease: 'easeOut' }} />

        {/* Flowing data particles */}
        {isInView && [0, 1, 2].map(i => (
          <motion.div key={i}
            style={{
              position: 'absolute', left: 17 + i * 2, width: 6 - i * 1.5, height: 6 - i * 1.5,
              borderRadius: '50%', background: i === 0 ? '#00f5ff' : i === 1 ? '#b946ff' : '#4d7cff',
              boxShadow: `0 0 ${10 - i * 2}px ${i === 0 ? '#00f5ff' : i === 1 ? '#b946ff' : '#4d7cff'}`, zIndex: 3,
            }}
            animate={{ top: ['0%', '100%'], opacity: [0, 0.9, 0.9, 0] }}
            transition={{ duration: 4 + i * 2, repeat: Infinity, ease: 'linear', delay: i * 1.5 }}
          />
        ))}

        {experiences.map((exp, i) => (
          <motion.div key={i} className="timeline-node"
            initial={{ opacity: 0, x: -60 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 + i * 0.25, duration: 0.7, type: 'spring', stiffness: 80 }}
            onMouseEnter={() => setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(-1)}
          >
            {/* Circular icon node */}
            <motion.div
              style={{
                position: 'absolute', left: 5, top: 10, width: 32, height: 32, borderRadius: '50%',
                border: `2px solid ${exp.color}`, background: `radial-gradient(circle, ${exp.color}20, rgba(10,10,26,0.95) 70%)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', zIndex: 2,
                boxShadow: hoveredIdx === i ? `0 0 20px ${exp.color}60, 0 0 40px ${exp.color}25` : `0 0 8px ${exp.color}20`,
                transition: 'box-shadow 0.3s',
              }}
              initial={{ scale: 0 }} animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.6 + i * 0.25, type: 'spring' }}
              whileHover={{ scale: 1.3 }}
            >
              {exp.icon}
              {hoveredIdx === i && (
                <motion.div
                  animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  style={{ position: 'absolute', inset: -4, borderRadius: '50%', border: `1px solid ${exp.color}` }}
                />
              )}
            </motion.div>

            {/* Content Card */}
            <motion.div
              style={{
                marginLeft: 20, padding: '1.5rem',
                background: hoveredIdx === i ? `linear-gradient(135deg, rgba(10,10,26,0.8), ${exp.color}08)` : 'linear-gradient(135deg, rgba(10,10,26,0.6), rgba(15,15,46,0.2))',
                border: `1px solid ${hoveredIdx === i ? exp.color + '40' : 'rgba(0,245,255,0.06)'}`,
                borderRadius: '12px', position: 'relative', overflow: 'hidden', transition: 'all 0.4s ease',
              }}
              whileHover={{ x: 8, scale: 1.02 }} transition={{ duration: 0.3 }}
            >
              <div style={{ position: 'absolute', left: 0, top: '10%', bottom: '10%', width: 2, background: `linear-gradient(180deg, transparent, ${exp.color}, transparent)`, opacity: hoveredIdx === i ? 0.8 : 0.3, transition: 'opacity 0.3s' }} />
              {hoveredIdx === i && (
                <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} style={{ position: 'absolute', top: 0, left: 0, height: 1, background: `linear-gradient(90deg, transparent, ${exp.color}, transparent)` }} />
              )}
              <span className="timeline-date" style={{ color: exp.color }}>{exp.date}</span>
              <h3 className="timeline-title">{exp.title}</h3>
              <span className="timeline-org" style={{ color: exp.color }}>{exp.org}</span>
              <p className="timeline-desc">{exp.description}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
