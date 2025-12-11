import React, { useState } from 'react';
import { Scale, ShoppingBag } from 'lucide-react';
import { MARKET_UNITS } from '../constants';

export const MarketConverter: React.FC = () => {
  const [quantity, setQuantity] = useState<string>('1');
  const [selectedUnit, setSelectedUnit] = useState<string>(MARKET_UNITS[0].id);

  const unit = MARKET_UNITS.find(u => u.id === selectedUnit) || MARKET_UNITS[0];
  const totalKg = (parseFloat(quantity) || 0) * unit.toKg;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
            <Scale className="text-indigo-600" size={24} />
            Market Unit Converter
        </h2>
        <p className="text-sm text-gray-500 mb-6">Convert local measurements like "Derica" or "Paint Rubber" to Kilograms.</p>

        <div className="space-y-4">
            <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Select Measurement</label>
                <div className="relative">
                    <ShoppingBag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <select 
                        value={selectedUnit}
                        onChange={(e) => setSelectedUnit(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
                    >
                        {MARKET_UNITS.map((u) => (
                            <option key={u.id} value={u.id}>
                                {u.name} (~{u.toKg}kg)
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Quantity</label>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="e.g., 2"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
        </div>

        <div className="mt-8 bg-indigo-600 rounded-xl p-6 text-center text-white relative overflow-hidden">
            <div className="relative z-10">
                <p className="text-indigo-200 text-sm mb-1">Equivalent Weight</p>
                <p className="text-4xl font-bold text-white mb-1">
                    {totalKg.toLocaleString(undefined, { maximumFractionDigits: 2 })} <span className="text-lg text-indigo-200">KG</span>
                </p>
            </div>
             <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        </div>
      </div>
      
       <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 text-xs text-indigo-800">
        <strong>Note:</strong> Weights are approximations. A "heap" of derica vs a "level" derica can vary by 10-15%.
      </div>
    </div>
  );
};