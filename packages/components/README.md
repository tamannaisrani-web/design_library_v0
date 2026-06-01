# @dcds/components — Buttons Family

React components for the Design Language System (DCDS).
Covers the entire **Buttons** page from the Figma source:
Button, LinkButton, DropdownButton, ButtonGroup, Switch, RadioButton, Checkbox.

## Install as a Git submodule

```bash
# In the consuming repo
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

Open `demo/playground.html` in any modern browser — no build step required. The playground includes a control panel to switch every prop on every component in real time.

## Repo layout

```
dcds-components/
├── package.json            # @dcds/components, submodule-friendly
├── tsconfig.json           # strict TS, react-jsx
├── .eslintrc.json          # extends from prior ui-library-1 config
├── .prettierrc.json
├── src/
│   ├── index.ts            # public barrel — main entrypoint
│   ├── theme/
│   │   ├── tokens.css      # all CSS variables (semantic + primitive)
│   │   └── index.ts
│   ├── components/         # common folder of exportable components
│   │   ├── index.ts        # component-level barrel
│   │   ├── Button/
│   │   ├── LinkButton/
│   │   ├── DropdownButton/
│   │   ├── ButtonGroup/
│   │   ├── Switch/
│   │   ├── RadioButton/
│   │   └── Checkbox/
│   └── icons/
│       └── ChevronDownIcon.tsx
└── demo/
    └── playground.html     # standalone live preview
```

## Lint & typecheck

```bash
npm install   # one-time
npm run typecheck
npm run lint
```

## Design rules in scope

This package implements the rules from `DripDesign.md`, `dcds-registry.json`, and the per-component `*.ai.md` / `*.stories.mdx` docs. Every prop name and token reference traces back to those sources.

— Token prefix: `dcds` · Font: Nunito Sans · Figma file: `P52nmDshYaKr963q1zBwQj`
