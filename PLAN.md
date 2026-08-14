# moonweb.org — Implementation Plan

Companion to `SPEC.md`. Defines order of work. All sites (hub, infra, smarthome, code, retro, stefankoelle) launch **simultaneously** — no staged rollout by domain.

## Phase 0 — Repo & tooling setup

1. Create the `moonweb-site` monorepo (private until first launch, then can stay private since Pages deploys the built output, not the source).
2. Initialize Eleventy project structure per `SPEC.md §10`.
3. Set up `shared/layout-base.njk` (header + card-grid) and one `theme-*.css` per accent color (hub, infra, smarthome, code, retro).
4. Verify local dev server works per site (`npm run dev:<site>`) before any content work starts.

## Phase 1 — Content migration & authoring (per domain)

Work order within this phase is flexible since all domains launch together; suggested sequence based on how self-contained each domain's content is:

1. **code** — simplest case, no detail pages, no sensitive-data filtering needed.
   - Add `.moonweb.yml` to each GitHub repo (see `SPEC.md §8`).
   - Build the aggregator script, run it once, generate `code/_data/repos.json`.
   - Build the overview page grouped by subcategory (Automation & Sync, Dev-Tools, Web Apps, Firmware/Hardware, Misc).
2. **smarthome** — overview first, detail pages only where content already exists.
   - Draft the overview: how the smart home is structured (buttons/control, sensors, calendar, weather, media).
   - For each existing topic with enough material (HomematicIP/MQTT, Tasmota, LED-Matrix *reference only, no migration*, M5Stack/WT32SC01 dashboards, WetterAPI, AirPlay, OctoPi, TubeArchivist), decide case by case: enough content → detail page; too thin → mention in overview only, no placeholder.
   - Translate source material to English during authoring (one-time AI pass per document, per `SPEC.md §7`).
3. **infra** — overview only, redaction pass required.
   - Draft a shallow, structured overview: Proxmox/pve2, Synology, VLANs, Fritz!Box mesh, SSO, Docker hosting model, plus the "how I work" section (OpenClaw/OpenCode setup, dev workflow).
   - Apply the redaction rule from `SPEC.md §6` while translating — strip IPs, keys, credentials, internal hostnames from every source document before it becomes public content.
   - Skip detail pages unless a topic can be described without any sensitive detail.
4. **retro** — minimal effort, rudimentary only.
   - One overview page listing what hardware exists.
   - Add "work in progress" notices for anything that isn't ready — better an honest short page than none.
5. **hub** — build last within this phase since it links to all the others.
   - One-line description + link per destination (infra, smarthome, code, retro, stefankoelle, and external links to www.moonweb.org, 28k8.moonweb.org).

## Phase 2 — CI/CD

1. Write `.github/workflows/build-deploy.yml`: builds all five sites in one job (or matrix), then deploys each output folder to its corresponding Cloudflare Pages project via `wrangler pages deploy`.
2. Create five Cloudflare Pages projects (hub, infra, smarthome, code, retro), each bound to its target custom domain (DNS already on Cloudflare, no extra setup needed).
3. Do one full dry run per site locally before the first real deploy.

## Phase 3 — Launch

1. Deploy all five sites simultaneously.
2. Point the respective custom domains at their Pages projects.
3. Apex domain `moonweb.org` keeps redirecting to `www.moonweb.org` for now (no change in this launch).
4. Smoke-test cross-linking: hub → each site, site-switcher on infra/smarthome/code/retro, smarthome → external ledmatrix link, code cards → GitHub links.

## Phase 4 — Explicitly deferred (not part of this build)

- Deciding on 28k8.moonweb.org's future (stay separate vs. eventual monorepo inclusion).
- Building any Perplexity-backchannel mechanism for reusing published site content in this project.
- Redirecting the apex domain from `www.moonweb.org` to `hub.moonweb.org`.
- Any analytics, "last updated" timestamps, or scheduled/automated content generation beyond the one-time GitHub aggregator run.

## Definition of done for this build

- All sites live on their respective platforms:
  - hub, infra, smarthome, code, retro on Cloudflare Pages under their intended domains.
  - stefankoelle.de on IONOS via SFTP deployment.
- code.moonweb.org reflects the current GitHub repos via the `.moonweb.yml` aggregator, grouped by subcategory.
- smarthome.moonweb.org gives an accurate picture of what's running on the homelab today, with detail pages only where content already existed.
- infra.moonweb.org describes the stack shallowly with zero sensitive data leaked.
- retro.moonweb.org exists with an honest, minimal overview (WIP notices allowed).
- hub.moonweb.org correctly links everything, including the external sites (www.moonweb.org, 28k8.moonweb.org).
- stefankoelle.de is a working onepager with CV, Projects, Languages, Impressum, and the LED Matrix documentation sub-page.
