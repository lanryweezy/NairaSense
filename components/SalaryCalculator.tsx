import React, { useState } from 'react';
import { Briefcase, ArrowRight } from 'lucide-react';

export const SalaryCalculator: React.FC = () => {
  const [grossSalary, setGrossSalary] = useState<string>('');
  
  const calculateSalary = () => {
    const gross = parseFloat(grossSalary) || 0;
    
    // Simplified Nigerian Tax Logic (For estimation purposes)
    const pension = gross * 0.08; // 8% Pension
    const nhf = gross * 0.025; // 2.5% Housing Fund (Optional often, but standard)
    
    // Consolidated Relief Allowance (CRA): Higher of 200k or 1% of Gross + 20% of Gross
    const cra = Math.max(200000 / 12, gross * 0.01) + (gross * 0.20);
    
    const taxableIncome = Math.max(0, gross - pension - nhf - cra);
    
    // Simplified PAYE bands (Monthly)
    let tax = 0;
    // Note: This is a very rough approximation of the progressive tax bands for UI simplicity
    if (taxableIncome > 0) {
        tax = taxableIncome * 0.15; // Averaging the bands for estimation
    }

    const net = gross - pension - nhf - tax;

    return { pension, nhf, tax, net };
  };

  const { pension, nhf, tax, net } = calculateSalary();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
            <Briefcase className="text-ng-green" size={24} />
            Salary Estimator
        </h2>
        <p className="text-sm text-gray-500 mb-6">Estimate your monthly take-home pay after Pension, NHF, and PAYE tax deductions.</p>

        <div className="space-y-2 mb-6">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Monthly Gross Income</label>
            <div className="relative">
                <span className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xl">₦</span>
                <input
                    type="number"
                    value={grossSalary}
                    onChange={(e) => setGrossSalary(e.target.value)}
                    placeholder="e.g. 500,000"
                    className="w-full pl-6 text-3xl font-bold text-gray-900 bg-transparent border-b border-gray-200 focus:border-ng-green focus:outline-none pb-2 rounded-none placeholder-gray-200"
                />
            </div>
        </div>

        <div className="space-y-3 bg-gray-50 p-4 rounded-xl">
             <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Pension (8%)</span>
                <span className="font-medium text-red-500">- ₦{pension.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
            </div>
             <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">NHF (2.5%)</span>
                <span className="font-medium text-red-500">- ₦{nhf.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
            </div>
             <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Est. Tax (PAYE)</span>
                <span className="font-medium text-red-500">- ₦{tax.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
            </div>
            <div className="pt-3 border-t border-gray-200 mt-2">
                <div className="flex justify-between items-center">
                    <span className="text-base font-bold text-gray-800">Net Pay</span>
                    <span className="text-2xl font-bold text-ng-green">₦{net.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                </div>
                <p className="text-[10px] text-gray-400 text-right mt-1">Take Home</p>
            </div>
        </div>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-xs text-blue-800">
        This is an estimation. Actual tax may vary based on your company's specific relief allowances and recent Finance Act updates.
      </div>
    </div>
  );
};