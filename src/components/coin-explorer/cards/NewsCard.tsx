'use client';

import { NewsResponse } from '@/types/api';
import { EndpointState } from '@/types/coin';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { NewsSkeleton } from '@/components/ui/Skeleton';
import { ErrorMessage } from '@/components/ui/ErrorMessage';

interface NewsCardProps {
  state: EndpointState<NewsResponse>;
  onRetry: () => void;
}

function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function NewsCard({ state, onRetry }: NewsCardProps) {
  if (state.status === 'idle' || state.status === 'loading') {
    return <NewsSkeleton />;
  }

  if (state.status === 'error') {
    return <ErrorMessage message={state.error || 'Failed to load news'} onRetry={onRetry} />;
  }

  const { news_summaries, total_news_processed, time_window_start, time_window_end } = state.data!;

  return (
    <Card>
      <CardHeader>
        <CardTitle>News</CardTitle>
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
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {total_news_processed} news articles processed
        </p>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-gray-500 dark:text-gray-500">
          {formatDate(time_window_start)} - {formatDate(time_window_end)}
        </p>
      </CardFooter>
    </Card>
  );
}
