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
  LINK: {
    coin_name: 'Chainlink',
    coin_symbol: 'LINK',
    sentiment_score: 7.9,
    total_tweets_processed: 7823,
    time_window_start: '2024-12-13T00:00:00Z',
    time_window_end: '2024-12-14T00:00:00Z',
  },
  UNI: {
    coin_name: 'Uniswap',
    coin_symbol: 'UNI',
    sentiment_score: 6.3,
    total_tweets_processed: 4156,
    time_window_start: '2024-12-13T00:00:00Z',
    time_window_end: '2024-12-14T00:00:00Z',
  },
  AVAX: {
    coin_name: 'Avalanche',
    coin_symbol: 'AVAX',
    sentiment_score: 7.2,
    total_tweets_processed: 6234,
    time_window_start: '2024-12-13T00:00:00Z',
    time_window_end: '2024-12-14T00:00:00Z',
  },
  XRP: {
    coin_name: 'XRP',
    coin_symbol: 'XRP',
    sentiment_score: 7.4,
    total_tweets_processed: 9845,
    time_window_start: '2024-12-13T00:00:00Z',
    time_window_end: '2024-12-14T00:00:00Z',
  },
  LTC: {
    coin_name: 'Litecoin',
    coin_symbol: 'LTC',
    sentiment_score: 6.1,
    total_tweets_processed: 3421,
    time_window_start: '2024-12-13T00:00:00Z',
    time_window_end: '2024-12-14T00:00:00Z',
  },
  USDT: {
    coin_name: 'Tether',
    coin_symbol: 'USDT',
    sentiment_score: 5.8,
    total_tweets_processed: 5678,
    time_window_start: '2024-12-13T00:00:00Z',
    time_window_end: '2024-12-14T00:00:00Z',
  },
  DOGE: {
    coin_name: 'Dogecoin',
    coin_symbol: 'DOGE',
    sentiment_score: 8.5,
    total_tweets_processed: 11234,
    time_window_start: '2024-12-13T00:00:00Z',
    time_window_end: '2024-12-14T00:00:00Z',
  },
};

// Helper to convert string topics to Topic objects for mock data
function toTopics(texts: string[]): { rank: number; text: string; sentiment: 'positive' | 'neutral'; tweet_count: number }[] {
  return texts.map((text, i) => ({ rank: i + 1, text, sentiment: 'neutral' as const, tweet_count: 100 - i * 10 }));
}

