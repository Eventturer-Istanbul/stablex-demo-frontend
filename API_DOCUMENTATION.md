# StableX Insights API Documentation

**Base URL:** `https://stablex-news-api.up.railway.app`

---

## Overview

The StableX Insights API provides cryptocurrency intelligence through three main endpoints:

- **News API** (`/v1/news`) - AI-generated news summaries aggregated from multiple sources
- **Sentiment API** (`/v1/sentiment`) - Real-time sentiment scores derived from social media analysis
- **Discussion Topics API** (`/v1/discussion_topics`) - Trending discussion topics from social media

---

## Endpoints

### Health Check

Check if the API is running.

```
GET /health
```

**Example:**
```bash
curl https://stablex-news-api.up.railway.app/health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-12-14T20:15:00.000Z",
  "uptime": 3600
}
```

---

### Get News

Retrieve news articles for a specific cryptocurrency.

```
GET /v1/news
```

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `coin_symbol` | string | Yes* | Coin ticker (e.g., `BTC`, `ETH`, `SOL`) |
| `coin_name` | string | Yes* | Coin full name (e.g., `Bitcoin`, `Ethereum`) |
| `time_window_latest` | integer | Yes | Hours to look back (1-168) |

*Provide either `coin_symbol` OR `coin_name`, not both.

#### Supported Coins

| Symbol | Name |
|--------|------|
| BTC | Bitcoin |
| ETH | Ethereum |
| SOL | Solana |
| LINK | Chainlink |
| UNI | Uniswap |
| POL | Polygon |
| AVAX | Avalanche |
| RENDER | Render Network |
| GRT | The Graph |
| ALGO | Algorand |

---

### Get Sentiment

Retrieve sentiment scores for a specific cryptocurrency based on social media analysis.

```
GET /v1/sentiment
```

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `coin_symbol` | string | Yes* | Coin ticker (e.g., `BTC`, `ETH`, `SOL`) |
| `coin_name` | string | Yes* | Coin full name (e.g., `Bitcoin`, `Ethereum`) |
| `time_window_start` | string | No | ISO timestamp to filter by window (defaults to latest) |

*Provide either `coin_symbol` OR `coin_name`, not both.

#### Response Format

```json
{
  "coin_name": "Bitcoin",
  "coin_symbol": "BTC",
  "time_window_start": "2025-12-14T14:00:00.000Z",
  "time_window_end": "2025-12-14T20:00:00.000Z",
  "total_tweets_processed": 150,
  "sentiment_score": 0.72
}
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `coin_name` | string | Full cryptocurrency name |
| `coin_symbol` | string | Coin ticker symbol |
| `time_window_start` | string | Start of analysis window (ISO 8601 UTC) |
| `time_window_end` | string | End of analysis window (ISO 8601 UTC) |
| `total_tweets_processed` | integer | Number of tweets analyzed |
| `sentiment_score` | float | Sentiment score (0.0 = negative, 1.0 = positive) |

---

### Get Discussion Topics

Retrieve trending discussion topics for a specific cryptocurrency based on social media analysis.

```
GET /v1/discussion_topics
```

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `coin_symbol` | string | Yes* | Coin ticker (e.g., `BTC`, `ETH`, `SOL`) |
| `coin_name` | string | Yes* | Coin full name (e.g., `Bitcoin`, `Ethereum`) |
| `time_window_start` | string | No | ISO timestamp to filter by window (defaults to latest) |

*Provide either `coin_symbol` OR `coin_name`, not both.

#### Response Format

```json
{
  "coin_name": "Bitcoin",
  "coin_symbol": "BTC",
  "time_window_start": "2025-12-14T14:00:00.000Z",
  "time_window_end": "2025-12-14T20:00:00.000Z",
  "total_tweets_processed": 150,
  "topics": [
    { "rank": 1, "text": "ETF approval momentum", "sentiment": "positive", "tweet_count": 45 },
    { "rank": 2, "text": "Price prediction $100K", "sentiment": "positive", "tweet_count": 38 },
    { "rank": 3, "text": "Mining difficulty increase", "sentiment": "neutral", "tweet_count": 32 }
  ]
}
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `coin_name` | string | Full cryptocurrency name |
| `coin_symbol` | string | Coin ticker symbol |
| `time_window_start` | string | Start of analysis window (ISO 8601 UTC) |
| `time_window_end` | string | End of analysis window (ISO 8601 UTC) |
| `total_tweets_processed` | integer | Number of tweets analyzed |
| `topics` | array | Array of discussion topics |
| `topics[].rank` | integer | Topic rank (1 = most discussed) |
| `topics[].text` | string | Topic description |
| `topics[].sentiment` | string | Topic sentiment (positive/negative/neutral/mixed) |
| `topics[].tweet_count` | integer | Number of tweets discussing this topic |

