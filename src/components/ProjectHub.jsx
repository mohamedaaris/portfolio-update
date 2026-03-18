import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'

const projects = [
  {
    id: 'PRJ-001',
    title: 'Neural Portfolio Engine',
    description: 'A futuristic AI-themed portfolio website featuring neural network animations, particle systems, and interactive 3D elements. Built with cutting-edge web technologies.',
    tech: ['React', 'Three.js', 'Framer Motion', 'Tailwind CSS'],
    status: 'LIVE',
    link: '#',
  },
  {
    id: 'PRJ-002',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with dynamic product catalog, secure payment integration, real-time inventory management, and responsive design across all devices.',
    tech: ['Next.js', 'MySQL', 'Node.js', 'CSS'],
    status: 'DEPLOYED',
    link: '#',
  },
  {
    id: 'PRJ-003',
    title: 'Task Management System',
    description: 'Collaborative task management application with real-time updates, drag-and-drop interface, team collaboration features, and analytics dashboard.',
    tech: ['React', 'Python', 'Flask', 'MySQL'],
    status: 'DEPLOYED',
    link: '#',
  },
  {
    id: 'PRJ-004',
    title: 'Mobile Fitness Tracker',
    description: 'Cross-platform mobile application for tracking workouts, nutrition, and health metrics. Features AI-powered workout recommendations and progress analytics.',
    tech: ['Flutter', 'Firebase', 'Dart', 'REST API'],
    status: 'BETA',
    link: '#',
  },
  {
    id: 'PRJ-005',
    title: 'Weather Intelligence App',
    description: 'Intelligent weather forecasting application with interactive maps, severe weather alerts, historical data analysis, and location-based recommendations.',
    tech: ['JavaScript', 'API Integration', 'CSS', 'HTML'],
    status: 'LIVE',
    link: '#',
  },
  {
    id: 'PRJ-006',
    title: 'Blog Platform CMS',
    description: 'Content management system with markdown support, SEO optimization, media handling, user authentication, and customizable themes for content creators.',
    tech: ['Next.js', 'Node.js', 'MySQL', 'JWT'],
    status: 'DEPLOYED',
    link: '#',
  },
]

function ProjectCard({ project, index, isInView }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      className="project-node"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        delay: 0.1 + index * 0.12,
        duration: 0.6,
        type: 'spring',
        stiffness: 100,
      }}
      whileHover={{ y: -8 }}
      onClick={() => setIsExpanded(!isExpanded)}
      layout
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 1, position: 'relative' }}>
        <span className="project-node-id">{project.id}</span>
        <motion.span
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '0.6rem',
            letterSpacing: '1px',
            padding: '0.15rem 0.5rem',
            borderRadius: '2px',
            background: project.status === 'LIVE'
              ? 'rgba(0, 255, 136, 0.1)'
              : project.status === 'BETA'
              ? 'rgba(255, 189, 46, 0.1)'
              : 'rgba(0, 245, 255, 0.1)',
            border: `1px solid ${
              project.status === 'LIVE'
                ? '#00ff88'
                : project.status === 'BETA'
                ? '#ffbd2e'
                : '#00f5ff'
            }`,
            color: project.status === 'LIVE'
              ? '#00ff88'
              : project.status === 'BETA'
              ? '#ffbd2e'
              : '#00f5ff',
          }}
        >
          {project.status}
        </motion.span>
      </div>

      <h3 className="project-node-title">{project.title}</h3>

      <AnimatePresence>
        <motion.p
          className="project-node-desc"
          initial={false}
          animate={{ height: isExpanded ? 'auto' : '3.2rem', overflow: 'hidden' }}
          transition={{ duration: 0.3 }}
        >
          {project.description}
        </motion.p>
      </AnimatePresence>

      {/* Tech Stack */}
      <div className="project-tech-stack">
        {project.tech.map((tech, i) => (
          <motion.span
            key={tech}
            className="tech-tag"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.4 + index * 0.12 + i * 0.05 }}
          >
            {tech}
          </motion.span>
        ))}
      </div>

      {/* Action Button */}
      <motion.button
        className="project-link"
        whileHover={{ x: 5 }}
      >
        ACCESS PROJECT →
      </motion.button>

      {/* Corner Decoration */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '30px',
          height: '30px',
          borderTop: '1px solid rgba(0, 245, 255, 0.3)',
          borderRight: '1px solid rgba(0, 245, 255, 0.3)',
          borderRadius: '0 12px 0 0',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '30px',
          height: '30px',
          borderBottom: '1px solid rgba(185, 70, 255, 0.3)',
          borderLeft: '1px solid rgba(185, 70, 255, 0.3)',
          borderRadius: '0 0 0 12px',
        }}
      />
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
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Mission Archives
      </motion.h2>

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
