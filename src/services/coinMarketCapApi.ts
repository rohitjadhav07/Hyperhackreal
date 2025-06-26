import axios from 'axios';

const CMC_BASE_URL = 'https://pro-api.coinmarketcap.com/v1';
const CMC_SANDBOX_URL = 'https://sandbox-api.coinmarketcap.com/v1';

// Use sandbox for development, production URL for live
const BASE_URL = import.meta.env.DEV ? CMC_SANDBOX_URL : CMC_BASE_URL;

const coinMarketCapApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'X-CMC_PRO_API_KEY': import.meta.env.VITE_COINMARKETCAP_API_KEY || 'b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c', // Sandbox key
    'Accept': 'application/json',
    'Accept-Encoding': 'deflate, gzip',
  },
});

export interface CoinData {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  quote: {
    USD: {
      price: number;
      volume_24h: number;
      volume_change_24h: number;
      percent_change_1h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      market_cap: number;
      market_cap_dominance: number;
      fully_diluted_market_cap: number;
      last_updated: string;
    };
  };
}

export interface HistoricalData {
  timestamp: string;
  price: number;
  volume: number;
  market_cap: number;
}

export interface OHLCVData {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

class CoinMarketCapService {
  async getLatestQuotes(symbols: string[] = ['BTC', 'ETH', 'METIS']): Promise<CoinData[]> {
    try {
      const response = await coinMarketCapApi.get('/cryptocurrency/quotes/latest', {
        params: {
          symbol: symbols.join(','),
          convert: 'USD',
        },
      });

      return symbols.map(symbol => response.data.data[symbol]);
    } catch (error) {
      console.error('Error fetching latest quotes:', error);
      throw error;
    }
  }

  async getHistoricalQuotes(
    symbol: string,
    timeStart: string,
    timeEnd: string,
    interval: '1h' | '2h' | '3h' | '4h' | '6h' | '8h' | '12h' | '1d' | '2d' | '3d' | '7d' | '14d' | '15d' | '30d' | '60d' | '90d' | '365d' = '1d'
  ): Promise<HistoricalData[]> {
    try {
      const response = await coinMarketCapApi.get('/cryptocurrency/quotes/historical', {
        params: {
          symbol,
          time_start: timeStart,
          time_end: timeEnd,
          interval,
          convert: 'USD',
        },
      });

      return response.data.data.quotes.map((quote: any) => ({
        timestamp: quote.timestamp,
        price: quote.quote.USD.price,
        volume: quote.quote.USD.volume_24h,
        market_cap: quote.quote.USD.market_cap,
      }));
    } catch (error) {
      console.error('Error fetching historical quotes:', error);
      throw error;
    }
  }

  async getOHLCVData(
    symbol: string,
    timeStart: string,
    timeEnd: string,
    interval: '1m' | '5m' | '10m' | '15m' | '30m' | '45m' | '1h' | '2h' | '3h' | '4h' | '6h' | '8h' | '12h' | '1d' | '2d' | '3d' | '7d' | '14d' | '15d' | '30d' | '60d' | '90d' | '365d' = '1h'
  ): Promise<OHLCVData[]> {
    try {
      const response = await coinMarketCapApi.get('/cryptocurrency/ohlcv/historical', {
        params: {
          symbol,
          time_start: timeStart,
          time_end: timeEnd,
          interval,
          convert: 'USD',
        },
      });

      return response.data.data.quotes.map((quote: any) => ({
        time_open: quote.time_open,
        time_close: quote.time_close,
        open: quote.quote.USD.open,
        high: quote.quote.USD.high,
        low: quote.quote.USD.low,
        close: quote.quote.USD.close,
        volume: quote.quote.USD.volume,
      }));
    } catch (error) {
      console.error('Error fetching OHLCV data:', error);
      throw error;
    }
  }

  async getGlobalMetrics() {
    try {
      const response = await coinMarketCapApi.get('/global-metrics/quotes/latest');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching global metrics:', error);
      throw error;
    }
  }

  async getTrendingCoins(limit: number = 10) {
    try {
      const response = await coinMarketCapApi.get('/cryptocurrency/trending/latest', {
        params: { limit },
      });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching trending coins:', error);
      throw error;
    }
  }
}

export const coinMarketCapService = new CoinMarketCapService();