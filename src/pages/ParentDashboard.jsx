import { useNavigate } from 'react-router-dom'
import { BarChart3, Clock, Award, BookOpen, TrendingUp, User, Calendar, ArrowLeft, Download } from 'lucide-react'
import { useGameStore } from '../store/useGameStore.js'
import { planets, badges } from '../data/planets.js'

export default function ParentDashboard() {
  const navigate = useNavigate()
  const childName = useGameStore((state) => state.childName)
  const visitedPlanets = useGameStore((state) => state.visitedPlanets)
  const earnedBadges = useGameStore((state) => state.earnedBadges)
  const quizScores = useGameStore((state) => state.quizScores)
  const explorationPoints = useGameStore((state) => state.explorationPoints)
  const completedMissions = useGameStore((state) => state.completedMissions)
  const getQuizAverage = useGameStore((state) => state.getQuizAverage)
  const getTotalPlanetsVisited = useGameStore((state) => state.getTotalPlanetsVisited)
  const getTotalMissionsCompleted = useGameStore((state) => state.getTotalMissionsCompleted)
  const getTotalBadgesEarned = useGameStore((state) => state.getTotalBadgesEarned)

  const quizAverage = getQuizAverage()
  const totalPlanets = getTotalPlanetsVisited()
  const totalMissions = getTotalMissionsCompleted()
  const totalBadges = getTotalBadgesEarned()

  const exportData = () => {
    const data = {
      childName,
      exportDate: new Date().toISOString(),
      stats: {
        explorationPoints,
        totalPlanetsVisited: totalPlanets,
        totalMissionsCompleted: totalMissions,
        totalBadgesEarned: totalBadges,
        quizAverage: quizAverage,
      },
      visitedPlanets,
      earnedBadges,
      quizScores,
      completedMissions,
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `solar-learn-progress-${childName || 'child'}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/')}
            className="p-3 rounded-xl bg-space-700 hover:bg-space-700/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h1 className="title-display">Parent Dashboard</h1>
            <p className="text-white/50">Track your child's learning journey</p>
          </div>
        </div>

        {/* Child Profile */}
        <div className="card mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-planet-earth/20 flex items-center justify-center">
              <User className="w-8 h-8 text-planet-earth" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{childName || 'Young Explorer'}</h2>
              <p className="text-white/50">Grade 3 • Solar System Explorer</p>
            </div>
            <button
              onClick={exportData}
              className="ml-auto btn-secondary py-2 px-4 text-sm"
            >
              <Download className="w-4 h-4" />
              Export Data
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="card text-center">
            <div className="w-12 h-12 mx-auto rounded-xl bg-planet-sun/20 flex items-center justify-center mb-3">
              <TrendingUp className="w-6 h-6 text-planet-sun" />
            </div>
            <div className="text-3xl font-black text-white">{explorationPoints}</div>
            <div className="text-xs text-white/50 font-semibold mt-1">Total Points</div>
          </div>
          <div className="card text-center">
            <div className="w-12 h-12 mx-auto rounded-xl bg-planet-earth/20 flex items-center justify-center mb-3">
              <BookOpen className="w-6 h-6 text-planet-earth" />
            </div>
            <div className="text-3xl font-black text-white">{totalPlanets}</div>
            <div className="text-xs text-white/50 font-semibold mt-1">Planets Visited</div>
          </div>
          <div className="card text-center">
            <div className="w-12 h-12 mx-auto rounded-xl bg-planet-mars/20 flex items-center justify-center mb-3">
              <BarChart3 className="w-6 h-6 text-planet-mars" />
            </div>
            <div className="text-3xl font-black text-white">{quizAverage}%</div>
            <div className="text-xs text-white/50 font-semibold mt-1">Quiz Average</div>
          </div>
          <div className="card text-center">
            <div className="w-12 h-12 mx-auto rounded-xl bg-planet-jupiter/20 flex items-center justify-center mb-3">
              <Award className="w-6 h-6 text-planet-jupiter" />
            </div>
            <div className="text-3xl font-black text-white">{totalBadges}</div>
            <div className="text-xs text-white/50 font-semibold mt-1">Badges Earned</div>
          </div>
        </div>

        {/* Progress Sections */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Planet Completion */}
          <div className="card">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-planet-earth" />
              Planet Completion
            </h3>
            <div className="space-y-3">
              {planets.map((planet) => {
                const visited = visitedPlanets.includes(planet.id)
                return (
                  <div key={planet.id} className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                      style={{
                        backgroundColor: visited ? planet.color + '30' : '#1e293b',
                        border: `2px solid ${visited ? planet.color : '#334155'}`,
                      }}
                    >
                      {visited ? '✓' : '○'}
                    </div>
                    <span className={`flex-1 ${visited ? 'text-white' : 'text-white/40'}`}>
                      {planet.name}
                    </span>
                    {visited && (
                      <span className="text-xs text-green-400 font-bold">Visited</span>
                    )}
                  </div>
                )
              })}
            </div>
            <div className="mt-4 h-2 bg-space-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-planet-earth rounded-full transition-all"
                style={{ width: `${(totalPlanets / planets.length) * 100}%` }}
              />
            </div>
            <p className="text-xs text-white/40 mt-2 text-center">
              {totalPlanets} of {planets.length} planets explored
            </p>
          </div>

          {/* Quiz Scores */}
          <div className="card">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-planet-mars" />
              Quiz Performance
            </h3>
            {Object.keys(quizScores).length === 0 ? (
              <p className="text-white/40 text-center py-8">No quizzes taken yet</p>
            ) : (
              <div className="space-y-3">
                {Object.entries(quizScores).map(([planetId, data]) => {
                  const planet = planets.find((p) => p.id === planetId)
                  const percentage = Math.round((data.score / data.total) * 100)
                  return (
                    <div key={planetId} className="p-3 rounded-xl bg-space-900/50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-white">{planet?.name || planetId}</span>
                        <span className={`font-bold ${percentage >= 80 ? 'text-green-400' : percentage >= 50 ? 'text-planet-sun' : 'text-red-400'}`}>
                          {percentage}%
                        </span>
                      </div>
                      <div className="h-2 bg-space-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${percentage >= 80 ? 'bg-green-500' : percentage >= 50 ? 'bg-planet-sun' : 'bg-red-500'}`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <p className="text-xs text-white/40 mt-1">
                        {data.score}/{data.total} correct
                      </p>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Badges Earned */}
        <div className="card">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-planet-jupiter" />
            Badges Earned
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {badges.map((badge) => {
              const earned = earnedBadges.includes(badge.id)
              return (
                <div
                  key={badge.id}
                  className={`p-4 rounded-xl text-center transition-all ${
                    earned ? 'bg-space-700/50' : 'bg-space-900/30 opacity-40'
                  }`}
                >
                  <div className="text-3xl mb-2">{earned ? badge.icon : '🔒'}</div>
                  <p className="text-xs font-bold text-white">{badge.name}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
