# TODO: Consolidation zu www.moonweb.org

## Uebersicht

Alle moonweb.org Sites (hub, infra, smarthome, code, retro, timecapsule) unter `www.moonweb.org` als Subverzeichnisse vereinen. Deployment von Cloudflare Pages zu IONOS SFTP migrieren.

**URL-Struktur nach Migration:**
| URL | Inhalt |
|-----|--------|
| `www.moonweb.org/` | Hub (neue Root) |
| `www.moonweb.org/infra/` | Infra |
| `www.moonweb.org/smarthome/` | Smarthome |
| `www.moonweb.org/code/` | Code |
| `www.moonweb.org/retro/` | Retro |
| `www.moonweb.org/timecapsule/` | Altes www (2001-Retro) |
| `stefankoelle.de/` | CV (bleibt separat) |

---

## Phase 1: Timecapsule in Monorepo integrieren

- [x] 1.1 Dateien aus ../moonweb-www/src/ nach timecapsule/src/ kopieren
- [x] 1.2 timecapsule/eleventy.config.js erstellen (Eleventy 2.x)
- [x] 1.3 timecapsule/package.json erstellen (eigene Dependencies)
- [x] 1.4 timecapsule/src/_data/site.json anpassen (Domain mit /timecapsule/)
- [x] 1.5 Alle internen Pfade mit /timecapsule/ prefixieren
- [x] 1.6 Passthrough Copy in eleventy.config.js anpassen
- [x] 1.7 Build-Output pruefen (dist/timecapsule/)

## Phase 2: Eleventy-Configs aller Sites anpassen

- [x] 2.1 hub/eleventy.config.js: site.url auf www.moonweb.org
- [x] 2.2 infra/eleventy.config.js: site.url auf www.moonweb.org
- [x] 2.3 smarthome/eleventy.config.js: site.url auf www.moonweb.org
- [x] 2.4 code/eleventy.config.js: site.url auf www.moonweb.org
- [x] 2.5 retro/eleventy.config.js: site.url auf www.moonweb.org
- [x] 2.6 shared/_includes/base.njk anpassen
- [x] 2.7 hub/index.njk: Card-Hrefs relativieren
- [x] 2.8 hub/impressum.njk: Domain-Liste aktualisieren

## Phase 3: Build-System anpassen

- [x] 3.1 package.json: Neue Scripts fuer timecapsule + merge
- [x] 3.2 scripts/merge-moonweb.sh erstellen
- [x] 3.3 Lokal Build testen (alle Sites)

## Phase 4: Deployment umstellen

- [x] 4.1 Neuen Workflow .github/workflows/build-deploy-moonweb.yml erstellen
- [x] 4.2 Alten Workflow .github/workflows/build-deploy.yml entfernen
- [ ] 4.3 Alten deploy-moonweb.yml in moonweb-www deaktivieren

## Phase 5: Cloudflare Redirects

- [x] 5.1 Redirect-Regeln einrichten (via GitHub Action)

| Quell-Domain | Ziel-URL | Type |
|-------------|----------|------|
| `hub.moonweb.org/*` | `https://www.moonweb.org/$1` | 301 |
| `infra.moonweb.org/*` | `https://www.moonweb.org/infra/$1` | 301 |
| `smarthome.moonweb.org/*` | `https://www.moonweb.org/smarthome/$1` | 301 |
| `code.moonweb.org/*` | `https://www.moonweb.org/code/$1` | 301 |
| `retro.moonweb.org/*` | `https://www.moonweb.org/retro/$1` | 301 |

**Umsetzung:** `scripts/cloudflare/setup-redirects.sh` + GitHub Action `cloudflare-redirects.yml`
**Benötigte Secrets:** `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ZONE_ID`

## Phase 6: SEO

- [ ] 6.1 Google Search Console: Neue Property www.moonweb.org
- [ ] 6.2 Sitemap submiten

## Phase 7: Cleanup

- [ ] 7.1 moonweb-www Repository archivieren
- [ ] 7.2 Cloudflare Pages Projects loeschen (nach Redirect-Test)

---

## Abgeschlossen

Alle Code-Aenderungen sind fertig. Nächste Schritte:
1. Commit auf feature/consolidate-www Branch
2. Push und PR erstellen
3. Deployen
4. Cloudflare Redirects einrichten
5. Google Search Console aktualisieren
