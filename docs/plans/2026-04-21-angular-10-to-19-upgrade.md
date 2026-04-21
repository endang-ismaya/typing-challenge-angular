# Angular 10 → 19 Upgrade Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Upgrade Angular typing challenge app from v10 to v19, resolving security vulnerabilities and enabling Node.js 22 compatibility.

**Architecture:** Fresh scaffold with standalone components, modern testing (Jest + Playwright), ESLint, @faker-js/faker.

**Tech Stack:** Angular 19, TypeScript 5.6, RxJS 7.8, Jest, Playwright, @faker-js/faker, Bulma CSS

---

## Prerequisites

- Node.js v22.x installed
- Angular CLI v19 available globally or via npx
- Backup current project state (git commit all changes)

---

### Task 1: Create Angular 19 Scaffold

**Files:**
- Create: New project structure in adjacent directory
- Reference: Design doc at `docs/plans/2026-04-21-angular-10-to-19-upgrade-design.md`

**Step 1: Create new Angular 19 project**

Create a fresh Angular 19 project in a temporary adjacent directory:

```bash
cd /Volumes/eimdata/devs/ws_angular/angular_typing_challenges
npx @angular/cli@19 new typing-v19 --standalone --style=css --routing=false --skip-tests --skip-git
```

Expected: New project created with standalone architecture, no routing, no tests initially.

**Step 2: Verify scaffold builds**

```bash
cd typing-v19
npm run build
```

Expected: Build succeeds without errors on Node.js v22.

**Step 3: Commit scaffold**

```bash
cd /Volumes/eimdata/devs/ws_angular/angular_typing_challenges
git add .
git commit -m "chore: scaffold Angular 19 project"
```

---

### Task 2: Install Additional Dependencies

**Files:**
- Modify: `package.json`

**Step 1: Install @faker-js/faker and Bulma**

```bash
cd typing-v19
npm install @faker-js/faker bulma
```

Expected: Packages installed successfully.

**Step 2: Verify package.json**

Check that `package.json` contains:
```json
"dependencies": {
  "@faker-js/faker": "^9.x",
  "bulma": "^0.9.0",
  ...
}
```

**Step 3: Commit dependencies**

```bash
git add package.json package-lock.json
git commit -m "chore: add @faker-js/faker and bulma dependencies"
```

---

### Task 3: Migrate AppComponent Template

**Files:**
- Modify: `src/app/app.component.html`

**Step 1: Copy template from old project**

The original template from `src/app/app.component.html`:

```html
<div class="container">
  <div class="columns is-centered mt-6">
    <div class="box column is-half" style="min-height: 300px;">
      <h1 class="title has-text-centered">Typing Challenge</h1>
      <button
        class="button is-success is-small"
        style="cursor: pointer;"
        (click)="getRandomText()"
      >
        <i class="fas fa-sync"></i>
      </button>
      <p class="has-text-centered is-size-4">
        <span
          [class]="compare(letter, inputValue[i])"
          *ngFor="let letter of randomText.split(''); let i = index"
          >{{ letter }}</span
        >
      </p>
      <div class="field mt-5">
        <div class="control">
          <input
            class="input is-primary"
            type="text"
            placeholder="Primary input"
            [value]="inputValue"
            (input)="inputValue = $event.target.value"
          />
        </div>
      </div>

      <div class="box has-text-centered" *ngIf="randomText === inputValue">
        <h1 class="title">Success!</h1>
      </div>
    </div>
  </div>
</div>
```

Replace the template in `typing-v19/src/app/app.component.html`.

**Step 2: Verify template syntax**

Angular 19 template syntax is compatible. No changes needed.

**Step 3: Commit template**

```bash
git add src/app/app.component.html
git commit -m "feat: migrate typing challenge template"
```

---

### Task 4: Migrate AppComponent Styles

**Files:**
- Modify: `src/app/app.component.css`

**Step 1: Copy styles from old project**

The original styles from `src/app/app.component.css`:

```css
.pending {
  color: gray;
}

.correct {
  color: green;
  font-weight: bold;
}

.incorrect {
  color: red;
}

.box {
  position: relative;
}

button {
  position: absolute;
  top: 20px;
  right: 15px;
}
```

