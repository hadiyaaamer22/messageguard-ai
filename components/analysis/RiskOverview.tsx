'use client';

import React from 'react';
import { AnalysisResult } from '@/lib/types';
import { RiskBadge } from '@/components/ui/RiskBadge';
import { Card } from '@/components/ui/Card';

interface RiskOverviewProps {
  result: AnalysisResult;
}

export const RiskOverview: React.FC<RiskOverviewProps> = ({ result }) => {
  return (
    <Card>
      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">
            Risk Assessment
          </h2>
          <div className="flex items-end justify-between gap-4">
            <div>
              <RiskBadge level={result.riskLevel} size="lg" />
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-text-primary">
                {result.riskScore}
              </div>
              <div className="text-xs text-text-secondary">
                Risk indicator score
              </div>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-700">
          <h3 className="text-sm font-semibold text-text-primary mb-2">
            Summary
          </h3>
          <p className="text-sm text-text-secondary leading-comfortable">
            {result.summary}
          </p>
        </div>

        <div className="pt-2 border-t border-slate-700">
          <div className="inline-block px-3 py-1 bg-slate-700 rounded text-xs text-text-secondary font-medium">
            {result.likelyCategory.replace(/_/g, ' ').replace(/\b\w/g, (l) =>
              l.toUpperCase()
            )}
          </div>
        </div>

        <div className="text-xs text-text-secondary italic pt-2">
          Confidence: {Math.round(result.confidence * 100)}%
        </div>
      </div>
    </Card>
  );
};
