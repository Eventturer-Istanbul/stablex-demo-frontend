import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database tables
export interface MainSummary {
  token_id: number;
  token_name: string;
  news_output: {
    bullets?: string[];
  } | null;
  created_at: string;
  discussion_topics: string[] | null;
  sentiment_score: string | null;
  description: string | null;
}

export interface TokenListRow {
  id: number;
  token_name: string;
  cash_tag: string;
}
