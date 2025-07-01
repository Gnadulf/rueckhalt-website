#!/bin/bash
# Script to reorganize HTML files into proper src structure

echo "=== HTML File Reorganization Script ==="
echo "This script will reorganize your HTML files into a proper src/ structure"
echo ""

# Check if we're in the right directory
if [ ! -f "vite.config.js" ]; then
    echo "Error: Please run this script from the project root directory"
    exit 1
fi

echo "Current HTML files in root:"
ls -la *.html 2>/dev/null || echo "No HTML files found"
echo ""

read -p "Do you want to proceed with reorganization? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Reorganization cancelled"
    exit 0
fi

echo ""
echo "Creating directory structure..."

# Create directories
mkdir -p src/pages
mkdir -p tests/pages  
mkdir -p archive

echo "✓ Directories created"
echo ""

# Function to move file with confirmation
move_file() {
    local source=$1
    local destination=$2
    
    if [ -f "$source" ]; then
        echo "Moving $source → $destination"
        mv "$source" "$destination"
    fi
}

echo "Moving main HTML files to src/pages/..."
move_file "index.html" "src/pages/"
move_file "pitch.html" "src/pages/"
move_file "leichte-sprache.html" "src/pages/"

echo ""
echo "Moving test files..."
move_file "test-darkmode.html" "tests/pages/"

echo ""
echo "Archiving old versions..."
move_file "index-alt.html" "archive/"
move_file "leichte-sprache-backup.html" "archive/"
move_file "leichte-sprache-neu.html" "archive/"
move_file "presentation.html" "archive/"

echo ""
echo "Cleaning up empty directories..."
for dir in ar fr nl pl ro ru sy tr uk; do
    if [ -d "$dir" ] && [ -z "$(ls -A $dir)" ]; then
        echo "Removing empty directory: $dir/"
        rmdir "$dir"
    fi
done

echo ""
echo "✓ File reorganization complete!"
echo ""
echo "Next steps:"
echo "1. Update vite.config.js with new paths"
echo "2. Update HTML files to fix asset paths (/src/css/ → /css/)"
echo "3. Test the build process: npm run build"
echo "4. Commit changes to git"
echo ""
echo "See ARCHITECTURE_RECOMMENDATIONS.md for detailed instructions"