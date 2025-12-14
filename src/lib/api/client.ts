import { CoinRequest, SentimentResponse, TopicsResponse, NewsResponse } from '@/types/api';
import { ENDPOINTS, NEWS_API_BASE_URL } from './endpoints';
import { getMockData } from './mock-data';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true' || !API_BASE_URL;

async function simulateDelay(): Promise<void> {
  const delay = 800 + Math.random() * 400; // 800-1200ms
  await new Promise((resolve) => setTimeout(resolve, delay));
}

async function apiPost<TRequest, TResponse>(
  endpoint: string,
  payload: TRequest
): Promise<TResponse> {
  if (USE_MOCK) {
    await simulateDelay();
    const coinSymbol = (payload as CoinRequest).coin_symbol;
    return getMockData(endpoint, coinSymbol) as TResponse;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function fetchSentiment(
  payload: CoinRequest
): Promise<SentimentResponse> {
  const params = new URLSearchParams({
    coin_symbol: payload.coin_symbol,
  });

  const response = await fetch(`${NEWS_API_BASE_URL}${ENDPOINTS.SENTIMENT}?${params}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData?.error?.message || `Sentiment API Error: ${response.status}`;
    throw new Error(errorMessage);
  }

  const data = await response.json();

  // Scale sentiment from 0-1 to 0-10 for UI display
  return {
    ...data,
    sentiment_score: data.sentiment_score * 10,
  };
}

export async function fetchTopics(payload: CoinRequest): Promise<TopicsResponse> {
  return apiPost<CoinRequest, TopicsResponse>(
    ENDPOINTS.DISCUSSION_TOPICS,
    payload
  );
}

export async function fetchNews(payload: CoinRequest): Promise<NewsResponse> {
  // News uses the real API with GET request
  const params = new URLSearchParams({
    coin_symbol: payload.coin_symbol,
    time_window_latest: '24', // Last 24 hours
  });

  const response = await fetch(`${NEWS_API_BASE_URL}${ENDPOINTS.NEWS}?${params}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData?.error?.message || `News API Error: ${response.status}`;
    throw new Error(errorMessage);
  }

  return response.json();
}
