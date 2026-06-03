#!/usr/bin/env python3
"""
Export flag SVGs from Figma.
Usage: FIGMA_TOKEN=your_token python3 scripts/export-figma.py
"""

import json
import os
import sys
import time
import urllib.request
from pathlib import Path

FIGMA_TOKEN = os.environ.get("FIGMA_TOKEN")
if not FIGMA_TOKEN:
    print("Error: FIGMA_TOKEN is required", file=sys.stderr)
    sys.exit(1)

FILE_KEY = "P52nmDshYaKr963q1zBwQj"
BATCH_SIZE = 100
SCRIPT_DIR = Path(__file__).parent
MANIFEST_PATH = SCRIPT_DIR / "flags-manifest.json"
OUT_DIR = SCRIPT_DIR.parent / "flags"

OUT_DIR.mkdir(exist_ok=True)

manifest = json.loads(MANIFEST_PATH.read_text())
flags = [f for f in manifest if f.get("nodeId")]

print(f"Exporting {len(flags)} flags from Figma...")

saved = 0
errors = 0

def figma_request(url):
    req = urllib.request.Request(url, headers={"X-Figma-Token": FIGMA_TOKEN})
    with urllib.request.urlopen(req) as r:
        return json.loads(r.read())

def download(url, dest, retries=3):
    for attempt in range(retries):
        try:
            urllib.request.urlretrieve(url, dest)
            return True
        except Exception as e:
            if attempt == retries - 1:
                return False
            time.sleep(attempt + 1)

total_batches = (len(flags) + BATCH_SIZE - 1) // BATCH_SIZE

for batch_num, i in enumerate(range(0, len(flags), BATCH_SIZE), 1):
    batch = flags[i:i + BATCH_SIZE]
    node_ids = ",".join(f["nodeId"].replace(":", "-") for f in batch)
    print(f"  Batch {batch_num}/{total_batches} ({len(batch)} flags)... ", end="", flush=True)

    try:
        url = (
            f"https://api.figma.com/v1/images/{FILE_KEY}"
            f"?ids={node_ids}&format=svg&svg_include_id=false&svg_simplify_stroke=true"
        )
        data = figma_request(url)
        images = data.get("images", {})

        for flag in batch:
            svg_url = images.get(flag["nodeId"])
            if not svg_url:
                print(f"\n  ⚠ No URL for {flag['code']}")
                errors += 1
                continue

            dest = OUT_DIR / f"{flag['code']}.svg"
            if download(svg_url, dest):
                saved += 1
            else:
                print(f"\n  ⚠ Download failed for {flag['code']}")
                errors += 1

        print("done")

    except Exception as e:
        print(f"FAILED: {e}")
        errors += len(batch)

    if i + BATCH_SIZE < len(flags):
        time.sleep(0.3)

print(f"\n✓ Export complete: {saved} SVGs saved, {errors} errors")
