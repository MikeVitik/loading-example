# src/ - Loading Pattern Examples

**Scope:** Component demonstrations for data-loading patterns with race condition protection.

## STRUCTURE

```
src/
├── *.stories.tsx        # Story definitions (ItemDetails.stories.tsx)
├── *.tsx               # Pattern components (6 examples)
└── types.ts            # Shared types + mock data
```

## WHERE TO LOOK

| Task | File | Pattern |
|------|------|---------|
| Add new loading pattern | `src/NewPattern.tsx` + `src/NewPattern.stories.tsx` | Follow existing component structure |
| Modify shared types | `types.ts` | `Item`, `ItemDetails`, `ITEMS`, `fetchItemDetails` |
| Update story metadata | `ItemDetails.stories.tsx` | Story names, descriptions, network scenarios |

## COMPONENT PATTERNS

**All components:**
- Accept zero props (self-contained demos)
- Use `fetchItemDetails` from `types.ts`
- Implement single loading strategy
- Export as named export: `export const PatternName`

**Existing patterns:**
1. `NaiveRaceConditionExample` - Anti-pattern demo (no protection)
2. `RequestIdGuardExample` - Request ID counter guards
3. `AbortControllerExample` - HTTP request cancellation
4. `TransitionExample` - React 18 `useTransition` + guard
5. `DeferredValueExample` - `useDeferredValue` + guard
6. `DebounceExample` - Debounced selection + guard

## CONVENTIONS

**Component structure:**
```tsx
export const PatternName: React.FC = () => {
  // State setup
  // Effect with pattern logic
  // Render UI
}
```

**Story structure:**
```tsx
export const PatternName: Story = {
  name: 'N. Pattern Name',
  parameters: { networkScenario: 'race-demo' },
  render: () => <PatternName />,
}
```

**Network scenarios:**
- `'normal'` - 300ms latency, no packet loss (stable network)
- `'race-demo'` - 1500ms latency, 10% packet loss, stale responses (chaotic)

## ANTI-PATTERNS

- **DO NOT** add real API calls—use `fetchItemDetails` mock only
- **DO NOT** combine multiple patterns in one component (each = single strategy)
- **DO NOT** remove Russian comments (bilingual documentation)
- **AVOID** adding props to pattern components (keep self-contained)

## UNIQUE STYLES

- **Bilingual comments:** Russian + English inline documentation
- **Flat structure:** All patterns in root (no subdirectories—intentional for demo)
- **Visual testing:** Stories serve as test suite (no Jest/Vitest)
- **Shared mock data:** All patterns use same `ITEMS` array + `fetchItemDetails`

## NOTES

- **No index.ts:** Flat exports—import directly from sibling files
- **No tests:** Storybook stories = visual test suite
- **No App.tsx:** Storybook-only demo (no standalone app entry point)
