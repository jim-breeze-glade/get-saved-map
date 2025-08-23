import React from 'react';
import { ChurchCategory, ChurchFilter, CHURCH_LABELS } from '../types/Church';

interface FilterControlsProps {
  filter: ChurchFilter;
  onFilterChange: (filter: ChurchFilter) => void;
  totalChurches: number;
  filteredCount: number;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  filter,
  onFilterChange,
  totalChurches,
  filteredCount,
}) => {
  const categories: ChurchCategory[] = [
    'KJB',
    'Non-KJV',
    'Soulwinning',
    'BBF',
    'BMA',
    'Other'
  ];

  const handleCategoryToggle = (category: ChurchCategory) => {
    const newCategories = filter.categories.includes(category)
      ? filter.categories.filter(c => c !== category)
      : [...filter.categories, category];

    onFilterChange({
      ...filter,
      categories: newCategories,
      showAll: newCategories.length === categories.length
    });
  };

  const handleShowAllToggle = () => {
    const newShowAll = !filter.showAll;
    onFilterChange({
      ...filter,
      showAll: newShowAll,
      categories: newShowAll ? [...categories] : []
    });
  };

  const handleSearchChange = (searchTerm: string) => {
    onFilterChange({
      ...filter,
      searchTerm
    });
  };

  const handleClearFilters = () => {
    onFilterChange({
      categories: [...categories],
      searchTerm: '',
      showAll: true
    });
  };

  return (
    <div className="filter-controls">
      <div className="filter-header">
        <h3>Filter Churches</h3>
        <div className="church-count">
          Showing {filteredCount} of {totalChurches} churches
        </div>
      </div>

      {/* Search Input */}
      <div className="search-section">
        <label htmlFor="search-input" className="search-label">
          Search by name, city, or pastor:
        </label>
        <input
          id="search-input"
          type="text"
          placeholder="Enter search term..."
          value={filter.searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Show All Toggle */}
      <div className="show-all-section">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={filter.showAll}
            onChange={handleShowAllToggle}
            className="checkbox"
          />
          <span className="checkbox-text">Show All Categories</span>
        </label>
      </div>

      {/* Category Filters */}
      <div className="categories-section">
        <h4 className="categories-title">Categories:</h4>
        <div className="categories-grid">
          {categories.map((category) => (
            <label key={category} className="category-label">
              <input
                type="checkbox"
                checked={filter.categories.includes(category)}
                onChange={() => handleCategoryToggle(category)}
                className="category-checkbox"
                disabled={filter.showAll}
              />
              <span className="category-text">
                {CHURCH_LABELS[category]}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="filter-actions">
        <button
          onClick={handleClearFilters}
          className="clear-filters-btn"
          type="button"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
};

export default FilterControls;