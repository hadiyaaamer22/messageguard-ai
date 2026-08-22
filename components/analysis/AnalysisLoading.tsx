'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';

const ANALYSIS_STEPS = [
  'Analyzing message content',
  'Checking for urgency signals',
  'Detecting credential requests',
  'Identifying payment patterns',
  'Examining links and domains',
  'Evaluating social-engineering tactics',
  'Generating assessment',
];

export const AnalysisLoading: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % ANALYSIS_STEPS.length);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4" role="status" aria-live="polite" aria-label="Analyzing message">
      <Card>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <div
                className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"
                aria-hidden="true"
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-text-primary">
                Analyzing message
              </h2>
              <p className="text-sm text-text-secondary">
                This may take a moment...
              </p>
            </div>
          </div>

          {/* Progress indicator */}
          <div className="space-y-2 pt-2 border-t border-slate-700">
            <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
              Checking
            </p>
            <div className="space-y-1">
              {ANALYSIS_STEPS.map((step, i) => (
                <div
                  key={i}
                  className={`text-xs p-2 rounded transition-all duration-300 ${
                    i === currentStep
                      ? 'bg-cyan-900 text-cyan-100 font-semibold'
                      : i < currentStep
                        ? 'bg-emerald-900 text-emerald-100 line-through opacity-70'
                        : 'bg-surface text-text-secondary'
                  }`}
                  aria-current={i === currentStep ? 'step' : undefined}
                >
                  {i < currentStep ? '✓' : i === currentStep ? '→' : '○'} {step}
                </div>
              ))}
            </div>
          </div>

          {/* Do not send sensitive info reminder */}
          <div className="mt-4 p-3 bg-amber-950 border border-amber-700 rounded-lg text-amber-100 text-xs">
            If you included sensitive information in the message, know that it was sent
            to our AI analysis service. Do not submit passwords, OTPs, or credentials.
          </div>
        </div>
      </Card>
    </div>
  );
};
