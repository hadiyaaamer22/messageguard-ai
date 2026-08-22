'use client';

import React, { useState, useCallback } from 'react';
import { MessageSource, AnalysisResult } from '@/lib/types';
import { MessageInput } from '@/components/analysis/MessageInput';
import { AnalysisLoading } from '@/components/analysis/AnalysisLoading';
import { AnalysisResults } from '@/components/analysis/AnalysisResults';
import { EmptyState } from '@/components/analysis/EmptyState';
import { saveAnalysis } from '@/lib/storage/history';
import { Alert } from '@/components/ui/Alert';

type AnalysisState = 'empty' | 'loading' | 'result' | 'error';

export default function Home() {
  const [message, setMessage] = useState('');
  const [source, setSource] = useState<MessageSource>('email');
  const [state, setState] = useState<AnalysisState>('empty');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string>('');
  const [apiError, setApiError] = useState<string>('');

  const handleAnalyze = useCallback(async () => {
    setApiError('');
    setError('');
    setState('loading');

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message.trim(),
          source,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        const errorMsg = data.error?.message || 'An error occurred during analysis';
        setApiError(errorMsg);
        setState('error');
        return;
      }

      if (!data.data) {
        throw new Error('No analysis data returned');
      }

      const analysisResult = data.data as AnalysisResult;
      setResult(analysisResult);
      
      // Save to local history
      saveAnalysis(message, source, analysisResult);
      
      setState('result');
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Network error or invalid response';
      setApiError(errorMsg);
      setState('error');
    }
  }, [message, source]);

  const handleNewAnalysis = () => {
    setMessage('');
    setError('');
    setApiError('');
    setResult(null);
    setState('empty');
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        <a href="#main" className="skip-to-content">
          Skip to main content
        </a>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Panel - Left/Top */}
          <div className="lg:col-span-1">
            <MessageInput
              message={message}
              onMessageChange={setMessage}
              source={source}
              onSourceChange={setSource}
              onAnalyze={handleAnalyze}
              isLoading={state === 'loading'}
              error={error}
            />
          </div>

          {/* Results Panel - Right/Bottom */}
          <div id="main" className="lg:col-span-2 space-y-4">
            {/* API Error Alert */}
            {apiError && (
              <Alert
                type="error"
                title="Analysis Failed"
                onClose={() => setApiError('')}
              >
                {apiError}
              </Alert>
            )}

            {/* State-based rendering */}
            {state === 'empty' && <EmptyState />}
            {state === 'loading' && <AnalysisLoading />}
            {state === 'result' && result && (
              <AnalysisResults
                result={result}
                message={message}
                onNewAnalysis={handleNewAnalysis}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
