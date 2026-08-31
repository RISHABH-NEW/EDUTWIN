import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from './AuthContext';
import {
  getDemoUserById,
  getDemoUserByEmail,
  DEMO_USERS_MAP,
} from '../data/demoUsers';
import {
  studentProfile as defaultProfile,
  overviewStats as defaultStats,
  subjects as defaultSubjects,
  studyPlanDefault,
  achievementsList as defaultAchievements,
  notifications as defaultNotifications,
} from '../data/mockData';

const AppContext = createContext(null);

function getStorage(key, fallback) {
  try {
    const item = window.localStorage.getItem(key);
    if (!item || item === 'null' || item === 'undefined') return fallback;
    return JSON.parse(item);
  } catch {
    return fallback;
  }
}

function setStorage(key, val) {
  if (!key) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(val));
  } catch (err) {
    console.warn(`Error setting storage key "${key}":`, err);
  }
}

export function AppProvider({ children }) {
  const { user, isAuthenticated } = useAuth();
  const userKey = isAuthenticated && user ? (user.demoKey || user.email || `user_${user.id}`) : null;

  // Resolve current active demo user dataset
  const getActiveDemoConfig = useCallback(() => {
    if (!user) return DEMO_USERS_MAP['demo-priyanshu'];
    if (user.demoKey) {
      const byId = getDemoUserById(user.demoKey);
      if (byId) return byId;
    }
    if (user.email) {
      const byEmail = getDemoUserByEmail(user.email);
      if (byEmail) return byEmail;
    }
    return DEMO_USERS_MAP['demo-priyanshu'];
  }, [user]);

  const activeDemo = getActiveDemoConfig();

  // Load initial data for current userKey
  const [profile, setProfileState] = useState(() => {
    if (!userKey) return activeDemo?.profile || defaultProfile;
    const userSpecific = getStorage(`edutwin-profile_${userKey}`, null);
    if (userSpecific) return userSpecific;
    if (userKey === 'demo-priyanshu') {
      return getStorage('edutwin-profile', activeDemo?.profile || defaultProfile);
    }
    return activeDemo?.profile || defaultProfile;
  });

  const [stats, setStatsState] = useState(() => {
    if (!userKey) return activeDemo?.stats || defaultStats;
    const userSpecific = getStorage(`edutwin-stats_${userKey}`, null);
    if (userSpecific) return userSpecific;
    if (userKey === 'demo-priyanshu') {
      return getStorage('edutwin-stats', activeDemo?.stats || defaultStats);
    }
    return activeDemo?.stats || defaultStats;
  });

  const [subjects, setSubjectsState] = useState(() => {
    if (!userKey) return activeDemo?.subjects || defaultSubjects;
    const userSpecific = getStorage(`edutwin-subjects_${userKey}`, null);
    if (userSpecific) return userSpecific;
    if (userKey === 'demo-priyanshu') {
      return getStorage('edutwin-subjects', activeDemo?.subjects || defaultSubjects);
    }
    return activeDemo?.subjects || defaultSubjects;
  });

  const [studyPlan, setStudyPlanState] = useState(() => {
    if (!userKey) return activeDemo?.studyPlan || studyPlanDefault;
    const userSpecific = getStorage(`edutwin-study-plan_${userKey}`, null);
    if (userSpecific) return userSpecific;
    if (userKey === 'demo-priyanshu') {
      return getStorage('edutwin-study-plan', activeDemo?.studyPlan || studyPlanDefault);
    }
    return activeDemo?.studyPlan || studyPlanDefault;
  });

  const [achievements, setAchievementsState] = useState(() => {
    if (!userKey) return activeDemo?.achievements || defaultAchievements;
    const userSpecific = getStorage(`edutwin-achievements_${userKey}`, null);
    if (userSpecific) return userSpecific;
    if (userKey === 'demo-priyanshu') {
      return getStorage('edutwin-achievements', activeDemo?.achievements || defaultAchievements);
    }
    return activeDemo?.achievements || defaultAchievements;
  });

  const [quizResults, setQuizResultsState] = useState(() => {
    if (!userKey) return activeDemo?.quizResults || [];
    const userSpecific = getStorage(`edutwin-quiz-results_${userKey}`, null);
    if (userSpecific) return userSpecific;
    return activeDemo?.quizResults || [];
  });

  const [completedTopics, setCompletedTopicsState] = useState(() => {
    if (!userKey) return [];
    return getStorage(`edutwin-completed-topics_${userKey}`, []);
  });

  const [notificationsList, setNotificationsState] = useState(() => {
    if (!userKey) return activeDemo?.notifications || defaultNotifications;
    const userSpecific = getStorage(`edutwin-notifications_${userKey}`, null);
    if (userSpecific) return userSpecific;
    if (userKey === 'demo-priyanshu') {
      return getStorage('edutwin-notifications', activeDemo?.notifications || defaultNotifications);
    }
    return activeDemo?.notifications || defaultNotifications;
  });

  const [settings, setSettingsState] = useState(() => {
    if (!userKey) {
      return {
        preferredLanguage: 'English',
        difficulty: 'Adaptive',
        notifications: { studyReminders: true, quizReminders: true, progressUpdates: true },
      };
    }
    const userSpecific = getStorage(`edutwin-settings_${userKey}`, null);
    if (userSpecific) return userSpecific;
    return {
      preferredLanguage: activeDemo?.profile?.preferredLanguage || 'English',
      difficulty: activeDemo?.profile?.difficulty || 'Adaptive',
      notifications: activeDemo?.profile?.notifications || {
        studyReminders: true,
        quizReminders: true,
        progressUpdates: true,
      },
    };
  });

  const currentUserKeyRef = useRef(userKey);

  // Synchronize state whenever active user changes
  useEffect(() => {
    if (currentUserKeyRef.current !== userKey) {
      currentUserKeyRef.current = userKey;
      const currentConfig = getActiveDemoConfig();

      if (!userKey) {
        setProfileState(defaultProfile);
        setStatsState(defaultStats);
        setSubjectsState(defaultSubjects);
        setStudyPlanState(studyPlanDefault);
        setAchievementsState(defaultAchievements);
        setQuizResultsState([]);
        setCompletedTopicsState([]);
        setNotificationsState(defaultNotifications);
        setSettingsState({
          preferredLanguage: 'English',
          difficulty: 'Adaptive',
          notifications: { studyReminders: true, quizReminders: true, progressUpdates: true },
        });
        return;
      }

      const newProfile = getStorage(`edutwin-profile_${userKey}`, null) ||
        (userKey === 'demo-priyanshu' ? getStorage('edutwin-profile', currentConfig.profile || defaultProfile) : currentConfig.profile || defaultProfile);
      setProfileState(newProfile);

      const newStats = getStorage(`edutwin-stats_${userKey}`, null) ||
        (userKey === 'demo-priyanshu' ? getStorage('edutwin-stats', currentConfig.stats || defaultStats) : currentConfig.stats || defaultStats);
      setStatsState(newStats);

      const newSubjects = getStorage(`edutwin-subjects_${userKey}`, null) ||
        (userKey === 'demo-priyanshu' ? getStorage('edutwin-subjects', currentConfig.subjects || defaultSubjects) : currentConfig.subjects || defaultSubjects);
      setSubjectsState(newSubjects);

      const newStudyPlan = getStorage(`edutwin-study-plan_${userKey}`, null) ||
        (userKey === 'demo-priyanshu' ? getStorage('edutwin-study-plan', currentConfig.studyPlan || studyPlanDefault) : currentConfig.studyPlan || studyPlanDefault);
      setStudyPlanState(newStudyPlan);

      const newAchievements = getStorage(`edutwin-achievements_${userKey}`, null) ||
        (userKey === 'demo-priyanshu' ? getStorage('edutwin-achievements', currentConfig.achievements || defaultAchievements) : currentConfig.achievements || defaultAchievements);
      setAchievementsState(newAchievements);

      const newQuizResults = getStorage(`edutwin-quiz-results_${userKey}`, null) || (currentConfig.quizResults || []);
      setQuizResultsState(newQuizResults);

      const newCompleted = getStorage(`edutwin-completed-topics_${userKey}`, []);
      setCompletedTopicsState(newCompleted);

      const newNotifications = getStorage(`edutwin-notifications_${userKey}`, null) ||
        (userKey === 'demo-priyanshu' ? getStorage('edutwin-notifications', currentConfig.notifications || defaultNotifications) : currentConfig.notifications || defaultNotifications);
      setNotificationsState(newNotifications);

      const newSettings = getStorage(`edutwin-settings_${userKey}`, null) || {
        preferredLanguage: currentConfig.profile?.preferredLanguage || 'English',
        difficulty: currentConfig.profile?.difficulty || 'Adaptive',
        notifications: currentConfig.profile?.notifications || {
          studyReminders: true,
          quizReminders: true,
          progressUpdates: true,
        },
      };
      setSettingsState(newSettings);
    }
  }, [userKey, getActiveDemoConfig]);

  // Setters that persist to current user's store
  const setProfile = useCallback((updater) => {
    setProfileState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      if (userKey) {
        setStorage(`edutwin-profile_${userKey}`, next);
        if (userKey === 'demo-priyanshu') setStorage('edutwin-profile', next);
      }
      return next;
    });
  }, [userKey]);

  const setStats = useCallback((updater) => {
    setStatsState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      if (userKey) {
        setStorage(`edutwin-stats_${userKey}`, next);
        if (userKey === 'demo-priyanshu') setStorage('edutwin-stats', next);
      }
      return next;
    });
  }, [userKey]);

  const setSubjects = useCallback((updater) => {
    setSubjectsState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      if (userKey) {
        setStorage(`edutwin-subjects_${userKey}`, next);
        if (userKey === 'demo-priyanshu') setStorage('edutwin-subjects', next);
      }
      return next;
    });
  }, [userKey]);

  const setStudyPlan = useCallback((updater) => {
    setStudyPlanState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      if (userKey) {
        setStorage(`edutwin-study-plan_${userKey}`, next);
        if (userKey === 'demo-priyanshu') setStorage('edutwin-study-plan', next);
      }
      return next;
    });
  }, [userKey]);

  const setAchievements = useCallback((updater) => {
    setAchievementsState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      if (userKey) {
        setStorage(`edutwin-achievements_${userKey}`, next);
        if (userKey === 'demo-priyanshu') setStorage('edutwin-achievements', next);
      }
      return next;
    });
  }, [userKey]);

  const setQuizResults = useCallback((updater) => {
    setQuizResultsState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      if (userKey) {
        setStorage(`edutwin-quiz-results_${userKey}`, next);
      }
      return next;
    });
  }, [userKey]);

  const setCompletedTopics = useCallback((updater) => {
    setCompletedTopicsState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      if (userKey) {
        setStorage(`edutwin-completed-topics_${userKey}`, next);
      }
      return next;
    });
  }, [userKey]);

  const setNotifications = useCallback((updater) => {
    setNotificationsState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      if (userKey) {
        setStorage(`edutwin-notifications_${userKey}`, next);
        if (userKey === 'demo-priyanshu') setStorage('edutwin-notifications', next);
      }
      return next;
    });
  }, [userKey]);

  const setSettings = useCallback((updater) => {
    setSettingsState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      if (userKey) {
        setStorage(`edutwin-settings_${userKey}`, next);
      }
      return next;
    });
  }, [userKey]);

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
    setSubjects(prev => {
      const updated = prev.map(subject => {
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
      });

      // Update overall mastery
      const allMasteries = updated.map(s => s.mastery);
      const overall = Math.round(allMasteries.reduce((a, b) => a + b, 0) / allMasteries.length);
      setStats(prevStats => ({ ...prevStats, overallMastery: overall }));

      return updated;
    });
  }, [setSubjects, setStats]);

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
    const config = getActiveDemoConfig();
    const freshProfile = JSON.parse(JSON.stringify(config.profile || defaultProfile));
    const freshStats = JSON.parse(JSON.stringify(config.stats || defaultStats));
    const freshSubjects = JSON.parse(JSON.stringify(config.subjects || defaultSubjects));
    const freshPlan = JSON.parse(JSON.stringify(config.studyPlan || studyPlanDefault));
    const freshAchievements = JSON.parse(JSON.stringify(config.achievements || defaultAchievements));
    const freshQuizResults = JSON.parse(JSON.stringify(config.quizResults || []));
    const freshNotifications = JSON.parse(JSON.stringify(config.notifications || defaultNotifications));
    const freshSettings = {
      preferredLanguage: freshProfile.preferredLanguage || 'English',
      difficulty: freshProfile.difficulty || 'Adaptive',
      notifications: freshProfile.notifications || { studyReminders: true, quizReminders: true, progressUpdates: true },
    };

    setProfile(freshProfile);
    setStats(freshStats);
    setSubjects(freshSubjects);
    setStudyPlan(freshPlan);
    setAchievements(freshAchievements);
    setQuizResults(freshQuizResults);
    setCompletedTopics([]);
    setNotifications(freshNotifications);
    setSettings(freshSettings);

    addToast(`Demo data for ${freshProfile.name} has been reset!`, 'info');
  }, [getActiveDemoConfig, setProfile, setStats, setSubjects, setStudyPlan, setAchievements, setQuizResults, setCompletedTopics, setNotifications, setSettings, addToast]);

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
