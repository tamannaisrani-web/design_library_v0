#!/usr/bin/env node
/**
 * Exports SVG icons from Figma using the REST API.
 *
 * Usage:
 *   FIGMA_TOKEN=your_token node scripts/export-figma.mjs
 *
 * Get your token at: https://www.figma.com/settings → Personal access tokens
 */

import { mkdir, writeFile, readFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')

const FIGMA_TOKEN = process.env.FIGMA_TOKEN
const FILE_KEY = 'P52nmDshYaKr963q1zBwQj'
const VARIANTS = ['linear', 'bold', 'outline']
const BATCH_SIZE = 100

if (!FIGMA_TOKEN) {
  console.error('Error: FIGMA_TOKEN is required')
  console.error('  Get it at: https://www.figma.com/settings → Personal access tokens')
  console.error('  Usage: FIGMA_TOKEN=your_token node scripts/export-figma.mjs')
  process.exit(1)
}

const manifest = JSON.parse(
  await readFile(path.join(__dirname, 'icons-manifest.json'), 'utf-8')
)

async function exportBatch(nodeIds) {
  const ids = nodeIds.map(id => id.replace(':', '-')).join(',')
  const url = `https://api.figma.com/v1/images/${FILE_KEY}?ids=${ids}&format=svg&svg_include_id=false&svg_simplify_stroke=true`

  const res = await fetch(url, {
    headers: { 'X-Figma-Token': FIGMA_TOKEN },
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Figma API ${res.status}: ${text}`)
  }

  const { images, err } = await res.json()
  if (err) throw new Error(`Figma export error: ${err}`)
  return images
}

async function downloadSvg(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return res.text()
    } catch (e) {
      if (i === retries - 1) throw e
      await new Promise(r => setTimeout(r, 1000 * (i + 1)))
    }
  }
}

for (const variant of VARIANTS) {
  await mkdir(path.join(ROOT, 'packages/components/assets/icons', variant), { recursive: true })
}

let totalSaved = 0
let totalErrors = 0

for (const variant of VARIANTS) {
  const icons = manifest.filter(icon => icon.variants[variant])
  console.log(`\n[${variant}] Exporting ${icons.length} icons...`)

  for (let i = 0; i < icons.length; i += BATCH_SIZE) {
    const batch = icons.slice(i, i + BATCH_SIZE)
    const nodeIds = batch.map(icon => icon.variants[variant])
    const batchNum = Math.floor(i / BATCH_SIZE) + 1
    const totalBatches = Math.ceil(icons.length / BATCH_SIZE)

    process.stdout.write(`  Batch ${batchNum}/${totalBatches} (${batch.length} icons)... `)

    try {
      const images = await exportBatch(nodeIds)

      await Promise.all(
        batch.map(async (icon, j) => {
          const nodeId = nodeIds[j].replace(':', '-')
          const svgUrl = images[nodeId]

          if (!svgUrl) {
            console.warn(`\n  ⚠ No URL for ${icon.name}`)
            totalErrors++
            return
          }

          try {
            const svg = await downloadSvg(svgUrl)
            const outPath = path.join(ROOT, 'packages/components/assets/icons', variant, `${icon.name}.svg`)
            await writeFile(outPath, svg, 'utf-8')
            totalSaved++
          } catch (e) {
            console.warn(`\n  ⚠ ${icon.name}: ${e.message}`)
            totalErrors++
          }
        })
      )

      console.log('done')
    } catch (e) {
      console.error(`FAILED: ${e.message}`)
      totalErrors += batch.length
    }

    // Avoid rate limiting
    if (i + BATCH_SIZE < icons.length) {
      await new Promise(r => setTimeout(r, 300))
    }
  }
}

console.log(`\n✓ Export complete: ${totalSaved} SVGs saved, ${totalErrors} errors`)
if (totalSaved > 0) {
  console.log('\nNext: npm run generate')
}
