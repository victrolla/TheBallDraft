import React from 'react';
import { Icons } from '../../components/Icons';
import { Badge } from '../../components/ui/Badge';

export const AlertHistoryPage: React.FC = () => {
  // Mock history
  const history = [
    { id: 'AH-101', date: '2024-10-22', type: 'Critical', message: 'V001 Engine Overheat', resolvedBy: 'System', duration: '15m' },
    { id: 'AH-102', date: '2024-10-21', type: 'Warning', message: 'D003 Speeding Violation', resolvedBy: 'Admin', duration: '1h 20m' },
    { id: 'AH-103', date: '2024-10-20', type: 'Info', message: 'Geofence Entry - Depot', resolvedBy: 'Auto', duration: '-' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
       <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Alert History</h2>
          <p className="text-slate-500 text-sm">Audit trail of resolved incidents.</p>
        </div>
        <div className="relative">
           <Icons.Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
           <input type="text" placeholder="Search logs..." className="pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-sm w-64" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
         <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
               <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Severity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Message</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Resolved By</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Duration</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
               {history.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50">
                     <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{item.date}</td>
                     <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={item.type === 'Critical' ? 'error' : item.type === 'Warning' ? 'warning' : 'neutral'}>{item.type}</Badge>
                     </td>
                     <td className="px-6 py-4 text-sm text-slate-900 font-medium">{item.message}</td>
                     <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{item.resolvedBy}</td>
                     <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-mono">{item.duration}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
    </div>
  );
};