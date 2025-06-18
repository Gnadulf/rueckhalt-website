# Rückhalt e.V. Website

Offizielle Website für Rückhalt e.V. - Beratungsstelle gegen sexuelle Gewalt in Aachen. Mehrsprachig, barrierefrei, traumasensibel.

🌐 **Live:** https://rueckhalt.netlify.app

## Übersicht

Diese Website bietet Betroffenen von sexueller Gewalt und deren Angehörigen einen niedrigschwelligen Zugang zu Hilfe und Beratung. Die Website ist bewusst traumasensibel gestaltet und in 11 Sprachen verfügbar.

## Features

### 🌍 Mehrsprachigkeit
- **11 Sprachen:** Deutsch, Englisch, Polnisch, Ukrainisch, Russisch, Rumänisch, Arabisch, Syrisch, Französisch, Niederländisch, Türkisch
- RTL-Support für Arabisch und Syrisch
- Automatische Spracherkennung
- Sprachpräferenz wird gespeichert

### ♿ Barrierefreiheit
- **Leichte Sprache** Version mit vereinfachter Navigation
- WCAG AAA konformer Dark Mode
- Keyboard-Navigation durchgehend möglich
- Screen-Reader optimiert
- Schnell-Verlassen-Funktion (3x ESC)

### 🎨 Design
- Rosa/Türkis Farbschema aus dem Logo
- Pentagram/Paula Scher inspirierte Typografie
- Responsive Design (Mobile-First)
- Glass-Morphism UI-Elemente
- Sanfte Animationen (reduzierbar)

### 🔧 Technische Features
- Modal-System für Service-Details
- FAQ mit Suchfunktion und Kategoriefilter
- Notfall-Toolkit mit konkreten Übungen
- Dark Mode mit optimalen Kontrasten
- PWA-ready
- Optimierte Performance

## Installation

```bash
# Repository klonen
git clone https://github.com/Gnadulf/rueckhalt-website.git
cd rueckhalt-website

# Dependencies installieren
npm install

# Entwicklungsserver starten
npm run dev

# Production Build
npm run build

# Deployment Preview
npm run preview
```

## Projektstruktur

```
rueckhalt-website/
├── dist/                    # Build Output
├── src/
│   ├── css/
│   │   ├── reset.css       # Browser Normalisierung
│   │   ├── variables.css   # Design Tokens
│   │   ├── main.css        # Haupt-Styles
│   │   ├── components.css  # UI-Komponenten
│   │   ├── bauhaus.css     # Grid System
│   │   ├── modern.css      # Moderne UI Patterns
│   │   ├── responsive.css  # Mobile Anpassungen
│   │   └── pentagram.css   # Typografie System
│   ├── js/
│   │   └── translations-complete.js  # Übersetzungen (11 Sprachen)
│   └── assets/
│       └── images/
│           └── logo.png    # Logo (benötigt transparente Version)
├── index.html              # Hauptseite
├── leichte-sprache.html    # Leichte Sprache Version
├── netlify.toml            # Deployment Konfiguration
├── package.json
└── vite.config.js          # Build Konfiguration
```

## Deployment

Die Website wird automatisch über Netlify deployed:
- Push zu `main` Branch triggert automatisches Deployment
- Preview Deployments für Pull Requests

## Mitwirken

Contributions sind willkommen! Bitte beachten:

1. **Traumasensibles Design** beibehalten
2. **Barrierefreiheit** nicht beeinträchtigen
3. **Alle 11 Sprachen** bei Textänderungen aktualisieren
4. **Performance** im Blick behalten
5. **Keine Tracking-Scripts** einbauen

## Sicherheit

- Quick-Exit Funktion (3x ESC oder Button)
- Keine Cookies ohne Zustimmung
- Verschlüsselte Formulare
- Keine externe Analyse-Tools

## Lizenz

MIT License - siehe [LICENSE](LICENSE) für Details

## Kontakt

**Rückhalt e.V.**
- Website: https://rueckhalt.netlify.app
- Telefon: 0241 - 542220
- E-Mail: info@rueckhalt-aachen.de

---

🤖 Entwickelt mit Unterstützung von [Claude Code](https://claude.ai/code)