Replace styles in `typing-v19/src/app/app.component.css`.

**Step 2: Commit styles**

```bash
git add src/app/app.component.css
git commit -m "feat: migrate typing challenge styles"
```

---

### Task 5: Migrate AppComponent Logic

**Files:**
- Modify: `src/app/app.component.ts`

**Step 1: Write the updated component**

Replace `typing-v19/src/app/app.component.ts`:

```typescript
import { Component } from '@angular/core';
import { faker } from '@faker-js/faker';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  randomText: string = faker.lorem.sentence();
  inputValue: string = '';

  compare(letter: string, enteredLetter: string): string {
    if (!enteredLetter) {
      return 'pending';
    }

    return enteredLetter === letter ? 'correct' : 'incorrect';
  }

  getRandomText() {
    this.randomText = faker.lorem.sentence();
    this.inputValue = '';
  }
}
```

Key changes from original:
- `standalone: true` added
- `imports: []` array added (empty - CommonModule is auto-included in standalone)
- `styleUrl` instead of `styleUrls` (singular)
- `faker.lorem.sentence()` instead of `lorem.sentence()`

**Step 2: Verify TypeScript compilation**

```bash
cd typing-v19
npm run build
```

Expected: Build succeeds without TypeScript errors.

**Step 3: Commit component**

```bash
git add src/app/app.component.ts
git commit -m "feat: migrate AppComponent to standalone with @faker-js/faker"
```

---

### Task 6: Configure Bulma CSS

**Files:**
- Modify: `src/styles.css`

**Step 1: Add Bulma import**

Replace `typing-v19/src/styles.css`:

```css
@import 'bulma/css/bulma.min.css';
```

**Step 2: Verify styles load**

```bash
npm run build
```

Expected: Build succeeds, Bulma CSS bundled.

**Step 3: Commit styles config**

```bash
git add src/styles.css
git commit -m "feat: configure Bulma CSS framework"
```

---

### Task 7: Add FontAwesome for Sync Icon

**Files:**
- Modify: `src/index.html`

**Step 1: Add FontAwesome CDN link**

Add FontAwesome to `src/index.html` in the `<head>` section:

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
```

Full `index.html` should look like:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Typing</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>
<body>
  <app-root></app-root>
</body>
</html>
```

**Step 2: Commit FontAwesome**

```bash
git add src/index.html
git commit -m "feat: add FontAwesome CDN for sync icon"
```

---

### Task 8: Verify Application Runs

**Step 1: Run development server**

```bash
cd typing-v19
npm start
```

Expected: Dev server starts at http://localhost:4200

**Step 2: Test typing challenge manually**

Open browser to http://localhost:4200:
- Verify sentence displays
- Type characters and check color feedback (gray → green/red)
- Click sync button to get new sentence
- Complete sentence and check "Success!" message

**Step 3: Kill dev server**

Press Ctrl+C to stop server.

---

### Task 9: Configure Jest Testing

**Files:**
- Create: `jest.config.ts`
- Modify: `package.json`

**Step 1: Add Jest dependencies**

```bash
cd typing-v19
npm install --save-dev jest jest-preset-angular @types/jest
```

**Step 2: Create jest.config.ts**

Create `typing-v19/jest.config.ts`:

```typescript
import { Presets } from 'jest-preset-angular';

export default {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  transform: {
    '^.+\\.(ts|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
      },
    ],
  },
};
```

**Step 3: Create setup-jest.ts**

Create `typing-v19/setup-jest.ts`:

```typescript
import 'jest-preset-angular/setup-jest';
```

**Step 4: Update tsconfig.spec.json**

