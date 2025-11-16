import React, { useState, useCallback } from 'react';
import { Asset, Page } from './types';
import AssetListPage from './components/AssetListPage';
import AddAssetPage from './components/AddAssetPage';
import { mockAssets } from './constants';

const App: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>(mockAssets);
  const [currentPage, setCurrentPage] = useState<Page>('list');
  
  const handleAddAsset = useCallback((newAsset: Omit<Asset, 'id'>) => {
    const assetWithId: Asset = {
      ...newAsset,
      id: `asset_${Date.now()}_${Math.random()}`
    };
    setAssets(prevAssets => [assetWithId, ...prevAssets]);
    setCurrentPage('list');
  }, []);

  const navigate = (page: Page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen font-sans antialiased">
      <div className="max-w-md mx-auto">
        {currentPage === 'list' && (
          <AssetListPage assets={assets} onNavigateToAdd={() => navigate('add')} />
        )}
        {currentPage === 'add' && (
          <AddAssetPage onAddAsset={handleAddAsset} onCancel={() => navigate('list')} />
        )}
      </div>
    </div>
  );
};

export default App;
