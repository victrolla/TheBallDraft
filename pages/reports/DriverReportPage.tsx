import React from 'react';
import { Icons } from '../../components/Icons';
import { MOCK_DRIVERS } from '../../constants';

export const DriverReportPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Driver Performance Reports</h2>
          <p className="text-slate-500 text-sm">Safety scoring, fatigue compliance, and efficiency analysis.</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 shadow-sm">
          <Icons.Upload className="w-4 h-4 mr-2" />
          Export PDF
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {MOCK_DRIVERS.map(driver => (
           <div key={driver.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                 <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-600 text-lg">
                      {driver.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">{driver.name}</h3>
                      <p className="text-xs text-slate-500">{driver.id}</p>
                    </div>
                 </div>
                 <div className="text-right">
                    <div className="text-2xl font-bold text-nz-blue">{driver.safetyScore}</div>
                    <div className="text-xs text-slate-400">Safety Score</div>
                 </div>
              </div>

              <div className="space-y-3">
                 <div>
                   <div className="flex justify-between text-sm mb-1">
                     <span className="text-slate-600">Speed Compliance</span>
                     <span className="font-medium">98%</span>
                   </div>
                   <div className="w-full bg-slate-100 rounded-full h-2">
                     <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '98%' }}></div>
                   </div>
                 </div>
                 <div>
                   <div className="flex justify-between text-sm mb-1">
                     <span className="text-slate-600">Logbook Adherence</span>
                     <span className="font-medium">100%</span>
                   </div>
                   <div className="w-full bg-slate-100 rounded-full h-2">
                     <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                   </div>
                 </div>
                 <div>
                   <div className="flex justify-between text-sm mb-1">
                     <span className="text-slate-600">Fuel Efficiency</span>
                     <span className="font-medium">85%</span>
                   </div>
                   <div className="w-full bg-slate-100 rounded-full h-2">
                     <div className="bg-amber-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                   </div>
                 </div>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
};