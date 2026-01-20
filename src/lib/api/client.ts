import { CoinRequest, SentimentResponse, TopicsResponse, NewsResponse, DescriptionResponse, InsightsResponse, TechnicalAnalysisResponse } from '@/types/api';
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
    .select('token_name, sentiment_score, tweet_count, created_at')
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
    tweet_count: data.tweet_count || 0,
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
    .select('token_name, discussion_topics, top_tweets, created_at')
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

  // Handle top_tweets which can be either strings or objects
  const topTweets = (data.top_tweets as any[]) || [];

  return {
    coin_name: data.token_name,
    coin_symbol: payload.coin_symbol,
    topics,
    top_tweets: topTweets,
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

  // Fetch with news_body and citation_urls included
  const { data, error } = await supabase
    .from('main_summaries')
    .select('token_name, news_output, news_body, citation_urls, created_at')
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
  const citationUrls = (data.citation_urls as string[]) || [];

  return {
    coin_name: data.token_name,
    coin_symbol: payload.coin_symbol,
    news_summaries: bullets,
    news_body: newsBody,
    citation_urls: citationUrls,
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

export async function fetchInsights(
  payload: CoinRequest,
  language: Language = 'en'
): Promise<InsightsResponse | null> {
  const tokenId = parseInt(payload.coin_symbol, 10);

  // Fetch main summaries and technical analysis in parallel
  const [summariesResult, technicalResult] = await Promise.all([
    supabase
      .from('main_summaries')
      .select('token_name, description, insights, discussion_topics, sentiment_score, tweet_count, top_tweets, news_body, citation_urls')
      .eq('token_id', tokenId)
      .eq('language', language)
      .single(),
    supabase
      .from('token_technical_analysis')
      .select('token_name, positive_paragraphs, risk_paragraphs, indicators_snapshot, created_at, updated_at')
      .eq('token_id', tokenId)
      .eq('language', language)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()
  ]);

  const { data, error } = summariesResult;

  if (error || !data || !data.insights) {
    return null;
  }

  const insights = data.insights as any;
  const sentimentScore = parseFloat(data.sentiment_score) || 0;

  // Process technical analysis if available
  let technicalAnalysis: TechnicalAnalysisResponse | null = null;
  if (technicalResult.data && !technicalResult.error) {
    const ta = technicalResult.data;
    const indicators = ta.indicators_snapshot as any;
    technicalAnalysis = {
      token_name: ta.token_name,
      current_price: indicators?.current_price || 0,
      positive_paragraphs: (ta.positive_paragraphs as string[]) || [],
      risk_paragraphs: (ta.risk_paragraphs as string[]) || [],
      indicators: indicators?.indicators || null,
      created_at: ta.created_at,
    };
  }

  // Enrich sources with full news_body and citation_urls from main_summaries
  const newsBody = (data.news_body as string[]) || [];
  const citationUrls = (data.citation_urls as any[]) || [];
  const enrichedSources = (insights.sources || []).map((source: any, index: number) => {
    // citation_urls is an array of arrays - get first URL from nested array if available
    const citationArray = citationUrls[index];
    const citationUrl = Array.isArray(citationArray) && citationArray.length > 0
      ? citationArray[0]
      : null;

    return {
      ...source,
      // Use full body from news_body array if available, fallback to existing summary
      summary: newsBody[index] || source.summary || '',
      // Use citation URL if available, properly falls back to source.url
      url: citationUrl || source.url || null,
    };
  });

  return {
    token: insights.token || { id: String(tokenId), symbol: '', name: data.token_name },
    updated_at: technicalResult.data?.updated_at || insights.updated_at || null,
    tldr: insights.tldr || null,
    what_is: {
      question: `What is ${insights.token?.symbol || ''}?`,
      answer: data.description || null,
    },
    positives: insights.positives || [],
    negatives: insights.negatives || [],
    sources: enrichedSources,
    discussion: {
      overall: sentimentScore > 0 ? 'positive' : sentimentScore < 0 ? 'negative' : 'neutral',
      score: sentimentScore,
      tweet_count: data.tweet_count || 0,
      topics: (data.discussion_topics as string[]) || [],
      top_tweets: (data.top_tweets as any[]) || [],
    },
    technical_analysis: technicalAnalysis,
    disclaimer: insights.disclaimer || 'The information in this report could be inaccurate. Please DYOR. Not financial advice.',
  };
}
