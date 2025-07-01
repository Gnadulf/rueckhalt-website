# Architecture Recommendations: HTML File Organization

## Current Issues

1. **Mixed Source Organization**: HTML files in root while other sources in `/src/`
2. **Root Directory Clutter**: 8 HTML files including backups and tests
3. **Empty Language Directories**: Unused ar/, fr/, nl/ folders
4. **Unclear Project Structure**: Difficult to distinguish source from configuration

## Recommended Structure

```
rueckhalt-website/
├── src/
│   ├── pages/              # All HTML source files
│   │   ├── index.html
│   │   ├── pitch.html
│   │   └── leichte-sprache.html
│   ├── assets/
│   │   ├── fonts/
│   │   └── images/
│   ├── css/
│   ├── js/
│   └── translations/
├── dist/                   # Build output (gitignored)
├── tests/
│   └── pages/             # Test HTML files
│       └── test-darkmode.html
├── archive/               # Old versions
│   ├── index-alt.html
│   ├── leichte-sprache-backup.html
│   └── leichte-sprache-neu.html
└── [config files]

```

## Migration Steps

### Step 1: Create New Directory Structure
```bash
mkdir -p src/pages
mkdir -p tests/pages
mkdir -p archive
```

### Step 2: Move HTML Files
```bash
# Move main HTML files to src/pages/
mv index.html src/pages/
mv pitch.html src/pages/
mv leichte-sprache.html src/pages/

# Move test files
mv test-darkmode.html tests/pages/

# Archive old versions
mv index-alt.html archive/
mv leichte-sprache-backup.html archive/
mv leichte-sprache-neu.html archive/
mv presentation.html archive/
```

### Step 3: Update Vite Configuration
```javascript
// vite.config.js
import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import { resolve } from 'path';

export default defineConfig({
  root: 'src',  // Change root to src directory
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ],
  build: {
    outDir: '../dist',  // Output to parent directory
    emptyOutDir: true,
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/pages/index.html'),
        pitch: resolve(__dirname, 'src/pages/pitch.html'),
        leichteSprache: resolve(__dirname, 'src/pages/leichte-sprache.html')
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
```

### Step 4: Update HTML Asset References
Since Vite root changes to `src/`, update paths in HTML files:
- `/src/css/` → `/css/`
- `/src/js/` → `/js/`
- `/src/assets/` → `/assets/`

### Step 5: Clean Up
```bash
# Remove empty language directories
rm -rf ar/ fr/ nl/ pl/ ro/ ru/ sy/ tr/ uk/

# Update .gitignore to include archive
echo "archive/" >> .gitignore
```

## Benefits

1. **Clear Separation**: All source files in `/src/`, all builds in `/dist/`
2. **Better Organization**: HTML files grouped with other source files
3. **Cleaner Root**: Only configuration and documentation files
4. **Improved DX**: Developers immediately understand project structure
5. **Scalability**: Easy to add new pages or reorganize
6. **Version Control**: Cleaner git history and easier code reviews

## Alternative: Minimal Change Approach

If you prefer minimal changes:

1. Keep HTML files in root (current state)
2. Just clean up:
   - Move test/backup files to archive/
   - Remove empty language directories
   - Add comments to vite.config.js explaining the structure

## Deployment Impact

- **No deployment changes needed**: Netlify still deploys from `/dist/`
- **Build command remains**: `npm run build`
- **All paths in built files**: Automatically adjusted by Vite

## Next Steps

1. Decide between full reorganization or minimal cleanup
2. Create a backup before making changes
3. Test build process after changes
4. Update any documentation referencing file locations