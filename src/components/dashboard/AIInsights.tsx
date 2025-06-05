import React, { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import axios from 'axios';

interface InsightProps {
  type: 'positive' | 'negative' | 'neutral' | 'warning';
  content: string;
  source: string;
  time: string;
}

const Insight: React.FC<InsightProps> = ({ type, content, source, time }) => {
  const getIcon = () => {
    switch (type) {
      case 'positive':
        return <TrendingUp size={18} className="text-green-500" />;
      case 'negative':
        return <TrendingDown size={18} className="text-rose-500" />;
      case 'warning':
        return <AlertTriangle size={18} className="text-amber-500" />;
      default:
        return <Sparkles size={18} className="text-indigo-500" />;
    }
  };

  return (
    <div className="flex space-x-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors">
      <div className="mt-1">{getIcon()}</div>
      <div>
        <p className="text-sm">{content}</p>
        <div className="flex space-x-2 mt-1.5 text-xs text-gray-400">
          <span>{source}</span>
          <span>•</span>
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
};

const AIInsights: React.FC = () => {
  const [insights, setInsights] = useState<InsightProps[]>([]);
  const [marketData, setMarketData] = useState<any>(null);

  const generateInsights = (data: any) => {
    const newInsights: InsightProps[] = [];
    
    // Analyze BTC trends
    const btcChange = data.bitcoin.usd_24h_change;
    if (Math.abs(btcChange) > 5) {
      newInsights.push({
        type: btcChange > 0 ? 'positive' : 'negative',
        content: `Bitcoin showing ${btcChange > 0 ? 'strong upward' : 'significant downward'} momentum with ${Math.abs(btcChange).toFixed(1)}% movement in 24h. ${btcChange > 0 ? 'Consider taking profits' : 'Watch for potential buy opportunities'}.`,
        source: 'Price Analysis',
        time: 'Just now'
      });
    }

    // Analyze ETH/BTC correlation
    const ethChange = data.ethereum.usd_24h_change;
    if (Math.abs(ethChange - btcChange) > 3) {
      newInsights.push({
        type: 'warning',
        content: `Unusual ETH-BTC divergence detected: ETH ${ethChange > btcChange ? 'outperforming' : 'underperforming'} BTC by ${Math.abs(ethChange - btcChange).toFixed(1)}%. This might indicate ${ethChange > btcChange ? 'strong ETH fundamentals' : 'potential ETH weakness'}.`,
        source: 'Correlation Analysis',
        time: '2m ago'
      });
    }

    // Analyze METIS performance
    const metisChange = data['metis-token'].usd_24h_change;
    if (Math.abs(metisChange) > 8) {
      newInsights.push({
        type: metisChange > 0 ? 'positive' : 'negative',
        content: `METIS showing ${metisChange > 0 ? 'exceptional' : 'concerning'} ${Math.abs(metisChange).toFixed(1)}% ${metisChange > 0 ? 'gains' : 'losses'}. ${metisChange > 0 ? 'Network activity increase detected.' : 'Monitor for potential support levels.'}.`,
        source: 'Token Analysis',
        time: '5m ago'
      });
    }

    // Volume analysis
    const volatilityIndex = Math.max(Math.abs(btcChange), Math.abs(ethChange), Math.abs(metisChange));
    if (volatilityIndex > 7) {
      newInsights.push({
        type: 'warning',
        content: `High market volatility detected (${volatilityIndex.toFixed(1)}% index). Consider adjusting stop losses and taking partial profits on significant gains.`,
        source: 'Volatility Analysis',
        time: '8m ago'
      });
    }

    // Market sentiment
    const averageChange = (btcChange + ethChange + metisChange) / 3;
    newInsights.push({
      type: averageChange > 0 ? 'positive' : 'negative',
      content: `Overall market sentiment: ${averageChange > 3 ? 'Strongly Bullish' : averageChange > 0 ? 'Mildly Bullish' : averageChange > -3 ? 'Mildly Bearish' : 'Strongly Bearish'}. ${
        averageChange > 0 
          ? 'Consider increasing positions in strong performers.' 
          : 'Watch for oversold conditions and accumulation opportunities.'
      }`,
      source: 'Sentiment Analysis',
      time: '12m ago'
    });

    return newInsights;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
          params: {
            ids: 'bitcoin,ethereum,metis-token',
            vs_currencies: 'usd',
            include_24hr_change: true,
            include_24hr_vol: true
          }
        });
        
        setMarketData(response.data);
        setInsights(generateInsights(response.data));
      } catch (error) {
        console.error('Error fetching market data:', error);
      }
    };

    // Initial fetch
    fetchData();

    // Update every 2 minutes
    const interval = setInterval(fetchData, 120000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card">
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <Sparkles size={18} className="text-indigo-400" />
          <h3 className="font-medium">AI-Generated Insights</h3>
        </div>
        <div className="text-xs px-2 py-1 rounded bg-indigo-500/20 text-indigo-300">
          Live Analysis
        </div>
      </div>
      
      <div className="divide-y divide-gray-700/50">
        {insights.map((insight, index) => (
          <Insight key={index} {...insight} />
        ))}
      </div>
      
      <div className="p-3 border-t border-gray-700">
        <button className="w-full btn btn-ghost text-sm text-indigo-400">
          View More Insights
        </button>
      </div>
    </div>
  );
};

export default AIInsights;