---

## Examples

### News Examples

### Get Bitcoin News (Last 6 Hours)

```bash
curl "https://stablex-news-api.up.railway.app/v1/news?coin_symbol=BTC&time_window_latest=6"
```

### Get Ethereum News (Last 24 Hours)

```bash
curl "https://stablex-news-api.up.railway.app/v1/news?coin_symbol=ETH&time_window_latest=24"
```

### Get Solana News by Name (Last 12 Hours)

```bash
curl "https://stablex-news-api.up.railway.app/v1/news?coin_name=Solana&time_window_latest=12"
```

### Sentiment Examples

### Get Bitcoin Sentiment (Latest)

```bash
curl "https://stablex-news-api.up.railway.app/v1/sentiment?coin_symbol=BTC"
```

### Get Ethereum Sentiment by Name

```bash
curl "https://stablex-news-api.up.railway.app/v1/sentiment?coin_name=Ethereum"
```

### Get Sentiment with Time Filter

```bash
curl "https://stablex-news-api.up.railway.app/v1/sentiment?coin_symbol=SOL&time_window_start=2025-12-14T00:00:00Z"
```

### Discussion Topics Examples

### Get Bitcoin Discussion Topics (Latest)

```bash
curl "https://stablex-news-api.up.railway.app/v1/discussion_topics?coin_symbol=BTC"
```

### Get Ethereum Topics by Name

```bash
curl "https://stablex-news-api.up.railway.app/v1/discussion_topics?coin_name=Ethereum"
```

### Get Topics with Time Filter

```bash
curl "https://stablex-news-api.up.railway.app/v1/discussion_topics?coin_symbol=SOL&time_window_start=2025-12-14T00:00:00Z"
```

---

## Response Format

### News Response

### Success Response (200 OK)

```json
{
  "coin_name": "Bitcoin",
  "coin_symbol": "BTC",
  "time_window_start": "2025-12-14T14:00:00.000Z",
  "time_window_end": "2025-12-14T20:00:00.000Z",
  "total_news_processed": 8,
  "news_summaries": [
    "Bitcoin surges past $100K as institutional demand reaches all-time highs amid ETF approval optimism...",
    "MicroStrategy purchases additional 5,000 BTC, bringing total holdings to 190,000 Bitcoin worth $19B..."
  ],
  "news_sources": [
    "https://www.coindesk.com/markets/2025/12/14/bitcoin-surges",
    "https://www.coindesk.com/business/2025/12/14/microstrategy-buys-bitcoin"
  ]
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `coin_name` | string | Full cryptocurrency name |
| `coin_symbol` | string | Coin ticker symbol |
| `time_window_start` | string | Start of time window (ISO 8601 UTC) |
| `time_window_end` | string | End of time window (ISO 8601 UTC) |
| `total_news_processed` | integer | Number of articles found |
| `news_summaries` | string[] | Array of AI-generated bullet summaries |
| `news_sources` | string[] | Array of unique article URLs |

### Sentiment Response

```json
{
  "coin_name": "Ethereum",
  "coin_symbol": "ETH",
  "time_window_start": "2025-12-14T14:00:00.000Z",
  "time_window_end": "2025-12-14T20:00:00.000Z",
  "total_tweets_processed": 230,
  "sentiment_score": 0.65
}
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `coin_name` | string | Full cryptocurrency name |
| `coin_symbol` | string | Coin ticker symbol |
| `time_window_start` | string | Start of analysis window (ISO 8601 UTC) |
| `time_window_end` | string | End of analysis window (ISO 8601 UTC) |
| `total_tweets_processed` | integer | Number of tweets analyzed |
| `sentiment_score` | float | Sentiment score (0.0 = most negative, 1.0 = most positive) |

### Discussion Topics Response

