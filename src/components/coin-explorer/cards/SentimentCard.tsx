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

  const { sentiment_score, time_window_start, time_window_end } = state.data!;

  // Determine color and label based on score (-5 to 5 scale)
  const getScoreColor = (score: number) => {
    if (score >= 3) return 'text-green-600';      // Very Positive
    if (score >= 1) return 'text-green-400';      // Positive
    if (score >= -1) return 'text-yellow-500';    // Neutral
    if (score >= -3) return 'text-orange-500';    // Negative
    return 'text-red-500';                        // Very Negative
  };

  const getScoreLabel = (score: number) => {
    if (score >= 3) return 'Very Positive';
    if (score >= 1) return 'Positive';
    if (score >= -1) return 'Neutral';
    if (score >= -3) return 'Negative';
    return 'Very Negative';
  };

  // Calculate bar position: -5 = 0%, 0 = 50%, 5 = 100%
  const barPosition = ((sentiment_score + 5) / 10) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sentiment</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-3 mb-2">
          <span className={`text-4xl font-bold ${getScoreColor(sentiment_score)}`}>
            {sentiment_score > 0 ? '+' : ''}{Math.abs(sentiment_score) < 0.05 ? '0.0' : sentiment_score.toFixed(1)}
          </span>
          <span className={`text-sm font-medium ${getScoreColor(sentiment_score)}`}>
            {getScoreLabel(sentiment_score)}
          </span>
        </div>

        {/* Sentiment bar visualization */}
        <div className="mt-4">
          <div className="relative h-3 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500">
            {/* Score indicator */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-gray-800 dark:border-white shadow-lg"
              style={{ left: `calc(${Math.max(0, Math.min(100, barPosition))}% - 8px)` }}
            />
          </div>
          {/* Scale labels */}
          <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
            <span>-5</span>
            <span>0</span>
            <span>+5</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-gray-500 dark:text-gray-500">
          {formatDate(time_window_start)} - {formatDate(time_window_end)}
        </p>
      </CardFooter>
    </Card>
  );
}
