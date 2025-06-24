#!/bin/bash
# ULTRATHINK: Deploy Script für Rückhalt Website

echo "🚀 Deploying Rückhalt Website to Netlify..."

# Build the project
echo "📦 Building project..."
npm run build

# Deploy to Netlify
echo "☁️  Deploying to rueckhalt.netlify.app..."
npx netlify deploy --prod --dir=dist

echo "✅ Deployment complete!"
echo "🌐 Visit: https://rueckhalt.netlify.app"