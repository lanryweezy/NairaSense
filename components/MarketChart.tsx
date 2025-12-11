import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { HISTORICAL_DATA } from '../constants';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const MarketChart: React.FC = () => {
  const currentRate = HISTORICAL_DATA[HISTORICAL_DATA.length - 1].rate;
  const prevRate = HISTORICAL_DATA[HISTORICAL_DATA.length - 2].rate;
  const isUp = currentRate > prevRate;
  const diff = currentRate - prevRate;
  const percent = ((diff / prevRate) * 100).toFixed(1);

  return (
    <div className="space-y-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-lg font-bold text-gray-800">USD / NGN Trend</h2>
                    <p className="text-sm text-gray-500">Last 10 Months (Parallel)</p>
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-sm font-bold ${isUp ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                    {/* Note: For exchange rate, Up is usually "bad" for the local currency value, but here we show rate value increasing */}
                    {isUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    <span>{percent}%</span>
                </div>
            </div>

            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={HISTORICAL_DATA}
                        margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#008751" stopOpacity={0.2}/>
                                <stop offset="95%" stopColor="#008751" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis 
                            dataKey="date" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fontSize: 12, fill: '#9ca3af'}} 
                            dy={10}
                        />
                        <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fontSize: 12, fill: '#9ca3af'}} 
                            domain={['auto', 'auto']}
                        />
                        <Tooltip 
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                            itemStyle={{ color: '#1f2937', fontWeight: 600 }}
                            formatter={(value: number) => [`₦${value}`, 'Rate']}
                        />
                        <Area 
                            type="monotone" 
                            dataKey="rate" 
                            stroke="#008751" 
                            strokeWidth={3}
                            fillOpacity={1} 
                            fill="url(#colorRate)" 
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <p className="text-xs text-gray-500 mb-1">Highest (Year)</p>
                <p className="text-xl font-bold text-gray-900">₦1,750</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <p className="text-xs text-gray-500 mb-1">Lowest (Year)</p>
                <p className="text-xl font-bold text-gray-900">₦1,150</p>
            </div>
        </div>
    </div>
  );
};