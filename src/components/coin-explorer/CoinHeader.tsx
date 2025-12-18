'use client';

import { CoinConfig } from '@/types/coin';
import Image from 'next/image';
import { cn } from '@/lib/utils/cn';

interface CoinHeaderProps {
  coin: CoinConfig;
  isExpanded: boolean;
  onClick: () => void;
}

export function CoinHeader({ coin, isExpanded, onClick }: CoinHeaderProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200',
        'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
        'hover:bg-gray-50 dark:hover:bg-gray-750',
        isExpanded && 'rounded-b-none border-b-0'
      )}
    >
      <div className="flex items-center gap-4">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${coin.color}20` }}
        >
          {coin.icon ? (
            <Image
              src={coin.icon}
              alt={coin.name}
              width={24}
              height={24}
              className="w-6 h-6"
            />
          ) : (
            <span
              className="w-6 h-6 rounded-full"
              style={{ backgroundColor: coin.color }}
            />
          )}
        </div>
        <div className="text-left">
          <h2 className="font-semibold text-gray-900 dark:text-white">
            {coin.name}
          </h2>
        </div>
      </div>
      <svg
        className={cn(
          'w-5 h-5 text-gray-400 transition-transform duration-200',
          isExpanded && 'rotate-180'
        )}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>
  );
}
