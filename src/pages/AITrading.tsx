import React, { useState } from 'react';
import { BrainCircuit, ArrowUpCircle, ArrowDownCircle, ChevronDown, Clock, BarChart2, GitBranch, Play, Pause, Copy, Trash2, Edit, Eye, X } from 'lucide-react';
import { useStrategyStore } from '../store/strategyStore';

const StrategyDetailsModal: React.FC<{ strategy: any; isOpen: boolean; onClose: () => void }> = ({ strategy, isOpen, onClose }) => {
  if (!isOpen || !strategy) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-xl w-full max-w-4xl p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">{strategy.name} - Strategy Details</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-lg">
            <X size={20} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">Strategy Overview</h4>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-gray-300">{strategy.description}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Natural Language Strategy</h4>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-gray-300">{strategy.naturalLanguageStrategy}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Performance Chart</h4>
                <div className="bg-gray-800 p-4 rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center">
                    <BarChart2 size={48} className="mx-auto mb-2 text-indigo-400 opacity-70" />
                    <p className="text-gray-400">Strategy performance visualization</p>
                    <p className="text-xs text-gray-500">Historical profit/loss over time</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Recent Trades</h4>
                <div className="bg-gray-800 rounded-lg">
                  <div className="divide-y divide-gray-700">
                    {[
                      { type: 'buy', asset: 'BTC', amount: '+0.024', value: '$1,542.36', time: '2 min ago', profit: '+$241.23' },
                      { type: 'sell', asset: 'ETH', amount: '-0.5', value: '$1,561.89', time: '15 min ago', profit: '+$58.76' },
                      { type: 'buy', asset: 'HYPR', amount: '+50', value: '$628.00', time: '28 min ago', profit: '+$42.12' },
                    ].map((trade, index) => (
                      <div key={index} className="p-3 flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            trade.type === 'buy' ? 'bg-green-500/20' : 'bg-rose-500/20'
                          }`}>
                            {trade.type === 'buy' ? 
                              <ArrowUpCircle size={16} className="text-green-500" /> : 
                              <ArrowDownCircle size={16} className="text-rose-500" />
                            }
                          </div>
                          <div>
                            <p className="text-sm font-medium">{trade.type.toUpperCase()} {trade.asset}</p>
                            <p className="text-xs text-gray-400">{trade.time}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{trade.amount}</p>
                          <p className="text-xs text-green-500">{trade.profit}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">Strategy Info</h4>
                <div className="bg-gray-800 p-4 rounded-lg space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Trading Pair</span>
                    <span>{strategy.tradingPair}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Risk Level</span>
                    <span className={`${
                      strategy.riskLevel === 'Low' ? 'text-green-500' : 
                      strategy.riskLevel === 'Medium' ? 'text-amber-500' : 'text-rose-500'
                    }`}>{strategy.riskLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status</span>
                    <span className={`${
                      strategy.status === 'Active' ? 'text-green-500' : 
                      strategy.status === 'Paused' ? 'text-gray-400' : 'text-amber-500'
                    }`}>{strategy.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Created</span>
                    <span>{new Date(strategy.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Performance Metrics</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-800 p-3 rounded-lg text-center">
                    <p className="text-xs text-gray-400">Total Profit</p>
                    <p className="text-lg font-bold text-green-500">{strategy.stats.profit}</p>
                  </div>
                  <div className="bg-gray-800 p-3 rounded-lg text-center">
                    <p className="text-xs text-gray-400">Win Rate</p>
                    <p className="text-lg font-bold">{strategy.stats.winRate}</p>
                  </div>
                  <div className="bg-gray-800 p-3 rounded-lg text-center">
                    <p className="text-xs text-gray-400">Total Trades</p>
                    <p className="text-lg font-bold">{strategy.stats.trades}</p>
                  </div>
                  <div className="bg-gray-800 p-3 rounded-lg text-center">
                    <p className="text-xs text-gray-400">Runtime</p>
                    <p className="text-lg font-bold">{strategy.stats.timeframe}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Risk Analysis</h4>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Max Drawdown</span>
                      <span className="text-rose-500">-5.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Sharpe Ratio</span>
                      <span>1.34</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Volatility</span>
                      <span>12.8%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AITrading: React.FC = () => {
  const { strategies, addStrategy, toggleStrategyStatus, cloneStrategy, deleteStrategy } = useStrategyStore();
  const [isRunning, setIsRunning] = useState(false);
  const [showStrategyForm, setShowStrategyForm] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState<any>(null);
  const [showStrategyDetails, setShowStrategyDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    tradingPair: 'BTC/USDC',
    riskLevel: 'Medium' as 'Low' | 'Medium' | 'High',
    naturalLanguageStrategy: ''
  });

  const handleCreateStrategy = () => {
    if (formData.name && formData.description && formData.naturalLanguageStrategy) {
      addStrategy(formData);
      setFormData({
        name: '',
        description: '',
        tradingPair: 'BTC/USDC',
        riskLevel: 'Medium',
        naturalLanguageStrategy: ''
      });
      setShowStrategyForm(false);
    }
  };

  const handleViewDetails = (strategy: any) => {
    setSelectedStrategy(strategy);
    setShowStrategyDetails(true);
  };

  const activeStrategies = strategies.filter(s => s.status === 'Active').length;
  const totalProfit = strategies.reduce((acc, strategy) => {
    const profit = parseFloat(strategy.stats.profit.replace(/[+%]/g, ''));
    return acc + (profit * 100); // Assuming $100 base per strategy
  }, 0);

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
              <button 
                onClick={() => setShowStrategyForm(true)}
                className="btn btn-secondary"
              >
                <GitBranch size={16} className="mr-1.5" />
                <span>New Strategy</span>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div className="stat-card bg-gray-800">
              <span className="stat-label">Active Strategies</span>
              <span className="stat-value">{activeStrategies}</span>
            </div>
            <div className="stat-card bg-gray-800">
              <span className="stat-label">Total Profit</span>
              <span className="stat-value text-green-500">+${totalProfit.toFixed(0)}</span>
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
          
          {!showStrategyForm ? (
            <div className="text-center py-8">
              <BrainCircuit size={48} className="mx-auto mb-4 text-indigo-400 opacity-70" />
              <p className="text-gray-400 mb-4">Create your first AI trading strategy</p>
              <button 
                onClick={() => setShowStrategyForm(true)}
                className="btn btn-primary"
              >
                <GitBranch size={16} className="mr-1.5" />
                <span>Create Strategy</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Strategy Name</label>
                <input
                  type="text"
                  placeholder="My AI Strategy"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Strategy Description</label>
                <textarea
                  placeholder="Describe your trading strategy..."
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                ></textarea>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Trading Pair</label>
                  <div className="relative">
                    <select 
                      value={formData.tradingPair}
                      onChange={(e) => setFormData({...formData, tradingPair: e.target.value})}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                    >
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
                    <select 
                      value={formData.riskLevel}
                      onChange={(e) => setFormData({...formData, riskLevel: e.target.value as 'Low' | 'Medium' | 'High'})}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                    >
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
                  value={formData.naturalLanguageStrategy}
                  onChange={(e) => setFormData({...formData, naturalLanguageStrategy: e.target.value})}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                ></textarea>
                <p className="mt-1 text-xs text-gray-500">Alith will convert your natural language to an optimized strategy</p>
              </div>
              
              <div className="flex space-x-2">
                <button 
                  onClick={handleCreateStrategy}
                  className="flex-1 btn btn-primary"
                >
                  <BrainCircuit size={16} className="mr-1.5" />
                  <span>Generate Strategy</span>
                </button>
                <button 
                  onClick={() => setShowStrategyForm(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          
          <div className="text-xs text-center text-gray-500 mt-4">
            <span>All strategies run in parallel on Hyperion's high-performance network</span>
          </div>
        </div>
      </div>
      
      <div className="card">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h3 className="font-medium">Active Strategies ({strategies.length})</h3>
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
                        : strategy.status === 'Paused'
                        ? 'bg-gray-600/50 text-gray-400'
                        : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {strategy.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{strategy.description}</p>
                </div>
                
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleViewDetails(strategy)}
                    className="btn btn-ghost text-xs"
                  >
                    <Eye size={14} className="mr-1" />
                    <span>Details</span>
                  </button>
                  <button 
                    onClick={() => cloneStrategy(strategy.id)}
                    className="btn btn-ghost text-xs"
                  >
                    <Copy size={14} className="mr-1" />
                    <span>Clone</span>
                  </button>
                  <button 
                    onClick={() => toggleStrategyStatus(strategy.id)}
                    className={`btn text-xs ${
                      strategy.status === 'Active' ? 'btn-danger' : 'btn-success'
                    }`}
                  >
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
                  <button 
                    onClick={() => deleteStrategy(strategy.id)}
                    className="btn btn-danger text-xs"
                  >
                    <Trash2 size={14} />
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
                    strategy.riskLevel === 'Low' ? 'text-green-500' : 
                    strategy.riskLevel === 'Medium' ? 'text-amber-500' : 'text-rose-500'
                  }`}>{strategy.riskLevel}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center text-xs text-gray-500">
                  <Clock size={14} className="mr-1" />
                  <span>Running for {strategy.stats.timeframe}</span>
                </div>
                <button 
                  onClick={() => handleViewDetails(strategy)}
                  className="text-xs text-indigo-400 hover:text-indigo-300"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
          
          {strategies.length === 0 && (
            <div className="p-8 text-center">
              <BrainCircuit size={48} className="mx-auto mb-4 text-gray-600" />
              <p className="text-gray-400 mb-4">No strategies created yet</p>
              <button 
                onClick={() => setShowStrategyForm(true)}
                className="btn btn-primary"
              >
                Create Your First Strategy
              </button>
            </div>
          )}
        </div>
      </div>

      <StrategyDetailsModal
        strategy={selectedStrategy}
        isOpen={showStrategyDetails}
        onClose={() => setShowStrategyDetails(false)}
      />
    </div>
  );
};

export default AITrading;