import React from 'react';

interface RiskIndicatorProps {
  risk: 'low' | 'medium' | 'high';
}

const RiskIndicator: React.FC<RiskIndicatorProps> = ({ risk }) => {
  const getRiskConfig = () => {
    switch (risk) {
      case 'low':
        return {
          color: 'bg-blue-400',
          text: 'Low Risk',
        };
      case 'medium':
        return {
          color: 'bg-yellow-400',
          text: 'Medium Risk',
        };
      case 'high':
        return {
          color: 'bg-red-400',
          text: 'High Risk',
        };
    }
  };

  const config = getRiskConfig();

  return (
    <span className={`${config.color} text-xs font-medium px-2.5 py-0.5 rounded-full text-gray-900`}>
      {config.text}
    </span>
  );
};

export default RiskIndicator;