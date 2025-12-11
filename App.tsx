import React, { useState } from 'react';
import { AppTab } from './types';
import { Navigation } from './components/Navigation';
import { CurrencyConverter } from './components/CurrencyConverter';
import { MarketChart } from './components/MarketChart';
import { ToolsHub } from './components/ToolsHub';
import { Menu, Bell, ArrowRightLeft, TrendingUp, Grid } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.CONVERTER);

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.CONVERTER:
        return <CurrencyConverter />;
      case AppTab.CHARTS:
        return <MarketChart />;
      case AppTab.TOOLS:
        return <ToolsHub />;
      default:
        return <CurrencyConverter />;
    }
  };

  const navItems = [
    { id: AppTab.CONVERTER, label: 'Exchange', icon: ArrowRightLeft },
    { id: AppTab.CHARTS, label: 'Trends', icon: TrendingUp },
    { id: AppTab.TOOLS, label: 'Tools Hub', icon: Grid },
  ];

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden font-sans bg-gray-50 text-gray-900">
      
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 h-full flex-shrink-0">
        <div className="p-6 border-b border-gray-100">
           <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-ng-green rounded-lg flex items-center justify-center text-white font-bold text-lg">
                    ₦
                </div>
                <h1 className="text-xl font-bold tracking-tight text-gray-900">NairaSense</h1>
            </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => (
                <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                        activeTab === item.id 
                        ? 'bg-ng-green/10 text-ng-green' 
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                >
                    <item.icon size={20} strokeWidth={2} />
                    {item.label}
                </button>
            ))}
        </nav>

        <div className="p-6 border-t border-gray-100">
            <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 font-medium">Daily Tip</p>
                <p className="text-xs text-gray-700 mt-1 leading-relaxed">Checking rates before 10 AM often gives you the opening market position.</p>
            </div>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        
        {/* Mobile Header */}
        <header className="bg-white sticky top-0 z-40 border-b border-gray-200 px-4 py-3 shadow-sm md:hidden flex-shrink-0">
            <div className="max-w-md mx-auto flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-ng-green rounded-lg flex items-center justify-center text-white font-bold text-lg">
                        ₦
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-gray-900">NairaSense</h1>
                </div>
                <div className="flex items-center gap-3">
                    <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                        <Bell size={20} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                    </button>
                    <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                        <Menu size={20} />
                    </button>
                </div>
            </div>
        </header>

        {/* Desktop Header */}
        <header className="hidden md:flex bg-white border-b border-gray-200 px-8 py-4 justify-between items-center flex-shrink-0">
            <h2 className="text-xl font-bold text-gray-800">
                {navItems.find(i => i.id === activeTab)?.label}
            </h2>
            <div className="flex items-center gap-4">
                 <button className="relative p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-600 rounded-full transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>
                <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white shadow-sm"></div>
            </div>
        </header>

        {/* Scrollable Main Area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 pb-24 md:p-8 md:pb-8">
            <div className={`mx-auto ${activeTab === AppTab.TOOLS ? 'w-full max-w-7xl' : 'max-w-md md:max-w-xl'}`}>
                {renderContent()}
            </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
}