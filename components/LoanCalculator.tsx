import React, { useState } from 'react';
import { Banknote, PieChart } from 'lucide-react';

export const LoanCalculator: React.FC = () => {
  const [amount, setAmount] = useState<string>('500000');
  const [rate, setRate] = useState<string>('25'); // Annual rate
  const [months, setMonths] = useState<string>('12');

  const calculateLoan = () => {
    const P = parseFloat(amount) || 0;
    const annualRate = parseFloat(rate) || 0;
    const n = parseFloat(months) || 1;

    // Monthly interest rate
    const r = annualRate / 12 / 100;
    
    // EMI Formula: P * r * (1+r)^n / ((1+r)^n - 1)
    let emi = 0;
    let totalPayment = 0;
    
    if (r === 0) {
        emi = P / n;
        totalPayment = P;
    } else {
        emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        totalPayment = emi * n;
    }

    return { emi, totalPayment, interest: totalPayment - P };
  };

  const { emi, totalPayment, interest } = calculateLoan();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
            <Banknote className="text-emerald-600" size={24} />
            Loan Estimator
        </h2>
        <p className="text-sm text-gray-500 mb-6">Estimate monthly repayments for bank loans or apps.</p>

        <div className="space-y-4">
            <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Loan Amount</label>
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₦</span>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Interest Rate (%)</label>
                    <input
                        type="number"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        placeholder="Annual"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <p className="text-[10px] text-gray-400 mt-1">Annual Rate</p>
                </div>
                 <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Duration</label>
                    <input
                        type="number"
                        value={months}
                        onChange={(e) => setMonths(e.target.value)}
                        placeholder="Months"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <p className="text-[10px] text-gray-400 mt-1">Months</p>
                </div>
            </div>
        </div>

        <div className="mt-8 bg-emerald-50 rounded-xl p-4 border border-emerald-100">
            <div className="flex justify-between items-center mb-2">
                <span className="text-emerald-800 text-sm font-medium">Monthly Pay</span>
                <span className="text-xl font-bold text-emerald-700">₦{emi.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
                <span className="text-gray-500 text-xs">Total Interest</span>
                <span className="text-sm font-semibold text-gray-600">₦{interest.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
            </div>
            <div className="border-t border-emerald-200 pt-2 mt-2 flex justify-between items-center">
                <span className="text-emerald-900 text-xs font-bold uppercase">Total Repayment</span>
                <span className="text-emerald-900 text-sm font-bold">₦{totalPayment.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
            </div>
        </div>
      </div>
    </div>
  );
};