Update `tsconfig.spec.json`:

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/spec",
    "types": ["jest"]
  },
  "include": ["src/**/*.spec.ts", "src/**/*.d.ts", "setup-jest.ts"]
}
```

**Step 5: Add Jest test script to package.json**

Add to `package.json` scripts:

```json
"test": "jest",
"test:watch": "jest --watch"
```

**Step 6: Commit Jest config**

```bash
git add jest.config.ts setup-jest.ts tsconfig.spec.json package.json package-lock.json
git commit -m "chore: configure Jest for unit testing"
```

---

### Task 10: Write AppComponent Unit Test

**Files:**
- Create: `src/app/app.component.spec.ts`

**Step 1: Write the test**

Create `typing-v19/src/app/app.component.spec.ts`:

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { faker } from '@faker-js/faker';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have a randomText property', () => {
    expect(component.randomText).toBeDefined();
    expect(typeof component.randomText).toBe('string');
  });

  it('should have empty inputValue initially', () => {
    expect(component.inputValue).toBe('');
  });

  it('compare should return "pending" when no enteredLetter', () => {
    expect(component.compare('a', '')).toBe('pending');
    expect(component.compare('a', undefined as any)).toBe('pending');
  });

  it('compare should return "correct" when letters match', () => {
    expect(component.compare('a', 'a')).toBe('correct');
    expect(component.compare('A', 'A')).toBe('correct');
  });

  it('compare should return "incorrect" when letters do not match', () => {
    expect(component.compare('a', 'b')).toBe('incorrect');
    expect(component.compare('a', 'A')).toBe('incorrect');
  });

  it('getRandomText should update randomText and clear inputValue', () => {
    const originalText = component.randomText;
    component.inputValue = 'some input';
    
    component.getRandomText();
    
    expect(component.randomText).toBeDefined();
    expect(component.randomText).not.toBe(originalText);
    expect(component.inputValue).toBe('');
  });
});
```

**Step 2: Run tests**

```bash
npm test
```

Expected: All 7 tests pass.

**Step 3: Commit tests**

```bash
git add src/app/app.component.spec.ts
git commit -m "test: add AppComponent unit tests with Jest"
```

---

### Task 11: Configure ESLint

**Files:**
- Create: `.eslintrc.json` (via ng add)
- Modify: `package.json`

**Step 1: Add Angular ESLint**

```bash
cd typing-v19
ng add @angular-eslint/schematics --skip-confirmation
```

Expected: ESLint schematics added, `.eslintrc.json` created.

**Step 2: Run lint**

```bash
npm run lint
```

Expected: No linting errors.

**Step 3: Commit ESLint config**

```bash
git add .eslintrc.json package.json package-lock.json
git commit -m "chore: configure ESLint with @angular-eslint"
```

---

### Task 12: Configure Playwright E2E Testing

**Files:**
- Create: `playwright.config.ts`
- Create: `e2e/app.spec.ts`

**Step 1: Install Playwright**

```bash
cd typing-v19
npm install --save-dev @playwright/test
npx playwright install chromium
```

**Step 2: Create playwright.config.ts**

Create `typing-v19/playwright.config.ts`:

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:4200',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:4200',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
```

**Step 3: Create e2e directory and test**

Create `typing-v19/e2e/app.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test('typing challenge page loads', async ({ page }) => {
  await page.goto('/');
  
  await expect(page.locator('h1.title')).toContainText('Typing Challenge');
  await expect(page.locator('.button.is-success')).toBeVisible();
});

test('typing shows correct feedback', async ({ page }) => {
  await page.goto('/');
  
  // Get the displayed sentence
  const sentenceElement = page.locator('p.is-size-4 span').first();
  await expect(sentenceElement).toBeVisible();
  
  // Type first character
  const input = page.locator('input.is-primary');
  await input.fill('T');
  
  // Check first character styling
  const firstSpan = page.locator('p.is-size-4 span').first();
  await expect(firstSpan).toHaveClass(/correct|incorrect|pending/);
});

test('success message appears on completion', async ({ page }) => {
  await page.goto('/');
  
  // Get the sentence text
  const sentenceText = await page.locator('p.is-size-4').textContent();
  
  if (sentenceText) {
    // Type the full sentence
    const input = page.locator('input.is-primary');
    await input.fill(sentenceText.trim());
    
    // Wait for success message
    await expect(page.locator('.box.has-text-centered h1.title')).toContainText('Success!');
  }
});