const mockTopics: Record<string, TopicsResponse> = {
  BTC: {
    coin_name: 'Bitcoin',
    coin_symbol: 'BTC',
    topics: toTopics(['ETF Approval', 'Mining Difficulty', 'Lightning Network', 'Halving 2024', 'Institutional Adoption', 'Price Analysis']),
    total_tweets_processed: 15234,
    time_window_start: '2024-12-13T00:00:00Z',
    time_window_end: '2024-12-14T00:00:00Z',
  },
  ETH: {
    coin_name: 'Ethereum',
    coin_symbol: 'ETH',
    topics: toTopics(['Layer 2 Scaling', 'Staking Rewards', 'DeFi Summer', 'Gas Fees', 'Dencun Upgrade', 'Blob Transactions']),
    total_tweets_processed: 12456,
    time_window_start: '2024-12-13T00:00:00Z',
    time_window_end: '2024-12-14T00:00:00Z',
  },
  SOL: {
    coin_name: 'Solana',
    coin_symbol: 'SOL',
    topics: toTopics(['Firedancer', 'Mobile Gaming', 'Token Extensions', 'Compressed NFTs', 'DePIN', 'Validator Performance']),
    total_tweets_processed: 8932,
    time_window_start: '2024-12-13T00:00:00Z',
    time_window_end: '2024-12-14T00:00:00Z',
  },
  LINK: {
    coin_name: 'Chainlink',
    coin_symbol: 'LINK',
    topics: toTopics(['CCIP Launch', 'Oracle Networks', 'Cross-Chain', 'Proof of Reserve', 'Swift Integration', 'Data Feeds']),
    total_tweets_processed: 7823,
    time_window_start: '2024-12-13T00:00:00Z',
    time_window_end: '2024-12-14T00:00:00Z',
  },
  UNI: {
    coin_name: 'Uniswap',
    coin_symbol: 'UNI',
    topics: toTopics(['Uniswap V4', 'Hooks', 'Liquidity Providers', 'AMM Innovation', 'Governance Votes', 'DEX Volume']),
    total_tweets_processed: 4156,
    time_window_start: '2024-12-13T00:00:00Z',
    time_window_end: '2024-12-14T00:00:00Z',
  },
  AVAX: {
    coin_name: 'Avalanche',
    coin_symbol: 'AVAX',
    topics: toTopics(['Subnets', 'C-Chain', 'Consensus', 'Cortina Upgrade', 'Durango', 'Institutional Adoption']),
    total_tweets_processed: 6234,
    time_window_start: '2024-12-13T00:00:00Z',
    time_window_end: '2024-12-14T00:00:00Z',
  },
  XRP: {
    coin_name: 'XRP',
    coin_symbol: 'XRP',
    topics: toTopics(['SEC Lawsuit', 'Cross-Border Payments', 'ODL', 'Bank Partnerships', 'XRPL AMM', 'Regulatory Clarity']),
    total_tweets_processed: 9845,
    time_window_start: '2024-12-13T00:00:00Z',
    time_window_end: '2024-12-14T00:00:00Z',
  },
  LTC: {
    coin_name: 'Litecoin',
    coin_symbol: 'LTC',
    topics: toTopics(['MimbleWimble', 'Halving', 'Payment Adoption', 'Mining', 'OmniLite', 'Digital Silver']),
    total_tweets_processed: 3421,
    time_window_start: '2024-12-13T00:00:00Z',
    time_window_end: '2024-12-14T00:00:00Z',
  },
  USDT: {
    coin_name: 'Tether',
    coin_symbol: 'USDT',
    topics: toTopics(['Stablecoin Dominance', 'Reserve Transparency', 'Multi-Chain', 'Trading Pairs', 'DeFi Liquidity', 'Regulatory']),
    total_tweets_processed: 5678,
    time_window_start: '2024-12-13T00:00:00Z',
    time_window_end: '2024-12-14T00:00:00Z',
  },
  DOGE: {
    coin_name: 'Dogecoin',
    coin_symbol: 'DOGE',
    topics: toTopics(['Elon Musk', 'Meme Culture', 'Payment Integration', 'Community', 'Dogecoin Foundation', 'X Payments']),
    total_tweets_processed: 11234,
    time_window_start: '2024-12-13T00:00:00Z',
    time_window_end: '2024-12-14T00:00:00Z',
  },
};

