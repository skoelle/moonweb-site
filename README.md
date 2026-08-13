# 🌙 moonweb-site

Monorepo for the **moonweb.org** homelab — five static sites built with [Eleventy](https://www.11ty.dev/), deployed to [Cloudflare Pages](https://pages.cloudflare.com/).

```
hub.moonweb.org        → 🏠 Central index & gateway
infra.moonweb.org      → 🏗️  Infrastructure overview (Proxmox, Synology, Docker)
smarthome.moonweb.org  → 🏡 Smart home projects & dashboards
code.moonweb.org       → 💻 Curated GitHub project catalog
retro.moonweb.org      → 🕹️  Physical retro hardware collection
```

> **External sites** (not in this monorepo): [stefankoelle.de](https://stefankoelle.de) (CV), [www.moonweb.org](https://www.moonweb.org) (2000s time capsule), [28k8.moonweb.org](https://28k8.moonweb.org) (90s BBS archive).

---

## 📐 Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    GitHub Actions CI                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐  │
│  │ build:hub │  │build:infra│  │build:smart│  │build:… │  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └───┬────┘  │
│       │              │              │             │        │
│       ▼              ▼              ▼             ▼        │
│  dist/hub/     dist/infra/   dist/smarthome/  dist/…/   │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
          ┌────────────────────────┐
           │   Cloudflare Workers   │
           │   (Cloudflare Workers) │
          └────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
  hub.moonweb.org  infra.moonweb.org  …
```

---

## 🛠️ Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **SSG** | [Eleventy 3.1.6](https://www.11ty.dev/) | Markdown/YAML-first, minimal JS, `_data` folders map directly to aggregator output, low maintenance for 5 sites |
| **Templates** | [Nunjucks](https://mozilla.github.io/nunjucks/) | Shared `base.njk` layout with site-switcher header, `card-grid.njk` for index pages |
| **Styling** | Custom CSS (variables-based) | `base.css` for shared layout, `theme-*.css` per domain accent color, no build step needed |
| **Fonts** | [Lobster](https://fonts.google.com/specimen/Lobster) (Google Fonts) | Distinctive heading font across all sites |
| **CI/CD** | [GitHub Actions](https://github.com/features/actions) | Matrix build for all 5 sites, artifact upload, parallel deploy |
| **Deploy** | [Cloudflare Workers](https://workers.cloudflare.com/) | Static asset hosting via `wrangler pages deploy`, one worker per site |
| **DNS** | Cloudflare | Already managing DNS — zero additional setup for Pages custom domains |
| **GitHub Catalog** | Python aggregator | Reads `.moonweb.yml` from each repo, outputs `repos.json` |
| **Runtime** | Fully static | No server-side code, no containers, no database — pure HTML/CSS/JS |

---

## 🎨 Design System

### Header-consistent, content-flexible

- **Header is identical** across all home-section sites: site-switcher (hub · infra · smarthome · code · retro · cv), domain accent color, Lobster title font.
- **Index pages** use a shared card-grid layout with grouped sections.
- **Detail pages** keep the same header but use a freer layout below it (e.g., pin tables, API docs, photos in free arrangement).

### Accent colors

| Domain | Color | Hex |
|--------|-------|-----|
| hub | Neutral blue | `#3b6ea5` |
| infra | Grey-blue | `#99333A` |
| smarthome | Teal | `#1f8a8a` |
| code | Violet | `#3E5098` |
| retro | Warm brown | `#8a6d3b` |

### Emojis

Each card on index pages has an emoji for visual navigation — consistent across hub, infra, smarthome, code, and retro.

---

## 🚀 Local Development

```bash
npm install                        # install Eleventy + deps

npm run dev:hub                    # http://localhost:8081
npm run dev:infra                  # http://localhost:8082
npm run dev:smarthome              # http://localhost:8083
npm run dev:code                   # http://localhost:8084
npm run dev:retro                  # http://localhost:8085

npm run dev                        # all 5 in parallel
```

Each site has its own minimal Eleventy config (`<site>/eleventy.config.js`). Live reload is built in.

### Build

```bash
npm run build                      # builds all 5 → dist/<site>/
npm run build:hub                  # build single site
```

---

## 📦 Project Structure

```
moonweb-site/
├── hub/                          # 🏠 Central index & gateway
├── infra/                        # 🏗️  Infra overview + 3 detail pages
│   ├── backup-strategy/
│   ├── monitoring/
│   └── dev-environment/
├── smarthome/                    # 🏡 Smart home overview + 6 detail pages
│   ├── homematic-mqtt/
│   ├── tasmota-energy/
│   ├── balkonpi/
│   ├── airplay-audio/
│   ├── octoprint/
│   └── tubearchivist/
├── code/                         # 💻 GitHub catalog
│   └── _data/repos.json          # populated by the aggregator
├── retro/                        # 🕹️  Retro hardware (WIP)
├── shared/                       # 🔧 Shared components
│   ├── _includes/
│   │   ├── base.njk              # base layout (header, site-switcher, footer)
│   │   └── card-grid.njk         # card-grid template with emoji support
│   ├── base.css                  # shared CSS (layout, cards, typography)
│   └── theme-*.css               # accent colors per domain
├── scripts/
│   └── github-aggregator/        # 🐍 Python: reads .moonweb.yml → repos.json
│       ├── aggregate.py
│       ├── example.moonweb.yml
│       └── README.md
├── .github/workflows/
│   └── build-deploy.yml          # ⚙️ CI/CD: build + deploy to Cloudflare
├── DESIGN.md                     # 📋 Initial concept (German)
├── SPEC.md                       # 📋 Full specification (English, 159 lines)
├── PLAN.md                       # 📋 Implementation plan
├── TODO.md                       # 📋 Open items & workflow
└── package.json                  # npm scripts for dev/build
```

---

## 🔄 CI/CD Pipeline

Defined in `.github/workflows/build-deploy.yml`:

```
push to main
    │
    ├── Build (matrix: hub, infra, smarthome, code, retro)
    │   ├── checkout → setup-node (22) → npm ci
    │   ├── npm run build:<site>
    │   ├── validate dist/<site>/ exists & non-empty
    │   └── upload artifact (7-day retention)
    │
    └── Deploy (matrix: 5 Cloudflare Workers)
        ├── download artifact
        ├── generate wrangler.toml
        └── wrangler pages deploy
```

**Required secrets:**
- `CLOUDFLARE_API_TOKEN` — Workers:Edit permission
- `CLOUDFLARE_ACCOUNT_ID` — Cloudflare account ID

---

## 🐍 GitHub Aggregator (code.moonweb.org)

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
subcategory: "Web Apps"     # drives grouping on code.moonweb.org
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

> **Deliberately manual** — no scheduled CI job. The catalog is refreshed on demand, not on every push.

---

## 📏 Content Rules

| Site | Detail pages? | Rule |
|------|--------------|------|
| smarthome | ✅ Yes | When enough content exists — no placeholder cards |
| infra | ⚠️ Rarely | Deliberately shallow — sensitive data (IPs, keys, passwords) stripped |
| code | ❌ Never | Overview cards + GitHub links only — no README duplication |
| retro | 🔨 Minimal | Still WIP — honest minimal overview, no over-investment |

**Infra redaction rule:** Architecture-level only (Proxmox, Synology, Docker, VLAN concept). No concrete IPs, WireGuard keys, passwords, internal hostnames.

---

## 🌍 Language

All five sites are written **entirely in English**. German source documents are translated once during migration (AI-assisted). New content is authored in English from the start.

---

## 📚 Documentation

| File | Purpose |
|------|---------|
| `DESIGN.md` | Initial concept and design decisions (German) |
| `SPEC.md` | Complete specification — what gets built (English) |
| `PLAN.md` | Phased implementation plan |
| `TODO.md` | Open items, workflow, and current status |
| `README.md` | This file — project overview for GitHub |

---

## 📄 License

[![CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

This work is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/).

See [LICENSE](LICENSE) for the full text.
