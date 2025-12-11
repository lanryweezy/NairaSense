import React, { useState } from 'react';
import { Wifi, Smartphone } from 'lucide-react';
import { APP_USAGE_RATES } from '../constants';

export const DataCalculator: React.FC = () => {
  const [tiktokHours, setTiktokHours] = useState<number>(1);
  const [whatsappMins, setWhatsappMins] = useState<number>(30);
  const [netflixHours, setNetflixHours] = useState<number>(0);
  
  const calculateTotal = () => {
    let totalMB = 0;
    totalMB += (tiktokHours * 60) * APP_USAGE_RATES.TIKTOK_WATCH;
    totalMB += whatsappMins * APP_USAGE_RATES.WHATSAPP_CALL;
    totalMB += (netflixHours * 60) * APP_USAGE_RATES.NETFLIX_HD;
    return totalMB / 1024; // Convert to GB
  };

  const totalGB = calculateTotal();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
            <Wifi className="text-cyan-600" size={24} />
            Data Manager
        </h2>
        <p className="text-sm text-gray-500 mb-6">Estimate how much data you need for your daily activities.</p>

        <div className="space-y-6">
            <div className="space-y-2">
                <div className="flex justify-between">
                    <label className="text-sm font-medium text-gray-700">TikTok / Instagram Reels</label>
                    <span className="text-sm font-bold text-cyan-600">{tiktokHours} hrs/day</span>
                </div>
                <input 
                    type="range" min="0" max="10" step="0.5" 
                    value={tiktokHours} 
                    onChange={(e) => setTiktokHours(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
                />
            </div>

            <div className="space-y-2">
                <div className="flex justify-between">
                    <label className="text-sm font-medium text-gray-700">WhatsApp Calls</label>
                    <span className="text-sm font-bold text-cyan-600">{whatsappMins} mins/day</span>
                </div>
                <input 
                    type="range" min="0" max="300" step="10" 
                    value={whatsappMins} 
                    onChange={(e) => setWhatsappMins(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
                />
            </div>

            <div className="space-y-2">
                <div className="flex justify-between">
                    <label className="text-sm font-medium text-gray-700">Netflix / YouTube</label>
                    <span className="text-sm font-bold text-cyan-600">{netflixHours} hrs/day</span>
                </div>
                <input 
                    type="range" min="0" max="12" step="0.5" 
                    value={netflixHours} 
                    onChange={(e) => setNetflixHours(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
                />
            </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="flex justify-between items-end mb-1">
                <span className="text-gray-500 text-sm">Daily Usage</span>
                <span className="text-2xl font-bold text-gray-900">{totalGB.toFixed(1)} GB</span>
            </div>
             <div className="flex justify-between items-end">
                <span className="text-gray-500 text-sm">Monthly Plan Needed</span>
                <span className="text-2xl font-bold text-cyan-600">{(totalGB * 30).toFixed(0)} GB</span>
            </div>
        </div>
      </div>
      
       <div className="flex gap-3 bg-cyan-50 p-4 rounded-xl border border-cyan-100">
            <Smartphone className="text-cyan-600 shrink-0" size={20} />
            <p className="text-xs text-cyan-800">
                Streaming video consumes the most data. Lowering quality on YouTube/Netflix from 1080p to 480p can save up to 70% of your data.
            </p>
      </div>
    </div>
  );
};