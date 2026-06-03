import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Stars({ count = 3000 }) {
  const mesh = useRef()

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const color = new THREE.Color()

    for (let i = 0; i < count; i++) {
      const r = 80 + Math.random() * 120
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)

      // Star colors: mostly white, some blue/yellow/red
      const starType = Math.random()
      if (starType < 0.7) {
        color.setRGB(1, 1, 1)
      } else if (starType < 0.85) {
        color.setRGB(0.8, 0.9, 1)
      } else if (starType < 0.95) {
        color.setRGB(1, 0.95, 0.8)
      } else {
        color.setRGB(1, 0.7, 0.6)
      }
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    return [positions, colors]
  }, [count])

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.005
    }
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
        size={0.3}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}
