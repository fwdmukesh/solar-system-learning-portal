import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Rocket, Star, ChevronRight, Sparkles, Globe, Brain, User, Volume2, VolumeX } from 'lucide-react'
import { planets } from '../data/planets.js'
import { useGameStore } from '../store/useGameStore.js'
import { useVoiceNarration } from '../hooks/useVoiceNarration.js'

function PlanetCard({ planet }) {
  const visitedPlanets = useGameStore((state) => state.visitedPlanets)
  const isVisited = visitedPlanets.includes(planet.id)
  const { speak, stop, isSpeaking } = useVoiceNarration()

  const handleSpeak = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (isSpeaking) {
      stop()
    } else {
      speak(`${planet.name}. ${planet.description} ${planet.funFact}`)
    }
  }

  return (
    <Link
      to={`/planet/${planet.id}`}
      className="card-child group relative overflow-hidden"
    >
      <div className="flex items-center gap-4">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-lg transition-transform group-hover:scale-110"
          style={{
            backgroundColor: planet.color + '20',
            border: `2px solid ${planet.color}`,
          }}
        >
          <span className="text-2xl">
            {planet.id === 'sun' ? '☀️' : planet.id === 'earth' ? '🌍' : planet.id === 'mars' ? '🔴' : planet.id === 'jupiter' ? '🟠' : planet.id === 'saturn' ? '🪐' : planet.id === 'uranus' ? '🔵' : planet.id === 'neptune' ? '🔵' : '⚪'}
          </span>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg text-white group-hover:text-planet-sun transition-colors">
            {planet.name}
          </h3>
          <p className="text-sm text-white/50 line-clamp-1">{planet.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSpeak}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          >
            {isSpeaking ? <VolumeX className="w-4 h-4 text-planet-sun" /> : <Volume2 className="w-4 h-4 text-white/40" />}
          </button>
          {isVisited && (
            <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold">
              ✓ Visited
            </span>
          )}
          <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-white/60 transition-colors" />
        </div>
      </div>
    </Link>
  )
}

function ProfileSetupModal({ onComplete }) {
  const [name, setName] = useState('')
  const setChildName = useGameStore((state) => state.setChildName)
  const { speak } = useVoiceNarration()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.trim()) {
      setChildName(name.trim())
      speak(`Welcome ${name.trim()}! Let's explore the Solar System together!`)
      onComplete()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="card max-w-md w-full text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-planet-sun to-planet-mars flex items-center justify-center mb-6">
          <Rocket className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-black text-white mb-2">Welcome, Explorer!</h2>
        <p className="text-white/60 mb-6">What should we call you on your space adventure?</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-3 bg-space-900/50 rounded-xl px-4 py-3 border border-white/10">
            <User className="w-5 h-5 text-white/40" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name..."
              className="bg-transparent text-white font-bold placeholder-white/30 outline-none flex-1"
              maxLength={20}
              autoFocus
            />
          </div>
          <button type="submit" className="btn-primary w-full" disabled={!name.trim()}>
            <Rocket className="w-5 h-5" />
            Blast Off!
          </button>
        </form>
      </div>
    </div>
  )
}

export default function Home() {
  const childName = useGameStore((state) => state.childName)
  const explorationPoints = useGameStore((state) => state.explorationPoints)
  const visitedPlanets = useGameStore((state) => state.visitedPlanets)
  const earnedBadges = useGameStore((state) => state.earnedBadges)
  const [showProfileSetup, setShowProfileSetup] = useState(!childName)
  const { speak, isSpeaking } = useVoiceNarration()

  useEffect(() => {
    if (childName && !isSpeaking) {
      const timer = setTimeout(() => {
        speak(`Welcome to the Solar System Learning Portal, ${childName}! Click on any planet to start exploring. Let's go on a space adventure!`, { rate: 0.85 })
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [childName, speak, isSpeaking])

  return (
    <div className="relative">
      {showProfileSetup && <ProfileSetupModal onComplete={() => setShowProfileSetup(false)} />}

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-24 px-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-planet-earth/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-planet-sun/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-planet-neptune/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Sparkles className="w-4 h-4 text-planet-sun" />
            <span className="text-sm font-semibold text-white/70">
              {childName ? `Welcome back, ${childName}!` : 'Welcome, Young Explorer!'}
            </span>
          </div>

          <h1 className="title-display mb-4">
            Explore the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-planet-sun via-planet-mars to-planet-earth">
              Solar System
            </span>
          </h1>

          <p className="subtitle-display mb-8 max-w-2xl mx-auto">
            Discover planets, earn badges, and become a Solar System Master!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link to="/solar-system" className="btn-primary w-full sm:w-auto">
              <Rocket className="w-5 h-5" />
              Launch 3D Explorer
            </Link>
            <Link to="/missions" className="btn-secondary w-full sm:w-auto">
              <Star className="w-5 h-5" />
              View Missions
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
            <div className="card p-4">
              <div className="text-3xl font-black text-planet-sun">{explorationPoints}</div>
              <div className="text-xs text-white/50 font-semibold mt-1">Points</div>
            </div>
            <div className="card p-4">
              <div className="text-3xl font-black text-planet-earth">{visitedPlanets.length}</div>
              <div className="text-xs text-white/50 font-semibold mt-1">Planets</div>
            </div>
            <div className="card p-4">
              <div className="text-3xl font-black text-planet-sun">{earnedBadges.length}</div>
              <div className="text-xs text-white/50 font-semibold mt-1">Badges</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black text-center mb-8">What You Can Do</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="card text-center p-6">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-planet-earth/20 flex items-center justify-center mb-4">
                <Globe className="w-7 h-7 text-planet-earth" />
              </div>
              <h3 className="font-bold text-lg mb-2">Explore in 3D</h3>
              <p className="text-sm text-white/50">Fly through the Solar System and visit each planet.</p>
            </div>
            <div className="card text-center p-6">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-planet-sun/20 flex items-center justify-center mb-4">
                <Brain className="w-7 h-7 text-planet-sun" />
              </div>
              <h3 className="font-bold text-lg mb-2">Learn & Quiz</h3>
              <p className="text-sm text-white/50">Read stories and test your knowledge with quizzes.</p>
            </div>
            <div className="card text-center p-6">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-planet-mars/20 flex items-center justify-center mb-4">
                <Star className="w-7 h-7 text-planet-mars" />
              </div>
              <h3 className="font-bold text-lg mb-2">Earn Badges</h3>
              <p className="text-sm text-white/50">Complete missions and collect explorer badges.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Planet List */}
      <section className="py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-black text-center mb-8">Meet the Planets</h2>
          <div className="space-y-3">
            {planets.map((planet) => (
              <PlanetCard key={planet.id} planet={planet} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
