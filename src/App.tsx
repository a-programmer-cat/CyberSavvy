import { MainNav } from './components/MainNav'
import { Home } from './pages/Home'
import { LearningHub } from './pages/LearningHub'
import { CyberTest } from './pages/CyberTest'
import { RealStories } from './pages/RealStories'
import  HelpPage  from './pages/HelpPage'
import { CategoryOverview } from './pages/CategoryOverview'
import { LessonPage } from './pages/LessonPage'
import { QuizPage } from './pages/QuizPage'
import { Login } from './pages/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <MainNav />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learning" element={<LearningHub />} />
            <Route path="/test" element={<CyberTest />} />
            <Route path="/stories" element={<RealStories />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/learning/:category" element={<CategoryOverview />} />
            <Route path="/learning/:category/:lessonId" element={<LessonPage />} />
            <Route path="/test/:category" element={<QuizPage />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <footer className="bg-gray-800 text-white p-4">
          <div className="container mx-auto text-center">
            <p>© 2025 CyberSavvy - All rights reserved</p>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App