import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserSettings {
  // Account Settings
  displayName: string;
  email: string;
  language: string;
  theme: 'dark' | 'light' | 'system';
  
  // Security Settings
  twoFactorEnabled: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  
  // Wallet Settings
  defaultWallet: string;
  autoConnect: boolean;
  
  // Notification Settings
  priceAlerts: boolean;
  tradeNotifications: boolean;
  portfolioUpdates: boolean;
  marketNews: boolean;
  
  // AI Preferences
  alithEnabled: boolean;
  riskProfile: 'Conservative' | 'Moderate' | 'Aggressive';
  dataTraining: boolean;
  dataSharing: boolean;
  autoExecute: boolean;
  autoRebalance: boolean;
}

interface SettingsStore {
  settings: UserSettings;
  updateSettings: (updates: Partial<UserSettings>) => void;
  resetSettings: () => void;
}

const defaultSettings: UserSettings = {
  displayName: 'CryptoTrader',
  email: 'trader@hypertrade.ai',
  language: 'English',
  theme: 'dark',
  twoFactorEnabled: false,
  emailNotifications: true,
  smsNotifications: false,
  defaultWallet: 'MetaMask',
  autoConnect: true,
  priceAlerts: true,
  tradeNotifications: true,
  portfolioUpdates: true,
  marketNews: false,
  alithEnabled: true,
  riskProfile: 'Aggressive',
  dataTraining: true,
  dataSharing: false,
  autoExecute: false,
  autoRebalance: true,
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set, get) => ({
      settings: defaultSettings,
      
      updateSettings: (updates) => {
        set((state) => ({
          settings: { ...state.settings, ...updates }
        }));
        
        // Apply language changes immediately
        if (updates.language) {
          document.documentElement.lang = updates.language.toLowerCase();
        }
      },
      
      resetSettings: () => {
        set({ settings: defaultSettings });
      }
    }),
    {
      name: 'settings-storage',
      version: 1,
    }
  )
);