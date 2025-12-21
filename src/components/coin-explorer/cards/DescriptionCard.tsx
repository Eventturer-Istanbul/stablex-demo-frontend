'use client';

import { DescriptionResponse } from '@/types/api';
import { EndpointState } from '@/types/coin';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { DescriptionSkeleton } from '@/components/ui/Skeleton';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { useLanguage } from '@/contexts/LanguageContext';

interface DescriptionCardProps {
  state: EndpointState<DescriptionResponse>;
  onRetry: () => void;
}

export function DescriptionCard({ state, onRetry }: DescriptionCardProps) {
  const { language } = useLanguage();
  if (state.status === 'idle' || state.status === 'loading') {
    return <DescriptionSkeleton />;
  }

  if (state.status === 'error') {
    return <ErrorMessage message={state.error || (language === 'en' ? 'Failed to load description' : 'Açıklama yüklenemedi')} onRetry={onRetry} />;
  }

  const { description } = state.data!;

  if (!description) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{language === 'en' ? 'Description' : 'Açıklama'}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 dark:text-gray-400 italic">
            {language === 'en' ? 'No description available.' : 'Açıklama mevcut değil.'}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{language === 'en' ? 'Description' : 'Açıklama'}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
