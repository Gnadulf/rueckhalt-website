#!/bin/bash
# Deploy script mit Cache-Clearing für Netlify

echo "=== Netlify Deploy mit Cache-Clear ==="
echo

# Option 1: Trigger einen neuen Build auf Netlify (empfohlen)
# Dies löst einen kompletten Rebuild auf Netlify's Servern aus
echo "Option 1: Remote Build triggern (empfohlen)"
echo "Führe aus: netlify deploy --trigger --prod"
echo

# Option 2: Lokaler Build mit anschließendem Deploy
echo "Option 2: Lokaler Build + Deploy"
echo "1. Cache löschen:"
echo "   rm -rf dist node_modules/.cache"
echo "2. Dependencies neu installieren:"
echo "   npm ci"
echo "3. Build ausführen:"
echo "   npm run build"
echo "4. Deploy zu Netlify:"
echo "   netlify deploy --prod --dir dist"
echo

# Option 3: Kombinierter Befehl
echo "Option 3: Alles in einem Befehl:"
echo "rm -rf dist node_modules/.cache && npm ci && npm run build && netlify deploy --prod --dir dist"
echo

# Interaktive Auswahl
read -p "Welche Option möchtest du ausführen? (1/2/3/n für keine): " choice

case $choice in
    1)
        echo "Triggere Remote Build..."
        netlify deploy --trigger --prod
        ;;
    2)
        echo "Führe lokalen Build + Deploy aus..."
        rm -rf dist node_modules/.cache
        npm ci
        npm run build
        netlify deploy --prod --dir dist
        ;;
    3)
        echo "Führe kombinierten Befehl aus..."
        rm -rf dist node_modules/.cache && npm ci && npm run build && netlify deploy --prod --dir dist
        ;;
    n|N)
        echo "Abgebrochen."
        ;;
    *)
        echo "Ungültige Auswahl. Abgebrochen."
        ;;
esac