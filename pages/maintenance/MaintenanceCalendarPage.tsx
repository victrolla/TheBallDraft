import React from 'react';
import { MOCK_MAINTENANCE } from '../../constants';
import { Icons } from '../../components/Icons';

export const MaintenanceCalendarPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Maintenance Schedule</h2>
          <p className="text-slate-500 text-sm">Preventative maintenance and service logs.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50">Export Report</button>
          <button className="flex items-center px-4 py-2 bg-nz-blue text-white rounded-lg hover:bg-blue-700 shadow-sm">
            <Icons.Plus className="w-4 h-4 mr-2" />
            Schedule Service
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Widget (Simplified List for Skeleton) */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
             <h3 className="font-bold text-slate-800">Upcoming Services</h3>
             <div className="flex gap-1">
               <button className="p-1 hover:bg-slate-200 rounded"><Icons.ChevronRight className="w-4 h-4 rotate-180" /></button>
               <span className="text-sm font-medium px-2">May 2024</span>
               <button className="p-1 hover:bg-slate-200 rounded"><Icons.ChevronRight className="w-4 h-4" /></button>
             </div>
          </div>
          <div className="divide-y divide-slate-100">
            {MOCK_MAINTENANCE.map(record => (
              <div key={record.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${record.type === 'Service' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
                    <Icons.Maintenance className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{record.type} - {record.vehicleId}</h4>
                    <p className="text-sm text-slate-500">{record.provider} • {record.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-2 py-1 rounded text-xs font-semibold mb-1 ${
                    record.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'
                  }`}>
                    {record.status}
                  </span>
                  <p className="text-sm font-medium text-slate-700">${record.cost}</p>
                </div>
              </div>
            ))}
            <div className="p-4 text-center text-sm text-slate-500">No more scheduled maintenance this month.</div>
          </div>
        </div>

        {/* Stats Widget */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
             <h3 className="font-bold text-slate-800 mb-4">Cost Summary</h3>
             <div className="space-y-4">
               <div>
                 <div className="flex justify-between text-sm mb-1">
                   <span className="text-slate-500">Total Spent (YTD)</span>
                   <span className="font-bold text-slate-900">$4,700</span>
                 </div>
                 <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                   <div className="h-full bg-blue-500" style={{ width: '65%' }}></div>
                 </div>
               </div>
               <div>
                 <div className="flex justify-between text-sm mb-1">
                   <span className="text-slate-500">Budget Remaining</span>
                   <span className="font-bold text-slate-900">$12,300</span>
                 </div>
                 <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                   <div className="h-full bg-emerald-500" style={{ width: '85%' }}></div>
                 </div>
               </div>
             </div>
          </div>

          <div className="bg-red-50 p-6 rounded-xl border border-red-100">
            <h3 className="font-bold text-red-800 flex items-center gap-2 mb-2">
              <Icons.Alert className="w-5 h-5" />
              Overdue Alerts
            </h3>
            <p className="text-sm text-red-600 mb-4">2 vehicles are past their scheduled service date. Compliance risk detected.</p>
            <button className="w-full py-2 bg-white border border-red-200 text-red-700 rounded-lg text-sm font-medium hover:bg-red-50">View Vehicles</button>
          </div>
        </div>
      </div>
    </div>
  );
};