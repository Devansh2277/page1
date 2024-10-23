import React from 'react';
import { TrendingUp, TrendingDown, MinusCircle } from 'lucide-react';

interface RecommendationBadgeProps {
  recommendation: 'buy' | 'sell' | 'hold';
}

const RecommendationBadge: React.FC<RecommendationBadgeProps> = ({ recommendation }) => {
  const getRecommendationConfig = () => {
    switch (recommendation) {
      case 'buy':
        return {
          color: 'bg-emerald-400',
          icon: <TrendingUp className="h-5 w-5" />,
        };
      case 'sell':
        return {
          color: 'bg-red-400',
          icon: <TrendingDown className="h-5 w-5" />,
        };
      case 'hold':
        return {
          color: 'bg-yellow-400',
          icon: <MinusCircle className="h-5 w-5" />,
        };
    }
  };

  const config = getRecommendationConfig();

  return (
    <div className={`${config.color} p-2 rounded-lg text-gray-900 flex items-center space-x-2`}>
      {config.icon}
      <span className="font-medium capitalize text-sm">{recommendation}</span>
    </div>
  );
};

export default RecommendationBadge;