'use client';

import { useState } from 'react';
import { TopicsResponse } from '@/types/api';
import { EndpointState } from '@/types/coin';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { TopicsSkeleton } from '@/components/ui/Skeleton';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { Chip } from '@/components/ui/Chip';
import { useLanguage } from '@/contexts/LanguageContext';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

interface DiscussionTopicsCardProps {
  state: EndpointState<TopicsResponse>;
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

export function DiscussionTopicsCard({ state, onRetry }: DiscussionTopicsCardProps) {
  const { language } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  if (state.status === 'idle' || state.status === 'loading') {
    return <TopicsSkeleton />;
  }

  if (state.status === 'error') {
    return <ErrorMessage message={state.error || (language === 'en' ? 'Failed to load topics' : 'Konular yüklenemedi')} onRetry={onRetry} />;
  }

  const { topics, top_tweets, total_tweets_processed, time_window_start, time_window_end } = state.data!;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{language === 'en' ? 'Discussion Topics' : 'Tartışma Konuları'}</CardTitle>
          {topics.length > 0 && (
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
        <div className="flex flex-wrap gap-2 mb-4">
          {topics.map((topic) => (
            <Chip key={topic.rank}>{topic.text}</Chip>
          ))}
        </div>
{/* <p className="text-sm text-gray-600 dark:text-gray-400">
          {total_tweets_processed.toLocaleString()} tweets processed
        </p> */}
      </CardContent>
      
      {/* Modal for detailed topics view */}
      {topics.length > 0 && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={language === 'en' ? 'Top Tweets' : 'Öne Çıkan Tweetler'}
        >
          <div className="space-y-3">
            {/* Top Tweets Only */}
            {top_tweets && top_tweets.length > 0 ? (
              <>
                {top_tweets.map((tweet, index) => {
                  // Handle both string and object formats
                  const tweetText = typeof tweet === 'string' ? tweet : (tweet as any).text || '';
                  const tweetData = typeof tweet === 'object' ? tweet as any : null;
                  
                  return (
                    <div
                      key={index}
                      className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                    >
                      {/* Tweet Text */}
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                        {tweetText}
                      </p>
                      
                      {/* Author and Metrics */}
                      {tweetData && (
                        <>
                          {/* Author Info */}
                          {tweetData.author_username && (
                            <div className="mt-3 pt-3 border-t border-blue-200 dark:border-blue-700">
                              <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                                @{tweetData.author_username}
                                {tweetData.author_verified && (
                                  <span className="ml-1 text-blue-500">✓</span>
                                )}
                                {tweetData.author_name && (
                                  <span className="ml-2">• {tweetData.author_name}</span>
                                )}
                              </p>
                            </div>
                          )}
                          
                          {/* Engagement Metrics */}
                          <div className="mt-3 flex flex-wrap gap-4 text-xs text-gray-600 dark:text-gray-400">
                            {tweetData.views !== undefined && (
                              <div className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                <span>{tweetData.views.toLocaleString()}</span>
                              </div>
                            )}
                            {tweetData.likes !== undefined && (
                              <div className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                <span>{tweetData.likes.toLocaleString()}</span>
                              </div>
                            )}
                            {tweetData.retweets !== undefined && (
                              <div className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                </svg>
                                <span>{tweetData.retweets.toLocaleString()}</span>
                              </div>
                            )}
                            {tweetData.replies_count !== undefined && (
                              <div className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                <span>{tweetData.replies_count.toLocaleString()}</span>
                              </div>
                            )}
                          </div>
                          
                          {/* View on Twitter Button */}
                          {tweetData.tweet_id && (
                            <div className="mt-3 pt-3 border-t border-blue-200 dark:border-blue-700">
                              <a
                                href={`https://twitter.com/i/web/status/${tweetData.tweet_id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-800 border border-blue-300 dark:border-blue-600 rounded-full hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
                              >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                </svg>
                                {language === 'en' ? 'View on Twitter' : 'Twitter\'da Görüntüle'}
                              </a>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                {language === 'en' ? 'No tweets available' : 'Tweet bulunmuyor'}
              </p>
            )}
          </div>
        </Modal>
      )}
    </Card>
  );
}
