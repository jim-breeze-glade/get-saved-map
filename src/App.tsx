import React, { useState, useMemo } from 'react';
import ChurchMap from './components/ChurchMap';
import FilterControls from './components/FilterControls';
import Legend from './components/Legend';
import { Church, ChurchFilter, ChurchCategory } from './types/Church';
import { arkansasChurches } from './data/arkansasChurches';
import 'leaflet/dist/leaflet.css';
import './App.css';

function App() {
  const [selectedChurch, setSelectedChurch] = useState<Church | null>(null);
  const [filter, setFilter] = useState<ChurchFilter>({
    categories: ['KJB', 'Non-KJV', 'Soulwinning', 'BBF', 'BMA', 'Other'],
    searchTerm: '',
    showAll: true
  });
  const [showSidebar, setShowSidebar] = useState(true);

  // Filter churches based on current filter state
  const filteredChurches = useMemo(() => {
    let filtered = arkansasChurches;

    // Filter by category
    if (!filter.showAll && filter.categories.length > 0) {
      filtered = filtered.filter(church => 
        filter.categories.includes(church.category)
      );
    }

    // Filter by search term
    if (filter.searchTerm.trim()) {
      const searchLower = filter.searchTerm.toLowerCase();
      filtered = filtered.filter(church =>
        church.name.toLowerCase().includes(searchLower) ||
        church.city.toLowerCase().includes(searchLower) ||
        church.pastor?.toLowerCase().includes(searchLower) ||
        church.address.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [filter]);

  const handleChurchSelect = (church: Church) => {
    setSelectedChurch(church);
  };

  const handleLegendCategoryClick = (category: ChurchCategory) => {
    const newCategories = filter.categories.includes(category)
      ? filter.categories.filter(c => c !== category)
      : [...filter.categories, category];

    setFilter({
      ...filter,
      categories: newCategories,
      showAll: newCategories.length === 6 // All categories
    });
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Arkansas Baptist Churches Map</h1>
        <button 
          className="sidebar-toggle"
          onClick={() => setShowSidebar(!showSidebar)}
          aria-label={showSidebar ? 'Hide sidebar' : 'Show sidebar'}
        >
          {showSidebar ? '‹' : '›'}
        </button>
      </header>

      <main className="app-main">
        <div className={`app-sidebar ${showSidebar ? 'app-sidebar-visible' : 'app-sidebar-hidden'}`}>
          <FilterControls
            filter={filter}
            onFilterChange={setFilter}
            totalChurches={arkansasChurches.length}
            filteredCount={filteredChurches.length}
          />
          
          <Legend
            activeCategories={filter.categories}
            onCategoryClick={handleLegendCategoryClick}
            className="app-legend"
          />

          {selectedChurch && (
            <div className="selected-church-info">
              <h3>Selected Church</h3>
              <div className="church-details">
                <h4>{selectedChurch.name}</h4>
                <p>{selectedChurch.address}</p>
                <p>{selectedChurch.city}, {selectedChurch.state} {selectedChurch.zipCode}</p>
                {selectedChurch.pastor && <p><strong>Pastor:</strong> {selectedChurch.pastor}</p>}
                {selectedChurch.phone && <p><strong>Phone:</strong> {selectedChurch.phone}</p>}
                <p><strong>Category:</strong> {selectedChurch.category}</p>
              </div>
            </div>
          )}
        </div>

        <div className="app-map-container">
          <ChurchMap
            churches={filteredChurches}
            selectedChurch={selectedChurch}
            onChurchSelect={handleChurchSelect}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
