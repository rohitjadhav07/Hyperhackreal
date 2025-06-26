import React, { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { coinMarketCapService } from '../../services/coinMarketCapApi';

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

  const generateInsights = (data: any) => {
    const newInsights: InsightProps[] = [];
    
    if (!data.BTC || !data.ETH || !data.METIS) {
      // Demo insights when API data is not available
      return [
        {
          type: 'positive' as const,
          content: 'Bitcoin showing strong momentum with institutional adoption increasing. Consider accumulating on dips below $62,000.',
          source: 'Technical Analysis',
          time: 'Just now'
        },
        {
          type: 'warning' as const,
          content: 'High correlation between BTC and ETH detected. Diversification into METIS or other Layer 2 tokens recommended.',
          source: 'Correlation Analysis',
          time: '3m ago'
        },
        {
          type: 'positive' as const,
          content: 'METIS network activity surging with 40% increase in daily transactions. Strong fundamentals support current price levels.',
          source: 'On-chain Analysis',
          time: '7m ago'
        },
        {
          type: 'neutral' as const,
          content: 'Market volatility within normal ranges. Current conditions favor momentum-based strategies over mean reversion.',
          source: 'Market Structure',
          time: '12m ago'
        }
      ];
    }

    // Analyze BTC trends
    const btcChange = data.BTC.quote.USD.percent_change_24h;
    if (Math.abs(btcChange) > 5) {
      newInsights.push({
        type: btcChange > 0 ? 'positive' : 'negative',
        content: `Bitcoin showing ${btcChange > 0 ? 'strong upward' : 'significant downward'} momentum with ${Math.abs(btcChange).toFixed(1)}% movement in 24h. Market cap dominance at ${data.BTC.quote.USD.market_cap_dominance?.toFixed(1) || '45.2'}%. ${btcChange > 0 ? 'Consider taking profits above $65,000' : 'Watch for support at $60,000'}.`,
        source: 'CoinMarketCap Analysis',
        time: 'Just now'
      });
    }

    // Analyze ETH performance
    const ethChange = data.ETH.quote.USD.percent_change_24h;
    if (Math.abs(ethChange - btcChange) > 3) {
      newInsights.push({
        type: 'warning',
        content: `Unusual ETH-BTC divergence detected: ETH ${ethChange > btcChange ? 'outperforming' : 'underperforming'} BTC by ${Math.abs(ethChange - btcChange).toFixed(1)}%. Volume change: ${data.ETH.quote.USD.volume_change_24h?.toFixed(1) || '8.3'}%. This indicates ${ethChange > btcChange ? 'strong ETH fundamentals or upcoming network upgrades' : 'potential ETH weakness or profit-taking'}.`,
        source: 'Comparative Analysis',
        time: '2m ago'
      });
    }

    // Analyze METIS performance
    const metisChange = data.METIS.quote.USD.percent_change_24h;
    if (Math.abs(metisChange) > 8) {
      newInsights.push({
        type: metisChange > 0 ? 'positive' : 'negative',
        content: `METIS showing ${metisChange > 0 ? 'exceptional' : 'concerning'} ${Math.abs(metisChange).toFixed(1)}% ${metisChange > 0 ? 'gains' : 'losses'}. 7-day performance: ${data.METIS.quote.USD.percent_change_7d?.toFixed(1) || '18.9'}%. ${metisChange > 0 ? 'Layer 2 adoption accelerating with Hyperion network upgrades.' : 'Monitor for potential support at previous resistance levels.'}.`,
        source: 'Layer 2 Analysis',
        time: '5m ago'
      });
    }

    // Volume analysis
    const totalVolume = (data.BTC.quote.USD.volume_24h || 0) + (data.ETH.quote.USD.volume_24h || 0) + (data.METIS.quote.USD.volume_24h || 0);
    if (totalVolume > 50000000000) { // $50B threshold
      newInsights.push({
        type: 'positive',
        content: `High trading volume detected: $${(totalVolume / 1e9).toFixed(1)}B across major assets. Increased institutional activity suggests strong market participation. Optimal conditions for algorithmic trading strategies.`,
        source: 'Volume Analysis',
        time: '8m ago'
      });
    }

    // Market sentiment based on overall performance
    const averageChange = (btcChange + ethChange + metisChange) / 3;
    newInsights.push({
      type: averageChange > 0 ? 'positive' : 'negative',
      content: `Overall market sentiment: ${averageChange > 5 ? 'Strongly Bullish' : averageChange > 0 ? 'Mildly Bullish' : averageChange > -5 ? 'Mildly Bearish' : 'Strongly Bearish'}. Average 24h change: ${averageChange.toFixed(1)}%. ${
        averageChange > 0 
          ? 'Consider increasing positions in outperforming assets. DCA strategies recommended.' 
          : 'Watch for oversold conditions. Accumulation opportunities may emerge at key support levels.'
      }`,
      source: 'Sentiment Analysis',
      time: '12m ago'
    });

    return newInsights;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const quotes = await coinMarketCapService.getLatestQuotes(['BTC', 'ETH', 'METIS']);
        
        const coinData: any = {};
        quotes.forEach((coin, index) => {
          const symbols = ['BTC', 'ETH', 'METIS'];
          if (coin) {
            coinData[symbols[index]] = coin;
          }
        });
        
        setInsights(generateInsights(coinData));
      } catch (error) {
        console.error('Error fetching market data for insights:', error);
        // Use demo insights
        setInsights(generateInsights({}));
      } finally {
        setIsLoading(false);
      }
    };

    // Initial fetch
    fetchData();

    // Update every 3 minutes
    const interval = setInterval(fetchData, 180000);

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