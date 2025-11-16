
export type AssetStatus = 'In Use' | 'Retired' | 'Sold';

export interface Asset {
  id: string;
  name: string;
  icon: string;
  imageUrl?: string; 
  status: AssetStatus;
  purchasePrice: number;
  purchaseDate: string; // ISO 8601 format: "YYYY-MM-DD"
  targetUsageDays: number;
}

export type Page = 'list' | 'add';

export interface IconCategory {
  name: string;
  icon: string;
  items: string[];
}
