'use client';

import { useState, useCallback } from 'react';
import { InsightsResponse } from '@/types/api';
import { fetchInsights } from '@/lib/api';

export interface UseInsightsReturn {
  insights: InsightsResponse | null;
  loading: boolean;
  error: string | null;
  fetch: (tokenId: string, language?: 'en' | 'tr') => Promise<void>;
}

export function useInsights(): UseInsightsReturn {
  const [insights, setInsights] = useState<InsightsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async (tokenId: string, language: 'en' | 'tr' = 'en') => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchInsights({ coin_symbol: tokenId }, language);
      setInsights(data);
      if (!data) {
        setError('No insights available for this token');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch insights');
      setInsights(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { insights, loading, error, fetch };
}
