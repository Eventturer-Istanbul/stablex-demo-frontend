'use client';

import { TopicsResponse } from '@/types/api';
import { EndpointState } from '@/types/coin';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { TopicsSkeleton } from '@/components/ui/Skeleton';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { Chip } from '@/components/ui/Chip';

interface DiscussionTopicsCardProps {
  state: EndpointState<TopicsResponse>;
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

export function DiscussionTopicsCard({ state, onRetry }: DiscussionTopicsCardProps) {
  if (state.status === 'idle' || state.status === 'loading') {
    return <TopicsSkeleton />;
  }

  if (state.status === 'error') {
    return <ErrorMessage message={state.error || 'Failed to load topics'} onRetry={onRetry} />;
  }

  const { topics, total_tweets_processed, time_window_start, time_window_end } = state.data!;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Discussion Topics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {topics.map((topic, index) => (
            <Chip key={index}>{topic}</Chip>
          ))}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {total_tweets_processed.toLocaleString()} tweets processed
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
