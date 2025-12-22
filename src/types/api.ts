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
