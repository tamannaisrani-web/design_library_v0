#!/usr/bin/env node
/**
 * Exports flag SVGs from Figma using the REST API.
 *
 * Usage:
 *   FIGMA_TOKEN=your_token node scripts/export-figma.mjs
 *
 * Flags are exported to ../flags/{CODE}.svg
 * Node IDs must be filled in scripts/flags-manifest.json before running.
 */

import { mkdir, writeFile, readFile } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')

const FIGMA_TOKEN = process.env.FIGMA_TOKEN
const FILE_KEY = 'P52nmDshYaKr963q1zBwQj'
const BATCH_SIZE = 100

if (!FIGMA_TOKEN) {
  console.error('Error: FIGMA_TOKEN is required')
  console.error('  Usage: FIGMA_TOKEN=your_token node scripts/export-figma.mjs')
  process.exit(1)
}

const manifest = JSON.parse(
  await readFile(path.join(__dirname, 'flags-manifest.json'), 'utf-8')
)

const missing = manifest.filter(f => !f.nodeId)
if (missing.length > 0) {
  console.warn(`⚠ ${missing.length} entries have no nodeId — fill in flags-manifest.json first:`)
  missing.forEach(f => console.warn(`   ${f.code} (${f.name})`))
  const ready = manifest.filter(f => f.nodeId)
  if (ready.length === 0) process.exit(1)
  console.warn(`Continuing with ${ready.length} ready entries...\n`)
}

const flags = manifest.filter(f => f.nodeId)

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

await mkdir(path.join(ROOT, 'flags'), { recursive: true })

let saved = 0
let errors = 0

for (let i = 0; i < flags.length; i += BATCH_SIZE) {
  const batch = flags.slice(i, i + BATCH_SIZE)
  const nodeIds = batch.map(f => f.nodeId)
  const batchNum = Math.floor(i / BATCH_SIZE) + 1
  const totalBatches = Math.ceil(flags.length / BATCH_SIZE)

  process.stdout.write(`Batch ${batchNum}/${totalBatches} (${batch.length} flags)... `)

  try {
    const images = await exportBatch(nodeIds)

    await Promise.all(
      batch.map(async (flag, j) => {
        const nodeId = nodeIds[j].replace(':', '-')
        const svgUrl = images[nodeId]

        if (!svgUrl) {
          console.warn(`\n  ⚠ No URL for ${flag.code}`)
          errors++
          return
        }

        try {
          const svg = await downloadSvg(svgUrl)
          await writeFile(path.join(ROOT, 'flags', `${flag.code}.svg`), svg, 'utf-8')
          saved++
        } catch (e) {
          console.warn(`\n  ⚠ ${flag.code}: ${e.message}`)
          errors++
        }
      })
    )

    console.log('done')
  } catch (e) {
    console.error(`FAILED: ${e.message}`)
    errors += batch.length
  }

  if (i + BATCH_SIZE < flags.length) {
    await new Promise(r => setTimeout(r, 300))
  }
}

console.log(`\n✓ Export complete: ${saved} SVGs saved, ${errors} errors`)
