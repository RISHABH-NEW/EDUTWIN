import { useNavigate } from 'react-router-dom';
import {
  GraduationCap, Sparkles, Bot, FileText, TrendingUp, Compass,
  ArrowRight, ChevronRight, Zap, Shield,
} from 'lucide-react';
import ThemeToggle from '../components/ui/ThemeToggle';

const features = [
  {
    icon: Sparkles,
    title: 'Digital Learning Twin',
    description: 'An AI model that evolves with you — understanding your strengths, weaknesses, and learning patterns.',
    color: 'from-primary-500 to-primary-600',
  },
  {
    icon: Bot,
    title: 'AI Tutor',
    description: 'Get instant, personalized explanations in English, Hindi, or Hinglish with adaptive difficulty.',
    color: 'from-accent-500 to-accent-600',
  },
  {
    icon: FileText,
    title: 'Adaptive Assessments',
    description: 'AI-generated quizzes that adapt to your level and identify knowledge gaps in real-time.',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: TrendingUp,
    title: 'Progress Intelligence',
    description: 'Visual analytics that track your growth, predict performance, and suggest optimal study strategies.',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Compass,
    title: 'Career Roadmap',
    description: 'AI-recommended career paths with skill mapping and personalized learning roadmaps.',
    color: 'from-violet-500 to-purple-500',
  },
  {
    icon: Shield,
    title: 'Personalized Learning',
    description: 'Every recommendation, every quiz, every explanation is tailored to YOUR learning journey.',
    color: 'from-rose-500 to-pink-500',
  },
];

const steps = [
  { step: '01', title: 'Create Your Profile', desc: 'Tell us about your courses, subjects, and learning goals.' },
  { step: '02', title: 'AI Analyzes You', desc: 'EduTwin builds a digital twin of your learning patterns.' },
  { step: '03', title: 'Learn & Practice', desc: 'Get personalized content, quizzes, and AI tutoring.' },
  { step: '04', title: 'Track & Grow', desc: 'Watch your mastery evolve with detailed analytics.' },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-surface-900 text-surface-900 dark:text-surface-100 transition-colors duration-200">
      {/* Nav */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-surface-900/80 backdrop-blur-md border-b border-surface-100 dark:border-surface-800 z-50 transition-colors duration-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center shadow-sm">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-surface-900 dark:text-surface-100">EduTwin</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle size="md" />
            <button
              onClick={() => navigate('/login')}
              className="btn-ghost text-sm"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/login')}
              className="btn-primary text-sm"
            >
              Start Learning
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-50 dark:bg-primary-950/70 border border-primary-100 dark:border-primary-800/50 rounded-full
            text-sm font-medium text-primary-700 dark:text-primary-300 mb-6 animate-fade-in">
            <Zap className="w-4 h-4 text-primary-600 dark:text-primary-400" />
            AI-Powered Smart Education Platform
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-surface-900 dark:text-surface-50 leading-tight
            tracking-tight animate-slide-up">
            Meet Your{' '}
            <span className="gradient-text">Digital Learning Twin.</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-surface-500 dark:text-surface-400 max-w-2xl mx-auto leading-relaxed animate-slide-up"
            style={{ animationDelay: '0.1s' }}>
            EduTwin understands how you learn, identifies where you struggle,
            and builds a personalized path to help you improve — powered by AI.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up"
            style={{ animationDelay: '0.2s' }}>
            <button
              onClick={() => navigate('/login')}
              className="btn-primary text-base px-8 py-3 rounded-2xl flex items-center gap-2 shadow-lg
                hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              Start Learning
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-secondary text-base px-8 py-3 rounded-2xl flex items-center gap-2"
            >
              Explore EduTwin
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto animate-slide-up"
            style={{ animationDelay: '0.3s' }}>
            {[
              { value: '10K+', label: 'Active Learners' },
              { value: '500+', label: 'Topics Covered' },
              { value: '95%', label: 'Satisfaction Rate' },
              { value: '24/7', label: 'AI Tutor Access' },
            ].map((stat) => (
              <div key={stat.label} className="p-3 rounded-2xl bg-surface-50/50 dark:bg-surface-800/40 border border-transparent dark:border-surface-800/60">
                <p className="text-2xl font-bold text-surface-900 dark:text-surface-100">{stat.value}</p>
                <p className="text-sm text-surface-400 dark:text-surface-500 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 bg-surface-50 dark:bg-surface-950/50 transition-colors duration-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-surface-900 dark:text-surface-100">How EduTwin Works</h2>
            <p className="mt-3 text-surface-500 dark:text-surface-400 max-w-lg mx-auto">
              Four simple steps to transform your learning experience
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((item) => (
              <div key={item.step} className="card text-center group hover-lift">
                <div className="w-12 h-12 rounded-2xl bg-primary-50 dark:bg-primary-950/80 text-primary-600 dark:text-primary-400 font-bold text-lg
                  flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-600
                  group-hover:text-white dark:group-hover:bg-primary-600 dark:group-hover:text-white transition-all duration-300">
                  {item.step}
                </div>
                <h3 className="font-semibold text-surface-900 dark:text-surface-100 mb-2">{item.title}</h3>
                <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-surface-900 dark:text-surface-100">Everything You Need to Excel</h2>
            <p className="mt-3 text-surface-500 dark:text-surface-400 max-w-lg mx-auto">
              Powered by AI, designed for students, built for results
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="card group hover-lift">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${feature.color}
                    flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-surface-900 dark:text-surface-100 mb-2">{feature.title}</h3>
                  <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-primary-600 to-primary-800 dark:from-primary-900 dark:to-surface-900 relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-3xl font-bold text-white">
            Ready to Transform Your Learning?
          </h2>
          <p className="mt-4 text-primary-200 dark:text-primary-300 text-lg max-w-xl mx-auto">
            Join thousands of students who are learning smarter with their AI-powered digital twin.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="mt-8 px-8 py-3 bg-white text-primary-700 dark:bg-surface-800 dark:text-primary-300 dark:hover:bg-surface-700 rounded-2xl font-semibold text-base
              hover:bg-primary-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]
              inline-flex items-center gap-2"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-surface-900 dark:bg-surface-950 border-t border-surface-800 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
            <GraduationCap className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-bold">EduTwin</span>
        </div>
        <p className="text-surface-400 text-sm">
          Your AI-powered learning twin. Built for Smart India Hackathon.
        </p>
        <p className="text-surface-600 text-xs mt-2">© 2026 EduTwin. All rights reserved.</p>
      </footer>
    </div>
  );
}
