import React, { useState } from 'react';
import { Phone, Search, Copy, Check } from 'lucide-react';
import { BANKS_USSD } from '../constants';

export const USSDDirectory: React.FC = () => {
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  const filtered = BANKS_USSD.filter(b => b.name.toLowerCase().includes(search.toLowerCase()));

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="sticky top-0 bg-gray-50 pt-2 pb-4 z-10">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 flex items-center gap-2">
            <Search className="text-gray-400 ml-2" size={20} />
            <input 
                type="text"
                placeholder="Search bank..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-transparent focus:outline-none text-gray-900 placeholder-gray-400 h-10"
            />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 pb-4">
        {filtered.map((bank) => (
            <div key={bank.name} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{backgroundColor: bank.color}}>
                        {bank.name.charAt(0)}
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900">{bank.name}</h3>
                        <p className="text-gray-500 text-sm font-mono">{bank.code}</p>
                    </div>
                </div>
                <button 
                    onClick={() => handleCopy(bank.code)}
                    className={`p-2 rounded-lg transition-colors ${copied === bank.code ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}
                >
                    {copied === bank.code ? <Check size={20} /> : <Copy size={20} />}
                </button>
            </div>
        ))}
        
        {filtered.length === 0 && (
            <div className="text-center py-10 text-gray-400">
                No banks found.
            </div>
        )}
      </div>
    </div>
  );
};