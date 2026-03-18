import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer
      style={{
        padding: '2rem',
        borderTop: '1px solid rgba(0, 245, 255, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        background: 'linear-gradient(180deg, transparent, rgba(5, 5, 16, 0.9))',
      }}
    >
      {/* System Info */}
      <div
        style={{
          display: 'flex',
          gap: '2rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {[
          'NEURAL_OS v3.0.1',
          'UPTIME: ∞',
          'PACKETS: ████████ 100%',
          'LATENCY: < 1ms',
        ].map((info, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '0.65rem',
              color: '#4a5568',
              letterSpacing: '1px',
            }}
          >
            {info}
          </span>
        ))}
      </div>

      {/* Copyright */}
      <motion.p
        style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '0.7rem',
          color: '#4a5568',
          letterSpacing: '1px',
          textAlign: 'center',
        }}
        whileHover={{ color: '#00f5ff' }}
      >
        © 2024 P MOHAMED AARIS — ALL SYSTEMS OPERATIONAL
      </motion.p>

      {/* Decorative Line */}
      <div
        style={{
          width: '60px',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(0, 245, 255, 0.3), transparent)',
        }}
      />
    </footer>
  )
}
