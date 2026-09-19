import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.weekmeals.app',
  appName: 'Meal Grocery Planner',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
