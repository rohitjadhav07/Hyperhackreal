import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Strategy {
  id: string;
  name: string;
  description: string;
  tradingPair: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  naturalLanguageStrategy: string;
  status: 'Active' | 'Paused' | 'Draft';
  createdAt: Date;
  stats: {
    profit: string;
    trades: string;
    winRate: string;
    timeframe: string;
  };
  author: string;
  isPublished: boolean;
}

interface StrategyStore {
  strategies: Strategy[];
  publishedStrategies: Strategy[];
  addStrategy: (strategy: Omit<Strategy, 'id' | 'createdAt' | 'stats' | 'author' | 'isPublished'>) => void;
  updateStrategy: (id: string, updates: Partial<Strategy>) => void;
  deleteStrategy: (id: string) => void;
  toggleStrategyStatus: (id: string) => void;
  publishStrategy: (id: string) => void;
  cloneStrategy: (id: string) => void;
}

export const useStrategyStore = create<StrategyStore>()(
  persist(
    (set, get) => ({
      strategies: [
        {
          id: '1',
          name: 'Momentum Trader',
          description: 'Leverages parallel execution to identify and execute on short-term price trends',
          tradingPair: 'BTC/USDC',
          riskLevel: 'Medium',
          naturalLanguageStrategy: 'Buy when price increases 5% over 1 hour, sell when profit exceeds 10% or loss exceeds 2%',
          status: 'Active',
          createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
          stats: {
            profit: '+18.4%',
            trades: '342',
            winRate: '68%',
            timeframe: '2 weeks'
          },
          author: 'You',
          isPublished: false
        },
        {
          id: '2',
          name: 'AI Volatility Arbitrage',
          description: 'Uses on-chain AI to identify price discrepancies across DEXs',
          tradingPair: 'ETH/USDC',
          riskLevel: 'High',
          naturalLanguageStrategy: 'Monitor volatility spikes above 15%, execute arbitrage trades between DEXs when price difference exceeds 0.5%',
          status: 'Paused',
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          stats: {
            profit: '+9.7%',
            trades: '1,245',
            winRate: '54%',
            timeframe: '2 weeks'
          },
          author: 'You',
          isPublished: false
        }
      ],
      publishedStrategies: [],
      
      addStrategy: (strategyData) => {
        const newStrategy: Strategy = {
          ...strategyData,
          id: Date.now().toString(),
          createdAt: new Date(),
          stats: {
            profit: '+0.0%',
            trades: '0',
            winRate: '0%',
            timeframe: '0 days'
          },
          author: 'You',
          isPublished: false,
          status: 'Draft'
        };
        
        set((state) => ({
          strategies: [...state.strategies, newStrategy]
        }));
      },
      
      updateStrategy: (id, updates) => {
        set((state) => ({
          strategies: state.strategies.map(strategy =>
            strategy.id === id ? { ...strategy, ...updates } : strategy
          )
        }));
      },
      
      deleteStrategy: (id) => {
        set((state) => ({
          strategies: state.strategies.filter(strategy => strategy.id !== id)
        }));
      },
      
      toggleStrategyStatus: (id) => {
        set((state) => ({
          strategies: state.strategies.map(strategy =>
            strategy.id === id 
              ? { ...strategy, status: strategy.status === 'Active' ? 'Paused' : 'Active' }
              : strategy
          )
        }));
      },
      
      publishStrategy: (id) => {
        const strategy = get().strategies.find(s => s.id === id);
        if (strategy) {
          const publishedStrategy = { ...strategy, isPublished: true };
          set((state) => ({
            strategies: state.strategies.map(s => 
              s.id === id ? publishedStrategy : s
            ),
            publishedStrategies: [...state.publishedStrategies, publishedStrategy]
          }));
        }
      },
      
      cloneStrategy: (id) => {
        const strategy = get().strategies.find(s => s.id === id);
        if (strategy) {
          const clonedStrategy: Strategy = {
            ...strategy,
            id: Date.now().toString(),
            name: `${strategy.name} (Copy)`,
            createdAt: new Date(),
            status: 'Draft',
            stats: {
              profit: '+0.0%',
              trades: '0',
              winRate: '0%',
              timeframe: '0 days'
            },
            isPublished: false
          };
          
          set((state) => ({
            strategies: [...state.strategies, clonedStrategy]
          }));
        }
      }
    }),
    {
      name: 'strategy-storage',
    }
  )
);