import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, BarChart3, Activity, Volume2 } from 'lucide-react';
import { coinMarketCapService, HistoricalData, OHLCVData } from '../../services/coinMarketCapApi';
import CandlestickChart from './CandlestickChart';

interface AdvancedChartProps {
  symbol: string;
  onClose: () => void;
  currentPrice: number;
  priceChange: number;
}

type ChartType = 'line' | 'area' | 'candlestick' | 'volume';
type TimeRange = '1D' | '7D' | '30D' | '90D' | '1Y';

const AdvancedChart: React.FC<AdvancedChartProps> = ({ symbol, onClose, currentPrice, priceChange }) => {
  const [chartType, setChartType] = useState<ChartType>('area');
  const [timeRange, setTimeRange] = useState<TimeRange>('7D');
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([]);
  const [ohlcvData, setOhlcvData] = useState<OHLCVData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getTimeRangeParams = (range: TimeRange) => {
    const now = new Date();
    const timeEnd = now.toISOString();
    let timeStart: string;
    let interval: string;

    switch (range) {
      case '1D':
        timeStart = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
        interval = '1h';
        break;
      case '7D':
        timeStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
        interval = '4h';
        break;
      case '30D':
        timeStart = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
        interval = '1d';
        break;
      case '90D':
        timeStart = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000).toISOString();
        interval = '1d';
        break;
      case '1Y':
        timeStart = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000).toISOString();
        interval = '7d';
        break;
      default:
        timeStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
        interval = '4h';
    }

    return { timeStart, timeEnd, interval };
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { timeStart, timeEnd, interval } = getTimeRangeParams(timeRange);

        if (chartType === 'candlestick') {
          const ohlcv = await coinMarketCapService.getOHLCVData(
            symbol,
            timeStart,
            timeEnd,
            interval as any
          );
          setOhlcvData(ohlcv);
        } else {
          const historical = await coinMarketCapService.getHistoricalQuotes(
            symbol,
            timeStart,
            timeEnd,
            interval as any
          );
          setHistoricalData(historical);
        }
      } catch (error) {
        console.error('Error fetching chart data:', error);
        setError('Failed to load chart data. Using demo data for visualization.');
        
        // Generate demo data as fallback
        const demoData = generateDemoData(timeRange);
        setHistoricalData(demoData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [symbol, timeRange, chartType]);

  const generateDemoData = (range: TimeRange): HistoricalData[] => {
    const points = range === '1D' ? 24 : range === '7D' ? 168 : range === '30D' ? 30 : range === '90D' ? 90 : 365;
    const data: HistoricalData[] = [];
    let basePrice = currentPrice;
    
    for (let i = points; i >= 0; i--) {
      const timestamp = new Date(Date.now() - i * (range === '1D' ? 3600000 : 86400000)).toISOString();
      const volatility = 0.02 + Math.random() * 0.03;
      const change = (Math.random() - 0.5) * volatility;
      basePrice = basePrice * (1 + change);
      
      data.push({
        timestamp,
        price: basePrice,
        volume: Math.random() * 1000000000,
        market_cap: basePrice * 21000000,
      });
    }
    
    return data;
  };

  const formatChartData = (data: HistoricalData[]) => {
    return data.map(item => ({
      timestamp: new Date(item.timestamp).toLocaleDateString(),
      price: item.price,
      volume: item.volume,
      market_cap: item.market_cap,
    }));
  };

  const chartData = formatChartData(historicalData);

  const renderChart = () => {
    if (isLoading) {
      return (
        <div className="h-96 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
        </div>
      );
    }

    if (error && chartData.length === 0) {
      return (
        <div className="h-96 flex items-center justify-center">
          <div className="text-center">
            <p className="text-rose-500 mb-2">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary text-sm"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    switch (chartType) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="timestamp" stroke="#9ca3af" tick={{ fill: '#9ca3af' }} />
              <YAxis 
                stroke="#9ca3af" 
                tick={{ fill: '#9ca3af' }}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '0.5rem' }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Price']}
              />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="#6366f1" 
                strokeWidth={2} 
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'area':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="timestamp" stroke="#9ca3af" tick={{ fill: '#9ca3af' }} />
              <YAxis 
                stroke="#9ca3af" 
                tick={{ fill: '#9ca3af' }}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '0.5rem' }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Price']}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#6366f1"
                fillOpacity={1}
                fill="url(#colorPrice)"
              />
            </AreaChart>
          </ResponsiveContainer>
        );

      case 'candlestick':
        return ohlcvData.length > 0 ? (
          <CandlestickChart data={ohlcvData} height={400} />
        ) : (
          <div className="h-96 flex items-center justify-center">
            <p className="text-gray-400">Candlestick data not available</p>
          </div>
        );

      case 'volume':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="timestamp" stroke="#9ca3af" tick={{ fill: '#9ca3af' }} />
              <YAxis 
                stroke="#9ca3af" 
                tick={{ fill: '#9ca3af' }}
                tickFormatter={(value) => `$${(value / 1e9).toFixed(1)}B`}
              />
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '0.5rem' }}
                formatter={(value: number) => [`$${(value / 1e9).toFixed(2)}B`, 'Volume']}
              />
              <Area
                type="monotone"
                dataKey="volume"
                stroke="#22c55e"
                fillOpacity={1}
                fill="url(#colorVolume)"
              />
            </AreaChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-xl w-full max-w-6xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-bold">{symbol} Advanced Chart</h3>
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
            ✕
          </button>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex space-x-2">
            <span className="text-sm text-gray-400">Chart Type:</span>
            {[
              { type: 'area' as ChartType, icon: <Activity size={16} />, label: 'Area' },
              { type: 'line' as ChartType, icon: <TrendingUp size={16} />, label: 'Line' },
              { type: 'candlestick' as ChartType, icon: <BarChart3 size={16} />, label: 'Candlestick' },
              { type: 'volume' as ChartType, icon: <Volume2 size={16} />, label: 'Volume' },
            ].map(({ type, icon, label }) => (
              <button
                key={type}
                onClick={() => setChartType(type)}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm ${
                  chartType === type ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {icon}
                <span>{label}</span>
              </button>
            ))}
          </div>

          <div className="flex space-x-2">
            <span className="text-sm text-gray-400">Time Range:</span>
            {(['1D', '7D', '30D', '90D', '1Y'] as TimeRange[]).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 rounded-lg text-sm ${
                  timeRange === range ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="bg-amber-500/10 border border-amber-500/20 text-amber-500 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          {renderChart()}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-sm text-gray-400">Market Cap</p>
            <p className="text-lg font-bold">${(currentPrice * 21000000).toLocaleString()}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-sm text-gray-400">24h Volume</p>
            <p className="text-lg font-bold">$2.34B</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-sm text-gray-400">Circulating Supply</p>
            <p className="text-lg font-bold">21M {symbol}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-sm text-gray-400">All Time High</p>
            <p className="text-lg font-bold">${(currentPrice * 1.2).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedChart;