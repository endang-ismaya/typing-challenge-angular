# Angular 10 → 19 Upgrade Design

**Date:** 2026-04-21
**Status:** Approved

## Overview

Upgrade the Angular Typing Challenge application from Angular 10 to Angular 19 to resolve security vulnerabilities and enable Node.js 22 compatibility.

## Motivation

- **Security:** 40+ known vulnerabilities in transitive dependencies (Critical: 8, High: 22+, Moderate: 15+)
- **Node.js compatibility:** Angular 10 uses webpack 4.x which fails on Node 17+ due to OpenSSL crypto changes
- **EOL:** Angular 10 reached end-of-life in May 2021

## Design Decisions

| Aspect | Decision | Rationale |
|--------|----------|-----------|
| Angular Version | 19.x (latest stable) | Current LTS, Node 22 compatible, modern defaults |
| Architecture | Standalone components | Simpler, faster builds, better tree-shaking, Angular's future direction |
| Testing (Unit) | Jest | Modern, faster, better debugging than Karma/Jasmine |
| Testing (E2E) | Playwright | Protractor deprecated, Playwright has excellent tooling |
| Linting | ESLint (@angular-eslint) | TSLint deprecated since 2019 |
| Random Text | @faker-js/faker | Official replacement for deprecated faker package |
| Approach | Fresh scaffold + migrate code | Cleanest outcome, avoids 9-step migration complexity |

## Architecture

### Project Structure

```
src/
  app/
    app.component.ts      (standalone)
    app.component.html
    app.component.css
    app.component.spec.ts
  main.ts                 (bootstrapApplication)
  index.html
  styles.css
  assets/
```

### Bootstrap

Modern standalone bootstrap in `main.ts`:

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideBrowserGlobalEventListeners } from '@angular/platform-browser';

bootstrapApplication(AppComponent, {
  providers: [provideBrowserGlobalEventListeners()]
});
```

### Component Migration

**AppComponent changes:**

- Add `standalone: true` to component decorator
- Replace `faker` import with `@faker-js/faker`
- Template logic unchanged (no breaking changes for this simple template)
- Input handling: use typed event properly for Angular 19 strict typing

**faker replacement:**

```typescript
// Before (deprecated)
import { lorem } from 'faker';
lorem.sentence();

// After (modern)
import { faker } from '@faker-js/faker';
faker.lorem.sentence();
```

## Testing Configuration

### Unit Tests (Jest)

- Replace Karma/Jasmine with Jest
- Use `jest-preset-angular` for Angular testing support
- Configuration in `jest.config.ts`
- Remove `test.ts`, `karma.conf.js`

### E2E Tests (Playwright)

- Remove Protractor entirely
- Add `@playwright/test`
- New test file: `e2e/app.spec.ts`
- Remove `e2e/protractor.conf.js` and old `e2e/` directory

### Linting

- Remove TSLint (deprecated)
- Add ESLint with `@angular-eslint/schematics`
- Configuration in `.eslintrc.json`

## Dependencies

### Key Changes

| Package | Before | After |
|---------|--------|-------|
| @angular/core | ~10.0.2 | ~19.x |
| @angular/cli | ~10.0.1 | ~19.x |
| @faker-js/faker | (none) | ^9.x |
| faker | ^4.1.0 | **removed** |
| typescript | ~3.9.5 | ~5.6 |
| rxjs | ~6.5.5 | ~7.8 |
| zone.js | ~0.10.3 | ~0.15 |
| bulma | ^0.9.0 | ^0.9.0 (unchanged) |

### Removed Dependencies

- All Karma/Jasmine packages
- Protractor
- TSLint, codelyzer
- All transitive vulnerable packages (node-forge, lodash, xmlhttprequest-ssl, eventsource, etc.)

## Build System

- Angular 19 uses esbuild + Vite (faster builds)
- `angular.json` simplified configuration
- Remove `polyfills.ts` (polyfills handled differently)

## Files to Remove

- `src/app/app.module.ts` - NgModule no longer needed
- `src/polyfills.ts` - not required in modern Angular
- `src/test.ts` - replaced by Jest
- `karma.conf.js` - replaced by Jest
- `e2e/protractor.conf.js` - replaced by Playwright
- `e2e/tsconfig.json` - old e2e config
- `tslint.json` - replaced by ESLint

## Success Criteria

1. Build succeeds on Node.js v22
2. Unit tests pass (Jest)
3. E2E tests pass (Playwright)
4. Application runs and typing challenge functionality works
5. No security vulnerabilities in direct dependencies
6. ESLint runs without errors

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Template syntax changes | Minimal template complexity, unlikely to break |
| faker API differences | @faker-js/faker maintains same API |
| Bulma CSS compatibility | External CSS, no Angular coupling |
| Jest test syntax | Simple component, straightforward test migration |

## Implementation Phases

1. Scaffold new Angular 19 project
2. Migrate component code
3. Configure testing (Jest + Playwright)
4. Configure linting (ESLint)
5. Remove legacy files
6. Verify build and tests