import React, { useMemo } from 'react';
import { Asset } from '../types';
import { calculateDaysUsed } from '../utils/dateUtils';

interface SummaryHeaderProps {
  assets: Asset[];
}

const SummaryHeader: React.FC<SummaryHeaderProps> = ({ assets }) => {
  const summary = useMemo(() => {
    const totalAssets = assets.length;
    const totalPurchaseAmount = assets.reduce((sum, asset) => sum + asset.purchasePrice, 0);
    
    const inUseAssets = assets.filter(asset => asset.status === 'In Use');

    const totalDailyCost = inUseAssets.reduce((sum, asset) => {
            const daysUsed = calculateDaysUsed(asset.purchaseDate);
            if (asset.targetUsageDays > 0) {
                return sum + (asset.purchasePrice / asset.targetUsageDays);
            }
            return sum;
        }, 0);
    
    const avgDailyCost = inUseAssets.length > 0 ? totalDailyCost / inUseAssets.length : 0;

    return {
      totalAssets,
      totalPurchaseAmount,
      avgDailyCost,
    };
  }, [assets]);

  const formatCurrency = (value: number) => {
    return `¥${value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  }

  const formatDailyCost = (value: number) => {
    return `¥${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  return (
    <div className="bg-surface rounded-3xl p-6 shadow-xl shadow-gray-200/50">
      <p className="text-sm text-on-surface-secondary">Total Value</p>
      <p className="text-4xl font-bold text-on-surface mt-1">{formatCurrency(summary.totalPurchaseAmount)}</p>
      <div className="mt-6 grid grid-cols-2 gap-4">
          <div>
              <p className="text-xs text-on-surface-secondary">Avg Daily Cost</p>
              <p className="text-lg font-semibold text-primary">{formatDailyCost(summary.avgDailyCost)}</p>
          </div>
          <div>
              <p className="text-xs text-on-surface-secondary">Total Assets</p>
              <p className="text-lg font-semibold text-on-surface">{summary.totalAssets}</p>
          </div>
      </div>
    </div>
  );
};

export default SummaryHeader;
