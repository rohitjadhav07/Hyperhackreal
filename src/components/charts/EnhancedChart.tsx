import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area, ComposedChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, BarChart3, Activity, Volume2, X } from 'lucide-react';
import { coinGeckoService, HistoricalPrice, OHLCData } from '../../services/coinGeckoApi';

interface EnhancedChartProps {
  symbol: string;
  onClose: () => void;
  currentPrice: number;
  priceChange: number;
}

type ChartType = 'line' | 'area' | 'candlestick' | 'volume';
type TimeRange = '1D' | '7D' | '30D' | '90D' | '1Y';

const EnhancedChart: React.FC<EnhancedChartProps> = ({ symbol, onClose, currentPrice, priceChange }) => {
  const [chartType, setChartType] = useState<ChartType>('area');
  const [timeRange, setTimeRange] = useState<TimeRange>('7D');
  const [historicalData, setHistoricalData] = useState<HistoricalPrice[]>([]);
  const [ohlcData, setOhlcData] = useState<OHLCData[]>([]);
  const [coinDetails, setCoinDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getDaysFromRange = (range: TimeRange): number => {
    switch (range) {
      case '1D': return 1;
      case '7D': return 7;
      case '30D': return 30;
      case '90D': return 90;
      case '1Y': return 365;
      default: return 7;
    }
  };

  const getIntervalFromRange = (range: TimeRange): 'minutely' | 'hourly' | 'daily' | undefined => {
    switch (range) {
      case '1D': return 'hourly';
      case '7D': return 'hourly';
      case '30D': return 'daily';
      case '90D': return 'daily';
      case '1Y': return 'daily';
      default: return undefined;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const coinId = coinGeckoService.getCoinIdFromSymbol(symbol);
        const days = getDaysFromRange(timeRange);
        const interval = getIntervalFromRange(timeRange);

        // Fetch historical data
        const historical = await coinGeckoService.getHistoricalPrices(coinId, days, interval);
        setHistoricalData(historical);

        // Fetch OHLC data for candlestick charts
        if (chartType === 'candlestick') {
          const ohlc = await coinGeckoService.getOHLCData(coinId, days);
          setOhlcData(ohlc);
        }

        // Fetch coin details
        const details = await coinGeckoService.getCoinDetails(coinId);
        setCoinDetails(details);

      } catch (error) {
        console.error('Error fetching chart data:', error);
        setError('Failed to load chart data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [symbol, timeRange, chartType]);

  const formatChartData = (data: HistoricalPrice[]) => {
    return data.map(item => ({
      timestamp: new Date(item.timestamp).toLocaleDateString(),
      fullTimestamp: new Date(item.timestamp).toLocaleString(),
      price: item.price,
      volume: item.total_volume || 0,
      market_cap: item.market_cap || 0,
    }));
  };

  const formatOHLCData = (data: OHLCData[]) => {
    return data.map(item => ({
      timestamp: new Date(item.timestamp).toLocaleDateString(),
      fullTimestamp: new Date(item.timestamp).toLocaleString(),
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
    }));
  };

  const chartData = formatChartData(historicalData);
  const candlestickData = formatOHLCData(ohlcData);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg">
          <p className="text-gray-300 text-sm mb-2">{payload[0]?.payload?.fullTimestamp}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {
                entry.name === 'Volume' 
                  ? `$${(entry.value / 1e9).toFixed(2)}B`
                  : entry.name === 'Market Cap'
                  ? `$${(entry.value / 1e9).toFixed(2)}B`
                  : `$${entry.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
              }
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    if (isLoading) {
      return (
        <div className="h-96 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
        </div>
      );
    }

    if (error || chartData.length === 0) {
      return (
        <div className="h-96 flex items-center justify-center">
          <div className="text-center">
            <p className="text-rose-500 mb-2">{error || 'No data available'}</p>
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
              <XAxis 
                dataKey="timestamp" 
                stroke="#9ca3af" 
                tick={{ fill: '#9ca3af', fontSize: 12 }}
              />
              <YAxis 
                stroke="#9ca3af" 
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
                domain={['dataMin * 0.95', 'dataMax * 1.05']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="#6366f1" 
                strokeWidth={2} 
                dot={false}
                name="Price"
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
              <XAxis 
                dataKey="timestamp" 
                stroke="#9ca3af" 
                tick={{ fill: '#9ca3af', fontSize: 12 }}
              />
              <YAxis 
                stroke="#9ca3af" 
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
                domain={['dataMin * 0.95', 'dataMax * 1.05']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#6366f1"
                fillOpacity={1}
                fill="url(#colorPrice)"
                name="Price"
              />
            </AreaChart>
          </ResponsiveContainer>
        );

      case 'candlestick':
        return candlestickData.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={candlestickData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="timestamp" 
                stroke="#9ca3af" 
                tick={{ fill: '#9ca3af', fontSize: 12 }}
              />
              <YAxis 
                stroke="#9ca3af" 
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="close" 
                stroke="#22c55e" 
                strokeWidth={2}
                dot={false}
                name="Close Price"
              />
              <Line 
                type="monotone" 
                dataKey="high" 
                stroke="#ef4444" 
                strokeWidth={1}
                dot={false}
                name="High"
              />
              <Line 
                type="monotone" 
                dataKey="low" 
                stroke="#3b82f6" 
                strokeWidth={1}
                dot={false}
                name="Low"
              />
            </ComposedChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-96 flex items-center justify-center">
            <p className="text-gray-400">OHLC data not available for this timeframe</p>
          </div>
        );

      case 'volume':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="timestamp" 
                stroke="#9ca3af" 
                tick={{ fill: '#9ca3af', fontSize: 12 }}
              />
              <YAxis 
                yAxisId="volume"
                stroke="#9ca3af" 
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                tickFormatter={(value) => `$${(value / 1e9).toFixed(1)}B`}
              />
              <YAxis 
                yAxisId="price"
                orientation="right"
                stroke="#9ca3af" 
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                yAxisId="volume"
                dataKey="volume" 
                fill="#22c55e" 
                opacity={0.6}
                name="Volume"
              />
              <Line 
                yAxisId="price"
                type="monotone" 
                dataKey="price" 
                stroke="#6366f1" 
                strokeWidth={2}
                dot={false}
                name="Price"
              />
            </ComposedChart>
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
            <h3 className="text-xl font-bold">{symbol} Price Chart</h3>
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

        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex space-x-2">
            <span className="text-sm text-gray-400">Chart Type:</span>
            {[
              { type: 'area' as ChartType, icon: <Activity size={16} />, label: 'Area' },
              { type: 'line' as ChartType, icon: <TrendingUp size={16} />, label: 'Line' },
              { type: 'candlestick' as ChartType, icon: <BarChart3 size={16} />, label: 'OHLC' },
              { type: 'volume' as ChartType, icon: <Volume2 size={16} />, label: 'Volume' },
            ].map(({ type, icon, label }) => (
              <button
                key={type}
                onClick={() => setChartType(type)}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm transition-all ${
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
                className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                  timeRange === range ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-500 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          {renderChart()}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-sm text-gray-400">Market Cap</p>
            <p className="text-lg font-bold">
              {coinDetails?.market_data?.market_cap?.usd 
                ? `$${(coinDetails.market_data.market_cap.usd / 1e9).toFixed(2)}B`
                : 'N/A'
              }
            </p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-sm text-gray-400">24h Volume</p>
            <p className="text-lg font-bold">
              {coinDetails?.market_data?.total_volume?.usd 
                ? `$${(coinDetails.market_data.total_volume.usd / 1e9).toFixed(2)}B`
                : 'N/A'
              }
            </p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-sm text-gray-400">Circulating Supply</p>
            <p className="text-lg font-bold">
              {coinDetails?.market_data?.circulating_supply 
                ? `${(coinDetails.market_data.circulating_supply / 1e6).toFixed(2)}M`
                : 'N/A'
              }
            </p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-sm text-gray-400">All Time High</p>
            <p className="text-lg font-bold">
              {coinDetails?.market_data?.ath?.usd 
                ? `$${coinDetails.market_data.ath.usd.toLocaleString()}`
                : 'N/A'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedChart;