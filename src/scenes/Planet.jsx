import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import PlanetLabel from './PlanetLabel.jsx'

const planetEmojis = {
  mercury: '☿️',
  venus: '♀️',
  earth: '🌍',
  mars: '🔴',
  jupiter: '🟠',
  saturn: '🪐',
  uranus: '🔵',
  neptune: '🔵',
}

export default function Planet({
  planetData,
  onClick,
  isSelected = false,
  showLabel = true,
  speed = 1,
  timeOffset = 0,
}) {
  const meshRef = useRef()
  const groupRef = useRef()
  const ringRef = useRef()

  const {
    id,
    name,
    color,
    scale: baseScale,
    distanceFromSun,
    moons,
  } = planetData

  // Scale distance for visualization (not to scale, but readable)
  const orbitRadius = useMemo(() => {
    const distanceMap = {
      mercury: 6,
      venus: 9,
      earth: 13,
      mars: 17,
      jupiter: 25,
      saturn: 33,
      uranus: 41,
      neptune: 49,
    }
    return distanceMap[id] || 10
  }, [id])

  // Scale planet size for visualization
  const visualScale = useMemo(() => {
    const scaleMap = {
      mercury: 0.4,
      venus: 0.7,
      earth: 0.75,
      mars: 0.5,
      jupiter: 1.8,
      saturn: 1.5,
      uranus: 1.0,
      neptune: 0.95,
    }
    return scaleMap[id] || 0.5
  }, [id])

  // Orbit speed (faster for inner planets)
  const orbitSpeed = useMemo(() => {
    const speedMap = {
      mercury: 4,
      venus: 3,
      earth: 2,
      mars: 1.5,
      jupiter: 0.8,
      saturn: 0.5,
      uranus: 0.3,
      neptune: 0.2,
    }
    return speedMap[id] || 1
  }, [id])

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime * 0.1 * speed * orbitSpeed + timeOffset
      groupRef.current.position.x = Math.cos(time) * orbitRadius
      groupRef.current.position.z = Math.sin(time) * orbitRadius
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.005
    }
  })

  const hasRings = id === 'saturn'
  const isIceGiant = id === 'uranus' || id === 'neptune'

  return (
    <group ref={groupRef}>
      {/* Planet body */}
      <mesh ref={meshRef} onClick={(e) => { e.stopPropagation(); onClick?.(planetData) }}>
        <sphereGeometry args={[visualScale, 32, 32]} />
        <meshStandardMaterial
          color={color}
          roughness={isIceGiant ? 0.3 : 0.7}
          metalness={isIceGiant ? 0.1 : 0.0}
          emissive={isSelected ? color : '#000000'}
          emissiveIntensity={isSelected ? 0.3 : 0}
        />
      </mesh>

      {/* Saturn's rings */}
      {hasRings && (
        <group ref={ringRef} rotation={[Math.PI / 2.5, 0, 0]}>
          <mesh>
            <ringGeometry args={[visualScale * 1.4, visualScale * 2.2, 64]} />
            <meshStandardMaterial
              color="#d4a574"
              side={THREE.DoubleSide}
              transparent
              opacity={0.7}
              roughness={0.8}
            />
          </mesh>
          <mesh>
            <ringGeometry args={[visualScale * 2.3, visualScale * 2.5, 64]} />
            <meshStandardMaterial
              color="#c49a6c"
              side={THREE.DoubleSide}
              transparent
              opacity={0.4}
              roughness={0.8}
            />
          </mesh>
        </group>
      )}

      {/* Selection glow */}
      {isSelected && (
        <mesh>
          <sphereGeometry args={[visualScale * 1.3, 16, 16]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.15}
            side={THREE.BackSide}
          />
        </mesh>
      )}

      {/* Label */}
      <PlanetLabel
        name={name}
        emoji={planetEmojis[id] || '🪐'}
        color={color}
        visible={showLabel}
      />

      {/* Moons indicator (tiny dots) */}
      {moons > 0 && id !== 'earth' && (
        <group>
          {Array.from({ length: Math.min(moons, 3) }).map((_, i) => (
            <mesh
              key={i}
              position={[
                Math.cos((i / 3) * Math.PI * 2) * (visualScale + 0.8),
                0,
                Math.sin((i / 3) * Math.PI * 2) * (visualScale + 0.8),
              ]}
            >
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshStandardMaterial color="#cccccc" />
            </mesh>
          ))}
        </group>
      )}

      {/* Earth's moon */}
      {id === 'earth' && (
        <mesh position={[visualScale + 0.6, 0, 0]}>
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshStandardMaterial color="#dddddd" />
        </mesh>
      )}
    </group>
  )
}
