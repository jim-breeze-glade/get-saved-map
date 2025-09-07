import React, { useState } from 'react';
import './StateSelector.css';

interface StateSelectorProps {
  selectedState: string;
  onStateSelect: (state: string) => void;
  loading?: boolean;
}

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
  'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
  'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
  'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

const StateSelector: React.FC<StateSelectorProps> = ({ selectedState, onStateSelect, loading = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleStateClick = (state: string) => {
    onStateSelect(state);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="state-selector">
      <div className="state-selector-header">
        <h3>Select State</h3>
        <button
          className={`state-selector-button ${isOpen ? 'open' : ''}`}
          onClick={toggleDropdown}
          disabled={loading}
          aria-expanded={isOpen}
          aria-label={`Select state. Currently selected: ${selectedState}`}
        >
          <span className="selected-state">
            {loading ? 'Loading...' : selectedState}
          </span>
          <span className={`arrow ${isOpen ? 'up' : 'down'}`}>
            {isOpen ? '▲' : '▼'}
          </span>
        </button>
      </div>
      
      {isOpen && (
        <div className="state-selector-dropdown">
          <div className="state-list">
            {US_STATES.map((state) => (
              <button
                key={state}
                className={`state-option ${state === selectedState ? 'selected' : ''}`}
                onClick={() => handleStateClick(state)}
                aria-label={`Select ${state}`}
              >
                {state}
                {state === selectedState && <span className="checkmark">✓</span>}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {isOpen && (
        <div 
          className="state-selector-backdrop" 
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default StateSelector;