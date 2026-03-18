import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const experiences = [
  {
    date: '2024 — PRESENT',
    title: 'Full Stack Development',
    org: 'Self-Directed Learning & Freelance',
    description: 'Building production-grade web applications using React, Next.js, and full-stack technologies. Developing client projects and open-source contributions while mastering modern workflows.',
    icon: '⚡',
    color: '#00f5ff',
  },
  {
    date: '2024 — PRESENT',
    title: 'B.Tech Computer Science Engineering',
    org: 'Rajalakshmi Engineering College, Chennai',
    description: 'Pursuing comprehensive Computer Science degree with focus on software engineering, data structures, algorithms, and modern web technologies. Expected graduation: 2028.',
    icon: '🎓',
    color: '#b946ff',
  },
  {
    date: '2023 — 2024',
    title: 'Web Development Certification',
    org: 'Online Learning Platforms',
    description: 'Completed multiple certified courses in HTML, CSS, JavaScript, React, Python, and database management. Built several capstone projects to solidify practical skills.',
    icon: '📜',
    color: '#4d7cff',
  },
  {
    date: '2023',
    title: 'Programming Foundations',
    org: 'Academic & Self-Study',
    description: 'Established strong foundations in programming with Java and Python. Built understanding of OOP principles, data structures, and algorithm design through projects.',
    icon: '🧱',
    color: '#00ff88',
  },
]

export default function ExperienceTimeline() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="section" id="experience" ref={ref}>
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        📡 DATA STREAM
      </motion.div>

      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
        animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Experience Timeline
      </motion.h2>

      <div className="timeline-stream">
        {/* Animated Timeline Line */}
        <motion.div
          className="timeline-line"
          initial={{ scaleY: 0, transformOrigin: 'top' }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 2, ease: 'easeOut' }}
        />

        {/* Flowing data particle on timeline */}
        {isInView && (
          <motion.div
            style={{
              position: 'absolute',
              left: '18px',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#00f5ff',
              boxShadow: '0 0 10px #00f5ff, 0 0 20px #00f5ff50',
              zIndex: 3,
            }}
            animate={{
              top: ['0%', '100%'],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'linear',
              delay: 1,
            }}
          />
        )}

        {/* Second flowing particle */}
        {isInView && (
          <motion.div
            style={{
              position: 'absolute',
              left: '19px',
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              background: '#b946ff',
              boxShadow: '0 0 8px #b946ff',
              zIndex: 3,
            }}
            animate={{
              top: ['0%', '100%'],
              opacity: [0, 0.8, 0.8, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: 'linear',
              delay: 3,
            }}
          />
        )}

        {/* Timeline Nodes */}
        {experiences.map((exp, i) => (
          <motion.div
            key={i}
            className="timeline-node"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              delay: 0.4 + i * 0.25,
              duration: 0.7,
              type: 'spring',
              stiffness: 80,
            }}
          >
            {/* Timeline Dot */}
            <motion.div
              className="timeline-dot"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{
                delay: 0.6 + i * 0.25,
                duration: 0.4,
                type: 'spring',
              }}
              style={{
                borderColor: exp.color,
                boxShadow: `0 0 10px ${exp.color}40`,
              }}
            >
              <motion.div
                style={{
                  position: 'absolute',
                  inset: '3px',
                  borderRadius: '50%',
                  background: exp.color,
                }}
                animate={{
                  opacity: [0.4, 1, 0.4],
                  scale: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            </motion.div>

            {/* Content Card */}
            <motion.div
              style={{
                padding: '1.5rem',
                background: 'linear-gradient(135deg, rgba(10, 10, 26, 0.7), rgba(15, 15, 46, 0.25))',
                border: '1px solid rgba(0, 245, 255, 0.08)',
                borderRadius: '8px',
                position: 'relative',
                overflow: 'hidden',
              }}
              whileHover={{
                borderColor: `${exp.color}40`,
                boxShadow: `0 0 25px ${exp.color}15`,
                x: 8,
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Left accent bar */}
              <div style={{
                position: 'absolute',
                left: 0,
                top: '10%',
                bottom: '10%',
                width: '2px',
                background: `linear-gradient(180deg, transparent, ${exp.color}, transparent)`,
                opacity: 0.5,
              }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '1.2rem' }}>{exp.icon}</span>
                <span className="timeline-date" style={{ color: exp.color }}>{exp.date}</span>
              </div>
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
