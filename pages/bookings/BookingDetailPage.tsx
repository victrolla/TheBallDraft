import React from 'react';
import { Icons } from '../../components/Icons';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';

interface BookingDetailPageProps {
  onBack: () => void;
}

export const BookingDetailPage: React.FC<BookingDetailPageProps> = ({ onBack }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
               <Icons.ChevronRight className="w-6 h-6 rotate-180 text-slate-500" />
            </button>
            <div>
               <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                  Booking B-3920
                  <Badge variant="warning">Pending</Badge>
               </h1>
               <p className="text-slate-500 text-sm">Fonterra Co-op • Created 2 hours ago</p>
            </div>
         </div>
         <div className="flex gap-2">
            <button className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 bg-white hover:bg-slate-50 text-sm font-medium">Edit</button>
            <button className="flex items-center px-4 py-2 bg-nz-blue text-white rounded-lg hover:bg-blue-700 shadow-sm text-sm font-medium">
               <Icons.Check className="w-4 h-4 mr-2" /> Approve & Assign
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         
         <div className="lg:col-span-2 space-y-6">
            <Card title="Job Details">
               <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                     <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Pickup Location</label>
                     <p className="text-slate-900 font-medium">Fonterra Te Rapa</p>
                     <p className="text-slate-500 text-sm">SH1, Hamilton, NZ</p>
                     <p className="text-nz-blue text-sm mt-1">Due: 24 Oct, 08:00 AM</p>
                  </div>
                  <div>
                     <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Dropoff Location</label>
                     <p className="text-slate-900 font-medium">Auckland Port (Tinley)</p>
                     <p className="text-slate-500 text-sm">Quay St, Auckland, NZ</p>
                     <p className="text-nz-blue text-sm mt-1">Due: 24 Oct, 02:00 PM</p>
                  </div>
               </div>
               
               <div className="border-t border-slate-100 pt-6">
                  <h4 className="font-bold text-slate-800 mb-4">Freight Items</h4>
                  <table className="min-w-full text-sm">
                     <thead className="bg-slate-50 text-slate-500">
                        <tr>
                           <th className="px-4 py-2 text-left">Description</th>
                           <th className="px-4 py-2 text-left">Qty</th>
                           <th className="px-4 py-2 text-left">Weight</th>
                           <th className="px-4 py-2 text-left">Notes</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-100">
                        <tr>
                           <td className="px-4 py-3 font-medium">Milk Powder Pallets</td>
                           <td className="px-4 py-3">24</td>
                           <td className="px-4 py-3">12,000 kg</td>
                           <td className="px-4 py-3 text-slate-500">Keep dry</td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </Card>

            <Card title="Activity Log">
               <div className="space-y-4">
                  <div className="flex gap-4">
                     <div className="flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full bg-slate-300 mt-2"></div>
                        <div className="w-0.5 h-full bg-slate-200 my-1"></div>
                     </div>
                     <div>
                        <p className="text-sm font-bold text-slate-900">Booking Created</p>
                        <p className="text-xs text-slate-500">By System API • 10:23 AM</p>
                     </div>
                  </div>
                  <div className="flex gap-4">
                     <div className="flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full bg-nz-blue mt-2"></div>
                     </div>
                     <div>
                        <p className="text-sm font-bold text-slate-900">Pending Approval</p>
                        <p className="text-xs text-slate-500">Awaiting Dispatcher review • 10:24 AM</p>
                     </div>
                  </div>
               </div>
            </Card>
         </div>

         <div className="space-y-6">
            <Card title="Client Info">
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-600">F</div>
                  <div>
                     <p className="font-bold text-slate-900">Fonterra Co-op</p>
                     <p className="text-xs text-slate-500">Contract #CT-8839</p>
                  </div>
               </div>
               <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                     <span className="text-slate-500">Phone</span>
                     <span className="text-slate-900">0800 123 456</span>
                  </div>
                  <div className="flex justify-between">
                     <span className="text-slate-500">Email</span>
                     <span className="text-slate-900 truncate max-w-[150px]">logistics@fonterra.com</span>
                  </div>
               </div>
            </Card>

            <Card title="Requirements">
               <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                     <Icons.Truck className="w-4 h-4 text-slate-400" />
                     <span>Class 5 Heavy Truck</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                     <Icons.Shield className="w-4 h-4 text-slate-400" />
                     <span>Dangerous Goods: No</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                     <Icons.User className="w-4 h-4 text-slate-400" />
                     <span>Tail Lift Required</span>
                  </div>
               </div>
            </Card>
         </div>
      </div>
    </div>
  );
};