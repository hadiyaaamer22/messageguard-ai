'use client';

import React from 'react';
import { ExtractedLink } from '@/lib/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Copy, AlertTriangle } from 'lucide-react';

interface LinkInspectorProps {
  links: ExtractedLink[];
}

function analyzeURLLocally(url: string): string[] {
  const concerns: string[] = [];

  try {
    const urlObj = new URL(url);

    // Check for IP address
    if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(urlObj.hostname)) {
      concerns.push('Uses IP address instead of domain name');
    }

    // Check for excessive subdomains
    const parts = urlObj.hostname.split('.');
    if (parts.length > 4) {
      concerns.push('Unusual number of subdomains');
    }

    // Check for suspicious characters or encoding
    if (/%/.test(url) && /%(0d|0a|00)/i.test(url)) {
      concerns.push('Contains suspicious encoded characters');
    }

    // Check for very long URL
    if (url.length > 200) {
      concerns.push('Unusually long URL');
    }

    // Check if HTTPS
    if (urlObj.protocol !== 'https:') {
      concerns.push('Does not use HTTPS encryption');
    }
  } catch {
    concerns.push('Invalid URL format');
  }

  return concerns;
}

export const LinkInspector: React.FC<LinkInspectorProps> = ({ links }) => {
  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url).catch((err) => {
      console.error('Failed to copy:', err);
    });
  };

  return (
    <div className="space-y-3">
      {links.map((link, index) => {
        const localConcerns = analyzeURLLocally(link.url);
        const allConcerns = [
          ...(link.concern ? [link.concern] : []),
          ...localConcerns,
        ];

        return (
          <Card key={index} className="space-y-2">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Domain
              </p>
              <p className="text-sm font-mono text-text-primary break-all">{link.domain}</p>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Full URL
              </p>
              <div className="flex gap-2">
                <p className="flex-1 text-xs font-mono text-text-secondary break-all truncate">
                  {link.url.substring(0, 50)}
                  {link.url.length > 50 ? '...' : ''}
                </p>
                <Button
                  onClick={() => handleCopy(link.url)}
                  variant="secondary"
                  size="sm"
                  aria-label={`Copy URL ${index + 1}`}
                  className="flex-shrink-0"
                >
                  <Copy
                    className="w-4 h-4"
                    aria-hidden="true"
                  />
                </Button>
              </div>
            </div>

            {allConcerns.length > 0 && (
              <div className="space-y-1 pt-2 border-t border-slate-700">
                <p className="text-xs font-semibold text-amber-400 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" aria-hidden="true" />
                  Concerns
                </p>
                <ul className="text-xs text-text-secondary space-y-1">
                  {allConcerns.map((concern, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-amber-400">•</span>
                      <span>{concern}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="text-xs text-text-secondary pt-1 italic">
              ⚠️ Do not click links in suspicious messages. Copy and verify the domain
              manually if needed.
            </div>
          </Card>
        );
      })}
    </div>
  );
};
