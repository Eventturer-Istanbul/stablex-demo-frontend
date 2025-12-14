'use client';

import { CoinConfig } from '@/types/coin';
import { CoinHeader } from './CoinHeader';
import { CoinDetails } from './CoinDetails';
import { cn } from '@/lib/utils/cn';

interface CoinAccordionItemProps {
  coin: CoinConfig;
  isExpanded: boolean;
  onToggle: () => void;
}

export function CoinAccordionItem({
  coin,
  isExpanded,
  onToggle,
}: CoinAccordionItemProps) {
  return (
    <div className="overflow-hidden">
      <CoinHeader coin={coin} isExpanded={isExpanded} onClick={onToggle} />
      <div
        className={cn(
          'grid transition-all duration-300 ease-in-out',
          isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        )}
      >
        <div className="overflow-hidden">
          <div
            className={cn(
              'border border-t-0 border-gray-200 dark:border-gray-700 rounded-b-xl',
              'bg-gray-50 dark:bg-gray-800/50'
            )}
          >
            {isExpanded && <CoinDetails coinSymbol={coin.symbol} />}
          </div>
        </div>
      </div>
    </div>
  );
}
