import { cn } from '@/lib/utils/cn';

interface ChipProps {
  children: string;
  className?: string;
}

export function Chip({ children, className }: ChipProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium',
        'bg-gray-100 text-gray-800',
        'dark:bg-gray-700 dark:text-gray-200',
        className
      )}
    >
      {children}
    </span>
  );
}
