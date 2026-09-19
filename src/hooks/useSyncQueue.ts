import { useEffect, useCallback, useRef } from 'react';
import { get, set } from 'idb-keyval';
import { useAuthStore } from '../stores/useAuthStore';
import { useCloudSync } from './useCloudSync';

const QUEUE_KEY = 'meal_app_sync_queue';

export type SyncTask = {
  id: string;
  type: 'SYNC_ALL';
  timestamp: number;
};

export function useSyncQueue() {
  const { isOnline, setIsOnline, user } = useAuthStore();
  const { handleManualSync } = useCloudSync();
  const isProcessingRef = useRef(false);

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [setIsOnline]);

  const addToQueue = useCallback(async () => {
    const task: SyncTask = {
      id: `sync-${Date.now()}`,
      type: 'SYNC_ALL',
      timestamp: Date.now()
    };

    const currentQueue = await get<SyncTask[]>(QUEUE_KEY) || [];
    // If there's already a SYNC_ALL task, no need to add another one
    if (currentQueue.some(t => t.type === 'SYNC_ALL')) return;

    await set(QUEUE_KEY, [...currentQueue, task]);
  }, []);

  const processQueue = useCallback(async () => {
    if (!isOnline || !user || isProcessingRef.current) return;

    const queue = await get<SyncTask[]>(QUEUE_KEY) || [];
    if (queue.length === 0) return;

    isProcessingRef.current = true;
    console.log(`Processing sync queue (${queue.length} tasks)...`);

    try {
      // For now, we just trigger a full manual sync which consolidates everything
      await handleManualSync();
      await set(QUEUE_KEY, []);
      console.log('Sync queue processed successfully.');
    } catch (error) {
      console.error('Failed to process sync queue:', error);
    } finally {
      isProcessingRef.current = false;
    }
  }, [isOnline, user, handleManualSync]);

  // Automatically process queue when coming back online
  useEffect(() => {
    if (isOnline) {
      processQueue();
    }
  }, [isOnline, processQueue]);

  return { addToQueue, processQueue };
}
