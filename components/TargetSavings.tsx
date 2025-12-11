import React, { useState, useEffect } from 'react';
import { Target, Calendar as CalendarIcon } from 'lucide-react';

export const TargetSavings: React.FC = () => {
  const [targetAmount, setTargetAmount] = useState<string>('500000');
  const [targetDate, setTargetDate] = useState<string>('');

  // Set default date to end of year
  useEffect(() => {
    const today = new Date();
    const endOfYear = new Date(today.getFullYear(), 11, 31);
    setTargetDate(endOfYear.toISOString().split('T')[0]);
  }, []);

  const calculateSavings = () => {
    const amount = parseFloat(targetAmount) || 0;
    const start = new Date();
    start.setHours(0,0,0,0);
    const end = new Date(targetDate);
    end.setHours(0,0,0,0);

    const diffTime = Math.max(0, end.getTime() - start.getTime());
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const weeks = days / 7;
    const months = days / 30.44;

    if (days <= 0) return { daily: 0, weekly: 0, monthly: 0, days: 0 };

    return {
        daily: amount / days,
        weekly: amount / Math.max(1, weeks),
        monthly: amount / Math.max(1, months),
        days
    };
  };

  const { daily, weekly, monthly, days } = calculateSavings();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
            <Target className="text-teal-600" size={24} />
            Target Savings
        </h2>
        <p className="text-sm text-gray-500 mb-6">Plan for rent, a new car, or "Detty December".</p>

        <div className="space-y-4 mb-6">
            <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Target Amount</label>
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xl">₦</span>
                    <input
                        type="number"
                        value={targetAmount}
                        onChange={(e) => setTargetAmount(e.target.value)}
                        className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                </div>
            </div>

            <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Goal Date</label>
                <div className="relative">
                    <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="date"
                        value={targetDate}
                        onChange={(e) => setTargetDate(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                </div>
                <p className="text-xs text-right text-gray-400 mt-1">{days} days remaining</p>
            </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
            <div className="bg-teal-50 p-3 rounded-xl border border-teal-100 text-center">
                <p className="text-[10px] uppercase font-bold text-teal-800 mb-1">Daily</p>
                <p className="font-bold text-gray-900 text-sm">₦{daily.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
            </div>
            <div className="bg-teal-50 p-3 rounded-xl border border-teal-100 text-center">
                <p className="text-[10px] uppercase font-bold text-teal-800 mb-1">Weekly</p>
                <p className="font-bold text-gray-900 text-sm">₦{weekly.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
            </div>
            <div className="bg-teal-600 p-3 rounded-xl border border-teal-600 text-center shadow-lg transform scale-105">
                <p className="text-[10px] uppercase font-bold text-teal-100 mb-1">Monthly</p>
                <p className="font-bold text-white text-sm">₦{monthly.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
            </div>
        </div>
      </div>
    </div>
  );
};