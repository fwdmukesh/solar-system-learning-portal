import { useRef, useState, useCallback, useEffect, Suspense } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { CameraControls, Html, Stars as DreiStars } from '@react-three/drei'
import * as THREE from 'three'
import { useNavigate } from 'react-router-dom'
import { X, Rocket, BookOpen, HelpCircle, Trophy, ChevronRight } from 'lucide-react'
import Stars from './Stars.jsx'
import Sun from './Sun.jsx'
import Planet from './Planet.jsx'
import Orbit from './Orbit.jsx'
import Spaceship from './Spaceship.jsx'
import { planets } from '../data/planets.js'
import { useGameStore } from '../store/useGameStore.js'
import { formatDistance, formatDiameter } from '../lib/utils.js'

// Camera manager that follows spaceship or focuses on planet
function CameraManager({ targetPosition, isTraveling, selectedPlanet }) {
  const controlsRef = useRef()
  const { camera } = useThree()

  useEffect(() => {
    if (!controlsRef.current) return

    if (selectedPlanet && !isTraveling) {
      // Focus on selected planet
      const pos = selectedPlanet.position || [0, 0, 0]
      const distance = selectedPlanet.id === 'sun' ? 15 : 8
      controlsRef.current.moveTo(pos[0], pos[1], pos[2], true)
      controlsRef.current.dollyTo(distance, true)
    } else if (isTraveling && targetPosition) {
      // Follow spaceship from behind
      const offset = new THREE.Vector3(0, 3, 8)
      const target = new THREE.Vector3(...targetPosition)
      const camPos = target.clone().add(offset)
      controlsRef.current.moveTo(camPos.x, camPos.y, camPos.z, true)
      controlsRef.current.setLookAt(camPos.x, camPos.y, camPos.z, target.x, target.y, target.z, true)
    }
  }, [selectedPlanet, isTraveling, targetPosition])

  return (
    <CameraControls
      ref={controlsRef}
      makeDefault
      minDistance={3}
      maxDistance={80}
      dollySpeed={0.5}
      truckSpeed={0}
      smoothTime={0.8}
      draggingSmoothTime={0.2}
    />
  )
}

