# TODO: moonweb-site

## Status: Consolidation Complete

All moonweb.org sites are consolidated under `www.moonweb.org` as subdirectories, deployed via IONOS SFTP. PR #3 merged to main.

---

## Completed

### Phase 1: Timecapsule Integration
- [x] Copy files from moonweb-www/src/ to timecapsule/src/
- [x] Create timecapsule/eleventy.config.js (Eleventy 2.x)
- [x] Create timecapsule/package.json (own dependencies)
- [x] Adapt timecapsule internal paths with /timecapsule/ prefix

### Phase 2: Single Eleventy Config
- [x] Create root eleventy.config.js with computed pathPrefix per section
- [x] Delete 5 per-site eleventy.config.js files (hub, infra, smarthome, code, retro)
- [x] Delete scripts/merge-moonweb.sh
- [x] Update shared/_includes/base.njk (inlined accent colors, root CSS path)
- [x] Update hub/index.njk card hrefs (relative paths)
- [x] Update hub/impressum.njk (hosting sections correct)
- [x] Update parent values in detail pages to include section prefix
- [x] Add tags to all pages for Eleventy collections

### Phase 3: Build & Deploy
- [x] Create .github/workflows/build-deploy-moonweb.yml (single build job, SFTP deploy)
- [x] Delete old build-deploy.yml (matrix builds)
- [x] Update .eleventyignore (exclude stefankoelle/, timecapsule/, markdown)
- [x] Fix build-pdf.sh to temporarily rename .eleventyignore for stefankoelle build
- [x] Fix timecapsule build path (../dist/ not ../../dist/)

### Phase 4: Redirects & SEO
- [x] Create 20 redirect .htm files in hub/ for old www.moonweb.org paths
- [x] Create central sitemap.xml (36 pages)
- [x] Create single robots.txt at root
- [x] Set up Cloudflare redirect rules script (scripts/cloudflare/)

### Phase 5: Bug Fixes
- [x] Fix card links on index pages (add section prefix to local hrefs)
- [x] Fix code repos missing (move repos.json to root _data/)
- [x] Fix favicons (use section-specific favicon.svg per site)
- [x] Fix header (show moonweb.org/smarthome instead of smarthome.moonweb.org)
- [x] Rename hub link to home in site-switcher nav
- [x] Remove redundant 404 pages, keep only root 404
- [x] Add missing beginning subpage redirects (news, report, sitemap)
- [x] Fix double-slash URLs in stefankoelle/index.njk
- [x] Remove unused theme-*.css files
- [x] Update stefankoelle link texts (replace old subdomain names with new paths)

### Phase 6: Documentation
- [x] Update AGENTS.md for new structure
- [x] Update README.md for new structure
- [x] Update SPEC.md for new structure
- [x] Update PLAN.md for new structure

---

## Remaining

### Cloudflare Redirects
- [ ] Activate redirect rules (needs `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ZONE_ID` secrets, or manual dashboard setup)
- [ ] Verify redirects work after activation

### SEO
- [ ] Create Google Search Console property for www.moonweb.org
- [ ] Submit sitemap

### Cleanup
- [ ] Archive moonweb-www repository
- [ ] Delete Cloudflare Pages projects (after redirect verification)

### Future
- [ ] Cross-linking stefankoelle.de <-> smarthome
- [ ] Consider moving LED Matrix to smarthome (when ready)
