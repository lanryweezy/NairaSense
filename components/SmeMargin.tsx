import React, { useState } from 'react';
import { Store, TrendingUp } from 'lucide-react';

export const SmeMargin: React.FC = () => {
  const [costPrice, setCostPrice] = useState<string>('5000');
  const [margin, setMargin] = useState<string>('20');

  const cost = parseFloat(costPrice) || 0;
  const marginPercent = parseFloat(margin) || 0;

  // Selling Price = Cost / (1 - Margin%) for Gross Margin
  // OR Selling Price = Cost * (1 + Markup%)
  // In Nigeria, "Margin" is often used interchangeably with "Markup" colloquially, 
  // but strictly, Profit Margin = (Sales - Cost) / Sales.
  // Let's implement true Margin (Profit as % of Sales) as it ensures better profitability.
  
  const sellingPrice = marginPercent < 100 ? cost / (1 - (marginPercent / 100)) : 0;
  const profit = sellingPrice - cost;
  const markup = cost > 0 ? (profit / cost) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
            <Store className="text-purple-600" size={24} />
            SME Calculator
        </h2>
        <p className="text-sm text-gray-500 mb-6">Calculate the right selling price to hit your profit goals.</p>

        <div className="space-y-4 mb-6">
            <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Cost Price (Goods + Shipping)</label>
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xl">₦</span>
                    <input
                        type="number"
                        value={costPrice}
                        onChange={(e) => setCostPrice(e.target.value)}
                        className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
            </div>

            <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Desired Profit Margin (%)</label>
                <div className="flex items-center gap-3">
                    <input
                        type="range" min="5" max="90" step="5"
                        value={margin}
                        onChange={(e) => setMargin(e.target.value)}
                        className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                    <div className="w-16 py-2 bg-purple-50 rounded-lg text-center font-bold text-purple-700 text-sm">
                        {margin}%
                    </div>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="text-xs text-gray-500 mb-1">Selling Price</p>
                <p className="text-xl font-bold text-gray-900">₦{sellingPrice.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                <p className="text-xs text-green-700 mb-1">Profit/Unit</p>
                <p className="text-xl font-bold text-green-700">+₦{profit.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
            </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs text-gray-400 justify-center">
            <TrendingUp size={14} />
            <span>This equals a <strong>{markup.toFixed(0)}%</strong> Markup on Cost</span>
        </div>
      </div>
    </div>
  );
};