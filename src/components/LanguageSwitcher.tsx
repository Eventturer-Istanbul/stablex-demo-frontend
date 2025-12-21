'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export function LanguageSwitcher() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle language"
    >
      <span className="text-lg">{language === 'en' ? '🇬🇧' : '🇹🇷'}</span>
      <span>{language === 'en' ? 'EN' : 'TR'}</span>
    </button>
  );
}