# TODO — moonweb-site Offene Items

Stand: 2026-08-13

## Aktueller Status

| Phase | Status | Bemerkung |
|-------|--------|-----------|
| Phase 0 — Repo & Tooling | ✅ fertig | Eleventy 3.1.6, CI/CD, .gitignore erweitert |
| Phase 1 — Content | ✅ fertig | hub, code, infra, smarthome komplett, retro bewusst rudimentär |
| Phase 2 — CI/CD | ✅ fertig | build-deploy.yml mit Caching + Validation + Summary |
| Phase 3 — Launch | ✅ fertig | Cloudflare Pages live, Smoke-Test bestanden |
| Phase 4 — Deferred | ⏸️ zurückgestellt | Ledmatrix-Migration, 28k8, Analytics |

## Offene Items

### P4 — Deferred (nicht dringend)

- [ ] Ledmatrix-Migration nach smarthome
- [ ] 28k8.moonweb.org Zukunft klären
- [ ] Perplexity-Rückkanal
- [ ] Apex-Domain Redirect (moonweb.org → hub.moonweb.org)
- [ ] stefankoelle.de in Monorepo portieren (nur wenn Cloudflare Free-Tier-Limit gelöst wird)

## Schon erledigt (Stand 2026-08-13)

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
