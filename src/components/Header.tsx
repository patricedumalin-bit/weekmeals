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
  Check,
  Crown,
  Settings
} from 'lucide-react';
import { ActiveTab, WeeklyPlan, themes, Theme } from '../types';
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
  isPremium: boolean;
  user: any;
  onTogglePremium: () => void;
  currentTheme: string;
  onUpdateTheme: (theme: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  weeklyPlan,
  totalShoppingItems,
  checkedShoppingItems,
  onPrint,
  onReset,
  isPremium,
  user,
  onTogglePremium,
  currentTheme,
  onUpdateTheme
}) => {
  const { t, language, setLanguage, languages, currentLanguageInfo } = useLanguage();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  
  const isOwner = user?.email === 'patrice.dumalin@gmail.com';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setLangMenuOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totalAssignedRecipes = weeklyPlan.meals.reduce(
    (sum, m) => sum + (m.recipeIds?.length || 0), 
    0
  );

  const handlePrintClick = () => {
    if (!isPremium) {
      alert("L'impression est réservée aux utilisateurs premium.");
      return;
    }
    onPrint();
  };

  return (
    <header className="no-print backdrop-blur-xl bg-[var(--card-bg)] border-b border-[var(--border-color)] sticky top-0 z-30 shadow-xs transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-3">
        {/* Logo & App title */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-[var(--accent)] to-[var(--accent)] flex items-center justify-center text-white shadow-md shadow-[var(--primary)]/20 shrink-0">
            <UtensilsCrossed className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h1 className="text-sm xs:text-base md:text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight leading-none truncate max-w-[150px] xs:max-w-[200px] sm:max-w-none">
                {t('appName')}
              </h1>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold backdrop-blur-md bg-[var(--primary)]/10 text-[var(--primary)] dark:text-[var(--accent)] border border-[var(--primary)]/20">
                {t('androidReady')}
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1.5 sm:gap-2 truncate">
              <span>{t('mealsPlannedCount', { count: weeklyPlan.numberOfMeals })}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Users className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-400" /> {t('defaultPersons', { count: weeklyPlan.defaultServings })}
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
                ? 'backdrop-blur-md bg-white/90 dark:bg-slate-900/90 text-[var(--primary)] dark:text-[var(--accent)] shadow-xs border border-white/60 dark:border-white/10'
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
                ? 'backdrop-blur-md bg-white/90 dark:bg-slate-900/90 text-[var(--primary)] dark:text-[var(--accent)] shadow-xs border border-white/60 dark:border-white/10'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span>{t('tabPlannedMeals')}</span>
            {totalAssignedRecipes > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[var(--primary)]/20 text-[var(--primary)] dark:text-[var(--accent)] font-bold border border-[var(--primary)]/30">
                {totalAssignedRecipes}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('shopping')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'shopping'
                ? 'backdrop-blur-md bg-white/90 dark:bg-slate-900/90 text-[var(--primary)] dark:text-[var(--accent)] shadow-xs border border-white/60 dark:border-white/10'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>{t('tabShoppingList')}</span>
            {totalShoppingItems > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[var(--accent)]/20 text-[var(--primary)] dark:text-[var(--accent)] font-bold border border-[var(--accent)]/30">
                {checkedShoppingItems}/{totalShoppingItems}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('database')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'database'
                ? 'backdrop-blur-md bg-white/90 dark:bg-slate-900/90 text-[var(--primary)] dark:text-[var(--accent)] shadow-xs border border-white/60 dark:border-white/10'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>{t('tabDatabase')}</span>
          </button>
        </nav>

        {/* Quick action buttons & Language selector */}
        {/* Desktop Layout (md and up) */}
        <div className="hidden md:flex items-center gap-1.5">
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
                        ? 'bg-[var(--primary)]/10 text-[var(--primary)] dark:text-[var(--primary)] font-bold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{lang.flag}</span>
                      <span>{lang.nativeName}</span>
                    </div>
                    {language === lang.code && <Check className="w-3.5 h-3.5 text-[var(--primary)] dark:text-[var(--primary)]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 p-1 bg-white/50 dark:bg-slate-800/50 rounded-xl border border-white/50 dark:border-white/10">
            {(Object.keys(themes) as Theme[]).map((theme) => (
              <button
                key={theme}
                onClick={() => onUpdateTheme(theme)}
                title={theme}
                className={`w-5 h-5 rounded-full border-2 transition-all ${currentTheme === theme ? 'border-slate-900 dark:border-white scale-110' : 'border-transparent hover:scale-105'}`}
                style={{ backgroundColor: themes[theme].accent }}
              />
            ))}
          </div>

          {isOwner && (
            <button
              onClick={onTogglePremium}
              title={isPremium ? "Passer en mode limité" : "Passer en mode premium"}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold backdrop-blur-md border border-white/50 dark:border-white/10 transition-colors shadow-2xs ${
                isPremium
                  ? 'bg-[var(--accent)]/20 text-[var(--primary)] dark:text-[var(--accent)] hover:bg-[var(--accent)]/30'
                  : 'bg-slate-200/60 text-slate-700 dark:text-slate-200 hover:bg-slate-300/60 dark:hover:bg-slate-700/60'
              }`}
            >
              <Crown className="w-4 h-4" />
              <span className="hidden sm:inline">{isPremium ? "Premium" : "Libre"}</span>
            </button>
          )}

          <button
            onClick={handlePrintClick}
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

        {/* Mobile Layout (md hidden) */}
        <div className="flex md:hidden items-center gap-1.5" ref={mobileMenuRef}>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2.5 rounded-xl border transition-colors shadow-2xs flex items-center justify-center relative ${
              mobileMenuOpen
                ? 'bg-[var(--accent)]/25 text-[var(--primary)] dark:text-[var(--accent)] border-[var(--accent)]/30'
                : 'bg-white/60 dark:bg-slate-800/60 border-white/50 dark:border-white/10 text-slate-700 dark:text-slate-200'
            }`}
            title="Options"
          >
            <Settings className={`w-4.5 h-4.5 transition-transform duration-300 ${mobileMenuOpen ? 'rotate-90' : ''}`} />
          </button>

          {mobileMenuOpen && (
            <div className="absolute right-3 top-15 w-72 backdrop-blur-2xl bg-white/95 dark:bg-slate-900/95 border border-white/50 dark:border-white/10 rounded-2xl shadow-xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150 flex flex-col gap-4">
              {/* Themes section */}
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  {language === 'fr' ? 'Thème / Skin' : 'Theme / Skin'}
                </div>
                <div className="flex items-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-white/20">
                  {(Object.keys(themes) as Theme[]).map((theme) => (
                    <button
                      key={theme}
                      onClick={() => onUpdateTheme(theme)}
                      title={theme}
                      className={`w-7 h-7 rounded-full border-2 transition-all ${currentTheme === theme ? 'border-slate-900 dark:border-white scale-110' : 'border-transparent hover:scale-105'}`}
                      style={{ backgroundColor: themes[theme].accent }}
                    />
                  ))}
                </div>
              </div>

              {/* Language section */}
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  {t('selectLanguage')}
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code as SupportedLanguage)}
                      className={`px-2.5 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition-all ${
                        language === lang.code
                          ? 'bg-[var(--accent)]/15 text-[var(--primary)] dark:text-[var(--accent)] font-bold border border-[var(--accent)]/30'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-transparent hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      <span className="text-sm">{lang.flag}</span>
                      <span className="truncate">{lang.nativeName}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions section */}
              <div className="border-t border-white/40 dark:border-white/5 pt-3 flex flex-col gap-2">
                <button
                  onClick={() => {
                    handlePrintClick();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold bg-white/60 dark:bg-slate-800/60 border border-white/50 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Printer className="w-4 h-4 text-slate-400" />
                    <span>{t('print')}</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-normal">
                    {!isPremium ? 'Premium' : ''}
                  </span>
                </button>

                <button
                  onClick={() => {
                    onReset();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold bg-white/60 dark:bg-slate-800/60 border border-white/50 dark:border-white/10 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                >
                  <RotateCcw className="w-4 h-4 text-slate-400" />
                  <span>{t('reset')}</span>
                </button>

                {isOwner && (
                  <button
                    onClick={() => {
                      onTogglePremium();
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold border transition-colors ${
                      isPremium
                        ? 'bg-[var(--accent)]/15 text-[var(--primary)] dark:text-[var(--accent)] border-[var(--accent)]/20'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-transparent'
                    }`}
                  >
                    <Crown className="w-4 h-4 text-amber-500" />
                    <span>{isPremium ? "Premium Activé" : "Activer Premium"}</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
