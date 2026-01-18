'use client';

import { useEffect, useState } from 'react';
import { CoinSymbol } from '@/types/coin';
import { useCoinData } from '@/hooks/useCoinData';
import { SentimentCard } from './cards/SentimentCard';
import { DiscussionTopicsCard } from './cards/DiscussionTopicsCard';
import { NewsCard } from './cards/NewsCard';
import { DescriptionCard } from './cards/DescriptionCard';
import { InsightsPanel } from '@/components/insights';

interface CoinDetailsProps {
  coinSymbol: CoinSymbol;
  coinName?: string;
  coinColor?: string;
}

export function CoinDetails({ coinSymbol, coinName = '', coinColor = '#627EEA' }: CoinDetailsProps) {
  const [insightsPanelOpen, setInsightsPanelOpen] = useState(false);
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
      {/* AI Insights Button */}
      <div className="mb-4">
        <button
          onClick={() => setInsightsPanelOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-semibold rounded-lg hover:opacity-90 transition-opacity"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/>
          </svg>
          AI Insights
        </button>
      </div>

      <div className="mb-4">
        <DescriptionCard state={description} onRetry={retryDescription} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SentimentCard state={sentiment} onRetry={retrySentiment} />
        <DiscussionTopicsCard state={topics} onRetry={retryTopics} />
        <NewsCard state={news} onRetry={retryNews} />
      </div>

      {/* Insights Side Panel */}
      <InsightsPanel
        tokenId={coinSymbol}
        tokenName={coinName || 'Token'}
        tokenColor={coinColor}
        isOpen={insightsPanelOpen}
        onClose={() => setInsightsPanelOpen(false)}
      />
    </div>
  );
}
