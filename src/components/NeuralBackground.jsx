import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/* ─── Mouse-Reactive Particles ─── */
function Particles({ count = 250 }) {
  const mesh = useRef()
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  const { positions, speeds, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    const colors = new Float32Array(count * 3)
    const cyanColor = new THREE.Color('#00f5ff')
    const violetColor = new THREE.Color('#b946ff')
    const blueColor = new THREE.Color('#4d7cff')

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
      speeds[i] = Math.random() * 0.015 + 0.003

      const color = Math.random() > 0.6 ? violetColor : Math.random() > 0.3 ? cyanColor : blueColor
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    return { positions, speeds, colors }
  }, [count])

  useFrame((state) => {
    if (!mesh.current) return
    const pos = mesh.current.geometry.attributes.position.array
    const time = state.clock.elapsedTime

    for (let i = 0; i < count; i++) {
      // Floating upward motion
      pos[i * 3 + 1] += speeds[i]
      // Gentle sine wave
      pos[i * 3] += Math.sin(time * 0.5 + i) * 0.003
      // Mouse influence
      pos[i * 3] += mouse.current.x * 0.003
      pos[i * 3 + 1] += mouse.current.y * 0.002

      // Reset particles that go off screen
      if (pos[i * 3 + 1] > 20) {
        pos[i * 3 + 1] = -20
        pos[i * 3] = (Math.random() - 0.5) * 40
      }
    }

    mesh.current.geometry.attributes.position.needsUpdate = true
    // Subtle global rotation reacting to mouse
    mesh.current.rotation.y = mouse.current.x * 0.05 + time * 0.01
    mesh.current.rotation.x = mouse.current.y * 0.03 + Math.sin(time * 0.005) * 0.05
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

/* ─── Neural Connection Lines (forming & dissolving) ─── */
function NeuralLines({ count = 50 }) {
  const groupRef = useRef()
  const lineData = useMemo(() => {
    return Array.from({ length: count }, () => {
      const s = new THREE.Vector3(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 12
      )
      const e = new THREE.Vector3(
        s.x + (Math.random() - 0.5) * 10,
        s.y + (Math.random() - 0.5) * 10,
        s.z + (Math.random() - 0.5) * 5
      )
      return {
        start: s,
        end: e,
        phase: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.7,
        isViolet: Math.random() > 0.6,
      }
    })
  }, [count])

  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.elapsedTime

    groupRef.current.children.forEach((line, i) => {
      if (line.material) {
        const ld = lineData[i]
        // Forming and dissolving effect
        const wave = Math.sin(time * ld.speed + ld.phase)
        line.material.opacity = Math.max(0, wave * 0.15)
      }
    })
  })

  return (
    <group ref={groupRef}>
      {lineData.map((l, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([
                l.start.x, l.start.y, l.start.z,
                l.end.x, l.end.y, l.end.z,
              ])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color={l.isViolet ? '#b946ff' : '#00f5ff'}
            transparent
            opacity={0.1}
            blending={THREE.AdditiveBlending}
          />
        </line>
      ))}
    </group>
  )
}

/* ─── Floating Wireframe Geometry ─── */
function FloatingGeometry() {
  const meshRef = useRef()
  const mesh2Ref = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(t * 0.3) * 1
      meshRef.current.rotation.y = t * 0.15
      meshRef.current.rotation.x = Math.sin(t * 0.1) * 0.3
      meshRef.current.rotation.z = Math.cos(t * 0.08) * 0.2
    }
    if (mesh2Ref.current) {
      mesh2Ref.current.position.y = Math.cos(t * 0.25) * 1.5
      mesh2Ref.current.position.x = Math.sin(t * 0.15) * 2
      mesh2Ref.current.rotation.y = -t * 0.1
      mesh2Ref.current.rotation.z = Math.sin(t * 0.12) * 0.4
    }
  })

  return (
    <>
      <mesh ref={meshRef} position={[0, 0, -8]}>
        <icosahedronGeometry args={[2.5, 1]} />
        <meshBasicMaterial
          color="#00f5ff"
          wireframe
          transparent
          opacity={0.06}
        />
      </mesh>
      <mesh ref={mesh2Ref} position={[5, -3, -10]}>
        <octahedronGeometry args={[1.5, 0]} />
        <meshBasicMaterial
          color="#b946ff"
          wireframe
          transparent
          opacity={0.04}
        />
      </mesh>
    </>
  )
}

/* ─── Depth Fog Layer ─── */
function DepthFog() {
  const { scene } = useThree()
  useEffect(() => {
    scene.fog = new THREE.FogExp2('#050510', 0.03)
  }, [scene])
  return null
}

export default function NeuralBackground() {
  return (
    <div className="neural-bg">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 65 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: false }}
        dpr={[1, 1.5]}
      >
        <DepthFog />
        <ambientLight intensity={0.05} />
        <Particles count={200} />
        <NeuralLines count={40} />
        <FloatingGeometry />
      </Canvas>
    </div>
  )
}
