'use client';

import { useState } from 'react';
import { CoinConfig } from '@/types/coin';
import { useCoins } from '@/hooks/useCoins';
import { CoinList } from './CoinList';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { InsightsPanel } from '@/components/insights';

export function CoinExplorer() {
  const [selectedCoin, setSelectedCoin] = useState<CoinConfig | null>(null);
  const { coins, loading, error } = useCoins();
  const { language } = useLanguage();

  const handleCoinClick = (coin: CoinConfig) => {
    setSelectedCoin(coin);
  };

  const handleClosePanel = () => {
    setSelectedCoin(null);
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
                ? `AI-powered insights for ${coins.length} cryptocurrencies`
                : `${coins.length} kripto para için yapay zeka destekli analizler`
              }
            </p>
          </div>
          <LanguageSwitcher />
        </div>
      </div>
      <CoinList coins={coins} onCoinClick={handleCoinClick} />

      {selectedCoin && (
        <InsightsPanel
          tokenId={selectedCoin.symbol}
          tokenName={selectedCoin.name}
          tokenColor={selectedCoin.color}
          isOpen={!!selectedCoin}
          onClose={handleClosePanel}
        />
      )}
    </div>
  );
}
