'use client';

import { useState } from 'react';
import { CoinSymbol } from '@/types/coin';
import { useCoins } from '@/hooks/useCoins';
import { CoinAccordion } from './CoinAccordion';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

export function CoinExplorer() {
  const [expandedCoin, setExpandedCoin] = useState<CoinSymbol | null>(null);
  const { coins, loading, error } = useCoins();
  const { language } = useLanguage();

  const handleToggle = (symbol: CoinSymbol) => {
    setExpandedCoin((prev) => (prev === symbol ? null : symbol));
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {language === 'en' ? 'StableX Coin Explorer' : 'StableX Coin Gezgini'}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {language === 'en' ? 'Loading coins...' : 'Coinler yükleniyor...'}
              </p>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {language === 'en' ? 'StableX Coin Explorer' : 'StableX Coin Gezgini'}
              </h1>
              <p className="text-red-500">
                {language === 'en' ? 'Error: ' : 'Hata: '}{error}
              </p>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {language === 'en' ? 'StableX Coin Explorer' : 'StableX Coin Gezgini'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {language === 'en' 
                ? `Real-time sentiment, discussions and news for ${coins.length} cryptocurrencies`
                : `${coins.length} kripto para için gerçek zamanlı sentiment, tartışmalar ve haberler`
              }
            </p>
          </div>
          <LanguageSwitcher />
        </div>
      </div>
      <CoinAccordion
        coins={coins}
        expandedCoin={expandedCoin}
        onToggle={handleToggle}
      />
    </div>
  );
}
