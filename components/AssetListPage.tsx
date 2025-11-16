import React from 'react';
import { Asset } from '../types';
import SummaryHeader from './SummaryHeader';
import AssetCard from './AssetCard';

interface AssetListPageProps {
  assets: Asset[];
  onNavigateToAdd: () => void;
}

const AssetListPage: React.FC<AssetListPageProps> = ({ assets, onNavigateToAdd }) => {
  return (
    <div className="p-4 pb-24">
      <header className="pt-8 pb-6">
        <h1 className="text-4xl font-extrabold text-on-surface tracking-tight">My Assets</h1>
        <p className="text-on-surface-secondary mt-1">A long-term perspective on value.</p>
      </header>
      
      <SummaryHeader assets={assets} />
      
      <main className="mt-8 grid grid-cols-2 gap-4">
        {assets.map(asset => (
          <AssetCard key={asset.id} asset={asset} />
        ))}
      </main>

      <div className="fixed bottom-6 right-1/2 translate-x-1/2 w-full max-w-md px-4 z-10">
         <button
            onClick={onNavigateToAdd}
            className="w-full h-14 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/30 flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add New Asset
          </button>
      </div>
    </div>
  );
};

export default AssetListPage;
