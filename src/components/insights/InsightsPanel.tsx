"use client";

import { useEffect, useState } from "react";
import { InsightsResponse } from "@/types/api";
import { useInsights } from "@/hooks/useInsights";
import { useLanguage } from "@/contexts/LanguageContext";

interface InsightsPanelProps {
  tokenId: string;
  tokenName: string;
  tokenColor?: string;
  isOpen: boolean;
  onClose: () => void;
}

type ViewMode = "main" | "sources" | "sentiment";

const translations = {
  en: {
    insights: "Insights",
    tldr: "TLDR",
    whatIs: (symbol: string) => `What is ${symbol}?`,
    positives: "Positives",
    risks: "Risks",
    viewNewsSources: "View News Sources",
    articles: "articles",
    discussionTopics: "Discussion Topics",
    positive: "positive",
    negative: "negative",
    neutral: "neutral",
    viewAllTopics: "View All Topics",
    topics: "topics",
    technicalAnalysis: "Technical Analysis",
    currentPrice: "The Price Used as the Basis",
    overbought: "Overbought",
    oversold: "Oversold",
    volume: "Volume",
    vs7dAvg: "vs 7d avg",
    emaLevels: "EMA Levels",
    bollingerBands: "Bollinger Bands",
    upper: "Upper",
    lower: "Lower",
    width: "Width",
    bullishSignals: "Bullish Signals",
    bearishSignals: "Bearish Signals",
    sentimentScore: "Sentiment Score",
    basedOnTweets: (count: number) => `Based on ${count} tweets analyzed`,
    backToInsights: "Back to Insights",
    newsSources: "News Sources",
    readMore: "Read more",
    topPosts: "Top Posts",
    view: "View",
    showLess: "Show less",
    showMore: "Show more",
    noInsights: "No insights available",
    updatedJustNow: "Updated just now",
    updatedMinAgo: (count: number) => `Updated ${count} min ago`,
    updatedHoursAgo: (count: number) => `Updated ${count}h ago`,
    updatedDaysAgo: (count: number) => `Updated ${count}d ago`,
    tweets: "tweets",
    bullish: "bullish",
    bearish: "bearish",
  },
  tr: {
    insights: "Analizi",
    tldr: "TLDR",
    whatIs: (symbol: string) => `${symbol} Nedir?`,
    positives: "Olumlu Sinyaller",
    risks: "Riskler",
    viewNewsSources: "Haber Kaynaklarını Görüntüle",
    articles: "haber",
    discussionTopics: "Tartışma Konuları",
    positive: "olumlu",
    negative: "olumsuz",
    neutral: "nötr",
    viewAllTopics: "Tüm Konuları Görüntüle",
    topics: "konu",
    technicalAnalysis: "Teknik Analiz",
    currentPrice: "Hesaplamada Kullanılan Fiyat",
    overbought: "Aşırı Alım",
    oversold: "Aşırı Satım",
    volume: "Hacim",
    vs7dAvg: "7g ort.",
    emaLevels: "EMA Seviyeleri",
    bollingerBands: "Bollinger Bantları",
    upper: "Üst",
    lower: "Alt",
    width: "Genişlik",
    bullishSignals: "Yükseliş Sinyalleri",
    bearishSignals: "Düşüş Sinyalleri",
    sentimentScore: "Duygu Skoru",
    basedOnTweets: (count: number) => `${count} tweet analiz edildi`,
    backToInsights: "Analize Dön",
    newsSources: "Haber Kaynakları",
    readMore: "Devamını oku",
    topPosts: "Popüler Paylaşımlar",
    view: "Görüntüle",
    showLess: "Daha az göster",
    showMore: "Daha fazla göster",
    noInsights: "Analiz bulunamadı",
    updatedJustNow: "Az önce güncellendi",
    updatedMinAgo: (count: number) => `${count} dk önce güncellendi`,
    updatedHoursAgo: (count: number) => `${count}sa önce güncellendi`,
    updatedDaysAgo: (count: number) => `${count}g önce güncellendi`,
    tweets: "tweet",
    bullish: "yükseliş",
    bearish: "düşüş",
  },
};

