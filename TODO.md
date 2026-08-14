# TODO — moonweb-site Offene Items

Stand: 2026-08-14

## Aktueller Status

| Phase | Status | Bemerkung |
|-------|--------|-----------|
| Phase 0 — Repo & Tooling | ✅ fertig | Eleventy 3.1.6, CI/CD, .gitignore erweitert |
| Phase 1 — Content | ✅ fertig | hub, code, infra, smarthome komplett, retro bewusst rudimentär |
| Phase 2 — CI/CD | ✅ fertig | build-deploy.yml mit Caching + Validation + Summary |
| Phase 3 — Launch | ✅ fertig | Cloudflare Pages live, Smoke-Test bestanden |
| Phase 4 — Deferred | ⏸️ zurückgestellt | 28k8, Analytics |
| Phase 5 — stefankoelle.de | ✅ fertig | Ins Monorepo migriert, Eleventy-Build, SFTP-Deployment |

## Offene Items

### P4 — Deferred (nicht dringend)

- [ ] 28k8.moonweb.org Zukunft klären
- [ ] Perplexity-Rückkanal
- [ ] Apex-Domain Redirect (moonweb.org → hub.moonweb.org)
- [ ] PDF-Build fuer CV (WeasyPrint, lokal testen)
- [ ] Querverlinkungen stefankoelle.de <-> smarthome
- [ ] Ledmatrix ggf. nach smarthome verschieben

## Schon erledigt (Stand 2026-08-14)

### stefankoelle.de Migration (2026-08-14)
- [x] Eleventy-Config + package.json erweitert
- [x] Onepager-Layout mit Anchor-Links beibehalten
- [x] CV-Partial (zentral fuer Web + PDF)
- [x] CSS ausgelagert + modernisiert (Custom Properties, box-sizing)
- [x] Assets in assets/ verschoben
- [x] Ledmatrix als eigene Seite integriert
- [x] Alte Dateien geloescht (index.html, browserconfig.xml, sitemap.txt)
- [x] Deployment-Workflow fuer IONOS SFTP
- [x] Cloudflare-Workflow um stefankoelle erweitert (paths-ignore)

### Vorherige Erledigungen (Stand 2026-08-13)
- [x] Impressum angelegt + Footer-Link auf allen Sites
- [x] Favicons (SVG mit Emojis) pro Subdomain — `shared/favicon/*.svg`, per Passthrough Copy
- [x] Meta descriptions auf allen 33 Seiten
- [x] CSS @import-Kette bereinigt (kein Render-Blocking mehr)
- [x] .gitignore erweitert (.env*, Zertifikate, Swap-Files)
- [x] Placeholder-Cards `"#"` bereinigt — keine mehr vorhanden
- [x] README.md überarbeitet (Emojis, Architektur, Tech-Stack, CI/CD)
- [x] Lizenz hinzugefügt (CC BY-NC-SA 4.0)
- [x] Content-Review — alle Seiten geprüft, alles passt
- [x] Cloudflare Pages Projects erstellt (moonweb-hub, -infra, -smarthome, -code, -retro)
- [x] DNS & Custom Domains gebunden
- [x] Secrets konfiguriert (CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID)
- [x] Smoke-Test Cross-Linking — alles funktioniert auf live

## Workflow für neue Contexts

Wenn du einen neuen Context öffnest, lies diese Datei und prüfe:
1. Welche P4-Items sind relevant? → Nur wenn angefordert

## Definition of done

Alle 5 Sites live auf Cloudflare Pages:
- ✅ hub.moonweb.org — verlinkt alles (+ stefankoelle.de extern)
- ✅ code.moonweb.org — GitHub-Katalog via Aggregator
- ✅ smarthome.moonweb.org — Smart Home Übersicht + Detailseiten
- ✅ infra.moonweb.org — Infra-Übersicht (redigiert)
- ✅ retro.moonweb.org — Ehrliche minimale Übersicht (WIP)

stefankoelle.de live auf IONOS (SFTP-Deployment):
- ✅ stefankoelle.de — Onepager mit CV, Projects, Languages, Impressum
- ✅ stefankoelle.de/ledmatrix/ — LED Matrix WebServer Dokumentation
