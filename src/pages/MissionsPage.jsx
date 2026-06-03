import { useNavigate } from 'react-router-dom'
import { Target, CheckCircle, Lock, Rocket, Star, ChevronRight, Globe } from 'lucide-react'
import { missions, planets } from '../data/planets.js'
import { useGameStore } from '../store/useGameStore.js'

export default function MissionsPage() {
  const navigate = useNavigate()
  const completedMissions = useGameStore((state) => state.completedMissions)
  const visitedPlanets = useGameStore((state) => state.visitedPlanets)
  const completeMission = useGameStore((state) => state.completeMission)
  const explorationPoints = useGameStore((state) => state.explorationPoints)

  const isMissionComplete = (mission) => {
    if (mission.type === 'visit') {
      return visitedPlanets.includes(mission.target)
    }
    if (mission.type === 'identify') {
      return visitedPlanets.includes(mission.target)
    }
    if (mission.type === 'visit-multiple') {
      return mission.target.every((t) => visitedPlanets.includes(t))
    }
    return completedMissions.includes(mission.id)
  }

  const handleMissionClick = (mission) => {
    if (mission.type === 'visit' || mission.type === 'identify') {
      navigate(`/solar-system`)
    } else if (mission.type === 'visit-multiple') {
      navigate(`/solar-system`)
    }
  }

  const claimMission = (mission) => {
    if (isMissionComplete(mission) && !completedMissions.includes(mission.id)) {
      completeMission(mission.id)
    }
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-planet-mars/10 border border-planet-mars/20 mb-4">
            <Target className="w-4 h-4 text-planet-mars" />
            <span className="text-sm font-bold text-planet-mars">Missions</span>
          </div>
          <h1 className="title-display mb-2">Space Missions</h1>
          <p className="subtitle-display">Complete missions to earn points and badges!</p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-space-700">
            <Star className="w-4 h-4 text-planet-sun" />
            <span className="font-bold text-white">{explorationPoints} Points</span>
          </div>
        </div>

        {/* Mission Cards */}
        <div className="space-y-4">
          {missions.map((mission) => {
            const complete = isMissionComplete(mission)
            const claimed = completedMissions.includes(mission.id)
            const planet = planets.find((p) => p.id === mission.target)
            const planetColor = planet?.color || '#60a5fa'

            return (
              <div
                key={mission.id}
                className={`card transition-all ${
                  complete && !claimed ? 'border-planet-sun/50 cursor-pointer hover:scale-[1.01]' : ''
                } ${claimed ? 'opacity-70' : ''}`}
                onClick={() => {
                  if (complete && !claimed) claimMission(mission)
                  else if (!complete) handleMissionClick(mission)
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: claimed ? '#22c55e20' : complete ? planetColor + '20' : '#1e293b',
                      border: `2px solid ${claimed ? '#22c55e' : complete ? planetColor : '#334155'}`,
                    }}
                  >
                    {claimed ? (
                      <CheckCircle className="w-7 h-7 text-green-500" />
                    ) : complete ? (
                      <Rocket className="w-7 h-7" style={{ color: planetColor }} />
                    ) : (
                      <Lock className="w-7 h-7 text-white/30" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-lg text-white">{mission.title}</h3>
                      <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-planet-sun/10">
                        <Star className="w-3 h-3 text-planet-sun" />
                        <span className="text-xs font-bold text-planet-sun">+{mission.reward}</span>
                      </div>
                    </div>
                    <p className="text-white/60 text-sm mb-2">{mission.description}</p>
                    <div className="flex items-center gap-2">
                      {complete && !claimed && (
                        <span className="px-3 py-1 rounded-full bg-planet-sun/20 text-planet-sun text-xs font-bold">
                          🎉 Click to claim!
                        </span>
                      )}
                      {claimed && (
                        <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold">
                          ✓ Completed
                        </span>
                      )}
                      {!complete && (
                        <span className="px-3 py-1 rounded-full bg-space-700 text-white/40 text-xs font-bold flex items-center gap-1">
                          <Globe className="w-3 h-3" />
                          Go to 3D view
                        </span>
                      )}
                    </div>
                  </div>

                  <ChevronRight className={`w-5 h-5 flex-shrink-0 ${
                    complete && !claimed ? 'text-planet-sun' : 'text-white/20'
                  }`} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
