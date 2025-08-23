#!/bin/bash

# Baptist Church Map Startup Script
# This script starts the React development server and opens the app

echo "🏛️  Starting Baptist Church Map Application..."
echo "================================================"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
  echo "❌ Error: package.json not found. Please run this script from the project root directory."
  exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
fi

# Start the development server
echo "🚀 Starting development server..."
echo "   The application will open automatically in your browser"
echo "   URL: http://localhost:3000"
echo ""
echo "📊 Application Features:"
echo "   - Interactive map of 97+ Baptist churches in Arkansas"
echo "   - Color-coded markers by church category:"
echo "     🔵 KJB (King James Bible) churches"
echo "     🔴 Non-KJV churches"
echo "     🟢 Soulwinning churches" 
echo "     🟠 Baptist Bible Fellowship (BBF)"
echo "     🟣 Baptist Missionary Association (BMA)"
echo "     🟡 American Baptist Association (ABA)"
echo "     🩷 Independent Baptist churches"
echo "     ⚫ Other Baptist churches"
echo "   - Search and filter functionality"
echo "   - Detailed church information popups"
echo "   - Responsive design for all devices"
echo ""
echo "💡 Usage:"
echo "   - Click markers to view church details"
echo "   - Use sidebar to search and filter churches"
echo "   - Click legend items to show/hide categories"
echo "   - Press Ctrl+C to stop the server"
echo ""

# Start the development server and open browser
npm start