'use client';

import { useState, useEffect } from 'react';
import { CoinConfig } from '@/types/coin';
import { supabase } from '@/lib/supabase/client';

// Map token names to icon file names (for coins that have icons)
const TOKEN_ICONS: Record<string, string> = {
  'Bitcoin': 'btc',
  'Ethereum': 'eth',
  'Solana': 'sol',
  'Chainlink': 'link',
  'Uniswap': 'uni',
  'Avalanche': 'avax',
  'XRP': 'xrp',
  'Litecoin': 'ltc',
  'Tether': 'usdt',
  'Dogecoin': 'doge',
};

// Generate a consistent color based on token name
function generateColor(name: string): string {
  const colors = [
    '#F7931A', '#627EEA', '#00FFA3', '#375BD2', '#FF007A',
    '#E84142', '#23292F', '#345D9D', '#26A17B', '#C2A633',
    '#8247E5', '#0033AD', '#14F195', '#F0B90B', '#E6007A',
    '#00D1FF', '#FF6B00', '#7B3FE4', '#00CED1', '#FF4500',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

function getIconPath(tokenName: string): string {
  const iconName = TOKEN_ICONS[tokenName];
  return iconName ? `/images/coins/${iconName}.svg` : '';
}

export function useCoins() {
  const [coins, setCoins] = useState<CoinConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCoins() {
      try {
        // Fetch only from main_summaries table
        const { data, error: fetchError } = await supabase
          .from('main_summaries')
          .select('token_id, token_name')
          .order('token_name');

        if (fetchError) throw fetchError;

        const coinConfigs: CoinConfig[] = (data || []).map((item: any) => ({
          symbol: String(item.token_id), // Use token_id as identifier
          name: item.token_name,
          icon: getIconPath(item.token_name),
          color: generateColor(item.token_name),
        }));

        setCoins(coinConfigs);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch coins');
      } finally {
        setLoading(false);
      }
    }

    fetchCoins();
  }, []);

  return { coins, loading, error };
}
