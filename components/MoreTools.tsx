import React, { useState } from 'react';
import { FileCheck, Hammer, Tv, Flame, GraduationCap, Clock, Globe, Heart, Wifi, Ticket } from 'lucide-react';
import { VEHICLE_PAPER_COSTS, DSTV_PLANS, PASSPORT_PRICES } from '../constants';

export const VehiclePapers: React.FC = () => {
    const total = VEHICLE_PAPER_COSTS.reduce((acc, i) => acc + i.price, 0);
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex gap-2"><FileCheck className="text-green-600"/> Vehicle Papers</h2>
            <div className="space-y-2 mb-4">
                {VEHICLE_PAPER_COSTS.map(i => (
                    <div key={i.name} className="flex justify-between text-xs border-b border-gray-100 pb-1">
                        <span className="text-gray-600">{i.name}</span>
                        <span className="font-bold">₦{i.price.toLocaleString()}</span>
                    </div>
                ))}
            </div>
            <div className="bg-green-50 p-3 rounded-lg flex justify-between items-center">
                <span className="text-sm font-bold text-green-800">Total</span>
                <span className="text-lg font-bold text-gray-900">₦{total.toLocaleString()}</span>
            </div>
        </div>
    );
};

export const CementCalc: React.FC = () => {
    const [blocks, setBlocks] = useState('100');
    // Approx: 1 Bag of Cement produces ~35-40 6-inch blocks or 25-30 9-inch blocks.
    // Let's assume 9-inch (Standard load bearing).
    const bags = Math.ceil((parseFloat(blocks)||0) / 30);
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex gap-2"><Hammer className="text-gray-600"/> Block Calculator</h2>
            <div className="space-y-3">
                <input type="number" placeholder="Number of Blocks" value={blocks} onChange={e=>setBlocks(e.target.value)} className="w-full p-2 bg-gray-50 rounded-lg"/>
                <div className="bg-gray-100 p-4 rounded-lg text-center">
                    <p className="text-xs text-gray-500">Cement Bags Needed</p>
                    <p className="text-3xl font-bold text-gray-800">{bags}</p>
                </div>
            </div>
        </div>
    );
};

export const DstvPackages: React.FC = () => {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
             <h2 className="text-xl font-bold text-gray-800 mb-4 flex gap-2"><Tv className="text-blue-500"/> DSTV Prices</h2>
             <div className="space-y-2 h-48 overflow-y-auto">
                {DSTV_PLANS.map(p => (
                    <div key={p.name} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium">{p.name}</span>
                        <span className="text-sm font-bold text-blue-600">₦{p.price.toLocaleString()}</span>
                    </div>
                ))}
             </div>
        </div>
    );
};

export const CookingGas: React.FC = () => {
    const [size, setSize] = useState('12.5');
    const [freq, setFreq] = useState('3'); // times a day
    // Rough estimate: 12.5kg lasts 4-6 weeks for avg family.
    // 1kg burns for approx 1.5 - 2 hours of continuous high flame.
    // Let's simplified: 12.5kg = ~45 hours of cooking.
    const hoursTotal = (parseFloat(size)||0) * 3.6; // 3.6 hours per kg
    const days = hoursTotal / ((parseFloat(freq)||1) * 0.5); // assuming 30 mins per cook
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex gap-2"><Flame className="text-orange-500"/> Gas Monitor</h2>
             <div className="flex gap-2 mb-3">
                <select value={size} onChange={e=>setSize(e.target.value)} className="w-1/2 p-2 bg-gray-50 rounded-lg">
                    <option value="12.5">12.5 KG</option>
                    <option value="6">6 KG</option>
                    <option value="50">50 KG</option>
                </select>
                <input type="number" placeholder="Cooks/Day" value={freq} onChange={e=>setFreq(e.target.value)} className="w-1/2 p-2 bg-gray-50 rounded-lg"/>
             </div>
             <div className="bg-orange-50 p-4 rounded-lg text-center">
                <p className="text-xs text-orange-800">Est. Duration</p>
                <p className="text-2xl font-bold text-gray-900">{Math.floor(days)} Days</p>
            </div>
        </div>
    );
};

export const SchoolFees: React.FC = () => {
    const [fee, setFee] = useState('150000');
    const [terms, setTerms] = useState('3');
    const annual = (parseFloat(fee)||0) * parseFloat(terms);
    const monthly = annual / 12;
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex gap-2"><GraduationCap className="text-indigo-600"/> School Fees</h2>
            <input type="number" placeholder="Termly Fee" value={fee} onChange={e=>setFee(e.target.value)} className="w-full p-2 bg-gray-50 rounded-lg mb-2"/>
            <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-indigo-50 p-2 rounded-lg">
                    <p className="text-[10px] text-indigo-800">Annual Total</p>
                    <p className="font-bold">₦{annual.toLocaleString()}</p>
                </div>
                <div className="bg-indigo-50 p-2 rounded-lg">
                    <p className="text-[10px] text-indigo-800">Monthly Save</p>
                    <p className="font-bold">₦{monthly.toLocaleString(undefined, {maximumFractionDigits:0})}</p>
                </div>
            </div>
        </div>
    );
};

