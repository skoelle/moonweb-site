# AGENTS.md — moonweb-site

## Projektuebersicht

Monorepo fuer 6 statische Websites unter www.moonweb.org + stefankoelle.de, basierend auf Eleventy (11ty).

### Websites (IONOS SFTP)

| Site | URL | Zweck | Status |
|------|-----|-------|--------|
| hub | www.moonweb.org/ | Zentrale Indexseite, verlinkt alles | Fertig |
| infra | www.moonweb.org/infra/ | Infrastruktur-Uebersicht (Proxmox, Synology, Netzwerk) | Uebersicht + 8 Detailseiten |
| smarthome | www.moonweb.org/smarthome/ | Smart Home Projekte und Dashboards | Uebersicht + 9 Detailseiten |
| code | www.moonweb.org/code/ | GitHub-Projekte (aggregiert via .moonweb.yml) | Fertig |
| retro | www.moonweb.org/retro/ | Physische Retro-Hardware | Uebersicht + 13 Detailseiten |
| timecapsule | www.moonweb.org/timecapsule/ | 2000er Internet-Zeitkapsel (altes Design) | Fertig |

### Externe Sites (SFTP-Deployment)

| Site | Domain | Zweck | Status |
|------|--------|-------|--------|
| stefankoelle | stefankoelle.de | Lebenslauf, Kontakt, Projekte | Onepager + LED-Matrix-Detailseite |

### Andere Sites (nicht im Monorepo)

- 28k8.moonweb.org — 90er BBS/Scene-Archiv
- buildbroken.moonweb.org — .NET Open Space Blog Archiv

