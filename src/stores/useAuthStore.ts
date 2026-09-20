import { create } from 'zustand';
import { SyncStatus } from '../types';

interface AuthState {
  user: any;
  userData: any;
  syncStatus: SyncStatus;
  lastSyncedAt: string | null;
  isOnline: boolean;

  setUser: (user: any) => void;
  setUserData: (data: any) => void;
  setSyncStatus: (status: SyncStatus) => void;
  setLastSyncedAt: (timestamp: string | null) => void;
  setIsOnline: (isOnline: boolean) => void;
  incrementAIUsage: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  userData: null,
  syncStatus: 'idle',
  lastSyncedAt: null,
  isOnline: navigator.onLine,

  setUser: (user) => set({ user }),
  setUserData: (userData) => set({ userData }),
  setSyncStatus: (syncStatus) => set({ syncStatus }),
  setLastSyncedAt: (lastSyncedAt) => set({ lastSyncedAt }),
  setIsOnline: (isOnline) => set({ isOnline }),
  incrementAIUsage: () => set((state) => {
    const currentUsage = state.userData?.aiUsage || 0;
    const newUserData = { ...state.userData, aiUsage: currentUsage + 1 };

    // For local guest, also save to localStorage as a fallback
    if (!state.user || state.user.uid === 'local-guest') {
      localStorage.setItem('meal_guest_ai_usage', String(currentUsage + 1));
    }

    return { userData: newUserData };
  }),
}));
