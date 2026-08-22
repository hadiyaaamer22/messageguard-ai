'use client';

import React from 'react';
import Link from 'next/link';
import { Shield } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 bg-surface border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 py-4 md:py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Shield className="w-6 h-6 text-cyan-400" aria-hidden="true" />
          <div>
            <h1 className="text-lg font-bold text-text-primary">MessageGuard</h1>
            <p className="text-xs text-text-secondary hidden sm:block">AI Security Assistant</p>
          </div>
        </Link>

        <nav>
          <ul className="flex items-center gap-4 md:gap-6">
            <li>
              <Link
                href="/"
                className="text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                Analyze
              </Link>
            </li>
            <li>
              <Link
                href="/history"
                className="text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                History
              </Link>
            </li>
            <li>
              <Link
                href="/how-it-works"
                className="text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                How It Works
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
