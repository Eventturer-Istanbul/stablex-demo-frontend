'use client';

import { useState } from 'react';
import { CoinSymbol } from '@/types/coin';
import { COINS } from '@/config/coins';
import { CoinAccordion } from './CoinAccordion';

export function CoinExplorer() {
  const [expandedCoin, setExpandedCoin] = useState<CoinSymbol | null>(null);

  const handleToggle = (symbol: CoinSymbol) => {
    setExpandedCoin((prev) => (prev === symbol ? null : symbol));
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Coin Explorer
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Real-time sentiment, discussions, and news for top cryptocurrencies
        </p>
      </div>
      <CoinAccordion
        coins={COINS}
        expandedCoin={expandedCoin}
        onToggle={handleToggle}
      />
    </div>
  );
}
