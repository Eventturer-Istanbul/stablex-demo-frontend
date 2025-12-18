export type CoinSymbol = string;

export interface CoinConfig {
  symbol: string;
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
