import { CheckCircle, AlertCircle, Info, Trophy } from 'lucide-react';

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  achievement: Trophy,
};

const colors = {
  success: 'bg-emerald-50 dark:bg-emerald-950/90 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200',
  error: 'bg-red-50 dark:bg-red-950/90 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200',
  info: 'bg-primary-50 dark:bg-primary-950/90 border-primary-200 dark:border-primary-800 text-primary-800 dark:text-primary-200',
  achievement: 'bg-amber-50 dark:bg-amber-950/90 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200',
};

export default function Toast({ message, type = 'success' }) {
  const Icon = icons[type] || icons.info;
  const color = colors[type] || colors.info;

  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-elevated
      animate-slide-in-right ${color}`}>
      <Icon className="w-4 h-4 flex-shrink-0" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}
