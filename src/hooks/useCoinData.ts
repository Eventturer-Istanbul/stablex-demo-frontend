'use client';

import { useState, useCallback, useEffect } from 'react';
import { CoinSymbol, EndpointState } from '@/types/coin';
import { SentimentResponse, TopicsResponse, NewsResponse, DescriptionResponse } from '@/types/api';
import { fetchSentiment, fetchTopics, fetchNews, fetchDescription } from '@/lib/api';
import { useLanguage } from '@/contexts/LanguageContext';

const initialState = <T,>(): EndpointState<T> => ({
  status: 'idle',
  data: null,
  error: null,
});

export interface UseCoinDataReturn {
  sentiment: EndpointState<SentimentResponse>;
  topics: EndpointState<TopicsResponse>;
  news: EndpointState<NewsResponse>;
  description: EndpointState<DescriptionResponse>;
  fetchAll: () => Promise<void>;
  retrySentiment: () => Promise<void>;
  retryTopics: () => Promise<void>;
  retryNews: () => Promise<void>;
  retryDescription: () => Promise<void>;
}

export function useCoinData(coinSymbol: CoinSymbol): UseCoinDataReturn {
  const { language } = useLanguage();
  const [sentiment, setSentiment] = useState<EndpointState<SentimentResponse>>(
    initialState<SentimentResponse>()
  );
  const [topics, setTopics] = useState<EndpointState<TopicsResponse>>(
    initialState<TopicsResponse>()
  );
  const [news, setNews] = useState<EndpointState<NewsResponse>>(
    initialState<NewsResponse>()
  );
  const [description, setDescription] = useState<EndpointState<DescriptionResponse>>(
    initialState<DescriptionResponse>()
  );

  const fetchSentimentData = useCallback(async () => {
    setSentiment((prev) => ({ ...prev, status: 'loading', error: null }));
    try {
      const data = await fetchSentiment({ coin_symbol: coinSymbol }, language);
      setSentiment({ status: 'success', data, error: null });
    } catch (err) {
      setSentiment((prev) => ({
        ...prev,
        status: 'error',
        error: err instanceof Error ? err.message : 'Failed to fetch sentiment',
      }));
    }
  }, [coinSymbol, language]);

  const fetchTopicsData = useCallback(async () => {
    setTopics((prev) => ({ ...prev, status: 'loading', error: null }));
    try {
      const data = await fetchTopics({ coin_symbol: coinSymbol }, language);
      setTopics({ status: 'success', data, error: null });
    } catch (err) {
      setTopics((prev) => ({
        ...prev,
        status: 'error',
        error: err instanceof Error ? err.message : 'Failed to fetch topics',
      }));
    }
  }, [coinSymbol, language]);

  const fetchNewsData = useCallback(async () => {
    setNews((prev) => ({ ...prev, status: 'loading', error: null }));
    try {
      const data = await fetchNews({ coin_symbol: coinSymbol }, language);
      setNews({ status: 'success', data, error: null });
    } catch (err) {
      setNews((prev) => ({
        ...prev,
        status: 'error',
        error: err instanceof Error ? err.message : 'Failed to fetch news',
      }));
    }
  }, [coinSymbol, language]);

  const fetchDescriptionData = useCallback(async () => {
    setDescription((prev) => ({ ...prev, status: 'loading', error: null }));
    try {
      const data = await fetchDescription({ coin_symbol: coinSymbol }, language);
      setDescription({ status: 'success', data, error: null });
    } catch (err) {
      setDescription((prev) => ({
        ...prev,
        status: 'error',
        error: err instanceof Error ? err.message : 'Failed to fetch description',
      }));
    }
  }, [coinSymbol, language]);

  const fetchAll = useCallback(async () => {
    // Fire all 4 requests in parallel
    await Promise.allSettled([
      fetchSentimentData(),
      fetchTopicsData(),
      fetchNewsData(),
      fetchDescriptionData(),
    ]);
  }, [fetchSentimentData, fetchTopicsData, fetchNewsData, fetchDescriptionData]);

  // Re-fetch data when language changes
  useEffect(() => {
    if (coinSymbol) {
      fetchAll();
    }
  }, [language, coinSymbol, fetchAll]);

  return {
    sentiment,
    topics,
    news,
    description,
    fetchAll,
    retrySentiment: fetchSentimentData,
    retryTopics: fetchTopicsData,
    retryNews: fetchNewsData,
    retryDescription: fetchDescriptionData,
  };
}
