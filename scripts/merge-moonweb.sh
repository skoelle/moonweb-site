#!/bin/bash
set -e

echo "Merging moonweb sites for deployment..."

# Clean previous merge
rm -rf dist/root

# Hub becomes root
echo "  hub → dist/ (root)"
cp -r dist/hub dist/root
rm -rf dist/hub

# Copy timecapsule from its build output
if [ -d "timecapsule/_site/timecapsule" ]; then
  echo "  timecapsule → dist/root/timecapsule/"
  cp -r timecapsule/_site/timecapsule dist/root/timecapsule
else
  echo "  WARNING: timecapsule/_site/timecapsule not found, skipping"
fi

# Subdirectories
for site in infra smarthome code retro; do
  if [ -d "dist/$site" ]; then
    echo "  $site → dist/root/$site/"
    cp -r "dist/$site" "dist/root/$site"
  else
    echo "  WARNING: dist/$site not found, skipping"
  fi
done

# Copy CSS to root (accessible from all subdirectories)
echo "  Copying shared CSS to root..."
cp shared/base.css dist/root/shared-base.css
cp shared/favicon/hub.svg dist/root/favicon.svg

# Theme CSS files are already copied during build as theme.css
# The root theme is hub's theme
if [ -f "dist/root/theme.css" ]; then
  echo "  Root theme.css already in place"
fi

echo ""
echo "Merge complete. Final structure:"
find dist/root -maxdepth 2 -type f | sort | head -50
echo "..."
echo ""
echo "Total files:"
find dist/root -type f | wc -l
