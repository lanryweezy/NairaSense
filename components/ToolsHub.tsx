import React, { useState } from 'react';
import { TaxCalculator } from './TaxCalculator';
import { InflationCalc } from './InflationCalc';
import { SalaryCalculator } from './SalaryCalculator';
import { FuelCalculator } from './FuelCalculator';
import { ElectricityCalculator } from './ElectricityCalculator';
import { USSDDirectory } from './USSDDirectory';
import { MarketConverter } from './MarketConverter';
import { DataCalculator } from './DataCalculator';
import { EmergencyNumbers } from './EmergencyNumbers';
import { LoanCalculator } from './LoanCalculator';
import { TargetSavings } from './TargetSavings';
import { LandConverter } from './LandConverter';
import { RentBudget } from './RentBudget';
import { SmeMargin } from './SmeMargin';
import { JapaCalc } from './JapaCalc';
import { WeddingBudget } from './WeddingBudget';
import { GenRuntime } from './GenRuntime';
import { PensionCalc } from './PensionCalc';
import { InvoiceGenerator } from './InvoiceGenerator';
import { SolarCalc } from './SolarCalc';
import { ImportDuty } from './ImportDuty';
import { EventDrinks } from './EventDrinks';
// New Imports
import { 
    FreelanceCalc, CryptoCalc, PosTerminal, SafeLock, SocialAds, 
    RideShare, KekeDaily, AirtimeCash, TithesCalc, CarImport 
} from './NewTools';
import { 
    VehiclePapers, CementCalc, DstvPackages, CookingGas, SchoolFees, 
    TrafficTime, PassportInfo, DateNight, StarlinkCalc, CinemaBudget 
} from './MoreTools';

import { ToolType } from '../types';
import { 
    Calculator, Percent, Briefcase, Droplet, Zap, Phone, 
    ChevronLeft, Scale, Wifi, ShieldAlert, Banknote, 
    LayoutGrid, Wallet, LifeBuoy, Target, Map, Home,
    Store, Plane, Heart, Power, FileText, Sun, Ship, GlassWater,
    DollarSign, Bitcoin, Lock, Share2, Car, Truck, Tv, Flame, GraduationCap, Clock, Globe, Ticket
} from 'lucide-react';

type Category = 'FINANCE' | 'BUSINESS' | 'BILLS' | 'REAL_ESTATE' | 'LIFESTYLE' | 'ALL';

