import React, { useState } from 'react';
import { Ship, Info } from 'lucide-react';
import { MOCK_RATES } from '../constants';
import { CurrencyCode } from '../types';

export const ImportDuty: React.FC = () => {
  const [cif, setCif] = useState<string>('1000');
  const [rate, setRate] = useState<string>('20');
  const exchangeRate = MOCK_RATES[CurrencyCode.USD].official_sell; // Customs uses official rate usually

  const cifUsd = parseFloat(cif) || 0;
  const cifNgn = cifUsd * exchangeRate;
  const dutyRate = (parseFloat(rate) || 0) / 100;

  // Calculation Logic (Simplified General Goods)
  const surfaceDuty = cifNgn * dutyRate;
  const surcharge = surfaceDuty * 0.07; // 7% Surcharge on Duty
  const ciss = cifNgn * 0.01; // 1% FOB/CISS
  const etls = cifNgn * 0.005; // 0.5% ECOWAS
  const vatBase = cifNgn + surfaceDuty + surcharge + ciss + etls;
  const vat = vatBase * 0.075; // 7.5% VAT

  const totalDuty = surfaceDuty + surcharge + ciss + etls + vat;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
            <Ship className="text-blue-800" size={24} />
            Import Duty
        </h2>
        <p className="text-sm text-gray-500 mb-6">Estimate clearing costs for General Goods (excluding Cars).</p>

        <div className="space-y-4 mb-6">
            <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">CIF Value ($)</label>
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                    <input
                        type="number"
                        value={cif}
                        onChange={(e) => setCif(e.target.value)}
                        className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <p className="text-[10px] text-gray-400 mt-1">Cost + Insurance + Freight value</p>
            </div>

            <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Duty Rate (%)</label>
                <select 
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-medium text-gray-900"
                >
                    <option value="5">5% (Raw Materials)</option>
                    <option value="10">10% (Semi-Finished)</option>
                    <option value="20">20% (Finished Goods)</option>
                    <option value="35">35% (Luxury/Special)</option>
                </select>
            </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-5 border border-blue-100 space-y-3">
             <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Exchange Rate (Customs)</span>
                <span className="font-bold text-gray-800">₦{exchangeRate.toLocaleString()}</span>
            </div>
            <div className="border-t border-blue-200 my-2"></div>
             <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Surface Duty</span>
                <span className="font-medium text-gray-800">₦{surfaceDuty.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
            </div>
             <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">VAT (7.5%)</span>
                <span className="font-medium text-gray-800">₦{vat.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
            </div>
             <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Levies (CISS/ETLS/Sur)</span>
                <span className="font-medium text-gray-800">₦{(ciss + etls + surcharge).toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
            </div>
            <div className="border-t border-blue-200 pt-3 mt-1">
                <div className="flex justify-between items-center">
                    <span className="text-blue-900 font-bold">Total Clearing Cost</span>
                    <span className="text-xl font-bold text-blue-800">₦{totalDuty.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                </div>
            </div>
        </div>
        
        <div className="flex gap-2 items-start mt-4 text-xs text-gray-400">
            <Info size={14} className="mt-0.5 shrink-0"/>
            <p>Excludes Shipping Line charges, Terminal charges, and Agency fees.</p>
        </div>
      </div>
    </div>
  );
};