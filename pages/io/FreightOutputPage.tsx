import React from 'react';
import { Icons } from '../../components/Icons';

export const FreightOutputPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Outbound & POD</h2>
          <p className="text-slate-500 text-sm">Process dispatch manifests and proof of delivery.</p>
        </div>
        <div className="flex gap-2">
           <button className="flex items-center px-4 py-2 border border-slate-300 bg-white rounded-lg hover:bg-slate-50 shadow-sm text-slate-700">
            <Icons.Search className="w-4 h-4 mr-2" />
            Lookup Waybill
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Scanner Simulation */}
         <div className="bg-slate-900 rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-lg min-h-[400px]">
            <div className="w-64 h-64 border-4 border-dashed border-slate-600 rounded-lg flex items-center justify-center mb-6 relative overflow-hidden group">
               <div className="absolute inset-0 bg-green-500/10 animate-pulse hidden group-hover:block"></div>
               <Icons.IO className="w-16 h-16 text-slate-500" />
               <p className="absolute bottom-4 text-xs text-slate-400">Camera / Scanner Zone</p>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Scan Barcode / QR</h3>
            <p className="text-slate-400 text-sm max-w-xs">Align the freight label within the frame to automatically log outbound items.</p>
            <button className="mt-6 px-6 py-3 bg-nz-blue hover:bg-blue-600 text-white rounded-lg font-bold flex items-center">
              <Icons.Sensor className="w-5 h-5 mr-2" />
              Activate Scanner
            </button>
         </div>

         {/* Manual Entry Form */}
         <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Manual Dispatch Entry</h3>
            <form className="space-y-4">
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">Waybill Number</label>
                 <input type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2" placeholder="e.g. WB-29384" />
               </div>
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">Assigned Vehicle</label>
                 <select className="w-full border border-slate-300 rounded-lg px-3 py-2">
                   <option>Select Vehicle...</option>
                   <option>V001 - Volvo FH16</option>
                   <option>V002 - Isuzu N-Series</option>
                 </select>
               </div>
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">Condition Check</label>
                 <div className="flex gap-4">
                    <label className="flex items-center"><input type="radio" name="cond" className="mr-2" /> Good</label>
                    <label className="flex items-center"><input type="radio" name="cond" className="mr-2" /> Damaged</label>
                    <label className="flex items-center"><input type="radio" name="cond" className="mr-2" /> Packaging Issue</label>
                 </div>
               </div>
               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Digital Signature (POD)</label>
                  <div className="h-32 bg-slate-50 border border-slate-300 rounded-lg flex items-center justify-center text-slate-400 text-sm">
                     Sign Here
                  </div>
               </div>
               <button type="button" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg mt-4">
                 Confirm Dispatch
               </button>
            </form>
         </div>
      </div>
    </div>
  );
};