```json
{
  "coin_name": "Solana",
  "coin_symbol": "SOL",
  "time_window_start": "2025-12-14T14:00:00.000Z",
  "time_window_end": "2025-12-14T20:00:00.000Z",
  "total_tweets_processed": 180,
  "topics": [
    { "rank": 1, "text": "Solana DeFi ecosystem growth", "sentiment": "positive", "tweet_count": 52 },
    { "rank": 2, "text": "Network performance upgrades", "sentiment": "positive", "tweet_count": 41 },
    { "rank": 3, "text": "NFT marketplace activity", "sentiment": "neutral", "tweet_count": 35 }
  ]
}
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `coin_name` | string | Full cryptocurrency name |
| `coin_symbol` | string | Coin ticker symbol |
| `time_window_start` | string | Start of analysis window (ISO 8601 UTC) |
| `time_window_end` | string | End of analysis window (ISO 8601 UTC) |
| `total_tweets_processed` | integer | Number of tweets analyzed |
| `topics` | array | Array of discussion topics with rank, text, sentiment, tweet_count |

---

## Error Responses

### 400 Bad Request - Missing Parameters

```json
{
  "error": {
    "name": "ValidationError",
    "code": "VALIDATION_ERROR",
    "message": "Either coin_symbol or coin_name must be provided",
    "field": "coin_symbol",
    "timestamp": "2025-12-14T20:00:00.000Z"
  }
}
```

### 400 Bad Request - Invalid Time Window

```json
{
  "error": {
    "name": "ValidationError",
    "code": "VALIDATION_ERROR",
    "message": "time_window_latest must be between 1 and 168 hours",
    "field": "time_window_latest",
    "timestamp": "2025-12-14T20:00:00.000Z"
  }
}
```

### 400 Bad Request - Unknown Coin

```json
{
  "error": {
    "name": "ValidationError",
    "code": "VALIDATION_ERROR",
    "message": "Unknown coin: XYZ. Supported coins: BTC, ETH, SOL, LINK, UNI, POL, AVAX, RENDER, GRT, ALGO",
    "field": "coin_symbol",
    "timestamp": "2025-12-14T20:00:00.000Z"
  }
}
```

### 404 Not Found - Invalid Endpoint

```json
{
  "error": {
    "name": "NotFoundError",
    "code": "NOT_FOUND",
    "message": "Route not found: GET /invalid",
    "timestamp": "2025-12-14T20:00:00.000Z"
  }
}
```

### 500 Internal Server Error

```json
{
  "error": {
    "name": "DatabaseError",
    "code": "DATABASE_ERROR",
    "message": "Failed to fetch articles",
    "timestamp": "2025-12-14T20:00:00.000Z"
  }
}
```

---

## Code Examples

### JavaScript (fetch)

```javascript
// Get news
const newsResponse = await fetch(
  'https://stablex-news-api.up.railway.app/v1/news?coin_symbol=BTC&time_window_latest=6'
);
const newsData = await newsResponse.json();
console.log(newsData.news_summaries);

// Get sentiment
const sentimentResponse = await fetch(
  'https://stablex-news-api.up.railway.app/v1/sentiment?coin_symbol=BTC'
);
const sentimentData = await sentimentResponse.json();
console.log(`Sentiment: ${sentimentData.sentiment_score}`);

// Get discussion topics
const topicsResponse = await fetch(
  'https://stablex-news-api.up.railway.app/v1/discussion_topics?coin_symbol=BTC'
);
const topicsData = await topicsResponse.json();
console.log(`Topics: ${topicsData.topics.map(t => t.text).join(', ')}`);
```

### Python (requests)

```python
import requests

# Get news
news_response = requests.get(
    'https://stablex-news-api.up.railway.app/v1/news',
    params={'coin_symbol': 'BTC', 'time_window_latest': 6}
)
news_data = news_response.json()
print(news_data['news_summaries'])

# Get sentiment
sentiment_response = requests.get(
    'https://stablex-news-api.up.railway.app/v1/sentiment',
    params={'coin_symbol': 'BTC'}
)
sentiment_data = sentiment_response.json()
print(f"Sentiment: {sentiment_data['sentiment_score']}")

# Get discussion topics
topics_response = requests.get(
    'https://stablex-news-api.up.railway.app/v1/discussion_topics',
    params={'coin_symbol': 'BTC'}
)
topics_data = topics_response.json()
print(f"Topics: {[t['text'] for t in topics_data['topics']]}")
```

### Node.js (axios)

```javascript
const axios = require('axios');

// Get news
const { data: news } = await axios.get('https://stablex-news-api.up.railway.app/v1/news', {
  params: { coin_symbol: 'ETH', time_window_latest: 12 }
});
console.log(news.total_news_processed);

// Get sentiment
const { data: sentiment } = await axios.get('https://stablex-news-api.up.railway.app/v1/sentiment', {
  params: { coin_symbol: 'ETH' }
});
console.log(`Sentiment: ${sentiment.sentiment_score}`);

// Get discussion topics
const { data: topics } = await axios.get('https://stablex-news-api.up.railway.app/v1/discussion_topics', {
  params: { coin_symbol: 'ETH' }
});
console.log(`Top topic: ${topics.topics[0]?.text}`);
```

---

## Rate Limits

Currently no rate limits are enforced. Please use responsibly.

---

## Status

Check API status: https://stablex-news-api.up.railway.app/health
