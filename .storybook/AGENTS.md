# .storybook/ - Storybook Configuration

**Scope:** Storybook 10 (alpha) setup with network simulation for loading pattern demos.

## STRUCTURE

```
.storybook/
├── main.ts      # Storybook config: stories path, webpack, TypeScript
└── preview.ts   # Global decorators, network simulator, toolbar
```

## WHERE TO LOOK

| Task | File | Purpose |
|------|------|---------|
| Change stories path | `main.ts` | `stories: ['../src/**/*.stories.@(ts|tsx)']` |
| Modify webpack config | `main.ts` | `webpackFinal` hook for ts-loader |
| Adjust network simulation | `preview.ts` | `enableNetworkSimulator` options |
| Add global toolbar | `preview.ts` | `globalTypes.networkScenario` |

## CONVENTIONS

**main.ts:**
- ESM format: `export default config`
- Stories pattern: `../src/**/*.stories.@(ts|tsx)`
- Framework: `@storybook/react-webpack5`
- TypeScript: `react-docgen-typescript` for prop docs
- Webpack: Custom `webpackFinal` for ts-loader with `transpileOnly: true`

**preview.ts:**
- Network simulator: `fetch-network-simulator` (enable/disable per story)
- Global decorator: Applies network scenario before render
- Toolbar: `networkScenario` ('normal' | 'race-demo')
- State: `currentScenario` cache to avoid redundant reconfigures

**Network scenarios:**
```typescript
// Normal (stable)
latency: 300ms, packetLoss: 0, staleResponse: 0

// Race-demo (chaotic)
latency: 1500ms, packetLoss: 10%, staleResponse: 70%, retry: 2 attempts
```

## ANTI-PATTERNS

- **DO NOT** change stories path without verifying all `.stories.tsx` files load
- **DO NOT** remove network simulator (core to pattern demos)
- **DO NOT** modify `currentScenario` caching logic (prevents redundant reconfigures)
- **AVOID** adding more than 2 network scenarios (toolbar clarity)

## UNIQUE STYLES

- **Dynamic simulator:** Reconfigures on every story render (not static)
- **Global state:** `currentScenario` module-level cache
- **Type-safe scenarios:** `NetworkScenario = 'normal' | 'race-demo'`
- **No addons beyond essentials:** Only `@storybook/addon-essentials`

## NOTES

- **Storybook 10 alpha:** Config prepared for v10, but running 8.6.18 (see `STORYBOOK_10_MIGRATION.md`)
- **No custom webpack plugins:** Only ts-loader for TypeScript
- **No theme customization:** Default Storybook theme
- **No preview body styling:** Minimal preview config
