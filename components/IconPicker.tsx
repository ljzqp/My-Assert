
import React, { useState } from 'react';
import { ICON_CATEGORIES } from '../constants';

interface IconPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (icon: string) => void;
}

const IconPicker: React.FC<IconPickerProps> = ({ isOpen, onClose, onSelect }) => {
  const [activeCategory, setActiveCategory] = useState(ICON_CATEGORIES[0].name);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-end" onClick={onClose}>
      <div 
        className="w-full bg-surface rounded-t-2xl p-4 transform transition-transform duration-300" 
        onClick={(e) => e.stopPropagation()}
        style={{ transform: isOpen ? 'translateY(0)' : 'translateY(100%)' }}
      >
        <h3 className="text-lg font-bold text-center mb-4 text-on-surface">Select Asset Icon</h3>
        
        <div className="flex space-x-2 overflow-x-auto pb-4 -mx-4 px-4">
          {ICON_CATEGORIES.map(category => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap ${activeCategory === category.name ? 'bg-primary text-base' : 'bg-base text-on-surface-secondary'}`}
            >
              {category.icon} {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-6 gap-4 py-4 max-h-48 overflow-y-auto">
          {ICON_CATEGORIES.find(c => c.name === activeCategory)?.items.map(icon => (
            <button
              key={icon}
              onClick={() => onSelect(icon)}
              className="aspect-square bg-base rounded-lg flex items-center justify-center text-3xl transition-transform hover:scale-110"
            >
              {icon}
            </button>
          ))}
        </div>

        <button onClick={onClose} className="w-full mt-4 h-12 bg-base text-on-surface-secondary font-bold rounded-xl">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default IconPicker;
