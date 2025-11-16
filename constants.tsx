
import { Asset, IconCategory } from './types';

export const mockAssets: Asset[] = [
  {
    id: '1',
    name: 'MacBook Pro 16"',
    icon: '💻',
    status: 'In Use',
    purchasePrice: 21999,
    purchaseDate: '2023-10-30',
    targetUsageDays: 1825, // 5 years
  },
  {
    id: '2',
    name: 'iPhone 15 Pro Max',
    icon: '📱',
    status: 'In Use',
    purchasePrice: 9999,
    purchaseDate: '2023-09-22',
    targetUsageDays: 1095, // 3 years
  },
  {
    id: '3',
    name: 'Sony WH-1000XM5',
    icon: '🎧',
    status: 'In Use',
    purchasePrice: 2999,
    purchaseDate: '2024-01-15',
    targetUsageDays: 1460, // 4 years
  },
    {
    id: '4',
    name: 'Herman Miller Aeron',
    icon: '🪑',
    status: 'Retired',
    purchasePrice: 12000,
    purchaseDate: '2020-05-20',
    targetUsageDays: 3650, // 10 years
  },
];

export const ICON_CATEGORIES: IconCategory[] = [
  { name: 'Electronics', icon: '⚡️', items: ['📱', '💻', '🎧', '📷', '⌚️', '🖥', '⌨️', '🖱', '🎮', '💡'] },
  { name: 'Appliances', icon: '🔌', items: ['🧊', '🍳', '💨', '☕️', '📺', '洗濯機', '乾燥機'] },
  { name: 'Furniture', icon: '🛋', items: ['🛋', '🪑', '🛏', '📚', '🚪'] },
  { name: 'Fashion', icon: '👜', items: ['👜', '👟', '🧥', '👓', '💍'] },
  { name: 'Vehicles', icon: '🚗', items: ['🚗', '🚲', '🏍', '🛴'] },
  { name: 'Sports', icon: '🏋️', items: ['🏋️', '🧘‍♀️', '🧗‍♂️', '🏂', '🏄‍♂️'] },
];

export const assetStatuses: ['In Use', 'Retired', 'Sold'] = ['In Use', 'Retired', 'Sold'];
