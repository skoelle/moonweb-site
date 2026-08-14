#!/usr/bin/env bash
set -euo pipefail

echo "==> Running prebuild tasks..."

echo ""
echo "--- GitHub Aggregator ---"
if [ ! -d .venv ]; then
  python3 -m venv .venv
  .venv/bin/pip install -q pyyaml
fi
.venv/bin/python scripts/github-aggregator/aggregate.py

echo ""
echo "--- CV PDF ---"
bash stefankoelle/pdf/build-pdf.sh

echo ""
echo "==> Prebuild complete."
