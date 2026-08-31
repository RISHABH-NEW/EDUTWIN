import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GraduationCap, Mail, Lock, User, Eye, EyeOff,
  ArrowRight, Sparkles, BookOpen, Bot, TrendingUp,
  AlertCircle, Loader2, CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from '../components/ui/ThemeToggle';

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

export default function LoginPage() {
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();
  const { login, signup, isLoading, error, clearError, isAuthenticated } = useAuth();
  const emailRef = useRef(null);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

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
    } else if (formData.password.length < 6) {
      errors.password = 'At least 6 characters';
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
      setSuccessMsg('Welcome to EduTwin! Redirecting...');
      setTimeout(() => navigate('/dashboard', { replace: true }), 600);
    } catch {
      // Error is handled by AuthContext
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
    setMode(prev => prev === 'login' ? 'signup' : 'login');
    setFormData({ name: '', email: '', password: '' });
  };

  return (
    <div className="min-h-screen flex bg-surface-50 dark:bg-surface-900 text-surface-900 dark:text-surface-100 transition-colors duration-200 relative" id="login-page">
      {/* Top right theme toggle */}
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle size="md" />
      </div>

      {/* Left Panel — Branding & Features (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[48%] relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900">
        {/* Animated background shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute top-1/2 -right-20 w-80 h-80 bg-accent-500/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
          <div className="absolute -bottom-20 left-1/3 w-72 h-72 bg-primary-400/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />
        </div>

        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 w-full">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white leading-tight">EduTwin</h1>
              <p className="text-[10px] text-primary-200 font-medium tracking-wider uppercase">AI-Powered Learning</p>
            </div>
          </div>

          {/* Hero content */}
          <div className="my-auto py-12">
            <h2 className="text-3xl xl:text-4xl font-extrabold text-white leading-tight tracking-tight">
              Your AI Learning
              <br />
              <span className="text-accent-300">Twin Awaits.</span>
            </h2>
            <p className="mt-5 text-primary-200 text-base leading-relaxed max-w-md">
              Join thousands of students learning smarter with personalized AI that adapts to your unique style.
            </p>

            {/* Benefits */}
            <div className="mt-8 space-y-3">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-accent-500/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent-300" />
                  </div>
                  <span className="text-sm text-primary-100">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Floating feature cards */}
            <div className="mt-10 grid grid-cols-2 gap-3">
              {floatingFeatures.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.label}
                    className="flex items-center gap-2.5 px-3.5 py-2.5 bg-white/[0.07] backdrop-blur-sm
                      border border-white/10 rounded-xl animate-fade-in"
                    style={{ animationDelay: `${feature.delay * 0.2}s` }}
                  >
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${feature.color}
                      flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xs font-medium text-white/90">{feature.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom stat */}
          <div className="flex items-center gap-6 text-primary-200 text-sm">
            <span><strong className="text-white">10K+</strong> Students</span>
            <span className="w-px h-4 bg-primary-400/30" />
            <span><strong className="text-white">95%</strong> Satisfaction</span>
            <span className="w-px h-4 bg-primary-400/30" />
            <span><strong className="text-white">24/7</strong> AI Access</span>
          </div>
        </div>
      </div>

      {/* Right Panel — Login / Signup Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-12">
        <div className="w-full max-w-[420px]">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center shadow-sm">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-surface-900 dark:text-surface-100">EduTwin</span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-surface-900 dark:text-surface-100 tracking-tight">
              {mode === 'login' ? 'Welcome back' : 'Create your account'}
            </h2>
            <p className="mt-2 text-sm text-surface-500 dark:text-surface-400">
              {mode === 'login'
                ? 'Sign in to continue your learning journey'
                : 'Start your AI-powered learning experience'}
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-5 flex items-start gap-2.5 px-4 py-3 bg-red-50 dark:bg-red-950/80 border border-red-200 dark:border-red-800 rounded-xl animate-scale-in" id="auth-error">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}

          {/* Success message */}
          {successMsg && (
            <div className="mb-5 flex items-start gap-2.5 px-4 py-3 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 rounded-xl animate-scale-in" id="auth-success">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-emerald-700 dark:text-emerald-300">{successMsg}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4" id="auth-form">
            {/* Name (signup only) */}
            {mode === 'signup' && (
              <div className="animate-slide-up">
                <label htmlFor="name" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
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
                    className={`input-field pl-10 ${fieldErrors.name ? 'border-red-300 dark:border-red-700 focus:ring-red-500/30 focus:border-red-400' : ''}`}
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
              <label htmlFor="email" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
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
                  placeholder="you@example.com"
                  className={`input-field pl-10 ${fieldErrors.email ? 'border-red-300 dark:border-red-700 focus:ring-red-500/30 focus:border-red-400' : ''}`}
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
              <label htmlFor="password" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400 dark:text-surface-500" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange('password')}
                  placeholder={mode === 'login' ? 'Enter your password' : 'Min. 6 characters'}
                  className={`input-field pl-10 pr-10 ${fieldErrors.password ? 'border-red-300 dark:border-red-700 focus:ring-red-500/30 focus:border-red-400' : ''}`}
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

            {/* Forgot password (login only) */}
            {mode === 'login' && (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 text-white
                rounded-xl font-semibold text-sm hover:bg-primary-700 active:bg-primary-800
                transition-all duration-200 shadow-sm hover:shadow-lg
                focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:ring-offset-2 dark:focus:ring-offset-surface-900
                disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-primary-600
                hover:scale-[1.01] active:scale-[0.99]"
              id="auth-submit"
            >
              {isLoading ? (
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

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-surface-200 dark:bg-surface-700" />
            <span className="text-xs text-surface-400 dark:text-surface-500 font-medium">or continue with</span>
            <div className="flex-1 h-px bg-surface-200 dark:bg-surface-700" />
          </div>

          {/* Social login buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={async () => {
                try {
                  await login('demo@edutwin.ai', 'demo123');
                  navigate('/dashboard', { replace: true });
                } catch { /* handled by context */ }
              }}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700
                rounded-xl text-sm font-medium text-surface-700 dark:text-surface-200 hover:bg-surface-50 dark:hover:bg-surface-700/70 hover:border-surface-300 dark:hover:border-surface-600
                transition-all duration-200 shadow-sm"
              id="demo-login-btn"
            >
              <Sparkles className="w-4 h-4 text-primary-500 dark:text-primary-400" />
              Demo Login
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700
                rounded-xl text-sm font-medium text-surface-700 dark:text-surface-200 hover:bg-surface-50 dark:hover:bg-surface-700/70 hover:border-surface-300 dark:hover:border-surface-600
                transition-all duration-200 shadow-sm"
              id="google-login-btn"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
          </div>

          {/* Switch mode */}
          <p className="mt-8 text-center text-sm text-surface-500 dark:text-surface-400">
            {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              type="button"
              onClick={switchMode}
              className="font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
              id="switch-mode-btn"
            >
              {mode === 'login' ? 'Sign up free' : 'Sign in'}
            </button>
          </p>

          {/* Back to landing */}
          <p className="mt-4 text-center">
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
    </div>
  );
}
