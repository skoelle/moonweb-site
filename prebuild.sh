#!/usr/bin/env bash
set -euo pipefail

echo "==> Running prebuild tasks..."

echo ""
echo "--- CV PDF ---"
bash stefankoelle/pdf/build-pdf.sh

echo ""
echo "==> Prebuild complete."