## Dateistruktur

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
│   └── src/                # 2001er Retro-Content
├── stefankoelle/           # Eleventy-Config + Onepager
│   ├── eleventy.config.js
│   ├── _includes/
│   │   ├── stefankoelle.njk    # Layout (Header, Nav, Footer)
│   │   └── cv-content.njk      # CV-Partial (zentral fuer Web + PDF)
│   ├── index.njk               # Onepager (alle Sections)
│   ├── cv-print.njk            # CV-only fuer spaeteren PDF-Druck
│   ├── assets/                 # CSS, JS, Bilder, Favicons
│   ├── ledmatrix/              # LED Matrix WebServer Dokumentation
│   └── pdf/                    # PDF-CSS (fuer spaeteren WeasyPrint-Bau)
├── shared/                 # Gemeinsame Komponenten
│   ├── _includes/
│   │   ├── base.njk        # Basis-Layout (Header, Site-Switcher, Footer)
│   │   ├── card-grid.njk   # Card-Grid Template
│   │   └── sitemap.njk     # Zentrale Sitemap
│   ├── base.css             # Shared CSS (Layout, Cards, Typografie)
│   └── favicon/             # Favicon-SVGs pro Section
├── _data/
│   └── repos.json           # GitHub-Aggregator Output
├── scripts/
│   ├── github-aggregator/   # Python: liest .moonweb.yml -> repos.json
│   └── cloudflare/          # Redirect-Setup fuer alte Subdomains
├── .github/workflows/
│   ├── build-deploy-moonweb.yml   # CI/CD: IONOS SFTP (www.moonweb.org)
│   └── deploy-stefankoelle.yml    # CI/CD: IONOS SFTP (stefankoelle.de)
├── eleventy.config.js       # Zentrale Eleventy-Config (alle moonweb Sites)
├── .eleventyignore          # Schliesst stefankoelle/, timecapsule/ aus
├── DESIGN.md
├── SPEC.md
├── PLAN.md
├── README.md
├── TODO.md
└── package.json
```

## Technischer Stack

- **SSG:** Eleventy (11ty) v3.1.6 (hub, infra, smarthome, code, retro) - zentrale Config
- **SSG:** Eleventy v2.0.1 (timecapsule - retro 2001 Design)
- **Templates:** Nunjucks (.njk)
- **CSS:** Variables-basiert mit Accent-Farben (inlined in base.njk)
- **Deploy (moonweb):** IONOS SFTP
- **Deploy (stefankoelle):** IONOS SFTP
- **CI/CD:** GitHub Actions (2 Workflows)

## Entwicklung

```bash
npm install
cd timecapsule && npm install   # Timecapsule Dependencies
npm run prebuild:cv            # Pre-Build Tasks (CV PDF generieren)
npm run dev                     # Moonweb Sites (localhost:8081)
npm run dev:stefankoelle        # stefankoelle.de (localhost:8086)
npm run dev:timecapsule         # Timecapsule (localhost:8087)
npm run build                   # Alle moonweb Sites
npm run build:stefankoelle      # Nur stefankoelle
npm run build:timecapsule       # Nur timecapsule
npm run build:moonweb           # Moonweb + Timecapsule (fuer Deployment)
```

## Design-Prinzipien

1. **Header konsistent** — Identischer Site-Switcher auf allen Home-Sites
2. **Content flexibel** — Detailseiten duerfen eigenes Layout haben
3. **Accent-Farben:** hub=#3b6ea5, infra=#99333A, smarthome=#1f8a8a, code=#3E5098, retro=#8a6d3b (inlined in base.njk)
4. **Englisch** — Alle Sites komplett auf Englisch
5. **Keine Analytics** — Keine Tracking-Tools
6. **Sensible Daten** — Infra-Content wird manuell redigiert (keine IPs, Keys, Passwoerter)

## URL-Struktur

Alle Sites sind unter `www.moonweb.org` als Subverzeichnisse erreichbar:
- `www.moonweb.org/` — Hub (Root)
- `www.moonweb.org/infra/` — Infra
- `www.moonweb.org/smarthome/` — Smarthome
- `www.moonweb.org/code/` — Code
- `www.moonweb.org/retro/` — Retro
- `www.moonweb.org/timecapsule/` — Timecapsule (2001 Design)
- `www.moonweb.org/impressum/` — Impressum

Cloudflare Redirects leiten alte Subdomains weiter:
- `hub.moonweb.org/*` → `www.moonweb.org/*`
- `infra.moonweb.org/*` → `www.moonweb.org/infra/*`
- `smarthome.moonweb.org/*` → `www.moonweb.org/smarthome/*`
- `code.moonweb.org/*` → `www.moonweb.org/code/*`
- `retro.moonweb.org/*` → `www.moonweb.org/retro/*`

## stefankoelle.de

- Eigene Eleventy-Config (nicht shared base.njk)
- Eigenes CSS-Design (nicht moonweb design system)
- Onepager mit Anchor-Links (bleibt so)
- Deploy via SFTP auf IONOS `/websites/stefankoelle/`
- CV-Partial zentral pflegbar (einmal aendern -> Web + PDF aktualisieren)
- LED Matrix als eigene Seite unter stefankoelle.de/ledmatrix/

### CV PDF Generierung

Das CV-PDF wird via WeasyPrint generiert:

```bash
npm run pdf:cv               # Einzelnes PDF generieren
npm run prebuild:cv             # Alle Pre-Build Tasks (inkl. CV PDF)
```

Dateien:
- `stefankoelle/pdf/cv-style.css` — WeasyPrint-Stylesheet (A4, Typografie)
- `stefankoelle/pdf/build-pdf.sh` — Shell-Skript fuer PDF-Generierung
- `stefankoelle/cv-print.njk` — Standalone HTML-Template (nur CV-Content)
- `stefankoelle/pdf/cv.pdf` — Generiertes PDF (Output)

Wichtig: Das PDF wird via Eleventy-Passthrough ins Build-Output kopiert (`dist/stefankoelle/pdf/cv.pdf`).

### CSS Cache-Busting

CSS-Dateien werden als Passthrough kopiert (kein Hash im Dateinamen). Bei CSS-Aenderungen muss der Query-String in der `?v=N` Inkludierung erhoeht werden:

- `stefankoelle/index.njk`: `<link rel="stylesheet" href="/assets/style.css?v=N">`
- `stefankoelle/ledmatrix/index.njk`: `<link rel="stylesheet" href="assets/style.css?v=N">`

Bei jeder CSS-Anpassung `?v=N` um 1 erhoehen, sonst cached der Browser die alte Datei.

## CI/CD

### IONOS SFTP (www.moonweb.org)
`.github/workflows/build-deploy-moonweb.yml` baut alle moonweb Sites (hub, infra, smarthome, code, retro, timecapsule) und deployed per SFTP.

Benötigte Secrets:
- `IONOS_SFTP_HOST`
- `IONOS_SFTP_USER`
- `IONOS_SFTP_PASSWORD`

### IONOS SFTP (stefankoelle.de)
`.github/workflows/deploy-stefankoelle.yml` baut stefankoelle.de und deployed per SFTP.

Benötigte Secrets:
- `IONOS_SFTP_HOST`
- `IONOS_SFTP_USER`
- `IONOS_SFTP_PASSWORD`

## Offene Punkte

- retro/ ist bewusst rudimentaer gehalten
- Querverlinkungen stefankoelle.de <-> smarthome (zukuenftig)
- Ledmatrix ggf. nach smarthome verschieben (when ready)
- Cloudflare Redirects einrichten (nach Deploy)
- Google Search Console: Neue Property www.moonweb.org

## GitHub Aggregator

Das Skript `scripts/github-aggregator/aggregate.py` liest aus jedem public Repo unter `skoelle` die `.moonweb.yml` und generiert `_data/repos.json`.

### .moonweb.yml Format

```yaml
title: "Projektname"           # Pflicht
emoji: "🚀"                    # Pflicht
category: code                  # Pflicht (Filter)
subcategory: "Web Projects"    # Pflicht
status: active                  # Optional
stack: [Python, FastAPI]        # Optional
summary: "Kurzbeschreibung"    # Optional (Fallback: GitHub description)
repo_url: auto                  # Auto (GitHub html_url)
repo: auto                      # Auto (GitHub name)
```

### Valid Subcategories

- Web Projects
- Smart Home Apps
- Infra Tools
- Dev Tools
- Retro
- Maker Firmware

### Aggregator ausfuehren

```bash
python3 -m venv .venv
.venv/bin/pip install pyyaml
.venv/bin/python scripts/github-aggregator/aggregate.py
```

## Text / Stil

- Keine Em-Dashes verwenden, stattdessen umformulieren (Komma, Satzzeichen, neu formulieren)

## Python / pip

- Niemals `pip install` direkt ausfuehren
- Immer ein virtuelles Umfeld (`.venv`) anlegen und darin arbeiten
- `python3 -m venv .venv` im Projektverzeichnis
