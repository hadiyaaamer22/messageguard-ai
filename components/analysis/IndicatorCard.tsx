'use client';

import React from 'react';
import { Indicator } from '@/lib/types';
import { AlertCircle, AlertTriangle, Info } from 'lucide-react';

interface IndicatorCardProps {
  indicator: Indicator;
}

const severityConfig = {
  low: {
    bg: 'bg-blue-950',
    border: 'border-blue-700',
    text: 'text-blue-100',
    icon: Info,
    label: 'Low',
  },
  medium: {
    bg: 'bg-amber-950',
    border: 'border-amber-700',
    text: 'text-amber-100',
    icon: AlertTriangle,
    label: 'Medium',
  },
  high: {
    bg: 'bg-red-950',
    border: 'border-red-700',
    text: 'text-red-100',
    icon: AlertCircle,
    label: 'High',
  },
};

export const IndicatorCard: React.FC<IndicatorCardProps> = ({ indicator }) => {
  const config = severityConfig[indicator.severity];
  const Icon = config.icon;

  return (
    <div
      className={`${config.bg} ${config.border} border rounded-lg p-3 md:p-4 ${config.text}`}
    >
      <div className="flex gap-3 mb-2">
        <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" aria-hidden="true" />
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-semibold text-sm md:text-base">{indicator.type}</h4>
            <span
              className="text-xs font-medium whitespace-nowrap px-2 py-1 bg-black bg-opacity-30 rounded"
              aria-label={`Severity: ${config.label}`}
            >
              {config.label}
            </span>
          </div>
        </div>
      </div>

      <div className="ml-8 space-y-2">
        <div>
          <p className="text-xs font-mono bg-black bg-opacity-30 rounded px-2 py-1 break-words">
            "{indicator.evidence}"
          </p>
        </div>

        <p className="text-sm text-current opacity-90">
          {indicator.explanation}
        </p>
      </div>
    </div>
  );
};
