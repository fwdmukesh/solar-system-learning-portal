Solar System Learning Portal 🚀
An immersive 3D educational platform for Grade 3 children to explore the Solar System.
Live Demo: Deploy to Vercel
 Tech Stack 

 Tech Stack 

 Tech Stack 

 Tech Stack 
Features (All 12 Phases Complete)
Table
Phase	Feature	Status
1	Project Foundation	✅ Vite + React + Tailwind + PWA
2	3D Solar System	✅ Three.js + R3F + Orbit animation
3	Planet Information	✅ Facts, stats, fun facts
4	Spaceship Navigation	✅ Cartoon ship + camera follow
5	Story Learning	✅ 3 facts + story + challenge per planet
6	Mission System	✅ Visit, identify, multi-visit missions
7	Badges	✅ Bronze/Silver/Gold tier badges
8	Quiz System	✅ 3 MCQs per planet + scoring
9	Supabase Integration	✅ Schema + client + RLS policies
10	Voice Narration	✅ Web Speech API + scripts
11	Parent Dashboard	✅ Progress, scores, export
12	Production Deployment	✅ Vercel + PWA + mobile
Tech Stack
React 18.2 + Vite 5
Three.js 0.160 + React Three Fiber 8.15 + Drei 9.92
TailwindCSS 3.4
Zustand (state management with persist)
React Router v6
Supabase (backend)
PWA (vite-plugin-pwa)
Web Speech API (voice narration)
Quick Start
1. Clone & Install
bash
git clone https://github.com/yourusername/solar-system-learning-portal.git
cd solar-system-learning-portal
npm install
2. Environment Variables
Create a .env file:
env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
For local development without Supabase, the app works fully with localStorage (Zustand persist). Supabase sync is optional in Phase 9.
3. Run Development Server
bash
npm run dev
Open http://localhost:3000
4. Build for Production
bash
npm run build
How to Run Online
Replit
Create a new Repl → Import from GitHub
Paste your repo URL
Run command: npm run dev
Click Run
StackBlitz
Go to stackblitz.com
Click Import from GitHub
Paste repo URL — auto-detects Vite
GitHub + Vercel (Recommended)
Step 1: Push to GitHub
bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/solar-system-learning-portal.git
git push -u origin main
Step 2: Deploy to Vercel
Go to vercel.com → Sign up with GitHub
Click Add New Project
Import solar-system-learning-portal
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Add Environment Variables (if using Supabase):
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
Click Deploy
Step 3: PWA Setup
The vite-plugin-pwa automatically generates service worker
Add PWA icons to public/icons/:
icon-192x192.png (192×192)
icon-512x512.png (512×512)
Manifest is auto-generated from vite.config.js
Step 4: Mobile Installation
iOS Safari: Tap Share → "Add to Home Screen"
Android Chrome: Tap Menu → "Add to Home screen"
Desktop Chrome: Address bar → Install icon
Project Structure
plain
solar-system-learning-portal/
├── public/
│   ├── manifest.json
│   └── icons/              # PWA icons
├── src/
│   ├── components/
│   │   └── layout/
│   │       ├── Layout.jsx
│   │       ├── Header.jsx
│   │       └── Footer.jsx
│   ├── pages/
│   │   ├── Home.jsx        # Landing + profile setup
│   │   ├── PlanetDetail.jsx # Full planet info
│   │   ├── StoryPage.jsx   # Story + challenge
│   │   ├── QuizPage.jsx    # MCQ quiz system
│   │   ├── MissionsPage.jsx # Mission tracking
│   │   ├── BadgesPage.jsx  # Badge collection
│   │   └── ParentDashboard.jsx # Parent analytics
│   ├── scenes/
│   │   ├── SolarSystemScene.jsx # Main 3D scene
│   │   ├── Stars.jsx       # Starfield background
│   │   ├── Sun.jsx         # Glowing sun
│   │   ├── Planet.jsx      # Animated planet
│   │   ├── Orbit.jsx       # Orbit ring
│   │   ├── PlanetLabel.jsx # HTML labels
│   │   └── Spaceship.jsx   # Cartoon spaceship
│   ├── store/
│   │   └── useGameStore.js # Zustand game state
│   ├── hooks/
│   │   └── useVoiceNarration.js # Web Speech API
│   ├── lib/
│   │   ├── supabase.js     # Supabase client
│   │   └── utils.js        # Helpers
│   ├── data/
│   │   └── planets.js      # Planet data + quizzes
│   ├── App.jsx             # Router
│   ├── main.jsx            # Entry
│   └── index.css           # Tailwind + custom styles
├── supabase/
│   └── schema.sql          # Database schema
├── docs/
│   └── voice-narration.md  # Voice scripts
├── index.html
├── vite.config.js          # Vite + PWA config
├── tailwind.config.js      # Tailwind theme
├── postcss.config.js
├── package.json
├── .env.example
├── .gitignore
└── README.md
Supabase Setup (Phase 9)
Create project at supabase.com
Go to SQL Editor → New Query
Paste contents of supabase/schema.sql
Run the query
Copy Project URL and Anon Key from Settings → API
Add to .env file
Voice Narration (Phase 10)
The app uses the Web Speech API — no setup required!
Works in Chrome, Edge, Safari, Firefox
Auto-detects voices
Age-appropriate speech rate (0.9x)
Tap the 🔊 icon on any planet card to hear narration
See docs/voice-narration.md for all scripts.
Dependency Compatibility
Table
Package	Version	Verified
react	18.2.0	✅
react-dom	18.2.0	✅
three	0.160.0	✅
@react-three/fiber	8.15.12	✅
@react-three/drei	9.92.7	✅
react-router-dom	6.20.1	✅
zustand	4.4.7	✅
@supabase/supabase-js	2.39.1	✅
vite	5.0.8	✅
vite-plugin-pwa	0.17.4	✅
tailwindcss	3.4.0	✅
lucide-react	0.294.0	✅
Browser Support
Chrome/Edge 90+ (Recommended)
Firefox 88+
Safari 14+
iOS Safari 14+
Android Chrome 90+
License
MIT License — free for educational use.
Built with ❤️ for young space explorers.
