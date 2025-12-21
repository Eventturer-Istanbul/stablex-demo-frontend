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
  time_window_start: string;
  time_window_end: string;
}

export interface Topic {
  rank: number;
  text: string;
  sentiment: 'positive' | 'negative' | 'neutral' | 'mixed';
  tweet_count: number;
}

export interface TopicsResponse {
  coin_name: string;
  coin_symbol: string;
  topics: Topic[];
  total_tweets_processed: number;
  time_window_start: string;
  time_window_end: string;
}

export interface NewsResponse {
  coin_name: string;
  coin_symbol: string;
  news_summaries: string[];
  news_body?: string[]; // Detailed news content
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
