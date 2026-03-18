import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const projects = [
  {
    id: 'PRJ-001',
    title: 'MiraiSync',
    description: 'MiraiSync is a collaborative streaming platform that allows multiple users to watch videos simultaneously from different locations. The platform synchronizes video playback in real-time, ensuring everyone enjoys the same content without delays. It features a responsive chat system, user-friendly room creation, and supports a wide range of video sources. Watch Together is designed to deliver seamless group viewing experiences, whether for friends, families, or communities.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Flask', 'Socket.IO', 'Websocket'],
    status: 'LIVE',
    accent: '#00f5ff',
  },
  {
    id: 'PRJ-002',
    title: 'ResuMatch AI',
    description: 'ResuMatch AI streamlines the entire process - from resume parsing to job applications - while providing an AI assistant to guide students through their career journey with personalized recommendations and automated communication.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Flask', 'SBERT', 'TF-IDF', 'GNN model', 'NLP', 'tesseract'],
    status: 'DEPLOYED',
    url: 'https://aarisx0-resumatch.hf.space/',
    accent: '#b946ff',
  },
  {
    id: 'PRJ-003',
    title: 'AgentX - AI Agent Platform',
    description: 'An advanced AI web interface that combines a chat-first design with reasoning, automation, and tool integration. Create, manage, and deploy AI agents through natural conversation with Llama 3.2 3B. Built with Flask, featuring a modern dark/light theme interface, real-time chat, and modular agent tools system.',
    tech: ['flask', 'python', 'javascript', 'css', 'html', 'tesseract', 'llama 3.2 3B', 'NLP'],
    status: 'LIVE',
    accent: '#4d7cff',
  },
  {
    id: 'PRJ-004',
    title: 'Flowlink- seamless connection platform',
    description: 'FlowLink is a cross-platform continuity system built with React, Kotlin, Node.js, WebSocket, and WebRTC that enables seamless content sharing across Android and web devices. It features intelligent file handling with temporary cache on mobile (no storage bloat), smart URL deep-linking to native apps, automatic session discovery with instant notifications, and drag-and-drop transfers for files, text, and URLs. Group-based simultaneous distribution and batch file transfers with auto-organized folders make it a practical alternative to platform-locked solutions like Apple Continuity.',
    tech: ['react', 'kotlin', 'node.js', 'websocket', 'webrtc'],
    status: 'DEPLOYED',
    accent: '#00ff88',
  },
  {
    id: 'PRJ-005',
    title: 'Autonomous Research Agent System',
    description: 'A multi-agent research system that autonomously searches and collects the research papers for the topic we give and builds the reference block. It also validates the reference we give whether it is right or wrong and corrects all the typo or mistakes like author/journal name automatically and then gives the correct reference block.',
    tech: ['javascript', 'API', 'CSS', 'HTML', 'python', 'flask'],
    status: 'LIVE',
    accent: '#ff2d7c',
  },
  {
    id: 'PRJ-006',
    title: 'E-commerce Website',
    description: 'I designed an e-commerce website for online shopping. The website allows users to browse and purchase products online. The website features a responsive design, a user-friendly interface, and a secure payment gateway. The website is designed to deliver a seamless shopping experience for users.',
    tech: ['Next.js', 'Node.js', 'MySQL', 'JWT'],
    status: 'DEPLOYED',
    url: 'https://ecommerce-gngm.vercel.app/',
    accent: '#ed8b00',
  },
]

const statusColors = { LIVE: '#00ff88', DEPLOYED: '#00f5ff', BETA: '#ffbd2e' }

/* ── Connection lines between nodes ── */
function NodeConnections({ positions, activeIdx }) {
  const connections = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0],
    [0, 3], [1, 4], [2, 5],
  ]
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
      <defs>
        <filter id="line-glow">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {connections.map(([a, b], i) => {
        if (!positions[a] || !positions[b]) return null
        const isActive = activeIdx === a || activeIdx === b
        return (
          <g key={i}>
            <line x1={positions[a].x} y1={positions[a].y} x2={positions[b].x} y2={positions[b].y}
              stroke="#00f5ff" strokeWidth={isActive ? 1.5 : 0.5} strokeOpacity={isActive ? 0.5 : 0.08}
              filter={isActive ? 'url(#line-glow)' : undefined} style={{ transition: 'all 0.4s ease' }}
            />
            {isActive && (
              <circle r="2.5" fill="#00f5ff" opacity="0.9" filter="url(#line-glow)">
                <animateMotion dur="1.5s" repeatCount="indefinite" path={`M${positions[a].x},${positions[a].y} L${positions[b].x},${positions[b].y}`} />
              </circle>
            )}
          </g>
        )
      })}
    </svg>
  )
}

