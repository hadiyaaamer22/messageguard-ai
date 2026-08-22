export type MessageSource =
  | 'email'
  | 'sms'
  | 'whatsapp'
  | 'social_media'
  | 'marketplace'
  | 'other';

export type RiskLevel = 'low' | 'medium' | 'high' | 'uncertain';

export type ScamCategory =
  | 'phishing'
  | 'impersonation'
  | 'payment_scam'
  | 'credential_theft'
  | 'job_scam'
  | 'delivery_scam'
  | 'investment_scam'
  | 'social_engineering'
  | 'spam'
  | 'possibly_legitimate'
  | 'uncertain';

export type IndicatorSeverity = 'low' | 'medium' | 'high';

export interface Indicator {
  type: string;
  severity: IndicatorSeverity;
  evidence: string;
  explanation: string;
}

export interface ExtractedLink {
  url: string;
  domain: string;
  concern: string | null;
}

export interface AnalysisResult {
  riskLevel: RiskLevel;
  riskScore: number;
  confidence: number;
  summary: string;
  likelyCategory: ScamCategory;
  indicators: Indicator[];
  extractedLinks: ExtractedLink[];
  sensitiveRequests: string[];
  recommendedActions: string[];
  uncertaintyNotes: string[];
  plainLanguageExplanation: string;
}

export interface AnalysisRequest {
  message: string;
  source: MessageSource;
}

export interface AnalysisResponse {
  success: boolean;
  data?: AnalysisResult;
  error?: {
    code: string;
    message: string;
  };
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  source: MessageSource;
  messagePreview: string;
  riskLevel: RiskLevel;
  result: AnalysisResult;
}

export type ApplicationError =
  | 'AI_UNAVAILABLE'
  | 'INVALID_INPUT'
  | 'PARSE_ERROR'
  | 'RATE_LIMITED'
  | 'TIMEOUT'
  | 'UNKNOWN_ERROR';
