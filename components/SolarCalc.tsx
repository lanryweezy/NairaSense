import React, { useState } from 'react';
import { Sun, Battery, Zap, Plus, Minus } from 'lucide-react';
import { SOLAR_APPLIANCES } from '../constants';

interface LoadItem {
    id: string;
    qty: number;
}

export const SolarCalc: React.FC = () => {
  const [items, setItems] = useState<LoadItem[]>(SOLAR_APPLIANCES.map(a => ({ id: a.id, qty: 0 })));
  const [runtime, setRuntime] = useState<number>(8);

  const updateQty = (id: string, delta: number) => {
    setItems(items.map(item => {
        if (item.id === id) {
            return { ...item, qty: Math.max(0, item.qty + delta) };
        }
        return item;
    }));
  };

  const totalWatts = items.reduce((acc, item) => {
    const app = SOLAR_APPLIANCES.find(a => a.id === item.id);
    return acc + (item.qty * (app?.watts || 0));
  }, 0);

  // Inverter Sizing: Total Watts * 1.25 (Safety) / 0.8 (Power Factor)
  const requiredKVA = (totalWatts * 1.25) / 0.8 / 1000;
  
  // Battery Sizing: (Total Watts * Hours) / 12V (or 24/48V)
  // Let's assume 12V system for small loads, 24V for med, 48V for large.
  // Energy Required (Wh) = Watts * Hours
  const energyRequiredWh = totalWatts * runtime;
  // Battery capacity needed (Ah) at 12V = Wh / 12V / 0.8 (DoD) for Lithium or 0.5 for Lead Acid.
  // Assuming Lead Acid (Deep Cycle) 50% DoD for conservative estimate.
  const batteryAh12V = energyRequiredWh / 12 / 0.5;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
            <Sun className="text-amber-500" size={24} />
            Solar Estimator
        </h2>
        <p className="text-sm text-gray-500 mb-6">Calculate load to size your Inverter and Batteries.</p>

        <div className="space-y-3 mb-8">
            {SOLAR_APPLIANCES.map((app) => {
                const qty = items.find(i => i.id === app.id)?.qty || 0;
                return (
                    <div key={app.id} className="flex items-center justify-between p-2 border-b border-gray-100 last:border-0">
                        <div>
                            <p className="text-sm font-medium text-gray-800">{app.name}</p>
                            <p className="text-xs text-gray-400">{app.watts}W</p>
                        </div>
                        <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                            <button onClick={() => updateQty(app.id, -1)} className="p-1 text-gray-400 hover:text-amber-600">
                                <Minus size={16} />
                            </button>
                            <span className="text-sm font-bold w-4 text-center">{qty}</span>
                            <button onClick={() => updateQty(app.id, 1)} className="p-1 text-gray-400 hover:text-amber-600">
                                <Plus size={16} />
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>

        <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Desired Runtime</label>
                <span className="text-sm font-bold text-amber-600">{runtime} Hours</span>
            </div>
            <input 
                type="range" min="1" max="24" step="1" 
                value={runtime} 
                onChange={(e) => setRuntime(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
        </div>

        <div className="bg-gray-900 rounded-xl p-5 text-white space-y-4">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-800 rounded-lg"><Zap className="text-yellow-400" size={20}/></div>
                <div>
                    <p className="text-xs text-gray-400">Total Load</p>
                    <p className="font-bold text-xl">{totalWatts} Watts</p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-800">
                <div>
                    <p className="text-xs text-gray-400 mb-1">Inverter</p>
                    <p className="font-bold text-amber-400 text-lg">
                        {requiredKVA < 1 ? '1 kVA' : `${Math.ceil(requiredKVA * 2) / 2} kVA`}
                    </p>
                </div>
                <div>
                    <p className="text-xs text-gray-400 mb-1">Battery (12V)</p>
                    <p className="font-bold text-amber-400 text-lg">
                        {Math.ceil(batteryAh12V / 200)}x 200Ah
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};