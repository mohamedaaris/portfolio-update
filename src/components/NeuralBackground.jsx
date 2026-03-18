import { useRef, useMemo, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Particles({ count = 300, mouse }) {
  const mesh = useRef()
  const light = useRef()

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    const sizes = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15
      speeds[i] = Math.random() * 0.02 + 0.005
      sizes[i] = Math.random() * 2 + 0.5
    }

    return { positions, speeds, sizes }
  }, [count])

  useFrame((state) => {
    if (!mesh.current) return
    const positions = mesh.current.geometry.attributes.position.array

    for (let i = 0; i < count; i++) {
      positions[i * 3 + 1] += particles.speeds[i]

      if (positions[i * 3 + 1] > 15) {
        positions[i * 3 + 1] = -15
        positions[i * 3] = (Math.random() - 0.5) * 30
      }
    }

    mesh.current.geometry.attributes.position.needsUpdate = true

    // Subtle rotation based on time
    mesh.current.rotation.y = state.clock.elapsedTime * 0.02
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={particles.sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#00f5ff"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

function NeuralLines({ count = 40 }) {
  const linesRef = useRef()

  const lines = useMemo(() => {
    const lineData = []
    for (let i = 0; i < count; i++) {
      const start = new THREE.Vector3(
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 10
      )
      const end = new THREE.Vector3(
        start.x + (Math.random() - 0.5) * 8,
        start.y + (Math.random() - 0.5) * 8,
        start.z + (Math.random() - 0.5) * 4
      )
      lineData.push({ start, end, speed: Math.random() * 0.005 + 0.001 })
    }
    return lineData
  }, [count])

  useFrame((state) => {
    if (!linesRef.current) return
    linesRef.current.children.forEach((line, i) => {
      const ld = lines[i]
      if (line.material) {
        line.material.opacity = 0.1 + Math.sin(state.clock.elapsedTime * ld.speed * 100 + i) * 0.1
      }
    })
  })

  return (
    <group ref={linesRef}>
      {lines.map((l, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([
                l.start.x, l.start.y, l.start.z,
                l.end.x, l.end.y, l.end.z
              ])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color={i % 3 === 0 ? '#b946ff' : '#00f5ff'}
            transparent
            opacity={0.1}
            blending={THREE.AdditiveBlending}
          />
        </line>
      ))}
    </group>
  )
}

function FloatingOrb() {
  const orbRef = useRef()

  useFrame((state) => {
    if (!orbRef.current) return
    orbRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.5
    orbRef.current.rotation.y = state.clock.elapsedTime * 0.2
    orbRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.2
  })

  return (
    <mesh ref={orbRef} position={[0, 0, -5]}>
      <icosahedronGeometry args={[2, 1]} />
      <meshBasicMaterial
        color="#00f5ff"
        wireframe
        transparent
        opacity={0.08}
      />
    </mesh>
  )
}

export default function NeuralBackground() {
  return (
    <div className="neural-bg">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: false }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.1} />
        <Particles count={200} />
        <NeuralLines count={30} />
        <FloatingOrb />
      </Canvas>
    </div>
  )
}
