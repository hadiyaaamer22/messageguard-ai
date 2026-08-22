'use client';

import React, { useState } from 'react';
import { AnalysisResult } from '@/lib/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { RiskOverview } from './RiskOverview';
import { IndicatorCard } from './IndicatorCard';
import { LinkInspector } from './LinkInspector';
import { RecommendedActions } from './RecommendedActions';
import { UncertaintyPanel } from './UncertaintyPanel';
import { MessageEvidence } from './MessageEvidence';
import { Copy, ChevronDown, ChevronUp } from 'lucide-react';

interface AnalysisResultsProps {
  result: AnalysisResult;
  message: string;
  onNewAnalysis: () => void;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  result,
  message,
  onNewAnalysis,
}) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    indicators: true,
    links: result.extractedLinks.length > 0,
    actions: true,
    uncertainty: result.uncertaintyNotes.length > 0,
    evidence: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCopyReport = async () => {
    const report = `
MessageGuard AI - Security Analysis Report
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Risk Level: ${result.riskLevel.toUpperCase()}
Risk Score: ${result.riskScore}/100
Confidence: ${Math.round(result.confidence * 100)}%

SUMMARY
${result.summary}

WARNING SIGNS
${result.indicators
  .map(
    (i) => `
  • ${i.type} (${i.severity})
    ${i.explanation}`
  )
  .join('\n')}

SENSITIVE REQUESTS DETECTED
${result.sensitiveRequests.length > 0 ? result.sensitiveRequests.map((r) => `  • ${r}`).join('\n') : '  None identified'}

RECOMMENDED ACTIONS
${result.recommendedActions.map((a) => `  • ${a}`).join('\n')}

UNCERTAINTY NOTES
${result.uncertaintyNotes.map((u) => `  • ${u}`).join('\n')}

DISCLAIMER
MessageGuard provides an AI-assisted risk assessment, not a definitive security verdict. 
Never share passwords, OTPs, recovery codes, or financial credentials based solely on this analysis.
    `.trim();

    try {
      await navigator.clipboard.writeText(report);
      alert('Report copied to clipboard');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header with action buttons */}
      <div className="flex flex-col sm:flex-row gap-2 justify-between items-start">
        <h2 className="text-xl font-bold text-text-primary">Analysis Results</h2>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            onClick={handleCopyReport}
            variant="secondary"
            size="sm"
            className="flex-1 sm:flex-none"
          >
            <Copy className="w-4 h-4 mr-1" aria-hidden="true" />
            Copy Report
          </Button>
          <Button
            onClick={onNewAnalysis}
            variant="primary"
            size="sm"
            className="flex-1 sm:flex-none"
          >
            New Analysis
          </Button>
        </div>
      </div>

      {/* Risk Overview */}
      <RiskOverview result={result} />

      {/* Plain Language Explanation */}
      <Card>
        <h3 className="text-sm font-semibold text-text-primary mb-2">
          What This Means
        </h3>
        <p className="text-sm text-text-secondary leading-comfortable">
          {result.plainLanguageExplanation}
        </p>
      </Card>

      {/* Warning Signs */}
      {result.indicators.length > 0 && (
        <div>
          <button
            onClick={() => toggleSection('indicators')}
            className="w-full flex items-center justify-between p-4 bg-surface-elevated border border-slate-700 rounded-lg hover:border-slate-600 transition-colors"
            aria-expanded={expandedSections.indicators}
          >
            <h3 className="font-semibold text-text-primary">
              Detected Warning Signs ({result.indicators.length})
            </h3>
            {expandedSections.indicators ? (
              <ChevronUp className="w-5 h-5" aria-hidden="true" />
            ) : (
              <ChevronDown className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
          {expandedSections.indicators && (
            <div className="mt-2 space-y-2">
              {result.indicators.map((indicator, i) => (
                <IndicatorCard key={i} indicator={indicator} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Links Inspector */}
      {result.extractedLinks.length > 0 && (
        <div>
          <button
            onClick={() => toggleSection('links')}
            className="w-full flex items-center justify-between p-4 bg-surface-elevated border border-slate-700 rounded-lg hover:border-slate-600 transition-colors"
            aria-expanded={expandedSections.links}
          >
            <h3 className="font-semibold text-text-primary">
              Links Found ({result.extractedLinks.length})
            </h3>
            {expandedSections.links ? (
              <ChevronUp className="w-5 h-5" aria-hidden="true" />
            ) : (
              <ChevronDown className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
          {expandedSections.links && (
            <div className="mt-2">
              <LinkInspector links={result.extractedLinks} />
            </div>
          )}
        </div>
      )}

      {/* Recommended Actions */}
      <div>
        <button
          onClick={() => toggleSection('actions')}
          className="w-full flex items-center justify-between p-4 bg-surface-elevated border border-slate-700 rounded-lg hover:border-slate-600 transition-colors"
          aria-expanded={expandedSections.actions}
        >
          <h3 className="font-semibold text-text-primary">Recommended Actions</h3>
          {expandedSections.actions ? (
            <ChevronUp className="w-5 h-5" aria-hidden="true" />
          ) : (
            <ChevronDown className="w-5 h-5" aria-hidden="true" />
          )}
        </button>
        {expandedSections.actions && (
          <div className="mt-2">
            <RecommendedActions actions={result.recommendedActions} />
          </div>
        )}
      </div>

      {/* Uncertainty Notes */}
      {result.uncertaintyNotes.length > 0 && (
        <div>
          <button
            onClick={() => toggleSection('uncertainty')}
            className="w-full flex items-center justify-between p-4 bg-surface-elevated border border-slate-700 rounded-lg hover:border-slate-600 transition-colors"
            aria-expanded={expandedSections.uncertainty}
          >
            <h3 className="font-semibold text-text-primary">What We Cannot Verify</h3>
            {expandedSections.uncertainty ? (
              <ChevronUp className="w-5 h-5" aria-hidden="true" />
            ) : (
              <ChevronDown className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
          {expandedSections.uncertainty && (
            <div className="mt-2">
              <UncertaintyPanel notes={result.uncertaintyNotes} />
            </div>
          )}
        </div>
      )}

      {/* Original Message Evidence */}
      <div>
        <button
          onClick={() => toggleSection('evidence')}
          className="w-full flex items-center justify-between p-4 bg-surface-elevated border border-slate-700 rounded-lg hover:border-slate-600 transition-colors"
          aria-expanded={expandedSections.evidence}
        >
          <h3 className="font-semibold text-text-primary">Original Message</h3>
          {expandedSections.evidence ? (
            <ChevronUp className="w-5 h-5" aria-hidden="true" />
          ) : (
            <ChevronDown className="w-5 h-5" aria-hidden="true" />
          )}
        </button>
        {expandedSections.evidence && (
          <div className="mt-2">
            <MessageEvidence message={message} indicators={result.indicators} />
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <Card className="border-amber-700 bg-amber-950">
        <p className="text-xs text-amber-100">
          <strong>Disclaimer:</strong> MessageGuard provides an AI-assisted risk assessment,
          not a definitive security verdict. Never share passwords, OTPs, recovery codes,
          or financial credentials based solely on this analysis.
        </p>
      </Card>
    </div>
  );
};
