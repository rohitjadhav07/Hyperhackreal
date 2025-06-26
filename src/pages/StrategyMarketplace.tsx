import React, { useState } from 'react';
import { TrendingUp, Users, Award, Bookmark, Star, ChevronDown, Download, Eye, Upload, Check } from 'lucide-react';
import { useStrategyStore } from '../store/strategyStore';

const StrategyMarketplace: React.FC = () => {
  const { strategies, publishedStrategies, publishStrategy } = useStrategyStore();
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState<string>('');
  const [publishForm, setPublishForm] = useState({
    price: 'Free',
    tags: '',
    description: ''
  });

  const marketplaceStrategies = [
    {
      id: 'mp1',
      name: 'Hyperion Momentum',
      author: 'AIQuantTrader',
      description: 'Trend-following strategy using Hyperion\'s parallel execution for low-latency trading',
      stats: {
        profit: '+24.7%',
        users: '1,248',
        rating: '4.8'
      },
      tags: ['Momentum', 'Low Risk', 'HYPR Token'],
      price: 'Free'
    },
    {
      id: 'mp2',
      name: 'AI Volatility Hunter',
      author: 'CryptoAlphaMaster',
      description: 'Uses on-chain AI to detect and capitalize on volatility spikes across markets',
      stats: {
        profit: '+42.3%',
        users: '876',
        rating: '4.6'
      },
      tags: ['Volatility', 'Medium Risk', 'Multi-Chain'],
      price: '50 HYPR'
    },
    {
      id: 'mp3',
      name: 'Alith Sentiment Trader',
      author: 'BlockchainInnovator',
      description: 'Leverages Alith\'s AI for real-time sentiment analysis of on-chain activity',
      stats: {
        profit: '+18.9%',
        users: '2,347',
        rating: '4.9'
      },
      tags: ['Sentiment', 'Low Risk', 'AI-Powered'],
      price: '25 HYPR'
    },
    ...publishedStrategies.map(strategy => ({
      id: strategy.id,
      name: strategy.name,
      author: 'You',
      description: strategy.description,
      stats: strategy.stats,
      tags: [strategy.riskLevel + ' Risk', strategy.tradingPair],
      price: 'Free'
    }))
  ];

  const handlePublishStrategy = () => {
    if (selectedStrategy) {
      publishStrategy(selectedStrategy);
      setShowPublishModal(false);
      setSelectedStrategy('');
      setPublishForm({ price: 'Free', tags: '', description: '' });
    }
  };

  const unpublishedStrategies = strategies.filter(s => !s.isPublished);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Strategy Marketplace</h1>
        <p className="text-gray-400">Discover and share AI trading strategies with the community</p>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          <button className="btn btn-secondary text-sm">
            <TrendingUp size={16} className="mr-1.5" />
            <span>Top Performing</span>
          </button>
          <button className="btn btn-secondary text-sm">
            <Users size={16} className="mr-1.5" />
            <span>Most Popular</span>
          </button>
          <button className="btn btn-secondary text-sm">
            <Award size={16} className="mr-1.5" />
            <span>Featured</span>
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <select className="bg-gray-800 border border-gray-700 rounded-lg py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 appearance-none">
              <option>All Categories</option>
              <option>Momentum</option>
              <option>Volatility</option>
              <option>Sentiment</option>
              <option>AI-Powered</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>
          
          <div className="relative">
            <select className="bg-gray-800 border border-gray-700 rounded-lg py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 appearance-none">
              <option>All Prices</option>
              <option>Free</option>
              <option>Paid</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {marketplaceStrategies.map((strategy) => (
          <div key={strategy.id} className="card hover:border-indigo-500/50 transition-all duration-300">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-lg">{strategy.name}</h3>
                <button className="text-gray-400 hover:text-indigo-400">
                  <Bookmark size={18} />
                </button>
              </div>
              
              <p className="text-sm text-gray-300 mb-4">{strategy.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {strategy.tags.map((tag, index) => (
                  <span key={index} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="text-center p-2 bg-gray-800 rounded">
                  <p className="text-xs text-gray-400 mb-1">Profit</p>
                  <p className="text-sm font-medium text-green-500">{strategy.stats.profit}</p>
                </div>
                <div className="text-center p-2 bg-gray-800 rounded">
                  <p className="text-xs text-gray-400 mb-1">Users</p>
                  <p className="text-sm font-medium">{strategy.stats.users}</p>
                </div>
                <div className="text-center p-2 bg-gray-800 rounded">
                  <p className="text-xs text-gray-400 mb-1">Rating</p>
                  <div className="flex items-center justify-center">
                    <Star size={14} className="text-amber-400 mr-1" fill="currentColor" />
                    <p className="text-sm font-medium">{strategy.stats.rating}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <span className="text-gray-400">by </span>
                  <span className={strategy.author === 'You' ? 'text-indigo-400 font-medium' : 'text-indigo-400'}>
                    {strategy.author}
                  </span>
                </div>
                <div className="font-medium text-sm">
                  {strategy.price === 'Free' ? (
                    <span className="text-green-500">Free</span>
                  ) : (
                    <span>{strategy.price}</span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-700 p-4 flex justify-between">
              <button className="text-xs flex items-center text-gray-400 hover:text-gray-300">
                <Eye size={14} className="mr-1" />
                <span>Preview</span>
              </button>
              <button className="btn btn-primary text-xs py-1.5 px-3">
                <Download size={14} className="mr-1" />
                <span>{strategy.price === 'Free' ? 'Download' : 'Purchase'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="card p-6 mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 rounded-lg bg-indigo-600 flex items-center justify-center">
            <Award size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Publish Your Strategy</h2>
            <p className="text-gray-400">Share your trading strategies with the community and earn HYPR tokens</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="font-medium mb-2">1. Create a Strategy</h3>
            <p className="text-sm text-gray-400">Build and test your trading strategy using Hyperion's AI tools</p>
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="font-medium mb-2">2. Submit for Review</h3>
            <p className="text-sm text-gray-400">Our community will verify performance and security</p>
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="font-medium mb-2">3. Earn Rewards</h3>
            <p className="text-sm text-gray-400">Get paid in HYPR tokens when users download your strategy</p>
          </div>
        </div>
        
        {unpublishedStrategies.length > 0 ? (
          <div className="mb-6">
            <h3 className="font-medium mb-3">Your Unpublished Strategies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {unpublishedStrategies.map((strategy) => (
                <div key={strategy.id} className="bg-gray-800 p-4 rounded-lg flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{strategy.name}</h4>
                    <p className="text-sm text-gray-400">{strategy.description}</p>
                    <div className="flex items-center mt-2">
                      <span className={`text-xs px-2 py-1 rounded ${
                        strategy.status === 'Active' 
                          ? 'bg-green-500/20 text-green-400' 
                          : strategy.status === 'Paused'
                          ? 'bg-gray-600/50 text-gray-400'
                          : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {strategy.status}
                      </span>
                      <span className="text-xs text-gray-500 ml-2">
                        {strategy.stats.profit} profit
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedStrategy(strategy.id);
                      setShowPublishModal(true);
                    }}
                    className="btn btn-primary text-sm"
                  >
                    <Upload size={14} className="mr-1" />
                    Publish
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-800 rounded-lg">
            <Upload size={48} className="mx-auto mb-4 text-gray-600" />
            <p className="text-gray-400 mb-4">No strategies ready for publishing</p>
            <p className="text-sm text-gray-500">Create and test strategies in the AI Trading section first</p>
          </div>
        )}
      </div>
      
      <div className="card">
        <div className="p-6 border-b border-gray-700">
          <h3 className="font-bold text-lg">Top Contributors</h3>
        </div>
        
        <div className="divide-y divide-gray-700">
          {[
            { name: 'AIQuantTrader', strategies: 3, users: 3347, rating: 4.9 },
            { name: 'CryptoAlphaMaster', strategies: 2, users: 2347, rating: 4.8 },
            { name: 'BlockchainInnovator', strategies: 1, users: 1347, rating: 4.7 }
          ].map((contributor, index) => (
            <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-800/50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-medium">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium">{contributor.name}</p>
                  <p className="text-sm text-gray-400">{contributor.strategies} strategies · {contributor.users} users</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  <Star size={14} className="text-amber-400 mr-1" fill="currentColor" />
                  <span className="text-sm font-medium">{contributor.rating}</span>
                </div>
                <button className="btn btn-ghost text-xs py-1 px-2">
                  <span>View</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Publish Strategy Modal */}
      {showPublishModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold mb-4">Publish Strategy</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Strategy</label>
                <div className="bg-gray-800 p-3 rounded-lg">
                  <p className="font-medium">
                    {strategies.find(s => s.id === selectedStrategy)?.name}
                  </p>
                  <p className="text-sm text-gray-400">
                    {strategies.find(s => s.id === selectedStrategy)?.description}
                  </p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Price</label>
                <div className="relative">
                  <select 
                    value={publishForm.price}
                    onChange={(e) => setPublishForm({...publishForm, price: e.target.value})}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                  >
                    <option>Free</option>
                    <option>10 HYPR</option>
                    <option>25 HYPR</option>
                    <option>50 HYPR</option>
                    <option>100 HYPR</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g., AI, Momentum, Low Risk"
                  value={publishForm.tags}
                  onChange={(e) => setPublishForm({...publishForm, tags: e.target.value})}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Additional Description</label>
                <textarea
                  placeholder="Add any additional details about your strategy..."
                  rows={3}
                  value={publishForm.description}
                  onChange={(e) => setPublishForm({...publishForm, description: e.target.value})}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                ></textarea>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button 
                onClick={handlePublishStrategy}
                className="flex-1 btn btn-primary"
              >
                <Check size={16} className="mr-1.5" />
                <span>Publish Strategy</span>
              </button>
              <button 
                onClick={() => setShowPublishModal(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StrategyMarketplace;