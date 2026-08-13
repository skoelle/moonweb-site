# moonweb-site

Monorepo for hub.moonweb.org, infra.moonweb.org, smarthome.moonweb.org,
code.moonweb.org and retro.moonweb.org. cv (stefankoelle.de) stays external
(Cloudflare Free-Tier limits to 5 Pages projects per repository).

See `SPEC.md` for the full specification and `PLAN.md` for the phased
implementation plan. Cloudflare Free-Tier limits to 5 Pages projects per
repository — cv (stefankoelle.de) stays external.

## What is real vs. placeholder

- Structure, layouts, themes, Eleventy configs, CI workflow: fully implemented.
- `code/_data/repos.json`: populated with real data pulled from the
  `skoelle` GitHub account (public repos only, private repos like
  `wetterapi` intentionally excluded from the public catalog).
- `infra/`, `smarthome/`: overview pages and detail pages with real content,
  redacted per SPEC.md §6.
- `retro/`: intentionally minimal, per SPEC.md §5.

Note: stefankoelle.de (CV) is hosted separately and linked from the hub
and site-switcher — it is not part of this monorepo (Cloudflare Free-Tier
limits to 5 Pages projects per repository).

## Local development

Each site has its own minimal Eleventy config so you can preview one site
at a time:

```bash
npm install
npm run dev:hub          # http://localhost:8081
npm run dev:infra        # http://localhost:8082
npm run dev:smarthome    # http://localhost:8083
npm run dev:code         # http://localhost:8084
npm run dev:retro        # http://localhost:8085
```

## Build

```bash
npm run build   # builds all five Eleventy sites into dist/<site>/
```

## Deploy

Handled entirely by `.github/workflows/build-deploy.yml` on push to `main`:
builds all sites, then deploys each `dist/<site>` folder to its own
Cloudflare Pages project via `wrangler pages deploy`. See the workflow
file for the required repo secrets.

Note: Cloudflare Free-Tier limits to 5 Pages projects per repository —
cv (stefankoelle.de) stays external.

## GitHub aggregator (code.moonweb.org)

`scripts/github-aggregator/aggregate.py` reads a `.moonweb.yml` file from
each of your GitHub repos and regenerates `code/_data/repos.json`. Run it
manually whenever you want to refresh the catalog — see SPEC.md §8 for the
`.moonweb.yml` schema. It is *not* wired into CI; this is a deliberate,
manual step. cv (stefankoelle.de) is not included in this automation.
