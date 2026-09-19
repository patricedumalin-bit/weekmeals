import React, { useState } from 'react';
import { 
  X, 
  User as UserIcon, 
  Cloud, 
  CloudCheck, 
  CloudOff, 
  RefreshCw, 
  Crown, 
  Check, 
  Edit3, 
  LogOut, 
  UtensilsCrossed, 
  CalendarDays, 
  ShoppingCart, 
  ShieldCheck, 
  AlertCircle,
  Smartphone,
  Key,
  TrendingUp,
  Euro,
  Scale
} from 'lucide-react';
import { SyncStatus, themes, Theme } from '../types';
import { formatSyncTime } from '../utils/cloudSync';
import { useLanguage } from '../i18n/LanguageContext';
import { useDataStore } from '../stores/useDataStore';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  userData: any;
  syncStatus: SyncStatus;
  lastSyncedAt?: string | null;
  onManualSync: () => Promise<void>;
  customRecipesCount: number;
  plannedMealsCount: number;
  shoppingItemsCount: number;
  currentTheme: string;
  onUpdateTheme: (theme: string) => void;
  isPremium: boolean;
  onTogglePremium: () => void;
  onSignOut: () => void;
  onUpdateDisplayName: (newName: string) => Promise<void>;
  onSwitchToAuth?: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  userData,
  syncStatus,
  lastSyncedAt,
  onManualSync,
  customRecipesCount,
  plannedMealsCount,
  shoppingItemsCount,
  currentTheme,
  onUpdateTheme,
  isPremium,
  onTogglePremium,
  onSignOut,
  onUpdateDisplayName,
  onSwitchToAuth
}) => {
  const { t, language } = useLanguage();
  const { totalSavingsEur } = useDataStore();
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(user?.displayName || '');
  const [isSavingName, setIsSavingName] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  const isGuest = user?.uid === 'local-guest' || user?.isAnonymous;
  const isOwner = user?.email === 'patrice.dumalin@gmail.com';

  const getInitials = (name?: string, email?: string) => {
    if (name && name.trim().length > 0) {
      const parts = name.trim().split(' ');
      if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
      }
      return name.slice(0, 2).toUpperCase();
    }
    if (email && email.length > 0) {
      return email.slice(0, 2).toUpperCase();
    }
    return 'U';
  };

  const handleSaveName = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim() || isSavingName) return;
    setIsSavingName(true);
    try {
      await onUpdateDisplayName(nameInput.trim());
      setIsEditingName(false);
    } catch (err) {
      console.error('Failed to update name', err);
    } finally {
      setIsSavingName(false);
    }
  };

  const handleTriggerSync = async () => {
    setSyncFeedback(null);
    try {
      await onManualSync();
      setSyncFeedback(language === 'fr' ? 'Synchronisation réussie !' : 'Synced successfully!');
      setTimeout(() => setSyncFeedback(null), 3000);
    } catch (e) {
      setSyncFeedback(language === 'fr' ? 'Échec de la synchronisation' : 'Sync failed');
    }
  };

  const initials = getInitials(user?.displayName, user?.email);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/30">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-xs">
              <UserIcon className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                {language === 'fr' ? 'Mon Profil & Synchronisation' : 'My Profile & Cloud Sync'}
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {isGuest 
                  ? (language === 'fr' ? 'Mode Invité (Stockage local)' : 'Guest Mode (Local storage)')
                  : (language === 'fr' ? 'Compte connecté au Cloud' : 'Cloud connected account')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 overflow-y-auto space-y-5 text-left">
          {/* User identity card */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 via-slate-50 to-blue-500/5 dark:from-emerald-950/20 dark:via-slate-800/40 dark:to-blue-950/20 border border-emerald-500/20 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Avatar */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-bold text-lg flex items-center justify-center shadow-md shadow-emerald-600/20 shrink-0">
              {user?.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt="Avatar" 
                  className="w-full h-full object-cover rounded-2xl" 
                  referrerPolicy="no-referrer"
                />
              ) : (
                initials
              )}
            </div>

            {/* User info & editable name */}
            <div className="flex-1 min-w-0">
              {isEditingName ? (
                <form onSubmit={handleSaveName} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="px-2.5 py-1 text-xs sm:text-sm bg-white dark:bg-slate-800 border border-emerald-500 rounded-lg focus:outline-none"
                    placeholder="Votre nom"
                    autoFocus
                  />
                  <button
                    type="submit"
                    disabled={isSavingName}
                    className="px-2.5 py-1 text-xs bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 disabled:opacity-50"
                  >
                    OK
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditingName(false)}
                    className="px-2 py-1 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                  >
                    Annuler
                  </button>
                </form>
              ) : (
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 truncate">
                    {user?.displayName || (isGuest ? 'Invité' : 'Utilisateur')}
                  </h3>
                  {!isGuest && (
                    <button
                      onClick={() => {
                        setNameInput(user?.displayName || '');
                        setIsEditingName(true);
                      }}
                      className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/50"
                      title="Modifier le nom"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              )}

              <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                {user?.email || 'Aucun e-mail (Mode hors ligne)'}
              </p>

              <div className="flex flex-wrap items-center gap-1.5 mt-2">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                  isPremium 
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-300 dark:border-amber-700' 
                    : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                }`}>
                  <Crown className="w-3 h-3 text-amber-500" />
                  {isPremium ? 'Formule Premium' : 'Formule Gratuite (20 recettes)'}
                </span>

                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
                  <Smartphone className="w-3 h-3" />
                  Android & Web Sync
                </span>
              </div>
            </div>
          </div>

          {/* Cloud Synchronization Section */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cloud className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                  {language === 'fr' ? 'Synchronisation Cloud' : 'Cloud Synchronization'}
                </h4>
              </div>

              {/* Status pill */}
              <div className="flex items-center gap-1.5">
                {isGuest ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300">
                    <CloudOff className="w-3 h-3 text-amber-600" />
                    {language === 'fr' ? 'Non synchronisé (Invité)' : 'Not synced (Guest)'}
                  </span>
                ) : syncStatus === 'syncing' ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300 animate-pulse">
                    <RefreshCw className="w-3 h-3 animate-spin text-blue-600" />
                    {language === 'fr' ? 'En cours...' : 'Syncing...'}
                  </span>
                ) : syncStatus === 'error' ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-red-100 text-red-800 dark:bg-red-950/50 dark:text-red-300">
                    <AlertCircle className="w-3 h-3 text-red-600" />
                    {language === 'fr' ? 'Erreur de connexion' : 'Connection error'}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping"></span>
                    <CloudCheck className="w-3.5 h-3.5 text-emerald-600" />
                    {language === 'fr' ? 'Synchronisé' : 'Synchronized'}
                  </span>
                )}
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {isGuest ? (
                language === 'fr' 
                  ? 'Vous êtes actuellement en mode invité. Vos modifications restent uniquement sur ce téléphone. Créez ou connectez un compte pour activer la synchronisation multi-appareils.'
                  : 'You are currently in guest mode. Changes remain on this device only. Sign in to enable cross-device cloud sync.'
              ) : (
                language === 'fr'
                  ? 'Vos recettes personnalisées, votre planning de repas et votre liste de courses sont sauvegardés en temps réel et accessibles sur tous vos appareils connectés.'
                  : 'Your personalized recipes, weekly meal plans, and grocery lists are synced in real-time across all your devices.'
              )}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-slate-200/70 dark:border-slate-700/60">
              <span className="text-[11px] text-slate-400">
                {language === 'fr' ? 'Dernière synchronisation : ' : 'Last synchronized: '}
                <strong className="text-slate-600 dark:text-slate-300 font-semibold">
                  {formatSyncTime(lastSyncedAt || userData?.lastSyncedAt, language)}
                </strong>
              </span>

              {!isGuest ? (
                <button
                  onClick={handleTriggerSync}
                  disabled={syncStatus === 'syncing'}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 active:scale-98 transition-all disabled:opacity-50 cursor-pointer shadow-2xs"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${syncStatus === 'syncing' ? 'animate-spin' : ''}`} />
                  <span>{language === 'fr' ? 'Synchroniser maintenant' : 'Sync now'}</span>
                </button>
              ) : (
                onSwitchToAuth && (
                  <button
                    onClick={() => {
                      onClose();
                      onSwitchToAuth();
                    }}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 active:scale-98 transition-all shadow-2xs"
                  >
                    <span>{language === 'fr' ? 'Se connecter / Créer un compte' : 'Sign In / Register'}</span>
                  </button>
                )
              )}
            </div>

            {syncFeedback && (
              <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800 text-[11px] font-medium flex items-center gap-1.5 animate-in fade-in">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>{syncFeedback}</span>
              </div>
            )}
          </div>

          {/* User Collections & Stats */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-2.5">
              {language === 'fr' ? 'Mes Collections Sauvegardées' : 'My Synced Collections'}
            </h4>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center">
                <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-1.5">
                  <UtensilsCrossed className="w-4 h-4" />
                </div>
                <span className="text-lg font-bold text-slate-900 dark:text-slate-100 leading-none">
                  {customRecipesCount}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                  {language === 'fr' ? 'Recettes créées' : 'Custom recipes'}
                </span>
                {!isPremium && (
                  <span className="text-[9px] text-slate-400 font-medium">/ 20 max</span>
                )}
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-1.5">
                  <CalendarDays className="w-4 h-4" />
                </div>
                <span className="text-lg font-bold text-slate-900 dark:text-slate-100 leading-none">
                  {plannedMealsCount}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                  {language === 'fr' ? 'Repas planifiés' : 'Planned meals'}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center">
                <div className="w-8 h-8 rounded-lg bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-1.5">
                  <ShoppingCart className="w-4 h-4" />
                </div>
                <span className="text-lg font-bold text-slate-900 dark:text-slate-100 leading-none">
                  {shoppingItemsCount}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                  {language === 'fr' ? 'Articles courses' : 'Shopping items'}
                </span>
              </div>
            </div>
          </div>

          {/* Savings & Impact Dashboard (New Engagement Feature) */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 space-y-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                {language === 'fr' ? 'Impact & Économies' : 'Impact & Savings'}
              </h4>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-white/60 dark:bg-slate-800/60 border border-amber-200 dark:border-amber-900/50 flex flex-col items-center text-center">
                <Euro className="w-5 h-5 text-amber-600 mb-1" />
                <span className="text-xl font-black text-slate-900 dark:text-slate-100">{totalSavingsEur.toFixed(2)} €</span>
                <span className="text-[10px] text-slate-500 font-bold uppercase">{language === 'fr' ? 'Économisés' : 'Saved'}</span>
              </div>
              <div className="p-3 rounded-lg bg-white/60 dark:bg-slate-800/60 border border-emerald-200 dark:border-emerald-900/50 flex flex-col items-center text-center">
                <Scale className="w-5 h-5 text-emerald-600 mb-1" />
                <span className="text-xl font-black text-slate-900 dark:text-slate-100">{(totalSavingsEur * 0.4).toFixed(1)} kg</span>
                <span className="text-[10px] text-slate-500 font-bold uppercase">{language === 'fr' ? 'CO2 Évité' : 'CO2 Avoided'}</span>
              </div>
            </div>
            <p className="text-[10px] text-slate-500 italic text-center">
              {language === 'fr'
                ? "Basé sur les ingrédients de votre stock que vous avez cuisinés au lieu d'acheter."
                : "Based on pantry ingredients you cooked instead of buying fresh."}
            </p>
          </div>

          {/* AI API Keys Configuration */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-2 flex items-center justify-between gap-1.5">
              <div className="flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-orange-500" />
                <span>{language === 'fr' ? "Intelligence Artificielle (Import)" : "AI Settings (Import)"}</span>
              </div>
            </h4>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Groq Cloud (Llama 3)</label>
                <input
                  type="password"
                  placeholder="gsk_..."
                  defaultValue={localStorage.getItem('groq_api_key') || ''}
                  onChange={(e) => {
                    const val = e.target.value.trim();
                    if (val) localStorage.setItem('groq_api_key', val);
                    else localStorage.removeItem('groq_api_key');
                  }}
                  className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Google Gemini (Flash 1.5)</label>
                <input
                  type="password"
                  placeholder="AIza..."
                  defaultValue={localStorage.getItem('gemini_api_key') || ''}
                  onChange={(e) => {
                    const val = e.target.value.trim();
                    if (val) localStorage.setItem('gemini_api_key', val);
                    else localStorage.removeItem('gemini_api_key');
                  }}
                  className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                />
              </div>
              <p className="text-[10px] text-slate-500 leading-tight italic">
                Obtenez vos clés gratuites sur <a href="https://console.groq.com/keys" target="_blank" className="underline">Groq</a> ou <a href="https://aistudio.google.com/app/apikey" target="_blank" className="underline">Google AI Studio</a>.
              </p>
            </div>
          </div>

          {/* Theme & Skin preferences */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-2">
              {language === 'fr' ? 'Thème / Skin actif' : 'Active Theme / Skin'}
            </h4>
            <div className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800">
              {(Object.keys(themes) as Theme[]).map((themeKey) => (
                <button
                  key={themeKey}
                  onClick={() => onUpdateTheme(themeKey)}
                  className={`flex-1 py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 text-xs font-semibold transition-all border ${
                    currentTheme === themeKey
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 shadow-2xs'
                      : 'text-slate-600 dark:text-slate-400 border-transparent hover:bg-slate-200/50'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                    style={{ backgroundColor: themes[themeKey].accent }}
                  />
                  <span className="capitalize text-[11px]">
                    {themeKey === 'default' ? 'Océan' :
                     themeKey === 'minimalist' ? 'Zen' :
                     themeKey === 'girly' ? 'Sakura' :
                     themeKey}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Owner options (Premium toggle) */}
          {isOwner && (
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-bold text-amber-900 dark:text-amber-200">
                  {language === 'fr' ? 'Gestion Premium Propriétaire' : 'Owner Premium Control'}
                </span>
              </div>
              <button
                onClick={onTogglePremium}
                className="px-2.5 py-1 text-xs font-semibold bg-amber-600 text-white rounded-lg hover:bg-amber-700"
              >
                {isPremium ? 'Désactiver Premium' : 'Activer Premium'}
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40 flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onSignOut();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>{language === 'fr' ? 'Se déconnecter' : 'Sign Out'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:opacity-90 transition-opacity"
          >
            {language === 'fr' ? 'Fermer' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
