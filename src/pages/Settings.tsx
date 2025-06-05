import React, { useState } from 'react';
import { Shield, Wallet, Bell, BrainCircuit, Moon, Sun, ArrowRightLeft, Users, ChevronDown } from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('account');
  
  const tabs = [
    { id: 'account', label: 'Account', icon: <Users size={18} /> },
    { id: 'security', label: 'Security', icon: <Shield size={18} /> },
    { id: 'wallet', label: 'Wallet', icon: <Wallet size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
    { id: 'ai', label: 'AI Preferences', icon: <BrainCircuit size={18} /> },
  ];

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
                    value="CryptoTrader"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Email</label>
                  <input
                    type="email"
                    value="trader@example.com"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Appearance</label>
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="dark"
                      name="theme"
                      className="mr-2"
                      checked
                    />
                    <label htmlFor="dark" className="flex items-center">
                      <Moon size={16} className="mr-1.5" />
                      <span>Dark</span>
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="light"
                      name="theme"
                      className="mr-2"
                    />
                    <label htmlFor="light" className="flex items-center">
                      <Sun size={16} className="mr-1.5" />
                      <span>Light</span>
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="system"
                      name="theme"
                      className="mr-2"
                    />
                    <label htmlFor="system" className="flex items-center">
                      <ArrowRightLeft size={16} className="mr-1.5" />
                      <span>System</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Language</label>
                <div className="relative w-full md:w-1/3">
                  <select className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 appearance-none">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>Chinese</option>
                    <option>Japanese</option>
                    <option>Korean</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-700">
                <button className="btn btn-primary">
                  <span>Save Changes</span>
                </button>
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
                    <input type="checkbox" checked={true} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Risk Profile</label>
                <div className="relative w-full md:w-1/3">
                  <select className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 appearance-none">
                    <option>Conservative</option>
                    <option>Moderate</option>
                    <option selected>Aggressive</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
                <p className="mt-1 text-xs text-gray-500">This affects AI-generated trading strategies and recommendations</p>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Data Collection & Privacy</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="data-training" checked={true} className="mr-2" />
                    <label htmlFor="data-training" className="text-sm">Allow Alith to learn from my trading patterns</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="data-sharing" checked={false} className="mr-2" />
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
                      <input type="checkbox" checked={false} className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <div>
                      <p className="font-medium">Portfolio Rebalancing</p>
                      <p className="text-sm text-gray-400">Allow AI to automatically rebalance portfolio</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={true} className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-700">
                <button className="btn btn-primary">
                  <span>Save AI Preferences</span>
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Other settings tabs would be implemented similarly */}
        {(activeTab === 'security' || activeTab === 'wallet' || activeTab === 'notifications') && (
          <div className="flex items-center justify-center p-12">
            <p className="text-gray-400">Settings for {activeTab} would be displayed here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;