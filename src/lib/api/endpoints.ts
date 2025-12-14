export const ENDPOINTS = {
  SENTIMENT_SCORES: '/sentiment-scores',
  DISCUSSION_TOPICS: '/discussion-topics',
  NEWS: '/v1/news',
} as const;

// News API has its own base URL
export const NEWS_API_BASE_URL = 'https://stablex-news-api.up.railway.app';
