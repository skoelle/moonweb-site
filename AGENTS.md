# AGENTS.md — moonweb-site

## Projektübersicht

Monorepo für 5 statische Websites unter moonweb.org + stefankoelle.de, basierend auf Eleventy (11ty).

### Websites (Cloudflare Pages)

| Site | Domain | Zweck | Status |
|------|--------|-------|--------|
| hub | hub.moonweb.org | Zentrale Indexseite, verlinkt alles | Fertig |
| infra | infra.moonweb.org | Infrastruktur-Übersicht (Proxmox, Synology, Netzwerk) | Übersicht + 3 Detailseiten |
| smarthome | smarthome.moonweb.org | Smart Home Projekte und Dashboards | Übersicht + 6 Detailseiten |
| code | code.moonweb.org | GitHub-Projekte (aggregiert via .moonweb.yml) | Fertig (14 Repos) |
| retro | retro.moonweb.org | Physische Retro-Hardware | Nur Übersicht (WIP) |

### Externe Sites (SFTP-Deployment)

| Site | Domain | Zweck | Status |
|------|--------|-------|--------|
| stefankoelle | stefankoelle.de | Lebenslauf, Kontakt, Projekte | Onepager + LED-Matrix-Detailseite |

### Andere Sites (nicht im Monorepo)

- www.moonweb.org — 2000er Internet-Zeitkapsel
- 28k8.moonweb.org — 90er BBS/Scene-Archiv

## Dateistruktur

```
moonweb-site/
├── hub/                    # Eleventy-Config + index.njk
├── infra/                  # Eleventy-Config + index.njk + 3 Subseiten
├── smarthome/              # Eleventy-Config + index.njk + 6 Subseiten
├── code/                   # Eleventy-Config + index.njk
│   └── _data/repos.json
├── retro/                  # Eleventy-Config + index.njk
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
│   │   └── card-grid.njk   # Card-Grid Template
│   ├── base.css
│   └── theme-*.css
├── scripts/
│   └── github-aggregator/
├── .github/workflows/
│   ├── build-deploy.yml            # CI/CD: Cloudflare Pages (5 Sites)
│   └── deploy-stefankoelle.yml     # CI/CD: IONOS SFTP (stefankoelle.de)
├── DESIGN.md
├── SPEC.md
├── PLAN.md
├── README.md
├── TODO.md
└── package.json
```

## Technischer Stack

- **SSG:** Eleventy (11ty) v3.1.6
- **Templates:** Nunjucks (.njk)
- **CSS:** Variables-basiert mit Accent-Farben pro Site
- **Deploy (moonweb):** Cloudflare Pages (5 separate Projects)
- **Deploy (stefankoelle):** IONOS SFTP
- **CI/CD:** GitHub Actions (2 Workflows)

## Entwicklung

```bash
npm install
npm run prebuild             # Pre-Build Tasks (CV PDF generieren)
npm run dev:hub              # localhost:8081
npm run dev:infra            # localhost:8082
npm run dev:smarthome        # localhost:8083
npm run dev:code             # localhost:8084
npm run dev:retro            # localhost:8085
npm run dev:stefankoelle     # localhost:8086
npm run build                # Alle Sites bauen
```

## Design-Prinzipien

1. **Header konsistent** — Identischer Site-Switcher auf allen Home-Sites
2. **Content flexibel** — Detailseiten dürfen eigenes Layout haben
3. **Accent-Farben:** hub=#3b6ea5, infra=#99333A, smarthome=#1f8a8a, code=#3E5098, retro=#8a6d3b
4. **Englisch** — Alle Sites komplett auf Englisch
5. **Keine Analytics** — Keine Tracking-Tools
6. **Sensible Daten** — Infra-Content wird manuell redigiert (keine IPs, Keys, Passwörter)

## stefankoelle.de

- Eigene Eleventy-Config (nicht shared base.njk)
- Eigenes CSS-Design (nicht moonweb design system)
- Onepager mit Anchor-Links (bleibt so)
- Deploy via SFTP auf IONOS `/deploy/stefankoelle/`
- CV-Partial zentral pflegbar (einmal aendern → Web + PDF aktualisieren)
- LED Matrix als eigene Seite unter stefankoelle.de/ledmatrix/

### CV PDF Generierung

Das CV-PDF wird via WeasyPrint generiert:

```bash
npm run pdf:cv               # Einzelnes PDF generieren
npm run prebuild             # Alle Pre-Build Tasks (inkl. CV PDF)
```

Dateien:
- `stefankoelle/pdf/cv-style.css` — WeasyPrint-Stylesheet (A4, Typografie)
- `stefankoelle/pdf/build-pdf.sh` — Shell-Skript für PDF-Generierung
- `stefankoelle/cv-print.njk` — Standalone HTML-Template (nur CV-Content)
- `stefankoelle/pdf/cv.pdf` — Generiertes PDF (Output)

Wichtig: Das PDF wird via Eleventy-Passthrough ins Build-Output kopiert (`dist/stefankoelle/pdf/cv.pdf`).

### CSS Cache-Busting

CSS-Dateien werden als Passthrough kopiert (kein Hash im Dateinamen). Bei CSS-Änderungen muss der Query-String in der `?v=N` Inkludierung erhöht werden:

- `stefankoelle/index.njk`: `<link rel="stylesheet" href="/assets/style.css?v=N">`
- `stefankoelle/ledmatrix/index.njk`: `<link rel="stylesheet" href="assets/style.css?v=N">`

Bei jeder CSS-Anpassung `?v=N` um 1 erhöhen, sonst cached der Browser die alte Datei.

## CI/CD

### Cloudflare Pages (moonweb)
`.github/workflows/build-deploy.yml` baut hub, infra, smarthome, code, retro.

Benötigte Secrets:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

### IONOS SFTP (stefankoelle.de)
`.github/workflows/deploy-stefankoelle.yml` baut stefankoelle.de und deployed per SFTP.

Benötigte Secrets:
- `IONOS_SFTP_HOST`
- `IONOS_SFTP_USER`
- `IONOS_SFTP_PASSWORD`

## Offene Punkte

- retro/ ist bewusst rudimentär gehalten
- Querverlinkungen stefankoelle.de <-> smarthome (zukuenftig)
- Ledmatrix ggf. nach smarthome verschieben (when ready)

## GitHub Aggregator

Das Skript `scripts/github-aggregator/aggregate.py` liest aus jedem public Repo unter `skoelle` die `.moonweb.yml` und generiert `code/_data/repos.json`.

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

- Keine Em-Dashes (—) verwenden, stattdessen umformulieren (Komma, Satzzeichen, neu formulieren)

## Python / pip

- Niemals `pip install` direkt ausführen
- Immer ein virtuelles Umfeld (`.venv`) anlegen und darin arbeiten
- `python3 -m venv .venv` im Projektverzeichnis
