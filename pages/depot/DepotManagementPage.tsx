import React from 'react';
import { Icons } from '../../components/Icons';
import { Card } from '../../components/ui/Card';

export const DepotManagementPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
       <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Depot Control</h2>
          <p className="text-slate-500 text-sm">Manage warehouse capacity and inbound logistics.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-xs text-slate-500 uppercase font-bold">Bay Availability</p>
            <p className="text-2xl font-black text-emerald-600 mt-1">4 / 12</p>
         </div>
         <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-xs text-slate-500 uppercase font-bold">Inbound Vehicles</p>
            <p className="text-2xl font-black text-nz-blue mt-1">3</p>
         </div>
         <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-xs text-slate-500 uppercase font-bold">Storage Capacity</p>
            <p className="text-2xl font-black text-slate-800 mt-1">82%</p>
         </div>
         <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-xs text-slate-500 uppercase font-bold">Staff On-Site</p>
            <p className="text-2xl font-black text-slate-800 mt-1">8</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2">
            <Card title="Inbound Arrivals">
               <table className="min-w-full divide-y divide-slate-100">
                  <thead className="bg-slate-50">
                     <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">Vehicle</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">Type</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">ETA</th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-slate-500 uppercase">Action</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                     <tr>
                        <td className="px-4 py-3 font-bold text-slate-800">V001</td>
                        <td className="px-4 py-3 text-sm text-slate-600">Return (Pallets)</td>
                        <td className="px-4 py-3 text-sm text-emerald-600 font-bold">14:15 (On Time)</td>
                        <td className="px-4 py-3 text-right">
                           <button className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-1 rounded">Assign Bay</button>
                        </td>
                     </tr>
                     <tr>
                        <td className="px-4 py-3 font-bold text-slate-800">V003</td>
                        <td className="px-4 py-3 text-sm text-slate-600">Freight Loading</td>
                        <td className="px-4 py-3 text-sm text-amber-600 font-bold">15:30 (Delayed)</td>
                        <td className="px-4 py-3 text-right">
                           <button className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-1 rounded">Assign Bay</button>
                        </td>
                     </tr>
                  </tbody>
               </table>
            </Card>
         </div>

         <div>
            <Card title="Yard Status">
               <div className="space-y-3">
                  {['Bay 1', 'Bay 2', 'Bay 3', 'Bay 4'].map((bay, i) => (
                     <div key={i} className="flex justify-between items-center p-3 border border-slate-100 rounded bg-slate-50">
                        <div className="flex items-center gap-2">
                           <div className={`w-3 h-3 rounded-full ${i < 2 ? 'bg-red-500' : 'bg-emerald-500'}`}></div>
                           <span className="font-bold text-slate-700 text-sm">{bay}</span>
                        </div>
                        <span className="text-xs text-slate-500">{i < 2 ? 'Occupied' : 'Empty'}</span>
                     </div>
                  ))}
               </div>
            </Card>
         </div>
      </div>
    </div>
  );
};