'use client';

import { SentimentResponse } from '@/types/api';
import { EndpointState } from '@/types/coin';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { SentimentSkeleton } from '@/components/ui/Skeleton';
import { ErrorMessage } from '@/components/ui/ErrorMessage';

interface SentimentCardProps {
  state: EndpointState<SentimentResponse>;
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

export function SentimentCard({ state, onRetry }: SentimentCardProps) {
  if (state.status === 'idle' || state.status === 'loading') {
    return <SentimentSkeleton />;
  }

  if (state.status === 'error') {
    return <ErrorMessage message={state.error || 'Failed to load sentiment'} onRetry={onRetry} />;
  }

  const { sentiment_score, total_tweets_processed, time_window_start, time_window_end } = state.data!;

  // Determine color based on score
  const getScoreColor = (score: number) => {
    if (score >= 7) return 'text-green-500';
    if (score >= 4) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sentiment</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2 mb-4">
          <span className={`text-5xl font-bold ${getScoreColor(sentiment_score)}`}>
            {sentiment_score.toFixed(1)}
          </span>
          <span className="text-2xl text-gray-400 dark:text-gray-500">/ 10</span>
        </div>
{/* <p className="text-sm text-gray-600 dark:text-gray-400">
          {total_tweets_processed.toLocaleString()} tweets processed
        </p> */}
      </CardContent>
      <CardFooter>
        <p className="text-xs text-gray-500 dark:text-gray-500">
          {formatDate(time_window_start)} - {formatDate(time_window_end)}
        </p>
      </CardFooter>
    </Card>
  );
}
