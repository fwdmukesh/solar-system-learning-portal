import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, BookOpen, Star, CheckCircle, Lock, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { planets } from '../data/planets.js'
import { useGameStore } from '../store/useGameStore.js'

export default function StoryPage() {
  const { planetId } = useParams()
  const navigate = useNavigate()
  const planet = planets.find((p) => p.id === planetId)
  const [challengeCompleted, setChallengeCompleted] = useState(false)
  const completeMission = useGameStore((state) => state.completeMission)

  if (!planet) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black text-white mb-4">Story Not Found 📖</h1>
          <button onClick={() => navigate('/')} className="btn-primary">Go Home</button>
        </div>
      </div>
    )
  }

  const handleChallengeComplete = () => {
    setChallengeCompleted(true)
    completeMission(`story-${planet.id}`)
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto">
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
              className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
              style={{ backgroundColor: planet.color + '30', border: `2px solid ${planet.color}` }}
            >
              {planet.id === 'sun' ? '☀️' : planet.id === 'earth' ? '🌍' : planet.id === 'mars' ? '🔴' : planet.id === 'jupiter' ? '🟠' : planet.id === 'saturn' ? '🪐' : planet.id === 'uranus' ? '🔵' : planet.id === 'neptune' ? '🔵' : '⚪'}
            </div>
            <div>
              <h1 className="text-3xl font-black text-white">{planet.name}'s Story</h1>
              <p className="text-white/50">Read, learn, and complete the challenge!</p>
            </div>
          </div>
        </div>

        {/* Facts Cards */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-planet-sun" />
            3 Learning Facts
          </h2>
          <div className="space-y-4">
            {planet.facts.map((fact, index) => (
              <div key={index} className="card border-l-4" style={{ borderLeftColor: planet.color }}>
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: planet.color + '20' }}
                  >
                    <span className="font-bold" style={{ color: planet.color }}>{index + 1}</span>
                  </div>
                  <p className="text-white/80 text-lg leading-relaxed">{fact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Story Card */}
        <div className="card mb-8 bg-gradient-to-br from-space-800 to-space-700">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-6 h-6 text-planet-sun" />
            <h2 className="text-xl font-bold text-white">The Story of {planet.name}</h2>
          </div>
          <div className="bg-space-900/50 rounded-2xl p-6">
            <p className="text-lg text-white/80 leading-relaxed font-body">
              {planet.story}
            </p>
          </div>
        </div>

        {/* Challenge */}
        <div className="card mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Lock className="w-6 h-6 text-planet-mars" />
            <h2 className="text-xl font-bold text-white">Challenge!</h2>
          </div>
          <p className="text-body mb-4">
            Can you remember? What is one special thing about {planet.name}?
          </p>
          <div className="space-y-2 mb-4">
            {planet.facts.map((fact, index) => (
              <button
                key={index}
                onClick={handleChallengeComplete}
                className="w-full text-left p-4 rounded-xl bg-space-900/50 hover:bg-space-900/80 transition-colors text-white/80 hover:text-white"
              >
                {fact}
              </button>
            ))}
          </div>
          {challengeCompleted && (
            <div className="flex items-center gap-2 p-4 rounded-xl bg-green-500/20 text-green-400">
              <CheckCircle className="w-5 h-5" />
              <span className="font-bold">Great job! Challenge completed! +50 points</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex gap-4">
          <button onClick={() => navigate(`/quiz/${planet.id}`)} className="btn-primary flex-1">
            Take Quiz
            <ChevronRight className="w-5 h-5" />
          </button>
          <button onClick={() => navigate(`/planet/${planet.id}`)} className="btn-secondary flex-1">
            Planet Details
          </button>
        </div>
      </div>
    </div>
  )
}
