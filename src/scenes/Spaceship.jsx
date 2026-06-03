import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Spaceship({ targetPosition, isTraveling, onArrive }) {
  const groupRef = useRef()
  const trailRef = useRef()
  const currentPos = useRef(new THREE.Vector3(0, 5, 0))
  const targetPos = useRef(new THREE.Vector3(0, 5, 0))

  useMemo(() => {
    if (targetPosition) {
      targetPos.current.set(targetPosition[0], targetPosition[1] + 2, targetPosition[2])
    }
  }, [targetPosition])

  useFrame((state, delta) => {
    if (!groupRef.current) return

    if (isTraveling) {
      // Move towards target
      const direction = new THREE.Vector3().subVectors(targetPos.current, currentPos.current)
      const distance = direction.length()

      if (distance > 0.5) {
        direction.normalize()
        const speed = 8 * delta
        currentPos.current.add(direction.multiplyScalar(speed))

        // Orient ship towards target
        groupRef.current.lookAt(targetPos.current)
        groupRef.current.rotateX(-Math.PI / 2)
      } else {
        onArrive?.()
      }
    } else {
      // Idle floating animation
      groupRef.current.position.y += Math.sin(state.clock.elapsedTime * 2) * 0.002
    }

    groupRef.current.position.copy(currentPos.current)

    // Trail effect
    if (trailRef.current && isTraveling) {
      trailRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 10) * 0.2)
    }
  })

  return (
    <group ref={groupRef} position={[0, 5, 0]}>
      {/* Main body */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.4, 1.2, 8]} />
        <meshStandardMaterial color="#60a5fa" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Cockpit */}
      <mesh position={[0, 0.3, 0.2]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color="#1e3a5f" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Window */}
      <mesh position={[0, 0.35, 0.35]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={0.5} />
      </mesh>

      {/* Wings */}
      <mesh position={[0.5, -0.2, -0.2]} rotation={[0, 0, -0.3]}>
        <boxGeometry args={[0.8, 0.05, 0.4]} />
        <meshStandardMaterial color="#3b82f6" metalness={0.5} />
      </mesh>
      <mesh position={[-0.5, -0.2, -0.2]} rotation={[0, 0, 0.3]}>
        <boxGeometry args={[0.8, 0.05, 0.4]} />
        <meshStandardMaterial color="#3b82f6" metalness={0.5} />
      </mesh>

      {/* Engine glow */}
      <mesh ref={trailRef} position={[0, -0.7, 0]}>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.6} />
      </mesh>
      <pointLight position={[0, -0.8, 0]} color="#60a5fa" intensity={2} distance={3} />

      {/* Cute face on front */}
      <mesh position={[0.12, 0.1, 0.55]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[-0.12, 0.1, 0.55]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color="#1a1a1a" />
      </mesh>
    </group>
  )
}
