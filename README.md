# MessageGuard AI

An AI-powered tool to help you spot suspicious messages before it's too late.

🔗 **Live Demo**: https://messageguard-ai.vercel.app/

## What's This About?

We all get those weird messages - emails saying your account needs "urgent verification", texts about a package delivery you never ordered, or WhatsApp messages from "relatives" asking for money. This app helps you figure out if they're legit or scams.

I built this as my capstone project because I saw my own family members falling for phishing scams. It uses AI to check messages for common warning signs and explains what looks suspicious in plain English.

## How It Works

Pretty simple:
1. Paste any suspicious message (email, SMS, whatever)
2. Click analyze
3. Get a breakdown of what looks sketchy and why

The app checks for things like fake urgency, requests for passwords, suspicious links, and other red flags scammers typically use.

## Features

- **Risk Analysis** - Shows you how risky the message looks (low/medium/high)
- **Warning Signs** - Points out specific red flags with examples from the message
- **Link Checker** - Extracts any URLs and flags suspicious ones
- **Plain English** - No jargon, just clear explanations anyone can understand
- **Local History** - Saves your past analyses (only on your device, nowhere else)
- **Works on Mobile** - Check messages on your phone

## Tech Stack

Built with:
- Next.js & React (frontend)
- TypeScript (for fewer bugs)
- Tailwind CSS (styling)
- Claude AI (the smart part that analyzes messages)
- Vitest (testing)

## Setup

If you want to run this locally:

```bash
git clone https://github.com/hadiyaaamer22/messageguard-ai.git
cd messageguard-ai
npm install
```

You'll need a Claude API key from [Anthropic](https://console.anthropic.com). Create a `.env.local` file:

```
DEMO_MODE=true
ANTHROPIC_API_KEY=your_key_here
ANTHROPIC_MODEL=claude-3-5-sonnet-20241022
```

Then:
```bash
npm run dev
```

Open http://localhost:3000

**Note**: Demo mode works without an API key - it uses local keyword detection instead of AI. Perfect for testing!

## Tests

```bash
npm test
```

I've got tests for the main components and validation logic. Coverage isn't 100% but the critical stuff is covered.

## Privacy Stuff

Your messages get sent to Claude AI when you analyze them, so don't paste actual passwords or credit card numbers. The analysis history is saved only in your browser - I don't have a database or server tracking anything.

## What It Can't Do

Just being real here:
- It can't actually visit links to check if they're malicious
- It can't verify who really sent the message
- It's not perfect - AI can miss things or get it wrong sometimes
- It only looks at text, can't analyze images or attachments

Use this as a helpful second opinion, not as the final word.

## Future Ideas

If I keep working on this, I'd like to add:
- Actual URL reputation checking (VirusTotal API)
- Image/screenshot analysis
- Email header verification
- Maybe a browser extension

## License

MIT - feel free to use it however you want

---

**Important**: This tool helps spot warning signs, but always verify suspicious stuff through official channels. When in doubt, don't click!
