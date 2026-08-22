import React from 'react';
import { Card } from '@/components/ui/Card';
import {
  AlertTriangle,
  Clock,
  Link2,
  Zap,
  Shield,
  Brain,
} from 'lucide-react';

export default function HowItWorks() {
  const threats = [
    {
      icon: AlertTriangle,
      title: 'Urgency & Pressure',
      description: 'Legitimate companies rarely force you to act immediately via unsolicited messages.',
    },
    {
      icon: Shield,
      title: 'Impersonation',
      description: 'Scammers pretend to be banks, government agencies, or trusted companies.',
    },
    {
      icon: Zap,
      title: 'Credential Requests',
      description: 'No legitimate service asks for passwords, OTPs, or PINs via message.',
    },
    {
      icon: Clock,
      title: 'Payment Scams',
      description: 'Advance fees, unusual payment methods, or rewards that seem too good to be true.',
    },
    {
      icon: Link2,
      title: 'Suspicious Links',
      description: 'URLs that misspell brand names, use shortened links, or have unusual domains.',
    },
    {
      icon: Brain,
      title: 'Social Engineering',
      description: 'Psychological manipulation using fear, curiosity, authority, or emotional appeals.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary mb-2">How MessageGuard Works</h1>
        <p className="text-text-secondary">
          MessageGuard uses AI to analyze messages for common phishing and scam patterns.
        </p>
      </div>

      {/* Process */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-text-primary mb-6">The Analysis Process</h2>
        <div className="space-y-4">
          {[
            {
              step: '1',
              title: 'You paste a message',
              description: 'Paste the full text of any suspicious email, SMS, WhatsApp message, or other communication.',
            },
            {
              step: '2',
              title: 'AI analyzes content',
              description: 'Claude AI examines the message for phishing indicators, urgency tactics, credential requests, and more.',
            },
            {
              step: '3',
              title: 'Structured assessment',
              description: 'The AI returns a structured evaluation: risk level, warning signs, suspicious links, and recommended actions.',
            },
            {
              step: '4',
              title: 'You make an informed decision',
              description: 'You see exactly which parts of the message appear suspicious and why, helping you decide whether to trust it.',
            },
          ].map((item) => (
            <Card key={item.step} className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-cyan-900 text-cyan-100 flex items-center justify-center font-bold text-lg">
                {item.step}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-text-primary mb-1">{item.title}</h3>
                <p className="text-sm text-text-secondary">{item.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* What we look for */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-text-primary mb-6">What We Look For</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {threats.map((threat) => {
            const Icon = threat.icon;
            return (
              <Card key={threat.title} className="space-y-2">
                <div className="flex items-start gap-3">
                  <Icon className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <h3 className="font-semibold text-text-primary text-sm">{threat.title}</h3>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      {threat.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* What we don't do */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-text-primary mb-6">What We Cannot Do</h2>
        <Card className="space-y-2">
          <ul className="space-y-2 text-sm text-text-secondary">
            <li>✗ We cannot click links or visit websites to check their reputation.</li>
            <li>✗ We cannot verify sender identity or check if an email address is legitimate.</li>
            <li>✗ We cannot check external threat databases or reputation services.</li>
            <li>✗ We cannot guarantee 100% accuracy—AI can make mistakes.</li>
            <li>✗ We cannot analyze images or attachments (text only).</li>
            <li>✗ We cannot provide legal or security expert advice.</li>
          </ul>
        </Card>
      </section>

      {/* Important principles */}
      <section>
        <h2 className="text-2xl font-bold text-text-primary mb-6">Important Principles</h2>
        <div className="space-y-4">
          <Card className="border-cyan-700 bg-cyan-950">
            <h3 className="font-semibold text-cyan-100 mb-1">We are cautious about certainty</h3>
            <p className="text-sm text-cyan-100 opacity-90">
              We say "Low risk indicators detected" not "This message is safe." AI analysis is
              helpful context, not proof.
            </p>
          </Card>

          <Card className="border-amber-700 bg-amber-950">
            <h3 className="font-semibold text-amber-100 mb-1">We never request sensitive information</h3>
            <p className="text-sm text-amber-100 opacity-90">
              Do not paste passwords, OTPs, credit card numbers, or private keys into MessageGuard.
            </p>
          </Card>

          <Card className="border-emerald-700 bg-emerald-950">
            <h3 className="font-semibold text-emerald-100 mb-1">We trust your judgment</h3>
            <p className="text-sm text-emerald-100 opacity-90">
              Use MessageGuard as one input, not the final decision. Verify independently, contact
              organizations directly, and follow your instincts.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
}
