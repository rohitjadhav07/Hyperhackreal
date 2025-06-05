import React from 'react';
import { Search } from 'lucide-react';
import WalletConnect from '../ui/WalletConnect';
import NotificationCenter from './NotificationCenter';

const Header: React.FC = () => {
  return (
    <header className="h-16 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 flex items-center justify-between px-6 sticky top-0 z-10 w-full">
      <div className="flex items-center w-1/3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search markets, assets..."
            className="w-64 bg-gray-800 border border-gray-700 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <NotificationCenter />
        <WalletConnect />
      </div>
    </header>
  );
};

export default Header;