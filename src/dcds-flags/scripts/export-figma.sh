#!/usr/bin/env bash
set -euo pipefail

# Usage: FIGMA_TOKEN=your_token bash scripts/export-figma.sh

FIGMA_TOKEN="${FIGMA_TOKEN:?FIGMA_TOKEN is required}"
FILE_KEY="P52nmDshYaKr963q1zBwQj"
MANIFEST="$(dirname "$0")/flags-manifest.json"
OUT_DIR="$(dirname "$0")/../flags"
BATCH_SIZE=100

mkdir -p "$OUT_DIR"

# Build arrays of codes and nodeIds from manifest (skip entries with empty nodeId)
mapfile -t CODES  < <(jq -r '.[] | select(.nodeId != "") | .code'   "$MANIFEST")
mapfile -t NODES  < <(jq -r '.[] | select(.nodeId != "") | .nodeId' "$MANIFEST")

TOTAL=${#CODES[@]}
SAVED=0
ERRORS=0

echo "Exporting $TOTAL flags from Figma..."

i=0
while [ $i -lt $TOTAL ]; do
  # Build comma-separated batch of node IDs (colons replaced with hyphens for URL)
  BATCH_IDS=""
  BATCH_CODES=()
  BATCH_NODES=()

  j=0
  while [ $j -lt $BATCH_SIZE ] && [ $((i + j)) -lt $TOTAL ]; do
    idx=$((i + j))
    node_url="${NODES[$idx]//:/-}"
    [ -n "$BATCH_IDS" ] && BATCH_IDS+=","
    BATCH_IDS+="$node_url"
    BATCH_CODES+=("${CODES[$idx]}")
    BATCH_NODES+=("${NODES[$idx]}")
    j=$((j + 1))
  done

  BATCH_NUM=$(( (i / BATCH_SIZE) + 1 ))
  TOTAL_BATCHES=$(( (TOTAL + BATCH_SIZE - 1) / BATCH_SIZE ))
  echo -n "  Batch $BATCH_NUM/$TOTAL_BATCHES (${#BATCH_CODES[@]} flags)... "

  # Call Figma images API
  RESPONSE=$(curl -sf \
    -H "X-Figma-Token: $FIGMA_TOKEN" \
    "https://api.figma.com/v1/images/$FILE_KEY?ids=$BATCH_IDS&format=svg&svg_include_id=false&svg_simplify_stroke=true")

  if [ $? -ne 0 ]; then
    echo "FAILED (curl error)"
    ERRORS=$((ERRORS + ${#BATCH_CODES[@]}))
    i=$((i + BATCH_SIZE))
    continue
  fi

  # For each flag in the batch, extract the SVG URL and download it
  for k in "${!BATCH_CODES[@]}"; do
    code="${BATCH_CODES[$k]}"
    node_url="${BATCH_NODES[$k]//:/-}"
    svg_url=$(echo "$RESPONSE" | jq -r --arg id "$node_url" '.images[$id] // empty')

    if [ -z "$svg_url" ]; then
      echo ""
      echo "  ⚠ No URL for $code"
      ERRORS=$((ERRORS + 1))
      continue
    fi

    # Download SVG with retry
    success=false
    for attempt in 1 2 3; do
      if curl -sf "$svg_url" -o "$OUT_DIR/${code}.svg"; then
        success=true
        break
      fi
      sleep $attempt
    done

    if $success; then
      SAVED=$((SAVED + 1))
    else
      echo ""
      echo "  ⚠ Failed to download $code"
      ERRORS=$((ERRORS + 1))
    fi
  done

  echo "done"

  i=$((i + BATCH_SIZE))

  # Rate limit buffer between batches
  [ $i -lt $TOTAL ] && sleep 0.3
done

echo ""
echo "✓ Export complete: $SAVED SVGs saved, $ERRORS errors"
