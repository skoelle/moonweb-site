#!/usr/bin/env bash
set -euo pipefail

cleanup() {
  kill $(jobs -p) 2>/dev/null
  [ -f .eleventyignore.bak ] && mv .eleventyignore.bak .eleventyignore 2>/dev/null
}
trap cleanup EXIT

echo "==> Starting moonweb dev servers..."
echo "    http://localhost:8081  (moonweb sites)"
echo "    http://localhost:8086  (stefankoelle.de)"
echo "    http://localhost:8087  (timecapsule)"
echo ""

# Start root server first (stefankoelle blocked by .eleventyignore)
npx @11ty/eleventy --serve --port=8081 &
sleep 2

# Now remove stefankoelle from ignore so the next server can find templates
cp .eleventyignore .eleventyignore.bak
grep -v '^stefankoelle/' .eleventyignore > .eleventyignore.tmp && mv .eleventyignore.tmp .eleventyignore

# Start stefankoelle server (templates now visible)
npx @11ty/eleventy --config=stefankoelle/eleventy.config.js --serve --port=8086 &

# Start timecapsule
cd timecapsule && npx @11ty/eleventy --serve --port=8087 &

wait
