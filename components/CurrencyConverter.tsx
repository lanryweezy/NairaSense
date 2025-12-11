import React, { useState, useMemo } from 'react';
import { ArrowDown, Info, RefreshCw } from 'lucide-react';
import { CurrencyCode, ExchangeRate } from '../types';
import { MOCK_RATES } from '../constants';

export const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState<string>('1');
  const [sourceCurr, setSourceCurr] = useState<CurrencyCode>(CurrencyCode.USD);
  const [targetCurr, setTargetCurr] = useState<CurrencyCode>(CurrencyCode.NGN);
  const [isParallel, setIsParallel] = useState<boolean>(true);
  const [lastUpdated] = useState<Date>(new Date());

  const handleSwap = () => {
    setSourceCurr(targetCurr);
    setTargetCurr(sourceCurr);
  };

  const conversionResult = useMemo(() => {
    const val = parseFloat(amount);
    if (isNaN(val)) return 0;

    const sourceRate = MOCK_RATES[sourceCurr];
    const targetRate = MOCK_RATES[targetCurr];

    // Base logic: Convert Source -> NGN -> Target
    // If Source is NGN, rate is 1.
    
    // Get the rate relative to NGN
    const getRateInNGN = (curr: CurrencyCode, type: 'buy' | 'sell') => {
        if (curr === CurrencyCode.NGN) return 1;
        const r = MOCK_RATES[curr];
        if (isParallel) {
            return type === 'buy' ? r.parallel_buy : r.parallel_sell;
        }
        return type === 'buy' ? r.official_buy : r.official_sell;
    };

    // If converting USD to NGN: We are "selling" USD to get NGN.
    // Logic: Amount * (Rate of Source in NGN) / (Rate of Target in NGN)
    
    // Simplification for this app:
    // If Source != NGN and Target == NGN: We are selling Source currency. Use 'buy' rate (Market buys from us).
    // If Source == NGN and Target != NGN: We are buying Target currency. Use 'sell' rate (Market sells to us).
    
    let rate = 0;
    
    if (sourceCurr !== CurrencyCode.NGN && targetCurr === CurrencyCode.NGN) {
        // Selling foreign currency
        rate = isParallel ? sourceRate.parallel_buy : sourceRate.official_buy;
    } else if (sourceCurr === CurrencyCode.NGN && targetCurr !== CurrencyCode.NGN) {
        // Buying foreign currency
        const sellRate = isParallel ? targetRate.parallel_sell : targetRate.official_sell;
        rate = 1 / sellRate;
    } else if (sourceCurr !== CurrencyCode.NGN && targetCurr !== CurrencyCode.NGN) {
        // Cross rate (e.g. USD -> GBP) via NGN
        const sourceToNgn = isParallel ? sourceRate.parallel_buy : sourceRate.official_buy;
        const ngnToTarget = isParallel ? targetRate.parallel_sell : targetRate.official_sell;
        rate = sourceToNgn / ngnToTarget;
    } else {
        rate = 1;
    }

    return val * rate;

  }, [amount, sourceCurr, targetCurr, isParallel]);

  const formatCurrency = (val: number, code: CurrencyCode) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: code,
      maximumFractionDigits: 2
    }).format(val);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Exchange</h2>
            <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-lg">
                <button 
                    onClick={() => setIsParallel(false)}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${!isParallel ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}
                >
                    Official
                </button>
                <button 
                    onClick={() => setIsParallel(true)}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${isParallel ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-500'}`}
                >
                    Parallel
                </button>
            </div>
        </div>

        {/* Source Input */}
        <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">You Send</label>
            <div className="relative">
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full text-3xl font-bold text-gray-900 bg-transparent border-none focus:ring-0 p-0 placeholder-gray-300"
                    placeholder="0.00"
                />
                <select
                    value={sourceCurr}
                    onChange={(e) => setSourceCurr(e.target.value as CurrencyCode)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-1 px-2 rounded-lg border-none focus:ring-0 cursor-pointer"
                >
                    {Object.values(MOCK_RATES).map((rate) => (
                        <option key={rate.code} value={rate.code}>
                            {rate.flag} {rate.code}
                        </option>
                    ))}
                </select>
            </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center -my-3 z-10 relative">
            <button 
                onClick={handleSwap}
                className="bg-gray-50 border border-gray-200 p-2 rounded-full shadow-sm hover:bg-gray-100 transition-colors"
            >
                <ArrowDown size={20} className="text-gray-600" />
            </button>
        </div>

        {/* Target Input */}
        <div className="space-y-2 pt-4">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">You Get (Estimated)</label>
            <div className="relative">
                <div className="text-3xl font-bold text-ng-green">
                    {formatCurrency(conversionResult, targetCurr)}
                </div>
                <select
                    value={targetCurr}
                    onChange={(e) => setTargetCurr(e.target.value as CurrencyCode)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-1 px-2 rounded-lg border-none focus:ring-0 cursor-pointer"
                >
                    {Object.values(MOCK_RATES).map((rate) => (
                        <option key={rate.code} value={rate.code}>
                            {rate.flag} {rate.code}
                        </option>
                    ))}
                </select>
            </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
        <Info className="text-blue-600 shrink-0 mt-0.5" size={18} />
        <p className="text-sm text-blue-800 leading-relaxed">
            Market rates are volatile. The <strong>{isParallel ? 'Parallel (Black Market)' : 'Official (CBN)'}</strong> rate is currently selected. 
            <br/><span className="text-xs opacity-75 mt-1 block">Last updated: {lastUpdated.toLocaleTimeString()}</span>
        </p>
      </div>

      <div className="flex justify-center">
        <button className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-ng-green transition-colors">
            <RefreshCw size={14} />
            <span>Refresh Rates</span>
        </button>
      </div>
    </div>
  );
};