function formatTimeAgo(
  dateStr: string | null,
  t: typeof translations.en,
): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffMins < 1) return t.updatedJustNow;
  if (diffMins < 60) return t.updatedMinAgo(diffMins);
  if (diffHours < 24) return t.updatedHoursAgo(diffHours);
  return t.updatedDaysAgo(Math.floor(diffHours / 24));
}

// Strip markdown links from text - removes [text](url) patterns entirely
function stripMarkdownLinks(text: string | null | undefined): string {
  if (!text || typeof text !== "string") return "";
  return text
    .replace(/\(\[([^\]]+)\]\([^)]+\)\)/g, "") // ([text](url)) -> empty
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "") // [text](url) -> empty
    .replace(/\s{2,}/g, " ") // Clean up extra spaces
    .trim();
}

// Check if URL is valid and external
function isValidExternalUrl(url: string | null | undefined): boolean {
  if (!url || typeof url !== "string") return false;
  const trimmed = url.trim();
  return trimmed.startsWith("http://") || trimmed.startsWith("https://");
}

export function InsightsPanel({
  tokenId,
  tokenName,
  tokenColor = "#627EEA",
  isOpen,
  onClose,
}: InsightsPanelProps) {
  const { insights, loading, error, fetch } = useInsights();
  const { language } = useLanguage();
  const t = translations[language];
  const [viewMode, setViewMode] = useState<ViewMode>("main");
  const [whatIsExpanded, setWhatIsExpanded] = useState(false);
  const [expandedSources, setExpandedSources] = useState<Set<string>>(
    new Set(),
  );

  const toggleSourceExpanded = (sourceId: string) => {
    setExpandedSources((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sourceId)) {
        newSet.delete(sourceId);
      } else {
        newSet.add(sourceId);
      }
      return newSet;
    });
  };

  useEffect(() => {
    if (isOpen && tokenId) {
      fetch(tokenId, language);
      setViewMode("main");
      setWhatIsExpanded(false);
      setExpandedSources(new Set());
    }
  }, [isOpen, tokenId, fetch, language]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const renderMainView = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
        </div>
      );
    }

    if (error || !insights) {
      return (
        <div className="p-6 text-center">
          <p className="text-gray-400">{error || t.noInsights}</p>
        </div>
      );
    }

    return (
      <>
        {/* TLDR Section */}
        <div className="bg-[#2b3139] rounded-xl p-5 mt-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-yellow-500 font-semibold">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
              </svg>
              TLDR
            </div>
            <span className="text-gray-500 text-sm">
              {formatTimeAgo(insights.updated_at, t)}
            </span>
          </div>
          {insights.tldr && (
            <>
              <p className="text-[#eaecef] text-[15px] leading-7 mb-5">
                {insights.tldr.summary}
              </p>
              <ol className="space-y-4">
                {insights.tldr.key_points.map((point, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-sm text-[#b7bdc6] leading-relaxed"
                  >
                    <span className="text-gray-500 font-medium flex-shrink-0">
                      {i + 1}.
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ol>
            </>
          )}
          <div className="mt-5 pt-4 border-t border-[#3c4451] text-xs text-[#5e6673]">
            * {insights.disclaimer}
          </div>
        </div>

        {/* What is Token */}
        <div className="bg-[#2b3139] rounded-xl mt-4 overflow-hidden">
          <button
            onClick={() => setWhatIsExpanded(!whatIsExpanded)}
            className="w-full flex items-center justify-between p-4 text-[#eaecef] hover:bg-[#3c4451] transition-colors"
          >
            <span className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-yellow-500"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
              </svg>
              {t.whatIs(insights.token?.symbol || tokenName)}
            </span>
            <svg
              className={`w-5 h-5 transition-transform ${whatIsExpanded ? "rotate-90" : ""}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          {whatIsExpanded && (
            <div className="px-5 pb-5 text-sm text-[#b7bdc6] leading-relaxed">
              {insights.what_is.answer}
            </div>
          )}
        </div>

        {/* Positives */}
        <div className="flex items-center gap-2 text-base font-semibold mt-7 mb-4 text-[#eaecef]">
          <svg
            className="w-5 h-5 text-green-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
          {t.positives}
        </div>
        {insights.positives.map((item, i) => (
          <div key={i} className="mb-5">
            <div className="text-gray-500 text-sm mb-1">{i + 1}.</div>
            <span className="text-green-500 font-semibold text-sm">
              {item.category}:{" "}
            </span>
            <span className="text-sm text-[#b7bdc6] leading-relaxed">
              {item.description}
            </span>
          </div>
        ))}

        {/* Negatives */}
        <div className="flex items-center gap-2 text-base font-semibold mt-7 mb-4 text-[#eaecef]">
          <svg
            className="w-5 h-5 text-red-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            <path d="M12 9v4M12 17h.01" />
          </svg>
          {t.risks}
        </div>
        {insights.negatives.map((item, i) => (
          <div key={i} className="mb-5">
            <div className="text-gray-500 text-sm mb-1">{i + 1}.</div>
            <span className="text-red-500 font-semibold text-sm">
              {item.category}:{" "}
            </span>
            <span className="text-sm text-[#b7bdc6] leading-relaxed">
              {item.description}
            </span>
          </div>
        ))}

        {/* View Sources Button */}
        <div className="my-6">
          <button
            onClick={() => setViewMode("sources")}
            className="w-full flex items-center justify-between p-4 bg-[#2b3139] rounded-xl text-[#eaecef] hover:bg-[#3c4451] transition-colors text-sm"
          >
            <span className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M9 9h6M9 13h6M9 17h4" />
              </svg>
              {t.viewNewsSources}
            </span>
            <span className="bg-yellow-500 text-[#0b0e11] text-xs font-semibold px-2.5 py-1 rounded-full">
              {insights.sources.length} {t.articles}
            </span>
          </button>
        </div>

        {/* Discussion Topics */}
        <div className="flex items-center gap-2 text-base font-semibold mt-7 mb-4 text-[#eaecef]">
          <svg
            className="w-5 h-5 text-yellow-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
          {t.discussionTopics}
          <span
            className={`text-xs px-2.5 py-1 rounded ml-1 ${
              insights.discussion.overall === "positive"
                ? "bg-green-500/15 text-green-500"
                : insights.discussion.overall === "negative"
                  ? "bg-red-500/15 text-red-500"
                  : "bg-gray-500/15 text-gray-500"
            }`}
          >
            {insights.discussion.overall === "positive"
              ? t.positive
              : insights.discussion.overall === "negative"
                ? t.negative
                : t.neutral}
          </span>
        </div>
        <ul className="space-y-3">
          {insights.discussion.topics.slice(0, 3).map((topic, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-[#b7bdc6] leading-relaxed"
            >
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
              {topic}
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <button
            onClick={() => setViewMode("sentiment")}
            className="w-full flex items-center justify-between p-4 bg-[#2b3139] rounded-xl text-[#eaecef] hover:bg-[#3c4451] transition-colors text-sm"
          >
            <span className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
              {t.viewAllTopics}
            </span>
            <span className="bg-yellow-500 text-[#0b0e11] text-xs font-semibold px-2.5 py-1 rounded-full">
              {insights.discussion.topics.length} {t.topics}
            </span>
          </button>
        </div>

        {/* Technical Analysis */}
        {insights.technical_analysis && (
          <>
            <div className="flex items-center gap-2 text-base font-semibold mt-7 mb-4 text-[#eaecef]">
              <svg
                className="w-5 h-5 text-blue-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 3v18h18" />
                <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
              </svg>
              {t.technicalAnalysis}
            </div>

            {/* Price & Key Indicators */}
            <div className="bg-[#2b3139] rounded-xl p-5 mb-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">{t.currentPrice}</span>
                <span className="text-xl font-bold text-[#eaecef]">
                  $
                  {insights.technical_analysis.current_price.toLocaleString(
                    undefined,
                    { minimumFractionDigits: 2, maximumFractionDigits: 2 },
                  )}
                </span>
              </div>

              {insights.technical_analysis.indicators && (
                <div className="grid grid-cols-3 gap-4">
                  {/* RSI */}
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">RSI</div>
                    <div
                      className={`text-lg font-semibold ${
                        insights.technical_analysis.indicators.rsi > 70
                          ? "text-red-400"
                          : insights.technical_analysis.indicators.rsi < 30
                            ? "text-green-400"
                            : "text-[#eaecef]"
                      }`}
                    >
                      {insights.technical_analysis.indicators.rsi.toFixed(1)}
                    </div>
                    <div className="text-[10px] text-gray-600">
                      {insights.technical_analysis.indicators.rsi > 70
                        ? t.overbought
                        : insights.technical_analysis.indicators.rsi < 30
                          ? t.oversold
                          : t.neutral}
                    </div>
                  </div>

                  {/* MACD */}
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">MACD</div>
                    <div
                      className={`text-lg font-semibold ${
                        insights.technical_analysis.indicators.macd.signal ===
                        "bullish"
                          ? "text-green-400"
                          : insights.technical_analysis.indicators.macd
                                .signal === "bearish"
                            ? "text-red-400"
                            : "text-[#eaecef]"
                      }`}
                    >
                      {insights.technical_analysis.indicators.macd.signal ===
                      "bullish"
                        ? "↑"
                        : insights.technical_analysis.indicators.macd.signal ===
                            "bearish"
                          ? "↓"
                          : "—"}
                    </div>
                    <div className="text-[10px] text-gray-600">
                      {insights.technical_analysis.indicators.macd.signal ===
                      "bullish"
                        ? t.bullish
                        : insights.technical_analysis.indicators.macd.signal ===
                            "bearish"
                          ? t.bearish
                          : t.neutral}
                    </div>
                  </div>

                  {/* Volume */}
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">{t.volume}</div>
                    <div
                      className={`text-lg font-semibold ${
                        insights.technical_analysis.indicators.volume.ratio >
                        1.2
                          ? "text-green-400"
                          : insights.technical_analysis.indicators.volume
                                .ratio < 0.8
                            ? "text-red-400"
                            : "text-[#eaecef]"
                      }`}
                    >
                      {insights.technical_analysis.indicators.volume.ratio.toFixed(
                        2,
                      )}
                      x
                    </div>
                    <div className="text-[10px] text-gray-600">{t.vs7dAvg}</div>
                  </div>
                </div>
              )}

              {/* EMA & BB Range */}
              {insights.technical_analysis.indicators && (
                <div className="mt-4 pt-4 border-t border-[#3c4451]">
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <div className="text-gray-500 mb-2">{t.emaLevels}</div>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-gray-600">EMA 7</span>
                          <span className="text-[#b7bdc6]">
                            $
                            {insights.technical_analysis.indicators.ema.short_7.toLocaleString(
                              undefined,
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              },
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">EMA 25</span>
                          <span className="text-[#b7bdc6]">
                            $
                            {insights.technical_analysis.indicators.ema.medium_25.toLocaleString(
                              undefined,
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              },
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">EMA 99</span>
                          <span className="text-[#b7bdc6]">
                            $
                            {insights.technical_analysis.indicators.ema.long_99.toLocaleString(
                              undefined,
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              },
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500 mb-2">
                        {t.bollingerBands}
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-gray-600">{t.upper}</span>
                          <span className="text-[#b7bdc6]">
                            $
                            {insights.technical_analysis.indicators.bb.upper.toLocaleString(
                              undefined,
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              },
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">{t.lower}</span>
                          <span className="text-[#b7bdc6]">
                            $
                            {insights.technical_analysis.indicators.bb.lower.toLocaleString(
                              undefined,
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              },
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">{t.width}</span>
                          <span className="text-[#b7bdc6]">
                            {insights.technical_analysis.indicators.bb.width_percent.toFixed(
                              1,
                            )}
                            %
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Positive Signals */}
            {insights.technical_analysis.positive_paragraphs.length > 0 && (
              <div className="bg-[#2b3139] rounded-xl p-5 mb-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-green-400 mb-3">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <path d="M22 4L12 14.01l-3-3" />
                  </svg>
                  {t.bullishSignals}
                </div>
                <ul className="space-y-2">
                  {insights.technical_analysis.positive_paragraphs.map(
                    (para, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-[#b7bdc6] leading-relaxed"
                      >
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                        {para}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            )}

            {/* Bearish Signals */}
            {insights.technical_analysis.risk_paragraphs.length > 0 && (
              <div className="bg-[#2b3139] rounded-xl p-5 mb-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-red-400 mb-3">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4M12 16h.01" />
                  </svg>
                  {t.bearishSignals}
                </div>
                <ul className="space-y-2">
                  {insights.technical_analysis.risk_paragraphs.map(
                    (para, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-[#b7bdc6] leading-relaxed"
                      >
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                        {para}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            )}
          </>
        )}

        {/* Sentiment Score */}
        <div className="bg-[#2b3139] rounded-xl p-5 mt-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-[#eaecef]">
              {t.sentimentScore}
            </span>
            <span
              className={`text-2xl font-bold ${
                insights.discussion.score > 0
                  ? "text-green-500"
                  : insights.discussion.score < 0
                    ? "text-red-500"
                    : "text-gray-400"
              }`}
            >
              {insights.discussion.score > 0 ? "+" : ""}
              {insights.discussion.score.toFixed(2)}
            </span>
          </div>
          {/* Scale bar: -5 to +5 */}
          <div className="relative w-full h-2 bg-[#3c4451] rounded-full mb-2">
            {/* Center line */}
            <div className="absolute left-1/2 top-0 w-0.5 h-2 bg-[#5e6673] -translate-x-1/2" />
            {/* Score indicator */}
            <div
              className={`absolute top-0 h-2 rounded-full ${
                insights.discussion.score > 0 ? "bg-green-500" : "bg-red-500"
              }`}
              style={{
                left:
                  insights.discussion.score >= 0
                    ? "50%"
                    : `${50 + (insights.discussion.score / 5) * 50}%`,
                width: `${Math.min((Math.abs(insights.discussion.score) / 5) * 50, 50)}%`,
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-[#5e6673] mb-2">
            <span>-5</span>
            <span>0</span>
            <span>+5</span>
          </div>
          <div className="text-xs text-[#5e6673]">
            {t.basedOnTweets(insights.discussion.tweet_count)}
          </div>
        </div>
      </>
    );
  };

  const renderSourcesView = () => {
    if (!insights) return null;
    return (
      <>
        <button
          onClick={() => setViewMode("main")}
          className="flex items-center gap-2 text-yellow-500 text-sm mb-5 hover:underline"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          {t.backToInsights}
        </button>
        <div className="mb-5">
          <div className="text-lg font-semibold text-[#eaecef]">
            {t.newsSources}
          </div>
        </div>
        {insights.sources.map((source, index) => {
          const sourceKey = String(index);
          const isExpanded = expandedSources.has(sourceKey);
          const cleanSummary = stripMarkdownLinks(source.summary);
          const shouldTruncate = cleanSummary.length > 200;
          const displayText =
            shouldTruncate && !isExpanded
              ? cleanSummary.slice(0, 200) + "..."
              : cleanSummary;

          return (
            <div key={sourceKey} className="bg-[#2b3139] rounded-lg p-4 mb-3">
              <span
                className={`inline-block text-xs font-semibold px-2 py-0.5 rounded mb-2 uppercase ${
                  source.sentiment === "positive"
                    ? "bg-green-500/15 text-green-500"
                    : source.sentiment === "negative"
                      ? "bg-red-500/15 text-red-500"
                      : "bg-gray-500/15 text-gray-500"
                }`}
              >
                {source.sentiment === "positive"
                  ? t.positive
                  : source.sentiment === "negative"
                    ? t.negative
                    : t.neutral}
              </span>
              <div className="text-sm font-semibold text-[#eaecef] mb-2 leading-snug">
                {source.title}
              </div>
              <div className="text-[13px] text-[#b7bdc6] leading-relaxed mb-2">
                {displayText}
              </div>
              {shouldTruncate && (
                <button
                  onClick={() => toggleSourceExpanded(sourceKey)}
                  className="text-xs text-yellow-500 hover:underline mb-3"
                >
                  {isExpanded ? t.showLess : t.showMore}
                </button>
              )}
              {isValidExternalUrl(source.url) && (
                <div className="flex items-center justify-end text-xs text-[#5e6673]">
                  <a
                    href={source.url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-500 hover:underline"
                  >
                    {t.readMore}
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </>
    );
  };

  const renderSentimentView = () => {
    if (!insights) return null;

    const formatNumber = (num: number) => {
      if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
      if (num >= 1000) return (num / 1000).toFixed(1) + "K";
      return num.toString();
    };

    return (
      <>
        <button
          onClick={() => setViewMode("main")}
          className="flex items-center gap-2 text-yellow-500 text-sm mb-5 hover:underline"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          {t.backToInsights}
        </button>
        <div className="mb-5">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-[#eaecef]">
              {t.discussionTopics}
            </span>
            <span
              className={`text-xs px-2.5 py-1 rounded ${
                insights.discussion.overall === "positive"
                  ? "bg-green-500/15 text-green-500"
                  : insights.discussion.overall === "negative"
                    ? "bg-red-500/15 text-red-500"
                    : "bg-gray-500/15 text-gray-500"
              }`}
            >
              {insights.discussion.overall === "positive"
                ? t.positive
                : insights.discussion.overall === "negative"
                  ? t.negative
                  : t.neutral}
            </span>
          </div>
          <div className="text-sm text-gray-500 mt-1">
            {insights.discussion.topics.length} {t.topics} •{" "}
            {insights.discussion.tweet_count} {t.tweets}
          </div>
        </div>
        {insights.discussion.topics.map((topic, i) => (
          <div key={i} className="bg-[#2b3139] rounded-lg p-4 mb-3">
            <div className="text-sm font-semibold text-[#eaecef] leading-snug">
              {topic}
            </div>
          </div>
        ))}

        {/* Top Tweets */}
        {insights.discussion.top_tweets.length > 0 && (
          <>
            <div className="flex items-center gap-2 text-base font-semibold mt-6 mb-4 text-[#eaecef]">
              <svg
                className="w-5 h-5 text-[#1DA1F2]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              {t.topPosts}
            </div>
            {insights.discussion.top_tweets.map((tweet, i) => (
              <div key={i} className="bg-[#2b3139] rounded-lg p-4 mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-semibold text-[#eaecef]">
                    {tweet.author_name}
                  </span>
                  {tweet.author_verified && (
                    <svg
                      className="w-4 h-4 text-[#1DA1F2]"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
                    </svg>
                  )}
                  <span className="text-xs text-gray-500">
                    @{tweet.author_username}
                  </span>
                </div>
                <div className="text-sm text-[#b7bdc6] leading-relaxed mb-3">
                  {tweet.text}
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                    </svg>
                    {formatNumber(tweet.likes)}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M17 1l4 4-4 4" />
                      <path d="M3 11V9a4 4 0 014-4h14" />
                      <path d="M7 23l-4-4 4-4" />
                      <path d="M21 13v2a4 4 0 01-4 4H3" />
                    </svg>
                    {formatNumber(tweet.retweets)}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    {formatNumber(tweet.views)}
                  </span>
                  <a
                    href={`https://x.com/${tweet.author_username}/status/${tweet.tweet_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto text-[#1DA1F2] hover:underline"
                  >
                    {t.view}
                  </a>
                </div>
              </div>
            ))}
          </>
        )}
      </>
    );
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-[999] transition-opacity"
        onClick={onClose}
      />

      {/* Side Panel */}
      <div
        className={`fixed top-0 right-0 w-[480px] max-w-full h-screen bg-[#1e2329] z-[1000] flex flex-col transform transition-transform ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center px-6 py-5 border-b border-[#2b3139] flex-shrink-0">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
            style={{
              background: `linear-gradient(135deg, ${tokenColor}, #3c3c3d)`,
            }}
          >
            <svg
              className="w-6 h-6 text-white"
              viewBox="0 0 32 32"
              fill="currentColor"
            >
              <path d="M16 0l-1 3.3v18.7l1 .9 7-4.1z" />
              <path d="M16 0L9 14.8l7 4.1V0z" opacity="0.6" />
              <path d="M16 20.9l-.5.6v5.3l.5 1.5 7-9.8z" />
              <path d="M16 28.3v-7.4L9 16.6z" opacity="0.6" />
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-[#eaecef] flex-1">
            {tokenName} {t.insights}
          </h1>
          <button
            onClick={onClose}
            className="p-1 text-gray-500 hover:text-[#eaecef] transition-colors"
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {viewMode === "main" && renderMainView()}
          {viewMode === "sources" && renderSourcesView()}
          {viewMode === "sentiment" && renderSentimentView()}
        </div>
      </div>
    </>
  );
}
