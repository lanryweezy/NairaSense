import React, { useState } from 'react';
import { Plane, AlertTriangle } from 'lucide-react';
import { MOCK_RATES } from '../constants';
import { CurrencyCode } from '../types';

export const JapaCalc: React.FC = () => {
  const [targetCurr, setTargetCurr] = useState<CurrencyCode>(CurrencyCode.GBP);
  const [amount, setAmount] = useState<string>('15000'); // Typical UK student maintenance + tuition balance

  const rate = MOCK_RATES[targetCurr].parallel_sell;
  const baseNaira = (parseFloat(amount) || 0) * rate;
  
  // 15% Buffer for exchange rate volatility during the 28-day holding period
  const buffer = baseNaira * 0.15;
  const totalRequired = baseNaira + buffer;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
            <Plane className="text-sky-600" size={24} />
            Proof of Funds
        </h2>
        <p className="text-sm text-gray-500 mb-6">Calculate the Naira balance needed for Visa applications (28-day rule).</p>

        <div className="space-y-4 mb-6">
            <div className="flex gap-2">
                 <div className="w-1/3">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Currency</label>
                    <select 
                        value={targetCurr}
                        onChange={(e) => setTargetCurr(e.target.value as CurrencyCode)}
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-medium text-gray-900"
                    >
                        <option value={CurrencyCode.GBP}>🇬🇧 GBP</option>
                        <option value={CurrencyCode.USD}>🇺🇸 USD</option>
                        <option value={CurrencyCode.CAD}>🇨🇦 CAD</option>
                        <option value={CurrencyCode.EUR}>🇪🇺 EUR</option>
                    </select>
                </div>
                <div className="flex-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Amount Required</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                </div>
            </div>
        </div>

        <div className="bg-sky-50 rounded-xl p-5 border border-sky-100 space-y-3">
             <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Base Amount (@{rate.toLocaleString()})</span>
                <span className="font-bold text-gray-800">₦{baseNaira.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
            </div>
             <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm flex items-center gap-1">Volatility Buffer (15%)</span>
                <span className="font-bold text-amber-600">+ ₦{buffer.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
            </div>
            <div className="border-t border-sky-200 pt-3 mt-1">
                <div className="flex justify-between items-center">
                    <span className="text-sky-900 font-bold">Recommended Total</span>
                    <span className="text-2xl font-bold text-sky-700">₦{totalRequired.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                </div>
            </div>
        </div>
      </div>
      
       <div className="flex gap-3 bg-amber-50 p-4 rounded-xl border border-amber-100">
            <AlertTriangle className="text-amber-600 shrink-0" size={20} />
            <p className="text-xs text-amber-800">
                <strong>Important:</strong> Embassies use the official OANDA rate, but you buy FX at the black market rate. Always keep a healthy buffer above the minimum requirement to avoid rejection due to currency fluctuation.
            </p>
      </div>
    </div>
  );
};