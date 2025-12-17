import React from 'react';
import { Icons } from '../../components/Icons';

export const SettingsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Settings</h2>
        <p className="text-slate-500 text-sm">Manage application preferences and compliance.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden divide-y divide-slate-100">
        
        {/* Profile Section */}
        <div className="p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Icons.User className="w-5 h-5 text-slate-400" /> Profile & Account
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
              <input type="text" className="w-full border border-slate-300 rounded-lg px-4 py-2" defaultValue="John Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <input type="email" className="w-full border border-slate-300 rounded-lg px-4 py-2" defaultValue="john.doe@fleetcmd.co.nz" disabled />
            </div>
          </div>
        </div>

        {/* NZ Compliance */}
        <div className="p-6">
           <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Icons.Compliance className="w-5 h-5 text-slate-400" /> NZ Transport Compliance
          </h3>
          <div className="space-y-4">
             <div className="flex items-center justify-between">
               <div>
                 <p className="font-medium text-slate-900">RUC Auto-Renew Warnings</p>
                 <p className="text-sm text-slate-500">Notify when licenses are within 1000km of expiry</p>
               </div>
               <input type="checkbox" className="toggle" defaultChecked />
             </div>
             <div className="flex items-center justify-between">
               <div>
                 <p className="font-medium text-slate-900">Driver Fatigue Rules (NZ)</p>
                 <p className="text-sm text-slate-500">Enforce 5.5h work block limits</p>
               </div>
               <input type="checkbox" className="toggle" defaultChecked />
             </div>
          </div>
        </div>

        {/* System Prefs */}
        <div className="p-6">
           <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Icons.Settings className="w-5 h-5 text-slate-400" /> System Preferences
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Timezone</label>
              <select className="w-full border border-slate-300 rounded-lg px-4 py-2">
                <option>Pacific/Auckland (GMT+12)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Measurement Units</label>
              <select className="w-full border border-slate-300 rounded-lg px-4 py-2">
                <option>Metric (km, L, kg)</option>
              </select>
            </div>
          </div>
        </div>

      </div>
      
      <div className="flex justify-end gap-3">
        <button className="px-6 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 font-medium">Cancel</button>
        <button className="px-6 py-2 bg-nz-blue text-white rounded-lg font-medium hover:bg-blue-700">Save Changes</button>
      </div>
    </div>
  );
};