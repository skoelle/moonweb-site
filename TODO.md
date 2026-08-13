# TODO — moonweb-site Offene Items

Stand: 2026-08-13

## Aktueller Status

| Phase | Status | Bemerkung |
|-------|--------|-----------|
| Phase 0 — Repo & Tooling | ✅ fertig | Eleventy 3.1.6, CI/CD, .gitignore erweitert |
| Phase 1 — Content | 🟡 80% | hub, code, infra, smarthome fast fertig, retro offen |
| Phase 2 — CI/CD | ✅ fertig | build-deploy.yml mit Caching + Validation + Summary |
| Phase 3 — Launch | 🟡 fast ready | Impressum + Favicons + Meta-Tags + CSS fertig |
| Phase 4 — Deferred | ⏸️ zurückgestellt | Ledmatrix-Migration, 28k8, Analytics |

## Offene Items — nach Priorität

### P1 — Muss vor Launch

- [ ] **Placeholder-Cards aufräumen** — 12 Cards verlinken noch auf "#"
  - infra/ (7x): PVE, pve2, Docker-VM, Synology, Fritz!Box, OpenWRT, IoT VLAN
  - smarthome/ (3x): Dashboard Controls, Air Quality, Weather
  - retro/ (3x): alle Cards
  - Entweder echte Ziel-URLs, Karte entfernen, oder als nicht-klickbare Info-Items darstellen

- [ ] **Content-Review** — Vor Launch einmal alle Seiten durchgehen

### P2 — Für Launch

- [ ] **Cloudflare Pages Projects erstellen**
  - moonweb-hub, moonweb-infra, moonweb-smarthome, moonweb-code, moonweb-retro
  - Hinweis: Cloudflare Free-Tier erlaubt nur 5 Projects pro Repository

- [ ] **DNS & Custom Domains binden**
  - hub.moonweb.org, infra.moonweb.org, smarthome.moonweb.org, code.moonweb.org, retro.moonweb.org

- [ ] **Secrets in GitHub Repo prüfen**
  - CLOUDFLARE_API_TOKEN
  - CLOUDFLARE_ACCOUNT_ID

### P3 — Nach Launch

- [ ] Smoke-Test Cross-Linking (hub → alle Sites, Site-Switcher, externe Links)
- [ ] README.md aktualisieren (aktuellen Stand beschreiben)

### P4 — Deferred (nicht dringend)

- [ ] Ledmatrix-Migration nach smarthome
- [ ] 28k8.moonweb.org Zukunft klären
- [ ] Perplexity-Rückkanal
- [ ] Apex-Domain Redirect (moonweb.org → hub.moonweb.org)
- [ ] stefankoelle.de in Monorepo portieren (nur wenn Cloudflare Free-Tier-Limit gelöst wird)

## Schon erledigt (Stand 2026-08-13)

- [x] Impressum angelegt + Footer-Link auf allen Sites
- [x] Favicons (SVG mit Emojis) pro Subdomain
- [x] Meta descriptions auf allen 14 Seiten
- [x] CSS @import-Kette bereinigt (kein Render-Blocking mehr)
- [x] .gitignore erweitert (.env*, Zertifikate, Swap-Files)

## Workflow für neue Contexts

Wenn du einen neuen Context öffnest, lies diese Datei und prüfe:
1. Welche P1-Items sind noch offen? → Davor arbeiten
2. Welche P2-Items blockieren den Launch? → Parallel klären
3. P3/P4 nur wenn angefordert

## Definition of done

Alle 5 Sites live auf Cloudflare Pages:
- ✅ hub.moonweb.org — verlinkt alles (+ stefankoelle.de extern)
- ✅ code.moonweb.org — GitHub-Katalog via Aggregator
- ✅ smarthome.moonweb.org — Smart Home Übersicht + Detailseiten
- ✅ infra.moonweb.org — Infra-Übersicht (redigiert)
- ✅ retro.moonweb.org — Ehrliche minimale Übersicht (WIP)
