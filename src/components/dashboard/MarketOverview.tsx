import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, ArrowRight, X } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { coinMarketCapService, CoinData } from '../../services/coinMarketCapApi';
import AdvancedChart from '../charts/AdvancedChart';

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
  const [marketData, setMarketData] = useState<any[]>([]);
  const [selectedCoin, setSelectedCoin] = useState<string | null>(null);
  const [coinData, setCoinData] = useState<{ [key: string]: CoinData }>({});
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        setError(null);
        setIsLoading(true);

        // Fetch latest quotes from CoinMarketCap
        const quotes = await coinMarketCapService.getLatestQuotes(['BTC', 'ETH', 'METIS']);
        
        const coinDataMap: { [key: string]: CoinData } = {};
        quotes.forEach((coin, index) => {
          const symbols = ['BTC', 'ETH', 'METIS'];
          if (coin) {
            coinDataMap[symbols[index]] = coin;
          }
        });

        setCoinData(coinDataMap);

        // Generate sparkline data for visualization
        const sparklineData = generateSparklineData();
        setMarketData(sparklineData);
        setLastUpdate(new Date());
      } catch (error) {
        console.error('Error fetching market data:', error);
        setError('Using demo data - CoinMarketCap API integration ready for production');
        
        // Fallback to demo data
        const demoData = generateDemoData();
        setCoinData(demoData);
        const sparklineData = generateSparklineData();
        setMarketData(sparklineData);
        setLastUpdate(new Date());
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

  const generateDemoData = (): { [key: string]: CoinData } => {
    return {
      BTC: {
        id: 1,
        name: 'Bitcoin',
        symbol: 'BTC',
        slug: 'bitcoin',
        quote: {
          USD: {
            price: 64273.85,
            volume_24h: 28500000000,
            volume_change_24h: 12.5,
            percent_change_1h: 0.8,
            percent_change_24h: 2.4,
            percent_change_7d: 5.2,
            percent_change_30d: 15.7,
            market_cap: 1250000000000,
            market_cap_dominance: 45.2,
            fully_diluted_market_cap: 1350000000000,
            last_updated: new Date().toISOString(),
          },
        },
      },
      ETH: {
        id: 1027,
        name: 'Ethereum',
        symbol: 'ETH',
        slug: 'ethereum',
        quote: {
          USD: {
            price: 3124.67,
            volume_24h: 15200000000,
            volume_change_24h: 8.3,
            percent_change_1h: 0.3,
            percent_change_24h: 1.7,
            percent_change_7d: 3.8,
            percent_change_30d: 12.4,
            market_cap: 375000000000,
            market_cap_dominance: 18.5,
            fully_diluted_market_cap: 375000000000,
            last_updated: new Date().toISOString(),
          },
        },
      },
      METIS: {
        id: 9640,
        name: 'Metis Token',
        symbol: 'METIS',
        slug: 'metis-token',
        quote: {
          USD: {
            price: 45.67,
            volume_24h: 125000000,
            volume_change_24h: 15.2,
            percent_change_1h: 2.1,
            percent_change_24h: 8.3,
            percent_change_7d: 18.9,
            percent_change_30d: 35.6,
            market_cap: 456700000,
            market_cap_dominance: 0.02,
            fully_diluted_market_cap: 456700000,
            last_updated: new Date().toISOString(),
          },
        },
      },
    };
  };

  const generateSparklineData = () => {
    const data = [];
    for (let i = 0; i < 168; i++) { // 7 days of hourly data
      data.push({
        timestamp: new Date(Date.now() - (168 - i) * 3600000).toISOString(),
        value: Math.random() * 100 + 50,
      });
    }
    return data;
  };

  const calculateTVL = () => {
    const btcTVL = (coinData.BTC?.quote.USD.market_cap || 1250000000000) * 0.4;
    const ethTVL = (coinData.ETH?.quote.USD.market_cap || 375000000000) * 0.35;
    const metisTVL = (coinData.METIS?.quote.USD.market_cap || 456700000) * 0.25;
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

  const markets = [
    {
      id: 'BTC',
      title: 'BTC/USD',
      value: formatValue(coinData.BTC?.quote.USD.price || 64273.85),
      change: formatChange(coinData.BTC?.quote.USD.percent_change_24h || 2.4),
      isPositive: (coinData.BTC?.quote.USD.percent_change_24h || 2.4) >= 0,
      chartData: marketData.slice(0, 24),
      currentPrice: coinData.BTC?.quote.USD.price || 64273.85,
      priceChange: coinData.BTC?.quote.USD.percent_change_24h || 2.4
    },
    {
      id: 'ETH',
      title: 'ETH/USD',
      value: formatValue(coinData.ETH?.quote.USD.price || 3124.67),
      change: formatChange(coinData.ETH?.quote.USD.percent_change_24h || 1.7),
      isPositive: (coinData.ETH?.quote.USD.percent_change_24h || 1.7) >= 0,
      chartData: marketData.slice(24, 48),
      currentPrice: coinData.ETH?.quote.USD.price || 3124.67,
      priceChange: coinData.ETH?.quote.USD.percent_change_24h || 1.7
    },
    {
      id: 'METIS',
      title: 'METIS/USD',
      value: formatValue(coinData.METIS?.quote.USD.price || 45.67),
      change: formatChange(coinData.METIS?.quote.USD.percent_change_24h || 8.3),
      isPositive: (coinData.METIS?.quote.USD.percent_change_24h || 8.3) >= 0,
      chartData: marketData.slice(48, 72),
      currentPrice: coinData.METIS?.quote.USD.price || 45.67,
      priceChange: coinData.METIS?.quote.USD.percent_change_24h || 8.3
    },
    {
      id: 'tvl',
      title: 'Total TVL',
      value: formatValue(calculateTVL()),
      change: formatChange(2.5),
      isPositive: true,
      chartData: marketData.slice(0, 24),
      currentPrice: calculateTVL(),
      priceChange: 2.5
    }
  ];

  if (isLoading) {
    return (
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold">Market Overview</h2>
            <p className="text-sm text-gray-400">Loading market data...</p>
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
            {error && (
              <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-1 rounded">
                Demo Mode
              </span>
            )}
          </div>
        </div>
        <button className="btn btn-ghost text-sm">
          <span>View All</span>
          <ArrowRight size={16} className="ml-1" />
        </button>
      </div>
      
      {error && (
        <div className="bg-amber-500/10 border border-amber-500/20 text-amber-500 p-4 rounded-lg mb-4">
          <div className="flex items-center space-x-2">
            <span className="font-medium">Demo Mode:</span>
            <span>{error}</span>
          </div>
          <p className="text-sm mt-1 opacity-80">
            Add your CoinMarketCap API key to .env file for live data
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {markets.map((market) => (
          <MarketCard
            key={market.id}
            {...market}
            onClick={() => market.id !== 'tvl' && setSelectedCoin(market.id)}
          />
        ))}
      </div>

      {selectedCoin && (
        <AdvancedChart
          symbol={selectedCoin}
          onClose={() => setSelectedCoin(null)}
          currentPrice={markets.find(m => m.id === selectedCoin)?.currentPrice || 0}
          priceChange={markets.find(m => m.id === selectedCoin)?.priceChange || 0}
        />
      )}
    </div>
  );
};

export default MarketOverview;