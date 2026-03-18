import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'

const projects = [
  {
    id: 'PRJ-001',
    title: 'Neural Portfolio Engine',
    description: 'A futuristic AI-themed portfolio website featuring neural network animations, particle systems, and interactive 3D elements. Built with cutting-edge web technologies for an immersive digital experience.',
    tech: ['React', 'Three.js', 'Framer Motion', 'Tailwind CSS'],
    status: 'LIVE',
    link: '#',
    accent: '#00f5ff',
  },
  {
    id: 'PRJ-002',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with dynamic product catalog, secure payment integration, real-time inventory management, and responsive design across all devices.',
    tech: ['Next.js', 'MySQL', 'Node.js', 'CSS'],
    status: 'DEPLOYED',
    link: '#',
    accent: '#b946ff',
  },
  {
    id: 'PRJ-003',
    title: 'Task Management System',
    description: 'Collaborative task management application with real-time updates, drag-and-drop interface, team collaboration features, and an insightful analytics dashboard.',
    tech: ['React', 'Python', 'Flask', 'MySQL'],
    status: 'DEPLOYED',
    link: '#',
    accent: '#4d7cff',
  },
  {
    id: 'PRJ-004',
    title: 'Mobile Fitness Tracker',
    description: 'Cross-platform mobile application for tracking workouts, nutrition, and health metrics with AI-powered workout recommendations and progress analytics.',
    tech: ['Flutter', 'Firebase', 'Dart', 'REST API'],
    status: 'BETA',
    link: '#',
    accent: '#00ff88',
  },
  {
    id: 'PRJ-005',
    title: 'Weather Intelligence App',
    description: 'Intelligent weather forecasting with interactive maps, severe weather alerts, historical data analysis, and location-based smart recommendations.',
    tech: ['JavaScript', 'API Integration', 'CSS', 'HTML'],
    status: 'LIVE',
    link: '#',
    accent: '#ff2d7c',
  },
  {
    id: 'PRJ-006',
    title: 'Blog Platform CMS',
    description: 'Content management system with markdown support, SEO optimization, media handling, user authentication, and customizable themes.',
    tech: ['Next.js', 'Node.js', 'MySQL', 'JWT'],
    status: 'DEPLOYED',
    link: '#',
    accent: '#ed8b00',
  },
]

function ProjectCard({ project, index, isInView }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const statusColors = {
    LIVE: '#00ff88',
    DEPLOYED: '#00f5ff',
    BETA: '#ffbd2e',
  }

  return (
    <motion.div
      className="project-node"
      initial={{ opacity: 0, y: 60, rotateX: 10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{
        delay: 0.15 + index * 0.12,
        duration: 0.7,
        type: 'spring',
        stiffness: 80,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsExpanded(!isExpanded)}
      style={{
        borderColor: isHovered ? `${project.accent}40` : 'rgba(0, 245, 255, 0.12)',
        perspective: '1000px',
      }}
    >
      {/* Animated top border */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '2px',
          background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
          zIndex: 2,
        }}
        initial={{ width: '0%', left: '50%' }}
        animate={isHovered ? { width: '100%', left: '0%' } : { width: '0%', left: '50%' }}
        transition={{ duration: 0.4 }}
      />

      {/* Background glow */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at 50% 0%, ${project.accent}15, transparent 60%)`,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.4s',
          borderRadius: '12px',
        }}
      />

      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1,
        position: 'relative',
      }}>
        <motion.span
          className="project-node-id"
          style={{ color: project.accent }}
          animate={isHovered ? { x: 3 } : { x: 0 }}
        >
          {project.id}
        </motion.span>
        <span
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '0.6rem',
            letterSpacing: '1px',
            padding: '0.2rem 0.6rem',
            borderRadius: '2px',
            background: `${statusColors[project.status]}10`,
            border: `1px solid ${statusColors[project.status]}`,
            color: statusColors[project.status],
          }}
        >
          <span style={{
            display: 'inline-block',
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            background: statusColors[project.status],
            marginRight: '5px',
            animation: project.status === 'LIVE' ? 'pulse-text 1s infinite' : 'none',
          }} />
          {project.status}
        </span>
      </div>

      {/* Title */}
      <motion.h3
        className="project-node-title"
        animate={isHovered ? { x: 5 } : { x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {project.title}
      </motion.h3>

      {/* Description */}
      <motion.p
        className="project-node-desc"
        animate={{
          height: isExpanded ? 'auto' : '3rem',
          overflow: 'hidden',
        }}
      >
        {project.description}
      </motion.p>

      {/* Tech Stack */}
      <div className="project-tech-stack">
        {project.tech.map((tech, i) => (
          <motion.span
            key={tech}
            className="tech-tag"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.5 + index * 0.12 + i * 0.06 }}
            whileHover={{
              borderColor: project.accent,
              color: project.accent,
              boxShadow: `0 0 10px ${project.accent}30`,
            }}
          >
            {tech}
          </motion.span>
        ))}
      </div>

      {/* Action */}
      <motion.button
        className="project-link"
        whileHover={{ x: 8, color: project.accent }}
        transition={{ duration: 0.2 }}
      >
        <span style={{ fontSize: '0.6rem' }}>◈</span> ACCESS PROJECT
        <motion.span
          animate={isHovered ? { x: [0, 5, 0] } : {}}
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          →
        </motion.span>
      </motion.button>

      {/* Corner accents */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: '25px', height: '25px',
        borderTop: `1px solid ${isHovered ? project.accent + '60' : 'rgba(0,245,255,0.15)'}`,
        borderRight: `1px solid ${isHovered ? project.accent + '60' : 'rgba(0,245,255,0.15)'}`,
        borderRadius: '0 12px 0 0',
        transition: 'border-color 0.3s',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0,
        width: '25px', height: '25px',
        borderBottom: `1px solid ${isHovered ? project.accent + '60' : 'rgba(185,70,255,0.15)'}`,
        borderLeft: `1px solid ${isHovered ? project.accent + '60' : 'rgba(185,70,255,0.15)'}`,
        borderRadius: '0 0 0 12px',
        transition: 'border-color 0.3s',
      }} />
    </motion.div>
  )
}

export default function ProjectHub() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="section" id="projects" ref={ref}>
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        🚀 PROJECT HUB
      </motion.div>

      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
        animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Mission Archives
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
        {'[ CLICK TO EXPAND // HOVER TO INSPECT ]'}
      </motion.p>

      <div className="project-hub">
        <div className="projects-cluster">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
