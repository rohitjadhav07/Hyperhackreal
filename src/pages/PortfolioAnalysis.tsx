import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, Info, DollarSign, TrendingUp, BarChart3, CreditCard, Wallet, Plus } from 'lucide-react';
import PortfolioChart from '../components/charts/PortfolioChart';

const PortfolioAnalysis: React.FC = () => {
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [depositMethod, setDepositMethod] = useState('crypto');

  const assets = [
    { name: 'Bitcoin', symbol: 'BTC', amount: '0.42', value: '$26,973.85', change: '+2.4%', isPositive: true },
    { name: 'Ethereum', symbol: 'ETH', amount: '4.75', value: '$14,837.91', change: '+1.7%', isPositive: true },
    { name: 'Hyperion', symbol: 'HYPR', amount: '2,450', value: '$30,772.00', change: '+8.3%', isPositive: true },
    { name: 'USD Coin', symbol: 'USDC', amount: '5,000', value: '$5,000.00', change: '0.0%', isPositive: true },
  ];

  const handleDeposit = () => {
    if (depositAmount && parseFloat(depositAmount) > 0) {
      // In a real app, this would integrate with payment processors or wallet connections
      alert(`Deposit of $${depositAmount} initiated via ${depositMethod}. This would integrate with real payment systems.`);
      setShowDepositModal(false);
      setDepositAmount('');
    }
  };

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
              <button 
                onClick={() => setShowDepositModal(true)}
                className="btn btn-secondary"
              >
                <Plus size={16} className="mr-1" />
                <span>Deposit</span>
              </button>
              <button className="btn btn-primary">
                <span>Optimize</span>
              </button>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Portfolio Performance (30 Days)</h3>
              <div className="flex space-x-2">
                <button className="p-1.5 bg-indigo-600 rounded hover:bg-indigo-700">
                  <TrendingUp size={16} />
                </button>
                <button className="p-1.5 bg-gray-700 rounded hover:bg-gray-600">
                  <BarChart3 size={16} />
                </button>
              </div>
            </div>
            <PortfolioChart height={300} type="area" />
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

      {/* Deposit Modal */}
      {showDepositModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold mb-4">Deposit Funds</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Deposit Method</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setDepositMethod('crypto')}
                    className={`p-3 rounded-lg border transition-colors ${
                      depositMethod === 'crypto'
                        ? 'border-indigo-500 bg-indigo-500/10'
                        : 'border-gray-700 bg-gray-800'
                    }`}
                  >
                    <Wallet size={20} className="mx-auto mb-1" />
                    <p className="text-sm">Crypto</p>
                  </button>
                  <button
                    onClick={() => setDepositMethod('card')}
                    className={`p-3 rounded-lg border transition-colors ${
                      depositMethod === 'card'
                        ? 'border-indigo-500 bg-indigo-500/10'
                        : 'border-gray-700 bg-gray-800'
                    }`}
                  >
                    <CreditCard size={20} className="mx-auto mb-1" />
                    <p className="text-sm">Card</p>
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Amount (USD)</label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div className="flex space-x-2">
                {['100', '500', '1000', '5000'].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setDepositAmount(amount)}
                    className="flex-1 py-2 px-3 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors"
                  >
                    ${amount}
                  </button>
                ))}
              </div>
              
              {depositMethod === 'crypto' && (
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <p className="text-sm text-blue-400 mb-1">Crypto Deposit</p>
                  <p className="text-xs text-gray-300">
                    Connect your wallet to deposit crypto directly into your portfolio
                  </p>
                </div>
              )}
              
              {depositMethod === 'card' && (
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-sm text-green-400 mb-1">Card Payment</p>
                  <p className="text-xs text-gray-300">
                    Secure card payments processed via Stripe (3% fee applies)
                  </p>
                </div>
              )}
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button 
                onClick={handleDeposit}
                disabled={!depositAmount || parseFloat(depositAmount) <= 0}
                className="flex-1 btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <DollarSign size={16} className="mr-1.5" />
                <span>Deposit ${depositAmount || '0'}</span>
              </button>
              <button 
                onClick={() => setShowDepositModal(false)}
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

export default PortfolioAnalysis;