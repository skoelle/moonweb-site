#!/bin/bash
# Setup Cloudflare redirect rules for moonweb.org
# Redirects old subdomains to www.moonweb.org subdirectories
#
# Required env vars:
#   CLOUDFLARE_API_TOKEN  - API token with Dynamic Redirects Write permission
#   CLOUDFLARE_ZONE_ID    - Zone ID for moonweb.org
#
# Usage:
#   ./setup-redirects.sh          # Apply redirects
#   ./setup-redirects.sh --dry-run # Show what would be created
#   ./setup-redirects.sh --status  # Show current redirect rules
#   ./setup-redirects.sh --delete  # Delete all redirect rules

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
RULES_FILE="$SCRIPT_DIR/redirect-rules.json"
API="https://api.cloudflare.com/client/v4"
PHASE="http_request_dynamic_redirect"
RULESET_NAME="moonweb-subdomain-redirects"

DRY_RUN=false
STATUS=false
DELETE=false

for arg in "$@"; do
  case $arg in
    --dry-run) DRY_RUN=true ;;
    --status) STATUS=true ;;
    --delete) DELETE=true ;;
  esac
done

if [ -z "${CLOUDFLARE_API_TOKEN:-}" ] || [ -z "${CLOUDFLARE_ZONE_ID:-}" ]; then
  echo "Error: CLOUDFLARE_API_TOKEN and CLOUDFLARE_ZONE_ID must be set"
  exit 1
fi

cf_api() {
  local method=$1
  local url=$2
  shift 2
  curl -s -X "$method" "$url" \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -H "Content-Type: application/json" \
    "$@"
}

# Get existing ruleset ID for this phase
get_ruleset_id() {
  cf_api GET "$API/zones/$CLOUDFLARE_ZONE_ID/rulesets" | \
    python3 -c "
import sys, json
data = json.load(sys.stdin)
for r in data.get('result', []):
    if r.get('phase') == '$PHASE':
        print(r['id'])
        sys.exit(0)
print('')
" 2>/dev/null
}

# Get rules in a ruleset
get_rules() {
  local ruleset_id=$1
  cf_api GET "$API/zones/$CLOUDFLARE_ZONE_ID/rulesets/$ruleset_id" | \
    python3 -c "
import sys, json
data = json.load(sys.stdin)
for r in data.get('result', {}).get('rules', []):
    desc = r.get('description', 'unnamed')
    expr = r.get('expression', '')
    print(f'  {desc}')
    print(f'    expression: {expr}')
" 2>/dev/null
}

# Show current status
if [ "$STATUS" = true ]; then
  echo "=== Current redirect rules ==="
  ruleset_id=$(get_ruleset_id)
  if [ -z "$ruleset_id" ]; then
    echo "No redirect ruleset found for phase $PHASE"
    exit 0
  fi
  echo "Ruleset ID: $ruleset_id"
  get_rules "$ruleset_id"
  exit 0
fi

# Delete all redirect rules
if [ "$DELETE" = true ]; then
  echo "=== Deleting redirect rules ==="
  ruleset_id=$(get_ruleset_id)
  if [ -z "$ruleset_id" ]; then
    echo "No redirect ruleset found, nothing to delete"
    exit 0
  fi
  echo "Deleting ruleset $ruleset_id..."
  RESULT=$(cf_api DELETE "$API/zones/$CLOUDFLARE_ZONE_ID/rulesets/$ruleset_id")
  echo "$RESULT" | python3 -c "
import sys, json
data = json.load(sys.stdin)
if data.get('success'):
    print('Deleted successfully')
else:
    for e in data.get('errors', []):
        print(f\"Error: {e.get('message', '')}\")
" 2>/dev/null
  exit 0
fi

# Build payload from JSON file
PAYLOAD=$(python3 -c "
import json
with open('$RULES_FILE') as f:
    rules = json.load(f)
payload = {
    'name': '$RULESET_NAME',
    'kind': 'zone',
    'phase': '$PHASE',
    'rules': rules
}
print(json.dumps(payload))
")

RULE_COUNT=$(echo "$PAYLOAD" | python3 -c "import sys, json; print(len(json.load(sys.stdin)['rules']))" 2>/dev/null)

if [ "$DRY_RUN" = true ]; then
  echo "=== DRY RUN ==="
  echo "Would create/update ruleset '$RULESET_NAME' with $RULE_COUNT rules:"
  python3 -c "
import json
with open('$RULES_FILE') as f:
    rules = json.load(f)
for r in rules:
    print(f\"  - {r['description']}\")
" 2>/dev/null
  exit 0
fi

# Check if ruleset already exists
echo "=== Checking existing ruleset ==="
EXISTING_ID=$(get_ruleset_id)

if [ -n "$EXISTING_ID" ]; then
  echo "Updating existing ruleset $EXISTING_ID..."
  RESULT=$(cf_api PUT "$API/zones/$CLOUDFLARE_ZONE_ID/rulesets/$EXISTING_ID" \
    -d "$PAYLOAD")
else
  echo "Creating new ruleset..."
  RESULT=$(cf_api POST "$API/zones/$CLOUDFLARE_ZONE_ID/rulesets" \
    -d "$PAYLOAD")
fi

# Check result
echo "$RESULT" | python3 -c "
import sys, json
data = json.load(sys.stdin)
if data.get('success'):
    ruleset = data['result']
    print(f\"Success! Ruleset: {ruleset['name']} (ID: {ruleset['id']})\")
    print(f\"Rules: {len(ruleset.get('rules', []))}\")
    for r in ruleset.get('rules', []):
        print(f\"  - {r.get('description', 'unnamed')}\")
else:
    print('Error:')
    for e in data.get('errors', []):
        print(f\"  {e.get('code', '')}: {e.get('message', '')}\")
    sys.exit(1)
" 2>/dev/null
