# Deployment Checklist

Complete this checklist before deploying to production.

## Pre-Deployment

- [ ] **Production build succeeds**
  ```bash
  npm run build
  ```
  Expected: "Compiled successfully" with no errors

- [ ] **All tests pass**
  ```bash
  npm run test
  ```
  Expected: All tests green

- [ ] **Test coverage meets minimum (50%)**
  ```bash
  npm run test:coverage
  ```
  Expected: Lines ≥50%, Functions ≥50%, Branches ≥50%

- [ ] **Linting passes**
  ```bash
  npm run lint
  ```
  Expected: No errors or warnings

- [ ] **Environment variables configured**
  - [ ] `ANTHROPIC_API_KEY` set in production environment
  - [ ] `ANTHROPIC_MODEL` set (or uses default)
  - [ ] No secrets committed to Git

- [ ] **Code review completed**
  - [ ] PR reviewed by peer
  - [ ] No sensitive data in code
  - [ ] Security considerations addressed

## Feature Testing

- [ ] **Happy path works**
  - [ ] Can paste a message
  - [ ] Can select a source
  - [ ] Analysis completes successfully
  - [ ] Results display correctly

- [ ] **Sample messages work**
  - [ ] "Fake Bank Verification" loads and analyzes
  - [ ] "Suspicious Job Offer" analyzes correctly
  - [ ] "Delivery Scam" produces high-risk assessment
  - [ ] Normal message shows low risk

- [ ] **History feature works**
  - [ ] Analyses save to history
  - [ ] Can view history
  - [ ] Can delete individual items
  - [ ] Can clear all history

- [ ] **Error states verified**
  - [ ] Invalid input shows error message
  - [ ] API timeout shows retry button
  - [ ] Invalid AI response handled gracefully
  - [ ] Network error displays friendly message

## Accessibility Testing

- [ ] **Keyboard navigation**
  - [ ] Can tab through all interactive elements
  - [ ] Focus indicators are visible
  - [ ] Can submit form with Enter key
  - [ ] Can dismiss modals with Escape

- [ ] **Screen reader tested** (NVDA, JAWS, or VoiceOver)
  - [ ] Page title announced
  - [ ] Headings hierarchy correct
  - [ ] Form labels associated with inputs
  - [ ] Error messages announced
  - [ ] Live regions update announced

- [ ] **Color contrast**
  - [ ] Text meets WCAG AA (4.5:1 for normal text)
  - [ ] Risk badges have text + icon (not color alone)
  - [ ] Links distinguishable from surrounding text

- [ ] **Reduced motion**
  - [ ] Prefers reduced motion respected
  - [ ] No distracting animations
  - [ ] Content still accessible without animation

## Responsive Design

Test on actual devices or in DevTools device emulation:

- [ ] **Mobile (320px)**
  - [ ] Layout doesn't overflow horizontally
  - [ ] Touch targets are ≥44×44 px
  - [ ] Text is readable without zooming
  - [ ] Forms are usable

- [ ] **Mobile (375px)**
  - [ ] Common phone size works
  - [ ] Message input textarea is usable
  - [ ] Results stack vertically

- [ ] **Tablet (768px)**
  - [ ] Two-column layout works
  - [ ] Navigation is clear
  - [ ] No excessive whitespace

- [ ] **Desktop (1440px+)**
  - [ ] Maximum content width applied
  - [ ] Sidebar/panel layout optimal
  - [ ] All features visible

## Performance

- [ ] **Lighthouse audit (mobile)**
  ```bash
  npm run build && npm start
  # Open DevTools → Lighthouse → Analyze page load
  ```
  - [ ] Performance: ≥85 (aim for 90+)
  - [ ] Accessibility: ≥85 (aim for 95+)
  - [ ] Best Practices: ≥85
  - [ ] SEO: ≥85

- [ ] **Bundle size**
  - [ ] JavaScript bundle reasonable (<500kb gzipped)
  - [ ] No unnecessary dependencies
  - [ ] Code splitting applied

- [ ] **Initial load time**
  - [ ] Page interactive within 3 seconds on 4G
  - [ ] No unnecessary blocking scripts

## Security

- [ ] **No secrets exposed**
  - [ ] API key not in source code
  - [ ] `.env.local` in `.gitignore`
  - [ ] No secrets in build output
  - [ ] No secrets in logs

- [ ] **Input validation**
  - [ ] Messages validated client-side
  - [ ] Messages validated server-side
  - [ ] Max length enforced
  - [ ] Special characters handled safely

- [ ] **API response validation**
  - [ ] All responses validated against schema
  - [ ] Malformed responses rejected
  - [ ] No raw AI output rendered as HTML

- [ ] **Security headers**
  - [ ] X-Content-Type-Options: nosniff
  - [ ] X-Frame-Options: DENY
  - [ ] X-XSS-Protection enabled
  - [ ] Referrer-Policy configured

## Deployment Platform Setup (Vercel Example)

- [ ] **Project created on Vercel**
  - [ ] GitHub repository connected
  - [ ] Auto-deployments enabled for main branch

- [ ] **Environment variables added**
  - [ ] `ANTHROPIC_API_KEY` set in Vercel dashboard
  - [ ] `ANTHROPIC_MODEL` set (optional)
  - [ ] Variables not visible in public URLs

- [ ] **Domain configured**
  - [ ] Custom domain added if applicable
  - [ ] SSL certificate active
  - [ ] Redirects configured

- [ ] **Monitoring enabled**
  - [ ] Error tracking configured (Sentry, etc.) OR documented as limitation
  - [ ] Analytics enabled if desired

## Post-Deployment

- [ ] **Production URL live**
  - [ ] Website accessible from public URL
  - [ ] HTTPS working
  - [ ] No mixed content warnings

- [ ] **Live testing**
  - [ ] Can analyze message on production
  - [ ] History works on production
  - [ ] All pages load
  - [ ] No console errors

- [ ] **Smoke test on mobile**
  - [ ] Can access from phone
  - [ ] Can paste message on mobile
  - [ ] Analysis works on mobile

- [ ] **README updated**
  - [ ] Production URL added to README
  - [ ] Setup instructions accurate
  - [ ] Known limitations documented

- [ ] **Rollback plan ready**
  - [ ] Previous deployment identifiable
  - [ ] Rollback procedure tested
  - [ ] Team knows how to rollback

## Monitoring & Maintenance

- [ ] **Error logging**
  - [ ] Server errors logged safely (no sensitive data)
  - [ ] Client errors monitored
  - [ ] Alert mechanism defined

- [ ] **Uptime monitoring**
  - [ ] Health check configured
  - [ ] Alerts set up for downtime

- [ ] **Regular backups**
  - [ ] Code repository backed up (GitHub)
  - [ ] Environment variables documented securely

---

## Sign-Off

- **Deployed by**: _______________  
- **Date**: _______________  
- **Production URL**: _______________  
- **All checks completed**: _______________  
- **Rollback tested**: [ ] Yes [ ] No

---

## Rollback Procedure

**If critical issues found after deployment:**

### Option 1: Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Select "messageguard-ai" project
3. Go to "Deployments"
4. Find the previous stable deployment
5. Click "Redeploy"
6. Wait for deployment to complete
7. Verify production URL

### Option 2: Git Revert
1. Identify the commit hash: `git log --oneline`
2. Revert the problematic commit: `git revert <commit-hash>`
3. Push to main: `git push origin main`
4. Vercel auto-redeploys from main branch
5. Verify production URL

### Verification Steps After Rollback

- [ ] Production URL loads
- [ ] Sample messages analyze correctly
- [ ] No errors in console
- [ ] History works
- [ ] Mobile layout works
