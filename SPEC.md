# moonweb.org — Specification

Status: Concept finalized. This document defines *what* gets built. See `PLAN.md` for *how and in what order*.

## 1. Purpose

A personal homelab hub consisting of a central index (`hub`) and several themed static sites, replacing the current unstructured presentation of infrastructure, smart home projects, and GitHub repos. cv (stefankoelle.de) remains external, linked from the hub and site-switcher.

## 2. Sitemap

```
moonweb-site (monorepo)
├── hub/         → hub.moonweb.org        Central index & gateway
├── infra/       → infra.moonweb.org      System architecture / stack overview
├── smarthome/   → smarthome.moonweb.org  What the homelab actually runs, and why
├── code/        → code.moonweb.org       Curated GitHub catalog
├── retro/       → retro.moonweb.org      Physical retro hardware collection
└── stefankoelle/→ stefankoelle.de        CV, career, personal site (SFTP deploy)

outside the monorepo, untouched:
├── www.moonweb.org          finished, no overlap (2001-style internet time capsule)
├── 28k8.moonweb.org         90s BBS/scene archive, separate approach, may migrate later (undecided)

```

Apex domain `moonweb.org` currently redirects to `www.moonweb.org`. This stays as-is for now; a later redirect to `hub.moonweb.org` is possible but out of scope for this build.

## 3. Domain purposes

| Domain | Purpose | Tone |
|---|---|---|
| hub | Gateway, links to everything, one-line description per destination | Minimal |
| infra | Shallow, structured overview of the stack: Proxmox (PVE + pve2), Synology DS918+, VLANs, Fritz!Box mesh, SSO, plus how I work (OpenCode/OpenClaw dev environment) | Reference, high-level only |
| smarthome | Why the homelab exists — what's actually running on the homelab as smart home: sensors, automation, calendar/contacts sync, dashboards, media | Project storytelling |
| code | Curated, sorted GitHub catalog — overview only, always linking out to GitHub | Portfolio |
| retro | Physical retro hardware collection (not software/demos — that's 28k8's domain) | Simple, factual |

## 4. Design system

### 4.1 Header-consistent, content-flexible principle

- **Header is identical** across infra/smarthome/code/retro: site-switcher (hub · infra · smarthome · code · retro), domain accent color, consistent branding.
- **Overview (index) pages** use a shared card-grid layout (reference: clean card-grid layout with banner header, grouped card sections, sans-serif, generous whitespace, light theme only, no heavy JS).
- **Detail/sub-pages** keep the same header but may use a freer layout below it (reference: `/ledmatrix/` on stefankoelle.de today — pin tables, API docs, photos in free layout instead of a rigid card grid).

Note: stefankoelle.de is now part of the monorepo but uses its own independent design — it does not follow this header-consistent principle.

### 4.2 Accent colors per domain

| Domain | Accent |
|---|---|
| hub | Neutral blue |
| infra | Grey-blue |
| smarthome | Teal |
| code | Violet |
| retro | Own accent, still clean card-grid (no 90s styling — that belongs to 28k8) |

### 4.3 URL convention

`domain/slug/` — lowercase, hyphenated, trailing slash, matching the existing stefankoelle.de pattern (e.g. `/ledmatrix/`) so future detail pages stay consistent even if content later migrates between sites.

## 5. Content depth rules (per domain)

| Domain | Detail pages? | Rule |
|---|---|---|
| smarthome | Yes, when there's enough content | Index shows how the smart home is structured; a topic gets a detail page immediately if enough data exists — otherwise it's mentioned in the overview only, no placeholder required |
| code | Never | Overview cards + link to GitHub only. No duplicating README content. |
| infra | Rarely | Deliberately shallow — most of the raw material is sensitive (see §6) |
| retro | Yes, but minimal | Topic is still immature; create only a rudimentary overview, don't over-invest time |

General rule across all domains: **if content is too thin for a good detail page, skip the detail page — don't create a placeholder.**

## 6. Infra content redaction rule

Because infra must stay shallow and public-safe:

- **Allowed:** architecture level — Proxmox + Synology + Docker host, VLAN concept without concrete internal IP plans, which service types run, which tools are used.
- **Not allowed:** concrete IP addresses, WireGuard keys/preshared keys, passwords, internal hostnames that allow inference, backup targets with credentials.

