import React from 'react';
import { FreightTable } from '../../components/FreightTable';
import { Icons } from '../../components/Icons';

export const FreightInputPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Freight Input/Output</h2>
          <p className="text-slate-500 text-sm">Manage warehouse logistics, scanning, and manifesting.</p>
        </div>
        <div className="flex gap-2">
           <button className="flex items-center px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 shadow-sm">
            <Icons.Upload className="w-4 h-4 mr-2" />
            Bulk Import CSV
          </button>
          <button className="flex items-center px-4 py-2 bg-nz-blue text-white rounded-lg hover:bg-blue-700 shadow-sm">
            <Icons.Plus className="w-4 h-4 mr-2" />
            New Manifest
          </button>
        </div>
      </div>
      <FreightTable />
    </div>
  );
};