/* ── Single Project Node (circular) ── */
function ProjectNode({ project, index, isInView, pos, hovered, onHover, onLeave, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: 0.2 + index * 0.1, type: 'spring', stiffness: 140, damping: 14 }}
      onMouseEnter={onHover} onMouseLeave={onLeave} onClick={onClick}
      style={{ position: 'absolute', left: pos.x, top: pos.y, transform: 'translate(-50%, -50%)', zIndex: hovered ? 20 : 5, cursor: 'pointer' }}
    >
      {hovered && [1, 2].map(r => (
        <motion.div key={r}
          animate={{ scale: [1, 2 + r * 0.4], opacity: [0.4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: r * 0.3 }}
          style={{ position: 'absolute', inset: -6, borderRadius: '50%', border: `1px solid ${project.accent}` }}
        />
      ))}

      <motion.div
        animate={{
          y: [0, -6 - (index % 3) * 3, 0],
          boxShadow: hovered ? `0 0 35px ${project.accent}70, 0 0 70px ${project.accent}30` : `0 0 12px ${project.accent}20`,
        }}
        transition={{ y: { duration: 4 + (index % 3) * 0.8, repeat: Infinity, ease: 'easeInOut' }, boxShadow: { duration: 0.3 } }}
        whileHover={{ scale: 1.15 }}
        style={{
          width: hovered ? 110 : 90, height: hovered ? 110 : 90, borderRadius: '50%',
          background: `radial-gradient(circle at 35% 30%, ${project.accent}20, rgba(10,10,26,0.95) 70%)`,
          border: `1.5px solid ${hovered ? project.accent : project.accent + '40'}`,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          transition: 'width 0.3s, height 0.3s, border-color 0.3s', padding: '0.5rem',
        }}
      >
        <div style={{
          position: 'absolute', top: 6, right: 10, width: 6, height: 6, borderRadius: '50%',
          background: statusColors[project.status], boxShadow: `0 0 6px ${statusColors[project.status]}`,
          animation: project.status === 'LIVE' ? 'pulse-text 1s infinite' : 'none',
        }} />
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.5rem', color: project.accent, letterSpacing: '1px', opacity: 0.7 }}>
          {project.id}
        </span>
        <span style={{
          fontFamily: "'Orbitron', sans-serif", fontSize: hovered ? '0.55rem' : '0.5rem', fontWeight: 700,
          color: hovered ? project.accent : '#e0e8ff', letterSpacing: '1px', textAlign: 'center', lineHeight: 1.3,
          marginTop: 2, transition: 'font-size 0.3s, color 0.3s', textShadow: hovered ? `0 0 8px ${project.accent}` : 'none',
        }}>
          {project.title}
        </span>
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.4rem', color: statusColors[project.status], letterSpacing: '1px', marginTop: 3 }}>
          [{project.status}]
        </span>
      </motion.div>
    </motion.div>
  )
}

/* ── Expanded project detail panel ── */
function ProjectDetailPanel({ project, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      onClick={(e) => e.stopPropagation()}
      style={{
        position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 100,
        background: 'rgba(8,8,22,0.96)', border: `1px solid ${project.accent}50`, borderRadius: '16px',
        padding: '2rem', width: '90%', maxWidth: 420, backdropFilter: 'blur(20px)',
        boxShadow: `0 0 50px ${project.accent}25, 0 0 100px ${project.accent}10`,
      }}
    >
      <motion.button onClick={onClose} whileHover={{ scale: 1.2, color: '#ff5f56' }}
        style={{ position: 'absolute', top: 12, right: 14, background: 'none', border: 'none', color: '#4a5568', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.9rem', cursor: 'pointer' }}
      >✕</motion.button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: project.accent, letterSpacing: '2px' }}>{project.id}</span>
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.5rem', padding: '0.15rem 0.5rem', borderRadius: '2px', background: `${statusColors[project.status]}15`, border: `1px solid ${statusColors[project.status]}`, color: statusColors[project.status], letterSpacing: '1px' }}>
          {project.status}
        </span>
      </div>

      <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '1.15rem', fontWeight: 700, color: project.accent, letterSpacing: '2px', marginBottom: '1rem', textShadow: `0 0 15px ${project.accent}40` }}>
        {project.title}
      </h3>

      <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 0.5 }}
        style={{ height: 1, background: `linear-gradient(90deg, transparent, ${project.accent}50, transparent)`, marginBottom: '1rem' }}
      />

      <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '0.9rem', color: '#8892b0', lineHeight: 1.7, marginBottom: '1.25rem' }}>
        {project.description}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
        {project.tech.map(t => (
          <span key={t} style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', padding: '0.2rem 0.6rem', border: `1px solid ${project.accent}40`, borderRadius: '2px', color: project.accent, letterSpacing: '1px', background: `${project.accent}08` }}>
            {t}
          </span>
        ))}
      </div>

      <motion.button
        whileHover={{ boxShadow: `0 0 20px ${project.accent}40`, background: `${project.accent}15` }}
        onClick={() => window.open(project.url, "_blank")}
        style={{ width: '100%', padding: '0.7rem', background: `${project.accent}08`, border: `1px solid ${project.accent}60`, borderRadius: '6px', color: project.accent, fontFamily: "'Orbitron', sans-serif", fontSize: '0.7rem', fontWeight: 600, letterSpacing: '3px', cursor: 'pointer', transition: 'all 0.3s' }}
      >
        ◈ ACCESS PROJECT →
      </motion.button>
    </motion.div>
  )
}

