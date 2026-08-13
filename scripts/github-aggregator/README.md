# GitHub aggregator

Reads a `.moonweb.yml` file from each of the `skoelle` GitHub repos and
regenerates `code/_data/repos.json`. Run manually — not wired into CI.

## Usage

```bash
export GITHUB_TOKEN=ghp_xxx
python aggregate.py
```
