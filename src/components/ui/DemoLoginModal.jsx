import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Sparkles, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { DEMO_STUDENTS } from '../../data/demoUsers';
import { useAuth } from '../../context/AuthContext';

export default function DemoLoginModal({ isOpen, onClose }) {
  const [loadingId, setLoadingId] = useState(null);
  const { loginAsDemoUser } = useAuth();
  const navigate = useNavigate();

  const handleEscape = useCallback((e) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  const handleSelectStudent = async (student) => {
    setLoadingId(student.id);
    try {
      await loginAsDemoUser(student.id);
      onClose();
      navigate('/dashboard', { replace: true });
    } catch (err) {
      console.error('Demo login failed:', err);
      setLoadingId(null);
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
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-4 overflow-y-auto" id="demo-login-modal">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div
        className="relative bg-white dark:bg-surface-850 border border-surface-200 dark:border-surface-700/80
          rounded-2xl sm:rounded-3xl shadow-elevated w-full max-w-4xl max-h-[90vh] flex flex-col
          overflow-hidden animate-scale-in z-10 my-auto transition-colors duration-200"
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between px-5 py-4 sm:px-7 sm:py-5 border-b border-surface-100 dark:border-surface-750 bg-surface-50/50 dark:bg-surface-800/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center text-white shadow-sm flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-surface-900 dark:text-surface-100 leading-tight">
                Explore EduTwin as a Demo Student
              </h2>
              <p className="text-xs sm:text-sm text-surface-500 dark:text-surface-400 mt-0.5">
                Choose a student profile to explore EduTwin.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close demo login dialog"
            className="p-2 rounded-xl text-surface-400 hover:text-surface-600 dark:text-surface-400 dark:hover:text-surface-200
              hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: 6 Student Cards */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
            {DEMO_STUDENTS.map((student) => {
              const isLoading = loadingId === student.id;
              return (
                <div
                  key={student.id}
                  className="flex flex-col justify-between p-4 rounded-2xl bg-surface-50 dark:bg-surface-800/80
                    border border-surface-200/80 dark:border-surface-700 hover:border-primary-300 dark:hover:border-primary-700
                    hover:shadow-md transition-all duration-200 group text-left relative overflow-hidden"
                >
                  <div>
                    {/* Top Row: Avatar & Branch Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="w-10 h-10 rounded-full bg-white dark:bg-surface-700 border border-surface-200/80 dark:border-surface-600 flex items-center justify-center text-lg shadow-xs">
                        <span>{student.avatarEmoji}</span>
                      </div>
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${getBranchBadgeColor(student.branch)}`}>
                        {student.branch}
                      </span>
                    </div>

                    {/* Student Name */}
                    <h3 className="text-base font-bold text-surface-900 dark:text-surface-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors truncate">
                      {student.name}
                    </h3>

                    {/* Role / Branch Subtitle */}
                    <p className="text-xs font-semibold text-surface-600 dark:text-surface-300 mt-0.5">
                      {student.role}
                    </p>

                    {/* Course details */}
                    <p className="text-[11px] text-surface-400 dark:text-surface-500 mt-1 line-clamp-1">
                      {student.profile.course}
                    </p>

                    {/* Quick Stats Pill */}
                    <div className="mt-3 pt-2.5 border-t border-surface-200/60 dark:border-surface-700/60 flex items-center justify-between text-[11px] text-surface-500 dark:text-surface-400">
                      <span>Mastery: <strong className="text-surface-800 dark:text-surface-200">{student.stats.overallMastery}%</strong></span>
                      <span>Streak: <strong className="text-surface-800 dark:text-surface-200">{student.stats.currentStreak}d</strong></span>
                    </div>
                  </div>

                  {/* One-Click Login Button */}
                  <button
                    type="button"
                    disabled={loadingId !== null}
                    onClick={() => handleSelectStudent(student)}
                    className="mt-4 w-full flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl
                      text-xs font-semibold bg-white dark:bg-surface-700 text-primary-600 dark:text-primary-300
                      border border-primary-200/80 dark:border-primary-800/80 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 dark:hover:text-white
                      hover:border-transparent active:scale-[0.98] transition-all duration-150 shadow-xs
                      disabled:opacity-60 disabled:cursor-not-allowed group-hover:bg-primary-600 group-hover:text-white group-hover:border-transparent"
                    id={`enter-demo-${student.id}`}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Entering...</span>
                      </>
                    ) : (
                      <>
                        <span>Enter Demo</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 sm:px-7 sm:py-3.5 border-t border-surface-100 dark:border-surface-750 bg-surface-50/50 dark:bg-surface-800/50 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-surface-500 dark:text-surface-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span>1-Click Instant Access · No password required · Client-side demo</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-medium text-surface-500 hover:text-surface-800 dark:text-surface-400 dark:hover:text-surface-200 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
