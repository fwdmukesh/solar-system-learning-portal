import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle, XCircle, Trophy, RotateCcw, ChevronRight, Star } from 'lucide-react'
import { useState, useCallback } from 'react'
import { planets, quizQuestions } from '../data/planets.js'
import { useGameStore } from '../store/useGameStore.js'

export default function QuizPage() {
  const { planetId } = useParams()
  const navigate = useNavigate()
  const planet = planets.find((p) => p.id === planetId)
  const questions = quizQuestions[planetId] || []
  const [currentQ, setCurrentQ] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState([])
  const [quizComplete, setQuizComplete] = useState(false)
  const saveQuizScore = useGameStore((state) => state.saveQuizScore)
  const earnBadge = useGameStore((state) => state.earnBadge)
  const earnedBadges = useGameStore((state) => state.earnedBadges)

  if (!planet) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black text-white mb-4">Quiz Not Found ❓</h1>
          <button onClick={() => navigate('/')} className="btn-primary">Go Home</button>
        </div>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <button onClick={() => navigate(-1)} className="mb-8 p-3 rounded-xl bg-space-700">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-3xl font-black text-white mb-4">Quiz Coming Soon!</h1>
          <p className="text-white/60 mb-6">We're preparing questions for {planet.name}. Check back later!</p>
          <button onClick={() => navigate(`/story/${planetId}`)} className="btn-primary">
            Read Story Instead
          </button>
        </div>
      </div>
    )
  }

  const question = questions[currentQ]
  const isCorrect = selectedOption === question.correct

  const handleOptionSelect = (index) => {
    if (showFeedback) return
    setSelectedOption(index)
    setShowFeedback(true)

    const newAnswers = [...answers, { question: currentQ, selected: index, correct: index === question.correct }]
    setAnswers(newAnswers)

    if (index === question.correct) {
      setScore((s) => s + 1)
    }
  }

  const handleNext = useCallback(() => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((c) => c + 1)
      setSelectedOption(null)
      setShowFeedback(false)
    } else {
      setQuizComplete(true)
      saveQuizScore(planetId, score + (isCorrect ? 1 : 0), questions.length)
      // Check for perfect score badge
      if (score + (isCorrect ? 1 : 0) === questions.length) {
        const badgeId = `${planetId}-quiz-master`
        if (!earnedBadges.includes(badgeId)) {
          earnBadge(badgeId)
        }
      }
    }
  }, [currentQ, questions.length, score, isCorrect, planetId, saveQuizScore, earnBadge, earnedBadges])

  const handleRetry = () => {
    setCurrentQ(0)
    setSelectedOption(null)
    setShowFeedback(false)
    setScore(0)
    setAnswers([])
    setQuizComplete(false)
  }

  const finalScore = quizComplete ? score + (isCorrect && !answers.find(a => a.question === currentQ) ? 1 : 0) : score

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate(-1)} className="p-3 rounded-xl bg-space-700 hover:bg-space-700/80 transition-colors">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h1 className="text-2xl font-black text-white">{planet.name} Quiz</h1>
            <p className="text-white/50">Test your knowledge!</p>
          </div>
        </div>

        {!quizComplete ? (
          <>
            {/* Progress */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-white/50 mb-2">
                <span>Question {currentQ + 1} of {questions.length}</span>
                <span>Score: {score}/{currentQ + (showFeedback ? 1 : 0)}</span>
              </div>
              <div className="h-2 bg-space-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-planet-earth rounded-full transition-all"
                  style={{ width: `${((currentQ + (showFeedback ? 1 : 0)) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="card mb-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-planet-earth/20 flex items-center justify-center">
                  <span className="font-bold text-planet-earth">{currentQ + 1}</span>
                </div>
                <h2 className="text-lg font-bold text-white">{question.question}</h2>
              </div>

              <div className="space-y-3">
                {question.options.map((option, index) => {
                  const isSelected = selectedOption === index
                  const isCorrectOption = index === question.correct
                  const showCorrect = showFeedback && isCorrectOption
                  const showWrong = showFeedback && isSelected && !isCorrectOption

                  return (
                    <button
                      key={index}
                      onClick={() => handleOptionSelect(index)}
                      disabled={showFeedback}
                      className={`
                        w-full p-4 rounded-xl text-left font-semibold transition-all
                        ${showCorrect ? 'bg-green-500/20 border-2 border-green-500 text-green-400' : ''}
                        ${showWrong ? 'bg-red-500/20 border-2 border-red-500 text-red-400' : ''}
                        ${!showFeedback && isSelected ? 'bg-planet-earth/20 border-2 border-planet-earth text-white' : ''}
                        ${!showFeedback && !isSelected ? 'bg-space-900/50 hover:bg-space-900/80 text-white/80' : ''}
                        ${showFeedback && !isSelected && !isCorrectOption ? 'bg-space-900/30 text-white/40' : ''}
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {showCorrect && <CheckCircle className="w-5 h-5 text-green-400" />}
                        {showWrong && <XCircle className="w-5 h-5 text-red-400" />}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Feedback */}
            {showFeedback && (
              <div className={`card mb-6 ${isCorrect ? 'border-green-500/30' : 'border-red-500/30'}`}>
                <div className="flex items-start gap-3">
                  {isCorrect ? (
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className={`font-bold mb-1 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                      {isCorrect ? 'Correct! 🎉' : 'Not quite! 😅'}
                    </p>
                    <p className="text-white/70">{question.explanation}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Next button */}
            {showFeedback && (
              <button onClick={handleNext} className="btn-primary w-full">
                {currentQ < questions.length - 1 ? 'Next Question' : 'See Results'}
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </>
        ) : (
          /* Quiz Complete */
          <div className="card text-center py-12">
            <div className="w-20 h-20 mx-auto rounded-full bg-planet-sun/20 flex items-center justify-center mb-6">
              <Trophy className="w-10 h-10 text-planet-sun" />
            </div>
            <h2 className="text-3xl font-black text-white mb-2">Quiz Complete!</h2>
            <p className="text-white/60 mb-6">You scored {finalScore} out of {questions.length}</p>

            <div className="flex justify-center gap-2 mb-8">
              {Array.from({ length: questions.length }).map((_, i) => (
                <div
                  key={i}
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    i < finalScore ? 'bg-green-500/20 text-green-400' : 'bg-space-700 text-white/30'
                  }`}
                >
                  {i < finalScore ? <Star className="w-5 h-5 fill-current" /> : <XCircle className="w-5 h-5" />}
                </div>
              ))}
            </div>

            {finalScore === questions.length && (
              <div className="p-4 rounded-xl bg-planet-sun/10 border border-planet-sun/20 mb-6">
                <p className="font-bold text-planet-sun">🏆 Perfect Score! You earned the {planet.name} Quiz Master badge!</p>
              </div>
            )}

            <div className="flex gap-4">
              <button onClick={handleRetry} className="btn-secondary flex-1">
                <RotateCcw className="w-5 h-5" />
                Try Again
              </button>
              <button onClick={() => navigate(`/story/${planetId}`)} className="btn-primary flex-1">
                Read Story
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
