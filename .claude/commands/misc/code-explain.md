---
model: claude-sonnet-4-5
description: Generate detailed code explanations for Next.js/React/TypeScript code
---

Analyze and explain the following code: $ARGUMENTS

## Explanation Format

### 1. Architecture Context
- Which part of the project does this belong to? (page, component, data, hook, type)
- Is it a server or client component?
- What role does it play in the routing/data flow?

### 2. High-Level Purpose
One paragraph explaining what this code does and why it exists.

### 3. Step-by-Step Breakdown
Walk through the code section by section, explaining:
- What each block does
- Why it's written this way
- How it connects to other parts of the codebase

### 4. Patterns Used
Identify and explain patterns:
- Server/client split
- `generateMetadata()` / `generateStaticParams()`
- Framer Motion animation patterns
- Tailwind + CSS custom property theming
- Data helper function usage

### 5. Key Takeaways
- What's most important to understand
- Common pitfalls to avoid
- How to extend or modify this code
