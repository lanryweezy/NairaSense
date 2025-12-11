import React, { useState } from 'react';
import { Plus, Minus, Check } from 'lucide-react';

export const TaxCalculator: React.FC = () => {
  const [baseAmount, setBaseAmount] = useState<string>('');
  const VAT_RATE = 0.075; // 7.5%

  const amount = parseFloat(baseAmount) || 0;
  const vatAmount = amount * VAT_RATE;
  const totalInclusive = amount; 
  // If user inputs Total and wants to remove VAT:
  // Total = Base * 1.075 => Base = Total / 1.075
  const baseExclusive = amount / (1 + VAT_RATE);
  const vatFromInclusive = amount - baseExclusive;

  const [mode, setMode] = useState<'add' | 'remove'>('add');

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-6">VAT Calculator (7.5%)</h2>
        
        <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
            <button
                onClick={() => setMode('add')}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-all ${
                    mode === 'add' ? 'bg-white text-ng-green shadow-sm' : 'text-gray-500'
                }`}
            >
                <Plus size={16} /> Add VAT
            </button>
            <button
                onClick={() => setMode('remove')}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-all ${
                    mode === 'remove' ? 'bg-white text-red-500 shadow-sm' : 'text-gray-500'
                }`}
            >
                <Minus size={16} /> Remove VAT
            </button>
        </div>

        <div className="space-y-2 mb-8">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                {mode === 'add' ? 'Amount (Exclusive)' : 'Total Amount (Inclusive)'}
            </label>
            <div className="relative">
                <span className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xl">₦</span>
                <input
                    type="number"
                    value={baseAmount}
                    onChange={(e) => setBaseAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-6 text-3xl font-bold text-gray-900 bg-transparent border-b border-gray-200 focus:border-ng-green focus:outline-none pb-2 rounded-none placeholder-gray-200"
                />
            </div>
        </div>

        <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-dashed border-gray-200">
                <span className="text-gray-600">Base Amount</span>
                <span className="font-medium text-gray-900">
                    {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(mode === 'add' ? amount : baseExclusive)}
                </span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-dashed border-gray-200">
                <span className="text-gray-600">VAT (7.5%)</span>
                <span className="font-medium text-red-500">
                    + {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(mode === 'add' ? vatAmount : vatFromInclusive)}
                </span>
            </div>
            <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-bold text-gray-800">Total</span>
                <span className="text-2xl font-bold text-ng-green">
                    {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(mode === 'add' ? amount + vatAmount : totalInclusive)}
                </span>
            </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-xl">
        <h3 className="font-bold text-yellow-800 text-sm mb-1">Did you know?</h3>
        <p className="text-xs text-yellow-700">
            VAT in Nigeria was increased from 5% to 7.5% in 2020. This applies to most goods and services, excluding basic food items, medical supplies, and educational materials.
        </p>
      </div>
    </div>
  );
};