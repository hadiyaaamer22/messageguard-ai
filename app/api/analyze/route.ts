import { NextRequest, NextResponse } from 'next/server';
import { analyzeMessage } from '@/lib/ai/analyze-message';
import { AnalysisResponse } from '@/lib/types';
import { z } from 'zod';

const RequestSchema = z.object({
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(10000, 'Message exceeds maximum length'),
  source: z.enum([
    'email',
    'sms',
    'whatsapp',
    'social_media',
    'marketplace',
    'other',
  ]),
});

export async function POST(request: NextRequest): Promise<NextResponse<AnalysisResponse>> {
  try {
    // In demo mode, skip API key check
    const isDemoMode = process.env.DEMO_MODE === 'true';
    
    console.log('DEMO_MODE env var:', process.env.DEMO_MODE);
    console.log('isDemoMode:', isDemoMode);
    console.log('ANTHROPIC_API_KEY exists:', !!process.env.ANTHROPIC_API_KEY);
    
    // Validate API key exists (unless in demo mode)
    if (!isDemoMode && !process.env.ANTHROPIC_API_KEY) {
      console.error('Missing ANTHROPIC_API_KEY and not in demo mode');
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'AI_UNAVAILABLE',
            message: 'Analysis service is not configured.',
          },
        } as AnalysisResponse,
        { status: 503 }
      );
    }

    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_INPUT',
            message: 'Invalid request format.',
          },
        } as AnalysisResponse,
        { status: 400 }
      );
    }

    // Validate request
    const validated = RequestSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_INPUT',
            message: validated.error.errors[0]?.message || 'Invalid input parameters.',
          },
        } as AnalysisResponse,
        { status: 400 }
      );
    }

    const { message, source } = validated.data;

    // Call AI analysis
    const result = await analyzeMessage(message, source);

    return NextResponse.json(
      {
        success: true,
        data: result,
      } as AnalysisResponse,
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    console.error('Analysis error:', errorMessage);

    // Determine error code
    let errorCode = 'UNKNOWN_ERROR';
    let statusCode = 500;

    if (errorMessage.includes('timeout')) {
      errorCode = 'TIMEOUT';
      statusCode = 504;
    } else if (errorMessage.includes('rate') || errorMessage.includes('overloaded')) {
      errorCode = 'RATE_LIMITED';
      statusCode = 429;
    } else if (errorMessage.includes('validation')) {
      errorCode = 'PARSE_ERROR';
      statusCode = 422;
    } else if (
      errorMessage.includes('Authentication') ||
      errorMessage.includes('API key') ||
      errorMessage.includes('unauthorized')
    ) {
      errorCode = 'AI_UNAVAILABLE';
      statusCode = 503;
    }

    return NextResponse.json(
      {
        success: false,
        error: {
          code: errorCode,
          message:
            statusCode === 500
              ? 'We encountered an error analyzing your message. Please try again.'
              : errorMessage,
        },
      } as AnalysisResponse,
      { status: statusCode }
    );
  }
}

export function OPTIONS(): NextResponse {
  return new NextResponse(null, {
    headers: {
      Allow: 'POST, OPTIONS',
    },
  });
}
