'use client';

import { useState } from 'react';
import { NewsResponse } from '@/types/api';
import { EndpointState } from '@/types/coin';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { NewsSkeleton } from '@/components/ui/Skeleton';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { useLanguage } from '@/contexts/LanguageContext';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

interface NewsCardProps {
  state: EndpointState<NewsResponse>;
  onRetry: () => void;
}

function formatDate(isoString: string, language: 'en' | 'tr' = 'tr'): string {
  return new Date(isoString).toLocaleDateString(language === 'en' ? 'en-US' : 'tr-TR', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function NewsCard({ state, onRetry }: NewsCardProps) {
  const { language } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  if (state.status === 'idle' || state.status === 'loading') {
    return <NewsSkeleton />;
  }

  if (state.status === 'error') {
    return <ErrorMessage message={state.error || (language === 'en' ? 'Failed to load news' : 'Haberler yüklenemedi')} onRetry={onRetry} />;
  }

  const { news_summaries, news_body, total_news_processed, time_window_start, time_window_end } = state.data!;
  const hasDetailedNews = news_body && news_body.length > 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{language === 'en' ? 'News' : 'Haberler'}</CardTitle>
          {hasDetailedNews && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2"
            >
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" 
                />
              </svg>
              {language === 'en' ? 'Expand' : 'Genişlet'}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 mb-4">
          {news_summaries.map((summary, index) => (
            <div
              key={index}
              className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 text-sm text-gray-700 dark:text-gray-300"
            >
              {summary}
            </div>
          ))}
        </div>
{/* <p className="text-sm text-gray-600 dark:text-gray-400">
          {total_news_processed} news articles processed
        </p> */}
      </CardContent>
      
      {/* Modal for detailed news */}
      {hasDetailedNews && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={language === 'en' ? 'Detailed News' : 'Detaylı Haberler'}
        >
          <div className="space-y-4">
            {news_body!.map((newsItem, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600"
              >
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {newsItem}
                </p>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </Card>
  );
}
