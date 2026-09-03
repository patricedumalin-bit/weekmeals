import { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { UtensilsCrossed } from 'lucide-react';

interface AuthProps {
  onContinueAsGuest: () => void;
}

export default function Auth({ onContinueAsGuest }: AuthProps) {
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error signing in:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8F9FA] px-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-emerald-600/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200/80 p-8 shadow-xs relative z-10 flex flex-col items-center text-center">
        {/* Logo */}
        <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 mb-4">
          <UtensilsCrossed className="w-6 h-6" />
        </div>

        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">WeekMeals</h1>
        <p className="text-sm text-slate-500 mt-2 mb-8">
          Planifiez vos repas de la semaine et générez vos listes de courses en toute simplicité.
        </p>

        <div className="w-full flex flex-col gap-3">
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            {loading ? 'Connexion en cours...' : 'Se connecter avec Google'}
          </button>

          <div className="flex items-center my-2 w-full text-xs text-slate-400">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span className="px-3 uppercase font-medium">Ou</span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>

          <button
            onClick={onContinueAsGuest}
            className="w-full px-6 py-3 bg-white text-slate-700 border border-slate-200 rounded-xl font-semibold hover:bg-slate-50 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            Continuer en mode Invité (Hors ligne)
          </button>
        </div>

        <p className="text-[11px] text-slate-400 mt-8 leading-normal max-w-xs">
          Le mode Invité enregistre toutes vos données localement sur votre téléphone. Aucune synchronisation cloud requise.
        </p>
      </div>
    </div>
  );
}
