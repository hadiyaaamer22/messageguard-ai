'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { MessageSquare } from 'lucide-react';

export const EmptyState: React.FC = () => {
  return (
    <Card>
      <div className="text-center space-y-3 py-8">
        <MessageSquare className="w-12 h-12 mx-auto text-text-secondary opacity-50" aria-hidden="true" />
        <div>
          <h2 className="text-lg font-semibold text-text-primary">No analysis yet</h2>
          <p className="text-sm text-text-secondary">
            Paste a suspicious message to see its risk indicators, links, and recommended
            actions.
          </p>
        </div>
      </div>
    </Card>
  );
};
