import React, { useState } from 'react';
import { Heart, Camera, Utensils, Music, Scissors } from 'lucide-react';

export const WeddingBudget: React.FC = () => {
  const [budget, setBudget] = useState<string>('5000000');

  const total = parseFloat(budget) || 0;

  // Typical Nigerian Wedding Split
  const items = [
    { label: 'Venue & Decor', pct: 0.25, icon: Heart, color: 'text-pink-500', bg: 'bg-pink-50' },
    { label: 'Food & Drinks', pct: 0.35, icon: Utensils, color: 'text-orange-500', bg: 'bg-orange-50' },
    { label: 'Attire & Makeup', pct: 0.15, icon: Scissors, color: 'text-purple-500', bg: 'bg-purple-50' },
    { label: 'Photo/Video', pct: 0.10, icon: Camera, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'DJ/MC & Misc', pct: 0.15, icon: Music, color: 'text-gray-500', bg: 'bg-gray-50' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
            <Heart className="text-rose-500" size={24} />
            Wedding Budget
        </h2>
        <p className="text-sm text-gray-500 mb-6">Allocate your budget across key categories based on current event trends.</p>

        <div className="mb-6">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Total Budget</label>
            <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xl">₦</span>
                <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
            </div>
        </div>

        <div className="space-y-3">
            {items.map((item) => (
                <div key={item.label} className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${item.bg} ${item.color}`}>
                            <item.icon size={18} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-800">{item.label}</p>
                            <p className="text-[10px] text-gray-400">{(item.pct * 100).toFixed(0)}% Allocation</p>
                        </div>
                    </div>
                    <span className="font-bold text-gray-900">
                        ₦{(total * item.pct).toLocaleString(undefined, {maximumFractionDigits: 0})}
                    </span>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};