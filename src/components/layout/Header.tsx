import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import WalletConnect from '../ui/WalletConnect';
import NotificationCenter from './NotificationCenter';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const mockSearchData = [
    { type: 'asset', name: 'Bitcoin', symbol: 'BTC', price: '$64,273', action: () => navigate('/') },
    { type: 'asset', name: 'Ethereum', symbol: 'ETH', price: '$3,124', action: () => navigate('/') },
    { type: 'asset', name: 'Metis Token', symbol: 'METIS', price: '$45.67', action: () => navigate('/') },
    { type: 'strategy', name: 'Momentum Trader', author: 'You', profit: '+18.4%', action: () => navigate('/ai-trading') },
    { type: 'strategy', name: 'AI Volatility Arbitrage', author: 'You', profit: '+9.7%', action: () => navigate('/ai-trading') },
    { type: 'page', name: 'Portfolio Analysis', path: '/portfolio', action: () => navigate('/portfolio') },
    { type: 'page', name: 'AI Trading', path: '/ai-trading', action: () => navigate('/ai-trading') },
    { type: 'page', name: 'Strategy Marketplace', path: '/marketplace', action: () => navigate('/marketplace') },
    { type: 'page', name: 'Settings', path: '/settings', action: () => navigate('/settings') },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 0) {
      setIsSearching(true);
      // Simulate search delay
      setTimeout(() => {
        const filtered = mockSearchData.filter(item =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          (item.symbol && item.symbol.toLowerCase().includes(query.toLowerCase()))
        );
        setSearchResults(filtered);
        setIsSearching(false);
      }, 300);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearching(false);
  };

  const handleResultClick = (result: any) => {
    if (result.action) {
      result.action();
    }
    clearSearch();
  };

  return (
    <header className="h-16 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 flex items-center justify-between px-6 sticky top-0 z-10 w-full">
      <div className="flex items-center w-1/3 relative">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search markets, assets, strategies..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 pl-10 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Search Results Dropdown */}
        {(searchResults.length > 0 || isSearching) && (
          <div className="absolute top-full left-0 w-64 mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
            {isSearching ? (
              <div className="p-4 text-center">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-indigo-500 border-t-transparent mx-auto"></div>
                <p className="text-sm text-gray-400 mt-2">Searching...</p>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="py-2">
                {searchResults.map((result, index) => (
                  <button
                    key={index}
                    onClick={() => handleResultClick(result)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{result.name}</p>
                        <p className="text-xs text-gray-400 capitalize">{result.type}</p>
                      </div>
                      {result.price && (
                        <span className="text-sm text-green-500">{result.price}</span>
                      )}
                      {result.profit && (
                        <span className="text-sm text-green-500">{result.profit}</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center">
                <p className="text-sm text-gray-400">No results found</p>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="flex items-center space-x-4">
        <NotificationCenter />
        <WalletConnect />
      </div>
    </header>
  );
};

export default Header;