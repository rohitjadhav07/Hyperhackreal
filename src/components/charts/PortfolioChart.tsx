import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area } from 'recharts';

interface PortfolioChartProps {
  height?: number;
  type?: 'line' | 'area';
}

const PortfolioChart: React.FC<PortfolioChartProps> = ({ height = 300, type = 'area' }) => {
  // Generate realistic portfolio performance data
  const generatePortfolioData = () => {
    const data = [];
    const startValue = 70000;
    let currentValue = startValue;
    const days = 30;
    
    for (let i = days; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      // Simulate portfolio growth with some volatility
      const dailyChange = (Math.random() - 0.45) * 0.03; // Slight upward bias
      currentValue = currentValue * (1 + dailyChange);
      
      data.push({
        date: date.toLocaleDateString(),
        value: Math.round(currentValue),
        timestamp: date.toISOString(),
      });
    }
    
    return data;
  };

  const portfolioData = generatePortfolioData();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      const change = portfolioData.length > 1 ? value - portfolioData[0].value : 0;
      const changePercent = portfolioData.length > 1 ? ((change / portfolioData[0].value) * 100) : 0;
      
      return (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg">
          <p className="text-gray-300 text-sm mb-1">{label}</p>
          <p className="text-white font-medium">
            ${value.toLocaleString()}
          </p>
          <p className={`text-sm ${change >= 0 ? 'text-green-500' : 'text-rose-500'}`}>
            {change >= 0 ? '+' : ''}${change.toLocaleString()} ({changePercent >= 0 ? '+' : ''}{changePercent.toFixed(2)}%)
          </p>
        </div>
      );
    }
    return null;
  };

  if (type === 'area') {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={portfolioData}>
          <defs>
            <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="date" 
            stroke="#9ca3af" 
            tick={{ fill: '#9ca3af', fontSize: 12 }}
          />
          <YAxis 
            stroke="#9ca3af" 
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#6366f1"
            fillOpacity={1}
            fill="url(#portfolioGradient)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={portfolioData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis 
          dataKey="date" 
          stroke="#9ca3af" 
          tick={{ fill: '#9ca3af', fontSize: 12 }}
        />
        <YAxis 
          stroke="#9ca3af" 
          tick={{ fill: '#9ca3af', fontSize: 12 }}
          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke="#6366f1" 
          strokeWidth={2} 
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PortfolioChart;