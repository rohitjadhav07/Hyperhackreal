import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, ArrowRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { coinGeckoService, CoinGeckoPrice } from '../../services/coinGeckoApi';
import EnhancedChart from '../charts/EnhancedChart';

interface MarketCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  data: any[];
  onClick: () => void;
}

const MarketCard: React.FC<MarketCardProps> = ({ title, value, change, isPositive, data, onClick }) => {
  return (
    <div className="card p-4 flex flex-col space-y-2 cursor-pointer hover:border-indigo-500/50 transition-all duration-300" onClick={onClick}>
      <p className="text-sm text-gray-400">{title}</p>
      <div className="flex items-end justify-between">
        <p className="text-xl font-bold">{value}</p>
        <div className={`flex items-center text-sm ${isPositive ? 'text-green-500' : 'text-rose-500'}`}>
          {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          <span className="ml-1">{change}</span>
        </div>
      </div>
      <div className="h-20">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={isPositive ? "#22c55e" : "#e11d48"} 
              strokeWidth={2} 
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const MarketOverview: React.FC = () => {
  const [marketData, setMarketData] = useState<CoinGeckoPrice[]>([]);
  const [selectedCoin, setSelectedCoin] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        setError(null);
        setIsLoading(true);

        // Fetch market data from CoinGecko
        const coins = await coinGeckoService.getCoinsMarkets(
          ['bitcoin', 'ethereum', 'metis-token'],
          {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 3,
            page: 1,
            sparkline: true,
            price_change_percentage: '1h,24h,7d,30d'
          }
        );

        setMarketData(coins);
        setLastUpdate(new Date());
      } catch (error) {
        console.error('Error fetching market data:', error);
        setError('Failed to fetch live market data. Please check your internet connection.');
      } finally {
        setIsLoading(false);
      }
    };

    // Initial fetch
    fetchMarketData();

    // Update every 30 seconds
    const interval = setInterval(fetchMarketData, 30000);

    return () => clearInterval(interval);
  }, []);

  const calculateTVL = () => {
    if (marketData.length === 0) return 0;
    
    const btcTVL = (marketData.find(coin => coin.id === 'bitcoin')?.market_cap || 0) * 0.4;
    const ethTVL = (marketData.find(coin => coin.id === 'ethereum')?.market_cap || 0) * 0.35;
    const metisTVL = (marketData.find(coin => coin.id === 'metis-token')?.market_cap || 0) * 0.25;
    
    return btcTVL + ethTVL + metisTVL;
  };

  const formatValue = (value: number) => {
    if (value >= 1e12) {
      return `$${(value / 1e12).toFixed(2)}T`;
    } else if (value >= 1e9) {
      return `$${(value / 1e9).toFixed(2)}B`;
    } else if (value >= 1e6) {
      return `$${(value / 1e6).toFixed(2)}M`;
    } else {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(value);
    }
  };

  const formatChange = (change: number) => {
    return `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`;
  };

  const getSparklineData = (sparkline?: { price: number[] }) => {
    if (!sparkline || !sparkline.price) return [];
    
    return sparkline.price.map((price, index) => ({
      timestamp: index,
      value: price
    }));
  };

  const markets = marketData.length > 0 ? [
    {
      id: 'bitcoin',
      symbol: 'BTC',
      title: 'BTC/USD',
      value: formatValue(marketData.find(coin => coin.id === 'bitcoin')?.current_price || 0),
      change: formatChange(marketData.find(coin => coin.id === 'bitcoin')?.price_change_percentage_24h || 0),
      isPositive: (marketData.find(coin => coin.id === 'bitcoin')?.price_change_percentage_24h || 0) >= 0,
      chartData: getSparklineData(marketData.find(coin => coin.id === 'bitcoin')?.sparkline_in_7d),
      currentPrice: marketData.find(coin => coin.id === 'bitcoin')?.current_price || 0,
      priceChange: marketData.find(coin => coin.id === 'bitcoin')?.price_change_percentage_24h || 0
    },
    {
      id: 'ethereum',
      symbol: 'ETH',
      title: 'ETH/USD',
      value: formatValue(marketData.find(coin => coin.id === 'ethereum')?.current_price || 0),
      change: formatChange(marketData.find(coin => coin.id === 'ethereum')?.price_change_percentage_24h || 0),
      isPositive: (marketData.find(coin => coin.id === 'ethereum')?.price_change_percentage_24h || 0) >= 0,
      chartData: getSparklineData(marketData.find(coin => coin.id === 'ethereum')?.sparkline_in_7d),
      currentPrice: marketData.find(coin => coin.id === 'ethereum')?.current_price || 0,
      priceChange: marketData.find(coin => coin.id === 'ethereum')?.price_change_percentage_24h || 0
    },
    {
      id: 'metis-token',
      symbol: 'METIS',
      title: 'METIS/USD',
      value: formatValue(marketData.find(coin => coin.id === 'metis-token')?.current_price || 0),
      change: formatChange(marketData.find(coin => coin.id === 'metis-token')?.price_change_percentage_24h || 0),
      isPositive: (marketData.find(coin => coin.id === 'metis-token')?.price_change_percentage_24h || 0) >= 0,
      chartData: getSparklineData(marketData.find(coin => coin.id === 'metis-token')?.sparkline_in_7d),
      currentPrice: marketData.find(coin => coin.id === 'metis-token')?.current_price || 0,
      priceChange: marketData.find(coin => coin.id === 'metis-token')?.price_change_percentage_24h || 0
    },
    {
      id: 'tvl',
      symbol: 'TVL',
      title: 'Total TVL',
      value: formatValue(calculateTVL()),
      change: formatChange(2.5),
      isPositive: true,
      chartData: getSparklineData(marketData.find(coin => coin.id === 'bitcoin')?.sparkline_in_7d),
      currentPrice: calculateTVL(),
      priceChange: 2.5
    }
  ] : [];

  if (isLoading) {
    return (
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold">Market Overview</h2>
            <p className="text-sm text-gray-400">Loading live market data...</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="card p-4 animate-pulse">
              <div className="h-4 bg-gray-700 rounded mb-2"></div>
              <div className="h-6 bg-gray-700 rounded mb-4"></div>
              <div className="h-20 bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold">Market Overview</h2>
          <div className="flex items-center space-x-2">
            <p className="text-sm text-gray-400">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </p>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs text-green-500">Live Data</span>
            </div>
          </div>
        </div>
        <button className="btn btn-ghost text-sm">
          <span>View All</span>
          <ArrowRight size={16} className="ml-1" />
        </button>
      </div>
      
      {error && (
        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-500 p-4 rounded-lg mb-4">
          <div className="flex items-center space-x-2">
            <span className="font-medium">Connection Error:</span>
            <span>{error}</span>
          </div>
          <p className="text-sm mt-1 opacity-80">
            Retrying automatically every 30 seconds...
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {markets.map((market) => (
          <MarketCard
            key={market.id}
            {...market}
            onClick={() => market.id !== 'tvl' && setSelectedCoin(market.symbol)}
          />
        ))}
      </div>

      {selectedCoin && (
        <EnhancedChart
          symbol={selectedCoin}
          onClose={() => setSelectedCoin(null)}
          currentPrice={markets.find(m => m.symbol === selectedCoin)?.currentPrice || 0}
          priceChange={markets.find(m => m.symbol === selectedCoin)?.priceChange || 0}
        />
      )}
    </div>
  );
};

export default MarketOverview;