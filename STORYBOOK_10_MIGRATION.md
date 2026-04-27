# Storybook 10 Migration Guide

## Current Status (as of April 2026)

- **Current Version**: Storybook 8.6.18 (stable)
- **Target Version**: Storybook 10.x.x (alpha/beta - not yet stable)
- **Recommendation**: Wait for Storybook 10.0.0 stable release before migrating

## Pre-Migration Preparation ✅

The following changes have already been made to prepare for Storybook 10:

### 1. TypeScript Configuration
**File**: `tsconfig.json`
```json
{
  "compilerOptions": {
    "moduleResolution": "bundler"  // Changed from "Node"
  }
}
```

**Why**: Storybook 10 requires `moduleResolution` set to `"bundler"`, `"node16"`, or `"nodenext"` to support the `types` condition.

### 2. Storybook Configuration
**File**: `.storybook/main.ts`
```typescript
const config: StorybookConfig = {
  // ... other config
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  // ... rest of config
};
```

**Why**: Explicit TypeScript configuration for better component documentation generation.

## Migration Checklist (When Storybook 10 Stable is Released)

### Step 1: Verify System Requirements

- [ ] Node.js version is 20.19+ or 22.12+
- [ ] Backup current working version (git commit)

### Step 2: Update package.json

Replace all Storybook 8.x dependencies with 10.x versions:

```json
{
  "devDependencies": {
    "storybook": "^10.x.x",
    "@storybook/react": "^10.x.x",
    "@storybook/react-webpack5": "^10.x.x",
    "@storybook/addon-essentials": "^10.x.x",
    "@storybook/test": "^10.x.x",
    "@types/react": "^19.x.x",
    "ts-loader": "^9.x.x",
    "typescript": "^5.x.x"
  }
}
```

**Important**: Ensure all `@storybook/*` packages use the same major version (10.x.x).

### Step 3: Install Dependencies

```bash
npm install --legacy-peer-deps
```

### Step 4: Review Breaking Changes

#### Component API Changes

**Button Component**:
- `ariaLabel` prop is now required (or `false` if not needed)
- `active` prop is deprecated
- New `shortcut` and `tooltip` props added

**Deprecated Components** (find alternatives):
- `IconButton` → Use `Button` with icon
- `FlexBar` → Use `Bar` with `innerStyle`
- `Tabs`, `TabButton`, `TabBar`, `TabWrapper`, `TabsState` → New tab system
- `ListItem`, `TooltipLinkList`, `TooltipMessage` → Updated alternatives
- `WithTooltipPure`, `WithTooltipState` → Use `WithTooltip`

**WithTooltip Component**:
- Removed: `trigger`, `svg`, `strategy`, `withArrows`, `mutationObserverOptions`
- Removed: `hasChrome`, `closeOnTriggerHidden`, `followCursor`, `closeOnOutsideClick`
- Removed: `interactive`
- Added: `triggerOnFocusOnly`
- Renamed: `startOpen`

### Step 5: Update Story Files

Search for deprecated patterns in your story files:

```bash
# Find deprecated component usage
grep -r "IconButton" src/**/*.stories.tsx
grep -r "WithTooltipPure" src/**/*.stories.tsx
grep -r "WithTooltipState" src/**/*.stories.tsx
```

### Step 6: Test and Verify

```bash
# Start Storybook dev server
npm run storybook

# Build Storybook
npm run build-storybook
```

Check for:
- [ ] No console errors or warnings
- [ ] All stories render correctly
- [ ] Controls work as expected
- [ ] Network simulator integration still functions
- [ ] Toolbar globals (network scenario selector) works

### Step 7: Fix Any Issues

Common issues to watch for:

1. **TypeScript errors**: Update type imports if needed
2. **Missing addons**: Ensure all addon packages are updated to 10.x
3. **Component API changes**: Update deprecated props
4. **Styling issues**: Check for UI component changes

## Known Issues & Solutions

### Issue: Addon Version Mismatch
If you see peer dependency conflicts between core Storybook 10 and addons at version 8.x, wait for addon packages to release 10.x versions.

### Issue: Module Resolution Errors
Ensure `tsconfig.json` has:
```json
{
  "compilerOptions": {
    "moduleResolution": "bundler"
  }
}
```

### Issue: ESM Configuration
Ensure `.storybook/main.ts` uses ESM format (already configured correctly):
```typescript
export default config;  // ✅ Correct
```

## Rollback Procedure

If migration fails and you need to revert:

```bash
# Revert package.json changes
git checkout package.json

# Reinstall dependencies
npm install

# Verify Storybook 8 works
npm run storybook
```

## Resources

- Official Migration Guide: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md
- Storybook Releases: https://github.com/storybookjs/storybook/releases
- Storybook Documentation: https://storybook.js.org/docs

## Migration Timeline

- **April 2026**: Storybook 10.4.0-alpha.10 (current)
- **Expected Stable**: TBD (monitor GitHub releases)
- **Action**: Subscribe to Storybook releases for notification when 10.0.0 stable is released

---

*Last updated: April 27, 2026*
*Current Storybook version: 8.6.18*
*Target version: 10.x.x (when stable)*
