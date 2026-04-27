# PROJECT KNOWLEDGE BASE

**Generated:** 2026-04-27
**Commit:** N/A (not a git repo)
**Branch:** N/A

## OVERVIEW

React 18 + TypeScript Storybook demo showcasing data-loading patterns with race condition protection. Storybook 10 (alpha) setup with network simulation via `fetch-network-simulator`.

## STRUCTURE

```
loading-example/
├── .storybook/          # Storybook configuration (main.ts, preview.ts)
├── src/                 # Example components demonstrating loading patterns
│   ├── *.stories.tsx   # Story definitions
│   └── *.tsx           # Pattern implementations
├── package.json         # Storybook scripts, React 18, TS 5.6
└── tsconfig.json        # Strict TS config, bundler module resolution
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Add loading pattern | `src/PatternName.tsx` | Follow existing pattern structure |
| Create new story | `src/PatternName.stories.tsx` | Import component, define render + metadata |
| Configure Storybook | `.storybook/main.ts`, `.storybook/preview.ts` | main.ts: webpack/TS config; preview.ts: network simulator |
| Modify types | `src/types.ts` | Shared `Item`, `ItemDetails`, `ITEMS`, `fetchItemDetails` |
| Update dependencies | `package.json` | Storybook 10.x, React 18, TypeScript 5.6 |
| Change TS config | `tsconfig.json` | `moduleResolution: "bundler"`, `noEmit: true` |

## CONVENTIONS

**TypeScript:**
- `strict: true`, `noEmit: true` (type-check only, bundler handles emit)
- `moduleResolution: "bundler"` (required for Storybook 10)
- `jsx: "react-jsx"` (React 18 automatic JSX runtime)

**Storybook:**
- Stories path: `../src/**/*.stories.@(ts|tsx)`
- Network simulation via `fetch-network-simulator` in preview.ts
- Global toolbar: `networkScenario` ('normal' | 'race-demo')
- Story naming: numbered pattern (e.g., "1. Naive (race condition)")

**Component patterns:**
- Each pattern = standalone TSX component demonstrating single loading strategy
- Patterns exported as named exports (e.g., `export const NaiveRaceConditionExample`)
- Stories import patterns directly from sibling files

## ANTI-PATTERNS (THIS PROJECT)

- **DO NOT** use naive fetch without race condition protection (see `NaiveRaceConditionExample.tsx` for anti-pattern demo)
- **DO NOT** modify Storybook config without testing both network scenarios
- **DO NOT** add dependencies without verifying Storybook 10 compatibility
- **AVOID** flat structure for larger projects—this demo is intentionally flat for simplicity

## UNIQUE STYLES

- **Network scenario testing:** Global Storybook toolbar switches between 'normal' and 'race-demo' network conditions
- **Pattern-by-example:** Each loading strategy is a separate component (not a reusable hook/library)
- **Russian documentation:** README.md and comments use Russian + English mix
- **No traditional tests:** Storybook stories serve as visual test suite (no Jest/Vitest)

## COMMANDS

```bash
# Start Storybook dev server (port 6006)
npm run storybook

# Build static Storybook
npm run build-storybook

# Type-check only (no emit)
npx tsc --noEmit
```

## NOTES

- **Storybook 10 migration:** Project prepared for Storybook 10 (see `STORYBOOK_10_MIGRATION.md`), but currently on 8.6.18. Wait for stable 10.x release before upgrading.
- **No app entry point:** This is Storybook-only demo—no `src/index.tsx` or `App.tsx`.
- **Network simulator:** `fetch-network-simulator` provides configurable latency, packet loss, retry logic for race condition demos.
- **Flat structure:** All examples in `src/` root—intentional for demo, but consider `src/components/` for larger projects.
- **No ESLint/Prettier:** Linting/formatting not configured at root level.
