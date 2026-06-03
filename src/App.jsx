import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import Home from './pages/Home.jsx'
import SolarSystemScene from './scenes/SolarSystemScene.jsx'
import PlanetDetail from './pages/PlanetDetail.jsx'
import StoryPage from './pages/StoryPage.jsx'
import QuizPage from './pages/QuizPage.jsx'
import MissionsPage from './pages/MissionsPage.jsx'
import BadgesPage from './pages/BadgesPage.jsx'
import ParentDashboard from './pages/ParentDashboard.jsx'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/solar-system" element={<SolarSystemScene />} />
        <Route path="/planet/:planetId" element={<PlanetDetail />} />
        <Route path="/story/:planetId" element={<StoryPage />} />
        <Route path="/quiz/:planetId" element={<QuizPage />} />
        <Route path="/missions" element={<MissionsPage />} />
        <Route path="/badges" element={<BadgesPage />} />
        <Route path="/parent-dashboard" element={<ParentDashboard />} />
      </Routes>
    </Layout>
  )
}

export default App