This rule applies to any domain but is most relevant for infra, since the source documents (e.g. Heimnetzwerk-Final-v3.2, GL_Flint2_Final_v2) currently contain real IPs and keys that must be actively stripped during migration.

## 7. Language

All sites in the monorepo are written **entirely in English**. Existing German source documents are translated once during migration via a single AI-assisted pass — not a recurring process. New `.moonweb.yml` metadata and generated content are authored in English from the start.

## 8. GitHub automation (code.moonweb.org)

Each GitHub project repo gets a `.moonweb.yml` in its root:

```yaml
title: "MVG Departures"
category: code          # code | smarthome | infra
subcategory: "Web Apps" # drives grouping on code.moonweb.org
status: active
stack: [Python, FastAPI]
hosted_on: "Docker Host Debian (PVE)"
summary: "Compact MVG/S-Bahn departure monitor with configurable stations."
repo_url: "https://github.com/skoelle/mvg-departures"
```

A local aggregator script reads `.moonweb.yml` from all repos via the GitHub API, an AI pass turns the raw YAML into readable card copy, and the result is committed into `code/_data/repos.json` inside the monorepo. This runs manually, on demand — no scheduled automation for now.

## 9. Content maintenance

- infra, smarthome, retro, stefankoelle: **fully manual**, edited in vim, committed via git push. No automation.
- code: the only automated piece is the GitHub aggregator described in §8.
- No "last updated" timestamps are shown anywhere — the goal is that content is simply kept current, not that staleness is displayed.
- No analytics/tracking of any kind on any site.
- Images/assets live versioned directly in the monorepo (no external asset host).

## 10. Repository structure

```
moonweb-site/
├── hub/
├── infra/
├── smarthome/
├── code/
│   └── _data/repos.json     # populated by the GitHub aggregator
├── retro/
├── stefankoelle/            # CV, career, personal site
│   ├── eleventy.config.js
│   ├── index.njk            # Onepager (CV, Projects, Languages)
│   ├── cv-print.njk         # CV-only for PDF generation
│   ├── ledmatrix/           # LED Matrix WebServer documentation
│   └── assets/              # CSS, JS, images, favicons
├── shared/
│   ├── _includes/
│   │   ├── base.njk          # shared header + footer layout
│   │   └── card-grid.njk     # card-grid template
│   ├── base.css              # shared CSS variables and layout
│   └── theme-*.css           # one accent color file per domain
├── scripts/
│   └── github-aggregator/    # reads .moonweb.yml from all repos
├── DESIGN.md                 # initial concept and design decisions
├── SPEC.md                   # what gets built (this document)
├── PLAN.md                   # how and in what order
├── TODO.md                   # open items and workflow
└── .github/workflows/
    ├── build-deploy.yml      # builds all sites, deploys to Cloudflare Pages
    └── deploy-stefankoelle.yml # builds stefankoelle, deploys via IONOS SFTP
```

## 11. Technical stack

- **Static site generator:** Eleventy (11ty) — markdown/YAML-first, minimal JS, `_data` folders map directly onto the `.moonweb.yml` aggregator output, low maintenance for five sites at this scale.
- **Build:** entirely in GitHub Actions.
- **Deploy:** Cloudflare Pages — five separate Pages projects (one per public domain: hub, infra, smarthome, code, retro), since Cloudflare Pages binds one custom-domain set per project. stefankoelle.de deploys via IONOS SFTP. Two GitHub Actions workflows handle deployment.
- **Runtime:** fully static, no server-side code, no containers for the website itself (distinct from the actual homelab services running on the Docker host).
- **DNS:** already on Cloudflare — no additional setup step needed for Pages custom domains.
- **Local preview:** Eleventy's built-in dev server with live reload, run per-site (`npm run dev:<site>`) before any commit.

## 12. Explicitly out of scope for this build

- Migrating 28k8.moonweb.org into the monorepo — undecided, revisit later, likely never.
- Any Perplexity-backchannel mechanism (website content reusable inside this project) — deferred, no time invested now.
- Analytics of any kind.
- Automated content generation/translation pipelines beyond the one-time GitHub aggregator for code and the one-time translation pass during migration.
