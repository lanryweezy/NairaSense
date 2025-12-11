import React, { useState } from 'react';
import { INFLATION_DATA } from '../constants';
import { AlertTriangle } from 'lucide-react';

export const InflationCalc: React.FC = () => {
  const [amount, setAmount] = useState<string>('10000');
  const [startYear, setStartYear] = useState<number>(2015);
  const [endYear, setEndYear] = useState<number>(2024);

  const calculateInflation = () => {
    const startCPI = INFLATION_DATA.find(d => d.year === startYear)?.cpi || 100;
    const endCPI = INFLATION_DATA.find(d => d.year === endYear)?.cpi || 100;
    
    // Formula: Value = Amount * (EndCPI / StartCPI)
    const val = parseFloat(amount) || 0;
    return val * (endCPI / startCPI);
  };

  const result = calculateInflation();
  const percentChange = ((result - (parseFloat(amount)||0)) / (parseFloat(amount)||1)) * 100;

  return (
    <div className="space-y-6">
         <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Inflation Adjuster</h2>
            <p className="text-sm text-gray-500 mb-6">See how the purchasing power of the Naira has changed over time.</p>

            <div className="mb-6">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Amount in {startYear}</label>
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">₦</span>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full pl-8 pr-4 py-3 bg-gray-50 rounded-xl font-bold text-gray-900 focus:ring-2 focus:ring-ng-green focus:outline-none"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
                <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">From Year</label>
                    <select 
                        value={startYear}
                        onChange={(e) => setStartYear(parseInt(e.target.value))}
                        className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 font-medium"
                    >
                        {INFLATION_DATA.map(d => (
                            <option key={d.year} value={d.year}>{d.year}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">To Year</label>
                    <select 
                        value={endYear}
                        onChange={(e) => setEndYear(parseInt(e.target.value))}
                        className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 font-medium"
                    >
                        {INFLATION_DATA.map(d => (
                            <option key={d.year} value={d.year}>{d.year}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="bg-gray-900 rounded-xl p-6 text-center text-white relative overflow-hidden">
                <div className="relative z-10">
                    <p className="text-gray-400 text-sm mb-1">Equivalent Value in {endYear}</p>
                    <p className="text-3xl font-bold text-white mb-2">
                        {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(result)}
                    </p>
                    <div className="inline-block bg-white/10 px-3 py-1 rounded-full text-xs font-medium text-red-300">
                        {percentChange > 0 ? '+' : ''}{percentChange.toFixed(1)}% Increase needed
                    </div>
                </div>
                {/* Decorative background circle */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-ng-green/20 rounded-full blur-2xl"></div>
            </div>
         </div>

         <div className="flex gap-3 bg-red-50 p-4 rounded-xl border border-red-100">
            <AlertTriangle className="text-red-500 shrink-0" size={20} />
            <p className="text-sm text-red-700">
                <strong>Reality Check:</strong> An item that cost ₦{parseInt(amount).toLocaleString()} in {startYear} now costs roughly ₦{Math.round(result).toLocaleString()} in {endYear} due to inflation.
            </p>
         </div>
    </div>
  );
};