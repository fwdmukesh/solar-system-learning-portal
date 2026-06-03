import { Html } from '@react-three/drei'

export default function PlanetLabel({ name, emoji, color, visible = true }) {
  if (!visible) return null

  return (
    <Html position={[0, 1.2, 0]} center distanceFactor={10}>
      <div
        className="px-3 py-1.5 rounded-full text-white text-sm font-bold whitespace-nowrap pointer-events-none backdrop-blur-sm border transition-opacity"
        style={{
          backgroundColor: color + '40',
          borderColor: color + '60',
        }}
      >
        {emoji} {name}
      </div>
    </Html>
  )
}
