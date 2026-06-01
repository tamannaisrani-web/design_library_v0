# @dcds/icons

React icon components from the Design Language System. 789 icons in 3 variants (linear, bold, outline), built from Figma.

## Install

```bash
npm install @dcds/icons
```

React 16.8+ required as a peer dependency.

## Usage

```tsx
// Import from the full library
import { WalletAddLinear, WalletAddBold, WalletAddOutline } from '@dcds/icons'

// Or import just the variant you need (better tree-shaking)
import { WalletAddLinear } from '@dcds/icons/linear'
import { WalletAddBold } from '@dcds/icons/bold'
import { WalletAddOutline } from '@dcds/icons/outline'

// All icons accept a `size` prop and any SVG attribute
<WalletAddLinear size={24} color="currentColor" className="my-icon" />
```

## Icon naming

Icons follow the pattern `{IconName}{Variant}`:

| SVG file | Component |
|---|---|
| `wallet-add.svg` (linear) | `WalletAddLinear` |
| `wallet-add.svg` (bold) | `WalletAddBold` |
| `wallet-add.svg` (outline) | `WalletAddOutline` |

## Development

### Export icons from Figma

```bash
FIGMA_TOKEN=your_token npm run export:figma
```

Get your Figma personal access token at **figma.com → Settings → Personal access tokens**.

### Generate React components

```bash
npm run generate
```

### Build the icons package

```bash
npm run build
```

### Run the Vite dev app

```bash
npm run dev
```

### Publish a new version

```bash
npm version patch   # or minor / major
git push --follow-tags
```

The GitHub Action will export fresh icons from Figma, build, and publish to npm automatically.

## Secrets required (GitHub → Settings → Secrets)

| Secret | Description |
|---|---|
| `FIGMA_TOKEN` | Figma personal access token |
| `NPM_TOKEN` | npm automation token |

---

# @dcds/components — Buttons Family

React components for the Design Language System (DCDS).
Covers the entire **Buttons** page from the Figma source:
Button, LinkButton, DropdownButton, ButtonGroup, Switch, RadioButton, Checkbox.

Source lives in `packages/components/`. See [`packages/components/README.md`](packages/components/README.md) for full documentation.

## Install as a Git submodule

```bash
git submodule add https://github.com/dripcapital/dcds-components.git vendor/dcds-components
git submodule update --init --recursive
```

Then import from the submodule path (path-mapped or relative):

```tsx
import { Button, ButtonGroup, Switch } from '../vendor/dcds-components/src';
import '../vendor/dcds-components/src/theme/tokens.css'; // once at app root
```

Or, if your bundler supports `paths`, add to `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@dcds/components": ["./vendor/dcds-components/src"],
      "@dcds/components/styles": ["./vendor/dcds-components/src/theme/tokens.css"]
    }
  }
}
```

Then:

```tsx
import { Button } from '@dcds/components';
import '@dcds/components/styles';
```

## Components

| Component | Figma node | Purpose |
|---|---|---|
| `Button` | `850:10752` | Action trigger — Primary/Secondary/Tertiary × Primary/Error/Warning |
| `LinkButton` | `868:3050` | Text-only navigation/action link |
| `DropdownButton` | `863:12173` | Button that reveals a `DropdownMenu` |
| `ButtonGroup` | `477:86124` | Cohesive group of related Buttons |
| `Switch` | `868:3060` | Instant on/off toggle |
| `RadioButton` | `868:3073` | Mutually exclusive selection (2–5 options) |
| `Checkbox` | `868:3089` | Multi-select / single acknowledgement |

## Live playground

Open `packages/components/demo/playground.html` in any modern browser — no build step required.

## Lint & typecheck

```bash
cd packages/components
npm install   # one-time
npm run typecheck
npm run lint
```
