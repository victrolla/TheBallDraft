import React from 'react';
import { Icons } from '../../components/Icons';
import { MOCK_ALERTS } from '../../constants';
import { Badge } from '../../components/ui/Badge';

export const AlertCenterPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Alert Center</h2>
          <p className="text-slate-500 text-sm">Real-time incident management and resolution.</p>
        </div>
        <div className="flex gap-2">
           <button className="px-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-700 hover:bg-slate-50">
              Configure Rules
           </button>
           <button className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700">
              Acknowledge All
           </button>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
         {['All Alerts', 'Critical', 'Warning', 'Info'].map(type => (
            <button key={type} className="px-4 py-1.5 rounded-full bg-white border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors">
               {type}
            </button>
         ))}
      </div>

      <div className="space-y-3">
         {MOCK_ALERTS.map(alert => (
            <div key={alert.id} className={`bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4 transition-all hover:shadow-md ${
               alert.type === 'CRITICAL' ? 'border-l-4 border-l-red-500' : 
               alert.type === 'WARNING' ? 'border-l-4 border-l-amber-500' : ''
            }`}>
               <div className={`p-3 rounded-full shrink-0 ${
                  alert.type === 'CRITICAL' ? 'bg-red-100 text-red-600' : 
                  alert.type === 'WARNING' ? 'bg-amber-100 text-amber-600' : 
                  'bg-blue-100 text-blue-600'
               }`}>
                  {alert.type === 'CRITICAL' ? <Icons.AlertOctagon className="w-6 h-6" /> : <Icons.Alert className="w-6 h-6" />}
               </div>
               
               <div className="flex-1">
                  <div className="flex justify-between items-start">
                     <div>
                        <h3 className="font-bold text-slate-900 text-lg">{alert.category} Alert</h3>
                        <p className="text-slate-600">{alert.message}</p>
                        <div className="flex gap-2 mt-2 text-xs font-mono text-slate-400">
                           <span>ID: {alert.id}</span>
                           <span>•</span>
                           <span>Entity: {alert.entityId}</span>
                        </div>
                     </div>
                     <div className="text-right">
                        <span className="text-sm font-bold text-slate-500">{alert.timestamp}</span>
                        <div className="mt-1">
                           <Badge variant={alert.resolved ? 'success' : 'error'}>{alert.resolved ? 'Resolved' : 'Active'}</Badge>
                        </div>
                     </div>
                  </div>
                  
                  <div className="mt-4 flex gap-3 pt-3 border-t border-slate-100">
                     <button className="text-sm font-bold text-nz-blue hover:text-blue-800 flex items-center gap-1">
                        <Icons.Check className="w-4 h-4" /> Acknowledge
                     </button>
                     <button className="text-sm font-bold text-slate-500 hover:text-slate-700 flex items-center gap-1">
                        <Icons.Clock className="w-4 h-4" /> Snooze (1h)
                     </button>
                     <button className="text-sm font-bold text-slate-500 hover:text-slate-700 ml-auto flex items-center gap-1">
                        View Details <Icons.ChevronRight className="w-4 h-4" />
                     </button>
                  </div>
               </div>
            </div>
         ))}
      </div>
    </div>
  );
};