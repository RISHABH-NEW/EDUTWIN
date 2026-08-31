import { Sparkles, Brain, TrendingUp, Zap, Target, BarChart3, Eye } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';

const strengths = ['Data Structures', 'Programming', 'Physics', 'Problem Solving'];
const improvements = ['Algebra', 'Calculus', 'Time Management'];

export default function MyEduTwin() {
  const { stats, subjects } = useApp();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const gridColor = isDark ? '#334155' : '#E2E8F0';
  const axisColor = isDark ? '#94A3B8' : '#64748B';

  const radarData = subjects.slice(0, 6).map(s => ({
    subject: s.name.length > 10 ? s.name.substring(0, 10) + '…' : s.name,
    mastery: s.mastery,
    fullMark: 100,
  }));

  const learningProfile = [
    { label: 'Learning Level', value: 'Intermediate-Advanced', icon: TrendingUp },
    { label: 'Overall Mastery', value: `${stats.overallMastery}%`, icon: BarChart3 },
    { label: 'Strongest Subject', value: 'Computer Science', icon: Zap },
    { label: 'Weakest Subject', value: 'General Knowledge', icon: Target },
    { label: 'Preferred Style', value: 'Visual + Practice', icon: Eye },
    { label: 'Consistency', value: `${stats.currentStreak} day streak`, icon: Brain },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-5 h-5 text-primary-500" />
          <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100">My EduTwin</h1>
        </div>
        <p className="text-surface-500 dark:text-surface-400">An evolving AI model of your learning journey.</p>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Left: Profile + Radar */}
        <div className="lg:col-span-3 space-y-6">
          {/* Learning Profile */}
          <div className="card">
            <h2 className="section-title mb-4">Student Learning Profile</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {learningProfile.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="p-3 bg-surface-50 dark:bg-surface-750 border border-surface-200/50 dark:border-surface-700 rounded-xl">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Icon className="w-3.5 h-3.5 text-primary-500" />
                      <p className="text-xs text-surface-400 dark:text-surface-500 font-medium">{item.label}</p>
                    </div>
                    <p className="text-sm font-semibold text-surface-800 dark:text-surface-100">{item.value}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Radar Chart */}
          <div className="card">
            <h2 className="section-title mb-4">Mastery Radar</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke={gridColor} />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fontSize: 11, fill: axisColor }}
                  />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 100]}
                    tick={{ fontSize: 10, fill: axisColor }}
                  />
                  <Radar
                    name="Mastery"
                    dataKey="mastery"
                    stroke="#6366F1"
                    fill="#6366F1"
                    fillOpacity={isDark ? 0.35 : 0.2}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right: Strengths, Improvements, Personality */}
        <div className="lg:col-span-2 space-y-6">
          {/* Strengths */}
          <div className="card">
            <h2 className="section-title text-emerald-700 dark:text-emerald-400 mb-3">Strengths</h2>
            <div className="space-y-2">
              {strengths.map((item) => (
                <div key={item} className="flex items-center gap-2.5 p-2.5 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100/60 dark:border-emerald-800/40 rounded-xl">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Zap className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="text-sm font-medium text-emerald-800 dark:text-emerald-200">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Areas to Improve */}
          <div className="card">
            <h2 className="section-title text-amber-700 dark:text-amber-400 mb-3">Areas to Improve</h2>
            <div className="space-y-2">
              {improvements.map((item) => (
                <div key={item} className="flex items-center gap-2.5 p-2.5 bg-amber-50 dark:bg-amber-950/60 border border-amber-100/60 dark:border-amber-800/40 rounded-xl">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <Target className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                  </div>
                  <span className="text-sm font-medium text-amber-800 dark:text-amber-200">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Personality */}
          <div className="card border-primary-100 dark:border-primary-900/50 bg-gradient-to-br from-primary-50/30 to-accent-50/20 dark:from-primary-950/40 dark:to-accent-950/30">
            <h2 className="section-title mb-3">Learning Personality</h2>
            <div className="flex flex-wrap gap-2 mb-3">
              {['Fast Learner', 'Visual', 'Practice-Oriented'].map((trait) => (
                <span key={trait} className="badge-primary text-xs px-3 py-1.5">{trait}</span>
              ))}
            </div>
            <p className="text-xs text-surface-500 dark:text-surface-400 leading-relaxed">
              These are adaptive estimates based on your learning activity, quiz performance,
              and AI analysis of your study patterns. They update as you learn.
            </p>
          </div>

          {/* Twin Status */}
          <div className="card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-sm">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-surface-800 dark:text-surface-100">EduTwin Status</p>
                <p className="text-xs text-surface-400 dark:text-surface-500">Last updated: Today</p>
              </div>
            </div>
            <div className="space-y-2 text-xs text-surface-600 dark:text-surface-300">
              <div className="flex justify-between">
                <span>Model Accuracy</span>
                <span className="font-semibold text-primary-600 dark:text-primary-400">87%</span>
              </div>
              <div className="flex justify-between">
                <span>Data Points Analyzed</span>
                <span className="font-semibold text-surface-800 dark:text-surface-200">1,247</span>
              </div>
              <div className="flex justify-between">
                <span>Predictions Made</span>
                <span className="font-semibold text-surface-800 dark:text-surface-200">89</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
