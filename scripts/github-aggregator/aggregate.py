"""
GitHub aggregator for code.moonweb.org.
Reads a `.moonweb.yml` from the root of every public repo under `skoelle`
and writes the combined result to `code/_data/repos.json`. Manual, on
demand. Network calls are NOT executed as part of building this scaffold.
"""

import base64
import json
import os
import sys
import urllib.request

GITHUB_USER = "skoelle"
API_ROOT = "https://api.github.com"
OUTPUT_PATH = os.path.join(
    os.path.dirname(__file__), "..", "..", "code", "_data", "repos.json"
)


def gh_get(path: str):
    token = os.environ.get("GITHUB_TOKEN")
    req = urllib.request.Request(f"{API_ROOT}{path}")
    if token:
        req.add_header("Authorization", f"Bearer {token}")
    req.add_header("Accept", "application/vnd.github+json")
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read().decode("utf-8"))


def list_public_repos():
    repos, page = [], 1
    while True:
        batch = gh_get(f"/users/{GITHUB_USER}/repos?per_page=100&page={page}")
        if not batch:
            break
        repos.extend(r for r in batch if not r["private"] and not r["fork"])
        page += 1
    return repos


def fetch_moonweb_yml(repo_name: str):
    try:
        data = gh_get(f"/repos/{GITHUB_USER}/{repo_name}/contents/.moonweb.yml")
    except Exception:
        return None
    content = base64.b64decode(data["content"]).decode("utf-8")
    try:
        import yaml
    except ImportError:
        print("PyYAML is required: pip install pyyaml", file=sys.stderr)
        raise
    return yaml.safe_load(content)


def main():
    entries = []
    for repo in list_public_repos():
        meta = fetch_moonweb_yml(repo["name"])
        if not meta or meta.get("category") != "code":
            continue
        entries.append(meta)

    entries.sort(key=lambda e: (e.get("subcategory", ""), e.get("title", "")))

    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(entries, f, indent=2, ensure_ascii=False)
        f.write("\n")

    print(f"Wrote {len(entries)} entries to {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
