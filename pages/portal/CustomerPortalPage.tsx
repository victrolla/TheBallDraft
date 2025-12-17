import React, { useState } from 'react';
import { Icons } from '../../components/Icons';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { LiveMap } from '../../components/LiveMap';

export const CustomerPortalPage: React.FC = () => {
  const [trackingId, setTrackingId] = useState('');
  const [activeTab, setActiveTab] = useState<'tracking' | 'sla' | 'orders'>('tracking');

  return (
    <div className="h-full flex flex-col gap-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Customer Portal</h2>
          <p className="text-slate-500 text-sm">Client View: Fonterra Co-op (Account #8839)</p>
        </div>
        <div className="flex gap-2">
           <button 
             onClick={() => setActiveTab('tracking')}
             className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'tracking' ? 'bg-nz-blue text-white' : 'bg-white text-slate-600 border border-slate-300'}`}
           >
             Live Tracking
           </button>
           <button 
             onClick={() => setActiveTab('sla')}
             className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'sla' ? 'bg-nz-blue text-white' : 'bg-white text-slate-600 border border-slate-300'}`}
           >
             SLA Performance
           </button>
           <button 
             onClick={() => setActiveTab('orders')}
             className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'orders' ? 'bg-nz-blue text-white' : 'bg-white text-slate-600 border border-slate-300'}`}
           >
             Order History
           </button>
        </div>
      </div>

      {activeTab === 'tracking' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
           <div className="flex flex-col gap-4">
              <Card title="Track Shipment">
                 <div className="flex gap-2 mb-4">
                    <input 
                      type="text" 
                      placeholder="Enter Waybill or Ref ID" 
                      value={trackingId}
                      onChange={(e) => setTrackingId(e.target.value)}
                      className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-nz-blue outline-none"
                    />
                    <button className="bg-slate-900 text-white px-4 rounded-lg hover:bg-slate-800">
                       <Icons.Search className="w-4 h-4" />
                    </button>
                 </div>
                 {/* Mock Result */}
                 <div className="border-t border-slate-100 pt-4">
                    <div className="flex justify-between items-start mb-2">
                       <h4 className="font-bold text-slate-900">Order #F-2938</h4>
                       <Badge variant="success">In Transit</Badge>
                    </div>
                    <p className="text-sm text-slate-500 mb-4">Hamilton Depot → Auckland Port</p>
                    
                    <div className="space-y-4 relative pl-4 border-l-2 border-slate-200 ml-1">
                       <div className="relative">
                          <div className="absolute -left-[21px] top-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white shadow"></div>
                          <p className="text-xs text-slate-400">10:30 AM</p>
                          <p className="text-sm font-medium text-slate-800">Departed Hamilton Facility</p>
                       </div>
                       <div className="relative">
                          <div className="absolute -left-[21px] top-1 w-3 h-3 bg-slate-300 rounded-full border-2 border-white shadow"></div>
                          <p className="text-xs text-slate-400">Estimated 02:00 PM</p>
                          <p className="text-sm font-medium text-slate-800">Arrival at Auckland Port</p>
                       </div>
                    </div>
                 </div>
              </Card>

              <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl">
                 <div className="flex items-center gap-2 text-blue-800 font-bold mb-2">
                    <Icons.Bell className="w-4 h-4" /> Notifications
                 </div>
                 <p className="text-sm text-blue-700">
                    Your shipment #F-2938 is currently 15 minutes ahead of schedule.
                 </p>
              </div>
           </div>

           <div className="lg:col-span-2 bg-slate-200 rounded-xl overflow-hidden border border-slate-300 shadow-inner relative">
              <LiveMap className="w-full h-full" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow text-sm font-bold text-slate-800">
                 ETA: 14:00 Today
              </div>
           </div>
        </div>
      )}

      {activeTab === 'sla' && (
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center py-8">
               <p className="text-slate-500 text-sm uppercase font-bold mb-2">On-Time Delivery (MTD)</p>
               <p className="text-5xl font-black text-emerald-600">98.2%</p>
               <p className="text-emerald-600 text-xs font-bold mt-2">▲ 1.5% vs Last Month</p>
            </Card>
            <Card className="text-center py-8">
               <p className="text-slate-500 text-sm uppercase font-bold mb-2">Avg Transit Time</p>
               <p className="text-5xl font-black text-nz-blue">4.2h</p>
               <p className="text-slate-400 text-xs font-bold mt-2">Target: &lt; 5.0h</p>
            </Card>
            <Card className="text-center py-8">
               <p className="text-slate-500 text-sm uppercase font-bold mb-2">Freight Claims</p>
               <p className="text-5xl font-black text-slate-800">0</p>
               <p className="text-emerald-600 text-xs font-bold mt-2">Zero incidents recorded</p>
            </Card>
         </div>
      )}

      {activeTab === 'orders' && (
         <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="min-w-full divide-y divide-slate-200">
               <thead className="bg-slate-50">
                  <tr>
                     <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Order Ref</th>
                     <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Date</th>
                     <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Route</th>
                     <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
                     <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase">Invoice</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-200">
                  {[1,2,3,4,5].map(i => (
                     <tr key={i} className="hover:bg-slate-50">
                        <td className="px-6 py-4 font-medium text-slate-900">PO-992{i}</td>
                        <td className="px-6 py-4 text-slate-500">Oct {20+i}, 2024</td>
                        <td className="px-6 py-4 text-slate-700">Hamilton → Auckland</td>
                        <td className="px-6 py-4">
                           <Badge variant={i === 1 ? 'info' : 'success'}>{i === 1 ? 'In Transit' : 'Delivered'}</Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                           <button className="text-nz-blue hover:underline text-sm">Download</button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      )}
    </div>
  );
};