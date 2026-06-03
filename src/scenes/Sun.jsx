import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

export default function Sun({ onClick, scale = 3 }) {
  const meshRef = useRef()
  const glowRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002
    }
    if (glowRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05
      glowRef.current.scale.setScalar(pulse)
    }
  })

  return (
    <group position={[0, 0, 0]}>
      {/* Sun body */}
      <mesh ref={meshRef} onClick={onClick}>
        <sphereGeometry args={[scale, 64, 64]} />
        <meshStandardMaterial
          color="#fbbf24"
          emissive="#f59e0b"
          emissiveIntensity={2}
          roughness={0.8}
        />
      </mesh>

      {/* Glow layer 1 */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[scale * 1.2, 32, 32]} />
        <meshBasicMaterial
          color="#fbbf24"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Glow layer 2 - larger */}
      <mesh>
        <sphereGeometry args={[scale * 1.5, 32, 32]} />
        <meshBasicMaterial
          color="#f59e0b"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Point light */}
      <pointLight
        position={[0, 0, 0]}
        intensity={100}
        distance={100}
        color="#fbbf24"
      />

      {/* Label */}
      <Html position={[0, scale + 1.5, 0]} center>
        <div className="px-3 py-1 rounded-full bg-black/60 text-white text-sm font-bold whitespace-nowrap pointer-events-none backdrop-blur-sm border border-yellow-500/30">
          ☀️ Sun
        </div>
      </Html>
    </group>
  )
}
