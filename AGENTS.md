# AGENTS.md — moonweb-site

## Projektübersicht

Monorepo für 5 statische Websites unter moonweb.org, basierend auf Eleventy (11ty), deployt auf Cloudflare Pages.

### Websites

| Site | Domain | Zweck | Status |
|------|--------|-------|--------|
| hub | hub.moonweb.org | Zentrale Indexseite, verlinkt alles | Fertig |
| infra | infra.moonweb.org | Infrastruktur-Übersicht (Proxmox, Synology, Netzwerk) | Übersicht + 3 Detailseiten |
| smarthome | smarthome.moonweb.org | Smart Home Projekte und Dashboards | Übersicht + 6 Detailseiten |
| code | code.moonweb.org | GitHub-Projekte (aggregiert via .moonweb.yml) | Fertig (10 Repos) |
| retro | retro.moonweb.org | Physische Retro-Hardware | Nur Übersicht (WIP) |

### Externe Sites (nicht im Monorepo)

- stefankoelle.de — Lebenslauf, Kontakt (extern gehostet)
- www.moonweb.org — 2000er Internet-Zeitkapsel
- 28k8.moonweb.org — 90er BBS/Scene-Archiv
- home.moonweb.org — Authelia-geschütztes Homelab-Dashboard

## Dateistruktur

```
moonweb-site/
├── hub/                    # Eleventy-Config + index.njk
├── infra/                  # Eleventy-Config + index.njk + 3 Subseiten
│   ├── backup-strategy/
│   ├── monitoring/
│   └── dev-workflow/
├── smarthome/              # Eleventy-Config + index.njk + 6 Subseiten
│   ├── homematic-mqtt/
│   ├── tasmota-energy/
│   ├── balkonpi/
│   ├── airplay-audio/
│   ├── octoprint/
│   └── tubearchivist/
├── code/                   # Eleventy-Config + index.njk
│   └── _data/repos.json    # Vom GitHub-Aggregator generiert
├── retro/                  # Eleventy-Config + index.njk
├── shared/                 # Gemeinsame Komponenten
│   ├── _includes/
│   │   ├── base.njk        # Basis-Layout (Header, Site-Switcher, Footer)
│   │   └── card-grid.njk   # Card-Grid Template
│   ├── base.css            # Basis-CSS (Layout, Cards, Typography)
│   └── theme-*.css         # Accent-Farben pro Site
├── scripts/
│   └── github-aggregator/  # Python-Skript für code.moonweb.org
│       ├── aggregate.py
│       ├── example.moonweb.yml
│       └── README.md
├── .github/workflows/
│   └── build-deploy.yml    # CI/CD: Build + Deploy zu Cloudflare Pages
├── DESIGN.md               # Initiales Konzept mit Design-Entscheidungen (deutsch)
├── SPEC.md                 # Vollständige Spezifikation (148 Zeilen)
├── PLAN.md                 # Implementierungsplan (65 Zeilen)
├── README.md               # Projekt-README
├── TODO.md                 # Offene Items + Workflow
└── package.json            # npm scripts für dev/build
```

## Dokumentation

- `DESIGN.md` — Initiales Konzept mit Design-Entscheidungen (deutsch)
- `SPEC.md` — Vollständige Spezifikation (148 Zeilen)
- `PLAN.md` — Implementierungsplan (65 Zeilen)
- `README.md` — Projekt-README
- `TODO.md` — Offene Items + Workflow für weitere Arbeit
- `TODO.md` — Offene Items + Workflow für weitere Arbeit

## Technischer Stack

- **SSG:** Eleventy (11ty) v3.1.6
- **Templates:** Nunjucks (.njk)
- **CSS:** Variables-basiert mit Accent-Farben pro Site
- **Deploy:** Cloudflare Pages (5 separate Projects)
- **CI/CD:** GitHub Actions
- **GitHub-Aggregator:** Python (liest .moonweb.yml aus Repos)
- **Cloudflare Free-Tier:** Max 5 Pages Projects pro Repository

## Entwicklung

```bash
npm install
npm run dev:hub          # localhost:8081
npm run dev:infra        # localhost:8082
npm run dev:smarthome    # localhost:8083
npm run dev:code         # localhost:8084
npm run dev:retro        # localhost:8085
npm run build            # Alle Sites bauen
```

## Design-Prinzipien

1. **Header konsistent** — Identischer Site-Switcher auf allen Home-Sites
2. **Content flexibel** — Detailseiten dürfen eigenes Layout haben
3. **Accent-Farben:** hub=#3b6ea5, infra=#99333A, smarthome=#1f8a8a, code=#3E5098, retro=#8a6d3b
4. **Englisch** — Alle Sites komplett auf Englisch
5. **Keine Analytics** — Keine Tracking-Tools
6. **Sensible Daten** — Infra-Content wird manuell redigiert (keine IPs, Keys, Passwörter)

## Content-Regeln (SPEC.md §5)

| Site | Detailseiten? | Regel |
|------|---------------|-------|
| smarthome | Ja | Nur wenn genug Content vorhanden |
| code | Nie | Nur Übersicht + GitHub-Links |
| infra | Kaum | Bewusst oberflächlich (sensible Daten) |
| retro | Ja, minimal | Rudimentär, WIP erlaubt |

## GitHub-Aggregator

`scripts/github-aggregator/aggregate.py` liest `.moonweb.yml` aus allen public Repos von `skoelle` und schreibt `code/_data/repos.json`. Manuell ausführen:

```bash
export GITHUB_TOKEN=ghp_xxx
python scripts/github-aggregator/aggregate.py
```

## CI/CD

`.github/workflows/build-deploy.yml` baut alle 5 Sites (hub, infra, smarthome, code, retro) und deployt sie zu Cloudflare Pages.

Benötigte Secrets:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

Hinweis: Cloudflare Free-Tier erlaubt nur 5 Projects pro Repository. stefankoelle.de bleibt extern.

## Offene Punkte

- retro/ ist bewusst rudimentär gehalten
- Einige Cards in smarthome/ und infra/ verlinken noch auf "#" (Placeholder)
- Deploy erfolgt noch nicht automatisch (Phase 3 ausstehend)
- stefankoelle.de ist extern gehostet, wird nur verlinkt (nicht im Monorepo)
