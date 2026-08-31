import { Trophy, Lock, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Achievements() {
  const { achievements } = useApp();

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalCount = achievements.length;
  const completionPercentage = Math.round((unlockedCount / totalCount) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="w-6 h-6 text-amber-500" />
            <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100">Achievements</h1>
          </div>
          <p className="text-surface-500 dark:text-surface-400">
            Gamified badges and milestones unlocked as your EduTwin advances.
          </p>
        </div>

        {/* Progress pill */}
        <div className="card !p-3 flex items-center gap-4 bg-gradient-to-r from-amber-500/10 to-primary-500/10 dark:from-amber-950/40 dark:to-primary-950/40 border-amber-200/60 dark:border-amber-800/40">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-base shadow-sm">
            {unlockedCount}/{totalCount}
          </div>
          <div>
            <p className="text-xs font-semibold text-surface-700 dark:text-surface-300">Milestones Reached</p>
            <div className="w-28 bg-surface-200 dark:bg-surface-700 rounded-full h-1.5 mt-1 overflow-hidden">
              <div
                className="bg-amber-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {achievements.map((item) => (
          <div
            key={item.id}
            className={`card group hover-lift transition-all duration-200 relative overflow-hidden ${
              item.unlocked
                ? 'border-amber-200/80 dark:border-amber-800/50 bg-white dark:bg-surface-800 hover:border-amber-300 dark:hover:border-amber-700'
                : 'bg-surface-50/80 dark:bg-surface-800/40 border-surface-200/60 dark:border-surface-700/60 opacity-70'
            }`}
          >
            {item.unlocked && (
              <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden pointer-events-none">
                <div className="absolute transform rotate-45 bg-amber-500 text-white text-[9px] font-bold py-0.5 right-[-35px] top-[14px] w-[110px] text-center shadow-sm">
                  UNLOCKED
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 shadow-sm ${
                  item.unlocked
                    ? 'bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-950/80 dark:to-orange-950/80 border border-amber-200 dark:border-amber-800/60'
                    : 'bg-surface-200/70 dark:bg-surface-700/70 border border-surface-300 dark:border-surface-600 text-surface-400 dark:text-surface-500 grayscale'
                }`}
              >
                {item.icon}
              </div>

              <div className="flex-1 min-w-0 pr-4">
                <h3 className="text-sm font-bold text-surface-900 dark:text-surface-100 truncate">{item.title}</h3>
                <p className="text-xs text-surface-500 dark:text-surface-400 mt-1 leading-snug">{item.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  {item.unlocked ? (
                    <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      {item.date ? `Achieved on ${item.date}` : 'Completed'}
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold text-surface-400 dark:text-surface-500 flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Locked
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
