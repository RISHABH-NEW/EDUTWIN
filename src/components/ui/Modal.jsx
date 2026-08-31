import { X } from 'lucide-react';
import { useEffect, useCallback } from 'react';

export default function Modal({ isOpen, onClose, title, children, size = 'md' }) {
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

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-[90vw]',
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative bg-white dark:bg-surface-800 border border-surface-200/80 dark:border-surface-700 rounded-2xl shadow-modal w-full ${sizes[size]}
        animate-scale-in max-h-[85vh] flex flex-col transition-colors duration-200`}>
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-surface-100 dark:border-surface-700">
            <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-100">{title}</h2>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-400 dark:text-surface-400 hover:text-surface-600 dark:hover:text-surface-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
        <div className="flex-1 overflow-y-auto p-6 text-surface-700 dark:text-surface-300">
          {children}
        </div>
      </div>
    </div>
  );
}
