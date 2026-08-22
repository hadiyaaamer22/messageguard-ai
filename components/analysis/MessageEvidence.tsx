'use client';

import React from 'react';
import { Indicator } from '@/lib/types';
import { Card } from '@/components/ui/Card';

interface MessageEvidenceProps {
  message: string;
  indicators: Indicator[];
}

function highlightEvidenceInMessage(message: string, indicators: Indicator[]): React.ReactNode[] {
  const evidences = indicators.map((i) => i.evidence.toLowerCase());
  const nodes: React.ReactNode[] = [];

  let lastIndex = 0;
  const messageLower = message.toLowerCase();

  // Find all evidence occurrences
  const matches: Array<{ start: number; end: number; text: string }> = [];

  evidences.forEach((evidence) => {
    const cleanEvidence = evidence.replace(/^["|"]|["|"]$/g, '').trim();
    let index = 0;
    while ((index = messageLower.indexOf(cleanEvidence, index)) !== -1) {
      matches.push({
        start: index,
        end: index + cleanEvidence.length,
        text: message.substring(index, index + cleanEvidence.length),
      });
      index += cleanEvidence.length;
    }
  });

  // Sort by start index
  matches.sort((a, b) => a.start - b.start);

  // Merge overlapping ranges
  const merged: typeof matches = [];
  for (const match of matches) {
    if (merged.length === 0) {
      merged.push(match);
    } else {
      const last = merged[merged.length - 1];
      if (match.start <= last.end) {
        last.end = Math.max(last.end, match.end);
      } else {
        merged.push(match);
      }
    }
  }

  // Build nodes
  for (const match of merged) {
    if (lastIndex < match.start) {
      nodes.push(message.substring(lastIndex, match.start));
    }
    nodes.push(
      <mark
        key={`evidence-${match.start}`}
        className="bg-amber-900 text-amber-100 px-1 rounded font-semibold"
      >
        {match.text}
      </mark>
    );
    lastIndex = match.end;
  }

  if (lastIndex < message.length) {
    nodes.push(message.substring(lastIndex));
  }

  return nodes.length > 0 ? nodes : [message];
}

export const MessageEvidence: React.FC<MessageEvidenceProps> = ({
  message,
  indicators,
}) => {
  const highlighted = highlightEvidenceInMessage(message, indicators);

  return (
    <Card>
      <div className="space-y-2">
        <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
          Original Message (flagged phrases highlighted)
        </p>
        <div className="bg-surface border border-slate-700 rounded-lg p-3 text-sm text-text-primary whitespace-pre-wrap break-words leading-comfortable max-h-96 overflow-y-auto">
          {highlighted}
        </div>
        <p className="text-xs text-text-secondary italic">
          Highlighted sections correspond to detected warning signs shown above.
        </p>
      </div>
    </Card>
  );
};
