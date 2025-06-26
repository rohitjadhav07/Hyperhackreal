import React, { useState, useEffect } from 'react';
import MarketOverview from '../components/dashboard/MarketOverview';
import AIInsights from '../components/dashboard/AIInsights';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import { LineChart, BarChart3, PieChart, Gauge, BrainCircuit, Send, Zap, Activity, TrendingUp } from 'lucide-react';
import { coinGeckoService } from '../services/coinGeckoApi';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const Dashboard: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Welcome to HyperTrade! I\'m Alith, your AI trading assistant. I can help you with market analysis, portfolio optimization, and trading strategies. How can I assist you today?',
      isUser: false,
      timestamp: new Date(Date.now() - 300000) // 5 minutes ago
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [marketData, setMarketData] = useState<any[]>([]);
  const [networkMetrics, setNetworkMetrics] = useState({
    tps: 1240,
    blockTime: 2.1,
    gasPrice: 0.00012,
    efficiency: 94,
    activeNodes: 847,
    totalTransactions: 2847392
  });

  // Fetch real market data for AI responses
  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const coins = await coinGeckoService.getCoinsMarkets(['bitcoin', 'ethereum', 'metis-token']);
        setMarketData(coins);
      } catch (error) {
        console.error('Error fetching market data for AI:', error);
      }
    };

    fetchMarketData();
    const interval = setInterval(fetchMarketData, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  // Simulate real-time network metrics updates
  useEffect(() => {
    const interval = setInterval(() => {
      setNetworkMetrics(prev => ({
        tps: prev.tps + Math.floor(Math.random() * 20) - 10,
        blockTime: Math.max(1.8, Math.min(2.5, prev.blockTime + (Math.random() - 0.5) * 0.2)),
        gasPrice: Math.max(0.00008, Math.min(0.00020, prev.gasPrice + (Math.random() - 0.5) * 0.00002)),
        efficiency: Math.max(85, Math.min(98, prev.efficiency + (Math.random() - 0.5) * 2)),
        activeNodes: prev.activeNodes + Math.floor(Math.random() * 10) - 5,
        totalTransactions: prev.totalTransactions + Math.floor(Math.random() * 50) + 10
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Get real market data for responses
    const btc = marketData.find(coin => coin.id === 'bitcoin');
    const eth = marketData.find(coin => coin.id === 'ethereum');
    const metis = marketData.find(coin => coin.id === 'metis-token');
    
    // Market-related responses with real data
    if (lowerMessage.includes('price') || lowerMessage.includes('market')) {
      if (btc && eth && metis) {
        return `Based on current live market data: BTC is at $${btc.current_price.toLocaleString()} (${btc.price_change_percentage_24h >= 0 ? '+' : ''}${btc.price_change_percentage_24h.toFixed(2)}%), ETH at $${eth.current_price.toLocaleString()} (${eth.price_change_percentage_24h >= 0 ? '+' : ''}${eth.price_change_percentage_24h.toFixed(2)}%), and METIS at $${metis.current_price.toFixed(2)} (${metis.price_change_percentage_24h >= 0 ? '+' : ''}${metis.price_change_percentage_24h.toFixed(2)}%). Market sentiment appears ${btc.price_change_percentage_24h > 0 ? 'bullish' : 'bearish'} with ${btc.price_change_percentage_24h > 2 ? 'strong' : 'moderate'} momentum.`;
      }
      return `I'm currently fetching the latest market data. Please try again in a moment for real-time price analysis.`;
    }
    
    // Portfolio-related responses
    if (lowerMessage.includes('portfolio') || lowerMessage.includes('balance')) {
      return `Your current portfolio value is $77,583.76 with a 24h gain of +$3,241.52 (+4.3%). Your allocation shows: BTC (35%), ETH (19%), HYPR (40%), and USDC (6%). Based on current market conditions, I recommend ${btc?.price_change_percentage_24h > 0 ? 'holding your positions as momentum is positive' : 'considering some profit-taking if you\'re overexposed to volatile assets'}.`;
    }
    
    // Trading strategy responses with real market context
    if (lowerMessage.includes('strategy') || lowerMessage.includes('trade') || lowerMessage.includes('buy') || lowerMessage.includes('sell')) {
      const marketTrend = btc?.price_change_percentage_24h > 2 ? 'strong uptrend' : btc?.price_change_percentage_24h < -2 ? 'downtrend' : 'sideways movement';
      return `Given the current ${marketTrend} in the market, I recommend a ${marketTrend === 'strong uptrend' ? 'momentum-based' : marketTrend === 'downtrend' ? 'defensive' : 'range-trading'} approach. Your active AI strategies are performing well with a 68% win rate. ${btc?.price_change_percentage_24h > 5 ? 'Consider taking some profits at these levels.' : 'This could be a good accumulation opportunity for quality assets.'}`;
    }
    
    // Network/technical responses with real metrics
    if (lowerMessage.includes('network') || lowerMessage.includes('hyperion') || lowerMessage.includes('gas') || lowerMessage.includes('fees')) {
      return `Hyperion network is operating at peak efficiency: ${networkMetrics.tps} TPS, ${networkMetrics.blockTime.toFixed(1)}s average block time, and minimal gas fees at ${networkMetrics.gasPrice.toFixed(5)} HYPR. Parallel execution is running at ${networkMetrics.efficiency}% capacity with ${networkMetrics.activeNodes} active nodes. Perfect conditions for high-frequency trading strategies.`;
    }
    
    // Risk management responses
    if (lowerMessage.includes('risk') || lowerMessage.includes('loss') || lowerMessage.includes('stop')) {
      const volatility = btc ? Math.abs(btc.price_change_percentage_24h) : 3;
      return `Current market volatility is ${volatility > 5 ? 'high' : volatility > 2 ? 'moderate' : 'low'} at ${volatility.toFixed(1)}%. I suggest ${volatility > 5 ? 'tightening stop-losses to -1.5% and reducing position sizes' : 'maintaining current risk parameters with stop-losses at -2%'}. Your portfolio risk score is Medium. ${volatility > 5 ? 'Consider hedging with stablecoins during high volatility periods.' : 'Good conditions for maintaining current exposure levels.'}`;
    }
    
    // AI/Alith specific responses
    if (lowerMessage.includes('ai') || lowerMessage.includes('alith') || lowerMessage.includes('help')) {
      return `I'm Alith, your AI trading assistant powered by Hyperion's on-chain intelligence. I analyze real-time market data, network metrics, and your portfolio to provide personalized insights. I can help with market analysis, risk assessment, strategy optimization, and trade execution. What specific aspect of your trading would you like me to analyze?`;
    }

    // Greeting responses
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return `Hello! I'm here to help you navigate the crypto markets with AI-powered insights. I can analyze current market conditions, review your portfolio performance, suggest trading strategies, or answer questions about the Hyperion network. What would you like to explore?`;
    }
    
    // Default responses with market context
    const responses = [
      `I'm analyzing current market conditions using live data from CoinGecko and Hyperion network metrics. ${btc ? `BTC is currently ${btc.price_change_percentage_24h >= 0 ? 'up' : 'down'} ${Math.abs(btc.price_change_percentage_24h).toFixed(1)}% today.` : ''} What specific information would you like me to focus on?`,
      `Based on Hyperion's parallel execution capabilities and current network efficiency of ${networkMetrics.efficiency}%, I can process multiple data streams simultaneously. How can I assist with your trading decisions today?`,
      `I'm continuously monitoring market sentiment, price movements, and network activity. ${marketData.length > 0 ? 'Current market data shows mixed signals across major assets.' : 'Fetching latest market data...'} Is there a particular asset or strategy you'd like me to analyze?`,
      `Using advanced AI algorithms and real-time data, I can help optimize your trading performance. The network is currently processing ${networkMetrics.tps} transactions per second. What would you like to know about your current positions or market opportunities?`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(inputMessage),
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000); // 1.5-2.5 seconds delay
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-400">Market overview and AI-powered insights</p>
      </div>
      
      <MarketOverview />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="card p-4 h-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Hyperion Network Performance</h3>
              <div className="flex space-x-1">
                <button className="p-1.5 bg-indigo-600 rounded hover:bg-indigo-700 transition-colors">
                  <LineChart size={16} />
                </button>
                <button className="p-1.5 bg-gray-700 rounded hover:bg-gray-600 transition-colors">
                  <BarChart3 size={16} />
                </button>
                <button className="p-1.5 bg-gray-700 rounded hover:bg-gray-600 transition-colors">
                  <PieChart size={16} />
                </button>
              </div>
            </div>
            
            <div className="h-64 w-full rounded-lg overflow-hidden bg-gray-800 mb-4">
              <div className="p-4 h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Zap size={20} className="text-yellow-400" />
                    <span className="text-sm font-medium">Real-time Network Activity</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-xs text-green-500">Live</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">Current TPS</span>
                      <TrendingUp size={14} className="text-green-500" />
                    </div>
                    <p className="text-lg font-bold text-green-500">{networkMetrics.tps.toLocaleString()}</p>
                  </div>
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">Efficiency</span>
                      <Activity size={14} className="text-blue-500" />
                    </div>
                    <p className="text-lg font-bold text-blue-500">{networkMetrics.efficiency.toFixed(1)}%</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center">
                    <p className="text-xs text-gray-400">Active Nodes</p>
                    <p className="text-sm font-medium">{networkMetrics.activeNodes.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-400">Total Tx</p>
                    <p className="text-sm font-medium">{(networkMetrics.totalTransactions / 1e6).toFixed(1)}M</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-400">Avg Block</p>
                    <p className="text-sm font-medium">{networkMetrics.blockTime.toFixed(1)}s</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="stat-card bg-gray-800">
                <span className="stat-label">TPS</span>
                <span className="stat-value text-green-500">{networkMetrics.tps.toLocaleString()}</span>
              </div>
              <div className="stat-card bg-gray-800">
                <span className="stat-label">Block Time</span>
                <span className="stat-value text-blue-500">{networkMetrics.blockTime.toFixed(1)}s</span>
              </div>
              <div className="stat-card bg-gray-800">
                <span className="stat-label">Gas (HYPR)</span>
                <span className="stat-value text-purple-500">{networkMetrics.gasPrice.toFixed(5)}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <AIInsights />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ActivityFeed />
        </div>
        
        <div>
          <div className="card p-4">
            <div className="flex items-center space-x-2 mb-4">
              <BrainCircuit size={18} className="text-indigo-400" />
              <h3 className="font-medium">Alith AI Assistant</h3>
              <div className="ml-auto">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-xs text-green-500">Online</span>
                </div>
              </div>
            </div>
            
            <div className="h-64 p-4 bg-gray-800 rounded-lg overflow-y-auto scrollbar-thin">
              <div className="space-y-3">
                {messages.map((message) => (
                  <div key={message.id} className={`flex space-x-2 ${message.isUser ? 'justify-end' : ''}`}>
                    {!message.isUser && (
                      <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
                        A
                      </div>
                    )}
                    <div className={`rounded-lg p-2.5 max-w-[85%] ${
                      message.isUser 
                        ? 'bg-indigo-600/20 text-indigo-100' 
                        : 'bg-gray-700'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    {message.isUser && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
                        U
                      </div>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex space-x-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium text-sm">
                      A
                    </div>
                    <div className="bg-gray-700 rounded-lg p-2.5">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-4 relative">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask Alith about market conditions, strategies, or portfolio optimization..."
                className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2.5 pl-4 pr-12 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                rows={2}
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="absolute right-3 bottom-3 p-1.5 text-indigo-400 hover:text-indigo-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
            
            <div className="mt-2 flex flex-wrap gap-1">
              {['Market analysis', 'Portfolio review', 'Risk assessment', 'Network status'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="text-xs px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-gray-300 transition-colors"
                  disabled={isTyping}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;