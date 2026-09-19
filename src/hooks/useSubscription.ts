import { useAuthStore } from '../stores/useAuthStore';
import { useDataStore } from '../stores/useDataStore';
import { FREE_LIMITS } from '../constants/subscription';

export function useSubscription() {
  const { userData } = useAuthStore();
  const { recipes, weeklyPlan } = useDataStore();

  const isPremium = userData?.subscriptionStatus === 'premium';

  const checkLimit = (currentCount: number, limit: number) => {
    if (isPremium) return { reached: false, remaining: Infinity };
    return {
      reached: currentCount >= limit,
      remaining: Math.max(0, limit - currentCount)
    };
  };

  return {
    isPremium,
    status: isPremium ? 'Full' : 'Gratuit',

    // Limits
    mealsLimit: checkLimit(weeklyPlan?.meals.length || 0, FREE_LIMITS.MAX_MEALS),
    recipesLimit: checkLimit(recipes.filter(r => r.isCustom).length, FREE_LIMITS.MAX_CUSTOM_RECIPES),

    // Feature Permissions
    canUseVoiceFull: isPremium,
    canUseAIUnlimited: isPremium,
    canSyncFamily: isPremium,

    // UI Helpers
    lockIcon: isPremium ? null : '🔒',
    upgradeBanner: !isPremium ? "Passez en Full pour débloquer l'illimité et la voix !" : null
  };
}
