'use client';

import React, { useRef, useEffect } from 'react';
import { MessageSource } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface MessageInputProps {
  message: string;
  onMessageChange: (message: string) => void;
  source: MessageSource;
  onSourceChange: (source: MessageSource) => void;
  onAnalyze: () => void;
  isLoading: boolean;
  error?: string;
}

const EXAMPLE_MESSAGES = [
  {
    label: 'Example: Fake Bank Verification',
    text: 'Your bank account has been locked due to suspicious activity. Click here immediately to verify your identity: https://bank-verify-secure.com/verify?id=usr123. This is your final warning.',
  },
  {
    label: 'Example: Suspicious Job Offer',
    text: 'Congratulations! You have been selected for a remote position paying $8,000/month. No experience needed. Send $500 for background check to get started. Contact: hr.opportunity@gmail.com',
  },
  {
    label: 'Example: Delivery Scam',
    text: 'Your package could not be delivered. Please pay the $3.50 shipping fee to claim your package: https://shipit-delivery.tk/pay. Do this within 2 hours or your package will be returned.',
  },
];

const SOURCES: { value: MessageSource; label: string }[] = [
  { value: 'email', label: 'Email' },
  { value: 'sms', label: 'SMS' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'social_media', label: 'Social Media' },
  { value: 'marketplace', label: 'Marketplace' },
  { value: 'other', label: 'Other' },
];

const MIN_MESSAGE_LENGTH = 10;
const MAX_MESSAGE_LENGTH = 10000;

export const MessageInput: React.FC<MessageInputProps> = ({
  message,
  onMessageChange,
  source,
  onSourceChange,
  onAnalyze,
  isLoading,
  error,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isValidMessage =
    message.trim().length >= MIN_MESSAGE_LENGTH &&
    message.trim().length <= MAX_MESSAGE_LENGTH;

  const characterCount = message.length;
  const isNearLimit = characterCount > MAX_MESSAGE_LENGTH * 0.9;

  const handleLoadExample = (exampleText: string) => {
    onMessageChange(exampleText);
  };

  const handleClear = () => {
    onMessageChange('');
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  useEffect(() => {
    if (textareaRef.current && message) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(
        textareaRef.current.scrollHeight,
        300
      ) + 'px';
    }
  }, [message]);

  return (
    <Card className="sticky top-0 z-10 md:relative md:z-auto md:sticky-none">
      <div className="space-y-4">
        {/* Source selector */}
        <div>
          <label
            htmlFor="source-select"
            className="block text-sm font-semibold text-text-primary mb-2"
          >
            Where did you receive this message?
          </label>
          <select
            id="source-select"
            value={source}
            onChange={(e) => onSourceChange(e.target.value as MessageSource)}
            className="w-full px-3 py-2 bg-surface border border-slate-600 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
            disabled={isLoading}
          >
            {SOURCES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        {/* Message textarea */}
        <div>
          <label
            htmlFor="message-textarea"
            className="block text-sm font-semibold text-text-primary mb-2"
          >
            Paste the suspicious message
          </label>
          <p className="text-xs text-text-secondary mb-2">
            Paste the message exactly as you received it. Remove any passwords, OTPs, or
            sensitive credentials first.
          </p>
          <textarea
            ref={textareaRef}
            id="message-textarea"
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            placeholder="Paste the full message text here..."
            disabled={isLoading}
            className={`w-full px-3 py-2 bg-surface border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all resize-none min-h-24 ${
              message && !isValidMessage ? 'border-red-600' : 'border-slate-600'
            }`}
            aria-describedby="message-help"
            spellCheck="true"
          />

          {/* Character counter */}
          <div className="flex justify-between items-center mt-2 text-xs text-text-secondary">
            <span
              id="message-help"
              className={isNearLimit ? 'text-amber-400' : ''}
            >
              {characterCount} / {MAX_MESSAGE_LENGTH} characters
            </span>
            {message && !isValidMessage && (
              <span className="text-red-400">
                {message.trim().length < MIN_MESSAGE_LENGTH
                  ? `Minimum ${MIN_MESSAGE_LENGTH} characters`
                  : 'Message too long'}
              </span>
            )}
          </div>
        </div>

        {/* Error display */}
        {error && (
          <div
            role="alert"
            className="p-3 bg-red-900 border border-red-700 rounded-lg text-red-100 text-sm"
          >
            {error}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-2">
          <Button
            onClick={onAnalyze}
            disabled={!isValidMessage || isLoading}
            isLoading={isLoading}
            className="flex-1"
          >
            Analyze Message
          </Button>
          <Button
            onClick={handleClear}
            variant="secondary"
            disabled={!message || isLoading}
          >
            Clear
          </Button>
        </div>

        {/* Example messages */}
        <details className="pt-2 border-t border-slate-700">
          <summary className="text-sm font-semibold text-cyan-400 cursor-pointer hover:text-cyan-300">
            Load example message
          </summary>
          <div className="mt-3 space-y-2">
            {EXAMPLE_MESSAGES.map((example, i) => (
              <button
                key={i}
                onClick={() => handleLoadExample(example.text)}
                className="w-full text-left px-2 py-2 text-sm bg-surface hover:bg-surface-elevated border border-slate-700 rounded transition-colors text-text-secondary hover:text-text-primary"
                disabled={isLoading}
              >
                {example.label}
              </button>
            ))}
          </div>
        </details>
      </div>
    </Card>
  );
};