// Planet info panel overlay (Phase 3)
function PlanetInfoPanel({ planet, onClose, onStory, onQuiz }) {
  const navigate = useNavigate()
  const visitPlanet = useGameStore((state) => state.visitPlanet)
  const visitedPlanets = useGameStore((state) => state.visitedPlanets)
  const isVisited = visitedPlanets.includes(planet.id)

  useEffect(() => {
    if (!isVisited) {
      visitPlanet(planet.id)
    }
  }, [planet.id, isVisited, visitPlanet])

  return (
    <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 md:bottom-8 z-20">
      <div className="card border-l-4" style={{ borderLeftColor: planet.color }}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
              style={{ backgroundColor: planet.color + '30', border: `2px solid ${planet.color}` }}
            >
              {planet.id === 'sun' ? '☀️' : planet.id === 'earth' ? '🌍' : planet.id === 'mars' ? '🔴' : planet.id === 'jupiter' ? '🟠' : planet.id === 'saturn' ? '🪐' : planet.id === 'uranus' ? '🔵' : planet.id === 'neptune' ? '🔵' : '⚪'}
            </div>
            <div>
              <h2 className="text-2xl font-black text-white">{planet.name}</h2>
              <p className="text-sm text-white/50">{planet.type === 'star' ? 'Star' : 'Planet'}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <p className="text-body mb-4">{planet.description}</p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-space-900/50 rounded-xl p-3">
            <div className="text-xs text-white/40 mb-1">Distance from Sun</div>
            <div className="font-bold text-white">{formatDistance(planet.distanceFromSun)}</div>
          </div>
          <div className="bg-space-900/50 rounded-xl p-3">
            <div className="text-xs text-white/40 mb-1">Diameter</div>
            <div className="font-bold text-white">{formatDiameter(planet.diameter)}</div>
          </div>
          <div className="bg-space-900/50 rounded-xl p-3">
            <div className="text-xs text-white/40 mb-1">Temperature</div>
            <div className="font-bold text-white">{planet.temperature}</div>
          </div>
          <div className="bg-space-900/50 rounded-xl p-3">
            <div className="text-xs text-white/40 mb-1">Moons</div>
            <div className="font-bold text-white">{planet.moons}</div>
          </div>
        </div>

        <div className="bg-planet-sun/10 rounded-xl p-3 mb-4 border border-planet-sun/20">
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="w-4 h-4 text-planet-sun" />
            <span className="text-sm font-bold text-planet-sun">Fun Fact!</span>
          </div>
          <p className="text-sm text-white/70">{planet.funFact}</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onStory}
            className="flex-1 btn-secondary py-2 text-sm"
          >
            <BookOpen className="w-4 h-4" />
            Story
          </button>
          <button
            onClick={onQuiz}
            className="flex-1 btn-secondary py-2 text-sm"
          >
            <HelpCircle className="w-4 h-4" />
            Quiz
          </button>
          <button
            onClick={() => navigate(`/planet/${planet.id}`)}
            className="flex-1 btn-primary py-2 text-sm"
          >
            Details
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

// 3D Scene content
function SceneContent({ onPlanetClick, selectedPlanet, isTraveling, targetPosition, onArrive }) {
  return (
    <>
      <CameraManager
        targetPosition={targetPosition}
        isTraveling={isTraveling}
        selectedPlanet={selectedPlanet}
      />

      <ambientLight intensity={0.1} />

      <Stars count={2000} />

      <Sun
        onClick={() => onPlanetClick(planets[0])}
        scale={3}
      />

      {/* Orbit rings */}
      {planets.slice(1).map((planet) => {
        const orbitRadiusMap = {
          mercury: 6, venus: 9, earth: 13, mars: 17,
          jupiter: 25, saturn: 33, uranus: 41, neptune: 49,
        }
        return (
          <Orbit
            key={`orbit-${planet.id}`}
            radius={orbitRadiusMap[planet.id] || 10}
            color={planet.color}
          />
        )
      })}

      {/* Planets */}
      {planets.slice(1).map((planet, index) => (
        <Planet
          key={planet.id}
          planetData={planet}
          onClick={onPlanetClick}
          isSelected={selectedPlanet?.id === planet.id}
          showLabel={!selectedPlanet || selectedPlanet.id === planet.id}
          timeOffset={index * 1.5}
        />
      ))}

      {/* Spaceship */}
      <Spaceship
        targetPosition={targetPosition}
        isTraveling={isTraveling}
        onArrive={onArrive}
      />
    </>
  )
}

export default function SolarSystemScene() {
  const [selectedPlanet, setSelectedPlanet] = useState(null)
  const [isTraveling, setIsTraveling] = useState(false)
  const [targetPosition, setTargetPosition] = useState(null)
  const navigate = useNavigate()

  const handlePlanetClick = useCallback((planet) => {
    if (selectedPlanet?.id === planet.id) {
      setSelectedPlanet(null)
      setIsTraveling(false)
      setTargetPosition(null)
      return
    }

    setSelectedPlanet(planet)
    setIsTraveling(true)

    // Calculate target position based on orbit radius
    const orbitRadiusMap = {
      mercury: 6, venus: 9, earth: 13, mars: 17,
      jupiter: 25, saturn: 33, uranus: 41, neptune: 49,
    }
    const radius = orbitRadiusMap[planet.id] || 10
    const angle = Math.random() * Math.PI * 2
    setTargetPosition([Math.cos(angle) * radius, 0, Math.sin(angle) * radius])
  }, [selectedPlanet])

  const handleArrive = useCallback(() => {
    setIsTraveling(false)
  }, [])

  const handleClose = useCallback(() => {
    setSelectedPlanet(null)
    setIsTraveling(false)
    setTargetPosition(null)
  }, [])

  return (
    <div className="relative w-full h-screen bg-space-900 overflow-hidden">
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 20, 40], fov: 60, near: 0.1, far: 200 }}
          gl={{ antialias: true, alpha: false }}
          style={{ background: '#0a0e1a' }}
        >
          <Suspense fallback={null}>
            <SceneContent
              onPlanetClick={handlePlanetClick}
              selectedPlanet={selectedPlanet}
              isTraveling={isTraveling}
              targetPosition={targetPosition}
              onArrive={handleArrive}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* UI Overlay */}
      <div className="ui-layer absolute inset-0 pointer-events-none">
        {/* Top hint */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2">
          <div className="px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-white/60 text-sm font-semibold">
            🖱️ Click a planet to explore! Drag to rotate, scroll to zoom
          </div>
        </div>

        {/* Planet info panel */}
        {selectedPlanet && !isTraveling && (
          <div className="pointer-events-auto">
            <PlanetInfoPanel
              planet={selectedPlanet}
              onClose={handleClose}
              onStory={() => navigate(`/story/${selectedPlanet.id}`)}
              onQuiz={() => navigate(`/quiz/${selectedPlanet.id}`)}
            />
          </div>
        )}

        {/* Traveling indicator */}
        {isTraveling && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <div className="px-6 py-3 rounded-full bg-planet-earth/20 backdrop-blur-sm border border-planet-earth/30 text-white font-bold flex items-center gap-2 animate-pulse">
              <Rocket className="w-5 h-5 text-planet-earth" />
              Traveling to {selectedPlanet?.name}...
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
