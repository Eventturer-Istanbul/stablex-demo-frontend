'use client';

import { CoinConfig } from '@/types/coin';
import Image from 'next/image';

interface CoinListProps {
  coins: CoinConfig[];
  onCoinClick: (coin: CoinConfig) => void;
}

export function CoinList({ coins, onCoinClick }: CoinListProps) {
  return (
    <div className="space-y-2">
      {coins.map((coin) => (
        <button
          key={coin.symbol}
          onClick={() => onCoinClick(coin)}
          className="w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 hover:border-gray-300 dark:hover:border-gray-600"
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
          <div className="flex items-center gap-2">
            <span className="text-xs text-yellow-500 font-medium flex items-center gap-1">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/>
              </svg>
              AI Insights
            </span>
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </button>
      ))}
    </div>
  );
}
