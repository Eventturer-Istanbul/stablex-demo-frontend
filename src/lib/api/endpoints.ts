export const ENDPOINTS = {
  SENTIMENT_SCORES: '/sentiment-scores',
  SENTIMENT: '/v1/sentiment',
  DISCUSSION_TOPICS: '/discussion-topics',
  TOPICS: '/v1/discussion_topics',
  NEWS: '/v1/news',
  DESCRIPTION: '/v1/description',
} as const;

// News API has its own base URL
export const NEWS_API_BASE_URL = 'https://stablex-news-api.up.railway.app';
