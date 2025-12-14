'use client';

import { CoinConfig, CoinSymbol } from '@/types/coin';
import { CoinAccordionItem } from './CoinAccordionItem';

interface CoinAccordionProps {
  coins: CoinConfig[];
  expandedCoin: CoinSymbol | null;
  onToggle: (symbol: CoinSymbol) => void;
}

export function CoinAccordion({
  coins,
  expandedCoin,
  onToggle,
}: CoinAccordionProps) {
  return (
    <div className="space-y-3">
      {coins.map((coin) => (
        <CoinAccordionItem
          key={coin.symbol}
          coin={coin}
          isExpanded={expandedCoin === coin.symbol}
          onToggle={() => onToggle(coin.symbol)}
        />
      ))}
    </div>
  );
}
