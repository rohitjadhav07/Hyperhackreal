import axios from 'axios';

const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';

const coinGeckoApi = axios.create({
  baseURL: COINGECKO_BASE_URL,
  timeout: 10000,
});

export interface CoinGeckoPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency: number;
  price_change_percentage_30d_in_currency: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  last_updated: string;
  sparkline_in_7d?: {
    price: number[];
  };
}

export interface HistoricalPrice {
  timestamp: number;
  price: number;
  market_cap?: number;
  total_volume?: number;
}

export interface OHLCData {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

class CoinGeckoService {
  async getCoinsMarkets(
    coinIds: string[] = ['bitcoin', 'ethereum', 'metis-token'],
    options: {
      vs_currency?: string;
      order?: string;
      per_page?: number;
      page?: number;
      sparkline?: boolean;
      price_change_percentage?: string;
    } = {}
  ): Promise<CoinGeckoPrice[]> {
    try {
      const params = {
        ids: coinIds.join(','),
        vs_currency: options.vs_currency || 'usd',
        order: options.order || 'market_cap_desc',
        per_page: options.per_page || 250,
        page: options.page || 1,
        sparkline: options.sparkline || true,
        price_change_percentage: options.price_change_percentage || '1h,24h,7d,30d',
      };

      const response = await coinGeckoApi.get('/coins/markets', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching coins markets:', error);
      throw error;
    }
  }

  async getSimplePrice(
    coinIds: string[] = ['bitcoin', 'ethereum', 'metis-token'],
    options: {
      vs_currencies?: string[];
      include_market_cap?: boolean;
      include_24hr_vol?: boolean;
      include_24hr_change?: boolean;
      include_last_updated_at?: boolean;
    } = {}
  ) {
    try {
      const params = {
        ids: coinIds.join(','),
        vs_currencies: (options.vs_currencies || ['usd']).join(','),
        include_market_cap: options.include_market_cap || true,
        include_24hr_vol: options.include_24hr_vol || true,
        include_24hr_change: options.include_24hr_change || true,
        include_last_updated_at: options.include_last_updated_at || true,
      };

      const response = await coinGeckoApi.get('/simple/price', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching simple price:', error);
      throw error;
    }
  }

  async getHistoricalPrices(
    coinId: string,
    days: number = 7,
    interval?: 'minutely' | 'hourly' | 'daily'
  ): Promise<HistoricalPrice[]> {
    try {
      const params: any = {
        vs_currency: 'usd',
        days: days.toString(),
      };

      if (interval) {
        params.interval = interval;
      }

      const response = await coinGeckoApi.get(`/coins/${coinId}/market_chart`, { params });
      
      const prices = response.data.prices || [];
      const market_caps = response.data.market_caps || [];
      const total_volumes = response.data.total_volumes || [];

      return prices.map((price: [number, number], index: number) => ({
        timestamp: price[0],
        price: price[1],
        market_cap: market_caps[index] ? market_caps[index][1] : undefined,
        total_volume: total_volumes[index] ? total_volumes[index][1] : undefined,
      }));
    } catch (error) {
      console.error('Error fetching historical prices:', error);
      throw error;
    }
  }

  async getOHLCData(
    coinId: string,
    days: number = 7
  ): Promise<OHLCData[]> {
    try {
      const response = await coinGeckoApi.get(`/coins/${coinId}/ohlc`, {
        params: {
          vs_currency: 'usd',
          days: days.toString(),
        },
      });

      return response.data.map((ohlc: [number, number, number, number, number]) => ({
        timestamp: ohlc[0],
        open: ohlc[1],
        high: ohlc[2],
        low: ohlc[3],
        close: ohlc[4],
      }));
    } catch (error) {
      console.error('Error fetching OHLC data:', error);
      throw error;
    }
  }

  async getCoinDetails(coinId: string) {
    try {
      const response = await coinGeckoApi.get(`/coins/${coinId}`, {
        params: {
          localization: false,
          tickers: false,
          market_data: true,
          community_data: false,
          developer_data: false,
          sparkline: true,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching coin details:', error);
      throw error;
    }
  }

  async getGlobalData() {
    try {
      const response = await coinGeckoApi.get('/global');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching global data:', error);
      throw error;
    }
  }

  async getTrendingCoins() {
    try {
      const response = await coinGeckoApi.get('/search/trending');
      return response.data;
    } catch (error) {
      console.error('Error fetching trending coins:', error);
      throw error;
    }
  }

  // Helper method to get coin ID from symbol
  getCoinIdFromSymbol(symbol: string): string {
    const symbolMap: { [key: string]: string } = {
      'BTC': 'bitcoin',
      'ETH': 'ethereum',
      'METIS': 'metis-token',
      'HYPR': 'hyperion', // Assuming this is the correct ID
    };
    return symbolMap[symbol.toUpperCase()] || symbol.toLowerCase();
  }

  // Helper method to format sparkline data for charts
  formatSparklineData(sparkline: number[]): { timestamp: string; value: number }[] {
    const now = Date.now();
    const interval = 7 * 24 * 60 * 60 * 1000 / sparkline.length; // 7 days divided by data points

    return sparkline.map((price, index) => ({
      timestamp: new Date(now - (sparkline.length - index) * interval).toISOString(),
      value: price,
    }));
  }
}

export const coinGeckoService = new CoinGeckoService();