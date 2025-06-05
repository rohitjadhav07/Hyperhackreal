import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, ArrowRight, X } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import axios from 'axios';

interface MarketCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  data: any[];
  onClick: () => void;
}

interface DetailedChartProps {
  coin: string;
  data: any[];
  onClose: () => void;
  currentPrice: number;
  priceChange: number;
}

const DetailedChart: React.FC<DetailedChartProps> = ({ coin, data, onClose, currentPrice, priceChange }) => {
  const [timeframe, setTimeframe] = useState('24h');
  const [chartData, setChartData] = useState<any[]>([]);
  const [chartError, setChartError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      setIsLoading(true);
      setChartError(null);
      
      try {
        const days = timeframe === '24h' ? 1 : timeframe === '7d' ? 7 : timeframe === '30d' ? 30 : 365;
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coin.toLowerCase()}/market_chart`,
          {
            params: {
              vs_currency: 'usd',
              days: days,
              interval: timeframe === '24h' ? 'hourly' : 'daily'
            },
            timeout: 10000 // 10 second timeout
          }
        );

        const formattedData = response.data.prices.map(([timestamp, price]: [number, number]) => ({
          timestamp: new Date(timestamp).toLocaleString(),
          value: price
        }));

        setChartData(formattedData);
      } catch (error) {
        console.error('Error fetching historical data:', error);
        setChartError('Failed to load historical chart data. This might be due to temporary network issues or API rate limits. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistoricalData();
  }, [coin, timeframe]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-xl w-full max-w-4xl p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-bold">{coin} Price Chart</h3>
            <div className="flex items-center mt-2">
              <span className="text-2xl font-bold mr-3">
                ${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
              <span className={`flex items-center ${priceChange >= 0 ? 'text-green-500' : 'text-rose-500'}`}>
                {priceChange >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                <span className="ml-1">{priceChange.toFixed(2)}%</span>
              </span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <div className="flex space-x-2 mb-4">
          {['24h', '7d', '30d', '1y'].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1 rounded-lg ${
                timeframe === tf ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>

        <div className="h-96 w-full">
          {isLoading ? (
            <div className="h-full flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
            </div>
          ) : chartError ? (
            <div className="h-full flex items-center justify-center">
              <div className="bg-rose-500/10 border border-rose-500/20 text-rose-500 p-4 rounded-lg max-w-md text-center">
                {chartError}
                <button
                  onClick={() => setTimeframe(timeframe)} // Retrigger data fetch
                  className="mt-2 px-4 py-2 bg-rose-500/20 hover:bg-rose-500/30 rounded-lg text-sm"
                >
                  Retry
                </button>
              </div>
            </div>
          ) : (
            <ResponsiveContainer>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="timestamp"
                  stroke="#9ca3af"
                  tick={{ fill: '#9ca3af' }}
                  tickFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <YAxis
                  stroke="#9ca3af"
                  tick={{ fill: '#9ca3af' }}
                  domain={['auto', 'auto']}
                  tickFormatter={(value) => `$${value.toLocaleString()}`}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '0.5rem' }}
                  labelStyle={{ color: '#9ca3af' }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Price']}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#6366f1"
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-sm text-gray-400">Market Cap</p>
            <p className="text-lg font-bold">$1.2B</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-sm text-gray-400">24h Volume</p>
            <p className="text-lg font-bold">$234.5M</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-sm text-gray-400">Circulating Supply</p>
            <p className="text-lg font-bold">21M</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const MarketCard: React.FC<MarketCardProps> = ({ title, value, change, isPositive, data, onClick }) => {
  return (
    <div className="card p-4 flex flex-col space-y-2 cursor-pointer hover:border-indigo-500/50\" onClick={onClick}>
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
  const [currentPrices, setCurrentPrices] = useState({
    btc: { usd: 0, usd_24h_change: 0, market_cap: 0, total_volume: 0 },
    eth: { usd: 0, usd_24h_change: 0, market_cap: 0, total_volume: 0 },
    metis: { usd: 0, usd_24h_change: 0, market_cap: 0, total_volume: 0 }
  });
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        setError(null);
        const [priceResponse, marketResponse] = await Promise.all([
          axios.get('https://api.coingecko.com/api/v3/simple/price', {
            params: {
              ids: 'bitcoin,ethereum,metis-token',
              vs_currencies: 'usd',
              include_24hr_change: true,
              include_market_cap: true,
              include_24hr_vol: true
            }
          }),
          axios.get('https://api.coingecko.com/api/v3/coins/markets', {
            params: {
              vs_currency: 'usd',
              ids: 'bitcoin,ethereum,metis-token',
              order: 'market_cap_desc',
              per_page: 3,
              sparkline: true
            }
          })
        ]);

        const priceData = priceResponse.data;
        const marketDataResponse = marketResponse.data;

        setCurrentPrices({
          btc: {
            usd: priceData.bitcoin.usd,
            usd_24h_change: priceData.bitcoin.usd_24h_change,
            market_cap: priceData.bitcoin.usd_market_cap,
            total_volume: priceData.bitcoin.usd_24h_vol
          },
          eth: {
            usd: priceData.ethereum.usd,
            usd_24h_change: priceData.ethereum.usd_24h_change,
            market_cap: priceData.ethereum.usd_market_cap,
            total_volume: priceData.ethereum.usd_24h_vol
          },
          metis: {
            usd: priceData['metis-token'].usd,
            usd_24h_change: priceData['metis-token'].usd_24h_change,
            market_cap: priceData['metis-token'].usd_market_cap,
            total_volume: priceData['metis-token'].usd_24h_vol
          }
        });

        // Update sparkline data from market response
        const formattedMarketData = marketDataResponse.map((coin: any) => {
          return coin.sparkline_in_7d.price.map((price: number, index: number) => ({
            timestamp: new Date(Date.now() - (168 - index) * 3600000).toISOString(),
            value: price
          }));
        }).flat();

        setMarketData(formattedMarketData);
        setLastUpdate(new Date());
      } catch (error) {
        console.error('Error fetching market data:', error);
        setError('Unable to fetch market data. Please try again later.');
      }
    };

    // Initial fetch
    fetchMarketData();

    // Update every 15 seconds
    const interval = setInterval(fetchMarketData, 15000);

    return () => clearInterval(interval);
  }, []);

  const calculateTVL = () => {
    const btcTVL = currentPrices.btc.market_cap * 0.4; // 40% of market
    const ethTVL = currentPrices.eth.market_cap * 0.35; // 35% of market
    const metisTVL = currentPrices.metis.market_cap * 0.25; // 25% of market
    return btcTVL + ethTVL + metisTVL;
  };

  const formatValue = (value: number) => {
    if (value >= 1e9) {
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
      id: 'bitcoin',
      title: 'BTC/USD',
      value: formatValue(currentPrices.btc.usd),
      change: formatChange(currentPrices.btc.usd_24h_change),
      isPositive: currentPrices.btc.usd_24h_change >= 0,
      chartData: marketData.slice(0, 168),
      currentPrice: currentPrices.btc.usd,
      priceChange: currentPrices.btc.usd_24h_change
    },
    {
      id: 'ethereum',
      title: 'ETH/USD',
      value: formatValue(currentPrices.eth.usd),
      change: formatChange(currentPrices.eth.usd_24h_change),
      isPositive: currentPrices.eth.usd_24h_change >= 0,
      chartData: marketData.slice(168, 336),
      currentPrice: currentPrices.eth.usd,
      priceChange: currentPrices.eth.usd_24h_change
    },
    {
      id: 'metis-token',
      title: 'METIS/USD',
      value: formatValue(currentPrices.metis.usd),
      change: formatChange(currentPrices.metis.usd_24h_change),
      isPositive: currentPrices.metis.usd_24h_change >= 0,
      chartData: marketData.slice(336, 504),
      currentPrice: currentPrices.metis.usd,
      priceChange: currentPrices.metis.usd_24h_change
    },
    {
      id: 'tvl',
      title: 'Total TVL',
      value: formatValue(calculateTVL()),
      change: formatChange(
        ((calculateTVL() - calculateTVL() * 0.975) / (calculateTVL() * 0.975)) * 100
      ),
      isPositive: true,
      chartData: marketData.slice(0, 168),
      currentPrice: calculateTVL(),
      priceChange: 2.5
    }
  ];

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold">Market Overview</h2>
          <p className="text-sm text-gray-400">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </p>
        </div>
        <button className="btn btn-ghost text-sm">
          <span>View All</span>
          <ArrowRight size={16} className="ml-1" />
        </button>
      </div>
      
      {error && (
        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-500 p-4 rounded-lg mb-4">
          {error}
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
        <DetailedChart
          coin={selectedCoin}
          data={markets.find(m => m.id === selectedCoin)?.chartData || []}
          onClose={() => setSelectedCoin(null)}
          currentPrice={markets.find(m => m.id === selectedCoin)?.currentPrice || 0}
          priceChange={markets.find(m => m.id === selectedCoin)?.priceChange || 0}
        />
      )}
    </div>
  );
};

export default MarketOverview;