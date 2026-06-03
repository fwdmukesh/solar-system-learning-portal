import { useRef } from 'react'
import * as THREE from 'three'

export default function Orbit({ radius, color = '#ffffff' }) {
  const points = []
  const segments = 128

  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2
    points.push(new THREE.Vector3(
      Math.cos(angle) * radius,
      0,
      Math.sin(angle) * radius
    ))
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points)

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color={color} transparent opacity={0.2} />
    </line>
  )
}
