import { useState } from 'react';
import { Settings as SettingsIcon, User, Globe, Bell, RotateCcw, Save, Sun, Moon } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';

export default function Settings() {
  const { profile, setProfile, settings, saveSettings, resetDemoData } = useApp();
  const { theme, setTheme } = useTheme();

  const [formData, setFormData] = useState({
    name: profile.name,
    class: profile.class,
    course: profile.course,
    email: profile.email,
    learningGoals: profile.learningGoals,
    preferredLanguage: settings.preferredLanguage || 'English',
    difficulty: settings.difficulty || 'Adaptive',
    notifications: {
      studyReminders: settings.notifications?.studyReminders ?? true,
      quizReminders: settings.notifications?.quizReminders ?? true,
      progressUpdates: settings.notifications?.progressUpdates ?? true,
    },
  });

  const handleToggleNotif = (key) => {
    setFormData((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProfile((prev) => ({
      ...prev,
      name: formData.name,
      class: formData.class,
      course: formData.course,
      email: formData.email,
      learningGoals: formData.learningGoals,
    }));
    saveSettings({
      preferredLanguage: formData.preferredLanguage,
      difficulty: formData.difficulty,
      notifications: formData.notifications,
    });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <SettingsIcon className="w-6 h-6 text-primary-500" />
          <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100">Settings & Preferences</h1>
        </div>
        <p className="text-surface-500 dark:text-surface-400">
          Manage your personal profile, AI adaptiveness, language preferences, appearance, and notifications.
        </p>
      </div>

      {/* Theme / Appearance Card */}
      <div className="card space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-surface-100 dark:border-surface-700">
          <Sun className="w-5 h-5 text-amber-500" />
          <h2 className="section-title">Interface Appearance</h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setTheme('light')}
            className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
              theme === 'light'
                ? 'bg-primary-50 dark:bg-primary-950/70 border-primary-500 text-primary-900 dark:text-primary-100 shadow-sm'
                : 'bg-white dark:bg-surface-800 border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-300 hover:border-surface-300 dark:hover:border-surface-600'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0">
              <Sun className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold">Light Mode</p>
              <p className="text-xs text-surface-400 dark:text-surface-400">Clean, crisp education interface</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setTheme('dark')}
            className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
              theme === 'dark'
                ? 'bg-primary-50 dark:bg-primary-950/70 border-primary-500 text-primary-900 dark:text-primary-100 shadow-sm'
                : 'bg-white dark:bg-surface-800 border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-300 hover:border-surface-300 dark:hover:border-surface-600'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-primary-900 text-primary-300 flex items-center justify-center flex-shrink-0">
              <Moon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold">Dark Mode</p>
              <p className="text-xs text-surface-400 dark:text-surface-400">Deep navy premium dark experience</p>
            </div>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Card */}
        <div className="card space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-surface-100 dark:border-surface-700">
            <User className="w-5 h-5 text-primary-600" />
            <h2 className="section-title">Student Profile</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-surface-700 dark:text-surface-300 mb-1">Full Name</label>
              <input
                type="text"
                className="input-field"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-surface-700 dark:text-surface-300 mb-1">Email</label>
              <input
                type="email"
                className="input-field"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-surface-700 dark:text-surface-300 mb-1">Class / Year</label>
              <input
                type="text"
                className="input-field"
                value={formData.class}
                onChange={(e) => setFormData({ ...formData, class: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-surface-700 dark:text-surface-300 mb-1">Department / Course</label>
              <input
                type="text"
                className="input-field"
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-surface-700 dark:text-surface-300 mb-1">Primary Learning Goal</label>
            <textarea
              rows={2}
              className="input-field resize-none"
              value={formData.learningGoals}
              onChange={(e) => setFormData({ ...formData, learningGoals: e.target.value })}
            />
          </div>
        </div>

        {/* AI & Learning Preferences */}
        <div className="card space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-surface-100 dark:border-surface-700">
            <Globe className="w-5 h-5 text-accent-600" />
            <h2 className="section-title">AI & Learning Preferences</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-surface-700 dark:text-surface-300 mb-2">Preferred AI Language</label>
              <div className="space-y-2">
                {['English', 'Hindi', 'Hinglish'].map((lang) => (
                  <label
                    key={lang}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      formData.preferredLanguage === lang
                        ? 'bg-primary-50 dark:bg-primary-950/70 border-primary-300 dark:border-primary-700 text-primary-800 dark:text-primary-200'
                        : 'bg-white dark:bg-surface-800 border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-750'
                    }`}
                  >
                    <span className="text-sm font-medium">{lang}</span>
                    <input
                      type="radio"
                      name="preferredLanguage"
                      value={lang}
                      checked={formData.preferredLanguage === lang}
                      onChange={(e) => setFormData({ ...formData, preferredLanguage: e.target.value })}
                      className="text-primary-600 focus:ring-primary-500"
                    />
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-surface-700 dark:text-surface-300 mb-2">Curriculum Difficulty Level</label>
              <div className="space-y-2">
                {[
                  { id: 'Beginner', desc: 'Step-by-step foundation guidance' },
                  { id: 'Adaptive', desc: 'Dynamically scales with quiz performance' },
                  { id: 'Advanced', desc: 'Complex problem-solving & competitive edge' },
                ].map((item) => (
                  <label
                    key={item.id}
                    className={`flex items-start justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      formData.difficulty === item.id
                        ? 'bg-accent-50 dark:bg-accent-950/70 border-accent-300 dark:border-accent-700 text-accent-800 dark:text-accent-200'
                        : 'bg-white dark:bg-surface-800 border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-750'
                    }`}
                  >
                    <div>
                      <span className="text-sm font-semibold block">{item.id}</span>
                      <span className="text-[11px] text-surface-400 dark:text-surface-500">{item.desc}</span>
                    </div>
                    <input
                      type="radio"
                      name="difficulty"
                      value={item.id}
                      checked={formData.difficulty === item.id}
                      onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                      className="text-accent-600 focus:ring-accent-500 mt-1"
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="card space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-surface-100 dark:border-surface-700">
            <Bell className="w-5 h-5 text-amber-500" />
            <h2 className="section-title">Notifications & Alerts</h2>
          </div>

          <div className="space-y-3">
            {[
              { key: 'studyReminders', title: 'Daily Study Reminders', desc: 'Prompt for scheduled tasks in the Study Planner' },
              { key: 'quizReminders', title: 'Weekly Assessment Prompts', desc: 'Receive alerts when new quizzes are generated' },
              { key: 'progressUpdates', title: 'EduTwin Growth Reports', desc: 'Weekly summary of mastery shifts and milestone achievements' },
            ].map((notif) => (
              <div key={notif.key} className="flex items-center justify-between p-3 bg-surface-50 dark:bg-surface-750 rounded-xl border border-surface-100 dark:border-surface-700">
                <div>
                  <p className="text-sm font-semibold text-surface-800 dark:text-surface-100">{notif.title}</p>
                  <p className="text-xs text-surface-400 dark:text-surface-500">{notif.desc}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggleNotif(notif.key)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
                    formData.notifications[notif.key] ? 'bg-primary-600' : 'bg-surface-300 dark:bg-surface-600'
                  }`}
                  aria-label={`Toggle ${notif.title}`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                      formData.notifications[notif.key] ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <button
            type="button"
            onClick={resetDemoData}
            className="btn-secondary w-full sm:w-auto flex items-center justify-center gap-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/40 border-red-200 dark:border-red-800"
          >
            <RotateCcw className="w-4 h-4" /> Reset Demo Data
          </button>

          <button
            type="submit"
            className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-2.5 shadow-md hover:shadow-lg"
          >
            <Save className="w-4 h-4" /> Save Preferences
          </button>
        </div>
      </form>
    </div>
  );
}