const mockNews: Record<string, NewsResponse> = {
  BTC: {
    coin_name: 'Bitcoin',
    coin_symbol: 'BTC',
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
    coin_name: 'Ethereum',
    coin_symbol: 'ETH',
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
    coin_name: 'Solana',
    coin_symbol: 'SOL',
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
  LINK: {
    coin_name: 'Chainlink',
    coin_symbol: 'LINK',
    news_summaries: [
      'Chainlink CCIP processes $10B in cross-chain value transfers as major DeFi protocols adopt the interoperability standard.',
      'Swift announces expanded pilot program with Chainlink, testing tokenized asset settlement across 12 major banks.',
      'Chainlink Proof of Reserve becomes industry standard as exchanges face regulatory pressure for transparent attestations.',
    ],
    total_news_processed: 41,
    time_window_start: '2024-12-13T00:00:00Z',
    time_window_end: '2024-12-14T00:00:00Z',
    news_sources: ['CoinDesk', 'The Block', 'Chainlink Blog'],
  },
  UNI: {
    coin_name: 'Uniswap',
    coin_symbol: 'UNI',
    news_summaries: [
      'Uniswap V4 hooks enable custom AMM logic, sparking innovation wave with 100+ new liquidity pool designs.',
      'Uniswap governance approves fee switch activation, directing 10% of protocol fees to UNI stakers.',
      'DEX aggregators route 60% of Ethereum swap volume through Uniswap as liquidity depth hits record levels.',
    ],
    total_news_processed: 29,
    time_window_start: '2024-12-13T00:00:00Z',
    time_window_end: '2024-12-14T00:00:00Z',
    news_sources: ['The Defiant', 'CoinDesk', 'Uniswap Blog'],
  },
  AVAX: {
    coin_name: 'Avalanche',
    coin_symbol: 'AVAX',
    news_summaries: [
      'Avalanche subnets see 300% growth in enterprise adoption as major gaming studios deploy custom blockchain solutions.',
      'Avalanche Foundation launches $50M incentive program for RWA tokenization projects building on the network.',
      'Durango upgrade successfully activates, enabling cross-subnet communication and improved validator economics.',
    ],
    total_news_processed: 35,
    time_window_start: '2024-12-13T00:00:00Z',
    time_window_end: '2024-12-14T00:00:00Z',
    news_sources: ['CoinDesk', 'The Block', 'Avalanche Blog'],
  },
  XRP: {
    coin_name: 'XRP',
    coin_symbol: 'XRP',
    news_summaries: [
      'Ripple secures major victory in SEC case, providing regulatory clarity for XRP and the broader crypto industry.',
      'XRPL introduces native AMM functionality, enabling decentralized trading directly on the XRP Ledger.',
      'Major banks in Asia expand ODL corridors using XRP for instant cross-border settlements worth billions.',
    ],
    total_news_processed: 42,
    time_window_start: '2024-12-13T00:00:00Z',
    time_window_end: '2024-12-14T00:00:00Z',
    news_sources: ['CoinDesk', 'The Block', 'Ripple Insights'],
  },
  LTC: {
    coin_name: 'Litecoin',
    coin_symbol: 'LTC',
    news_summaries: [
      'Litecoin MimbleWimble upgrade sees increased adoption as privacy features attract new users to the network.',
      'Major payment processors add Litecoin support, citing faster confirmation times and lower fees than Bitcoin.',
      'Litecoin Foundation announces partnership with e-commerce platforms for seamless crypto payment integration.',
    ],
    total_news_processed: 18,
    time_window_start: '2024-12-13T00:00:00Z',
    time_window_end: '2024-12-14T00:00:00Z',
    news_sources: ['CoinDesk', 'Litecoin Foundation', 'Decrypt'],
  },
  USDT: {
    coin_name: 'Tether',
    coin_symbol: 'USDT',
    news_summaries: [
      'Tether releases quarterly attestation showing $100B+ in reserves backing USDT across multiple blockchains.',
      'USDT expands to new Layer 2 networks, reducing transaction costs and improving accessibility for users worldwide.',
      'Tether announces investment in Bitcoin mining operations as part of reserve diversification strategy.',
    ],
    total_news_processed: 24,
    time_window_start: '2024-12-13T00:00:00Z',
    time_window_end: '2024-12-14T00:00:00Z',
    news_sources: ['CoinDesk', 'The Block', 'Tether Blog'],
  },
  DOGE: {
    coin_name: 'Dogecoin',
    coin_symbol: 'DOGE',
    news_summaries: [
      'X platform hints at Dogecoin integration for tipping and payments, sending DOGE price surging 20% in hours.',
      'Dogecoin Foundation releases updated roadmap focusing on utility, payment rails, and community governance.',
      'Major retailers accept DOGE payments through new partnership with cryptocurrency payment processors.',
    ],
    total_news_processed: 38,
    time_window_start: '2024-12-13T00:00:00Z',
    time_window_end: '2024-12-14T00:00:00Z',
    news_sources: ['CoinDesk', 'Decrypt', 'Dogecoin Foundation'],
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
