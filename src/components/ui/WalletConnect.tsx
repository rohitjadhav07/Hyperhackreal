import React, { useState, useEffect } from 'react';
import { Wallet, ChevronDown, Copy, ExternalLink } from 'lucide-react';
import { ethers } from 'ethers';

const WalletConnect: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [account, setAccount] = useState<string>('');
  const [balance, setBalance] = useState<string>('0');

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window as any;
      if (!ethereum) {
        console.log('Make sure you have MetaMask installed!');
        return;
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setIsConnected(true);
        getBalance(accounts[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getBalance = async (address: string) => {
    try {
      const { ethereum } = window as any;
      const provider = new ethers.providers.Web3Provider(ethereum);
      const balance = await provider.getBalance(address);
      setBalance(ethers.utils.formatEther(balance));
    } catch (error) {
      console.error(error);
    }
  };

  const handleConnect = async () => {
    try {
      const { ethereum } = window as any;
      if (!ethereum) {
        alert('Please install MetaMask!');
        return;
      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
      setIsConnected(true);
      getBalance(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setIsDropdownOpen(false);
    setAccount('');
    setBalance('0');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(account);
  };

  const openEtherscan = () => {
    window.open(`https://etherscan.io/address/${account}`, '_blank');
  };

  return (
    <div className="relative">
      {isConnected ? (
        <button
          onClick={toggleDropdown}
          className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-gray-300 py-1.5 px-3 rounded-lg transition-all"
        >
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span>{truncateAddress(account)}</span>
          <ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </button>
      ) : (
        <button
          onClick={handleConnect}
          className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white py-1.5 px-4 rounded-lg transition-all"
        >
          <Wallet size={16} />
          <span>Connect Wallet</span>
        </button>
      )}

      {isConnected && isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-20 py-2">
          <div className="px-4 py-2 border-b border-gray-700">
            <p className="text-sm text-gray-400">Connected to Ethereum</p>
            <div className="flex items-center justify-between mt-1">
              <p className="font-medium">{truncateAddress(account)}</p>
              <div className="flex space-x-1">
                <button onClick={copyAddress} className="p-1 text-gray-400 hover:text-gray-300">
                  <Copy size={14} />
                </button>
                <button onClick={openEtherscan} className="p-1 text-gray-400 hover:text-gray-300">
                  <ExternalLink size={14} />
                </button>
              </div>
            </div>
          </div>
          
          <div className="px-4 py-2 border-b border-gray-700">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Balance</span>
              <span className="font-medium">{parseFloat(balance).toFixed(4)} ETH</span>
            </div>
          </div>
          
          <button
            onClick={handleDisconnect}
            className="w-full text-left px-4 py-2 text-sm text-rose-400 hover:bg-gray-700"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;