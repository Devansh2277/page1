import React from 'react';

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ active, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors
        ${active 
          ? 'bg-gray-700 text-white' 
          : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
        }`}
    >
      {children}
    </button>
  );
};

export default TabButton;