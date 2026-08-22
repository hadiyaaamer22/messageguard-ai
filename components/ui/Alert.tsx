import React, { ReactNode } from 'react';
import { AlertCircle, CheckCircle, AlertTriangle, Info, X } from 'lucide-react';

interface AlertProps {
  type: 'error' | 'warning' | 'success' | 'info';
  title?: string;
  children: ReactNode;
  onClose?: () => void;
  role?: 'alert' | 'status';
}

const alertConfig = {
  error: {
    bg: 'bg-red-950',
    border: 'border-red-800',
    text: 'text-red-100',
    icon: AlertCircle,
  },
  warning: {
    bg: 'bg-amber-950',
    border: 'border-amber-800',
    text: 'text-amber-100',
    icon: AlertTriangle,
  },
  success: {
    bg: 'bg-emerald-950',
    border: 'border-emerald-800',
    text: 'text-emerald-100',
    icon: CheckCircle,
  },
  info: {
    bg: 'bg-blue-950',
    border: 'border-blue-800',
    text: 'text-blue-100',
    icon: Info,
  },
};

export const Alert: React.FC<AlertProps> = ({
  type,
  title,
  children,
  onClose,
  role = 'alert',
}) => {
  const config = alertConfig[type];
  const Icon = config.icon;

  return (
    <div
      role={role}
      className={`${config.bg} ${config.border} border rounded-lg p-4 ${config.text}`}
    >
      <div className="flex items-start gap-3">
        <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" aria-hidden="true" />
        <div className="flex-1">
          {title && <div className="font-semibold mb-1">{title}</div>}
          <div className="text-sm">{children}</div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close alert"
            className="flex-shrink-0 text-current opacity-60 hover:opacity-100 transition-opacity"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};
