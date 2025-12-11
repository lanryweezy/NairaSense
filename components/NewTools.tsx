import React, { useState } from 'react';
import { DollarSign, Bitcoin, Store, Lock, Share2, Car, Truck, Phone, Percent, Ship } from 'lucide-react';
import { MOCK_RATES } from '../constants';

export const FreelanceCalc: React.FC = () => {
    const [usd, setUsd] = useState('100');
    const [fee, setFee] = useState('20');
    const rate = MOCK_RATES.USD.parallel_buy;
    const netUsd = (parseFloat(usd) || 0) * (1 - (parseFloat(fee) || 0)/100);
    const ngn = netUsd * rate;

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex gap-2"><DollarSign className="text-blue-600"/> Freelance Calc</h2>
            <div className="space-y-3">
                <input type="number" placeholder="Earnings ($)" value={usd} onChange={e=>setUsd(e.target.value)} className="w-full p-2 bg-gray-50 rounded-lg border border-gray-200"/>
                <input type="number" placeholder="Platform Fee (%)" value={fee} onChange={e=>setFee(e.target.value)} className="w-full p-2 bg-gray-50 rounded-lg border border-gray-200"/>
                <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-xs text-blue-800">Net Take Home</p>
                    <p className="text-2xl font-bold text-gray-900">₦{ngn.toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
};

export const CryptoCalc: React.FC = () => {
    const [usdt, setUsdt] = useState('100');
    const [rate, setRate] = useState(MOCK_RATES.USD.parallel_sell.toString());
    const total = (parseFloat(usdt)||0) * (parseFloat(rate)||0);
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex gap-2"><Bitcoin className="text-orange-500"/> Crypto P2P</h2>
            <div className="space-y-3">
                <input type="number" placeholder="USDT Amount" value={usdt} onChange={e=>setUsdt(e.target.value)} className="w-full p-2 bg-gray-50 rounded-lg border border-gray-200"/>
                <input type="number" placeholder="Exchange Rate" value={rate} onChange={e=>setRate(e.target.value)} className="w-full p-2 bg-gray-50 rounded-lg border border-gray-200"/>
                <div className="p-4 bg-orange-50 rounded-lg">
                    <p className="text-xs text-orange-800">Naira Value</p>
                    <p className="text-2xl font-bold text-gray-900">₦{total.toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
};

export const PosTerminal: React.FC = () => {
    const [vol, setVol] = useState('500000');
    const [fee, setFee] = useState('0.5'); // %
    const [cap, setCap] = useState('100');
    const volume = parseFloat(vol)||0;
    // Simple estimation: assume avg tx is 5000.
    const txCount = volume / 5000;
    const grossProfit = txCount * parseFloat(cap); // Charging cap per tx
    const bankCharge = volume * (parseFloat(fee)/100); 
    const net = grossProfit - bankCharge;

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
             <h2 className="text-xl font-bold text-gray-800 mb-4 flex gap-2"><Store className="text-purple-600"/> POS Biz</h2>
             <div className="space-y-3">
                <div><label className="text-xs text-gray-500">Daily Volume</label><input type="number" value={vol} onChange={e=>setVol(e.target.value)} className="w-full p-2 bg-gray-50 rounded-lg"/></div>
                <div><label className="text-xs text-gray-500">Charge per Tx (₦)</label><input type="number" value={cap} onChange={e=>setCap(e.target.value)} className="w-full p-2 bg-gray-50 rounded-lg"/></div>
                <div className="p-4 bg-purple-50 rounded-lg text-center">
                    <p className="text-xs text-purple-800">Est. Daily Profit</p>
                    <p className="text-xl font-bold text-gray-900">₦{net.toLocaleString()}</p>
                    <p className="text-[10px] text-gray-500">Based on ₦5k avg tx size</p>
                </div>
            </div>
        </div>
    );
};

export const SafeLock: React.FC = () => {
    const [amt, setAmt] = useState('100000');
    const [dur, setDur] = useState('12'); // months
    const [rate, setRate] = useState('12'); // %
    const interest = (parseFloat(amt)||0) * (parseFloat(rate)/100) * (parseFloat(dur)/12);
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
             <h2 className="text-xl font-bold text-gray-800 mb-4 flex gap-2"><Lock className="text-teal-600"/> Safe Lock</h2>
             <div className="space-y-3">
                <input type="number" placeholder="Amount" value={amt} onChange={e=>setAmt(e.target.value)} className="w-full p-2 bg-gray-50 rounded-lg"/>
                <div className="flex gap-2">
                    <input type="number" placeholder="Months" value={dur} onChange={e=>setDur(e.target.value)} className="w-1/2 p-2 bg-gray-50 rounded-lg"/>
                    <input type="number" placeholder="Rate %" value={rate} onChange={e=>setRate(e.target.value)} className="w-1/2 p-2 bg-gray-50 rounded-lg"/>
                </div>
                <div className="p-4 bg-teal-50 rounded-lg text-center">
                    <p className="text-xs text-teal-800">Interest Earned</p>
                    <p className="text-xl font-bold text-gray-900">₦{interest.toLocaleString(undefined, {maximumFractionDigits:0})}</p>
                </div>
            </div>
        </div>
    );
};

