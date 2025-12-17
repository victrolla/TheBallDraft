import React from 'react';
import { Card } from '../ui/Card';
import { Icons } from '../Icons';
import { MOCK_ALERTS } from '../../constants';

export const NotificationsPanel: React.FC = () => {
  return (
    <Card className="h-full flex flex-col" title="Live System Alerts" 
      action={<button className="text-xs text-nz-blue font-medium hover:underline">Mark all read</button>}
    >
      <div className="space-y-1 overflow-y-auto pr-2 max-h-[400px] scrollbar-thin">
        {MOCK_ALERTS.map(alert => (
          <div key={alert.id} className={`p-3 rounded-lg border border-transparent hover:bg-slate-50 transition-colors cursor-pointer group flex gap-3 ${
            alert.type === 'CRITICAL' ? 'bg-red-50/50 border-red-100' : ''
          }`}>
             <div className={`mt-1 p-1.5 rounded-full shrink-0 ${
               alert.type === 'CRITICAL' ? 'bg-red-100 text-red-600' : 
               alert.type === 'WARNING' ? 'bg-amber-100 text-amber-600' : 
               'bg-blue-100 text-blue-600'
             }`}>
               {alert.type === 'CRITICAL' ? <Icons.Alert className="w-4 h-4" /> : <Icons.Bell className="w-4 h-4" />}
             </div>
             <div className="flex-1">
                <div className="flex justify-between items-start">
                   <p className="text-sm font-medium text-slate-800">{alert.category}</p>
                   <span className="text-xs text-slate-400">{alert.timestamp}</span>
                </div>
                <p className="text-sm text-slate-600 mt-1">{alert.message}</p>
                <div className="mt-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button className="text-xs bg-white border border-slate-200 px-2 py-1 rounded hover:bg-slate-50 text-slate-600">Investigate</button>
                   <button className="text-xs text-slate-400 hover:text-slate-600 px-2 py-1">Dismiss</button>
                </div>
             </div>
          </div>
        ))}
        {MOCK_ALERTS.length === 0 && <p className="text-center text-slate-400 py-8 text-sm">All systems normal.</p>}
      </div>
    </Card>
  );
};