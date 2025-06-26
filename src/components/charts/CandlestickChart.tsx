import React from 'react';
import { ResponsiveContainer, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, Bar, Line } from 'recharts';
import { OHLCVData } from '../../services/coinMarketCapApi';

interface CandlestickChartProps {
  data: OHLCVData[];
  height?: number;
}

interface CandlestickBarProps {
  payload?: OHLCVData;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

const CandlestickBar: React.FC<CandlestickBarProps> = ({ payload, x = 0, y = 0, width = 0 }) => {
  if (!payload) return null;

  const { open, high, low, close } = payload;
  const isGreen = close > open;
  const color = isGreen ? '#22c55e' : '#ef4444';
  
  const bodyHeight = Math.abs(close - open);
  const bodyY = Math.min(open, close);
  const wickTop = high;
  const wickBottom = low;
  
  // Scale values (this is simplified - in real implementation you'd need proper scaling)
  const scale = 100; // This should be calculated based on the chart's scale
  const centerX = x + width / 2;
  
  return (
    <g>
      {/* High-Low wick */}
      <line
        x1={centerX}
        y1={y - (wickTop - bodyY) * scale}
        x2={centerX}
        y2={y - (wickBottom - bodyY) * scale}
        stroke={color}
        strokeWidth={1}
      />
      {/* Open-Close body */}
      <rect
        x={x + width * 0.2}
        y={y - bodyHeight * scale}
        width={width * 0.6}
        height={bodyHeight * scale}
        fill={isGreen ? color : 'transparent'}
        stroke={color}
        strokeWidth={1}
      />
    </g>
  );
};

const CandlestickChart: React.FC<CandlestickChartProps> = ({ data, height = 400 }) => {
  const formatData = data.map(item => ({
    ...item,
    timestamp: new Date(item.time_close).toLocaleDateString(),
    body: [item.open, item.close],
    wick: [item.low, item.high],
  }));

  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={formatData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="timestamp" 
            stroke="#9ca3af"
            tick={{ fill: '#9ca3af', fontSize: 12 }}
          />
          <YAxis 
            stroke="#9ca3af"
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            domain={['dataMin - 100', 'dataMax + 100']}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />
          <Tooltip
            contentStyle={{ 
              backgroundColor: '#1f2937', 
              border: 'none', 
              borderRadius: '0.5rem',
              color: '#f9fafb'
            }}
            formatter={(value: any, name: string) => {
              if (name === 'volume') {
                return [`$${value.toLocaleString()}`, 'Volume'];
              }
              return [`$${value.toFixed(2)}`, name];
            }}
            labelFormatter={(label) => `Date: ${label}`}
          />
          <Bar 
            dataKey="volume" 
            fill="#6366f1" 
            opacity={0.3}
            yAxisId="volume"
          />
          <Line 
            type="monotone" 
            dataKey="close" 
            stroke="#22c55e" 
            strokeWidth={2}
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CandlestickChart;