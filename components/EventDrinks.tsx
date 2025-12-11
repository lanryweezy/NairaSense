import React, { useState } from 'react';
import { GlassWater, Users } from 'lucide-react';
import { DRINK_CRATES } from '../constants';

export const EventDrinks: React.FC = () => {
  const [guests, setGuests] = useState<string>('100');

  const count = parseInt(guests) || 0;

  // Estimation Logic
  // Water: 2 per guest
  // Soft: 1.5 per guest
  // Beer: 0.5 per guest (Assuming mix of audience)
  // Malt: 0.5 per guest
  // Juice: 0.2 per guest (1L serves 4 cups)

  const needs = {
    water: Math.ceil((count * 2) / 12), // 12 per pack
    soft: Math.ceil((count * 1.5) / 12), // 12 per pack
    beer: Math.ceil((count * 0.5) / 12), // 12 per crate
    malt: Math.ceil((count * 0.5) / 24), // 24 per crate
    juice: Math.ceil((count * 0.2) / 10), // 10 per carton
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
            <GlassWater className="text-purple-500" size={24} />
            'Owanbe' Drinks
        </h2>
        <p className="text-sm text-gray-500 mb-6">Plan drinks for your Wedding, Birthday, or Event.</p>

        <div className="mb-8">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Number of Guests</label>
            <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                    type="number"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
            </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
             <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
                <p className="text-xs text-blue-800 font-bold mb-1">Water (Packs)</p>
                <p className="text-2xl font-bold text-gray-800">{needs.water}</p>
                <p className="text-[10px] text-gray-500">Based on 12/pack</p>
            </div>
            <div className="bg-orange-50 p-3 rounded-xl border border-orange-100">
                <p className="text-xs text-orange-800 font-bold mb-1">Soft Drinks (Packs)</p>
                <p className="text-2xl font-bold text-gray-800">{needs.soft}</p>
                <p className="text-[10px] text-gray-500">Based on 12/pack</p>
            </div>
            <div className="bg-yellow-50 p-3 rounded-xl border border-yellow-100">
                <p className="text-xs text-yellow-800 font-bold mb-1">Beer (Crates)</p>
                <p className="text-2xl font-bold text-gray-800">{needs.beer}</p>
                <p className="text-[10px] text-gray-500">Based on 12/crate</p>
            </div>
            <div className="bg-amber-50 p-3 rounded-xl border border-amber-100">
                <p className="text-xs text-amber-800 font-bold mb-1">Malt (Crates)</p>
                <p className="text-2xl font-bold text-gray-800">{needs.malt}</p>
                <p className="text-[10px] text-gray-500">Based on 24/crate</p>
            </div>
            <div className="bg-pink-50 p-3 rounded-xl border border-pink-100 col-span-2 flex justify-between items-center">
                <div>
                     <p className="text-xs text-pink-800 font-bold mb-1">Juice (Cartons)</p>
                     <p className="text-[10px] text-gray-500">Based on 10/carton</p>
                </div>
                <p className="text-2xl font-bold text-gray-800">{needs.juice}</p>
            </div>
        </div>
      </div>
    </div>
  );
};