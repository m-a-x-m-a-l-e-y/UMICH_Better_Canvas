#!/usr/bin/env bash
# Zips the extension into zips/<name>-<version>.zip
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")"

VERSION=$(node -pe "require('./manifest.json').version")
OUT_DIR="zips"
OUT_FILE="$OUT_DIR/umich-canvas-plus-${VERSION}.zip"

FILES=(
  manifest.json
  background.js
  content.js
  eventClass.js
  sportsClass.js
  popup/popup.html
  popup/display.js
  popup/style.css
  data/48.png
  data/128.png
)

mkdir -p "$OUT_DIR"
rm -f "$OUT_FILE"

zip -r "$OUT_FILE" "${FILES[@]}"

echo "Created $OUT_FILE"
