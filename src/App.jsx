import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
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

// Seamlessly migrates legacy hash URLs (e.g. /#/login -> /login, /#/signup -> /signup)
function HashUrlHandler() {
  const navigate = useNavigate();
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash && window.location.hash.startsWith('#/')) {
      const targetPath = window.location.hash.substring(1);
      window.history.replaceState(null, '', targetPath);
      navigate(targetPath, { replace: true });
    }
  }, [navigate]);
  return null;
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppProvider>
          <BrowserRouter>
            <HashUrlHandler />
            <Routes>
              {/* Public Routes - Always accessible without ProtectedRoute */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage initialMode="login" />} />
              <Route path="/signup" element={<LoginPage initialMode="signup" />} />
              <Route path="/register" element={<LoginPage initialMode="signup" />} />

              {/* Protected App Routes */}
              <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/edutwin" element={<MyEduTwin />} />
                <Route path="/learn" element={<Learn />} />
                <Route path="/assessments" element={<Assessments />} />
                <Route path="/progress" element={<Progress />} />
                
                {/* AI Tutor and alias */}
                <Route path="/tutor" element={<AITutor />} />
                <Route path="/ai-tutor" element={<AITutor />} />

                {/* Study Planner and alias */}
                <Route path="/planner" element={<StudyPlanner />} />
                <Route path="/study-planner" element={<StudyPlanner />} />

                {/* Career Path and alias */}
                <Route path="/career" element={<CareerPath />} />
                <Route path="/career-path" element={<CareerPath />} />

                <Route path="/achievements" element={<Achievements />} />
                <Route path="/settings" element={<Settings />} />
              </Route>

              {/* Fallback to Home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
