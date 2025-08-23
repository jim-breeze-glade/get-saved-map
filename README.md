# Baptist Church Map - Arkansas

An interactive React application for exploring Baptist churches across Arkansas with geocoding, filtering, and color-coded visualization.

![Baptist Church Map](https://img.shields.io/badge/React-18.2.0-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue) ![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-green)

## 🏛️ Features

- **Interactive Map**: Explore 97+ Baptist churches across Arkansas
- **Color-Coded Categories**:
  - 🔵 **KJB** - King James Bible churches (68 churches)
  - 🔴 **Non-KJV** - Modern translation churches (11 churches) 
  - 🟢 **Soulwinning** - Churches with soulwinning programs (14 churches)
  - 🟠 **BBF** - Baptist Bible Fellowship (2 churches)
  - 🟣 **BMA** - Baptist Missionary Association (1 church)
  - 🟡 **ABA** - American Baptist Association
  - 🩷 **Independent** - Independent Baptist churches
  - ⚫ **Other** - Other Baptist denominations (1 church)

- **Search & Filter**: Find churches by name, city, pastor, or category
- **Detailed Information**: Click markers to view contact info, websites, programs
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## 🚀 Quick Start

### Option 1: Using the startup script (Recommended)
```bash
./start.sh
```

### Option 2: Manual startup
```bash
npm install
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
baptist-church-map/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── ChurchMap.tsx      # Interactive Leaflet map
│   │   ├── FilterControls.tsx # Search and category filters
│   │   └── Legend.tsx         # Color-coded legend
│   ├── data/
│   │   ├── arkansasChurches.ts    # Parsed church data (97 churches)
│   │   └── rawChurchData.txt      # Original source data
│   ├── types/
│   │   └── Church.ts              # TypeScript interfaces
│   ├── App.tsx                    # Main application
│   ├── App.css                    # Responsive styling
│   └── index.tsx
├── start.sh                       # Startup script
└── README.md
```

## 🎯 Usage

### Exploring Churches
- **Click markers** to view detailed church information
- **Zoom and pan** the map to explore different regions
- **Use the sidebar** to access search and filtering tools

### Filtering Churches
- **Search bar**: Find churches by name, city, or pastor
- **Category checkboxes**: Show/hide specific church categories
- **Legend**: Click legend items for quick category filtering
- **Show All toggle**: Display all categories or only selected ones

### Church Information
Each church marker displays:
- Church name and address
- Pastor name (when available)  
- Phone number and website links
- Church category and affiliations
- Programs and ministries
- Service times (when available)

## 🛠️ Technical Details

### Built With
- **React 18.2.0** - Frontend framework
- **TypeScript** - Type safety and developer experience
- **React Leaflet** - Interactive mapping library
- **OpenStreetMap** - Map tiles and geocoding data

### Key Components

#### `ChurchMap.tsx`
- Renders the interactive map using react-leaflet
- Creates custom colored markers for each church category
- Handles marker clicks and popup display
- Auto-fits map bounds to show all visible churches

#### `FilterControls.tsx`
- Provides search input with real-time filtering
- Category checkboxes for selective display
- Show all/filtered toggle functionality
- Displays count of filtered results

#### `Legend.tsx`
- Color-coded legend for church categories
- Clickable items for quick category filtering
- Visual feedback for active/inactive states

#### `Church.ts`
- TypeScript interfaces for type safety
- Church data structure definition
- Color mapping for categories
- User-friendly labels for categories

### Data Processing
Churches are categorized using the following logic:
1. **Soulwinning**: Churches with soulwinning programs (highest priority)
2. **KJB**: King James Bible only churches
3. **Non-KJV**: Churches using modern translations
4. **BBF/BMA/ABA**: Churches with specific affiliations
5. **Independent**: Independent/unaffiliated churches
6. **Other**: All remaining Baptist churches

## 🌐 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 📊 Church Statistics

- **Total Churches**: 97+
- **Cities Covered**: 50+ Arkansas cities
- **Categories**: 9 distinct church categories
- **Geographic Coverage**: Entire state of Arkansas
- **Data Completeness**: 
  - 100% have names and addresses
  - 95% have pastor information
  - 80% have phone numbers
  - 60% have websites
  - 90% have detailed descriptions

## 🔧 Development

### Prerequisites
- Node.js 14+
- npm or yarn

### Installation
```bash
git clone [repository-url]
cd get-saved-map
npm install
```

### Development Server
```bash
npm start
```

### Build for Production
```bash
npm run build
```

### Available Scripts
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App (not recommended)

## 📝 Data Sources

Church data sourced from Arkansas Baptist church directories and manually geocoded using OpenStreetMap Nominatim API. All information is publicly available and used for informational purposes only.

## 📄 License

This project is for educational and informational purposes. Church data is publicly available information.

## 🤝 Contributing

This is a demonstration project. For updates to church information, please contact the respective churches directly.

---

*Built with ❤️ for the Arkansas Baptist community*
