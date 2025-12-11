import React, { useState } from 'react';
import { Power, Timer, Droplet } from 'lucide-react';
import { GEN_SPECS } from '../constants';

export const GenRuntime: React.FC = () => {
  const [selectedGen, setSelectedGen] = useState(GEN_SPECS[1].id);
  const [liters, setLiters] = useState<string>('5');
  
  const gen = GEN_SPECS.find(g => g.id === selectedGen) || GEN_SPECS[1];
  
  // Calculate hours
  const l = parseFloat(liters) || 0;
  const hoursDecimal = l / gen.rate;
  const hours = Math.floor(hoursDecimal);
  const minutes = Math.round((hoursDecimal - hours) * 60);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
            <Power className="text-gray-700" size={24} />
            Gen Runtime
        </h2>
        <p className="text-sm text-gray-500 mb-6">Estimate how long your generator will run on a specific amount of fuel.</p>

        <div className="space-y-4 mb-6">
            <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Generator Type</label>
                <select 
                    value={selectedGen}
                    onChange={(e) => setSelectedGen(e.target.value)}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-medium text-gray-900"
                >
                    {GEN_SPECS.map(g => (
                        <option key={g.id} value={g.id}>{g.name}</option>
                    ))}
                </select>
            </div>

            <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Fuel Amount</label>
                <div className="relative">
                    <Droplet className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500" size={20} />
                    <input
                        type="number"
                        value={liters}
                        onChange={(e) => setLiters(e.target.value)}
                        placeholder="Liters"
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">Liters</span>
                </div>
            </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 text-center text-white flex flex-col items-center justify-center relative overflow-hidden">
             <Timer size={32} className="mb-2 text-gray-400" />
            <div className="relative z-10">
                <p className="text-gray-400 text-sm mb-1">Estimated Runtime</p>
                <p className="text-4xl font-bold text-white">
                    {hours}h {minutes}m
                </p>
            </div>
             <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
        </div>
      </div>

       <div className="flex gap-3 bg-gray-50 p-4 rounded-xl border border-gray-200">
            <div className="w-1 h-full bg-orange-500 rounded-full"></div>
            <p className="text-xs text-gray-600">
                <strong>Consumption Rate:</strong> This generator consumes approx <strong>{gen.rate} Liters/Hour</strong>. Values may vary based on load (A/C vs Fan).
            </p>
      </div>
    </div>
  );
};