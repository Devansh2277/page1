import React from 'react';
import { TrendingUp, TrendingDown, MinusCircle, AlertTriangle, Wallet } from 'lucide-react';
import RecommendationBadge from './RecommendationBadge';
import RiskIndicator from './RiskIndicator';

interface StockCardProps {
  name: string;
  symbol: string;
  price: number;
  change: number;
  recommendation: 'buy' | 'sell' | 'hold';
  risk: 'low' | 'medium' | 'high';
  metrics: {
    pe: number;
    marketCap: string;
    volume: string;
  };
  sipRecommended: boolean;
  type: 'stock' | 'etf';
}

const StockCard: React.FC<StockCardProps> = ({
  name,
  symbol,
  price,
  change,
  recommendation,
  risk,
  metrics,
  sipRecommended,
  type
}) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow border border-gray-700">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-lg">{name}</h3>
            {type === 'etf' && (
              <span className="bg-indigo-500 text-xs px-2 py-0.5 rounded-full">ETF</span>
            )}
          </div>
          <p className="text-gray-400 text-sm">{symbol}</p>
        </div>
        <RecommendationBadge recommendation={recommendation} />
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-baseline">
          <span className="text-2xl font-bold">₹{price.toLocaleString()}</span>
          <span className={`${change >= 0 ? 'text-emerald-400' : 'text-red-400'} font-medium`}>
            {change >= 0 ? '+' : ''}{change}%
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">P/E Ratio</span>
          <span>{metrics.pe || 'N/A'}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Market Cap</span>
          <span>{metrics.marketCap}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Volume</span>
          <span>{metrics.volume}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-400">Risk Level:</span>
            <RiskIndicator risk={risk} />
          </div>
          {sipRecommended && (
            <div className="flex items-center text-emerald-400">
              <Wallet className="h-4 w-4 mr-1" />
              <span className="text-xs">SIP Recommended</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockCard;