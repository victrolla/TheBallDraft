import React from 'react';
import { Icons } from '../../components/Icons';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export const ReturnSchedulerPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
       <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Return Logistics</h2>
          <p className="text-slate-500 text-sm">Coordinate reverse logistics and depot returns.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Pending Returns List */}
         <div className="space-y-4">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
               <Icons.Target className="w-5 h-5 text-orange-500" /> Pending Collection
            </h3>
            
            {[1,2,3].map(i => (
               <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex gap-4">
                  <div className="p-3 bg-orange-50 rounded-lg h-fit">
                     <Icons.Package className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                     <div className="flex justify-between mb-1">
                        <span className="font-bold text-slate-900">Empty Pallets (x12)</span>
                        <Badge variant="warning">Unscheduled</Badge>
                     </div>
                     <p className="text-sm text-slate-600 mb-2">At: Mitre 10 Mega, Hamilton</p>
                     <div className="flex gap-2">
                        <button className="text-xs bg-nz-blue text-white px-3 py-1.5 rounded hover:bg-blue-700 font-medium">Assign Pickup</button>
                        <button className="text-xs border border-slate-300 px-3 py-1.5 rounded hover:bg-slate-50">Details</button>
                     </div>
                  </div>
               </div>
            ))}
         </div>

         {/* Scheduler Form */}
         <div>
            <Card title="Schedule Return Trip">
               <form className="space-y-4">
                  <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">Return Depot</label>
                     <select className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm">
                        <option>Hamilton Central Depot</option>
                        <option>Auckland DC</option>
                     </select>
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">Assign Vehicle</label>
                     <div className="relative">
                        <Icons.Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                        <input type="text" placeholder="Search nearby vehicles..." className="w-full border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-sm" />
                     </div>
                     <div className="mt-2 text-xs text-slate-500">
                        Recommended: <span className="font-bold text-nz-blue cursor-pointer">V002 (2km away)</span>
                     </div>
                  </div>
                  
                  <div className="pt-4 border-t border-slate-100">
                     <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-500">Est. Pickup</span>
                        <span className="font-bold">14:30 Today</span>
                     </div>
                     <div className="flex justify-between text-sm mb-4">
                        <span className="text-slate-500">Est. Return</span>
                        <span className="font-bold">16:00 Today</span>
                     </div>
                     <button type="button" className="w-full py-2.5 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800">
                        Confirm Schedule
                     </button>
                  </div>
               </form>
            </Card>
         </div>
      </div>
    </div>
  );
};