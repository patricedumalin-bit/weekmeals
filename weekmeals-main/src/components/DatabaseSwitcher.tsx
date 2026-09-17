import React from 'react';
import { DatabaseViewSource } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { Globe, User, Sparkles } from 'lucide-react';

interface DatabaseSwitcherProps {
  currentSource: DatabaseViewSource;
  onChangeSource: (source: DatabaseViewSource) => void;
  personalCount: number;
  genericCount: number;
  totalCount: number;
  className?: string;
}

export const DatabaseSwitcher: React.FC<DatabaseSwitcherProps> = ({
  currentSource,
  onChangeSource,
  personalCount,
  genericCount,
  totalCount,
  className = ''
}) => {
  const { t } = useLanguage();

  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
        <span className="font-semibold flex items-center gap-1.5">
          <span>Source :</span>
        </span>
        <span className="text-[11px] opacity-80 hidden sm:inline">
          {currentSource === 'all' && t('switchDbHint')}
          {currentSource === 'personal' && t('onlyPersonalDesc')}
          {currentSource === 'generic' && t('onlyGenericDesc')}
        </span>
      </div>

      <div className="inline-flex p-1 rounded-2xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-2xs backdrop-blur-md w-full sm:w-auto">
        {/* All Sources */}
        <button
          type="button"
          onClick={() => onChangeSource('all')}
          className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            currentSource === 'all'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>{t('dbSourceAll')}</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono">
            {totalCount}
          </span>
        </button>

        {/* Personal Cloud DB */}
        <button
          type="button"
          onClick={() => onChangeSource('personal')}
          className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            currentSource === 'personal'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>{t('dbSourcePersonal')}</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
            currentSource === 'personal'
              ? 'bg-emerald-700/80 text-emerald-100'
              : 'bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}>
            {personalCount}
          </span>
        </button>

        {/* Generic Cloud DB */}
        <button
          type="button"
          onClick={() => onChangeSource('generic')}
          className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            currentSource === 'generic'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>{t('dbSourceGeneric')}</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
            currentSource === 'generic'
              ? 'bg-blue-700/80 text-blue-100'
              : 'bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}>
            {genericCount}
          </span>
        </button>
      </div>
    </div>
  );
};
