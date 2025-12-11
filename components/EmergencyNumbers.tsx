import React from 'react';
import { PhoneCall, ShieldAlert } from 'lucide-react';
import { EMERGENCY_NUMBERS } from '../constants';

export const EmergencyNumbers: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex items-start gap-3">
        <ShieldAlert className="text-red-600 shrink-0 mt-1" size={24} />
        <div>
            <h3 className="font-bold text-red-800 text-sm">Emergency Mode</h3>
            <p className="text-xs text-red-700 mt-1">
                Tap any number below to dial immediately. These numbers are toll-free on all Nigerian networks.
            </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {EMERGENCY_NUMBERS.map((item) => (
            <a 
                key={item.label}
                href={`tel:${item.number}`}
                className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center active:bg-gray-50 transition-colors"
            >
                <div>
                    <h3 className="font-bold text-gray-900">{item.label}</h3>
                    <p className="text-gray-500 text-xs">{item.desc}</p>
                </div>
                <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-lg border border-green-100">
                    <PhoneCall size={16} className="text-green-600" />
                    <span className="font-bold text-green-700">{item.number}</span>
                </div>
            </a>
        ))}
      </div>

       <div className="mt-4 text-center">
            <p className="text-xs text-gray-400">
                Always share your location clearly when calling emergency services.
            </p>
       </div>
    </div>
  );
};