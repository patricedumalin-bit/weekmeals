import { useEffect, useCallback } from 'react';
import { Purchases, CUSTOMER_INFO_UPDATE_LISTENER, CustomerInfo } from '@revenuecat/purchases-capacitor';
import { useAuthStore } from '../stores/useAuthStore';
import { Device } from '@capacitor/device';

// Configuration placeholders - You will need to replace these after creating your RevenueCat project
const REVENUECAT_ANDROID_API_KEY = 'goog_placeholder_api_key';
const PREMIUM_ENTITLEMENT_ID = 'full_access'; // The ID of your entitlement in RevenueCat

export function useBilling() {
  const { user, userData, setUserData } = useAuthStore();

  const updateSubscriptionStatus = useCallback((customerInfo: CustomerInfo) => {
    // Check if the specific entitlement is active
    const isActive = customerInfo.entitlements.active[PREMIUM_ENTITLEMENT_ID] !== undefined;

    if (userData && userData.subscriptionStatus !== (isActive ? 'premium' : 'free')) {
      console.log(`[Billing] Updating status to: ${isActive ? 'premium' : 'free'}`);
      setUserData({
        ...userData,
        subscriptionStatus: isActive ? 'premium' : 'free'
      });
    }
  }, [userData, setUserData]);

  useEffect(() => {
    const initPurchases = async () => {
      try {
        const info = await Device.getInfo();
        if (info.platform !== 'android') return;

        // Initialize RevenueCat
        await Purchases.configure({
          apiKey: REVENUECAT_ANDROID_API_KEY,
          appUserId: user?.uid || undefined // Link to Firebase UID if logged in
        });

        // Get current subscriber info
        const customerInfo = await Purchases.getCustomerInfo();
        updateSubscriptionStatus(customerInfo);

        // Listen for real-time updates (renewals, cancellations, etc.)
        Purchases.addCustomerInfoUpdateListener((info) => {
          updateSubscriptionStatus(info);
        });
      } catch (e) {
        console.error('[Billing] Initialization error:', e);
      }
    };

    initPurchases();
  }, [user?.uid, updateSubscriptionStatus]);

  const purchaseFullVersion = async () => {
    try {
      // Fetch available offerings (what you've configured in RevenueCat dashboard)
      const offerings = await Purchases.getOfferings();
      if (offerings.current !== null && offerings.current.availablePackages.length !== 0) {
        // Purchase the first available package (usually your main subscription or lifetime)
        const { customerInfo } = await Purchases.purchasePackage({
          aPackage: offerings.current.availablePackages[0]
        });
        updateSubscriptionStatus(customerInfo);
        return true;
      }
      return false;
    } catch (e: any) {
      if (!e.userCancelled) {
        console.error('[Billing] Purchase failed:', e);
        alert(`Erreur d'achat: ${e.message}`);
      }
      return false;
    }
  };

  const restorePurchases = async () => {
    try {
      const customerInfo = await Purchases.restorePurchases();
      updateSubscriptionStatus(customerInfo);
      alert('Achats restaurés avec succès !');
    } catch (e) {
      console.error('[Billing] Restore failed:', e);
    }
  };

  return { purchaseFullVersion, restorePurchases };
}
