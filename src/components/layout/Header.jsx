import { Link, useLocation } from 'react-router-dom'
import { Rocket, Home, Map, Target, Award, BarChart3, Volume2, VolumeX, User } from 'lucide-react'
import { useGameStore } from '../../store/useGameStore.js'
import { useVoiceNarration } from '../../hooks/useVoiceNarration.js'
import { cn } from '../../lib/utils.js'

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/solar-system', label: 'Explore', icon: Map },
  { path: '/missions', label: 'Missions', icon: Target },
  { path: '/badges', label: 'Badges', icon: Award },
  { path: '/parent-dashboard', label: 'Parents', icon: BarChart3 },
]

export default function Header() {
  const location = useLocation()
  const childName = useGameStore((state) => state.childName)
  const { isSpeaking, stop } = useVoiceNarration()

  return (
    <header className="ui-layer fixed top-0 left-0 right-0 z-50 bg-space-900/80 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-planet-sun to-planet-mars flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <span className="font-black text-xl text-white hidden sm:block">
              Solar<span className="text-planet-sun">Learn</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all',
                    isActive
                      ? 'bg-white/10 text-planet-sun'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Right side: child name + voice toggle */}
          <div className="flex items-center gap-2">
            {childName && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-space-700/50 border border-white/10">
                <User className="w-4 h-4 text-planet-earth" />
                <span className="text-sm font-bold text-white">{childName}</span>
              </div>
            )}
            {isSpeaking && (
              <button
                onClick={stop}
                className="p-2 rounded-xl bg-planet-sun/20 hover:bg-planet-sun/30 transition-colors"
              >
                <VolumeX className="w-4 h-4 text-planet-sun" />
              </button>
            )}

            {/* Mobile: simplified nav */}
            <div className="md:hidden flex items-center gap-1">
              <Link
                to="/"
                className={cn(
                  'p-2 rounded-xl transition-all',
                  location.pathname === '/' ? 'bg-white/10 text-planet-sun' : 'text-white/60'
                )}
              >
                <Home className="w-5 h-5" />
              </Link>
              <Link
                to="/solar-system"
                className={cn(
                  'p-2 rounded-xl transition-all',
                  location.pathname === '/solar-system' ? 'bg-white/10 text-planet-sun' : 'text-white/60'
                )}
              >
                <Map className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