export const TrafficTime: React.FC = () => {
    const [dist, setDist] = useState('20'); // km
    const [zone, setZone] = useState('lekki');
    // Lagos Logic: 1km = 5 mins normal, 15 mins peak.
    const time = (parseFloat(dist)||0) * (zone === 'lekki' ? 12 : 8); // mins
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex gap-2"><Clock className="text-red-600"/> Lagos Traffic</h2>
            <div className="flex gap-2 mb-3">
                 <input type="number" placeholder="KM" value={dist} onChange={e=>setDist(e.target.value)} className="w-1/2 p-2 bg-gray-50 rounded-lg"/>
                 <select value={zone} onChange={e=>setZone(e.target.value)} className="w-1/2 p-2 bg-gray-50 rounded-lg">
                    <option value="lekki">Lekki/Ajah</option>
                    <option value="mainland">Mainland</option>
                    <option value="third_mainland">3rd Mainland</option>
                </select>
            </div>
            <div className="bg-red-50 p-4 rounded-lg text-center">
                <p className="text-xs text-red-800">Est. Travel Time</p>
                <p className="text-2xl font-bold text-gray-900">{Math.floor(time/60)}h {Math.round(time%60)}m</p>
            </div>
        </div>
    );
};

export const PassportInfo: React.FC = () => {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
             <h2 className="text-xl font-bold text-gray-800 mb-4 flex gap-2"><Globe className="text-green-700"/> Passport Fees</h2>
             <div className="space-y-2">
                {PASSPORT_PRICES.map(p => (
                    <div key={p.type} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                        <span className="text-xs font-medium">{p.type}</span>
                        <span className="text-sm font-bold text-green-700">₦{p.price.toLocaleString()}</span>
                    </div>
                ))}
             </div>
             <p className="text-[10px] text-gray-400 mt-2">Official NIS prices. Admin charges may apply.</p>
        </div>
    );
};

export const DateNight: React.FC = () => {
    const [budget, setBudget] = useState('50000');
    // Typical split: 40% Food, 20% Transport, 20% Activity, 20% Misc
    const b = parseFloat(budget)||0;
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex gap-2"><Heart className="text-rose-500"/> Date Budget</h2>
            <input type="number" placeholder="Total Budget" value={budget} onChange={e=>setBudget(e.target.value)} className="w-full p-2 bg-gray-50 rounded-lg mb-3"/>
            <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 border rounded">Food: ₦{(b*0.4).toLocaleString()}</div>
                <div className="p-2 border rounded">Taxi: ₦{(b*0.2).toLocaleString()}</div>
                <div className="p-2 border rounded">Fun: ₦{(b*0.2).toLocaleString()}</div>
                <div className="p-2 border rounded">Misc: ₦{(b*0.2).toLocaleString()}</div>
            </div>
        </div>
    );
};

export const StarlinkCalc: React.FC = () => {
    const hardware = 440000;
    const sub = 38000;
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
             <h2 className="text-xl font-bold text-gray-800 mb-4 flex gap-2"><Wifi className="text-gray-800"/> Starlink</h2>
             <div className="space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-sm">Hardware Kit</span>
                    <span className="font-bold">₦{hardware.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-sm">Monthly Sub</span>
                    <span className="font-bold">₦{sub.toLocaleString()}</span>
                </div>
                <p className="text-xs text-gray-500">Unlimited Data. ~150Mbps.</p>
             </div>
        </div>
    );
};

export const CinemaBudget: React.FC = () => {
    const [people, setPeople] = useState('2');
    const ticket = 6000;
    const snacks = 4000;
    const total = (parseFloat(people)||0) * (ticket + snacks);
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
             <h2 className="text-xl font-bold text-gray-800 mb-4 flex gap-2"><Ticket className="text-purple-500"/> Cinema Plan</h2>
             <input type="number" placeholder="Number of People" value={people} onChange={e=>setPeople(e.target.value)} className="w-full p-2 bg-gray-50 rounded-lg mb-3"/>
             <div className="bg-purple-50 p-4 rounded-lg text-center">
                <p className="text-xs text-purple-800">Total (Tickets + Popcorn)</p>
                <p className="text-2xl font-bold text-gray-900">₦{total.toLocaleString()}</p>
            </div>
        </div>
    );
};