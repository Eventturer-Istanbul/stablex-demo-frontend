import { cn } from '@/lib/utils/cn';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-gray-200 dark:bg-gray-700',
        className
      )}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <Skeleton className="mb-4 h-6 w-32" />
      <Skeleton className="mb-2 h-12 w-24" />
      <Skeleton className="h-4 w-48" />
      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
        <Skeleton className="h-3 w-40" />
      </div>
    </div>
  );
}

export function SentimentSkeleton() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <Skeleton className="mb-4 h-5 w-24" />
      <div className="flex items-baseline gap-2 mb-4">
        <Skeleton className="h-16 w-20" />
        <Skeleton className="h-8 w-12" />
      </div>
      <Skeleton className="h-4 w-44 mb-2" />
      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
        <Skeleton className="h-3 w-56" />
      </div>
    </div>
  );
}

export function TopicsSkeleton() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <Skeleton className="mb-4 h-5 w-36" />
      <div className="flex flex-wrap gap-2 mb-4">
        <Skeleton className="h-8 w-24 rounded-full" />
        <Skeleton className="h-8 w-32 rounded-full" />
        <Skeleton className="h-8 w-28 rounded-full" />
        <Skeleton className="h-8 w-20 rounded-full" />
        <Skeleton className="h-8 w-36 rounded-full" />
      </div>
      <Skeleton className="h-4 w-44 mb-2" />
      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
        <Skeleton className="h-3 w-56" />
      </div>
    </div>
  );
}

export function NewsSkeleton() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <Skeleton className="mb-4 h-5 w-32" />
      <div className="space-y-3 mb-4">
        <Skeleton className="h-16 w-full rounded-lg" />
        <Skeleton className="h-16 w-full rounded-lg" />
        <Skeleton className="h-16 w-full rounded-lg" />
      </div>
      <Skeleton className="h-4 w-36 mb-2" />
      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
        <Skeleton className="h-3 w-56" />
      </div>
    </div>
  );
}
