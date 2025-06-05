import React from 'react';
import { ArrowUpRight, ArrowDownRight, Info, DollarSign } from 'lucide-react';

const PortfolioAnalysis: React.FC = () => {
  const assets = [
    { name: 'Bitcoin', symbol: 'BTC', amount: '0.42', value: '$26,973.85', change: '+2.4%', isPositive: true },
    { name: 'Ethereum', symbol: 'ETH', amount: '4.75', value: '$14,837.91', change: '+1.7%', isPositive: true },
    { name: 'Hyperion', symbol: 'HYPR', amount: '2,450', value: '$30,772.00', change: '+8.3%', isPositive: true },
    { name: 'USD Coin', symbol: 'USDC', amount: '5,000', value: '$5,000.00', change: '0.0%', isPositive: true },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Portfolio Analysis</h1>
        <p className="text-gray-400">AI-enhanced portfolio insights and optimization</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold">$77,583.76</h2>
              <div className="flex items-center mt-1">
                <div className="flex items-center text-green-500 mr-3">
                  <ArrowUpRight size={16} />
                  <span className="ml-1 text-sm">+$3,241.52 (4.3%)</span>
                </div>
                <span className="text-sm text-gray-400">24h Change</span>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button className="btn btn-secondary">
                <DollarSign size={16} className="mr-1" />
                <span>Deposit</span>
              </button>
              <button className="btn btn-primary">
                <span>Optimize</span>
              </button>
            </div>
          </div>
          
          <div className="h-64 w-full rounded-lg overflow-hidden bg-gray-800 flex items-center justify-center mb-6">
            <div className="text-center">
              <p className="text-gray-400">Portfolio performance chart</p>
              <p className="text-xs text-gray-500">Historical balance over time</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="stat-card bg-gray-800">
              <span className="stat-label">Assets</span>
              <span className="stat-value">4</span>
            </div>
            <div className="stat-card bg-gray-800">
              <span className="stat-label">24h Profit/Loss</span>
              <span className="stat-value text-green-500">+$3,241</span>
            </div>
            <div className="stat-card bg-gray-800">
              <span className="stat-label">AI Risk Score</span>
              <span className="stat-value">
                <span className="text-amber-500">Medium</span>
              </span>
            </div>
            <div className="stat-card bg-gray-800">
              <span className="stat-label">Yield (APY)</span>
              <span className="stat-value">5.2%</span>
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">AI Recommendations</h3>
            <Info size={16} className="text-gray-500" />
          </div>
          
          <div className="space-y-4">
            <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
              <h4 className="text-sm font-medium text-indigo-400 mb-1">Portfolio Rebalance</h4>
              <p className="text-xs text-gray-300 mb-2">Optimal allocation based on risk profile</p>
              <div className="flex justify-between text-xs">
                <div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div>
                    <span>BTC: 30%</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-indigo-500 mr-1"></div>
                    <span>ETH: 25%</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mr-1"></div>
                    <span>HYPR: 35%</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-gray-500 mr-1"></div>
                    <span>USDC: 10%</span>
                  </div>
                </div>
              </div>
              <button className="w-full btn btn-ghost text-xs text-indigo-400 mt-3">
                Apply Rebalance
              </button>
            </div>
            
            <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <h4 className="text-sm font-medium text-green-400 mb-1">Yield Optimization</h4>
              <p className="text-xs text-gray-300">Stake HYPR tokens for 12.5% APY</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-400">Est. monthly yield: +$320</span>
                <button className="text-xs text-green-400 hover:text-green-300">
                  View Details
                </button>
              </div>
            </div>
            
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <h4 className="text-sm font-medium text-amber-400 mb-1">Risk Alert</h4>
              <p className="text-xs text-gray-300">39% of portfolio in volatile assets</p>
              <div className="mt-2 text-xs text-gray-400">
                Consider diversifying into more stable assets
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h3 className="font-medium">Assets</h3>
          <button className="text-xs text-indigo-400 hover:text-indigo-300">
            Add New Asset
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Asset
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Value
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  24h Change
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {assets.map((asset, index) => (
                <tr key={index} className="hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-sm mr-3">
                        {asset.symbol.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium">{asset.name}</div>
                        <div className="text-sm text-gray-400">{asset.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">{asset.amount}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">{asset.value}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`flex items-center ${asset.isPositive ? 'text-green-500' : 'text-rose-500'}`}>
                      {asset.isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                      <span className="ml-1">{asset.change}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex space-x-2">
                      <button className="px-2 py-1 rounded bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600/30">
                        Trade
                      </button>
                      <button className="px-2 py-1 rounded bg-gray-700 text-gray-300 hover:bg-gray-600">
                        Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PortfolioAnalysis;