#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
VENV_DIR="$PROJECT_DIR/.venv"
REQUIREMENTS="$SCRIPT_DIR/requirements.txt"
OUTPUT="$SCRIPT_DIR/cv.pdf"

echo "==> Setting up Python venv..."
if [ ! -d "$VENV_DIR" ]; then
  python3 -m venv "$VENV_DIR"
fi
source "$VENV_DIR/bin/activate"

echo "==> Installing WeasyPrint..."
pip install -q -r "$REQUIREMENTS"

echo "==> Building stefankoelle with Eleventy..."
# Temporarily hide .eleventyignore so the standalone stefankoelle build works
IGNORE_FILE="$PROJECT_DIR/.eleventyignore"
if [ -f "$IGNORE_FILE" ]; then
  mv "$IGNORE_FILE" "$IGNORE_FILE.bak"
  trap 'mv "$IGNORE_FILE.bak" "$IGNORE_FILE"' EXIT
fi
npx @11ty/eleventy --config="$PROJECT_DIR/stefankoelle/eleventy.config.js"

echo "==> Generating PDF..."
weasyprint "$PROJECT_DIR/dist/stefankoelle/cv-print/index.html" "$OUTPUT" \
  --stylesheet "$SCRIPT_DIR/cv-style.css"

echo "==> Done: $OUTPUT"
