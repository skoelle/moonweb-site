# moonweb.org — Specification

Status: Migration complete. All sites live under `www.moonweb.org` as subdirectories, deployed via IONOS SFTP.

## 1. Purpose

A personal homelab hub consisting of a central index (`hub` at root) and several themed static sites, all served under `www.moonweb.org` as subdirectories. The old timecapsule content (2001 design) is preserved under `/timecapsule/`. cv (stefankoelle.de) remains external, linked from the hub and site-switcher.

## 2. Sitemap

```
moonweb-site (monorepo)
├── hub/         → www.moonweb.org/           Central index & gateway
├── infra/       → www.moonweb.org/infra/     System architecture / stack overview
├── smarthome/   → www.moonweb.org/smarthome/ What the homelab actually runs, and why
├── code/        → www.moonweb.org/code/      Curated GitHub catalog
├── retro/       → www.moonweb.org/retro/     Physical retro hardware collection
├── timecapsule/ → www.moonweb.org/timecapsule/ 2001-era internet time capsule
└── stefankoelle/→ stefankoelle.de            CV, career, personal site (SFTP deploy)

outside the monorepo, untouched:
├── 28k8.moonweb.org         90s BBS/scene archive
├── buildbroken.moonweb.org  .NET Open Space blog archive
```

Old subdomain redirects (via Cloudflare):
- `hub.moonweb.org/*` → `www.moonweb.org/*`
- `infra.moonweb.org/*` → `www.moonweb.org/infra/*`
- `smarthome.moonweb.org/*` → `www.moonweb.org/smarthome/*`
- `code.moonweb.org/*` → `www.moonweb.org/code/*`
- `retro.moonweb.org/*` → `www.moonweb.org/retro/*`

## 3. Domain purposes

| Domain | URL | Purpose | Tone |
|---|---|---|---|
| hub | `/` | Gateway, links to everything, one-line description per destination | Minimal |
| infra | `/infra/` | Shallow, structured overview of the stack: Proxmox, Synology, VLANs, Docker hosting, dev environment | Reference, high-level only |
| smarthome | `/smarthome/` | Why the homelab exists — sensors, automation, calendar/contacts sync, dashboards, media | Project storytelling |
| code | `/code/` | Curated, sorted GitHub catalog — overview only, always linking out to GitHub | Portfolio |
| retro | `/retro/` | Physical retro hardware collection (not software/demos — that's 28k8's domain) | Simple, factual |
| timecapsule | `/timecapsule/` | Original www.moonweb.org content from 2001, preserved as-is | Retro 2001 design |

## 4. Design system

### 4.1 Header-consistent, content-flexible principle

- **Header is identical** across all sites: site-switcher (home · infra · smarthome · code · retro · cv), section title (`moonweb.org` or `moonweb.org/smarthome`), domain accent color.
- **Overview (index) pages** use a shared card-grid layout (clean card-grid with banner header, grouped card sections, sans-serif, generous whitespace, light theme only, no heavy JS).
- **Detail/sub-pages** keep the same header but may use a freer layout below it.

Note: stefankoelle.de uses its own independent design — it does not follow this header-consistent principle.

### 4.2 Accent colors per domain

