# RückHalt e.V. - Moderne Website

Eine trauma-informierte, barrierefreie und sichere Website für die Beratungsstelle RückHalt e.V.

## 🎯 Features

### Sicherheit & Datenschutz
- **Quick Exit Button**: Schnelles Verlassen der Seite (3x ESC oder Button)
- **Verschlüsselte Kommunikation**: Sichere Kontaktformulare
- **Keine Tracking-Cookies**: Datenschutz hat oberste Priorität
- **Service Worker**: Offline-Verfügbarkeit wichtiger Informationen

### Barrierefreiheit
- **WCAG AAA Standard**: Vollständig barrierefrei
- **Screen Reader optimiert**: Semantisches HTML und ARIA-Labels
- **Keyboard Navigation**: Vollständige Tastatursteuerung
- **Mehrsprachigkeit**: DE, EN, AR, TR vorbereitet

### Design & UX
- **Trauma-informiertes Design**: Beruhigende Farben und sanfte Animationen
- **Stimmungsanpassung**: Nutzer können Farbintensität anpassen
- **Mobile First**: Optimiert für alle Geräte
- **Performance**: Schnelle Ladezeiten durch Vite Build-System

## 🚀 Deployment auf Netlify

### Option 1: Deploy Button
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/rueckhalt-website)

### Option 2: Manuelles Deployment

1. **GitHub Repository erstellen**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/rueckhalt-website.git
   git push -u origin main
   ```

2. **Netlify Account**
   - Gehe zu [app.netlify.com](https://app.netlify.com)
   - Klicke auf "New site from Git"
   - Wähle GitHub und autorisiere Netlify
   - Wähle dein Repository

3. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18 (wird automatisch aus netlify.toml gelesen)

4. **Deploy**
   - Klicke auf "Deploy site"
   - Warte bis der Build abgeschlossen ist

### Option 3: Netlify CLI

```bash
# Netlify CLI installieren
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

## 🛠️ Lokale Entwicklung

```bash
# Dependencies installieren
npm install

# Development Server starten
npm run dev

# Production Build
npm run build

# Preview Production Build
npm run preview
```

## 📁 Projektstruktur

```
rueckhalt-website/
├── public/
│   ├── sw.js              # Service Worker
│   └── offline.html       # Offline-Seite
├── src/
│   ├── assets/
│   │   └── images/        # Bilder und Logo
│   ├── css/
│   │   ├── reset.css      # CSS Reset
│   │   ├── variables.css  # Design System Variablen
│   │   ├── main.css       # Haupt-Styles
│   │   ├── components.css # UI Komponenten
│   │   └── responsive.css # Mobile Styles
│   └── js/
│       ├── main.js        # Haupt-JavaScript
│       ├── translations.js # Übersetzungen
│       └── vendor.js      # Third-party Scripts
├── index.html             # Haupt-HTML
├── netlify.toml          # Netlify Konfiguration
├── vite.config.js        # Vite Konfiguration
└── package.json          # NPM Dependencies
```

## 🔒 Sicherheitshinweise

- **HTTPS only**: Netlify aktiviert automatisch HTTPS
- **Security Headers**: Bereits in netlify.toml konfiguriert
- **Content Security Policy**: Strenge CSP-Regeln aktiv
- **Keine Analytics**: Respektiert Privatsphäre der Nutzer

## 🎨 Design System

### Farben
- **Primär**: #2E5266 (Ruhiges Blaugrau)
- **Sekundär**: #6E8898 (Helleres Blaugrau)
- **Akzent**: #52796F (Gedämpftes Grün)
- **Warm**: #D3B1C2 (Sanftes Rosa)
- **Notfall**: #C84B31 (Wichtige Aktionen)

### Schriftarten
- **Primär**: Inter (Sans-serif)
- **Sekundär**: Lora (Serif für Zitate)

## 📞 Support

Bei Fragen zum Deployment oder zur Website:
- Issue erstellen auf GitHub
- E-Mail an: webmaster@rueckhalt-beratung.de

## 📄 Lizenz

© 2024 RückHalt e.V. - Alle Rechte vorbehalten

---

**Wichtig**: Diese Website behandelt sensible Themen. Bitte respektieren Sie die Privatsphäre und Sicherheit der Nutzer bei allen Änderungen.