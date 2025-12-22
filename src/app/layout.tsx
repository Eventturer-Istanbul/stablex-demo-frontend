import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClientProviders } from "@/components/ClientProviders";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Coin Explorer - Crypto Sentiment & News",
  description: "Real-time sentiment analysis, discussion topics, and news summaries for top cryptocurrencies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <ClientProviders>
          {children}
        </ClientProviders>
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="8c332fe7-73a9-423e-950d-bab66dff942b"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
