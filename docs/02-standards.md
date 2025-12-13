# Project Standards

> **Last Updated**: December 13, 2025

This document defines the code standards, linting rules, formatting guidelines, and naming conventions for this project.

## Overview

This project uses **BiomeJS** as the primary toolchain for linting, formatting, and code quality enforcement. BiomeJS is a fast, modern alternative to ESLint and Prettier.

## Table of Contents

- [Tooling](#tooling)
- [Linting Rules](#linting-rules)
- [Formatting Guidelines](#formatting-guidelines)
- [Naming Conventions](#naming-conventions)
- [Git Hooks](#git-hooks)
- [Available Commands](#available-commands)
- [Troubleshooting](#troubleshooting)

## Tooling

### BiomeJS

- **Version**: 2.3.8+
- **Configuration File**: `biome.json`
- **What it does**: Linting, formatting, and code quality checks

### Lefthook

- **Configuration File**: `lefthook.yml`
- **What it does**: Manages Git hooks for automated quality checks

## Linting Rules

BiomeJS linter is configured with multiple rule groups and custom rules.

### Active Rule Groups

| Group                    | Description                                          |
| ------------------------ | ---------------------------------------------------- |
| **Recommended**          | All BiomeJS recommended rules (enabled by default)   |
| **Accessibility (a11y)** | Ensures accessibility compliance                     |
| **Nursery**              | Experimental rules (includes Tailwind class sorting) |
| **Style**                | Enforces consistent code style                       |

### Key Custom Rules

#### 1. No Relative Parent Imports (Error)

**Rule**: `style/noRestrictedImports`

**What it means**: You cannot use `../` in import statements. All imports must use absolute paths from the `src` directory.

**Examples**:

```typescript
// ❌ WRONG - Relative import
import { helper } from '../../../shared/utils/helper'
import { Button } from '../../components/button'

// ✅ CORRECT - Absolute import
import { helper } from 'src/shared/utils/helper'
import { Button } from 'src/components/button'
```

#### 2. Naming Convention Enforcement (Warning)

**Rule**: `style/useNamingConvention`

**What it means**: Code must follow specific naming patterns:

| Element             | Pattern    | Example                           |
| ------------------- | ---------- | --------------------------------- |
| React Components    | PascalCase | `UserProfile`, `HeaderNav`        |
| Types/Interfaces    | PascalCase | `ApiResponse`, `UserData`         |
| Functions/Variables | camelCase  | `getUserData`, `userName`         |
| Constants           | UPPER_CASE | `MAX_RETRY_COUNT`, `API_URL`      |
| Files               | kebab-case | `user-profile.tsx`, `api.util.ts` |

#### 3. Auto-Sort Tailwind Classes

**Rule**: `nursery/useSortedClasses`

**What it means**: Tailwind CSS classes are automatically sorted in a consistent order.

**Example**:

```typescript
// Before
<div className="p-4 mt-2 bg-blue-500 text-white hover:bg-blue-600">

// After (auto-sorted)
<div className="mt-2 bg-blue-500 p-4 text-white hover:bg-blue-600">
```

#### 4. Valid ARIA Roles

**Rule**: `a11y/useValidAriaRole`

**What it means**: Ensures ARIA roles are valid (ignores non-DOM elements).

### What Gets Linted

**Included**:

- All files in `src/**/*`
- `vite.config.ts`

**Excluded**:

- Files matching `**/*.gen.*` (generated files)

**Supported Languages**:

- JavaScript/TypeScript
- JSX/TSX
- CSS (with Tailwind)
- JSON

## Formatting Guidelines

BiomeJS formatter is enabled with the following settings:

| Setting          | Value              |
| ---------------- | ------------------ |
| **Indent Style** | Spaces             |
| **Indent Size**  | 2 spaces           |
| **Line Width**   | 120 characters max |

**Example**:

```typescript
// Formatted to stay within 120 characters
function processUserData(
  userId: string,
  userName: string,
  userEmail: string,
  userRole: string
): UserProfile {
  return { userId, userName, userEmail, userRole }
}
```

## Naming Conventions

### File Naming

| File Type  | Pattern          | Example                  |
| ---------- | ---------------- | ------------------------ |
| Components | `kebab-case.tsx` | `user-profile.tsx`       |
| Utilities  | `name.util.ts`   | `array.util.ts`          |
| Types      | `name.type.ts`   | `user.type.ts`           |
| Routes     | Convention-based | `page.tsx`, `layout.tsx` |

### Code Naming

**Components & Types (PascalCase)**:

```typescript
// Components
export function UserProfile() { }
export function NavigationMenu() { }

// Types
type ApiResponse = { }
interface UserData { }
```

**Functions & Variables (camelCase)**:

```typescript
function getUserData() { }
const userName = 'John'
let isLoading = false
```

**Constants (UPPER_CASE)**:

```typescript
const MAX_RETRY_COUNT = 3
const API_BASE_URL = 'https://api.example.com'
const DEFAULT_TIMEOUT = 5000
```

## Git Hooks

Git hooks automatically run quality checks at specific points in your workflow.

### Pre-Commit Hook

**When**: Before each commit  
**Runs**:

1. Lint check on staged files
2. TypeScript type check

**Commands**:

```bash
pnpm check:lint --file {staged_files}
pnpm check:type
```

### Pre-Push Hook

**When**: Before each push  
**Runs**:

1. Lint check on entire codebase
2. TypeScript type check

**Commands**:

```bash
pnpm check:lint
pnpm check:type
```

### Bypassing Hooks (Use Sparingly)

```bash
# Skip pre-commit
git commit --no-verify

# Skip pre-push
git push --no-verify
```

## Available Commands

### Linting

```bash
# Check for lint errors
pnpm check:lint

# Fix auto-fixable errors (safe fixes only)
pnpm check:lint --write

# Fix all errors including unsafe fixes
pnpm check:lint --write --unsafe
```

### Type Checking

```bash
# Run TypeScript type checker
pnpm check:type
```

### Formatting

```bash
# Check if files are formatted correctly
pnpm biome format

# Format all files
pnpm biome format --write
```

### Combined Checks

```bash
# Run lint + format + type checks
pnpm biome check

# Run all checks and apply safe fixes
pnpm biome check --write
```

## Understanding BiomeJS Output

### Severity Levels

| Level   | Icon | Meaning            | Blocks CI? |
| ------- | ---- | ------------------ | ---------- |
| Error   | 🔴    | Must be fixed      | Yes        |
| Warning | 🟡    | Should be fixed    | No         |
| Info    | 🔵    | Informational only | No         |

### Fix Types

**Safe Fixes** ✅:

- Won't change code behavior
- Applied automatically with `--write`
- Safe to apply on save

**Unsafe Fixes** ⚠️:

- May change code behavior
- Requires manual review
- Applied with `--write --unsafe`

**Example**:

```typescript
// Unsafe fix: Renaming unused variables
function example() {
  const unused = 5  // BiomeJS suggests: const _unused = 5
}
```

## Suppressing Rules

Sometimes you need to disable a rule for specific code.

### Single Line

```typescript
// biome-ignore lint/suspicious/noExplicitAny: Using third-party library types
function process(data: any) {
  // ...
}
```

### Entire File

```typescript
/* biome-ignore-file lint/suspicious/noExplicitAny */
```

### Code Block

```typescript
/* biome-ignore lint/suspicious/noConsoleLog */
console.log('Debug information')
console.log('More debug info')
```

**Best Practice**: Always include a reason when suppressing rules.

## Best Practices

1. ✅ **Let Git hooks work** - They catch errors before they reach the repository
2. ✅ **Fix errors immediately** - Don't accumulate technical debt
3. ✅ **Use absolute imports** - Always import from `src/`, never use `../`
4. ✅ **Review unsafe fixes** - Don't apply without understanding the change
5. ✅ **Follow naming conventions** - Consistency improves readability
6. ✅ **Keep lines under 120 characters** - Easier to read and review
7. ✅ **Let BiomeJS organize imports** - Don't manually sort them
8. ✅ **Enable editor integration** - Format and fix on save

## Troubleshooting

### Error: "Relative imports are not allowed"

**Problem**: You used `../` in an import.

**Solution**: Change to absolute import from `src/`:

```typescript
// ❌ Before
import { helper } from '../../../shared/utils/helper'

// ✅ After
import { helper } from 'src/shared/utils/helper'
```

### Warning: Naming Convention Violations

**Problem**: Names don't match the required pattern.

**Fix the naming**:

```typescript
// ❌ Wrong
const UserName = 'John'           // Should be camelCase
function GetUserData() { }        // Should be camelCase
const max_retry = 3               // Should be UPPER_CASE

// ✅ Correct
const userName = 'John'
function getUserData() { }
const MAX_RETRY_COUNT = 3
```

### Git Hook Failures

**Problem**: Commit or push is blocked by failing checks.

**Solution**:

1. **Run auto-fix**:

   ```bash
   pnpm check:lint --write
   ```

2. **Fix remaining errors manually** (check the output)

3. **Verify types**:

   ```bash
   pnpm check:type
   ```

4. **Try committing/pushing again**

### BiomeJS Not Working in Editor

**Problem**: Editor doesn't format or show errors.

**Solution**:

1. Verify BiomeJS extension is installed
2. Check `.vscode/settings.json` has correct configuration
3. Restart VS Code
4. Check the Output panel (select "Biome" from dropdown)

## Additional Resources

- [BiomeJS Documentation](https://biomejs.dev/)
- [BiomeJS Linter Rules Reference](https://biomejs.dev/linter/rules/)
- [BiomeJS Configuration Guide](https://biomejs.dev/reference/configuration/)
- [Lefthook Documentation](https://github.com/evilmartians/lefthook)
