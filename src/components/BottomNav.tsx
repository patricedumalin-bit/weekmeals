import React from 'react';
import { CalendarDays, UtensilsCrossed, ShoppingCart, Database } from 'lucide-react';
import { ActiveTab } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface BottomNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  plannedRecipesCount: number;
  shoppingItemsCount: number;
  checkedShoppingCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
  plannedRecipesCount,
  shoppingItemsCount,
  checkedShoppingCount
}) => {
  const { t } = useLanguage();

  const tabs = [
    {
      id: 'planner' as ActiveTab,
      label: t('tabPlanner'),
      icon: CalendarDays,
      badge: plannedRecipesCount > 0 ? plannedRecipesCount : null,
      badgeColor: 'bg-[var(--accent)] text-white'
    },
    {
      id: 'shopping' as ActiveTab,
      label: t('tabShoppingList'),
      icon: ShoppingCart,
      badge: shoppingItemsCount > 0 ? `${checkedShoppingCount}/${shoppingItemsCount}` : null,
      badgeColor: 'bg-[var(--accent)] text-white'
    },
    {
      id: 'database' as ActiveTab,
      label: t('tabDatabase'),
      icon: Database,
      badge: null
    }
  ];

  return (
    <nav className="no-print md:hidden fixed bottom-0 left-0 right-0 z-40 backdrop-blur-2xl bg-white/80 dark:bg-slate-900/80 border-t border-white/40 dark:border-white/10 pb-safe shadow-lg">
      <div className="flex items-center justify-around px-2 py-1.5 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all relative ${
                isActive
                  ? 'text-[var(--primary)] dark:text-[var(--accent)] font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <div
                  className={`p-1 rounded-full transition-transform ${
                    isActive ? 'backdrop-blur-md bg-[var(--accent)]/15 dark:bg-[var(--accent)]/25 text-[var(--primary)] dark:text-[var(--accent)] scale-110 border border-[var(--accent)]/20' : ''
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                {tab.badge !== null && (
                  <span
                    className={`absolute -top-1.5 -right-2.5 px-1.5 py-0.2 rounded-full text-[9px] font-extrabold shadow-xs ${tab.badgeColor}`}
                  >
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] mt-0.5 tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
