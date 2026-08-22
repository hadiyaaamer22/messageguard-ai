'use client';

import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-surface border-t border-slate-700 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="space-y-6 mb-6">
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-2">Privacy</h3>
            <p className="text-xs text-text-secondary leading-comfortable max-w-2xl">
              Messages are sent to our AI provider when you analyze them. Analysis history
              is stored locally in your browser. Do not submit passwords, OTPs, private
              keys, or other sensitive credentials.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-2">Disclaimer</h3>
            <p className="text-xs text-text-secondary leading-comfortable max-w-2xl">
              MessageGuard provides an AI-assisted risk assessment, not a definitive
              security verdict. Never share passwords, OTPs, recovery codes, or financial
              credentials based solely on this analysis. Always verify independently and
              use your judgment.
            </p>
          </div>
        </div>

        <div className="text-xs text-text-secondary text-center pt-4 border-t border-slate-700">
          © {new Date().getFullYear()} MessageGuard AI. Use responsibly.
        </div>
      </div>
    </footer>
  );
};
