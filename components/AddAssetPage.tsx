
import React, { useState, ChangeEvent } from 'react';
import { Asset, AssetStatus } from '../types';
import IconPicker from './IconPicker';
import { assetStatuses } from '../constants';

interface AddAssetPageProps {
  onAddAsset: (newAsset: Omit<Asset, 'id'>) => void;
  onCancel: () => void;
}

const AddAssetPage: React.FC<AddAssetPageProps> = ({ onAddAsset, onCancel }) => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState<AssetStatus>('In Use');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [targetDays, setTargetDays] = useState('1095'); // Default to 3 years
  const [icon, setIcon] = useState('✨');
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
        setIcon(''); // Clear icon if image is uploaded
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIconSelect = (selectedIcon: string) => {
    setIcon(selectedIcon);
    setImageUrl(undefined); // Clear image if icon is selected
    setIsIconPickerOpen(false);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !date || !targetDays || (!icon && !imageUrl)) {
        alert("Please fill all fields");
        return;
    }
    
    onAddAsset({
      name,
      status,
      purchasePrice: parseFloat(price),
      purchaseDate: date,
      targetUsageDays: parseInt(targetDays, 10),
      icon: icon,
      imageUrl: imageUrl,
    });
  };

  return (
    <div className="p-4 min-h-screen flex flex-col">
      <header className="flex items-center justify-between pt-8 pb-6">
        <h1 className="text-4xl font-extrabold text-on-surface tracking-tight">New Asset</h1>
        <button onClick={onCancel} className="text-on-surface-secondary hover:text-on-surface">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </header>

      <form onSubmit={handleSubmit} className="flex-grow space-y-6">
        <div className="flex items-center justify-center gap-4">
          <div className="relative w-24 h-24 bg-surface rounded-2xl flex items-center justify-center text-5xl">
            {imageUrl ? <img src={imageUrl} alt="Asset preview" className="w-full h-full object-cover rounded-2xl" /> : icon}
            <label htmlFor="imageUpload" className="absolute -bottom-2 -right-2 bg-primary p-2 rounded-full cursor-pointer shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-base" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" /></svg>
            </label>
            <input id="imageUpload" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </div>
          <button type="button" onClick={() => setIsIconPickerOpen(true)} className="h-12 px-4 bg-surface rounded-lg font-semibold text-on-surface">
            or Select Icon
          </button>
        </div>

        <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-on-surface-secondary">Name</label>
            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-surface p-3 rounded-lg border-2 border-transparent focus:border-primary focus:outline-none" placeholder="e.g., iPhone 15 Pro" />
        </div>
        
        <div>
            <label className="text-sm font-medium text-on-surface-secondary">Status</label>
            <div className="mt-2 grid grid-cols-3 gap-2">
                {assetStatuses.map(s => (
                    <button key={s} type="button" onClick={() => setStatus(s)} className={`p-3 rounded-lg text-sm font-semibold transition ${status === s ? 'bg-primary text-base' : 'bg-surface text-on-surface'}`}>
                        {s}
                    </button>
                ))}
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
                <label htmlFor="price" className="text-sm font-medium text-on-surface-secondary">Purchase Price (¥)</label>
                <input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full bg-surface p-3 rounded-lg border-2 border-transparent focus:border-primary focus:outline-none" placeholder="9999" />
            </div>
             <div className="space-y-2">
                <label htmlFor="date" className="text-sm font-medium text-on-surface-secondary">Purchase Date</label>
                <input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-surface p-3 rounded-lg border-2 border-transparent focus:border-primary focus:outline-none" />
            </div>
        </div>

        <div className="space-y-2">
            <label htmlFor="targetDays" className="text-sm font-medium text-on-surface-secondary">Target Usage (days)</label>
            <input id="targetDays" type="number" value={targetDays} onChange={(e) => setTargetDays(e.target.value)} className="w-full bg-surface p-3 rounded-lg border-2 border-transparent focus:border-primary focus:outline-none" placeholder="e.g., 1095 for 3 years" />
        </div>
      </form>
      
      <div className="pt-6">
        <button onClick={handleSubmit} className="w-full h-14 bg-primary text-base font-bold rounded-xl shadow-lg shadow-primary/30 flex items-center justify-center transition-transform hover:scale-105 active:scale-95">
          Save Asset
        </button>
      </div>

      <IconPicker isOpen={isIconPickerOpen} onClose={() => setIsIconPickerOpen(false)} onSelect={handleIconSelect} />
    </div>
  );
};

export default AddAssetPage;
