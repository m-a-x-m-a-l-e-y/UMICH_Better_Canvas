#!/usr/bin/env bash
# Bundles background.js and zips the extension into zips/<name>-<version>.zip
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")"

VERSION=$(node -pe "require('./manifest.json').version")
OUT_DIR="zips"
OUT_FILE="$OUT_DIR/umich-canvas-plus-${VERSION}.zip"

FILES=(
  manifest.json
  background.bundle.js
  content.js
  eventClass.js
  sportsClass.js
  popup/popup.html
  popup/display.js
  popup/style.css
  data/48.png
  data/128.png
)

echo "Bundling background.js -> background.bundle.js"
npx esbuild background.js --bundle --outfile=background.bundle.js --format=esm

mkdir -p "$OUT_DIR"
rm -f "$OUT_FILE"

zip -r "$OUT_FILE" "${FILES[@]}"

echo "Created $OUT_FILE"
