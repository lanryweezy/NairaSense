import React, { useState } from 'react';
import { Zap, Info, CheckCircle2 } from 'lucide-react';
import { POWER_BANDS } from '../constants';

export const ElectricityCalculator: React.FC = () => {
  const [amount, setAmount] = useState<string>('5000');
  const [selectedBandRate, setSelectedBandRate] = useState<number>(POWER_BANDS[0].rate);
  const [deductVat, setDeductVat] = useState<boolean>(true);

  // Calculations
  const totalAmount = parseFloat(amount) || 0;
  
  // Logic: When you buy 5000 Naira credit, VAT is deducted from that 5000.
  // Total = EnergyCost + VAT
  // VAT = 7.5% of EnergyCost
  // Total = EnergyCost * 1.075
  // EnergyCost = Total / 1.075
  const energyCost = deductVat ? totalAmount / 1.075 : totalAmount;
  const vat = totalAmount - energyCost;
  
  const units = energyCost / selectedBandRate;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
            <Zap className="text-yellow-500" size={24} />
            Electricity Units
        </h2>
        <p className="text-sm text-gray-500 mb-6">Calculate estimated kWh tokens based on your tariff band and budget.</p>

        <div className="space-y-5">
            <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Select Tariff Band</label>
                <div className="relative">
                    <select 
                        value={selectedBandRate}
                        onChange={(e) => setSelectedBandRate(parseFloat(e.target.value))}
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium focus:ring-2 focus:ring-yellow-400 focus:outline-none appearance-none"
                    >
                        {POWER_BANDS.map((band) => (
                            <option key={band.band} value={band.rate}>
                                {band.band} (₦{band.rate}/kWh)
                            </option>
                        ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <Info size={16} className="text-gray-400" />
                    </div>
                </div>
            </div>

            <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Amount to Buy</label>
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">₦</span>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                    />
                </div>
            </div>

            <div 
                className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200 cursor-pointer select-none transition-colors hover:bg-gray-100" 
                onClick={() => setDeductVat(!deductVat)}
            >
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${deductVat ? 'bg-yellow-500 border-yellow-500' : 'bg-white border-gray-300'}`}>
                    {deductVat && <CheckCircle2 size={14} className="text-white" />}
                </div>
                <span className="text-sm text-gray-700">Auto-deduct VAT (7.5%)</span>
            </div>
        </div>

        <div className="mt-6 bg-gray-900 rounded-xl p-6 text-center text-white relative overflow-hidden">
            <div className="relative z-10">
                <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Estimated Units</p>
                <p className="text-5xl font-bold text-yellow-400 mb-2">
                    {units.toFixed(1)} <span className="text-lg text-yellow-400/70">kWh</span>
                </p>
                
                {deductVat && (
                    <div className="flex justify-center gap-4 text-xs text-gray-400 mt-2 border-t border-gray-800 pt-2">
                        <span className="flex items-center gap-1">Energy: <span className="text-white">₦{energyCost.toLocaleString(undefined, {maximumFractionDigits:0})}</span></span>
                        <span className="flex items-center gap-1">Tax: <span className="text-red-400">₦{vat.toLocaleString(undefined, {maximumFractionDigits:0})}</span></span>
                    </div>
                )}
            </div>
             <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl"></div>
        </div>
      </div>
      
       <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100 text-xs text-yellow-800 flex gap-2">
        <Info className="shrink-0 mt-0.5" size={16} />
        <p>
            <strong>Tip:</strong> Band A users (20+ hrs supply) currently pay approx ₦206.80/kWh. Rates for other bands are significantly lower but enjoy less power supply hours.
        </p>
      </div>
    </div>
  );
};