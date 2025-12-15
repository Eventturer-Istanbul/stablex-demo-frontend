import { SentimentResponse, TopicsResponse, NewsResponse } from '@/types/api';

const mockSentiment: Record<string, SentimentResponse> = {
  ALGO: {
    coin_name: 'Algorand',
    coin_symbol: 'ALGO',
    sentiment_score: 6.8,
    total_tweets_processed: 4521,
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
  GRT: {
    coin_name: 'The Graph',
    coin_symbol: 'GRT',
    sentiment_score: 6.1,
    total_tweets_processed: 2845,
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
  POL: {
    coin_name: 'Polygon',
    coin_symbol: 'POL',
    sentiment_score: 6.7,
    total_tweets_processed: 5612,
    time_window_start: '2024-12-13T00:00:00Z',
    time_window_end: '2024-12-14T00:00:00Z',
  },
  RENDER: {
    coin_name: 'Render Network',
    coin_symbol: 'RENDER',
    sentiment_score: 8.4,
    total_tweets_processed: 3421,
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
  UNI: {
    coin_name: 'Uniswap',
    coin_symbol: 'UNI',
    sentiment_score: 6.3,
    total_tweets_processed: 4156,
    time_window_start: '2024-12-13T00:00:00Z',
    time_window_end: '2024-12-14T00:00:00Z',
  },
};

// Helper to convert string topics to Topic objects for mock data
function toTopics(texts: string[]): { rank: number; text: string; sentiment: 'positive' | 'neutral'; tweet_count: number }[] {
  return texts.map((text, i) => ({ rank: i + 1, text, sentiment: 'neutral' as const, tweet_count: 100 - i * 10 }));
}

const mockTopics: Record<string, TopicsResponse> = {
  ALGO: {
    coin_name: 'Algorand',
    coin_symbol: 'ALGO',
    topics: toTopics(['Pure Proof of Stake', 'Instant Finality', 'AlgoKit', 'Governance', 'Python SDK', 'Green Crypto']),
    total_tweets_processed: 4521,
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
  GRT: {
    coin_name: 'The Graph',
    coin_symbol: 'GRT',
    topics: toTopics(['Subgraphs', 'Indexing Protocol', 'Query Fees', 'Curator Rewards', 'Data Availability', 'Web3 Data']),
    total_tweets_processed: 2845,
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
  POL: {
    coin_name: 'Polygon',
    coin_symbol: 'POL',
    topics: toTopics(['AggLayer', 'zkEVM', 'Zero Knowledge', 'CDK', 'MATIC Migration', 'Polygon 2.0']),
    total_tweets_processed: 5612,
    time_window_start: '2024-12-13T00:00:00Z',
    time_window_end: '2024-12-14T00:00:00Z',
  },
  RENDER: {
    coin_name: 'Render Network',
    coin_symbol: 'RENDER',
    topics: toTopics(['GPU Computing', 'Distributed Rendering', 'AI Training', 'Spatial Computing', 'OTOY Partnership', 'DePIN']),
    total_tweets_processed: 3421,
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
  UNI: {
    coin_name: 'Uniswap',
    coin_symbol: 'UNI',
    topics: toTopics(['Uniswap V4', 'Hooks', 'Liquidity Providers', 'AMM Innovation', 'Governance Votes', 'DEX Volume']),
    total_tweets_processed: 4156,
    time_window_start: '2024-12-13T00:00:00Z',
    time_window_end: '2024-12-14T00:00:00Z',
  },
};

const mockNews: Record<string, NewsResponse> = {
  ALGO: {
    coin_name: 'Algorand',
    coin_symbol: 'ALGO',
    news_summaries: [
      'Algorand Foundation announces major partnership with central banks exploring CBDC implementations using Pure Proof of Stake consensus.',
      'AlgoKit 2.0 releases with enhanced Python SDK, making smart contract development more accessible for traditional developers.',
      'Algorand achieves carbon-negative status certification, attracting ESG-focused institutional investors.',
    ],
    total_news_processed: 28,
    time_window_start: '2024-12-13T00:00:00Z',
    time_window_end: '2024-12-14T00:00:00Z',
    news_sources: ['CoinDesk', 'The Block', 'Algorand Foundation'],
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
  GRT: {
    coin_name: 'The Graph',
    coin_symbol: 'GRT',
    news_summaries: [
      'The Graph announces expansion to 50+ blockchain networks, becoming the go-to indexing solution for multi-chain applications.',
      'Query fees on The Graph network reach all-time highs as AI applications increasingly rely on decentralized data infrastructure.',
      'Major Web3 protocols migrate from centralized APIs to Graph subgraphs, citing improved reliability and censorship resistance.',
    ],
    total_news_processed: 22,
    time_window_start: '2024-12-13T00:00:00Z',
    time_window_end: '2024-12-14T00:00:00Z',
    news_sources: ['The Block', 'CoinDesk', 'The Graph Blog'],
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
  POL: {
    coin_name: 'Polygon',
    coin_symbol: 'POL',
    news_summaries: [
      'Polygon zkEVM achieves full Ethereum equivalence, enabling seamless smart contract deployment without code modifications.',
      'AggLayer launches in beta, connecting Polygon ecosystem chains with unified liquidity and cross-chain messaging.',
      'MATIC to POL migration reaches 80% completion as token utility expands across Polygon 2.0 infrastructure.',
    ],
    total_news_processed: 36,
    time_window_start: '2024-12-13T00:00:00Z',
    time_window_end: '2024-12-14T00:00:00Z',
    news_sources: ['CoinDesk', 'The Block', 'Polygon Blog'],
  },
  RENDER: {
    coin_name: 'Render Network',
    coin_symbol: 'RENDER',
    news_summaries: [
      'Render Network partners with major Hollywood studios for distributed rendering of upcoming blockbuster visual effects.',
      'AI training workloads on Render Network increase 500% as developers seek decentralized GPU compute alternatives.',
      'Apple Vision Pro integration announced, positioning Render as key infrastructure for spatial computing content creation.',
    ],
    total_news_processed: 25,
    time_window_start: '2024-12-13T00:00:00Z',
    time_window_end: '2024-12-14T00:00:00Z',
    news_sources: ['CoinDesk', 'The Block', 'OTOY Blog'],
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
