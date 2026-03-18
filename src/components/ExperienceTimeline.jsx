import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const experiences = [
  {
    date: '2024 — PRESENT',
    title: 'Full Stack Development',
    org: 'Self-Directed Learning & Freelance',
    description: 'Building production-grade web applications using React, Next.js, and full-stack technologies. Developing client projects and open-source contributions while mastering modern development workflows.',
  },
  {
    date: '2024 — PRESENT',
    title: 'B.Tech Computer Science Engineering',
    org: 'Rajalakshmi Engineering College, Chennai',
    description: 'Pursuing comprehensive Computer Science degree with focus on software engineering, data structures, algorithms, and modern web technologies. Expected graduation: 2028.',
  },
  {
    date: '2023 — 2024',
    title: 'Web Development Certification',
    org: 'Online Learning Platforms',
    description: 'Completed multiple certified courses in HTML, CSS, JavaScript, React, Python, and database management. Built several capstone projects to solidify practical skills.',
  },
  {
    date: '2023',
    title: 'Programming Foundations',
    org: 'Academic & Self-Study',
    description: 'Established strong foundations in programming with Java and Python. Developed understanding of OOP principles, data structures, and algorithm design.',
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
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Experience Timeline
      </motion.h2>

      <div className="timeline-stream">
        {/* Timeline Line */}
        <motion.div
          className="timeline-line"
          initial={{ scaleY: 0, originY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />

        {/* Data Flow Particles on Timeline */}
        <motion.div
          style={{
            position: 'absolute',
            left: '18px',
            top: 0,
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#00f5ff',
            boxShadow: '0 0 10px #00f5ff',
            zIndex: 3,
          }}
          animate={isInView ? {
            top: ['0%', '100%'],
            opacity: [0, 1, 1, 0],
          } : {}}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'linear',
            delay: 1,
          }}
        />

        {/* Timeline Nodes */}
        {experiences.map((exp, i) => (
          <motion.div
            key={i}
            className="timeline-node"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              delay: 0.3 + i * 0.2,
              duration: 0.6,
              type: 'spring',
              stiffness: 100,
            }}
          >
            <motion.div
              className="timeline-dot"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{
                delay: 0.5 + i * 0.2,
                duration: 0.3,
                type: 'spring',
              }}
            />

            <motion.div
              style={{
                padding: '1.5rem',
                background: 'linear-gradient(135deg, rgba(10, 10, 26, 0.6), rgba(15, 15, 46, 0.2))',
                border: '1px solid rgba(0, 245, 255, 0.1)',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
              }}
              whileHover={{
                borderColor: 'rgba(0, 245, 255, 0.3)',
                boxShadow: '0 0 20px rgba(0, 245, 255, 0.1)',
                x: 5,
              }}
            >
              <span className="timeline-date">{exp.date}</span>
              <h3 className="timeline-title">{exp.title}</h3>
              <span className="timeline-org">{exp.org}</span>
              <p className="timeline-desc">{exp.description}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
