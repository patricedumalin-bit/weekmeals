import React, { useState } from 'react';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile,
  sendPasswordResetEmail 
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { 
  UtensilsCrossed, 
  Mail, 
  Lock, 
  User as UserIcon, 
  Cloud, 
  Sparkles, 
  Eye, 
  EyeOff, 
  AlertCircle,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

interface AuthProps {
  onContinueAsGuest: () => void;
}

export default function Auth({ onContinueAsGuest }: AuthProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);

  // Form fields
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');

  const translateAuthError = (errCode: string): string => {
    switch (errCode) {
      case 'auth/invalid-email':
        return "L'adresse e-mail saisie n'est pas valide.";
      case 'auth/user-disabled':
        return 'Ce compte a été désactivé.';
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'E-mail ou mot de passe incorrect.';
      case 'auth/email-already-in-use':
        return 'Cette adresse e-mail est déjà associée à un compte. Veuillez vous connecter.';
      case 'auth/weak-password':
        return 'Le mot de passe doit comporter au moins 6 caractères.';
      case 'auth/popup-closed-by-user':
        return 'La fenêtre de connexion Google a été fermée.';
      case 'auth/operation-not-allowed':
        return "Cette méthode de connexion n'est pas activée sur le projet Firebase. Vous pouvez vous connecter avec Google ou en mode Invité.";
      case 'auth/network-request-failed':
        return 'Erreur de connexion réseau. Vérifiez votre connexion internet.';
      default:
        return 'Une erreur est survenue lors de la tentative. Veuillez réessayer.';
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setSuccessMessage(null);
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      console.error('Error signing in with Google:', err);
      setError(translateAuthError(err.code || ''));
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setError('Veuillez renseigner tous les champs obligatoires.');
      return;
    }

    if (mode === 'register') {
      if (password.length < 6) {
        setError('Le mot de passe doit contenir au moins 6 caractères.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Les deux mots de passe ne correspondent pas.');
        return;
      }
    }

    setLoading(true);
    try {
      if (mode === 'register') {
        const userCredential = await createUserWithEmailAndPassword(auth, trimmedEmail, password);
        if (displayName.trim() && userCredential.user) {
          await updateProfile(userCredential.user, {
            displayName: displayName.trim(),
          });
        }
      } else {
        await signInWithEmailAndPassword(auth, trimmedEmail, password);
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      setError(translateAuthError(err.code || ''));
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!resetEmail.trim()) {
      setError('Veuillez entrer votre adresse e-mail pour réinitialiser votre mot de passe.');
      return;
    }
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, resetEmail.trim());
      setSuccessMessage('Un e-mail de réinitialisation a été envoyé à votre adresse.');
      setForgotPasswordOpen(false);
      setResetEmail('');
    } catch (err: any) {
      console.error('Reset error:', err);
      setError(translateAuthError(err.code || ''));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8F9FA] px-4 py-8 relative overflow-x-hidden">
      {/* Background Glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-emerald-600/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs relative z-10 flex flex-col items-center">
        {/* Logo */}
        <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 mb-3">
          <UtensilsCrossed className="w-6 h-6" />
        </div>

        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">WeekMeals</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 mb-6 text-center">
          Planifiez vos repas, synchronisez vos recettes et vos listes de courses sur tous vos appareils.
        </p>

        {/* Cloud feature highlight badge */}
        <div className="w-full mb-6 p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center gap-2.5 text-emerald-800 text-xs">
          <Cloud className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="text-left font-medium leading-snug">
            Vos collections personnalisées et plannings sont sauvegardés sur le cloud en temps réel.
          </span>
        </div>

        {/* Tab switch: Connexion vs Inscription */}
        <div className="w-full grid grid-cols-2 p-1 bg-slate-100 rounded-xl mb-5 text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setError(null);
            }}
            className={`py-2 rounded-lg transition-all ${
              mode === 'login'
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Se connecter
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setError(null);
            }}
            className={`py-2 rounded-lg transition-all ${
              mode === 'register'
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Créer un compte
          </button>
        </div>

        {/* Notifications: Error or Success */}
        {error && (
          <div className="w-full mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2 text-left">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <span className="flex-1">{error}</span>
          </div>
        )}

        {successMessage && (
          <div className="w-full mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-start gap-2 text-left">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span className="flex-1">{successMessage}</span>
          </div>
        )}

        {/* Google One-Click Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full px-5 py-2.5 bg-white text-slate-700 border border-slate-300 rounded-xl font-semibold hover:bg-slate-50 active:scale-[0.99] transition-all disabled:opacity-50 flex items-center justify-center gap-2.5 shadow-2xs cursor-pointer text-xs sm:text-sm"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continuer avec Google</span>
        </button>

        <div className="flex items-center my-4 w-full text-xs text-slate-400">
          <div className="flex-1 h-px bg-slate-200"></div>
          <span className="px-3 uppercase font-medium text-[10px]">ou par e-mail</span>
          <div className="flex-1 h-px bg-slate-200"></div>
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleEmailAuth} className="w-full flex flex-col gap-3 text-left">
          {mode === 'register' && (
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Prénom ou Nom d'utilisateur
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Ex: Patrice"
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Adresse e-mail
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre.email@exemple.com"
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-[11px] font-semibold text-slate-600">
                Mot de passe
              </label>
              {mode === 'login' && (
                <button
                  type="button"
                  onClick={() => {
                    setForgotPasswordOpen(true);
                    setResetEmail(email);
                    setError(null);
                  }}
                  className="text-[11px] text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  Mot de passe oublié ?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-10 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {mode === 'register' && (
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 active:scale-[0.99] transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-xs cursor-pointer text-xs sm:text-sm"
          >
            {loading ? (
              <span>Veuillez patienter...</span>
            ) : mode === 'login' ? (
              <>
                <span>Se connecter</span>
                <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Créer mon compte</span>
              </>
            )}
          </button>
        </form>

        {/* Forgot password dialog */}
        {forgotPasswordOpen && (
          <div className="w-full mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-left animate-in fade-in duration-150">
            <h3 className="text-xs font-bold text-slate-900 mb-1">Réinitialiser votre mot de passe</h3>
            <p className="text-[11px] text-slate-500 mb-3">
              Entrez votre adresse e-mail pour recevoir les instructions de réinitialisation.
            </p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                placeholder="votre.email@exemple.com"
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-600"
              />
              <div className="flex items-center gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setForgotPasswordOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={handleResetPassword}
                  disabled={loading}
                  className="px-3 py-1.5 text-xs bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 disabled:opacity-50"
                >
                  Envoyer l'e-mail
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center my-4 w-full text-xs text-slate-400">
          <div className="flex-1 h-px bg-slate-200"></div>
          <span className="px-3 uppercase font-medium text-[10px]">ou</span>
          <div className="flex-1 h-px bg-slate-200"></div>
        </div>

        {/* Offline Guest Mode */}
        <button
          type="button"
          onClick={onContinueAsGuest}
          className="w-full px-5 py-2.5 bg-slate-100 text-slate-700 border border-slate-200 rounded-xl font-semibold hover:bg-slate-200 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer text-xs"
        >
          <span>Continuer en mode Invité (Hors ligne)</span>
        </button>

        <p className="text-[10px] text-slate-400 mt-5 leading-normal max-w-xs text-center">
          Le mode Invité conserve vos données localement sur cet appareil. Créez un compte pour synchroniser vos données entre votre smartphone Android, tablette et ordinateur.
        </p>
      </div>
    </div>
  );
}