| Domain | Accent | Implementation |
|---|---|---|
| hub | Neutral blue (#3b6ea5) | Inlined `<style>` in base.njk |
| infra | Red (#99333A) | Inlined `<style>` in base.njk |
| smarthome | Teal (#1f8a8a) | Inlined `<style>` in base.njk |
| code | Violet (#3E5098) | Inlined `<style>` in base.njk |
| retro | Brown (#8a6d3b) | Inlined `<style>` in base.njk |

### 4.3 URL convention

`/section/slug/` — lowercase, hyphenated, trailing slash. All sites share a single Eleventy build with computed `pathPrefix` per section.

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

This rule applies to any domain but is most relevant for infra, since the source documents currently contain real IPs and keys that must be actively stripped during migration.

## 7. Language

All sites in the monorepo are written **entirely in English**. Existing German source documents are translated once during migration via a single AI-assisted pass — not a recurring process. New `.moonweb.yml` metadata and generated content are authored in English from the start.

## 8. GitHub automation (www.moonweb.org/code/)

Each GitHub project repo gets a `.moonweb.yml` in its root:

```yaml
title: "MVG Departures"
category: code          # code | smarthome | infra
subcategory: "Web Apps" # drives grouping on www.moonweb.org/code/
status: active
stack: [Python, FastAPI]
hosted_on: "Docker Host Debian (PVE)"
summary: "Compact MVG/S-Bahn departure monitor with configurable stations."
repo_url: "https://github.com/skoelle/mvg-departures"
```

A local aggregator script reads `.moonweb.yml` from all repos via the GitHub API, and the result is committed into `_data/repos.json` inside the monorepo. This runs manually, on demand — no scheduled automation for now.

## 9. Content maintenance

- infra, smarthome, retro, stefankoelle: **fully manual**, edited in vim, committed via git push. No automation.
- code: the only automated piece is the GitHub aggregator described in §8.
- No "last updated" timestamps are shown anywhere — the goal is that content is simply kept current, not that staleness is displayed.
- No analytics/tracking of any kind on any site.
- Images/assets live versioned directly in the monorepo (no external asset host).

## 10. Repository structure

```
moonweb-site/
├── hub/                    # Index + Redirects (.htm) + impressum.njk
├── infra/                  # Index.njk + 8 Subseiten
├── smarthome/              # Index.njk + 9 Subseiten
├── code/                   # Index.njk
├── retro/                  # Index.njk + 13 Subseiten
├── timecapsule/            # Eleventy 2.x (eigene Config)
│   ├── eleventy.config.js
│   ├── package.json
│   └── src/
├── stefankoelle/           # Eleventy-Config + Onepager
│   ├── eleventy.config.js
│   ├── index.njk
│   ├── cv-print.njk
│   ├── ledmatrix/
│   └── assets/
├── shared/                 # Shared components
│   ├── _includes/
│   │   ├── base.njk        # base layout (header, site-switcher, footer)
│   │   ├── card-grid.njk   # card-grid template
│   │   └── sitemap.njk     # central sitemap template
│   ├── base.css            # shared CSS
│   └── favicon/            # favicon SVGs per section
├── _data/
│   └── repos.json          # populated by the GitHub aggregator
├── scripts/
│   ├── github-aggregator/  # reads .moonweb.yml from all repos
│   └── cloudflare/         # redirect setup for old subdomains
├── .github/workflows/
│   ├── build-deploy-moonweb.yml   # builds all moonweb sites, deploys to IONOS SFTP
│   └── deploy-stefankoelle.yml    # builds stefankoelle, deploys via IONOS SFTP
├── eleventy.config.js      # single Eleventy config for all moonweb sites
├── .eleventyignore         # excludes stefankoelle/, timecapsule/
├── DESIGN.md
├── SPEC.md
├── PLAN.md
├── TODO.md
└── package.json
```

## 11. Technical stack

- **Static site generator:** Eleventy (11ty) v3.1.6 — single config at root, computed `pathPrefix` per section, per-section collections.
- **Static site generator (timecapsule):** Eleventy v2.0.1 — separate config, preserves original 2001 design.
- **Templates:** Nunjucks (.njk) — shared `base.njk` layout, `card-grid.njk` for index pages, `sitemap.njk` for central sitemap.
- **Styling:** Custom CSS (`base.css`) with accent colors inlined as `<style>` in `base.njk`. No per-site theme CSS files.
- **Build:** entirely in GitHub Actions.
- **Deploy:** IONOS SFTP — all sites deployed to `/websites/moonweb/`, stefankoelle.de to `/websites/stefankoelle/`.
- **DNS:** Cloudflare — DNS management + redirects from old subdomains (hub.moonweb.org, etc.).
- **Runtime:** fully static, no server-side code, no containers for the website itself.
- **Local preview:** Eleventy's built-in dev server with live reload (`npm run dev` for all moonweb sites, `npm run dev:stefankoelle`, `npm run dev:timecapsule`).

## 12. Explicitly out of scope

- Migrating 28k8.moonweb.org into the monorepo — undecided, revisit later, likely never.
- Any Perplexity-backchannel mechanism — deferred.
- Analytics of any kind.
- Automated content generation/translation pipelines beyond the one-time GitHub aggregator for code.