export const SocialAds: React.FC = () => {
    const [budget, setBudget] = useState('5'); // USD
    const [days, setDays] = useState('7');
    const rate = MOCK_RATES.USD.parallel_sell;
    const total = (parseFloat(budget)||0) * (parseFloat(days)||0) * rate;
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
             <h2 className="text-xl font-bold text-gray-800 mb-4 flex gap-2"><Share2 className="text-pink-600"/> Instagram Ads</h2>
             <div className="space-y-3">
                <input type="number" placeholder="Daily Budget ($)" value={budget} onChange={e=>setBudget(e.target.value)} className="w-full p-2 bg-gray-50 rounded-lg"/>
                <input type="number" placeholder="Days" value={days} onChange={e=>setDays(e.target.value)} className="w-full p-2 bg-gray-50 rounded-lg"/>
                <div className="p-4 bg-pink-50 rounded-lg text-center">
                    <p className="text-xs text-pink-800">Total Cost (Naira)</p>
                    <p className="text-xl font-bold text-gray-900">₦{total.toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
};

export const RideShare: React.FC = () => {
    const [trips, setTrips] = useState('10');
    const [fare, setFare] = useState('2500');
    const [fuel, setFuel] = useState('8000');
    const total = (parseFloat(trips)||0) * (parseFloat(fare)||0);
    const comm = total * 0.25; // 25% Bolt/Uber
    const net = total - comm - (parseFloat(fuel)||0);
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
             <h2 className="text-xl font-bold text-gray-800 mb-4 flex gap-2"><Car className="text-green-600"/> Driver Profit</h2>
             <div className="space-y-3">
                <div className="flex gap-2">
                    <input type="number" placeholder="Trips" value={trips} onChange={e=>setTrips(e.target.value)} className="w-1/2 p-2 bg-gray-50 rounded-lg"/>
                    <input type="number" placeholder="Avg Fare" value={fare} onChange={e=>setFare(e.target.value)} className="w-1/2 p-2 bg-gray-50 rounded-lg"/>
                </div>
                <input type="number" placeholder="Fuel Cost" value={fuel} onChange={e=>setFuel(e.target.value)} className="w-full p-2 bg-gray-50 rounded-lg"/>
                <div className="p-4 bg-green-50 rounded-lg text-center">
                    <p className="text-xs text-green-800">Daily Net Income</p>
                    <p className="text-xl font-bold text-gray-900">₦{net.toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
};

export const KekeDaily: React.FC = () => {
    const [deliver, setDeliver] = useState('4000');
    const [fuel, setFuel] = useState('3000');
    const [tickets, setTickets] = useState('2000'); // Agbero
    const [sales, setSales] = useState('15000');
    const net = (parseFloat(sales)||0) - (parseFloat(deliver)||0) - (parseFloat(fuel)||0) - (parseFloat(tickets)||0);
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
             <h2 className="text-xl font-bold text-gray-800 mb-4 flex gap-2"><Truck className="text-yellow-600"/> Keke/Okada</h2>
             <div className="grid grid-cols-2 gap-2">
                <input type="number" placeholder="Sales" value={sales} onChange={e=>setSales(e.target.value)} className="p-2 bg-gray-50 rounded-lg"/>
                <input type="number" placeholder="Delivery" value={deliver} onChange={e=>setDeliver(e.target.value)} className="p-2 bg-gray-50 rounded-lg"/>
                <input type="number" placeholder="Fuel" value={fuel} onChange={e=>setFuel(e.target.value)} className="p-2 bg-gray-50 rounded-lg"/>
                <input type="number" placeholder="Tickets" value={tickets} onChange={e=>setTickets(e.target.value)} className="p-2 bg-gray-50 rounded-lg"/>
             </div>
             <div className="p-4 bg-yellow-50 rounded-lg text-center mt-3">
                <p className="text-xs text-yellow-800">Your Pocket Money</p>
                <p className="text-xl font-bold text-gray-900">₦{net.toLocaleString()}</p>
            </div>
        </div>
    );
};

export const AirtimeCash: React.FC = () => {
    const [amt, setAmt] = useState('5000');
    const [pct, setPct] = useState('80'); // 80% return
    const cash = (parseFloat(amt)||0) * (parseFloat(pct)/100);
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
             <h2 className="text-xl font-bold text-gray-800 mb-4 flex gap-2"><Phone className="text-red-500"/> Airtime 2 Cash</h2>
             <div className="space-y-3">
                <input type="number" placeholder="Airtime Amount" value={amt} onChange={e=>setAmt(e.target.value)} className="w-full p-2 bg-gray-50 rounded-lg"/>
                <div className="flex justify-between text-xs text-gray-500">
                    <span>Conversion Rate: {pct}%</span>
                </div>
                <div className="p-4 bg-red-50 rounded-lg text-center">
                    <p className="text-xs text-red-800">You Receive</p>
                    <p className="text-xl font-bold text-gray-900">₦{cash.toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
};

export const TithesCalc: React.FC = () => {
    const [income, setIncome] = useState('100000');
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
             <h2 className="text-xl font-bold text-gray-800 mb-4 flex gap-2"><Percent className="text-indigo-500"/> Tithe (10%)</h2>
             <input type="number" placeholder="Income" value={income} onChange={e=>setIncome(e.target.value)} className="w-full p-2 bg-gray-50 rounded-lg mb-3"/>
             <div className="p-4 bg-indigo-50 rounded-lg text-center">
                <p className="text-xs text-indigo-800">Amount</p>
                <p className="text-xl font-bold text-gray-900">₦{((parseFloat(income)||0)*0.1).toLocaleString()}</p>
            </div>
        </div>
    );
};

export const CarImport: React.FC = () => {
    const [val, setVal] = useState('5000'); // USD
    const [year, setYear] = useState('2015');
    // Simplified logic: Older cars pay less duty (rebate) but high levy
    // This is a rough estimator. 
    const exchange = MOCK_RATES.USD.official_sell;
    const nairaVal = (parseFloat(val)||0) * exchange;
    const duty = nairaVal * 0.35; // 35% standard
    const levy = nairaVal * 0.15; // 15% NAC/Levy
    const total = duty + levy;

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
             <h2 className="text-xl font-bold text-gray-800 mb-4 flex gap-2"><Ship className="text-blue-800"/> Car Duty</h2>
             <div className="space-y-3">
                <input type="number" placeholder="Car Value ($)" value={val} onChange={e=>setVal(e.target.value)} className="w-full p-2 bg-gray-50 rounded-lg"/>
                <input type="number" placeholder="Year" value={year} onChange={e=>setYear(e.target.value)} className="w-full p-2 bg-gray-50 rounded-lg"/>
                <div className="p-4 bg-blue-50 rounded-lg text-center">
                    <p className="text-xs text-blue-800">Est. Clearing Cost</p>
                    <p className="text-xl font-bold text-gray-900">₦{total.toLocaleString(undefined, {maximumFractionDigits:0})}</p>
                    <p className="text-[10px] text-gray-400">Excludes Terminal/Shipping charges</p>
                </div>
            </div>
        </div>
    );
};