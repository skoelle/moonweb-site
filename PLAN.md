# moonweb.org — Implementation Plan

Companion to `SPEC.md`. Documents the completed migration from separate subdomain sites to a unified `www.moonweb.org` subdirectory structure.

## Phase 0 — Repo & tooling setup

1. Created the `moonweb-site` monorepo.
2. Initialized Eleventy project structure per `SPEC.md §10`.
3. Set up `shared/_includes/base.njk` (header + card-grid) with accent colors inlined.
4. Verified local dev server works per site.

## Phase 1 — Content migration & authoring (per domain)

1. **code** — GitHub aggregator, `_data/repos.json`, overview page grouped by subcategory.
2. **smarthome** — overview + detail pages where content exists.
3. **infra** — shallow overview with redaction pass (no IPs, keys, passwords).
4. **retro** — minimal overview with WIP notices.
5. **hub** — central index linking all sites, including redirect `.htm` files for old www.moonweb.org paths.
6. **timecapsule** — integrated from moonweb-www, preserves original 2001 design under `/timecapsule/`.

## Phase 2 — CI/CD

1. GitHub Actions workflow `build-deploy-moonweb.yml`: single Eleventy build for all moonweb sites + timecapsule build, deploy via IONOS SFTP.
2. GitHub Actions workflow `deploy-stefankoelle.yml`: stefankoelle.de build, deploy via IONOS SFTP.
3. Cloudflare redirect rules for old subdomains (`scripts/cloudflare/`).

## Phase 3 — Consolidation to www.moonweb.org

All moonweb.org sites now live under `www.moonweb.org` as subdirectories:

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
- `hub.moonweb.org/*` → `www.moonweb.org/*`
- `infra.moonweb.org/*` → `www.moonweb.org/infra/*`
- `smarthome.moonweb.org/*` → `www.moonweb.org/smarthome/*`
- `code.moonweb.org/*` → `www.moonweb.org/code/*`
- `retro.moonweb.org/*` → `www.moonweb.org/retro/*`

### Technical consolidation

- Single `eleventy.config.js` at root with computed `pathPrefix` per section.
- Shared `base.njk` layout with inlined accent colors (no per-site theme CSS).
- Central `_data/repos.json` (moved from `code/_data/`).
- Central sitemap (`shared/_includes/sitemap.njk`) with all 36 pages.
- Single `robots.txt` at root.
- `.eleventyignore` excludes `stefankoelle/` and `timecapsule/` (built separately).
- `build-pdf.sh` temporarily renames `.eleventyignore` for stefankoelle build.

## Definition of done — Achieved

- All sites live under `www.moonweb.org` as subdirectories, deployed via IONOS SFTP.
- `www.moonweb.org/code/` reflects the current GitHub repos via the `.moonweb.yml` aggregator.
- `www.moonweb.org/smarthome/` gives an accurate picture of what's running on the homelab.
- `www.moonweb.org/infra/` describes the stack shallowly with zero sensitive data leaked.
- `www.moonweb.org/retro/` exists with an honest, minimal overview.
- `www.moonweb.org/` correctly links everything.
- `stefankoelle.de` is a working onepager with CV, Projects, Languages, Impressum, and LED Matrix documentation.
- Old subdomains redirect via Cloudflare to new paths.
- Old www.moonweb.org content preserved under `/timecapsule/`.

## Remaining items

- Cloudflare redirect rules need activation (script ready, needs `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ZONE_ID` secrets, or manual dashboard setup).
- Google Search Console: new property `www.moonweb.org` not yet created.
- `moonweb-www` repository not yet archived.
