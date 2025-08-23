import React from 'react';
import { ChurchCategory, CHURCH_COLORS, CHURCH_LABELS } from '../types/Church';

interface LegendProps {
  activeCategories?: ChurchCategory[];
  onCategoryClick?: (category: ChurchCategory) => void;
  className?: string;
}

const Legend: React.FC<LegendProps> = ({ 
  activeCategories, 
  onCategoryClick,
  className = ''
}) => {
  const categories: ChurchCategory[] = [
    'KJB',
    'Non-KJV', 
    'Soulwinning',
    'BBF',
    'BMA',
    'Other'
  ];

  return (
    <div className={`legend ${className}`}>
      <div className="legend-header">
        <h4>Church Categories</h4>
      </div>
      
      <div className="legend-items">
        {categories.map((category) => {
          const isActive = !activeCategories || activeCategories.includes(category);
          const isClickable = !!onCategoryClick;
          
          return (
            <div
              key={category}
              className={`legend-item ${!isActive ? 'legend-item-inactive' : ''} ${
                isClickable ? 'legend-item-clickable' : ''
              }`}
              onClick={() => isClickable && onCategoryClick(category)}
              role={isClickable ? 'button' : undefined}
              tabIndex={isClickable ? 0 : undefined}
              onKeyDown={(e) => {
                if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  onCategoryClick(category);
                }
              }}
              aria-label={`${isActive ? 'Hide' : 'Show'} ${CHURCH_LABELS[category]} churches`}
            >
              <div 
                className="legend-color"
                style={{ 
                  backgroundColor: CHURCH_COLORS[category],
                  opacity: isActive ? 1 : 0.3
                }}
                aria-hidden="true"
              />
              <span 
                className="legend-label"
                style={{ opacity: isActive ? 1 : 0.6 }}
              >
                {CHURCH_LABELS[category]}
              </span>
            </div>
          );
        })}
      </div>
      
      {onCategoryClick && (
        <div className="legend-footer">
          <p className="legend-hint">
            Click categories to toggle visibility
          </p>
        </div>
      )}
    </div>
  );
};

export default Legend;