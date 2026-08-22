import React from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'MessageGuard AI - Suspicious Message Analyzer',
  description:
    'Understand suspicious messages before you act. Analyze emails, SMS, and social media messages for phishing, scams, and social-engineering techniques.',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#0f172a',
  authors: [{ name: 'MessageGuard' }],
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90" fill="%2306b6d4">🛡</text></svg>',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://messageguard-ai.vercel.app',
    title: 'MessageGuard AI - Suspicious Message Analyzer',
    description: 'Understand suspicious messages before you act',
    siteName: 'MessageGuard AI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MessageGuard AI',
    description: 'Understand suspicious messages before you act',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body className="bg-surface text-text-primary">
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
