export type CoinSymbol = 'AVAX' | 'BTC' | 'DOGE' | 'ETH' | 'LINK' | 'LTC' | 'SOL' | 'UNI' | 'USDT' | 'XRP';

export interface CoinConfig {
  symbol: CoinSymbol;
  name: string;
  icon: string;
  color: string;
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface EndpointState<T> {
  status: LoadingState;
  data: T | null;
  error: string | null;
}
