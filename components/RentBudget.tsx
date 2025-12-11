import React, { useState } from 'react';
import { Home, AlertCircle } from 'lucide-react';

export const RentBudget: React.FC = () => {
  const [monthlyIncome, setMonthlyIncome] = useState<string>('300000');

  const income = parseFloat(monthlyIncome) || 0;
  const annualIncome = income * 12;

  // 30% rule for safe rent
  const safeRentAnnual = annualIncome * 0.30;
  // 40% stretch
  const stretchRentAnnual = annualIncome * 0.40;

  // Estimating fees (Agency 10% + Legal 10% + Caution 5% approx) = +25% overhead
  const safeRentCore = safeRentAnnual / 1.25;
  const fees = safeRentAnnual - safeRentCore;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
            <Home className="text-pink-600" size={24} />
            Rent Budget
        </h2>
        <p className="text-sm text-gray-500 mb-6">Calculate a safe annual rent budget based on your monthly income.</p>

        <div className="mb-8">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Monthly Net Income</label>
            <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xl">₦</span>
                <input
                    type="number"
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
            </div>
        </div>

        <div className="space-y-4">
             <div className="bg-green-50 p-4 rounded-xl border border-green-100 relative overflow-hidden">
                <div className="relative z-10">
                    <p className="text-green-800 font-bold text-sm mb-1">Recommended Budget (Total)</p>
                    <p className="text-3xl font-bold text-green-900">₦{safeRentAnnual.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
                    <p className="text-xs text-green-700 mt-1 opacity-80">Max 30% of annual income</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                 <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">House Rent (Approx)</p>
                    <p className="font-bold text-gray-800">₦{safeRentCore.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Fees (Agency/Legal)</p>
                    <p className="font-bold text-gray-800">~₦{fees.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
                </div>
            </div>
        </div>
      </div>

       <div className="flex gap-3 bg-pink-50 p-4 rounded-xl border border-pink-100">
            <AlertCircle className="text-pink-600 shrink-0" size={20} />
            <p className="text-xs text-pink-800">
                <strong>Reality Check:</strong> Landlords in Lagos/Abuja typically demand 1 year upfront. Agency (10%) and Legal (10%) fees are standard extra costs.
            </p>
      </div>
    </div>
  );
};