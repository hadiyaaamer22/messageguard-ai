# Capstone Reflection: MessageGuard AI

## What Was Hardest?

**Balancing structured AI output with real-world complexity.**

The initial challenge was realizing that simply asking Claude to "analyze security" produces prose. Converting that into a strict, validated JSON structure required building a two-layer approach: a clear system prompt that tells Claude what to look for, then a Zod schema that ensures every response matches expectations.

The tricky part: maintaining that structure across different message types and threat categories without the response becoming generic or missing nuanced details. I had to iterate several times on the schema—initially including too many fields, then too few, before landing on a shape that captured the essential indicators (urgency, credentials, links, social-engineering) while remaining validatable.

**Accessibility as non-negotiable from the start.**

Building accessible components isn't an afterthought—it had to be core. This meant:
- Semantic HTML first (not divs everywhere)
- Keyboard navigation from day one, not added later
- Live regions for async updates
- Proper ARIA labels and roles

The tough part wasn't the individual features; it was resisting the temptation to ship "good enough" when accessibility meant more work. For example, making the collapsible risk indicators accessible meant ensuring keyboard users could expand/collapse each section and screen readers announced state changes.

## What Would I Do Differently Next Time?

**Set up E2E tests earlier.**

I implemented unit and component tests but didn't add end-to-end tests. Next time I'd add Playwright tests from the start, covering the happy path (paste message → analyze → see results → save to history). This would have caught integration issues earlier and given more confidence in the full flow.

**Design the error states before building the happy path.**

I focused on "everything works" first, then backfilled error handling. Instead, I'd design error flows upfront: What does API timeout look like? What if the AI response is invalid? What if the user is offline? Designing these first makes the core happy-path code simpler and more consistent.

**Consider storage capacity earlier.**

I implemented local history with a 20-item cap, but didn't think deeply about what happens when browser storage is full or corrupted. I added a `try/catch`, but a smarter approach would be: implement a storage abstraction layer early, version the stored data format, and test degradation scenarios.

## One Thing That Surprised Me

**How much clarity comes from saying what you won't do.**

The most useful part of the documentation wasn't listing features—it was documenting limitations: "We cannot verify sender identity," "We don't check external threat databases," "Text analysis only, no images."

This created trust. Users understood immediately what they were getting, and it shaped expectations. The "What We Cannot Do" section on the How It Works page probably mattered more than any feature explanation.

It also shaped the product design: knowing I *can't* check external databases meant I focused instead on making the *local* analysis transparent and explainable. That clarity led to better UX—showing evidence from the message, not a black-box score.

---

## Development Journey

**Week 1**: Figured out the core problem and scoped reasonably (no NLP libraries, no custom model fine-tuning—just Claude + schema).

**Week 2–3**: Built the UI, integrated Claude, validated responses, added error handling.

**Week 4**: Accessibility audit, tests, documentation, deployment.

The production-readiness requirement forced me to think beyond "does it work?" to "does it fail gracefully?" That's the real skill: not just building features, but building systems that don't lie when things go wrong.

## Key Learnings

1. **Schema validation is defensive programming.** It caught issues I never would have seen in manual testing.

2. **Accessibility isn't a feature; it's a requirement.** It also makes the product better for everyone (clearer text, better contrast, simpler navigation).

3. **Documentation is part of the product.** A clear README and deployment checklist made the project feel complete and deployable, not half-finished.

4. **Error states matter as much as happy paths.** Users will hit errors; how the app handles them builds trust.

5. **Smaller scope, better execution.** I didn't build a browser extension or PDF export or 50 scam categories. I built one thing well: analyzing unstructured messages into structured assessments.

---

**Final takeaway**: A production-ready capstone isn't about feature count—it's about intent, care, and honesty. MessageGuard works because it knows its limits and respects its users by being transparent about them.
