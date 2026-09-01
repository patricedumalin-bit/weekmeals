import React, { useState, useRef, useEffect } from 'react';
import { 
  UtensilsCrossed, 
  Printer, 
  RotateCcw, 
  CalendarDays, 
  ShoppingCart, 
  Database,
  Users,
  Globe,
  ChevronDown,
  Check
} from 'lucide-react';
import { ActiveTab, WeeklyPlan } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { SupportedLanguage } from '../i18n/translations';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  weeklyPlan: WeeklyPlan;
  totalShoppingItems: number;
  checkedShoppingItems: number;
  onPrint: () => void;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  weeklyPlan,
  totalShoppingItems,
  checkedShoppingItems,
  onPrint,
  onReset
}) => {
  const { t, language, setLanguage, languages, currentLanguageInfo } = useLanguage();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totalAssignedRecipes = weeklyPlan.meals.reduce(
    (sum, m) => sum + (m.recipeIds?.length || 0), 
    0
  );

  return (
    <header className="no-print backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border-b border-white/40 dark:border-white/10 sticky top-0 z-30 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* Logo & App title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 shrink-0">
            <UtensilsCrossed className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight leading-none">
                {t('appName')}
              </h1>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold backdrop-blur-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                {t('androidReady')}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-2">
              <span>{t('mealsPlannedCount', { count: weeklyPlan.numberOfMeals })}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3 text-slate-400" /> {t('defaultPersons', { count: weeklyPlan.defaultServings })}
              </span>
            </p>
          </div>
        </div>

        {/* Desktop tab navigation */}
        <nav className="hidden md:flex items-center gap-1 backdrop-blur-md bg-slate-200/50 dark:bg-slate-800/50 border border-white/40 dark:border-white/5 p-1 rounded-xl shadow-2xs">
          <button
            onClick={() => setActiveTab('planner')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'planner'
                ? 'backdrop-blur-md bg-white/90 dark:bg-slate-900/90 text-emerald-600 dark:text-emerald-400 shadow-xs border border-white/60 dark:border-white/10'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <CalendarDays className="w-4 h-4" />
            <span>{t('tabPlanner')}</span>
          </button>

          <button
            onClick={() => setActiveTab('meals')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all relative ${
              activeTab === 'meals'
                ? 'backdrop-blur-md bg-white/90 dark:bg-slate-900/90 text-emerald-600 dark:text-emerald-400 shadow-xs border border-white/60 dark:border-white/10'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span>{t('tabPlannedMeals')}</span>
            {totalAssignedRecipes > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-500/30">
                {totalAssignedRecipes}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('shopping')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'shopping'
                ? 'backdrop-blur-md bg-white/90 dark:bg-slate-900/90 text-emerald-600 dark:text-emerald-400 shadow-xs border border-white/60 dark:border-white/10'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>{t('tabShoppingList')}</span>
            {totalShoppingItems > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-500/20 text-amber-800 dark:text-amber-300 font-bold border border-amber-500/30">
                {checkedShoppingItems}/{totalShoppingItems}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('database')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'database'
                ? 'backdrop-blur-md bg-white/90 dark:bg-slate-900/90 text-emerald-600 dark:text-emerald-400 shadow-xs border border-white/60 dark:border-white/10'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>{t('tabDatabase')}</span>
          </button>
        </nav>

        {/* Quick action buttons & Language selector */}
        <div className="flex items-center gap-1.5">
          {/* Language Dropdown */}
          <div className="relative" ref={langMenuRef}>
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md bg-white/60 dark:bg-slate-800/60 border border-white/50 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-colors shadow-2xs"
              title={t('selectLanguage')}
            >
              <span className="text-sm">{currentLanguageInfo.flag}</span>
              <span className="font-bold">{currentLanguageInfo.code.toUpperCase()}</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-1 w-44 backdrop-blur-2xl bg-white/95 dark:bg-slate-900/95 border border-white/50 dark:border-white/10 rounded-2xl shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-white/40 dark:border-white/5 mb-1">
                  {t('selectLanguage')}
                </div>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code as SupportedLanguage);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full px-3 py-1.5 text-xs flex items-center justify-between transition-colors ${
                      language === lang.code
                        ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{lang.flag}</span>
                      <span>{lang.nativeName}</span>
                    </div>
                    {language === lang.code && <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={onPrint}
            title={t('print')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold backdrop-blur-md bg-white/60 dark:bg-slate-800/60 border border-white/50 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-colors shadow-2xs"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">{t('print')}</span>
          </button>

          <button
            onClick={onReset}
            title={t('reset')}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-white/60 dark:hover:bg-slate-800/60 backdrop-blur-md border border-transparent hover:border-white/40 dark:hover:border-white/10 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
