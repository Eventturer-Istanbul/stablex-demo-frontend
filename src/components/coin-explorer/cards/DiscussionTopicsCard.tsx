'use client';

import { TopicsResponse } from '@/types/api';
import { EndpointState } from '@/types/coin';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { TopicsSkeleton } from '@/components/ui/Skeleton';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { Chip } from '@/components/ui/Chip';
import { useLanguage } from '@/contexts/LanguageContext';

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
  if (state.status === 'idle' || state.status === 'loading') {
    return <TopicsSkeleton />;
  }

  if (state.status === 'error') {
    return <ErrorMessage message={state.error || (language === 'en' ? 'Failed to load topics' : 'Konular yüklenemedi')} onRetry={onRetry} />;
  }

  const { topics, total_tweets_processed, time_window_start, time_window_end } = state.data!;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{language === 'en' ? 'Discussion Topics' : 'Tartışma Konuları'}</CardTitle>
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
      <CardFooter>
        <p className="text-xs text-gray-500 dark:text-gray-500">
          {formatDate(time_window_start, language)} - {formatDate(time_window_end, language)}
        </p>
      </CardFooter>
    </Card>
  );
}
