import { SentimentResponse, TopicsResponse, NewsResponse } from '@/types/api';

const mockSentiment: Record<string, SentimentResponse> = {
  BTC: {
    coin_name: 'Bitcoin',
    coin_symbol: 'BTC',
    sentiment_score: 7.8,
    total_tweets_processed: 15234,
    time_window_start: '2024-12-13T00:00:00Z',
    time_window_end: '2024-12-14T00:00:00Z',
  },
  ETH: {
    coin_name: 'Ethereum',
    coin_symbol: 'ETH',
    sentiment_score: 6.5,
    total_tweets_processed: 12456,
    time_window_start: '2024-12-13T00:00:00Z',
    time_window_end: '2024-12-14T00:00:00Z',
  },
  SOL: {
    coin_name: 'Solana',
    coin_symbol: 'SOL',
    sentiment_score: 8.2,
    total_tweets_processed: 8932,
    time_window_start: '2024-12-13T00:00:00Z',
    time_window_end: '2024-12-14T00:00:00Z',
  },
};

const mockTopics: Record<string, TopicsResponse> = {
  BTC: {
    topics: [
      'ETF Approval',
      'Mining Difficulty',
      'Lightning Network',
      'Halving 2024',
      'Institutional Adoption',
      'Price Analysis',
    ],
    total_tweets_processed: 15234,
    time_window_start: '2024-12-13T00:00:00Z',
    time_window_end: '2024-12-14T00:00:00Z',
  },
  ETH: {
    topics: [
      'Layer 2 Scaling',
      'Staking Rewards',
      'DeFi Summer',
      'Gas Fees',
      'Dencun Upgrade',
      'Blob Transactions',
    ],
    total_tweets_processed: 12456,
    time_window_start: '2024-12-13T00:00:00Z',
    time_window_end: '2024-12-14T00:00:00Z',
  },
  SOL: {
    topics: [
      'Firedancer',
      'Mobile Gaming',
      'Token Extensions',
      'Compressed NFTs',
      'DePIN',
      'Validator Performance',
    ],
    total_tweets_processed: 8932,
    time_window_start: '2024-12-13T00:00:00Z',
    time_window_end: '2024-12-14T00:00:00Z',
  },
};

const mockNews: Record<string, NewsResponse> = {
  BTC: {
    news_summaries: [
      'Bitcoin ETF sees record inflows as institutional interest reaches new heights. Major asset managers report unprecedented demand from retirement funds and sovereign wealth entities.',
      'Lightning Network capacity surpasses 5,000 BTC milestone, enabling faster and cheaper transactions for everyday payments across the globe.',
      'Bitcoin mining difficulty adjusts upward by 5.2% as network hashrate continues to climb following the latest halving event.',
    ],
    total_news_processed: 45,
    time_window_start: '2024-12-13T00:00:00Z',
    time_window_end: '2024-12-14T00:00:00Z',
    news_sources: ['CoinDesk', 'The Block', 'Decrypt'],
  },
  ETH: {
    news_summaries: [
      'Ethereum Layer 2 solutions process more transactions than mainnet for the first time, marking a significant scaling milestone.',
      'Major DeFi protocols announce integration with new account abstraction standards, improving user onboarding experience.',
      'Ethereum staking yields stabilize as validator queue clears, with over 30 million ETH now locked in the beacon chain.',
    ],
    total_news_processed: 38,
    time_window_start: '2024-12-13T00:00:00Z',
    time_window_end: '2024-12-14T00:00:00Z',
    news_sources: ['Bankless', 'The Defiant', 'CoinDesk'],
  },
  SOL: {
    news_summaries: [
      'Solana processes record 65,000 TPS during stress test as Firedancer validator client enters final testing phase.',
      'Major gaming studios announce exclusive partnerships with Solana for blockchain-integrated mobile games.',
      'Solana DePIN projects attract $500M in new investments as real-world asset tokenization gains momentum.',
    ],
    total_news_processed: 32,
    time_window_start: '2024-12-13T00:00:00Z',
    time_window_end: '2024-12-14T00:00:00Z',
    news_sources: ['Solana Daily', 'CoinDesk', 'The Block'],
  },
};

export function getMockData(
  endpoint: string,
  coinSymbol: string
): SentimentResponse | TopicsResponse | NewsResponse {
  switch (endpoint) {
    case '/sentiment-scores':
      return mockSentiment[coinSymbol] || mockSentiment['BTC'];
    case '/discussion-topics':
      return mockTopics[coinSymbol] || mockTopics['BTC'];
    case '/news':
      return mockNews[coinSymbol] || mockNews['BTC'];
    default:
      throw new Error(`Unknown endpoint: ${endpoint}`);
  }
}