export default function ProjectHub() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [hoveredIdx, setHoveredIdx] = useState(-1)
  const [selectedProject, setSelectedProject] = useState(null)
  const [containerSize, setContainerSize] = useState({ w: 900, h: 650 })
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

  const W = containerSize.w, H = containerSize.h, cx = W / 2, cy = H / 2

  const nodePositions = projects.map((_, i) => {
    const total = projects.length
    const angle = (i / total) * Math.PI * 2 - Math.PI / 2
    const rBase = Math.min(W, H) * 0.35
    const rVariance = (i % 2 === 0 ? 0.85 : 1.1) * rBase
    return { x: cx + Math.cos(angle) * rVariance * 1.05, y: cy + Math.sin(angle) * rVariance * 0.8 }
  })

  return (
    <section className="section" id="projects" ref={ref}>
      <motion.div className="section-header" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
        🚀 PROJECT HUB
      </motion.div>
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }} animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}} transition={{ delay: 0.2, duration: 0.6 }}>
        Mission Archives
      </motion.h2>
      <motion.p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.7rem', color: '#4a5568', letterSpacing: '3px', marginBottom: '1rem', marginTop: '-1.5rem' }} initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}>
        {'[ CLICK NODE TO ACCESS // HOVER TO INSPECT ]'}
      </motion.p>

      <div ref={containerRef} onClick={() => setSelectedProject(null)} style={{ position: 'relative', width: '100%', maxWidth: 950, height: '65vh', minHeight: 520 }}>
        <NodeConnections positions={nodePositions} activeIdx={hoveredIdx} />

        {/* Center node */}
        <motion.div initial={{ scale: 0 }} animate={isInView ? { scale: 1 } : {}} transition={{ delay: 0.1, type: 'spring', stiffness: 100 }}
          style={{ position: 'absolute', left: cx, top: cy, transform: 'translate(-50%, -50%)', zIndex: 10 }}
        >
          <motion.div
            animate={{ boxShadow: ['0 0 25px rgba(185,70,255,0.3), 0 0 55px rgba(185,70,255,0.12)', '0 0 40px rgba(185,70,255,0.5), 0 0 80px rgba(0,245,255,0.15)', '0 0 25px rgba(185,70,255,0.3), 0 0 55px rgba(185,70,255,0.12)'] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ width: 70, height: 70, borderRadius: '50%', background: 'radial-gradient(circle at 40% 35%, rgba(185,70,255,0.15), rgba(10,10,26,0.98) 70%)', border: '1.5px solid rgba(185,70,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.5rem', fontWeight: 700, color: '#b946ff', letterSpacing: '1px', textAlign: 'center', lineHeight: 1.3 }}>PROJECT<br />HUB</span>
          </motion.div>
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            style={{ position: 'absolute', inset: -10, borderRadius: '50%', border: '1px solid rgba(185,70,255,0.2)', borderTopColor: 'transparent' }}
          />
        </motion.div>

        {/* Center-to-node lines */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
          {nodePositions.map((pos, i) => (
            <line key={`c-${i}`} x1={cx} y1={cy} x2={pos.x} y2={pos.y}
              stroke={hoveredIdx === i ? projects[i].accent : '#b946ff'}
              strokeWidth={hoveredIdx === i ? 1.2 : 0.3} strokeOpacity={hoveredIdx === i ? 0.6 : 0.06}
              strokeDasharray={hoveredIdx === i ? 'none' : '4 4'} style={{ transition: 'all 0.4s ease' }}
            />
          ))}
        </svg>

        {projects.map((project, i) => (
          <ProjectNode key={project.id} project={project} index={i} isInView={isInView} pos={nodePositions[i]}
            hovered={hoveredIdx === i} onHover={() => setHoveredIdx(i)} onLeave={() => setHoveredIdx(-1)}
            onClick={(e) => { e.stopPropagation(); setSelectedProject(project) }}
          />
        ))}

        <AnimatePresence>
          {selectedProject && <ProjectDetailPanel project={selectedProject} onClose={() => setSelectedProject(null)} />}
        </AnimatePresence>
      </div>
    </section>
  )
}
