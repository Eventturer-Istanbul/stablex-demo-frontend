import { CoinRequest, SentimentResponse, TopicsResponse, NewsResponse, DescriptionResponse } from '@/types/api';
import { supabase } from '@/lib/supabase/client';

export type Language = 'en' | 'tr';

// All data comes from main_summaries table only
// coin_symbol is now token_id (as string)

export async function fetchSentiment(
  payload: CoinRequest,
  language: Language = 'tr'
): Promise<SentimentResponse> {
  const tokenId = parseInt(payload.coin_symbol, 10);

  const { data, error } = await supabase
    .from('main_summaries')
    .select('token_name, sentiment_score, created_at')
    .eq('token_id', tokenId)
    .eq('language', language)
    .single();

  const now = new Date();
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  if (error || !data) {
    return {
      coin_name: '',
      coin_symbol: payload.coin_symbol,
      sentiment_score: 5,
      total_tweets_processed: 0,
      time_window_start: yesterday.toISOString(),
      time_window_end: now.toISOString(),
    };
  }

  return {
    coin_name: data.token_name,
    coin_symbol: payload.coin_symbol,
    sentiment_score: data.sentiment_score || 5,
    total_tweets_processed: 0,
    time_window_start: data.created_at || yesterday.toISOString(),
    time_window_end: now.toISOString(),
  };
}

export async function fetchTopics(
  payload: CoinRequest,
  language: Language = 'tr'
): Promise<TopicsResponse> {
  const tokenId = parseInt(payload.coin_symbol, 10);

  const { data, error } = await supabase
    .from('main_summaries')
    .select('token_name, discussion_topics, created_at')
    .eq('token_id', tokenId)
    .eq('language', language)
    .single();

  const now = new Date();
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  if (error || !data || !data.discussion_topics) {
    return {
      coin_name: '',
      coin_symbol: payload.coin_symbol,
      topics: [],
      total_tweets_processed: 0,
      time_window_start: yesterday.toISOString(),
      time_window_end: now.toISOString(),
    };
  }

  const topics = (data.discussion_topics as string[]).map((text, index) => ({
    rank: index + 1,
    text,
    sentiment: 'neutral' as const,
    tweet_count: 0,
  }));

  return {
    coin_name: data.token_name,
    coin_symbol: payload.coin_symbol,
    topics,
    total_tweets_processed: topics.length,
    time_window_start: data.created_at || yesterday.toISOString(),
    time_window_end: now.toISOString(),
  };
}

export async function fetchNews(
  payload: CoinRequest,
  language: Language = 'tr'
): Promise<NewsResponse> {
  const tokenId = parseInt(payload.coin_symbol, 10);

  // Fetch with news_body included
  const { data, error } = await supabase
    .from('main_summaries')
    .select('token_name, news_output, news_body, created_at')
    .eq('token_id', tokenId)
    .eq('language', language)
    .single();

  const now = new Date();
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  if (error || !data) {
    return {
      coin_name: '',
      coin_symbol: payload.coin_symbol,
      news_summaries: [],
      total_news_processed: 0,
      time_window_start: yesterday.toISOString(),
      time_window_end: now.toISOString(),
      news_sources: [],
    };
  }

  // news_output is now a direct array
  const bullets = (data.news_output as string[]) || [];
  const newsBody = (data.news_body as string[]) || [];

  return {
    coin_name: data.token_name,
    coin_symbol: payload.coin_symbol,
    news_summaries: bullets,
    news_body: newsBody,
    total_news_processed: bullets.length,
    time_window_start: data.created_at || yesterday.toISOString(),
    time_window_end: now.toISOString(),
    news_sources: [],
  };
}

export async function fetchDescription(
  payload: CoinRequest,
  language: Language = 'tr'
): Promise<DescriptionResponse> {
  const tokenId = parseInt(payload.coin_symbol, 10);

  const { data, error } = await supabase
    .from('main_summaries')
    .select('token_name, description')
    .eq('token_id', tokenId)
    .eq('language', language)
    .single();

  if (error || !data) {
    return {
      coin_name: '',
      coin_symbol: payload.coin_symbol,
      description: null,
    };
  }

  return {
    coin_name: data.token_name,
    coin_symbol: payload.coin_symbol,
    description: data.description || null,
  };
}
