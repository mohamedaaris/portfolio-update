import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

export default function ContactPortal() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isTransmitting, setIsTransmitting] = useState(false)
  const [transmitted, setTransmitted] = useState(false)

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsTransmitting(true)
    // Simulate transmission
    setTimeout(() => {
      setIsTransmitting(false)
      setTransmitted(true)
      setTimeout(() => setTransmitted(false), 3000)
      setFormData({ name: '', email: '', message: '' })
    }, 2000)
  }

  return (
    <section className="section" id="contact" ref={ref}>
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        🧾 CONTACT PORTAL
      </motion.div>

      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Transmit Message
      </motion.h2>

      <motion.div
        className="contact-portal"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="terminal-window">
          <div className="terminal-header">
            <span className="terminal-dot red" />
            <span className="terminal-dot yellow" />
            <span className="terminal-dot green" />
            <span className="terminal-title">transmission_portal.sh — neural_link</span>
          </div>

          <div className="terminal-body">
            {/* Terminal Prompt */}
            <motion.div
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                color: '#4a5568',
                fontSize: '0.75rem',
                marginBottom: '1.5rem',
                letterSpacing: '1px',
              }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
            >
              <span style={{ color: '#00ff88' }}>aaris@neural</span>
              <span style={{ color: '#8892b0' }}>:</span>
              <span style={{ color: '#4d7cff' }}>~/contact</span>
              <span style={{ color: '#8892b0' }}>$ </span>
              <span style={{ color: '#00f5ff' }}>init transmission --secure</span>
            </motion.div>

            <form onSubmit={handleSubmit}>
              <motion.div
                className="terminal-input-group"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                <label className="terminal-label" htmlFor="contact-name">
                  Sender Identification
                </label>
                <input
                  className="terminal-input"
                  type="text"
                  id="contact-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name..."
                  required
                />
              </motion.div>

              <motion.div
                className="terminal-input-group"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.7, duration: 0.4 }}
              >
                <label className="terminal-label" htmlFor="contact-email">
                  Communication Channel
                </label>
                <input
                  className="terminal-input"
                  type="email"
                  id="contact-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email..."
                  required
                />
              </motion.div>

              <motion.div
                className="terminal-input-group"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.8, duration: 0.4 }}
              >
                <label className="terminal-label" htmlFor="contact-message">
                  Transmission Data
                </label>
                <textarea
                  className="terminal-textarea"
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter your message..."
                  required
                />
              </motion.div>

              <motion.button
                className="transmit-btn"
                type="submit"
                disabled={isTransmitting}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.9, duration: 0.4 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isTransmitting ? (
                  <motion.span
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  >
                    ◈ TRANSMITTING...
                  </motion.span>
                ) : transmitted ? (
                  '✓ TRANSMISSION COMPLETE'
                ) : (
                  '◈ TRANSMIT MESSAGE'
                )}
              </motion.button>
            </form>

            {/* Transmission Status */}
            {transmitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  marginTop: '1rem',
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: '0.75rem',
                  color: '#00ff88',
                  textAlign: 'center',
                  letterSpacing: '1px',
                }}
              >
                {'>'} MESSAGE RECEIVED. NEURAL LINK ESTABLISHED.
              </motion.div>
            )}
          </div>
        </div>

        {/* Social Links */}
        <motion.div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1.5rem',
            marginTop: '2rem',
            flexWrap: 'wrap',
          }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.1 }}
        >
          {[
            { label: 'GitHub', icon: '⟨⟩', url: 'https://github.com/mohamedaaris' },
            { label: 'LinkedIn', icon: '◉', url: 'https://www.linkedin.com/in/mohamedaaris/' },
            { label: 'Email', icon: '✉', url: 'mailto:mohamedaaris019@gmail.com' },
          ].map((social) => (
            <motion.a
              key={social.label}
              href={social.url}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: '0.8rem',
                color: '#8892b0',
                textDecoration: 'none',
                letterSpacing: '1px',
                padding: '0.5rem 1rem',
                border: '1px solid rgba(0, 245, 255, 0.1)',
                borderRadius: '4px',
                transition: 'all 0.3s ease',
              }}
              whileHover={{
                color: '#00f5ff',
                borderColor: 'rgba(0, 245, 255, 0.4)',
                boxShadow: '0 0 15px rgba(0, 245, 255, 0.15)',
              }}
            >
              <span>{social.icon}</span>
              {social.label}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
