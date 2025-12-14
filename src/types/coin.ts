export type CoinSymbol = 'ALGO' | 'AVAX' | 'BTC' | 'ETH' | 'GRT' | 'LINK' | 'POL' | 'RENDER' | 'SOL' | 'UNI';

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
