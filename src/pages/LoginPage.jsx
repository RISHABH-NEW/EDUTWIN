import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  GraduationCap, Mail, Lock, User, Eye, EyeOff,
  ArrowRight, Sparkles, BookOpen, Bot, TrendingUp,
  AlertCircle, Loader2, CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DEMO_STUDENTS } from '../data/demoUsers';
import ThemeToggle from '../components/ui/ThemeToggle';
import DemoLoginModal from '../components/ui/DemoLoginModal';

const floatingFeatures = [
  { icon: Sparkles, label: 'AI Digital Twin', color: 'from-primary-500 to-primary-600', delay: 0 },
  { icon: BookOpen, label: 'Smart Learning', color: 'from-accent-500 to-accent-600', delay: 1.5 },
  { icon: Bot, label: 'AI Tutor 24/7', color: 'from-amber-500 to-orange-500', delay: 3 },
  { icon: TrendingUp, label: 'Track Progress', color: 'from-emerald-500 to-teal-500', delay: 4.5 },
];

const benefits = [
  'Personalized AI-powered learning paths',
  'Real-time adaptive assessments',
  'Digital twin that evolves with you',
  'Career guidance & skill mapping',
];

export default function LoginPage({ initialMode = 'login' }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine starting mode based on route or prop
  const isInitialSignup = initialMode === 'signup' ||
    location.pathname === '/signup' ||
    location.pathname === '/register';

  const [mode, setMode] = useState(isInitialSignup ? 'signup' : 'login'); // 'login' | 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState('');
  const [loadingDemoId, setLoadingDemoId] = useState(null);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const { login, signup, loginAsDemoUser, isLoading, error, clearError, isAuthenticated, isAuthInitialized } = useAuth();
  const emailRef = useRef(null);

  // Sync mode with route changes (e.g. back/forward navigation)
  useEffect(() => {
    if (location.pathname === '/signup' || location.pathname === '/register') {
      setMode('signup');
    } else if (location.pathname === '/login') {
      setMode('login');
    }
  }, [location.pathname]);

  // Redirect to dashboard only when already authenticated AND visiting the login page.
  // Visiting /signup should always show the signup form — never auto-redirect.
  useEffect(() => {
    if (isAuthInitialized && isAuthenticated && mode === 'login') {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthInitialized, isAuthenticated, mode, navigate]);

  // Focus email on mode switch
  useEffect(() => {
    emailRef.current?.focus();
    clearError();
    setFieldErrors({});
    setSuccessMsg('');
  }, [mode, clearError]);

  const validate = () => {
    const errors = {};
    if (mode === 'signup' && !formData.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Enter a valid email';
    }
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 4) {
      errors.password = 'At least 4 characters';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      if (mode === 'login') {
        await login(formData.email, formData.password);
      } else {
        await signup(formData.name, formData.email, formData.password);
      }
      setSuccessMsg(mode === 'login' ? 'Welcome back! Redirecting...' : 'Account created! Welcome to EduTwin! Redirecting...');
      navigate('/dashboard', { replace: true });
    } catch {
      // Error is handled by AuthContext
    }
  };

  const handleDemoLogin = async (student) => {
    setLoadingDemoId(student.id);
    clearError();
    try {
      await loginAsDemoUser(student.id);
      setSuccessMsg(`Welcome, ${student.name}! Redirecting...`);
      navigate('/dashboard', { replace: true });
    } catch {
      setLoadingDemoId(null);
    }
  };

  const handleChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: '' }));
    }
    if (error) clearError();
  };

  const switchMode = () => {
    const nextMode = mode === 'login' ? 'signup' : 'login';
    setMode(nextMode);
    setFormData({ name: '', email: '', password: '' });
    if (nextMode === 'signup') {
      navigate('/signup', { replace: true });
    } else {
      navigate('/login', { replace: true });
    }
  };

  const getBranchBadgeColor = (branch) => {
    if (branch.includes('AI')) {
      return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300 border-emerald-200/60 dark:border-emerald-800/50';
    }
    if (branch.includes('EE')) {
      return 'bg-amber-50 text-amber-700 dark:bg-amber-950/70 dark:text-amber-300 border-amber-200/60 dark:border-amber-800/50';
    }
    return 'bg-primary-50 text-primary-700 dark:bg-primary-950/70 dark:text-primary-300 border-primary-200/60 dark:border-primary-800/50';
  };

  return (
    <div className="min-h-screen flex bg-surface-50 dark:bg-surface-900 text-surface-900 dark:text-surface-100 transition-colors duration-200 relative" id="login-page">
      {/* Top right theme toggle */}
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle size="md" />
      </div>

      {/* Left Panel — Branding & Features */}
      <div className="hidden lg:flex lg:w-[42%] xl:w-[45%] relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900">
        {/* Animated background shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute top-1/2 -right-20 w-80 h-80 bg-accent-500/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
          <div className="absolute -bottom-20 left-1/3 w-72 h-72 bg-primary-400/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />
        </div>

        <div className="relative z-10 flex flex-col justify-between p-10 xl:p-14 w-full">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white leading-tight">EduTwin</h1>
              <p className="text-[10px] text-primary-200 font-medium tracking-wider uppercase">AI-Powered Learning</p>
            </div>
          </div>

          {/* Hero content */}
          <div className="my-auto py-8">
            <h2 className="text-3xl xl:text-4xl font-extrabold text-white leading-tight tracking-tight">
              {mode === 'login' ? 'Your AI Learning' : 'Start Your Journey with'}
              <br />
              <span className="text-accent-300">
                {mode === 'login' ? 'Twin Awaits.' : 'EduTwin AI.'}
              </span>
            </h2>
            <p className="mt-4 text-primary-200 text-sm leading-relaxed max-w-md">
              Join thousands of students learning smarter with personalized AI that adapts to your unique style.
            </p>

            {/* Benefits */}
            <div className="mt-6 space-y-2.5">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-accent-500/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent-300" />
                  </div>
                  <span className="text-xs text-primary-100">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Floating feature cards */}
            <div className="mt-8 grid grid-cols-2 gap-2.5">
              {floatingFeatures.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.label}
                    className="flex items-center gap-2.5 px-3 py-2 bg-white/[0.07] backdrop-blur-sm
                      border border-white/10 rounded-xl animate-fade-in"
                    style={{ animationDelay: `${feature.delay * 0.2}s` }}
                  >
                    <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${feature.color}
                      flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-xs font-medium text-white/90">{feature.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom stat */}
          <div className="flex items-center gap-5 text-primary-200 text-xs">
            <span><strong className="text-white">6</strong> Demo Student Profiles</span>
            <span className="w-px h-3.5 bg-primary-400/30" />
            <span><strong className="text-white">10K+</strong> Students</span>
            <span className="w-px h-3.5 bg-primary-400/30" />
            <span><strong className="text-white">24/7</strong> AI Tutor</span>
          </div>
        </div>
      </div>

      {/* Right Panel — Forms & Demo Accounts Section */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-10 overflow-y-auto">
        <div className="w-full max-w-[560px] my-auto space-y-5">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center shadow-sm">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-surface-900 dark:text-surface-100">EduTwin</span>
          </div>

          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-surface-900 dark:text-surface-100 tracking-tight">
                {mode === 'login' ? 'Welcome back' : 'Create your account'}
              </h2>
              <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
                {mode === 'login'
                  ? 'Sign in with credentials or choose a Demo Student profile below'
                  : 'Start your personalized AI-powered learning journey'}
              </p>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="flex items-start gap-2.5 px-4 py-3 bg-red-50 dark:bg-red-950/80 border border-red-200 dark:border-red-800 rounded-xl animate-scale-in" id="auth-error">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}

          {/* Success message */}
          {successMsg && (
            <div className="flex items-start gap-2.5 px-4 py-3 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 rounded-xl animate-scale-in" id="auth-success">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-emerald-700 dark:text-emerald-300">{successMsg}</p>
            </div>
          )}

          {/* DEMO ACCOUNTS SECTION (Featured in login mode) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-surface-800/90 border border-primary-100 dark:border-surface-700/80 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-primary-100 dark:bg-primary-950/80 text-primary-600 dark:text-primary-400 flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-sm font-bold text-surface-900 dark:text-surface-100">Explore EduTwin as a Demo Student</h3>
              </div>
              <button
                type="button"
                onClick={() => setDemoModalOpen(true)}
                className="text-[11px] font-semibold text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
              >
                <span>View Full Grid</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <p className="text-xs text-surface-500 dark:text-surface-400 mb-3.5">
              Select any of the 6 student profiles to explore personalized data, curriculum, and AI tutoring:
            </p>

            {/* 6 Demo Student List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5" id="demo-students-list">
              {DEMO_STUDENTS.map((student) => {
                const isCurrentLoading = loadingDemoId === student.id;
                return (
                  <div
                    key={student.id}
                    className="flex flex-col justify-between p-3 rounded-xl bg-surface-50 dark:bg-surface-750/70
                      border border-surface-200/70 dark:border-surface-700 hover:border-primary-300 dark:hover:border-primary-700
                      hover:shadow-xs transition-all duration-200 group text-left"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1.5 mb-1.5">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-base">{student.avatarEmoji}</span>
                          <p className="text-xs font-bold text-surface-900 dark:text-surface-100 truncate">
                            {student.name}
                          </p>
                        </div>
                        <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${getBranchBadgeColor(student.branch)} flex-shrink-0`}>
                          {student.branch}
                        </span>
                      </div>
                      <p className="text-[11px] text-surface-500 dark:text-surface-400 truncate">
                        {student.role} · {student.stats.overallMastery}% Mastery
                      </p>
                    </div>

                    <button
                      type="button"
                      disabled={isLoading || loadingDemoId !== null}
                      onClick={() => handleDemoLogin(student)}
                      className="mt-2.5 w-full flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg
                        text-xs font-semibold bg-white dark:bg-surface-700 text-primary-600 dark:text-primary-300
                        border border-primary-200 dark:border-primary-800/80 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 dark:hover:text-white
                        hover:border-transparent active:scale-95 transition-all duration-150 shadow-xs flex-shrink-0
                        disabled:opacity-60 disabled:cursor-not-allowed group-hover:bg-primary-600 group-hover:text-white group-hover:border-transparent"
                      id={`demo-login-${student.id}`}
                    >
                      {isCurrentLoading ? (
                        <>
                          <Loader2 className="w-3 h-3 animate-spin" />
                          <span>Entering...</span>
                        </>
                      ) : (
                        <>
                          <span>Enter Demo</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-surface-200 dark:bg-surface-700" />
            <span className="text-xs text-surface-400 dark:text-surface-500 font-medium">
              {mode === 'login' ? 'or sign in with credentials' : 'or create new student credentials'}
            </span>
            <div className="flex-1 h-px bg-surface-200 dark:bg-surface-700" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5" id="auth-form">
            {/* Name (signup only) */}
            {mode === 'signup' && (
              <div className="animate-slide-up">
                <label htmlFor="name" className="block text-xs font-medium text-surface-700 dark:text-surface-300 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400 dark:text-surface-500" />
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange('name')}
                    placeholder="Enter your full name"
                    className={`input-field pl-10 text-sm ${fieldErrors.name ? 'border-red-300 dark:border-red-700 focus:ring-red-500/30 focus:border-red-400' : ''}`}
                    autoComplete="name"
                  />
                </div>
                {fieldErrors.name && (
                  <p className="mt-1 text-xs text-red-500 dark:text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {fieldErrors.name}
                  </p>
                )}
              </div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-surface-700 dark:text-surface-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400 dark:text-surface-500" />
                <input
                  ref={emailRef}
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange('email')}
                  placeholder={mode === 'login' ? 'e.g. priyanshu@edutwin.ai or your email' : 'Enter your email address'}
                  className={`input-field pl-10 text-sm ${fieldErrors.email ? 'border-red-300 dark:border-red-700 focus:ring-red-500/30 focus:border-red-400' : ''}`}
                  autoComplete="email"
                />
              </div>
              {fieldErrors.email && (
                <p className="mt-1 text-xs text-red-500 dark:text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {fieldErrors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-xs font-medium text-surface-700 dark:text-surface-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400 dark:text-surface-500" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange('password')}
                  placeholder={mode === 'login' ? 'Enter password (e.g. demo123)' : 'Min. 4 characters'}
                  className={`input-field pl-10 pr-10 text-sm ${fieldErrors.password ? 'border-red-300 dark:border-red-700 focus:ring-red-500/30 focus:border-red-400' : ''}`}
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-surface-400 dark:text-surface-500 hover:text-surface-600 dark:hover:text-surface-300 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="mt-1 text-xs text-red-500 dark:text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {fieldErrors.password}
                </p>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading || loadingDemoId !== null}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-600 text-white
                rounded-xl font-semibold text-sm hover:bg-primary-700 active:bg-primary-800
                transition-all duration-200 shadow-sm hover:shadow-md
                focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:ring-offset-2 dark:focus:ring-offset-surface-900
                disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-primary-600
                hover:scale-[1.005] active:scale-[0.99]"
              id="auth-submit"
            >
              {isLoading && loadingDemoId === null ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {mode === 'login' ? 'Signing in...' : 'Creating account...'}
                </>
              ) : (
                <>
                  {mode === 'login' ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Switch mode */}
          <div className="pt-1 text-center text-xs text-surface-500 dark:text-surface-400">
            {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              type="button"
              onClick={switchMode}
              className="font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
              id="switch-mode-btn"
            >
              {mode === 'login' ? 'Sign up free' : 'Sign in'}
            </button>
          </div>

          {/* Back to landing */}
          <p className="text-center">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="text-xs text-surface-400 dark:text-surface-500 hover:text-surface-600 dark:hover:text-surface-300 transition-colors"
            >
              ← Back to home
            </button>
          </p>
        </div>
      </div>

      {/* Demo Login Modal Dialog */}
      <DemoLoginModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
      />
    </div>
  );
}
