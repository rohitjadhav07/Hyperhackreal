import React, { useState } from 'react';
import { BrainCircuit, ArrowUpCircle, ArrowDownCircle, ChevronDown, Clock, BarChart2, GitBranch, Play, Pause, Copy } from 'lucide-react';

const AITrading: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  
  const strategies = [
    {
      id: 1,
      name: 'Momentum Trader',
      description: 'Leverages parallel execution to identify and execute on short-term price trends',
      stats: {
        profit: '+18.4%',
        trades: '342',
        winRate: '68%',
        timeframe: '2 weeks'
      },
      risk: 'Medium',
      status: 'Active'
    },
    {
      id: 2,
      name: 'AI Volatility Arbitrage',
      description: 'Uses on-chain AI to identify price discrepancies across DEXs',
      stats: {
        profit: '+9.7%',
        trades: '1,245',
        winRate: '54%',
        timeframe: '2 weeks'
      },
      risk: 'High',
      status: 'Paused'
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">AI Trading</h1>
        <p className="text-gray-400">Automated trading strategies powered by Hyperion's on-chain AI</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 card p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2">
              <BrainCircuit size={20} className="text-indigo-400" />
              <h2 className="text-xl font-bold">AI Trading Dashboard</h2>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`btn ${isRunning ? 'btn-danger' : 'btn-success'}`}
              >
                {isRunning ? (
                  <>
                    <Pause size={16} className="mr-1.5" />
                    <span>Pause All</span>
                  </>
                ) : (
                  <>
                    <Play size={16} className="mr-1.5" />
                    <span>Start All</span>
                  </>
                )}
              </button>
              <button className="btn btn-secondary">
                <GitBranch size={16} className="mr-1.5" />
                <span>New Strategy</span>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div className="stat-card bg-gray-800">
              <span className="stat-label">Active Strategies</span>
              <span className="stat-value">2</span>
            </div>
            <div className="stat-card bg-gray-800">
              <span className="stat-label">Total Profit</span>
              <span className="stat-value text-green-500">+$4,823</span>
            </div>
            <div className="stat-card bg-gray-800">
              <span className="stat-label">Win Rate</span>
              <span className="stat-value">62%</span>
            </div>
            <div className="stat-card bg-gray-800">
              <span className="stat-label">AI Confidence</span>
              <span className="stat-value text-indigo-400">High</span>
            </div>
          </div>
          
          <div className="h-64 w-full rounded-lg overflow-hidden bg-gray-800 flex items-center justify-center mb-6">
            <div className="text-center">
              <BarChart2 size={48} className="mx-auto mb-2 text-indigo-400 opacity-70" />
              <p className="text-gray-400">Performance visualization</p>
              <p className="text-xs text-gray-500">Strategy performance over time</p>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Recent Trades</h3>
              <button className="text-xs text-indigo-400">View All</button>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 rounded hover:bg-gray-700/50">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <ArrowUpCircle size={16} className="text-green-500" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Buy BTC</div>
                    <div className="text-xs text-gray-400">Momentum Trader</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-green-500">+$241.23 (1.2%)</div>
                  <div className="text-xs text-gray-400">3 min ago</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-2 rounded hover:bg-gray-700/50">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center">
                    <ArrowDownCircle size={16} className="text-rose-500" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Sell ETH</div>
                    <div className="text-xs text-gray-400">AI Volatility Arbitrage</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-rose-500">-$58.76 (0.4%)</div>
                  <div className="text-xs text-gray-400">12 min ago</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-2 rounded hover:bg-gray-700/50">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <ArrowUpCircle size={16} className="text-green-500" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Buy HYPR</div>
                    <div className="text-xs text-gray-400">Momentum Trader</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-green-500">+$342.12 (2.7%)</div>
                  <div className="text-xs text-gray-400">25 min ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Strategy Builder</h3>
            <span className="text-xs px-2 py-1 rounded bg-indigo-500/20 text-indigo-300">
              Powered by Alith
            </span>
          </div>
          
          <div className="space-y-4 mb-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Strategy Name</label>
              <input
                type="text"
                placeholder="My AI Strategy"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-1">Strategy Description</label>
              <textarea
                placeholder="Describe your trading strategy..."
                rows={3}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              ></textarea>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Trading Pair</label>
                <div className="relative">
                  <select className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 appearance-none">
                    <option>BTC/USDC</option>
                    <option>ETH/USDC</option>
                    <option>HYPR/USDC</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Risk Level</label>
                <div className="relative">
                  <select className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 appearance-none">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-1">Natural Language Strategy</label>
              <textarea
                placeholder="E.g., Buy when price increases 5% over 1 hour, sell when profit exceeds 10% or loss exceeds 2%..."
                rows={4}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              ></textarea>
              <p className="mt-1 text-xs text-gray-500">Alith will convert your natural language to an optimized strategy</p>
            </div>
          </div>
          
          <button className="w-full btn btn-primary mb-4">
            <BrainCircuit size={16} className="mr-1.5" />
            <span>Generate Strategy</span>
          </button>
          
          <div className="text-xs text-center text-gray-500">
            <span>All strategies run in parallel on Hyperion's high-performance network</span>
          </div>
        </div>
      </div>
      
      <div className="card">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h3 className="font-medium">Active Strategies</h3>
          <button className="text-xs text-indigo-400 hover:text-indigo-300">
            Import Strategy
          </button>
        </div>
        
        <div className="divide-y divide-gray-700">
          {strategies.map((strategy) => (
            <div key={strategy.id} className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium">{strategy.name}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      strategy.status === 'Active' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-gray-600/50 text-gray-400'
                    }`}>
                      {strategy.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{strategy.description}</p>
                </div>
                
                <div className="flex space-x-2">
                  <button className="btn btn-ghost text-xs">
                    <Copy size={14} className="mr-1" />
                    <span>Clone</span>
                  </button>
                  <button className={`btn text-xs ${
                    strategy.status === 'Active' ? 'btn-danger' : 'btn-success'
                  }`}>
                    {strategy.status === 'Active' ? (
                      <>
                        <Pause size={14} className="mr-1" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Play size={14} className="mr-1" />
                        <span>Start</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div className="bg-gray-800 rounded p-2">
                  <p className="text-xs text-gray-400">Profit</p>
                  <p className="text-sm font-medium text-green-500">{strategy.stats.profit}</p>
                </div>
                <div className="bg-gray-800 rounded p-2">
                  <p className="text-xs text-gray-400">Trades</p>
                  <p className="text-sm font-medium">{strategy.stats.trades}</p>
                </div>
                <div className="bg-gray-800 rounded p-2">
                  <p className="text-xs text-gray-400">Win Rate</p>
                  <p className="text-sm font-medium">{strategy.stats.winRate}</p>
                </div>
                <div className="bg-gray-800 rounded p-2">
                  <p className="text-xs text-gray-400">Risk Level</p>
                  <p className={`text-sm font-medium ${
                    strategy.risk === 'Low' ? 'text-green-500' : 
                    strategy.risk === 'Medium' ? 'text-amber-500' : 'text-rose-500'
                  }`}>{strategy.risk}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center text-xs text-gray-500">
                  <Clock size={14} className="mr-1" />
                  <span>Running for {strategy.stats.timeframe}</span>
                </div>
                <button className="text-xs text-indigo-400 hover:text-indigo-300">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AITrading;