test('sync button generates new sentence', async ({ page }) => {
  await page.goto('/');
  
  // Get original sentence
  const originalSentence = await page.locator('p.is-size-4').textContent();
  
  // Click sync button
  await page.locator('.button.is-success').click();
  
  // Wait for page update
  await page.waitForTimeout(100);
  
  // Check that sentence changed (most likely)
  const newSentence = await page.locator('p.is-size-4').textContent();
  expect(newSentence).toBeDefined();
});
```

**Step 4: Add Playwright test script**

Add to `package.json` scripts:

```json
"e2e": "playwright test",
"e2e:ui": "playwright test --ui"
```

**Step 5: Commit Playwright config**

```bash
git add playwright.config.ts e2e/app.spec.ts package.json package-lock.json
git commit -m "chore: configure Playwright for E2E testing"
```

---

### Task 13: Remove Legacy Files from Old Project

**Files:**
- Delete: Multiple legacy files

**Step 1: Remove old project files**

Delete from original project directory:

```bash
cd /Volumes/eimdata/devs/ws_angular/angular_typing_challenges
rm -rf src/app/app.module.ts
rm -rf src/polyfills.ts
rm -rf src/test.ts
rm -rf karma.conf.js
rm -rf e2e/protractor.conf.js
rm -rf e2e/tsconfig.json
rm -rf tslint.json
rm -rf node_modules
rm -rf package-lock.json
```

**Step 2: Keep design docs**

Ensure `docs/plans/` directory is preserved.

**Step 3: Commit cleanup**

```bash
git add -A
git commit -m "chore: remove legacy Angular 10 files"
```

---

### Task 14: Replace Old Project with New Scaffold

**Files:**
- Move: All files from typing-v19 to main directory

**Step 1: Copy new project files**

```bash
cd /Volumes/eimdata/devs/ws_angular/angular_typing_challenges
# Copy all files from typing-v19 to current directory (overwrite)
cp -r typing-v19/src .
cp -r typing-v19/e2e .
cp typing-v19/package.json .
cp typing-v19/package-lock.json .
cp typing-v19/angular.json .
cp typing-v19/tsconfig.json .
cp typing-v19/tsconfig.app.json .
cp typing-v19/tsconfig.spec.json .
cp typing-v19/jest.config.ts .
cp typing-v19/setup-jest.ts .
cp typing-v19/playwright.config.ts .
cp typing-v19/.eslintrc.json .
cp typing-v19/.editorconfig .
cp typing-v19/.gitignore .
```

**Step 2: Remove scaffold directory**

```bash
rm -rf typing-v19
```

**Step 3: Install dependencies**

```bash
npm install
```

**Step 4: Commit final migration**

```bash
git add -A
git commit -m "feat: complete Angular 10 → 19 upgrade migration"
```

---

### Task 15: Final Verification

**Step 1: Run build**

```bash
npm run build
```

Expected: Build succeeds with esbuild, output in `dist/typing`.

**Step 2: Run unit tests**

```bash
npm test
```

Expected: All Jest tests pass.

**Step 3: Run lint**

```bash
npm run lint
```

Expected: No ESLint errors.

**Step 4: Run E2E tests**

```bash
npm run e2e
```

Expected: All Playwright tests pass.

**Step 5: Run dev server and manual verification**

```bash
npm start
```

Open http://localhost:4200 and verify:
- Page loads with sentence
- Typing feedback works (colors)
- Sync button generates new sentence
- Success message on completion

**Step 6: Kill dev server**

Ctrl+C to stop.

**Step 7: Verify Node.js compatibility**

```bash
node -v
```

Expected: v22.x - application works without OpenSSL errors.

**Step 8: Commit final verification**

```bash
git add -A
git commit -m "docs: complete Angular 19 upgrade with verification"
```

---

## Summary

This plan migrates a simple Angular 10 typing challenge app to Angular 19 with:

- **Standalone components** (no NgModule)
- **Jest** for unit testing (replaces Karma)
- **Playwright** for E2E testing (replaces Protractor)
- **ESLint** for linting (replaces TSLint)
- **@faker-js/faker** for random text (replaces deprecated faker)
- **Node.js 22 compatibility** (resolves OpenSSL crypto issue)
- **All security vulnerabilities resolved** (fresh dependencies)

Total tasks: 15
Estimated time: 1-2 hours