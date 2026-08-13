# moonweb.org Hub-Konzept (v5 — fast vollständig, letzte Lücken vor SPEC.md/PLAN.md)

Status: Konzeptrunde nahezu abgeschlossen. Noch keine Umsetzung.

## 1. Header/Layout-Prinzip — final

Für alle Home-Bereich-Sites (infra, smarthome, code, retro) gilt ab jetzt ein klares Prinzip:

- **Header ist das Wichtigste** — identisch über alle vier Sites (Site-Switcher, Banner, Farbakzent der jeweiligen Domain).
- **Übersichtsseiten** (Domain-Root) folgen dem einheitlichen Card-Grid-Grundlayout.
- **Detailseiten/Subseiten** übernehmen den gleichen Header, dürfen darunter aber ein **eigenes, freieres Layout** haben (wie es bei `/ledmatrix/` auf stefankoelle.de heute schon der Fall ist — Pinbelegung, API-Doku, Fotos in freier Anordnung statt starres Card-Raster).

Das ist ein wichtiger Unterschied zu v3/v4: nicht "alles identisch", sondern **Header konsistent, Content-Layout pro Subseite flexibel**.

## 2. LEDMatrix-Migration — verschoben, nicht Teil des Starts

- Keine Migration von `/ledmatrix/` zum Start. Die Seite bleibt vorerst auf stefankoelle.de.
- Aus smarthome.moonweb.org wird lediglich **nach draußen verlinkt** (Übergangslösung).
- Migration erfolgt in einer späteren Phase, nicht Teil von Phase 1.
- **Keine weiteren Einzelseiten-Migrationen zum Start** — bewusste Entscheidung, jetzt mit der Struktur zu beginnen statt weiter Einzelseiten zu pflegen.

## 3. Detailtiefe pro Domain — final festgelegt

| Domain | Detailseiten? | Regel |
|---|---|---|
| smarthome | Ja, aber nur wenn genug Content da ist | Übersicht zeigt Aufbau des Smarthomes; ein Thema bekommt sofort eine Detailseite, wenn Daten vorhanden sind — sonst wird das Thema vorerst nur in der Übersicht erwähnt (kein Platzhalter-Zwang) |
| code | **Nie** | Nur Übersichtskarten + Link zu GitHub — bewusst kein Duplizieren von README-Inhalten |
| infra | Kaum, eher übersichtsorientiert | Hauptteil bleibt bewusst oberflächlich, da sensible Daten (IPs, Keys, interne Topologie) nicht öffentlich dürfen — siehe Punkt 4 |
| retro | Ja, aber bewusst rudimentär | Thema ist inhaltlich noch unausgereift — nur Grundgerüst anlegen, keine weitere Zeit investieren |

## 4. Infra-Sensitivität — Redaktionsregel (neu, wichtig für SPEC.md)

Da infra "eher oberflächlich" bleiben soll, braucht es eine einfache Faustregel, was rein darf und was nicht — sonst ist das bei der Migration der bestehenden Docs (Heimnetzwerk-Final etc.) jedes Mal eine Einzelfallentscheidung:

- **Darf rein:** Architektur-Ebene (Proxmox + Synology + Docker-Host, VLAN-Konzept ohne konkrete interne IP-Pläne, welche Diensttypen laufen, welche Tools genutzt werden).
- **Darf nicht rein:** konkrete IP-Adressen, WireGuard-Keys/Preshared-Keys, Passwörter, interne Hostnamen mit Rückschlussmöglichkeit, Backup-Ziele mit Zugangsdaten.

Diese Regel gilt 1:1 auch für retro/smarthome, ist aber bei infra am relevantesten, weil dort die Rohdokumente (z. B. Heimnetzwerk-Final-v3.2, GL_Flint2_Final_v2) aktuell sehr konkret sind (u. a. reale IPs, WireGuard-Keys) und beim Übertragen aktiv gekürzt werden müssen.

## 5. Bilder/Assets — final

Alle Bilder bleiben **im GitHub-Repo** versioniert (kein separates Cloudflare R2/Images). Einfachster Weg, passt zum ohnehin geplanten Monorepo-Ansatz.

## 6. DNS — bereits bei Cloudflare

Zone liegt schon bei Cloudflare, Pages-Anbindung ist damit ohne Zusatzschritt möglich. Offen bleibt nur, wohin die nackte Domain `moonweb.org` zeigt (siehe offene Frage 1 unten).

## 7. Übersetzung, Last-Updated, Analytics, Perplexity-Rückkanal — final

- **Übersetzung:** einmaliger KI-gestützter Durchlauf pro Dokument bei der Migration, kein wiederkehrender Prozess.
- **Last-Updated-Anzeige:** einfachste Lösung — im Zweifel **gar keine Anzeige**. Stattdessen soll der Anspruch sein, dass Inhalte grundsätzlich aktuell gehalten werden, statt ein Datum zu zeigen, das dann veraltet wirkt.
- **Analytics:** keine Statistik-Erfassung, weder Cloudflare Web Analytics noch anderes.
- **Perplexity-Rückkanal:** zurückgestellt, wird später erneut betrachtet, keine Zeit jetzt investieren.

## 8. Offene Kleinigkeiten — beantwortet

Die vier ursprünglich offenen Punkte wurden inzwischen in SPEC.md/PLAN.md beantwortet:

1. **Apex-Domain-Routing:** Bleibt bei `www.moonweb.org` Redirect (PLAN.md §3, Phase 4)
2. **URL-Konvention:** `domain/slug/`, kleinschreibung, Bindestriche (SPEC.md §4.3)
3. **Start-Reihenfolge:** Alle Sites gleichzeitig (PLAN.md §1: "launch simultaneously")
4. **Platzhalter-Verhalten:** Keine Platzhalter, ehrliche kurze Seiten + WIP-Hinweise (SPEC.md §5, retro/ hat WIP-Badge)

## 9. Gesamtstand — Konzept vollständig

Alle Entscheidungsgrundlagen sind in SPEC.md (was) und PLAN.md (wie/wann) umgesetzt:

- Sitemap, Domain-Zwecke, Namensgebung
- Header-konsistent/Content-flexibel-Prinzip
- Detailtiefe pro Domain
- Redaktionsregel für sensible infra-Inhalte
- Monorepo-Struktur, Eleventy als SSG, GitHub Actions Build, Cloudflare Pages Deploy über 6 Projekte
- Sprache komplett Englisch
- Bilder im Repo, DNS bei Cloudflare, Übersetzung einmalig, keine Last-Updated-Anzeige, keine Analytics, Perplexity-Rückkanal zurückgestellt
