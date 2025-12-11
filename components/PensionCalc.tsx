import React, { useState } from 'react';
import { TrendingUp, Wallet } from 'lucide-react';

export const PensionCalc: React.FC = () => {
  const [currentBalance, setCurrentBalance] = useState<string>('2000000');
  const [monthlyContribution, setMonthlyContribution] = useState<string>('30000');
  const [years, setYears] = useState<string>('20');
  const [interestRate, setInterestRate] = useState<string>('10'); // Conservative avg

  const calculatePension = () => {
    const P = parseFloat(currentBalance) || 0;
    const PMT = parseFloat(monthlyContribution) || 0;
    const t = parseFloat(years) || 0;
    const r = (parseFloat(interestRate) || 0) / 100;
    const n = 12; // Monthly compounding

    // Future Value of Initial Lump Sum: P * (1 + r/n)^(nt)
    const fvLumpSum = P * Math.pow(1 + r/n, n*t);

    // Future Value of Series: PMT * ((1 + r/n)^(nt) - 1) / (r/n)
    const fvSeries = PMT * (Math.pow(1 + r/n, n*t) - 1) / (r/n);

    const total = fvLumpSum + fvSeries;
    const totalContributed = P + (PMT * 12 * t);
    const totalInterest = total - totalContributed;

    return { total, totalContributed, totalInterest };
  };

  const { total, totalContributed, totalInterest } = calculatePension();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
            <Wallet className="text-blue-700" size={24} />
            Pension Projector
        </h2>
        <p className="text-sm text-gray-500 mb-6">See how your RSA balance grows over time with compound interest.</p>

        <div className="space-y-4 mb-6">
            <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Current RSA Balance</label>
                <input
                    type="number"
                    value={currentBalance}
                    onChange={(e) => setCurrentBalance(e.target.value)}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Monthly Add</label>
                    <input
                        type="number"
                        value={monthlyContribution}
                        onChange={(e) => setMonthlyContribution(e.target.value)}
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900"
                    />
                </div>
                <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Years Left</label>
                    <input
                        type="number"
                        value={years}
                        onChange={(e) => setYears(e.target.value)}
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900"
                    />
                </div>
            </div>

            <div>
                 <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Assumed Annual Return: {interestRate}%</label>
                 <input 
                    type="range" min="5" max="18" step="0.5"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
            </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-5 border border-blue-100 space-y-2">
            <p className="text-blue-900 font-bold text-sm uppercase text-center mb-2">Projected Balance in {years} Years</p>
            <p className="text-3xl font-bold text-blue-700 text-center mb-4">
                ₦{total.toLocaleString(undefined, {maximumFractionDigits: 0})}
            </p>
            
            <div className="grid grid-cols-2 gap-2 text-xs border-t border-blue-200 pt-3">
                 <div>
                    <span className="text-gray-500 block">Total Contributed</span>
                    <span className="font-bold text-gray-700">₦{totalContributed.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                 </div>
                 <div className="text-right">
                    <span className="text-gray-500 block">Interest Earned</span>
                    <span className="font-bold text-green-600">+₦{totalInterest.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
};