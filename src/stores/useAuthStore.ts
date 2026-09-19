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
}));
