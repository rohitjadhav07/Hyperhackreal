import React from 'react';
import MarketOverview from '../components/dashboard/MarketOverview';
import AIInsights from '../components/dashboard/AIInsights';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import { LineChart, BarChart3, PieChart, Gauge, BrainCircuit } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-400">Market overview and AI-powered insights</p>
      </div>
      
      <MarketOverview />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="card p-4 h-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Hyperion Network Performance</h3>
              <div className="flex space-x-1">
                <button className="p-1.5 bg-gray-700 rounded hover:bg-gray-600">
                  <LineChart size={16} />
                </button>
                <button className="p-1.5 bg-gray-800 rounded hover:bg-gray-700">
                  <BarChart3 size={16} />
                </button>
                <button className="p-1.5 bg-gray-800 rounded hover:bg-gray-700">
                  <PieChart size={16} />
                </button>
              </div>
            </div>
            
            <div className="h-64 w-full rounded-lg overflow-hidden bg-gray-800 flex items-center justify-center">
              <div className="text-center">
                <LineChart size={48} className="mx-auto mb-2 text-indigo-400 opacity-70" />
                <p className="text-gray-400">Network activity visualization</p>
                <p className="text-xs text-gray-500">Real-time parallel execution metrics</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="stat-card bg-gray-800">
                <span className="stat-label">TPS</span>
                <span className="stat-value">1,240</span>
              </div>
              <div className="stat-card bg-gray-800">
                <span className="stat-label">Block Time</span>
                <span className="stat-value">2.1s</span>
              </div>
              <div className="stat-card bg-gray-800">
                <span className="stat-label">Gas (HYPR)</span>
                <span className="stat-value">0.00012</span>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <AIInsights />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ActivityFeed />
        </div>
        
        <div>
          <div className="card p-4">
            <div className="flex items-center space-x-2 mb-4">
              <BrainCircuit size={18} className="text-indigo-400" />
              <h3 className="font-medium">Alith AI Assistant</h3>
            </div>
            
            <div className="h-64 p-4 bg-gray-800 rounded-lg overflow-y-auto scrollbar-thin">
              <div className="space-y-3">
                <div className="flex space-x-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
                    A
                  </div>
                  <div className="bg-gray-700 rounded-lg p-2.5 max-w-[80%]">
                    <p className="text-sm">Welcome to HyperTrade. How can I assist with your trading today?</p>
                  </div>
                </div>
                
                <div className="flex space-x-2 justify-end">
                  <div className="bg-indigo-600/20 text-indigo-100 rounded-lg p-2.5 max-w-[80%]">
                    <p className="text-sm">What's the current network status?</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-medium">
                    U
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
                    A
                  </div>
                  <div className="bg-gray-700 rounded-lg p-2.5 max-w-[80%]">
                    <p className="text-sm">Hyperion network is running optimally with 1,240 TPS and 2.1s block time. All systems operational with parallel execution at 94% efficiency.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 relative">
              <input
                type="text"
                placeholder="Ask Alith about market conditions..."
                className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2.5 pl-4 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-400 hover:text-indigo-300">
                <BrainCircuit size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;