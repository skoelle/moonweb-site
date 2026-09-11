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

mv .eleventyignore .eleventyignore.bak

npx @11ty/eleventy --serve --port=8081 &
npx @11ty/eleventy --config=stefankoelle/eleventy.config.js --serve --port=8086 &
cd timecapsule && npx @11ty/eleventy --serve --port=8087 &

wait
