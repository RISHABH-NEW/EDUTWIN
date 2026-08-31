import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, BookOpen, FileText, TrendingUp,
  Bot, Calendar, Compass, Trophy, Settings, ChevronLeft,
  GraduationCap, Sparkles, X, LogOut,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from '../ui/ThemeToggle';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/edutwin', label: 'My EduTwin', icon: Sparkles },
  { path: '/learn', label: 'Learn', icon: BookOpen },
  { path: '/assessments', label: 'Assessments', icon: FileText },
  { path: '/progress', label: 'Progress', icon: TrendingUp },
  { path: '/tutor', label: 'AI Tutor', icon: Bot },
  { path: '/planner', label: 'Study Planner', icon: Calendar },
  { path: '/career', label: 'Career Path', icon: Compass },
  { path: '/achievements', label: 'Achievements', icon: Trophy },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ isOpen, onClose }) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { profile } = useApp();
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full bg-white dark:bg-surface-900 border-r border-surface-200/80 dark:border-surface-800 z-50
          flex flex-col transition-all duration-300 ease-out
          ${collapsed ? 'w-[72px]' : 'w-64'}
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Brand */}
        <div className={`flex items-center gap-3 px-5 py-5 border-b border-surface-100 dark:border-surface-800 ${collapsed ? 'justify-center px-3' : ''}`}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center flex-shrink-0 shadow-sm">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div className="animate-fade-in">
              <h1 className="text-base font-bold text-surface-900 dark:text-surface-100 leading-tight">EduTwin</h1>
              <p className="text-[10px] text-surface-400 dark:text-surface-500 font-medium tracking-wide uppercase">AI-Powered Learning</p>
            </div>
          )}
          {/* Mobile close */}
          <button
            onClick={onClose}
            className="lg:hidden ml-auto p-1.5 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-400 dark:text-surface-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                  transition-all duration-200 group relative
                  ${isActive
                    ? 'bg-primary-50 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 font-semibold'
                    : 'text-surface-600 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-800 hover:text-surface-900 dark:hover:text-surface-100'
                  }
                  ${collapsed ? 'justify-center px-2' : ''}
                `}
              >
                <Icon className={`w-[18px] h-[18px] flex-shrink-0 transition-colors duration-200
                  ${isActive ? 'text-primary-600 dark:text-primary-400' : 'text-surface-400 dark:text-surface-500 group-hover:text-surface-600 dark:group-hover:text-surface-300'}`}
                />
                {!collapsed && <span className="animate-fade-in">{item.label}</span>}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-primary-600 dark:bg-primary-400 rounded-r-full" />
                )}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-2.5 py-1 bg-surface-900 dark:bg-surface-700 text-white text-xs rounded-lg
                    opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-lg">
                    {item.label}
                  </div>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Theme Toggle & Collapse Controls in Sidebar */}
        <div className={`px-3 py-2 flex items-center ${collapsed ? 'justify-center flex-col gap-2' : 'justify-between'} border-t border-surface-100 dark:border-surface-800`}>
          <div className="flex items-center">
            <ThemeToggle size="sm" showLabel={!collapsed} />
          </div>

          {/* Collapse toggle (desktop only) */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex items-center justify-center p-1.5 rounded-xl
              text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 hover:text-surface-600 dark:hover:text-surface-200 transition-all duration-200"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronLeft className={`w-4 h-4 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* User Profile */}
        <div className={`border-t border-surface-100 dark:border-surface-800 p-4 ${collapsed ? 'px-3' : ''}`}>
          <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center flex-shrink-0 shadow-sm">
              <span className="text-white text-sm font-semibold">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            {!collapsed && (
              <div className="animate-fade-in min-w-0 flex-1">
                <p className="text-sm font-semibold text-surface-800 dark:text-surface-200 truncate">{profile.name}</p>
                <p className="text-xs text-surface-400 dark:text-surface-500 truncate">{profile.course}</p>
              </div>
            )}
            <button
              onClick={() => { logout(); navigate('/login'); }}
              className={`p-2 rounded-xl text-surface-400 hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-red-500 dark:hover:text-red-400
                transition-all duration-200 flex-shrink-0 group ${collapsed ? 'mt-2' : ''}`}
              title="Sign out"
              id="logout-btn"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
