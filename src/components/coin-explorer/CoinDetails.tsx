'use client';

import { useEffect } from 'react';
import { CoinSymbol } from '@/types/coin';
import { useCoinData } from '@/hooks/useCoinData';
import { SentimentCard } from './cards/SentimentCard';
import { DiscussionTopicsCard } from './cards/DiscussionTopicsCard';
import { NewsCard } from './cards/NewsCard';
import { DescriptionCard } from './cards/DescriptionCard';

interface CoinDetailsProps {
  coinSymbol: CoinSymbol;
}

export function CoinDetails({ coinSymbol }: CoinDetailsProps) {
  const {
    sentiment,
    topics,
    news,
    description,
    fetchAll,
    retrySentiment,
    retryTopics,
    retryNews,
    retryDescription,
  } = useCoinData(coinSymbol);

  // Fetch all data when component mounts
  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <div className="p-4 pt-0">
      <div className="mb-4">
        <DescriptionCard state={description} onRetry={retryDescription} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SentimentCard state={sentiment} onRetry={retrySentiment} />
        <DiscussionTopicsCard state={topics} onRetry={retryTopics} />
        <NewsCard state={news} onRetry={retryNews} />
      </div>
    </div>
  );
}
