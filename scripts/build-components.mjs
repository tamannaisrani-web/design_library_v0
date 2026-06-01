#!/usr/bin/env node
/**
 * Generates React TSX components from SVG files in packages/components/assets/icons/.
 * Run after export-figma.mjs.
 *
 * Usage: node scripts/build-components.mjs
 */

import { readdir, readFile, writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { transform } from '@svgr/core'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')

const VARIANTS = ['linear', 'bold', 'outline']

function toPascalCase(str) {
  const decoded = str.replace(/&amp;/g, '&').replace(/&/g, 'And')
  const result = decoded
    .split(/[-_\s]+/)
    .filter(s => s.length > 0)
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join('')
    .replace(/[^A-Za-z0-9]/g, '')
  return /^\d/.test(result) ? `Icon${result}` : result
}

const svgrConfig = {
  plugins: ['@svgr/plugin-jsx'],
  typescript: true,
  dimensions: false,
  svgProps: {
    'aria-hidden': '{true}',
    focusable: 'false',
  },
  template: (variables, { tpl }) => tpl`
    import React from 'react'

    interface IconProps extends React.SVGProps<SVGSVGElement> {
      size?: number | string
    }

    const ${variables.componentName} = ({ size = 24, ...props }: IconProps): React.ReactElement => (
      ${variables.jsx}
    )

    ${variables.componentName}.displayName = '${variables.componentName}'

    export { ${variables.componentName} }
    export default ${variables.componentName}
  `,
}

const variantExports = Object.fromEntries(VARIANTS.map(v => [v, []]))

for (const variant of VARIANTS) {
  const svgDir = path.join(ROOT, 'packages/components/assets/icons', variant)

  if (!existsSync(svgDir)) {
    console.warn(`[${variant}] No SVGs found, skipping`)
    continue
  }

  const files = (await readdir(svgDir)).filter(f => f.endsWith('.svg'))

  if (files.length === 0) {
    console.warn(`[${variant}] Directory is empty, skipping`)
    continue
  }

  console.log(`[${variant}] Generating ${files.length} components...`)

  const outDir = path.join(ROOT, 'packages/components/assets/icons', variant)
  await mkdir(outDir, { recursive: true })

  for (const file of files) {
    const iconName = path.basename(file, '.svg')
    const componentName = `${toPascalCase(iconName)}${toPascalCase(variant)}`
    const svgContent = await readFile(path.join(svgDir, file), 'utf-8')

    try {
      const code = await transform(
        svgContent,
        { ...svgrConfig, componentName },
        { filePath: file }
      )
      await writeFile(path.join(outDir, `${componentName}.tsx`), code, 'utf-8')
      variantExports[variant].push(componentName)
    } catch (e) {
      console.warn(`  ⚠ ${file}: ${e.message}`)
    }
  }

  // Write variant barrel file (alongside SVGs + TSX in same folder)
  const barrel = variantExports[variant]
    .map(name => `export { ${name} } from './${name}'`)
    .join('\n')
  await writeFile(path.join(outDir, 'index.ts'), barrel + '\n', 'utf-8')
}

// Write per-variant entry points and main index
const activeVariants = VARIANTS.filter(v => variantExports[v].length > 0)

for (const variant of activeVariants) {
  await writeFile(
    path.join(ROOT, `packages/components/assets/icons/${variant}.ts`),
    `export * from './${variant}'\n`,
    'utf-8'
  )
}

await writeFile(
  path.join(ROOT, 'packages/components/assets/icons/index.ts'),
  activeVariants.map(v => `export * from './${v}'`).join('\n') + '\n',
  'utf-8'
)

console.log('\n✓ Done:')
for (const v of activeVariants) {
  console.log(`  ${v}: ${variantExports[v].length} components`)
}
console.log('\nNext: npm run build')
