import React, { useState } from 'react';
import { Droplet } from 'lucide-react';

export const FuelCalculator: React.FC = () => {
  const [price, setPrice] = useState<string>('1050');
  const [liters, setLiters] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [activeInput, setActiveInput] = useState<'liters' | 'amount'>('amount');

  const handleLitersChange = (val: string) => {
    setLiters(val);
    setActiveInput('liters');
    const l = parseFloat(val);
    const p = parseFloat(price);
    if (!isNaN(l) && !isNaN(p)) {
        setAmount((l * p).toFixed(0));
    } else {
        setAmount('');
    }
  };

  const handleAmountChange = (val: string) => {
    setAmount(val);
    setActiveInput('amount');
    const a = parseFloat(val);
    const p = parseFloat(price);
    if (!isNaN(a) && !isNaN(p) && p !== 0) {
        setLiters((a / p).toFixed(2));
    } else {
        setLiters('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
            <Droplet className="text-orange-500" size={24} />
            Fuel Check
        </h2>
        <p className="text-sm text-gray-500 mb-6">Calculate liters vs. price instantly.</p>

        <div className="mb-6">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Current Price / Liter</label>
            <div className="flex items-center mt-1">
                <span className="bg-gray-100 px-3 py-2 rounded-l-lg text-gray-500 font-bold border border-r-0 border-gray-200">₦</span>
                <input 
                    type="number" 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded-r-lg font-bold text-gray-900 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
            </div>
        </div>

        <div className="grid grid-cols-[1fr,auto,1fr] gap-2 items-center">
            <div className={`p-4 rounded-xl border-2 transition-all ${activeInput === 'amount' ? 'border-orange-500 bg-orange-50' : 'border-gray-100 bg-gray-50'}`}>
                <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Budget (₦)</label>
                <input 
                    type="number"
                    value={amount}
                    onChange={(e) => handleAmountChange(e.target.value)}
                    placeholder="5000"
                    className="w-full bg-transparent font-bold text-xl text-gray-900 focus:outline-none"
                />
            </div>

            <div className="text-gray-300 font-bold text-xl">=</div>

            <div className={`p-4 rounded-xl border-2 transition-all ${activeInput === 'liters' ? 'border-orange-500 bg-orange-50' : 'border-gray-100 bg-gray-50'}`}>
                <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Liters</label>
                <input 
                    type="number"
                    value={liters}
                    onChange={(e) => handleLitersChange(e.target.value)}
                    placeholder="0"
                    className="w-full bg-transparent font-bold text-xl text-gray-900 focus:outline-none"
                />
            </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
          <button onClick={() => handleAmountChange('5000')} className="bg-white p-3 rounded-xl shadow-sm border border-gray-200 font-medium text-gray-700 hover:bg-gray-50">₦5,000</button>
          <button onClick={() => handleAmountChange('10000')} className="bg-white p-3 rounded-xl shadow-sm border border-gray-200 font-medium text-gray-700 hover:bg-gray-50">₦10,000</button>
          <button onClick={() => handleAmountChange('25000')} className="bg-white p-3 rounded-xl shadow-sm border border-gray-200 font-medium text-gray-700 hover:bg-gray-50">Full Tank (Car)</button>
          <button onClick={() => handleAmountChange('2000')} className="bg-white p-3 rounded-xl shadow-sm border border-gray-200 font-medium text-gray-700 hover:bg-gray-50">Gen (Keg)</button>
      </div>
    </div>
  );
};