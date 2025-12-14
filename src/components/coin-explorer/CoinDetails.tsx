'use client';

import { useEffect } from 'react';
import { CoinSymbol } from '@/types/coin';
import { useCoinData } from '@/hooks/useCoinData';
import { SentimentCard } from './cards/SentimentCard';
import { DiscussionTopicsCard } from './cards/DiscussionTopicsCard';
import { NewsCard } from './cards/NewsCard';

interface CoinDetailsProps {
  coinSymbol: CoinSymbol;
}

export function CoinDetails({ coinSymbol }: CoinDetailsProps) {
  const {
    sentiment,
    topics,
    news,
    fetchAll,
    retrySentiment,
    retryTopics,
    retryNews,
  } = useCoinData(coinSymbol);

  // Fetch all data when component mounts
  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <div className="p-4 pt-0">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SentimentCard state={sentiment} onRetry={retrySentiment} />
        <DiscussionTopicsCard state={topics} onRetry={retryTopics} />
        <NewsCard state={news} onRetry={retryNews} />
      </div>
    </div>
  );
}
