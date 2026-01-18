// API Request Types
export interface CoinRequest {
  coin_symbol: string;
  time_window_start?: string; // ISO date string, optional
}

// API Response Types
export interface SentimentResponse {
  coin_name: string;
  coin_symbol: string;
  sentiment_score: number; // -5 to 5 scale
  total_tweets_processed: number;
  tweet_count?: number; // Number of tweets used for sentiment analysis
  time_window_start: string;
  time_window_end: string;
}

export interface Topic {
  rank: number;
  text: string;
  sentiment: 'positive' | 'negative' | 'neutral' | 'mixed';
  tweet_count: number;
}

export interface Tweet {
  text: string;
  urls?: string[];
  likes?: number;
  views?: number;
  quotes?: number;
  hashtags?: string[];
  mentions?: string[];
  retweets?: number;
  tweet_id?: string;
  sentiment?: string;
  created_at?: string;
  author_name?: string;
  replies_count?: number;
  author_username?: string;
  author_verified?: boolean;
  author_followers?: number;
}

export interface TopicsResponse {
  coin_name: string;
  coin_symbol: string;
  topics: Topic[];
  top_tweets?: (string | Tweet)[]; // Top tweets from Twitter discussions (can be strings or tweet objects)
  total_tweets_processed: number;
  time_window_start: string;
  time_window_end: string;
}

export interface NewsResponse {
  coin_name: string;
  coin_symbol: string;
  news_summaries: string[];
  news_body?: string[]; // Detailed news content
  citation_urls?: string[]; // Citation URLs for news sources
  total_news_processed: number;
  time_window_start: string;
  time_window_end: string;
  news_sources: string[]; // Ignored in UI per requirements
}

export interface DescriptionResponse {
  coin_name: string;
  coin_symbol: string;
  description: string | null;
}

// Insights Types
export interface InsightItem {
  category: string;
  description: string;
  source_type: 'news' | 'technical_analysis';
  news_id?: number;
  analysis_index?: number;
}

export interface InsightSource {
  id: string;
  title: string;
  summary: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  source: string;
  published_at: string;
  url: string | null;
}

export interface TopTweet {
  text: string;
  urls?: string[];
  likes: number;
  views: number;
  retweets: number;
  tweet_id: string;
  created_at: string;
  author_name: string;
  author_username: string;
  author_verified?: boolean;
  author_followers?: number;
}

export interface TechnicalIndicators {
  rsi: number;
  macd: {
    signal: string;
    histogram: number;
  };
  ema: {
    short_7: number;
    medium_25: number;
    long_99: number;
  };
  bb: {
    lower: number;
    upper: number;
    width_percent: number;
  };
  atr: number;
  volume: {
    ratio: number;
    current: number;
    avg_7d: number;
  };
}

export interface TechnicalAnalysisResponse {
  token_name: string;
  current_price: number;
  positive_paragraphs: string[];
  risk_paragraphs: string[];
  indicators: TechnicalIndicators | null;
  created_at: string;
}

export interface InsightsResponse {
  token: {
    id: string;
    symbol: string;
    name: string;
  };
  updated_at: string | null;
  tldr: {
    summary: string;
    key_points: string[];
  } | null;
  what_is: {
    question: string;
    answer: string | null;
  };
  positives: InsightItem[];
  negatives: InsightItem[];
  sources: InsightSource[];
  discussion: {
    overall: 'positive' | 'negative' | 'neutral';
    score: number;
    tweet_count: number;
    topics: string[];
    top_tweets: TopTweet[];
  };
  technical_analysis: TechnicalAnalysisResponse | null;
  disclaimer: string;
}
