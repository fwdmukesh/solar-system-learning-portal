import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useGameStore = create(
  persist(
    (set, get) => ({
      // Child Profile
      childName: '',
      setChildName: (name) => set({ childName: name }),

      // Progress
      visitedPlanets: [],
      completedMissions: [],
      earnedBadges: [],
      quizScores: {},
      explorationPoints: 0,

      // Actions
      visitPlanet: (planetName) =>
        set((state) => {
          if (state.visitedPlanets.includes(planetName)) return state
          return {
            visitedPlanets: [...state.visitedPlanets, planetName],
            explorationPoints: state.explorationPoints + 10,
          }
        }),

      completeMission: (missionId) =>
        set((state) => {
          if (state.completedMissions.includes(missionId)) return state
          return {
            completedMissions: [...state.completedMissions, missionId],
            explorationPoints: state.explorationPoints + 50,
          }
        }),

      earnBadge: (badgeId) =>
        set((state) => {
          if (state.earnedBadges.includes(badgeId)) return state
          return {
            earnedBadges: [...state.earnedBadges, badgeId],
            explorationPoints: state.explorationPoints + 100,
          }
        }),

      saveQuizScore: (planet, score, total) =>
        set((state) => ({
          quizScores: {
            ...state.quizScores,
            [planet]: { score, total, date: new Date().toISOString() },
          },
          explorationPoints: state.explorationPoints + score * 5,
        })),

      // Computed
      getTotalPlanetsVisited: () => get().visitedPlanets.length,
      getTotalMissionsCompleted: () => get().completedMissions.length,
      getTotalBadgesEarned: () => get().earnedBadges.length,
      getQuizAverage: () => {
        const scores = Object.values(get().quizScores)
        if (scores.length === 0) return 0
        const total = scores.reduce((acc, s) => acc + (s.score / s.total) * 100, 0)
        return Math.round(total / scores.length)
      },

      // Reset
      resetProgress: () =>
        set({
          visitedPlanets: [],
          completedMissions: [],
          earnedBadges: [],
          quizScores: {},
          explorationPoints: 0,
        }),
    }),
    {
      name: 'solar-system-game-storage',
      version: 1,
    }
  )
)
