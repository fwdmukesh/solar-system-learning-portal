import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, BookOpen, HelpCircle, Ruler, Thermometer, Orbit, Moon, MapPin, Sparkles } from 'lucide-react'
import { planets } from '../data/planets.js'
import { useGameStore } from '../store/useGameStore.js'
import { formatDistance, formatDiameter } from '../lib/utils.js'

export default function PlanetDetail() {
  const { planetId } = useParams()
  const navigate = useNavigate()
  const planet = planets.find((p) => p.id === planetId)
  const visitPlanet = useGameStore((state) => state.visitPlanet)

  if (!planet) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black text-white mb-4">Planet Not Found 🌌</h1>
          <button onClick={() => navigate('/')} className="btn-primary">
            Go Home
          </button>
        </div>
      </div>
    )
  }

  // Mark as visited
  visitPlanet(planet.id)

  const emoji = planet.id === 'sun' ? '☀️' : planet.id === 'earth' ? '🌍' : planet.id === 'mars' ? '🔴' : planet.id === 'jupiter' ? '🟠' : planet.id === 'saturn' ? '🪐' : planet.id === 'uranus' ? '🔵' : planet.id === 'neptune' ? '🔵' : '⚪'

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-3 rounded-xl bg-space-700 hover:bg-space-700/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex items-center gap-3">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-3xl"
              style={{ backgroundColor: planet.color + '30', border: `3px solid ${planet.color}` }}
            >
              {emoji}
            </div>
            <div>
              <h1 className="title-display">{planet.name}</h1>
              <p className="text-white/50">{planet.type === 'star' ? 'Star' : 'Planet'}</p>
            </div>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Description card */}
          <div className="card md:col-span-2">
            <h2 className="text-xl font-bold text-white mb-3">About {planet.name}</h2>
            <p className="text-body">{planet.description}</p>
          </div>

          {/* Stats cards */}
          <div className="card">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-5 h-5 text-planet-earth" />
              <h3 className="font-bold text-white">Distance from Sun</h3>
            </div>
            <p className="text-2xl font-black text-white">{formatDistance(planet.distanceFromSun)}</p>
          </div>

          <div className="card">
            <div className="flex items-center gap-2 mb-3">
              <Ruler className="w-5 h-5 text-planet-sun" />
              <h3 className="font-bold text-white">Diameter</h3>
            </div>
            <p className="text-2xl font-black text-white">{formatDiameter(planet.diameter)}</p>
          </div>

          <div className="card">
            <div className="flex items-center gap-2 mb-3">
              <Orbit className="w-5 h-5 text-planet-mars" />
              <h3 className="font-bold text-white">Orbital Period</h3>
            </div>
            <p className="text-2xl font-black text-white">{planet.orbitalPeriod} days</p>
            <p className="text-sm text-white/50 mt-1">
              {planet.orbitalPeriod === 0 ? 'The Sun does not orbit!' : `That's ${(planet.orbitalPeriod / 365).toFixed(1)} Earth years`}
            </p>
          </div>

          <div className="card">
            <div className="flex items-center gap-2 mb-3">
              <Thermometer className="w-5 h-5 text-planet-jupiter" />
              <h3 className="font-bold text-white">Temperature</h3>
            </div>
            <p className="text-2xl font-black text-white">{planet.temperature}</p>
          </div>

          <div className="card">
            <div className="flex items-center gap-2 mb-3">
              <Moon className="w-5 h-5 text-gray-400" />
              <h3 className="font-bold text-white">Moons</h3>
            </div>
            <p className="text-2xl font-black text-white">{planet.moons}</p>
          </div>

          {/* Fun Fact */}
          <div className="card border-l-4 border-planet-sun">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-planet-sun" />
              <h3 className="font-bold text-planet-sun">Fun Fact!</h3>
            </div>
            <p className="text-body">{planet.funFact}</p>
          </div>
        </div>

        {/* Educational Facts */}
        <div className="card mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Learning Facts</h2>
          <div className="space-y-3">
            {planet.facts.map((fact, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-space-900/50">
                <div className="w-8 h-8 rounded-full bg-planet-earth/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-planet-earth">{index + 1}</span>
                </div>
                <p className="text-white/80">{fact}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to={`/story/${planet.id}`} className="btn-primary flex-1 justify-center">
            <BookOpen className="w-5 h-5" />
            Read Story
          </Link>
          <Link to={`/quiz/${planet.id}`} className="btn-secondary flex-1 justify-center">
            <HelpCircle className="w-5 h-5" />
            Take Quiz
          </Link>
          <Link to="/solar-system" className="btn-secondary flex-1 justify-center">
            🚀 Back to 3D View
          </Link>
        </div>
      </div>
    </div>
  )
}
