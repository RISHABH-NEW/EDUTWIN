import { createContext, useContext, useState, useCallback } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import {
  studentProfile as defaultProfile,
  overviewStats as defaultStats,
  subjects as defaultSubjects,
  studyPlanDefault,
  achievementsList as defaultAchievements,
  notifications as defaultNotifications,
} from '../data/mockData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [profile, setProfile] = useLocalStorage('edutwin-profile', defaultProfile);
  const [stats, setStats] = useLocalStorage('edutwin-stats', defaultStats);
  const [subjects, setSubjects] = useLocalStorage('edutwin-subjects', defaultSubjects);
  const [studyPlan, setStudyPlan] = useLocalStorage('edutwin-study-plan', studyPlanDefault);
  const [achievements, setAchievements] = useLocalStorage('edutwin-achievements', defaultAchievements);
  const [quizResults, setQuizResults] = useLocalStorage('edutwin-quiz-results', []);
  const [completedTopics, setCompletedTopics] = useLocalStorage('edutwin-completed-topics', []);
  const [notificationsList, setNotifications] = useLocalStorage('edutwin-notifications', defaultNotifications);
  const [settings, setSettings] = useLocalStorage('edutwin-settings', {
    preferredLanguage: 'English',
    difficulty: 'Adaptive',
    notifications: { studyReminders: true, quizReminders: true, progressUpdates: true },
  });

  // Toast state
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  const updateTopicMastery = useCallback((subjectId, topicId, change) => {
    setSubjects(prev => prev.map(subject => {
      if (subject.id === subjectId) {
        const updatedTopics = subject.topics.map(topic => {
          if (topic.id === topicId) {
            const newMastery = Math.min(100, Math.max(0, topic.mastery + change));
            return {
              ...topic,
              mastery: newMastery,
              status: newMastery >= 90 ? 'Mastered' : newMastery >= 75 ? 'Almost Done' : newMastery >= 50 ? 'In Progress' : 'Needs Revision',
            };
          }
          return topic;
        });
        const avgMastery = Math.round(updatedTopics.reduce((sum, t) => sum + t.mastery, 0) / updatedTopics.length);
        return { ...subject, topics: updatedTopics, mastery: avgMastery };
      }
      return subject;
    }));
    // Update overall mastery
    setStats(prev => {
      const allSubjects = subjects.map(s => s.mastery);
      const overall = Math.round(allSubjects.reduce((a, b) => a + b, 0) / allSubjects.length);
      return { ...prev, overallMastery: overall };
    });
  }, [subjects, setSubjects, setStats]);

  const addQuizResult = useCallback((result) => {
    setQuizResults(prev => [...prev, { ...result, date: new Date().toISOString() }]);
    setStats(prev => ({ ...prev, topicsMastered: prev.topicsMastered + (result.score >= 8 ? 1 : 0) }));
    addToast(`Quiz completed! Score: ${result.score}/${result.total}`, 'success');
  }, [setQuizResults, setStats, addToast]);

  const toggleStudyTask = useCallback((taskId) => {
    setStudyPlan(prev => prev.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  }, [setStudyPlan]);

  const addStudyTask = useCallback((task) => {
    setStudyPlan(prev => [...prev, { ...task, id: Date.now() }]);
    addToast('Study task added!', 'success');
  }, [setStudyPlan, addToast]);

  const deleteStudyTask = useCallback((taskId) => {
    setStudyPlan(prev => prev.filter(t => t.id !== taskId));
    addToast('Task removed', 'info');
  }, [setStudyPlan, addToast]);

  const unlockAchievement = useCallback((achievementId) => {
    setAchievements(prev => prev.map(a =>
      a.id === achievementId ? { ...a, unlocked: true, date: new Date().toISOString().split('T')[0] } : a
    ));
    const achievement = achievements.find(a => a.id === achievementId);
    if (achievement) {
      addToast(`Achievement unlocked: ${achievement.title}!`, 'achievement');
    }
  }, [achievements, setAchievements, addToast]);

  const saveSettings = useCallback((newSettings) => {
    setSettings(newSettings);
    setProfile(prev => ({
      ...prev,
      preferredLanguage: newSettings.preferredLanguage,
      difficulty: newSettings.difficulty,
    }));
    addToast('Settings saved!', 'success');
  }, [setSettings, setProfile, addToast]);

  const markNotificationRead = useCallback((notifId) => {
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, read: true } : n));
  }, [setNotifications]);

  const resetDemoData = useCallback(() => {
    setProfile(defaultProfile);
    setStats(defaultStats);
    setSubjects(defaultSubjects);
    setStudyPlan(studyPlanDefault);
    setAchievements(defaultAchievements);
    setQuizResults([]);
    setCompletedTopics([]);
    setNotifications(defaultNotifications);
    setSettings({
      preferredLanguage: 'English',
      difficulty: 'Adaptive',
      notifications: { studyReminders: true, quizReminders: true, progressUpdates: true },
    });
    addToast('Demo data has been reset!', 'info');
  }, [setProfile, setStats, setSubjects, setStudyPlan, setAchievements, setQuizResults, setCompletedTopics, setNotifications, setSettings, addToast]);

  const value = {
    profile, setProfile,
    stats, setStats,
    subjects, setSubjects,
    studyPlan, setStudyPlan,
    achievements, setAchievements,
    quizResults, setQuizResults,
    completedTopics, setCompletedTopics,
    notifications: notificationsList, setNotifications,
    settings, setSettings,
    toasts,
    addToast,
    updateTopicMastery,
    addQuizResult,
    toggleStudyTask,
    addStudyTask,
    deleteStudyTask,
    unlockAchievement,
    saveSettings,
    markNotificationRead,
    resetDemoData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}

export default AppContext;
