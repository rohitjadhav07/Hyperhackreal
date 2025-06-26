import React, { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { coinGeckoService, CoinGeckoPrice } from '../../services/coinGeckoApi';

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
  const [isLoading, setIsLoading] = useState(true);

  const generateInsights = (coins: CoinGeckoPrice[]) => {
    const newInsights: InsightProps[] = [];
    
    if (coins.length === 0) {
      // Default insights when no data is available
      return [
        {
          type: 'neutral' as const,
          content: 'Market data is currently being fetched. AI analysis will be available shortly.',
          source: 'System Status',
          time: 'Just now'
        }
      ];
    }

    const btc = coins.find(coin => coin.id === 'bitcoin');
    const eth = coins.find(coin => coin.id === 'ethereum');
    const metis = coins.find(coin => coin.id === 'metis-token');

    // Analyze BTC trends
    if (btc) {
      const btcChange = btc.price_change_percentage_24h;
      if (Math.abs(btcChange) > 3) {
        newInsights.push({
          type: btcChange > 0 ? 'positive' : 'negative',
          content: `Bitcoin showing ${btcChange > 0 ? 'strong upward' : 'significant downward'} momentum with ${Math.abs(btcChange).toFixed(1)}% movement in 24h. Market cap: $${(btc.market_cap / 1e12).toFixed(2)}T. ${btcChange > 0 ? 'Consider taking profits above $70,000' : 'Watch for support at $60,000'}.`,
          source: 'CoinGecko Analysis',
          time: 'Just now'
        });
      }

      // Volume analysis
      if (btc.total_volume > btc.market_cap * 0.05) {
        newInsights.push({
          type: 'positive',
          content: `High Bitcoin trading volume detected: $${(btc.total_volume / 1e9).toFixed(1)}B (${((btc.total_volume / btc.market_cap) * 100).toFixed(1)}% of market cap). Increased institutional activity suggests strong market participation.`,
          source: 'Volume Analysis',
          time: '2m ago'
        });
      }
    }

    // Analyze ETH performance
    if (eth && btc) {
      const ethChange = eth.price_change_percentage_24h;
      const btcChange = btc.price_change_percentage_24h;
      
      if (Math.abs(ethChange - btcChange) > 2) {
        newInsights.push({
          type: 'warning',
          content: `ETH-BTC divergence detected: ETH ${ethChange > btcChange ? 'outperforming' : 'underperforming'} BTC by ${Math.abs(ethChange - btcChange).toFixed(1)}%. ETH 7d change: ${eth.price_change_percentage_7d_in_currency?.toFixed(1) || 'N/A'}%. This indicates ${ethChange > btcChange ? 'strong ETH fundamentals or upcoming network activity' : 'potential ETH weakness or profit-taking'}.`,
          source: 'Comparative Analysis',
          time: '5m ago'
        });
      }
    }

    // Analyze METIS performance
    if (metis) {
      const metisChange = metis.price_change_percentage_24h;
      if (Math.abs(metisChange) > 5) {
        newInsights.push({
          type: metisChange > 0 ? 'positive' : 'negative',
          content: `METIS showing ${metisChange > 0 ? 'exceptional' : 'concerning'} ${Math.abs(metisChange).toFixed(1)}% ${metisChange > 0 ? 'gains' : 'losses'}. 7-day performance: ${metis.price_change_percentage_7d_in_currency?.toFixed(1) || 'N/A'}%. Market cap rank: #${metis.market_cap_rank}. ${metisChange > 0 ? 'Layer 2 adoption accelerating with network upgrades.' : 'Monitor for potential support levels.'}.`,
          source: 'Layer 2 Analysis',
          time: '8m ago'
        });
      }
    }

    // Market sentiment analysis
    if (btc && eth && metis) {
      const averageChange = (btc.price_change_percentage_24h + eth.price_change_percentage_24h + metis.price_change_percentage_24h) / 3;
      const totalMarketCap = btc.market_cap + eth.market_cap + metis.market_cap;
      
      newInsights.push({
        type: averageChange > 0 ? 'positive' : 'negative',
        content: `Overall market sentiment: ${averageChange > 3 ? 'Strongly Bullish' : averageChange > 0 ? 'Mildly Bullish' : averageChange > -3 ? 'Mildly Bearish' : 'Strongly Bearish'}. Combined market cap: $${(totalMarketCap / 1e12).toFixed(2)}T. ${
          averageChange > 0 
            ? 'Consider increasing positions in outperforming assets. DCA strategies recommended.' 
            : 'Watch for oversold conditions. Accumulation opportunities may emerge at key support levels.'
        }`,
        source: 'Market Sentiment',
        time: '12m ago'
      });
    }

    // Risk assessment
    if (coins.length > 0) {
      const volatilityScore = coins.reduce((acc, coin) => acc + Math.abs(coin.price_change_percentage_24h), 0) / coins.length;
      newInsights.push({
        type: volatilityScore > 5 ? 'warning' : 'neutral',
        content: `Market volatility index: ${volatilityScore.toFixed(1)}% (${volatilityScore > 5 ? 'High' : volatilityScore > 2 ? 'Medium' : 'Low'}). ${volatilityScore > 5 ? 'Consider adjusting stop losses and position sizes.' : 'Stable conditions favor momentum strategies.'}`,
        source: 'Risk Assessment',
        time: '15m ago'
      });
    }

    return newInsights.slice(0, 4); // Limit to 4 insights
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const coins = await coinGeckoService.getCoinsMarkets(
          ['bitcoin', 'ethereum', 'metis-token'],
          {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 3,
            page: 1,
            sparkline: false,
            price_change_percentage: '1h,24h,7d,30d'
          }
        );
        
        setInsights(generateInsights(coins));
      } catch (error) {
        console.error('Error fetching market data for insights:', error);
        // Use default insights
        setInsights(generateInsights([]));
      } finally {
        setIsLoading(false);
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
        <div className="flex items-center space-x-2">
          <div className="text-xs px-2 py-1 rounded bg-indigo-500/20 text-indigo-300">
            Live Analysis
          </div>
          {isLoading && (
            <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          )}
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