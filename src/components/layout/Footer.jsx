import { Heart, Star } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="ui-layer border-t border-white/10 bg-space-900/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <Star className="w-4 h-4 text-planet-sun" />
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-400 fill-red-400" />
            <span>for young explorers</span>
          </div>
          <p className="text-white/40 text-sm">
            Solar System Learning Portal v1.0
          </p>
        </div>
      </div>
    </footer>
  )
}
