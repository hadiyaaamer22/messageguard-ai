'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { HelpCircle } from 'lucide-react';

interface UncertaintyPanelProps {
  notes: string[];
}

export const UncertaintyPanel: React.FC<UncertaintyPanelProps> = ({ notes }) => {
  return (
    <Card className="border-purple-700 bg-purple-950">
      <div className="space-y-2">
        {notes.map((note, i) => (
          <div key={i} className="flex gap-2 text-purple-100 text-sm">
            <HelpCircle className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <span>{note}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};
