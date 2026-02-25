---
description: Run ESLint and fix code quality issues
model: claude-sonnet-4-5
---

Run linting and fix issues in: $ARGUMENTS

## Steps

### 1. Run ESLint
```bash
npm run lint
```

### 2. Triage Issues by Priority

**High (fix immediately):**
- TypeScript errors (`any` types, missing types)
- Unused variables/imports
- React hooks rule violations
- Missing `key` props

**Medium (fix soon):**
- Import order inconsistencies
- Missing `alt` on images
- Accessibility warnings

**Low (fix when convenient):**
- Style preferences
- Naming suggestions

### 3. Auto-fix Where Possible
```bash
npx next lint --fix
```

### 4. Manual Fixes
For each remaining issue:
1. Identify the exact file and line
2. Apply the fix following project conventions
3. Verify fix doesn't break anything

### 5. Project-Specific Rules
- ESLint config: `eslint.config.mjs` (flat config, ESLint v9)
- Extends: `next/core-web-vitals`, `next/typescript`
- Path alias: `@/*` → `./src/*`
- TypeScript strict mode — no `any`

### 6. Verify
```bash
npm run build
```
Build must pass with no errors.
