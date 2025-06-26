import React, { useState, useEffect } from 'react';
import { Shield, Wallet, Bell, BrainCircuit, Moon, Sun, ArrowRightLeft, Users, ChevronDown, Save, Key, Smartphone, Mail, Globe, CreditCard, Zap } from 'lucide-react';
import { useSettingsStore } from '../store/settingsStore';
import { useTheme } from '../contexts/ThemeContext';

const Settings: React.FC = () => {
  const { settings, updateSettings } = useSettingsStore();
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('account');
  const [hasChanges, setHasChanges] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);
  
  const tabs = [
    { id: 'account', label: 'Account', icon: <Users size={18} /> },
    { id: 'security', label: 'Security', icon: <Shield size={18} /> },
    { id: 'wallet', label: 'Wallet', icon: <Wallet size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
    { id: 'ai', label: 'AI Preferences', icon: <BrainCircuit size={18} /> },
  ];

  // Check for connected wallet on component mount
  useEffect(() => {
    const checkWalletConnection = async () => {
      try {
        const { ethereum } = window as any;
        if (ethereum) {
          const accounts = await ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setConnectedWallet(accounts[0]);
          }
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error);
      }
    };

    checkWalletConnection();
  }, []);

  const handleSettingChange = (key: string, value: any) => {
    updateSettings({ [key]: value });
    setHasChanges(true);
  };

  const handleThemeChange = (newTheme: 'dark' | 'light' | 'system') => {
    toggleTheme(newTheme);
    handleSettingChange('theme', newTheme);
  };

  const saveSettings = () => {
    setHasChanges(false);
    // Settings are automatically saved via Zustand persist
    alert('Settings saved successfully!');
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-400">Manage your account and preferences</p>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
      
      <div className="card p-6">
        {activeTab === 'account' && (
          <div>
            <h2 className="text-lg font-bold mb-4">Account Settings</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Display Name</label>
                  <input
                    type="text"
                    value={settings.displayName}
                    onChange={(e) => handleSettingChange('displayName', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Email</label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) => handleSettingChange('email', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-3">Appearance</label>
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="dark"
                      name="theme"
                      checked={settings.theme === 'dark'}
                      onChange={() => handleThemeChange('dark')}
                      className="mr-2"
                    />
                    <label htmlFor="dark" className="flex items-center cursor-pointer">
                      <Moon size={16} className="mr-1.5" />
                      <span>Dark</span>
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="light"
                      name="theme"
                      checked={settings.theme === 'light'}
                      onChange={() => handleThemeChange('light')}
                      className="mr-2"
                    />
                    <label htmlFor="light" className="flex items-center cursor-pointer">
                      <Sun size={16} className="mr-1.5" />
                      <span>Light</span>
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="system"
                      name="theme"
                      checked={settings.theme === 'system'}
                      onChange={() => handleThemeChange('system')}
                      className="mr-2"
                    />
                    <label htmlFor="system" className="flex items-center cursor-pointer">
                      <ArrowRightLeft size={16} className="mr-1.5" />
                      <span>System</span>
                    </label>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Current theme: {theme} {theme === 'system' && '(follows system preference)'}
                </p>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Language</label>
                <div className="relative w-full md:w-1/3">
                  <select 
                    value={settings.language}
                    onChange={(e) => handleSettingChange('language', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Japanese">Japanese</option>
                    <option value="Korean">Korean</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Selected language: {settings.language}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div>
            <h2 className="text-lg font-bold mb-4">Security Settings</h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Key size={20} className="text-indigo-400" />
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={settings.twoFactorEnabled} 
                    onChange={(e) => handleSettingChange('twoFactorEnabled', e.target.checked)}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Mail size={20} className="text-green-400" />
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-400">Receive security alerts via email</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={settings.emailNotifications} 
                    onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Smartphone size={20} className="text-amber-400" />
                  <div>
                    <p className="font-medium">SMS Notifications</p>
                    <p className="text-sm text-gray-400">Receive security alerts via SMS</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={settings.smsNotifications} 
                    onChange={(e) => handleSettingChange('smsNotifications', e.target.checked)}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                <h3 className="font-medium text-amber-400 mb-2">Security Recommendations</h3>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Enable two-factor authentication for enhanced security</li>
                  <li>• Use a strong, unique password for your account</li>
                  <li>• Regularly review your connected wallets and permissions</li>
                  <li>• Never share your private keys or seed phrases</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'wallet' && (
          <div>
            <h2 className="text-lg font-bold mb-4">Wallet Settings</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Default Wallet</label>
                <div className="relative w-full md:w-1/2">
                  <select 
                    value={settings.defaultWallet}
                    onChange={(e) => handleSettingChange('defaultWallet', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                  >
                    <option>MetaMask</option>
                    <option>WalletConnect</option>
                    <option>Coinbase Wallet</option>
                    <option>Trust Wallet</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Zap size={20} className="text-yellow-400" />
                  <div>
                    <p className="font-medium">Auto-Connect Wallet</p>
                    <p className="text-sm text-gray-400">Automatically connect to your default wallet</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={settings.autoConnect} 
                    onChange={(e) => handleSettingChange('autoConnect', e.target.checked)}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="font-medium mb-3">Connected Wallets</h3>
                <div className="space-y-3">
                  {connectedWallet ? (
                    <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
                          <CreditCard size={16} className="text-white" />
                        </div>
                        <div>
                          <p className="font-medium">MetaMask</p>
                          <p className="text-sm text-gray-400">
                            {connectedWallet.slice(0, 6)}...{connectedWallet.slice(-4)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">Connected</span>
                        <button 
                          onClick={() => setConnectedWallet(null)}
                          className="text-xs text-rose-400 hover:text-rose-300"
                        >
                          Disconnect
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-gray-700 rounded-lg text-center">
                      <p className="text-sm text-gray-400 mb-2">No wallet connected</p>
                      <p className="text-xs text-gray-500">Connect a wallet to see it here</p>
                    </div>
                  )}
                </div>
                <button className="mt-3 btn btn-secondary text-sm">
                  <Wallet size={16} className="mr-1.5" />
                  Connect New Wallet
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div>
            <h2 className="text-lg font-bold mb-4">Notification Preferences</h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Bell size={20} className="text-blue-400" />
                  <div>
                    <p className="font-medium">Price Alerts</p>
                    <p className="text-sm text-gray-400">Get notified when prices hit your targets</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={settings.priceAlerts} 
                    onChange={(e) => handleSettingChange('priceAlerts', e.target.checked)}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <ArrowRightLeft size={20} className="text-green-400" />
                  <div>
                    <p className="font-medium">Trade Notifications</p>
                    <p className="text-sm text-gray-400">Notifications for executed trades and orders</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={settings.tradeNotifications} 
                    onChange={(e) => handleSettingChange('tradeNotifications', e.target.checked)}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Users size={20} className="text-purple-400" />
                  <div>
                    <p className="font-medium">Portfolio Updates</p>
                    <p className="text-sm text-gray-400">Daily portfolio performance summaries</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={settings.portfolioUpdates} 
                    onChange={(e) => handleSettingChange('portfolioUpdates', e.target.checked)}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Globe size={20} className="text-amber-400" />
                  <div>
                    <p className="font-medium">Market News</p>
                    <p className="text-sm text-gray-400">Important market news and updates</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={settings.marketNews} 
                    onChange={(e) => handleSettingChange('marketNews', e.target.checked)}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'ai' && (
          <div>
            <h2 className="text-lg font-bold mb-4">AI Preferences</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Alith AI Assistant</label>
                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <BrainCircuit size={20} className="text-indigo-400" />
                    <div>
                      <p className="font-medium">Alith AI Integration</p>
                      <p className="text-sm text-gray-400">Enable Alith's AI assistance for trading insights</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={settings.alithEnabled} 
                      onChange={(e) => handleSettingChange('alithEnabled', e.target.checked)}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Risk Profile</label>
                <div className="relative w-full md:w-1/3">
                  <select 
                    value={settings.riskProfile}
                    onChange={(e) => handleSettingChange('riskProfile', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                  >
                    <option>Conservative</option>
                    <option>Moderate</option>
                    <option>Aggressive</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
                <p className="mt-1 text-xs text-gray-500">This affects AI-generated trading strategies and recommendations</p>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Data Collection & Privacy</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="data-training" 
                      checked={settings.dataTraining} 
                      onChange={(e) => handleSettingChange('dataTraining', e.target.checked)}
                      className="mr-2" 
                    />
                    <label htmlFor="data-training" className="text-sm">Allow Alith to learn from my trading patterns</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="data-sharing" 
                      checked={settings.dataSharing} 
                      onChange={(e) => handleSettingChange('dataSharing', e.target.checked)}
                      className="mr-2" 
                    />
                    <label htmlFor="data-sharing" className="text-sm">Share anonymized data with Hyperion network</label>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">AI Trading Automation</label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <div>
                      <p className="font-medium">Auto-Execute Recommendations</p>
                      <p className="text-sm text-gray-400">Allow AI to automatically execute trade recommendations</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={settings.autoExecute} 
                        onChange={(e) => handleSettingChange('autoExecute', e.target.checked)}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <div>
                      <p className="font-medium">Portfolio Rebalancing</p>
                      <p className="text-sm text-gray-400">Allow AI to automatically rebalance portfolio</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={settings.autoRebalance} 
                        onChange={(e) => handleSettingChange('autoRebalance', e.target.checked)}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {hasChanges && (
          <div className="pt-4 border-t border-gray-700 mt-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-amber-400">You have unsaved changes</p>
              <button 
                onClick={saveSettings}
                className="btn btn-primary"
              >
                <Save size={16} className="mr-1.5" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;