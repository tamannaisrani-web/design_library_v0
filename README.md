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
