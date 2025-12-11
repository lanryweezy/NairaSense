import React from 'react';
import { ArrowRightLeft, TrendingUp, Grid } from 'lucide-react';
import { AppTab } from '../types';

interface NavigationProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: AppTab.CONVERTER, label: 'Exchange', icon: ArrowRightLeft },
    { id: AppTab.CHARTS, label: 'Trends', icon: TrendingUp },
    { id: AppTab.TOOLS, label: 'Tools Hub', icon: Grid },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 pb-safe pt-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">
      <div className="flex justify-around items-center max-w-md mx-auto pb-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-center w-20 h-14 space-y-1 transition-colors duration-200 ${
                isActive ? 'text-ng-green' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[11px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};