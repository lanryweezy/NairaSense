import React, { useState } from 'react';
import { Map, ArrowRightLeft } from 'lucide-react';
import { LAND_UNITS } from '../constants';

export const LandConverter: React.FC = () => {
  const [amount, setAmount] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState<string>('plot_lagos');
  const [toUnit, setToUnit] = useState<string>('sqm');

  const convert = () => {
    const val = parseFloat(amount) || 0;
    const from = LAND_UNITS.find(u => u.id === fromUnit) || LAND_UNITS[0];
    const to = LAND_UNITS.find(u => u.id === toUnit) || LAND_UNITS[0];

    // Convert to SQM then to Target
    const valInSqm = val * from.toSqm;
    return valInSqm / to.toSqm;
  };

  const result = convert();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
            <Map className="text-emerald-800" size={24} />
            Land Measures
        </h2>
        <p className="text-sm text-gray-500 mb-6">Convert Plots to Acres, Hectares, or SQM.</p>

        <div className="space-y-4 mb-6">
            <div className="grid grid-cols-[1fr,auto,1fr] gap-2 items-end">
                <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">From</label>
                    <input 
                        type="number" 
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full p-2 border border-gray-200 rounded-t-lg font-bold text-xl focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                     <select 
                        value={fromUnit}
                        onChange={(e) => setFromUnit(e.target.value)}
                        className="w-full p-2 bg-gray-50 border border-t-0 border-gray-200 rounded-b-lg text-sm font-medium"
                    >
                        {LAND_UNITS.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                    </select>
                </div>

                <div className="pb-4 text-gray-400">
                    <ArrowRightLeft size={20} />
                </div>

                <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">To</label>
                    <div className="w-full p-2 border border-gray-200 rounded-t-lg font-bold text-xl bg-gray-50 text-emerald-800 overflow-hidden">
                        {result.toLocaleString(undefined, {maximumFractionDigits: 3})}
                    </div>
                     <select 
                        value={toUnit}
                        onChange={(e) => setToUnit(e.target.value)}
                        className="w-full p-2 bg-gray-50 border border-t-0 border-gray-200 rounded-b-lg text-sm font-medium"
                    >
                        {LAND_UNITS.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                    </select>
                </div>
            </div>
        </div>

        <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 text-xs text-emerald-900 leading-relaxed">
            <strong>Did you know?</strong> A "Standard Lagos Plot" is typically 600sqm (60ft x 100ft), but some estates sell 500sqm or even 300sqm (Half Plot). Always check the survey plan.
        </div>
      </div>
    </div>
  );
};