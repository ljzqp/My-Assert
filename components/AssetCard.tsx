import React from 'react';
import { Asset } from '../types';
import { calculateDaysUsed } from '../utils/dateUtils';

interface AssetCardProps {
  asset: Asset;
}

const AssetCard: React.FC<AssetCardProps> = ({ asset }) => {
  const daysUsed = calculateDaysUsed(asset.purchaseDate);
  const progress = Math.min((daysUsed / asset.targetUsageDays) * 100, 100);

  const statusColors: { [key in Asset['status']]: string } = {
    'In Use': 'bg-green-100 text-green-700',
    'Retired': 'bg-gray-200 text-gray-600',
    'Sold': 'bg-yellow-100 text-yellow-700',
  };

  return (
    <div className="bg-surface rounded-3xl p-3 flex flex-col gap-3 shadow-lg shadow-gray-200/40 relative transition-transform hover:scale-105 hover:shadow-xl">
       <div className="relative">
         <span className={`absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold rounded-full ${statusColors[asset.status]} z-10`}>
          {asset.status}
        </span>
        <div className="aspect-square w-full bg-base rounded-2xl flex items-center justify-center text-5xl overflow-hidden">
            {asset.imageUrl ? <img src={asset.imageUrl} alt={asset.name} className="w-full h-full object-cover" /> : asset.icon}
        </div>
       </div>
      
      <div className="flex flex-col px-1 flex-grow justify-between">
        <div>
            <h2 className="text-sm font-bold text-on-surface truncate">{asset.name}</h2>
            <p className="text-xs text-on-surface-secondary mt-0.5">
            ¥{asset.purchasePrice.toLocaleString()}
            </p>
        </div>

        <div className="mt-2">
            <div className="flex justify-between text-[10px] text-on-surface-secondary mb-1">
              <span>{daysUsed} days used</span>
            </div>
            <div className="w-full bg-base rounded-full h-1.5">
              <div
                className="bg-primary rounded-full h-1.5 transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AssetCard;
