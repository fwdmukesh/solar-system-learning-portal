import { useNavigate } from 'react-router-dom'
import { Award, Lock, Star, ChevronRight, Trophy } from 'lucide-react'
import { badges, planets } from '../data/planets.js'
import { useGameStore } from '../store/useGameStore.js'

const tierColors = {
  bronze: { bg: '#cd7f3220', border: '#cd7f32', text: '#cd7f32' },
  silver: { bg: '#c0c0c020', border: '#c0c0c0', text: '#c0c0c0' },
  gold: { bg: '#ffd70020', border: '#ffd700', text: '#ffd700' },
  platinum: { bg: '#e5e4e220', border: '#e5e4e2', text: '#e5e4e2' },
}

export default function BadgesPage() {
  const navigate = useNavigate()
  const earnedBadges = useGameStore((state) => state.earnedBadges)
  const visitedPlanets = useGameStore((state) => state.visitedPlanets)
  const earnBadge = useGameStore((state) => state.earnBadge)
  const explorationPoints = useGameStore((state) => state.explorationPoints)

  const isBadgeEarned = (badge) => {
    if (badge.planet === 'all') {
      return visitedPlanets.length >= 8
    }
    return earnedBadges.includes(badge.id) || visitedPlanets.includes(badge.planet)
  }

  const handleBadgeClick = (badge) => {
    if (isBadgeEarned(badge) && !earnedBadges.includes(badge.id)) {
      earnBadge(badge.id)
    }
    if (badge.planet && badge.planet !== 'all') {
      navigate(`/planet/${badge.planet}`)
    }
  }

  const earnedCount = badges.filter((b) => earnedBadges.includes(b.id) || isBadgeEarned(b)).length

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-planet-sun/10 border border-planet-sun/20 mb-4">
            <Award className="w-4 h-4 text-planet-sun" />
            <span className="text-sm font-bold text-planet-sun">Badges</span>
          </div>
          <h1 className="title-display mb-2">Your Collection</h1>
          <p className="subtitle-display">Earn badges by exploring planets!</p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-space-700">
              <Trophy className="w-4 h-4 text-planet-sun" />
              <span className="font-bold text-white">{earnedCount} / {badges.length} Badges</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-space-700">
              <Star className="w-4 h-4 text-planet-sun" />
              <span className="font-bold text-white">{explorationPoints} Points</span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="h-3 bg-space-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-badge-bronze via-badge-silver to-badge-gold rounded-full transition-all"
              style={{ width: `${(earnedCount / badges.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Badge Grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {badges.map((badge) => {
            const earned = isBadgeEarned(badge)
            const claimed = earnedBadges.includes(badge.id)
            const tier = tierColors[badge.tier]

            return (
              <div
                key={badge.id}
                className={`card transition-all ${
                  earned && !claimed ? 'cursor-pointer hover:scale-[1.02] border-planet-sun/50' : ''
                } ${!earned ? 'opacity-50' : ''} ${claimed ? 'border-green-500/30' : ''}`}
                onClick={() => handleBadgeClick(badge)}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                    style={{
                      backgroundColor: earned ? tier.bg : '#1e293b',
                      border: `2px solid ${earned ? tier.border : '#334155'}`,
                    }}
                  >
                    {earned ? badge.icon : <Lock className="w-6 h-6 text-white/30" />}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-lg text-white">{badge.name}</h3>
                      <span
                        className="px-2 py-0.5 rounded-full text-xs font-bold uppercase"
                        style={{ backgroundColor: tier.bg, color: tier.text }}
                      >
                        {badge.tier}
                      </span>
                    </div>
                    <p className="text-white/60 text-sm mb-2">{badge.description}</p>
                    <div className="flex items-center gap-2">
                      {earned && !claimed && (
                        <span className="px-3 py-1 rounded-full bg-planet-sun/20 text-planet-sun text-xs font-bold">
                          🎉 Click to claim!
                        </span>
                      )}
                      {claimed && (
                        <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold">
                          ✓ Earned
                        </span>
                      )}
                      {!earned && (
                        <span className="px-3 py-1 rounded-full bg-space-700 text-white/30 text-xs font-bold">
                          🔒 Locked
                        </span>
                      )}
                    </div>
                  </div>

                  <ChevronRight className={`w-5 h-5 flex-shrink-0 ${
                    earned ? 'text-white/40' : 'text-white/10'
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
