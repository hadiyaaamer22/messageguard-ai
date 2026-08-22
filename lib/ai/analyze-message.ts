import Anthropic from '@anthropic-ai/sdk';
import { validateAnalysisResult } from './schema';
import { SYSTEM_PROMPT, createAnalysisPrompt } from './prompt';
import { AnalysisResult } from '@/lib/types';

const MODEL = process.env.ANTHROPIC_MODEL || 'claude-3-5-sonnet-20241022';
const TIMEOUT_MS = 30000;
const MAX_MESSAGE_LENGTH = 10000;

export async function analyzeMessage(
  message: string,
  source: string
): Promise<AnalysisResult> {
  // DEMO MODE - Skip API if no key or DEMO=true
  if (!process.env.ANTHROPIC_API_KEY || process.env.DEMO_MODE === 'true') {
    console.log('🎭 DEMO MODE: Returning mock analysis');
    return getDemoAnalysis(message, source);
  }

  const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  // Input validation
  if (!message || !message.trim()) {
    throw new Error('Message cannot be empty');
  }

  const trimmedMessage = message.trim();

  if (trimmedMessage.length < 10) {
    throw new Error('Message is too short to analyze meaningfully');
  }

  if (trimmedMessage.length > MAX_MESSAGE_LENGTH) {
    throw new Error(
      `Message exceeds maximum length of ${MAX_MESSAGE_LENGTH} characters`
    );
  }

  const userPrompt = createAnalysisPrompt(trimmedMessage, source);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    let response;
    try {
      response = await client.messages.create({
        model: MODEL,
        max_tokens: 2048,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: 'user',
            content: userPrompt,
          },
        ],
      });
    } finally {
      clearTimeout(timeoutId);
    }

    // Extract text response
    if (!response || !response.content || response.content.length === 0) {
      throw new Error('No response from Claude API');
    }

    const textContent = response.content[0];
    if (textContent.type !== 'text') {
      throw new Error('Unexpected response type from Claude API');
    }

    if (!textContent.text) {
      throw new Error('Empty response from Claude API');
    }

    // Parse JSON response
    let jsonMatch = textContent.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('Claude Response:', textContent.text);
      throw new Error('No JSON found in response');
    }

    let parsed;
    try {
      parsed = JSON.parse(jsonMatch[0]);
    } catch (parseErr) {
      console.error('JSON Parse Error:', parseErr);
      console.error('Attempted to parse:', jsonMatch[0].substring(0, 500));
      throw new Error('Failed to parse Claude response as JSON');
    }

    // Validate against schema
    const result = validateAnalysisResult(parsed);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError' || error.message.includes('timeout')) {
        throw new Error('Analysis timeout: request took too long');
      }
      if (error.message.includes('rate_limit') || error.message.includes('overloaded')) {
        throw new Error('Rate limited: too many requests');
      }
      if (error.message.includes('authentication') || error.message.includes('unauthorized')) {
        console.error('Auth error:', error.message);
        throw new Error('Authentication failed: check API key');
      }
      // Re-throw validation errors as-is
      if (error.message.includes('ValidationError') || error.message.includes('Parse')) {
        throw new Error(`Response validation failed: ${error.message}`);
      }
      throw error;
    }
    throw new Error('Unknown error during analysis');
  }
}


function getDemoAnalysis(message: string, source: string): AnalysisResult {
  const hasUrgency = /urgent|immediately|act now|hurry|limited time/i.test(message);
  const hasCredentials = /password|account|verify|confirm|login|credential/i.test(message);
  const hasLinks = /http|www\.|\.com|click here/i.test(message);
  const hasMoney = /\$|money|payment|transfer|inheritance|lottery|prize/i.test(message);
  
  const riskScore = 
    (hasUrgency ? 25 : 0) + 
    (hasCredentials ? 30 : 0) + 
    (hasLinks ? 20 : 0) + 
    (hasMoney ? 25 : 0);

  let riskLevel: 'low' | 'medium' | 'high' | 'uncertain' = 'low';
  if (riskScore > 60) riskLevel = 'high';
  else if (riskScore > 30) riskLevel = 'medium';

  const indicators: { type: string; severity: 'low' | 'medium' | 'high'; evidence: string; explanation: string }[] = [];
  
  if (hasUrgency) {
    indicators.push({
      type: 'Urgency',
      severity: 'high',
      evidence: 'Uses urgent language to pressure immediate action',
      explanation: 'Scammers create artificial urgency to bypass your critical thinking'
    });
  }
  
  if (hasCredentials) {
    indicators.push({
      type: 'Credential Request',
      severity: 'high',
      evidence: 'Requests sensitive account information or passwords',
      explanation: 'Legitimate companies never ask for passwords via message'
    });
  }
  
  if (hasLinks) {
    indicators.push({
      type: 'Suspicious Links',
      severity: 'medium',
      evidence: 'Contains links that may lead to phishing sites',
      explanation: 'Links could redirect to fake websites designed to steal information'
    });
  }

  return {
    riskLevel,
    riskScore: Math.min(riskScore, 100),
    confidence: 0.85,
    summary: `This message shows ${riskLevel} risk indicators. ${hasCredentials ? 'It requests sensitive credentials. ' : ''}${hasUrgency ? 'It uses urgent language. ' : ''}Exercise caution before responding.`,
    likelyCategory: hasCredentials ? 'phishing' : hasMoney ? 'payment_scam' : 'spam',
    indicators,
    extractedLinks: [],
    sensitiveRequests: hasCredentials ? ['Account credentials', 'Password'] : [],
    recommendedActions: [
      riskLevel === 'high' ? 'Do not respond to this message' : 'Verify sender identity before responding',
      'Do not click any links in the message',
      riskLevel === 'high' ? 'Report this message as spam/phishing' : 'Be cautious with any requests',
    ],
    uncertaintyNotes: ['Demo mode - analysis is simulated based on keyword detection'],
    plainLanguageExplanation: `This ${source} message has been analyzed for common scam patterns. ${indicators.length > 0 ? 'We found warning signs including ' + indicators.map(i => i.type.toLowerCase()).join(', ') + '.' : 'No major warning signs detected.'} ${riskLevel === 'high' ? 'We strongly recommend not interacting with this message.' : 'Always verify sender identity before sharing any information.'}`,
  };
}
