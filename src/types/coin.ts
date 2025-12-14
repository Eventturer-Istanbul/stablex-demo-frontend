export type CoinSymbol = 'BTC' | 'ETH' | 'SOL';

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
