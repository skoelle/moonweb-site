# moonweb-site

Monorepo for the **moonweb.org** homelab — six static sites built with [Eleventy](https://www.11ty.dev/), deployed to [IONOS SFTP](https://www.ionos.de/).

```
www.moonweb.org/           -> Central index & gateway
www.moonweb.org/infra/     -> Infrastructure overview (Proxmox, Synology, Docker)
www.moonweb.org/smarthome/ -> Smart home projects & dashboards
www.moonweb.org/code/      -> Curated GitHub project catalog
www.moonweb.org/retro/     -> Physical retro hardware collection
www.moonweb.org/timecapsule/ -> 2000s internet time capsule (retro design)
stefankoelle.de            -> CV, career, personal site (LED Matrix docs)
```

> **Other sites** (not in this monorepo): [28k8.moonweb.org](https://28k8.moonweb.org) (90s BBS archive), [buildbroken.moonweb.org](https://buildbroken.moonweb.org) (.NET Open Space blog).

---

## Architecture

```
+-------------------------------------------------------------------+
|                     GitHub Actions CI                              |
|  +-----------+ +------------+ +-------------+ +---------+ +------+ |
|  | build:hub | |build:infra | | build:smart | | build:... | | build:timecapsule | |
|  +-----+-----+ +-----+------+ +------+------+ +----+----+ +----+----+ +--------+ |
|        |             |               |             |        |          |        |
|        v             v               v              v        v          v        |
|   dist/hub/    dist/infra/   dist/smarthome/    dist/.../  dist/timecapsule/     |
+--------+---------------------------------------------------+--------------------+
         |                                                   |
         v                                                   v
+------------------+                               +------------------+
|    IONOS SFTP    |                               |    IONOS SFTP    |
| (www.moonweb.org)|                               | (stefankoelle.de)|
+--------+---------+                               +--------+---------+
         v                                                   v
  www.moonweb.org/*                              stefankoelle.de
```

---

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **SSG** | [Eleventy 3.1.6](https://www.11ty.dev/) | Markdown/YAML-first, minimal JS, `_data` folders map directly to aggregator output |
| **SSG (timecapsule)** | [Eleventy 2.0.1](https://www.11ty.dev/) | Legacy 2001 design, CommonJS config |
| **Templates** | [Nunjucks](https://mozilla.github.io/nunjucks/) | Shared `base.njk` layout with site-switcher header, `card-grid.njk` for index pages |
| **Styling** | Custom CSS (variables-based) | `base.css` for shared layout, `theme-*.css` per domain accent color |
| **Fonts** | [Lobster](https://fonts.google.com/specimen/Lobster) (Google Fonts) | Distinctive heading font across all sites |
| **CI/CD** | [GitHub Actions](https://github.com/features/actions) | Matrix build for all sites, artifact upload, merge step, parallel deploy |
| **Deploy** | IONOS SFTP | Static hosting via SFTP upload |
| **DNS** | Cloudflare | DNS management + redirects from old subdomains |
| **GitHub Catalog** | Python aggregator | Reads `.moonweb.yml` from each repo, outputs `repos.json` |
| **Runtime** | Fully static | No server-side code, no containers, no database |

---

## Local Development

```bash
npm install                        # install Eleventy + deps
cd timecapsule && npm install      # timecapsule has own deps (Eleventy 2.x)

npm run dev:hub                    # http://localhost:8081
npm run dev:infra                  # http://localhost:8082
npm run dev:smarthome              # http://localhost:8083
npm run dev:code                   # http://localhost:8084
npm run dev:retro                  # http://localhost:8085
npm run dev:stefankoelle           # http://localhost:8086
npm run dev:timecapsule            # http://localhost:8087

npm run dev                        # all 7 in parallel
```

Each site has its own minimal Eleventy config (`<site>/eleventy.config.js`). Live reload is built in.

### Build

```bash
npm run prebuild                     # pre-build tasks (CV PDF)
npm run build                        # builds all sites
npm run build:moonweb                # builds moonweb sites only (excludes stefankoelle)
npm run build:hub                    # build single site
npm run merge:moonweb                # merge all moonweb sites into dist/ for deployment
```

---

## Project Structure

```
moonweb-site/
├── hub/                          # Central index & gateway
├── infra/                        # Infra overview + 8 detail pages
│   ├── backup-strategy/
│   ├── monitoring/
│   ├── dev-environment/
│   └── ...
├── smarthome/                    # Smart home overview + 9 detail pages
│   ├── homematic-mqtt/
│   ├── tasmota-energy/
│   └── ...
├── code/                         # GitHub catalog
│   └── _data/repos.json          # populated by the aggregator
├── retro/                        # Retro hardware + 13 detail pages
├── timecapsule/                  # 2000s retro design (Eleventy 2.x)
│   ├── eleventy.config.js
│   ├── package.json
│   └── src/
├── stefankoelle/                 # CV, career, personal site
│   ├── eleventy.config.js
│   ├── index.njk                 # Onepager (CV, Projects, Languages)
│   ├── cv-print.njk              # CV-only for PDF generation
│   ├── ledmatrix/                # LED Matrix WebServer documentation
│   └── assets/                   # CSS, JS, images, favicons
├── shared/                       # Shared components
│   ├── _includes/
│   │   ├── base.njk              # base layout (header, site-switcher, footer)
│   │   └── card-grid.njk         # card-grid template with emoji support
│   ├── base.css                  # shared CSS (layout, cards, typography)
│   └── theme-*.css               # accent colors per domain
├── scripts/
│   ├── github-aggregator/        # Python: reads .moonweb.yml -> repos.json
│   └── merge-moonweb.sh          # Merge script for deployment
├── .github/workflows/
│   ├── build-deploy-moonweb.yml  # CI/CD: build + deploy to IONOS SFTP
│   └── deploy-stefankoelle.yml   # CI/CD: stefankoelle.de to IONOS SFTP
├── DESIGN.md                     # Initial concept
├── SPEC.md                       # Full specification
├── PLAN.md                       # Implementation plan
├── TODO.md                       # Open items & workflow
└── package.json                  # npm scripts for dev/build
```

---

## CI/CD Pipeline

### IONOS SFTP (www.moonweb.org)

Defined in `.github/workflows/build-deploy-moonweb.yml`:

```
push to main
    |
    +-- Build (matrix: hub, infra, smarthome, code, retro)
    |   +-- checkout -> setup-node (22) -> npm ci
    |   +-- npm run build:<site>
    |   +-- validate dist/<site>/ exists & non-empty
    |   +-- upload artifact (7-day retention)
    |
    +-- Build timecapsule
    |   +-- cd timecapsule && npm ci
    |   +-- npm run build:timecapsule
    |   +-- upload artifact
    |
    +-- Merge
    |   +-- download all artifacts
    |   +-- merge into dist/ (hub=root, others=subdirs)
    |   +-- upload merged artifact
    |
    +-- Deploy
        +-- download merged artifact
        +-- SFTP upload to IONOS /websites/moonweb/
```

**Required secrets:**
- `IONOS_SFTP_HOST`
- `IONOS_SFTP_USER`
- `IONOS_SFTP_PASSWORD`

### IONOS SFTP (stefankoelle.de)

Defined in `.github/workflows/deploy-stefankoelle.yml`:

```
push to main (paths: stefankoelle/**)
    |
    +-- Build stefankoelle
    |   +-- npm run build:stefankoelle
    |
    +-- Deploy via SFTP
        +-- SFTP upload to IONOS /websites/stefankoelle/
```

**Required secrets:**
- `IONOS_SFTP_HOST`
- `IONOS_SFTP_USER`
- `IONOS_SFTP_PASSWORD`

---

## URL Structure

All moonweb.org sites are accessible under `www.moonweb.org` as subdirectories:

| URL | Content |
|-----|---------|
| `www.moonweb.org/` | Hub (root) |
| `www.moonweb.org/infra/` | Infrastructure |
| `www.moonweb.org/smarthome/` | Smart Home |
| `www.moonweb.org/code/` | Code catalog |
| `www.moonweb.org/retro/` | Retro hardware |
| `www.moonweb.org/timecapsule/` | 2000s time capsule |
| `www.moonweb.org/impressum/` | Legal notice |

Cloudflare redirects forward old subdomains:
- `hub.moonweb.org/*` -> `www.moonweb.org/*`
- `infra.moonweb.org/*` -> `www.moonweb.org/infra/*`
- `smarthome.moonweb.org/*` -> `www.moonweb.org/smarthome/*`
- `code.moonweb.org/*` -> `www.moonweb.org/code/*`
- `retro.moonweb.org/*` -> `www.moonweb.org/retro/*`

---

## GitHub Aggregator (www.moonweb.org/code/)

`scripts/github-aggregator/aggregate.py` automatically builds the project catalog:

1. Fetches all **public repos** from `skoelle` via GitHub API
2. Reads `.moonweb.yml` from each repo root
3. Filters for `category: code` entries
4. Sorts by subcategory + title
5. Writes combined result to `code/_data/repos.json`

### `.moonweb.yml` schema

```yaml
title: "MVG Departures"
category: code              # code | smarthome | infra
subcategory: "Web Apps"     # drives grouping on www.moonweb.org/code/
status: active
stack: [Python, FastAPI]
hosted_on: "Docker Host Debian (PVE)"
summary: "Compact MVG/S-Bahn departure monitor with configurable stations."
repo_url: "https://github.com/skoelle/mvg-departures"
```

### Manual run

```bash
export GITHUB_TOKEN=ghp_xxx
python scripts/github-aggregator/aggregate.py
```

---

## Content Rules

| Site | Detail pages? | Rule |
|------|--------------|------|
| smarthome | Yes | When enough content exists - no placeholder cards |
| infra | Rarely | Deliberately shallow - sensitive data (IPs, keys, passwords) stripped |
| code | Never | Overview cards + GitHub links only - no README duplication |
| retro | Minimal | Honest minimal overview, no over-investment |
| timecapsule | Static | 1:1 migration of original 2001 design, no changes |

**Infra redaction rule:** Architecture-level only (Proxmox, Synology, Docker, VLAN concept). No concrete IPs, WireGuard keys, passwords, internal hostnames.

---

## Language

All moonweb sites are written **entirely in English**. The timecapsule uses the original 2001 English content.

---

## Documentation

| File | Purpose |
|------|---------|
| `DESIGN.md` | Initial concept and design decisions |
| `SPEC.md` | Complete specification - what gets built |
| `PLAN.md` | Phased implementation plan |
| `TODO.md` | Open items, workflow, and current status |
| `README.md` | This file - project overview for GitHub |

---

## License

[![CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

This work is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/).

See [LICENSE](LICENSE) for the full text.
