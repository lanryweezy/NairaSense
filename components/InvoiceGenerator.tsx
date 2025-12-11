import React, { useState } from 'react';
import { FileText, Plus, Trash2, Download } from 'lucide-react';

interface Item {
    id: number;
    desc: string;
    price: number;
}

export const InvoiceGenerator: React.FC = () => {
  const [client, setClient] = useState('Client Name');
  const [items, setItems] = useState<Item[]>([{ id: 1, desc: 'Service / Item 1', price: 0 }]);

  const addItem = () => {
    setItems([...items, { id: Date.now(), desc: '', price: 0 }]);
  };

  const updateItem = (id: number, field: 'desc' | 'price', value: string) => {
    setItems(items.map(i => i.id === id ? { ...i, [field]: field === 'price' ? parseFloat(value) : value } : i));
  };

  const removeItem = (id: number) => {
    setItems(items.filter(i => i.id !== id));
  };

  const total = items.reduce((sum, i) => sum + (i.price || 0), 0);
  const date = new Date().toLocaleDateString('en-NG');

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
            <FileText className="text-indigo-600" size={24} />
            Quick Invoice
        </h2>
        <p className="text-sm text-gray-500 mb-6">Create a simple receipt to screenshot and send.</p>

        <div className="mb-4">
            <input 
                type="text" 
                placeholder="Client Name"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
        </div>

        <div className="space-y-3 mb-4">
            {items.map((item) => (
                <div key={item.id} className="flex gap-2 items-center">
                    <input 
                        type="text" 
                        placeholder="Item Description"
                        value={item.desc}
                        onChange={(e) => updateItem(item.id, 'desc', e.target.value)}
                        className="flex-1 p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm"
                    />
                    <input 
                        type="number" 
                        placeholder="0"
                        value={item.price || ''}
                        onChange={(e) => updateItem(item.id, 'price', e.target.value)}
                        className="w-24 p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-bold text-right"
                    />
                    <button onClick={() => removeItem(item.id)} className="text-red-400 p-1">
                        <Trash2 size={18} />
                    </button>
                </div>
            ))}
        </div>

        <button onClick={addItem} className="flex items-center gap-2 text-sm text-indigo-600 font-bold mb-6">
            <Plus size={16} /> Add Item
        </button>

        {/* Invoice Preview Card */}
        <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-6 relative">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="font-bold text-2xl text-gray-900">INVOICE</h3>
                    <p className="text-xs text-gray-400">Date: {date}</p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-gray-500 uppercase">To</p>
                    <p className="font-bold text-gray-800">{client || 'Client'}</p>
                </div>
            </div>

            <div className="space-y-2 mb-6 border-t border-gray-100 pt-4">
                {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-gray-600">{item.desc || 'Item'}</span>
                        <span className="font-bold text-gray-900">₦{(item.price || 0).toLocaleString()}</span>
                    </div>
                ))}
            </div>

            <div className="border-t-2 border-gray-800 pt-4 flex justify-between items-center">
                <span className="font-bold text-gray-900">TOTAL DUE</span>
                <span className="font-bold text-2xl text-indigo-700">₦{total.toLocaleString()}</span>
            </div>
            
            <div className="absolute top-0 right-0 -mt-3 -mr-3 bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded">
                PREVIEW
            </div>
        </div>
        
        <p className="text-center text-xs text-gray-400 mt-4">
            <Download size={12} className="inline mr-1"/> Screenshot the card above to share
        </p>
      </div>
    </div>
  );
};