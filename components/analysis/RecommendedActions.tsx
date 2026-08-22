'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { CheckCircle } from 'lucide-react';

interface RecommendedActionsProps {
  actions: string[];
}

export const RecommendedActions: React.FC<RecommendedActionsProps> = ({ actions }) => {
  return (
    <Card>
      <ul className="space-y-3">
        {actions.map((action, i) => (
          <li key={i} className="flex gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <span className="text-sm text-text-secondary">{action}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
};
