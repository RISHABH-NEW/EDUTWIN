import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle({ className = '', showLabel = false, size = 'md' }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';

  const sizeClasses = {
    sm: 'p-1.5 rounded-lg text-xs',
    md: 'p-2 rounded-xl text-sm',
    lg: 'p-2.5 rounded-xl text-base',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={`relative inline-flex items-center gap-2 text-surface-500 hover:text-surface-900 dark:text-surface-400 dark:hover:text-surface-100 hover:bg-surface-100 dark:hover:bg-surface-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/40 ${sizeClasses[size] || sizeClasses.md} ${className}`}
      id="theme-toggle-btn"
    >
      <div className="relative flex items-center justify-center">
        {isDark ? (
          <Sun className={`${iconSizes[size] || iconSizes.md} text-amber-400 transform transition-transform duration-300 rotate-0 hover:rotate-45`} />
        ) : (
          <Moon className={`${iconSizes[size] || iconSizes.md} text-surface-600 dark:text-surface-300 transform transition-transform duration-300 -rotate-12 hover:rotate-0`} />
        )}
      </div>

      {showLabel && (
        <span className="font-medium text-surface-700 dark:text-surface-300 select-none">
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </span>
      )}
    </button>
  );
}