export const ToolsHub: React.FC = () => {
  const [activeTool, setActiveTool] = useState<ToolType>(ToolType.NONE);
  const [category, setCategory] = useState<Category>('ALL');

  const allTools = [
    // Finance
    { id: ToolType.SALARY, label: 'Salary Calc', icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50', cat: 'FINANCE' },
    { id: ToolType.PENSION, label: 'Pension Est.', icon: Wallet, color: 'text-blue-800', bg: 'bg-blue-100', cat: 'FINANCE' },
    { id: ToolType.SAVINGS, label: 'Target Save', icon: Target, color: 'text-teal-600', bg: 'bg-teal-50', cat: 'FINANCE' },
    { id: ToolType.SAFELOCK, label: 'Safe Lock', icon: Lock, color: 'text-teal-700', bg: 'bg-teal-100', cat: 'FINANCE' },
    { id: ToolType.JAPA, label: 'Japa (POF)', icon: Plane, color: 'text-sky-600', bg: 'bg-sky-50', cat: 'FINANCE' },
    { id: ToolType.LOAN, label: 'Loan Est.', icon: Banknote, color: 'text-emerald-600', bg: 'bg-emerald-50', cat: 'FINANCE' },
    { id: ToolType.INFLATION, label: 'Inflation', icon: Percent, color: 'text-red-600', bg: 'bg-red-50', cat: 'FINANCE' },
    { id: ToolType.CRYPTO, label: 'Crypto P2P', icon: Bitcoin, color: 'text-orange-500', bg: 'bg-orange-50', cat: 'FINANCE' },
    { id: ToolType.TITHES, label: 'Tithe Calc', icon: Percent, color: 'text-indigo-500', bg: 'bg-indigo-50', cat: 'FINANCE' },
    { id: ToolType.AIRTIME_CASH, label: 'Airtime Cash', icon: Phone, color: 'text-red-500', bg: 'bg-red-50', cat: 'FINANCE' },

    // Business
    { id: ToolType.INVOICE, label: 'Quick Invoice', icon: FileText, color: 'text-indigo-600', bg: 'bg-indigo-50', cat: 'BUSINESS' },
    { id: ToolType.SME, label: 'SME Margin', icon: Store, color: 'text-purple-600', bg: 'bg-purple-50', cat: 'BUSINESS' },
    { id: ToolType.POS, label: 'POS Profit', icon: Store, color: 'text-purple-800', bg: 'bg-purple-100', cat: 'BUSINESS' },
    { id: ToolType.VAT, label: 'VAT Tool', icon: Calculator, color: 'text-green-600', bg: 'bg-green-50', cat: 'BUSINESS' },
    { id: ToolType.DUTY, label: 'Import Duty', icon: Ship, color: 'text-blue-900', bg: 'bg-blue-100', cat: 'BUSINESS' },
    { id: ToolType.CAR_IMPORT, label: 'Car Duty', icon: Car, color: 'text-blue-700', bg: 'bg-blue-50', cat: 'BUSINESS' },
    { id: ToolType.FREELANCE, label: 'Freelance $', icon: DollarSign, color: 'text-green-700', bg: 'bg-green-100', cat: 'BUSINESS' },
    { id: ToolType.SOCIAL_ADS, label: 'Ad Budget', icon: Share2, color: 'text-pink-600', bg: 'bg-pink-50', cat: 'BUSINESS' },
    { id: ToolType.RIDESHARE, label: 'Driver Net', icon: Car, color: 'text-yellow-600', bg: 'bg-yellow-50', cat: 'BUSINESS' },
    { id: ToolType.KEKE, label: 'Keke Daily', icon: Truck, color: 'text-yellow-800', bg: 'bg-yellow-100', cat: 'BUSINESS' },
    
    // Bills
    { id: ToolType.SOLAR, label: 'Solar Calc', icon: Sun, color: 'text-amber-500', bg: 'bg-amber-50', cat: 'BILLS' },
    { id: ToolType.FUEL, label: 'Fuel Cost', icon: Droplet, color: 'text-orange-600', bg: 'bg-orange-50', cat: 'BILLS' },
    { id: ToolType.GENSET, label: 'Gen Runtime', icon: Power, color: 'text-gray-700', bg: 'bg-gray-100', cat: 'BILLS' },
    { id: ToolType.POWER, label: 'Power Units', icon: Zap, color: 'text-yellow-600', bg: 'bg-yellow-50', cat: 'BILLS' },
    { id: ToolType.DATA, label: 'Data Usage', icon: Wifi, color: 'text-cyan-600', bg: 'bg-cyan-50', cat: 'BILLS' },
    { id: ToolType.DSTV, label: 'DSTV Plans', icon: Tv, color: 'text-blue-500', bg: 'bg-blue-50', cat: 'BILLS' },
    { id: ToolType.COOKING_GAS, label: 'Cooking Gas', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-100', cat: 'BILLS' },
    { id: ToolType.STARLINK, label: 'Starlink', icon: Wifi, color: 'text-gray-900', bg: 'bg-gray-200', cat: 'BILLS' },

    // Real Estate
    { id: ToolType.RENT, label: 'Rent Budget', icon: Home, color: 'text-pink-600', bg: 'bg-pink-50', cat: 'REAL_ESTATE' },
    { id: ToolType.LAND, label: 'Land Calc', icon: Map, color: 'text-emerald-800', bg: 'bg-emerald-100', cat: 'REAL_ESTATE' },
    { id: ToolType.CEMENT, label: 'Block Calc', icon: Store, color: 'text-gray-600', bg: 'bg-gray-200', cat: 'REAL_ESTATE' },

    // Lifestyle
    { id: ToolType.WEDDING, label: 'Wedding $', icon: Heart, color: 'text-rose-600', bg: 'bg-rose-50', cat: 'LIFESTYLE' },
    { id: ToolType.OWANBE, label: 'Party Drinks', icon: GlassWater, color: 'text-purple-500', bg: 'bg-purple-50', cat: 'LIFESTYLE' },
    { id: ToolType.MARKET, label: 'Market Unit', icon: Scale, color: 'text-indigo-600', bg: 'bg-indigo-50', cat: 'LIFESTYLE' },
    { id: ToolType.USSD, label: 'Bank Codes', icon: Phone, color: 'text-purple-600', bg: 'bg-purple-50', cat: 'LIFESTYLE' },
    { id: ToolType.EMERGENCY, label: 'Emergency', icon: ShieldAlert, color: 'text-rose-600', bg: 'bg-rose-50', cat: 'LIFESTYLE' },
    { id: ToolType.SCHOOL_FEES, label: 'School Fees', icon: GraduationCap, color: 'text-indigo-700', bg: 'bg-indigo-100', cat: 'LIFESTYLE' },
    { id: ToolType.TRAFFIC, label: 'Traffic Time', icon: Clock, color: 'text-red-600', bg: 'bg-red-100', cat: 'LIFESTYLE' },
    { id: ToolType.PASSPORT, label: 'Passport', icon: Globe, color: 'text-green-700', bg: 'bg-green-100', cat: 'LIFESTYLE' },
    { id: ToolType.DATE_NIGHT, label: 'Date Budget', icon: Heart, color: 'text-pink-500', bg: 'bg-pink-100', cat: 'LIFESTYLE' },
    { id: ToolType.VEHICLE_PAPERS, label: 'Car Papers', icon: Car, color: 'text-green-600', bg: 'bg-green-50', cat: 'LIFESTYLE' },
    { id: ToolType.CINEMA, label: 'Cinema', icon: Ticket, color: 'text-purple-500', bg: 'bg-purple-100', cat: 'LIFESTYLE' },
  ];

  const filteredTools = category === 'ALL' ? allTools : allTools.filter(t => t.cat === category);

  if (activeTool !== ToolType.NONE) {
    return (
        <div className="max-w-2xl mx-auto">
            <button 
                onClick={() => setActiveTool(ToolType.NONE)}
                className="flex items-center gap-1 text-sm font-medium text-gray-500 mb-4 hover:text-ng-green px-1"
            >
                <ChevronLeft size={16} /> Back to Hub
            </button>
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                {activeTool === ToolType.VAT && <TaxCalculator />}
                {activeTool === ToolType.INFLATION && <InflationCalc />}
                {activeTool === ToolType.SALARY && <SalaryCalculator />}
                {activeTool === ToolType.FUEL && <FuelCalculator />}
                {activeTool === ToolType.POWER && <ElectricityCalculator />}
                {activeTool === ToolType.USSD && <USSDDirectory />}
                {activeTool === ToolType.MARKET && <MarketConverter />}
                {activeTool === ToolType.DATA && <DataCalculator />}
                {activeTool === ToolType.EMERGENCY && <EmergencyNumbers />}
                {activeTool === ToolType.LOAN && <LoanCalculator />}
                {activeTool === ToolType.SAVINGS && <TargetSavings />}
                {activeTool === ToolType.LAND && <LandConverter />}
                {activeTool === ToolType.RENT && <RentBudget />}
                {activeTool === ToolType.SME && <SmeMargin />}
                {activeTool === ToolType.JAPA && <JapaCalc />}
                {activeTool === ToolType.WEDDING && <WeddingBudget />}
                {activeTool === ToolType.GENSET && <GenRuntime />}
                {activeTool === ToolType.PENSION && <PensionCalc />}
                {activeTool === ToolType.INVOICE && <InvoiceGenerator />}
                {activeTool === ToolType.SOLAR && <SolarCalc />}
                {activeTool === ToolType.DUTY && <ImportDuty />}
                {activeTool === ToolType.OWANBE && <EventDrinks />}
                {/* New Tools */}
                {activeTool === ToolType.FREELANCE && <FreelanceCalc />}
                {activeTool === ToolType.CRYPTO && <CryptoCalc />}
                {activeTool === ToolType.POS && <PosTerminal />}
                {activeTool === ToolType.SAFELOCK && <SafeLock />}
                {activeTool === ToolType.SOCIAL_ADS && <SocialAds />}
                {activeTool === ToolType.RIDESHARE && <RideShare />}
                {activeTool === ToolType.KEKE && <KekeDaily />}
                {activeTool === ToolType.AIRTIME_CASH && <AirtimeCash />}
                {activeTool === ToolType.TITHES && <TithesCalc />}
                {activeTool === ToolType.CAR_IMPORT && <CarImport />}
                {activeTool === ToolType.VEHICLE_PAPERS && <VehiclePapers />}
                {activeTool === ToolType.CEMENT && <CementCalc />}
                {activeTool === ToolType.DSTV && <DstvPackages />}
                {activeTool === ToolType.COOKING_GAS && <CookingGas />}
                {activeTool === ToolType.SCHOOL_FEES && <SchoolFees />}
                {activeTool === ToolType.TRAFFIC && <TrafficTime />}
                {activeTool === ToolType.PASSPORT && <PassportInfo />}
                {activeTool === ToolType.DATE_NIGHT && <DateNight />}
                {activeTool === ToolType.STARLINK && <StarlinkCalc />}
                {activeTool === ToolType.CINEMA && <CinemaBudget />}
            </div>
        </div>
    );
  }

  return (
    <div className="space-y-6">
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Utility Hub</h2>
            <p className="text-gray-500 text-sm">Essential tools for daily Nigerian life.</p>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide md:flex-wrap md:overflow-visible md:px-0 md:mx-0">
            {[
                { id: 'ALL', label: 'All', icon: LayoutGrid },
                { id: 'FINANCE', label: 'Money', icon: Wallet },
                { id: 'BUSINESS', label: 'Biz', icon: Store },
                { id: 'REAL_ESTATE', label: 'Housing', icon: Home },
                { id: 'BILLS', label: 'Bills', icon: Zap },
                { id: 'LIFESTYLE', label: 'Life', icon: LifeBuoy },
            ].map((cat) => (
                <button 
                    key={cat.id}
                    onClick={() => setCategory(cat.id as Category)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${category === cat.id ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200 text-gray-600'}`}
                >
                    <cat.icon size={14} /> {cat.label}
                </button>
            ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredTools.map((tool) => (
                <button
                    key={tool.id}
                    onClick={() => setActiveTool(tool.id)}
                    className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-start gap-3 hover:shadow-md transition-all active:scale-95 text-left"
                >
                    <div className={`p-3 rounded-xl ${tool.bg} ${tool.color}`}>
                        <tool.icon size={22} />
                    </div>
                    <div>
                        <span className="font-bold text-gray-800 text-sm block">{tool.label}</span>
                        <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">{tool.cat}</span>
                    </div>
                </button>
            ))}
        </div>
    </div>
  );
};