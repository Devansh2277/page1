import React from 'react';
import { TrendingUp, Search, Info, AlertTriangle, Filter } from 'lucide-react';
import StockCard from './components/StockCard';
import TabButton from './components/TabButton';
import { stocks } from './data/stocks';

type RiskLevel = 'all' | 'low' | 'medium' | 'high';
type AssetType = 'all' | 'stock' | 'etf';

function App() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [activeTab, setActiveTab] = React.useState<RiskLevel>('all');
  const [assetType, setAssetType] = React.useState<AssetType>('all');
  const [showSipOnly, setShowSipOnly] = React.useState(false);

  const filteredStocks = stocks.filter(stock => {
    const matchesSearch = 
      stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRisk = activeTab === 'all' || stock.risk === activeTab;
    const matchesType = assetType === 'all' || stock.type === assetType;
    const matchesSip = !showSipOnly || stock.sipRecommended;
    
    return matchesSearch && matchesRisk && matchesType && matchesSip;
  });

  const stockCounts = {
    all: stocks.length,
    low: stocks.filter(s => s.risk === 'low').length,
    medium: stocks.filter(s => s.risk === 'medium').length,
    high: stocks.filter(s => s.risk === 'high').length,
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <nav className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-6 w-6 text-emerald-400" />
            <h1 className="text-xl font-bold">Indian Stock Analysis</h1>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search stocks..."
              className="bg-gray-700 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-2xl font-bold">Market Overview</h2>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-emerald-400"></div>
                  <span className="text-sm">Buy</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                  <span className="text-sm">Hold</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-red-400"></div>
                  <span className="text-sm">Sell</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="flex space-x-2">
            <TabButton 
              active={activeTab === 'all'} 
              onClick={() => setActiveTab('all')}
            >
              All Stocks ({stockCounts.all})
            </TabButton>
            <TabButton 
              active={activeTab === 'low'} 
              onClick={() => setActiveTab('low')}
            >
              Low Risk ({stockCounts.low})
            </TabButton>
            <TabButton 
              active={activeTab === 'medium'} 
              onClick={() => setActiveTab('medium')}
            >
              Medium Risk ({stockCounts.medium})
            </TabButton>
            <TabButton 
              active={activeTab === 'high'} 
              onClick={() => setActiveTab('high')}
            >
              High Risk ({stockCounts.high})
            </TabButton>
          </div>
          
          <div className="flex items-center gap-4">
            <select
              value={assetType}
              onChange={(e) => setAssetType(e.target.value as AssetType)}
              className="bg-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">All Types</option>
              <option value="stock">Stocks Only</option>
              <option value="etf">ETFs Only</option>
            </select>
            
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                checked={showSipOnly}
                onChange={(e) => setShowSipOnly(e.target.checked)}
                className="rounded bg-gray-700 border-gray-600 text-emerald-500 focus:ring-emerald-500"
              />
              <span>SIP Recommended Only</span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStocks.map((stock) => (
            <StockCard key={stock.symbol} {...stock} />
          ))}
        </div>

        {filteredStocks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No stocks found matching your criteria.</p>
          </div>
        )}

        <div className="mt-8 bg-gray-800 rounded-lg p-4">
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Info className="h-4 w-4" />
            <p>Analysis is based on technical indicators, fundamental metrics, market sentiment, and risk assessment.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;