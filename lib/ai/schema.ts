import { z } from 'zod';

const IndicatorSchema = z.object({
  type: z.string().describe('Category of the indicator (e.g., "Urgency", "Credential Request")'),
  severity: z.enum(['low', 'medium', 'high']).describe('Severity level of this indicator'),
  evidence: z.string().describe('Direct quote or specific example from the message'),
  explanation: z.string().describe('Plain-language explanation suitable for non-technical users'),
});

const ExtractedLinkSchema = z.object({
  url: z.string().describe('The full URL as it appears in the message'),
  domain: z.string().describe('The hostname/domain of the URL'),
  concern: z.string().nullable().describe('Specific concern if any, null if none identified'),
});

export const AnalysisResultSchema = z.object({
  riskLevel: z.enum(['low', 'medium', 'high', 'uncertain']).describe('Overall risk classification'),
  riskScore: z.number().min(0).max(100).describe('Risk indicator score (0-100), not a probability'),
  confidence: z.number().min(0).max(1).describe('Confidence in the analysis (0-1)'),
  summary: z.string().describe('2-4 sentence executive summary of findings'),
  likelyCategory: z.enum([
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
  ]).describe('Most likely scam/threat category'),
  indicators: z.array(IndicatorSchema).describe('List of identified warning signs'),
  extractedLinks: z.array(ExtractedLinkSchema).describe('URLs found in the message with concerns'),
  sensitiveRequests: z.array(z.string()).describe('List of sensitive information being requested'),
  recommendedActions: z.array(z.string()).describe('Actionable recommendations for the user'),
  uncertaintyNotes: z.array(z.string()).describe('What the analysis cannot verify or determine'),
  plainLanguageExplanation: z.string().describe('Explanation in accessible language for general audience'),
});

export type AnalysisResult = z.infer<typeof AnalysisResultSchema>;

export function validateAnalysisResult(data: unknown): AnalysisResult {
  return AnalysisResultSchema.parse(data);
}
