import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { searchableItems } from '../../data/mockData';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = query.trim()
    ? searchableItems.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.type.toLowerCase().includes(query.toLowerCase())
      )
    : searchableItems.slice(0, 8);

  const handleSelect = (item) => {
    navigate(item.path);
    onClose();
  };

  const getIcon = (iconName) => {
    const Icon = LucideIcons[iconName];
    return Icon ? <Icon className="w-4 h-4" /> : null;
  };

  const typeColors = {
    Subject: 'bg-primary-100 dark:bg-primary-950/80 text-primary-700 dark:text-primary-300 dark:border dark:border-primary-800/40',
    Topic: 'bg-accent-100 dark:bg-accent-950/80 text-accent-700 dark:text-accent-300 dark:border dark:border-accent-800/40',
    Assessment: 'bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 dark:border dark:border-amber-800/40',
    Feature: 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 dark:border dark:border-emerald-800/40',
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center pt-[15vh] p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-surface-800 border border-surface-200/80 dark:border-surface-700 rounded-2xl shadow-modal w-full max-w-xl animate-scale-in overflow-hidden transition-colors duration-200">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-surface-100 dark:border-surface-700">
          <Search className="w-5 h-5 text-surface-400 dark:text-surface-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search topics, subjects, features..."
            className="flex-1 text-sm text-surface-800 dark:text-surface-100 placeholder:text-surface-400 dark:placeholder:text-surface-500 outline-none bg-transparent"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-400 dark:text-surface-400 hover:text-surface-600 dark:hover:text-surface-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[400px] overflow-y-auto py-2">
          {filtered.length === 0 ? (
            <div className="px-5 py-8 text-center">
              <p className="text-sm text-surface-400 dark:text-surface-400">No results found for "{query}"</p>
              <p className="text-xs text-surface-300 dark:text-surface-500 mt-1">Try a different search term</p>
            </div>
          ) : (
            filtered.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(item)}
                className="w-full flex items-center gap-3 px-5 py-3 hover:bg-surface-50 dark:hover:bg-surface-700/60
                  transition-colors text-left group"
              >
                <div className="w-8 h-8 rounded-lg bg-surface-100 dark:bg-surface-700 flex items-center justify-center
                  text-surface-500 dark:text-surface-400 group-hover:bg-primary-50 dark:group-hover:bg-primary-950/60 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {getIcon(item.icon)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-surface-800 dark:text-surface-100 truncate">{item.name}</p>
                </div>
                <span className={`badge text-[10px] ${typeColors[item.type] || ''}`}>
                  {item.type}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-surface-300 dark:text-surface-600 opacity-0 group-hover:opacity-100
                  transition-opacity" />
              </button>
            ))
          )}
        </div>

        {/* Footer hint */}
        <div className="px-5 py-3 border-t border-surface-100 dark:border-surface-700 bg-surface-50/50 dark:bg-surface-800/80">
          <p className="text-xs text-surface-400 dark:text-surface-500">
            Press <kbd className="px-1 py-0.5 bg-surface-200 dark:bg-surface-700 text-surface-600 dark:text-surface-300 rounded text-[10px] font-mono">ESC</kbd> to close
          </p>
        </div>
      </div>
    </div>
  );
}
