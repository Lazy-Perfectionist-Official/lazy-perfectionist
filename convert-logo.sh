#!/bin/bash

# Logo conversion script - converts user's logo to circular SVG and ICO formats
# Usage: ./convert-logo.sh

echo "🎨 Converting your logo to circular formats..."

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick not found. Installing..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        brew install imagemagick
    else
        echo "Please install ImageMagick manually"
        exit 1
    fi
fi

# Input file
INPUT_LOGO="assets/img/logo.png"
OUTPUT_DIR="public"

# Check if input logo exists
if [ ! -f "$INPUT_LOGO" ]; then
    echo "❌ Logo file not found: $INPUT_LOGO"
    exit 1
fi

echo "✅ Found your logo: $INPUT_LOGO"

# Create circular versions
echo "🔄 Creating circular versions..."

# 1. Create circular PNG versions
echo "  📐 Creating 32x32 circular PNG..."
convert "$INPUT_LOGO" -resize 32x32^ -gravity center -extent 32x32 -alpha set -channel RGBA -fill none -fuzz 10% -draw "circle 16,16 16,1" "$OUTPUT_DIR/favicon-32.png"

echo "  📐 Creating 16x16 circular PNG..."
convert "$INPUT_LOGO" -resize 16x16^ -gravity center -extent 16x16 -alpha set -channel RGBA -fill none -fuzz 10% -draw "circle 8,8 8,1" "$OUTPUT_DIR/favicon-16.png"

echo "  📐 Creating 192x192 circular PNG..."
convert "$INPUT_LOGO" -resize 192x192^ -gravity center -extent 192x192 -alpha set -channel RGBA -fill none -fuzz 10% -draw "circle 96,96 96,20" "$OUTPUT_DIR/icon-192x192.png"

echo "  📐 Creating 512x512 circular PNG..."
convert "$INPUT_LOGO" -resize 512x512^ -gravity center -extent 512x512 -alpha set -channel RGBA -fill none -fuzz 10% -draw "circle 256,256 256,50" "$OUTPUT_DIR/icon-512x512.png"

# 2. Create ICO file from PNGs
echo "  🔧 Creating ICO file..."
convert "$OUTPUT_DIR/favicon-16.png" "$OUTPUT_DIR/favicon-32.png" "$OUTPUT_DIR/favicon.ico"

# 3. Create high-quality SVG with embedded base64
echo "  🎨 Creating circular SVG..."

# Get base64 of circular PNG
BASE64_LOGO=$(base64 -i "$OUTPUT_DIR/icon-512x512.png")

# Create circular SVG wrapper
cat > "$OUTPUT_DIR/favicon.svg" << EOF
<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <clipPath id="circleClip">
      <circle cx="16" cy="16" r="15"/>
    </clipPath>
    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="1" stdDeviation="1" flood-opacity="0.2"/>
    </filter>
  </defs>

  <!-- White circular background -->
  <circle cx="16" cy="16" r="15" fill="white" filter="url(#shadow)"/>

  <!-- Your logo (circular) -->
  <image
    x="1"
    y="1"
    width="30"
    height="30"
    href="data:image/png;base64,$BASE64_LOGO"
    clip-path="url(#circleClip)"
    preserveAspectRatio="xMidYMid meet"
  />
</svg>
EOF

# 4. Create apple-touch-icon
echo "  🍎 Creating Apple touch icon..."
convert "$OUTPUT_DIR/icon-192x192.png" "$OUTPUT_DIR/apple-touch-icon.png"

# 5. Clean up temporary files
rm "$OUTPUT_DIR/favicon-16.png" "$OUTPUT_DIR/favicon-32.png"

echo ""
echo "✅ Logo conversion complete!"
echo ""
echo "📁 Generated files:"
echo "  • $OUTPUT_DIR/favicon.ico (ICO format)"
echo "  • $OUTPUT_DIR/favicon.svg (SVG format)"
echo "  • $OUTPUT_DIR/icon-192x192.png (192x192 PNG)"
echo "  • $OUTPUT_DIR/icon-512x512.png (512x512 PNG)"
echo "  • $OUTPUT_DIR/apple-touch-icon.png (Apple touch icon)"
echo ""
echo "🎉 Your circular logo is ready!"