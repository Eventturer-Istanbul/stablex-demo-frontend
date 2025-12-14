// API Request Types
export interface CoinRequest {
  coin_symbol: string;
  time_window_start?: string; // ISO date string, optional
}

// API Response Types
export interface SentimentResponse {
  coin_name: string;
  coin_symbol: string;
  sentiment_score: number; // 0-10 scale
  total_tweets_processed: number;
  time_window_start: string;
  time_window_end: string;
}

export interface TopicsResponse {
  topics: string[];
  total_tweets_processed: number;
  time_window_start: string;
  time_window_end: string;
}

export interface NewsResponse {
  coin_name: string;
  coin_symbol: string;
  news_summaries: string[];
  total_news_processed: number;
  time_window_start: string;
  time_window_end: string;
  news_sources: string[]; // Ignored in UI per requirements
}
