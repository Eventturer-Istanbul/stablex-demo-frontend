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

function getShortUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    // Get domain + first 2-3 path segments
    const pathParts = urlObj.pathname.split('/').filter(p => p);
    const shortPath = pathParts.slice(0, 2).join('/');
    return `${urlObj.origin}${shortPath ? '/' + shortPath : ''}`;
  } catch {
    // If URL parsing fails, return first 50 characters
    return url.length > 50 ? url.substring(0, 50) + '...' : url;
  }
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

  const { news_summaries, news_body, citation_urls, total_news_processed, time_window_start, time_window_end } = state.data!;
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
            {/* News items */}
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
            
            {/* Grouped Citations Section */}
            {citation_urls && citation_urls.length > 0 && (() => {
              // Parse citation URLs - handle both comma-separated strings and arrays
              const parsedUrls = citation_urls.flatMap(url => {
                if (typeof url === 'string' && url.includes(',')) {
                  // Split comma-separated URLs
                  return url.split(',').map(u => u.trim()).filter(u => u);
                }
                return url ? [url.trim()] : [];
              }).filter(url => url);

              if (parsedUrls.length === 0) return null;

              return (
                <div className="mt-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-2 mb-3">
                    <svg 
                      className="w-4 h-4 text-blue-600 dark:text-blue-400" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" 
                      />
                    </svg>
                    <span className="text-sm font-semibold text-blue-900 dark:text-blue-300">
                      {language === 'en' ? 'Sources' : 'Kaynaklar'}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {parsedUrls.map((url, index) => (
                      <a
                        key={index}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-blue-700 dark:text-blue-300 bg-white dark:bg-gray-800 border border-blue-300 dark:border-blue-700 rounded-full hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <svg 
                          className="w-3 h-3" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                          />
                        </svg>
                        {getShortUrl(url)}
                      </a>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        </Modal>
      )}
    </Card>
  );
}
