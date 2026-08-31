import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AppProvider } from './context/AppContext';
import { AuthProvider, ProtectedRoute } from './context/AuthContext';
import AppLayout from './components/layout/AppLayout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import MyEduTwin from './pages/MyEduTwin';
import Learn from './pages/Learn';
import Assessments from './pages/Assessments';
import Progress from './pages/Progress';
import AITutor from './pages/AITutor';
import StudyPlanner from './pages/StudyPlanner';
import CareerPath from './pages/CareerPath';
import Achievements from './pages/Achievements';
import Settings from './pages/Settings';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppProvider>
          <HashRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />

              {/* Protected App Experience */}
              <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/edutwin" element={<MyEduTwin />} />
                <Route path="/learn" element={<Learn />} />
                <Route path="/assessments" element={<Assessments />} />
                <Route path="/progress" element={<Progress />} />
                <Route path="/tutor" element={<AITutor />} />
                <Route path="/planner" element={<StudyPlanner />} />
                <Route path="/career" element={<CareerPath />} />
                <Route path="/achievements" element={<Achievements />} />
                <Route path="/settings" element={<Settings />} />
              </Route>

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </HashRouter>
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
