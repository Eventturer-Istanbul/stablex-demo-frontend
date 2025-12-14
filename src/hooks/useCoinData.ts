'use client';

import { useState, useCallback } from 'react';
import { CoinSymbol, EndpointState } from '@/types/coin';
import { SentimentResponse, TopicsResponse, NewsResponse } from '@/types/api';
import { fetchSentiment, fetchTopics, fetchNews } from '@/lib/api';

const initialState = <T,>(): EndpointState<T> => ({
  status: 'idle',
  data: null,
  error: null,
});

export interface UseCoinDataReturn {
  sentiment: EndpointState<SentimentResponse>;
  topics: EndpointState<TopicsResponse>;
  news: EndpointState<NewsResponse>;
  fetchAll: () => Promise<void>;
  retrySentiment: () => Promise<void>;
  retryTopics: () => Promise<void>;
  retryNews: () => Promise<void>;
}

export function useCoinData(coinSymbol: CoinSymbol): UseCoinDataReturn {
  const [sentiment, setSentiment] = useState<EndpointState<SentimentResponse>>(
    initialState<SentimentResponse>()
  );
  const [topics, setTopics] = useState<EndpointState<TopicsResponse>>(
    initialState<TopicsResponse>()
  );
  const [news, setNews] = useState<EndpointState<NewsResponse>>(
    initialState<NewsResponse>()
  );

  const fetchSentimentData = useCallback(async () => {
    setSentiment((prev) => ({ ...prev, status: 'loading', error: null }));
    try {
      const data = await fetchSentiment({ coin_symbol: coinSymbol });
      setSentiment({ status: 'success', data, error: null });
    } catch (err) {
      setSentiment((prev) => ({
        ...prev,
        status: 'error',
        error: err instanceof Error ? err.message : 'Failed to fetch sentiment',
      }));
    }
  }, [coinSymbol]);

  const fetchTopicsData = useCallback(async () => {
    setTopics((prev) => ({ ...prev, status: 'loading', error: null }));
    try {
      const data = await fetchTopics({ coin_symbol: coinSymbol });
      setTopics({ status: 'success', data, error: null });
    } catch (err) {
      setTopics((prev) => ({
        ...prev,
        status: 'error',
        error: err instanceof Error ? err.message : 'Failed to fetch topics',
      }));
    }
  }, [coinSymbol]);

  const fetchNewsData = useCallback(async () => {
    setNews((prev) => ({ ...prev, status: 'loading', error: null }));
    try {
      const data = await fetchNews({ coin_symbol: coinSymbol });
      setNews({ status: 'success', data, error: null });
    } catch (err) {
      setNews((prev) => ({
        ...prev,
        status: 'error',
        error: err instanceof Error ? err.message : 'Failed to fetch news',
      }));
    }
  }, [coinSymbol]);

  const fetchAll = useCallback(async () => {
    // Fire all 3 requests in parallel
    await Promise.allSettled([
      fetchSentimentData(),
      fetchTopicsData(),
      fetchNewsData(),
    ]);
  }, [fetchSentimentData, fetchTopicsData, fetchNewsData]);

  return {
    sentiment,
    topics,
    news,
    fetchAll,
    retrySentiment: fetchSentimentData,
    retryTopics: fetchTopicsData,
    retryNews: fetchNewsData,
  };
}
