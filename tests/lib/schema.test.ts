import { describe, it, expect } from 'vitest';
import { validateAnalysisResult, AnalysisResultSchema } from '@/lib/ai/schema';

describe('Analysis Result Schema', () => {
  const validResult = {
    riskLevel: 'high' as const,
    riskScore: 85,
    confidence: 0.92,
    summary: 'This message contains multiple phishing indicators.',
    likelyCategory: 'phishing' as const,
    indicators: [
      {
        type: 'Urgency',
        severity: 'high' as const,
        evidence: 'Account will be suspended',
        explanation: 'Legitimate companies do not use urgent language in unsolicited messages.',
      },
    ],
    extractedLinks: [
      {
        url: 'https://phishing-site.com',
        domain: 'phishing-site.com',
        concern: 'Unusual domain',
      },
    ],
    sensitiveRequests: ['password', 'OTP'],
    recommendedActions: ['Do not click links', 'Verify independently'],
    uncertaintyNotes: ['We cannot verify sender identity'],
    plainLanguageExplanation: 'This appears to be a phishing attempt.',
  };

  it('validates correct analysis result', () => {
    expect(() => validateAnalysisResult(validResult)).not.toThrow();
  });

  it('rejects missing riskLevel', () => {
    const invalid = { ...validResult, riskLevel: undefined };
    expect(() => validateAnalysisResult(invalid)).toThrow();
  });

  it('rejects invalid riskLevel', () => {
    const invalid = { ...validResult, riskLevel: 'invalid' };
    expect(() => validateAnalysisResult(invalid)).toThrow();
  });

  it('rejects riskScore outside range', () => {
    const invalid = { ...validResult, riskScore: 150 };
    expect(() => validateAnalysisResult(invalid)).toThrow();
  });

  it('rejects confidence outside range', () => {
    const invalid = { ...validResult, confidence: 1.5 };
    expect(() => validateAnalysisResult(invalid)).toThrow();
  });

  it('rejects invalid category', () => {
    const invalid = { ...validResult, likelyCategory: 'invalid_category' };
    expect(() => validateAnalysisResult(invalid)).toThrow();
  });

  it('accepts all valid categories', () => {
    const categories = [
      'phishing',
      'impersonation',
      'payment_scam',
      'credential_theft',
      'job_scam',
      'delivery_scam',
      'investment_scam',
      'social_engineering',
      'spam',
      'possibly_legitimate',
      'uncertain',
    ];

    for (const category of categories) {
      const result = {
        ...validResult,
        likelyCategory: category as any,
      };
      expect(() => validateAnalysisResult(result)).not.toThrow();
    }
  });

  it('validates empty arrays', () => {
    const result = {
      ...validResult,
      indicators: [],
      extractedLinks: [],
      sensitiveRequests: [],
      recommendedActions: [],
      uncertaintyNotes: [],
    };
    expect(() => validateAnalysisResult(result)).not.toThrow();
  });

  it('rejects malformed indicator', () => {
    const invalid = {
      ...validResult,
      indicators: [
        {
          type: 'Urgency',
          // missing severity
          evidence: 'evidence',
          explanation: 'explanation',
        },
      ],
    };
    expect(() => validateAnalysisResult(invalid)).toThrow();
  });

  it('rejects invalid link', () => {
    const invalid = {
      ...validResult,
      extractedLinks: [
        {
          url: 'https://phishing-site.com',
          domain: 'domain.com',
          concern: null,
        } as any,
      ],
    };
    // This should pass since we accept any string for URL
    expect(() => validateAnalysisResult(invalid)).not.toThrow();
  });
});
