import React from 'react';
import { ArrowUpRight, ArrowDownRight, Repeat, Clock } from 'lucide-react';

interface ActivityProps {
  type: 'buy' | 'sell' | 'swap' | 'pending';
  asset: string;
  amount: string;
  value: string;
  time: string;
}

const Activity: React.FC<ActivityProps> = ({ type, asset, amount, value, time }) => {
  const getIcon = () => {
    switch (type) {
      case 'buy':
        return (
          <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
            <ArrowUpRight size={16} className="text-green-500" />
          </div>
        );
      case 'sell':
        return (
          <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center">
            <ArrowDownRight size={16} className="text-rose-500" />
          </div>
        );
      case 'swap':
        return (
          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
            <Repeat size={16} className="text-blue-500" />
          </div>
        );
      case 'pending':
        return (
          <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
            <Clock size={16} className="text-amber-500" />
          </div>
        );
    }
  };

  const getTypeLabel = () => {
    switch (type) {
      case 'buy':
        return 'Bought';
      case 'sell':
        return 'Sold';
      case 'swap':
        return 'Swapped';
      case 'pending':
        return 'Pending';
    }
  };

  return (
    <div className="flex items-center justify-between py-3 px-4 hover:bg-gray-800/50 transition-colors">
      <div className="flex items-center space-x-3">
        {getIcon()}
        <div>
          <p className="text-sm font-medium">
            {getTypeLabel()} <span className="text-indigo-400">{asset}</span>
          </p>
          <p className="text-xs text-gray-400">{time}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium">{amount}</p>
        <p className="text-xs text-gray-400">{value}</p>
      </div>
    </div>
  );
};

const ActivityFeed: React.FC = () => {
  const activities: ActivityProps[] = [
    {
      type: 'buy',
      asset: 'BTC',
      amount: '+0.024 BTC',
      value: '$1,542.36',
      time: '2 min ago'
    },
    {
      type: 'swap',
      asset: 'ETH to HYPR',
      amount: '0.5 ETH → 124 HYPR',
      value: '$1,561.89',
      time: '15 min ago'
    },
    {
      type: 'pending',
      asset: 'HYPR Staking',
      amount: '50 HYPR',
      value: '$628.00',
      time: '28 min ago'
    },
    {
      type: 'sell',
      asset: 'ETH',
      amount: '-2.5 ETH',
      value: '$7,809.45',
      time: '1 hour ago'
    },
  ];

  return (
    <div className="card">
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h3 className="font-medium">Recent Activity</h3>
        <button className="text-xs text-indigo-400 hover:text-indigo-300">View All</button>
      </div>
      
      <div className="divide-y divide-gray-700/50">
        {activities.map((activity, index) => (
          <Activity key={index} {...activity} />
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;