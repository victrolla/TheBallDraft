import React, { useState } from 'react';
import { Icons } from '../../components/Icons';
import { Card } from '../../components/ui/Card';
import { SignatureCapture } from '../../components/ui/SignatureCapture';
import { Badge } from '../../components/ui/Badge';

export const StopOffPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { id: 1, title: 'Arrival Scan', desc: 'Scan location barcode', icon: Icons.Sensor },
    { id: 2, title: 'Unload Freight', desc: 'Verify item count', icon: Icons.Package },
    { id: 3, title: 'Proof of Delivery', desc: 'Customer signature', icon: Icons.FileText },
    { id: 4, title: 'Departure', desc: 'Confirm completion', icon: Icons.Truck },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in pb-20">
      <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg">
         <div className="flex justify-between items-start mb-4">
            <div>
               <p className="text-slate-400 text-xs font-mono uppercase tracking-wider mb-1">Current Stop</p>
               <h1 className="text-2xl font-bold">Countdown Auckland City</h1>
               <p className="text-slate-300 text-sm flex items-center gap-2 mt-1">
                  <Icons.MapPin className="w-4 h-4" /> 19-25 Victoria St West
               </p>
            </div>
            <Badge variant="info" className="bg-blue-600 text-white border-none">Stop 2 of 5</Badge>
         </div>
         <div className="flex gap-4 border-t border-slate-700 pt-4">
            <button className="flex-1 bg-white text-slate-900 py-2 rounded-lg font-bold text-sm hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
               <Icons.Nav className="w-4 h-4" /> Navigate
            </button>
            <button className="flex-1 bg-slate-800 text-white py-2 rounded-lg font-bold text-sm hover:bg-slate-700 transition-colors flex items-center justify-center gap-2">
               <Icons.User className="w-4 h-4" /> Call Site
            </button>
         </div>
      </div>

      <div className="space-y-4">
         {steps.map((step, idx) => (
            <div 
               key={step.id} 
               className={`border rounded-xl overflow-hidden transition-all ${
                  idx === activeStep 
                     ? 'bg-white border-nz-blue shadow-md ring-1 ring-nz-blue' 
                     : idx < activeStep 
                        ? 'bg-slate-50 border-slate-200 opacity-60' 
                        : 'bg-white border-slate-200'
               }`}
            >
               <div className="p-4 flex items-center gap-4 cursor-pointer" onClick={() => setActiveStep(idx)}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                     idx === activeStep ? 'bg-nz-blue text-white' : 
                     idx < activeStep ? 'bg-emerald-100 text-emerald-600' : 
                     'bg-slate-100 text-slate-400'
                  }`}>
                     {idx < activeStep ? <Icons.Check className="w-6 h-6" /> : <step.icon className="w-5 h-5" />}
                  </div>
                  <div className="flex-1">
                     <h3 className={`font-bold ${idx === activeStep ? 'text-nz-blue' : 'text-slate-800'}`}>{step.title}</h3>
                     <p className="text-xs text-slate-500">{step.desc}</p>
                  </div>
                  {idx === activeStep && <Icons.ChevronRight className="w-5 h-5 text-nz-blue rotate-90" />}
               </div>
               
               {/* Active Step Content */}
               {idx === activeStep && (
                  <div className="px-4 pb-4 animate-fade-in border-t border-slate-100 pt-4">
                     {step.id === 1 && (
                        <button className="w-full py-3 bg-slate-100 border-2 border-dashed border-slate-300 rounded-lg text-slate-600 font-bold hover:bg-slate-200 flex flex-col items-center">
                           <Icons.Sensor className="w-6 h-6 mb-1" />
                           Scan Site QR Code
                        </button>
                     )}
                     {step.id === 2 && (
                        <div className="space-y-2">
                           <div className="flex justify-between items-center p-2 bg-slate-50 rounded border border-slate-200">
                              <span className="text-sm font-medium">Pallet #4492</span>
                              <input type="checkbox" className="w-5 h-5 rounded text-nz-blue" />
                           </div>
                           <div className="flex justify-between items-center p-2 bg-slate-50 rounded border border-slate-200">
                              <span className="text-sm font-medium">Box #9921</span>
                              <input type="checkbox" className="w-5 h-5 rounded text-nz-blue" />
                           </div>
                        </div>
                     )}
                     {step.id === 3 && (
                        <div className="space-y-3">
                           <input type="text" placeholder="Receiver Name" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                           <SignatureCapture />
                        </div>
                     )}
                     {step.id === 4 && (
                        <p className="text-sm text-slate-600 mb-2">
                           Verify site is clear and load is secure before departing.
                        </p>
                     )}
                     
                     <button 
                        onClick={() => setActiveStep(prev => Math.min(prev + 1, steps.length - 1))}
                        className="w-full mt-4 py-3 bg-nz-blue text-white font-bold rounded-lg hover:bg-blue-700 shadow-sm"
                     >
                        {idx === steps.length - 1 ? 'Complete Stop' : 'Next Step'}
                     </button>
                  </div>
               )}
            </div>
         ))}
      </div>
    </div>
  );
};