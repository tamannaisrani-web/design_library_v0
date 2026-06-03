# @dcds/flags

Country flag SVGs from the Design Language System. No framework dependency — plain SVG files.

## Install

```bash
npm install @dcds/flags
```

## Usage

### As an `<img>` tag (recommended)

```html
<img src="node_modules/@dcds/flags/flags/IN.svg" width="16" height="12" alt="India" />
```

### In React with a bundler (Vite, webpack, Next.js)

```tsx
import INFlag from '@dcds/flags/flags/IN.svg'

<img src={INFlag} width={16} height={12} alt="India" />
```

### Via raw GitHub URL (no install needed)

```html
<img
  src="https://raw.githubusercontent.com/tamannaisrani-web/design_library_v0/main/dcds-flags/flags/IN.svg"
  width="16"
  height="12"
  alt="India"
/>
```

## Flag naming

Files are named by ISO 3166-1 alpha-2 country code: `IN.svg`, `US.svg`, `GB.svg`, etc.

Standard display sizes (matching the `Flag` Figma component):

| Size | Width × Height |
|------|---------------|
| S    | 16 × 12 px    |
| M    | 24 × 18 px    |

## Available flags

See [scripts/flags-manifest.json](scripts/flags-manifest.json) for the full list.

## Development

### 1. Fill in Figma node IDs

Open `scripts/flags-manifest.json` and add the Figma node ID for each flag
(inspect the flag component in Figma → right-click → Copy link to selection → extract the node ID).

### 2. Export SVGs from Figma

```bash
FIGMA_TOKEN=your_token npm run export:figma
```

Get your token at **figma.com → Settings → Personal access tokens**.

### 3. Commit the SVGs

```bash
git add flags/
git commit -m "chore: export flag SVGs from Figma"
```

## Secrets required (GitHub → Settings → Secrets)

| Secret        | Description                    |
|---------------|-------------------------------|
| `FIGMA_TOKEN` | Figma personal access token   |
