'use client';

import React, { useEffect, useState } from 'react';
import { HistoryItem } from '@/lib/types';
import { getHistory, deleteAnalysis, clearHistory } from '@/lib/storage/history';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { RiskBadge } from '@/components/ui/RiskBadge';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function HistoryPage() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setItems(getHistory());
    setIsLoading(false);
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('Delete this analysis?')) {
      deleteAnalysis(id);
      setItems(getHistory());
    }
  };

  const handleClearAll = () => {
    if (confirm('Delete all analysis history? This cannot be undone.')) {
      clearHistory();
      setItems([]);
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="h-20 bg-surface-elevated animate-pulse rounded-lg" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-text-primary mb-2">Analysis History</h1>
        <p className="text-text-secondary">
          Your analysis history is stored locally on this device.
        </p>
      </div>

      {items.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-text-secondary mb-4">No analysis history yet.</p>
          <Link href="/">
            <Button>Start Analyzing</Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-text-secondary">
              {items.length} analysis{items.length !== 1 ? 'es' : ''}
            </p>
            <Button
              onClick={handleClearAll}
              variant="danger"
              size="sm"
            >
              Clear All
            </Button>
          </div>

          <div className="space-y-2">
            {items.map((item) => (
              <Card
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:border-slate-600 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <RiskBadge level={item.riskLevel} size="sm" />
                    <span className="text-xs text-text-secondary">
                      {formatDate(item.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary line-clamp-2">
                    {item.messagePreview}
                  </p>
                  <p className="text-xs text-text-secondary mt-1">
                    Source: {item.source.replace(/_/g, ' ')}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
                  aria-label={`Delete analysis for "${item.messagePreview}"`}
                  className="p-2 text-text-secondary hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-5 h-5" aria-hidden="true" />
                </button>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
