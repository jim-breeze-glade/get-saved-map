import React, { useState, useMemo, useEffect } from 'react';
import ChurchMap from './components/ChurchMap';
import FilterControls from './components/FilterControls';
import Legend from './components/Legend';
import StateSelector from './components/StateSelector';
import { Church, ChurchFilter, ChurchCategory } from './types/Church';
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
  const [selectedState, setSelectedState] = useState<string>('Arkansas');
  const [churches, setChurches] = useState<Church[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Load church data for selected state
  useEffect(() => {
    const loadStateChurches = async () => {
      if (!selectedState) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const stateKey = selectedState.toLowerCase().replace(/\s+/g, '');
        const churchModule = await import(`./data/${stateKey}Churches.ts`);
        const churchData = churchModule[`${stateKey}Churches`];
        setChurches(churchData || []);
      } catch (err) {
        console.error(`Error loading ${selectedState} church data:`, err);
        setError(`No church data available for ${selectedState} yet. Please check back later.`);
        setChurches([]);
      } finally {
        setLoading(false);
      }
    };

    loadStateChurches();
  }, [selectedState]);

  // Filter churches based on current filter state
  const filteredChurches = useMemo(() => {
    let filtered = churches;

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
  }, [churches, filter]);

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
        <h1>KJV Baptist Church Finder</h1>
        <div className="header-subtitle">
          <p>
            Thanks to{' '}
            <a 
              href="https://www.militarygetsaved.net" 
              target="_blank" 
              rel="noopener noreferrer"
              className="credit-link"
            >
              militarygetsaved.net
            </a>
            {' '}for church directory data
          </p>
        </div>
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
          <StateSelector
            selectedState={selectedState}
            onStateSelect={setSelectedState}
            loading={loading}
          />
          
          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}
          
          {!error && (
            <FilterControls
              filter={filter}
              onFilterChange={setFilter}
              totalChurches={churches.length}
              filteredCount={filteredChurches.length}
            />
          )}
          
          {!error && (
            <Legend
              activeCategories={filter.categories}
              onCategoryClick={handleLegendCategoryClick}
              className="app-legend"
            />
          )}

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
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading {selectedState} churches...</p>
            </div>
          ) : error ? (
            <div className="error-container">
              <h2>No Data Available</h2>
              <p>{error}</p>
              <p>Currently available states: Arkansas, Alaska, Arizona</p>
            </div>
          ) : (
            <ChurchMap
              churches={filteredChurches}
              selectedChurch={selectedChurch}
              onChurchSelect={handleChurchSelect}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
