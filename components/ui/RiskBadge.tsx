import React from 'react';
import { RiskLevel } from '@/lib/types';
import { AlertCircle, AlertTriangle, CheckCircle, HelpCircle } from 'lucide-react';

interface RiskBadgeProps {
  level: RiskLevel;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const riskConfig = {
  low: {
    bg: 'bg-emerald-900',
    text: 'text-emerald-100',
    border: 'border-emerald-700',
    label: 'Low Risk',
    icon: CheckCircle,
    ariaLabel: 'Low risk level',
  },
  medium: {
    bg: 'bg-amber-900',
    text: 'text-amber-100',
    border: 'border-amber-700',
    label: 'Medium Risk',
    icon: AlertTriangle,
    ariaLabel: 'Medium risk level',
  },
  high: {
    bg: 'bg-red-900',
    text: 'text-red-100',
    border: 'border-red-700',
    label: 'High Risk',
    icon: AlertCircle,
    ariaLabel: 'High risk level',
  },
  uncertain: {
    bg: 'bg-purple-900',
    text: 'text-purple-100',
    border: 'border-purple-700',
    label: 'Unable to Determine',
    icon: HelpCircle,
    ariaLabel: 'Uncertain risk level',
  },
};

export const RiskBadge: React.FC<RiskBadgeProps> = ({
  level,
  className,
  size = 'md',
}) => {
  const config = riskConfig[level];
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs gap-1',
    md: 'px-3 py-2 text-sm gap-2',
    lg: 'px-4 py-3 text-base gap-2',
  };

  return (
    <div
      className={`${config.bg} ${config.text} ${config.border} border rounded-lg ${sizeClasses[size]} inline-flex items-center font-semibold ${
        className || ''
      }`}
      role="status"
      aria-label={config.ariaLabel}
    >
      <Icon className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
      <span>{config.label}</span>
    </div>
  );
};
