#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '..', 'dist');
const pagesDir = path.join(distDir, 'pages');

console.log('Post-Build Script: Verschiebe HTML-Dateien...');

// Prüfe ob der pages Ordner existiert
if (!fs.existsSync(pagesDir)) {
  console.log('Kein pages-Ordner gefunden. HTML-Dateien sind möglicherweise bereits im richtigen Ordner.');
  
  // Prüfe ob HTML-Dateien im dist-Ordner sind
  const htmlFiles = fs.readdirSync(distDir).filter(file => file.endsWith('.html'));
  if (htmlFiles.length > 0) {
    console.log(`Gefunden: ${htmlFiles.length} HTML-Dateien im dist-Ordner. Alles in Ordnung!`);
  } else {
    console.error('WARNUNG: Keine HTML-Dateien im dist-Ordner gefunden!');
  }
  process.exit(0);
}

// Liste alle HTML-Dateien im pages-Ordner
const htmlFiles = fs.readdirSync(pagesDir).filter(file => file.endsWith('.html'));

if (htmlFiles.length === 0) {
  console.log('Keine HTML-Dateien im pages-Ordner gefunden.');
  process.exit(0);
}

console.log(`Verschiebe ${htmlFiles.length} HTML-Dateien...`);

// Verschiebe jede HTML-Datei
let movedCount = 0;
htmlFiles.forEach(file => {
  const sourcePath = path.join(pagesDir, file);
  const targetPath = path.join(distDir, file);
  
  try {
    fs.renameSync(sourcePath, targetPath);
    console.log(`✓ ${file} verschoben`);
    movedCount++;
  } catch (error) {
    console.error(`✗ Fehler beim Verschieben von ${file}:`, error.message);
  }
});

// Versuche den pages-Ordner zu entfernen
if (movedCount === htmlFiles.length) {
  try {
    fs.rmdirSync(pagesDir);
    console.log('✓ pages-Ordner entfernt');
  } catch (error) {
    console.warn('pages-Ordner konnte nicht entfernt werden:', error.message);
  }
}

console.log(`\nPost-Build abgeschlossen. ${movedCount} von ${htmlFiles.length} Dateien verschoben.`);