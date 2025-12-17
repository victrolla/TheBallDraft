import React, { useState } from 'react';
import { Icons } from '../../components/Icons';
import { IndustryType, SubscriptionTier } from '../../types';
import { useStore } from '../../context/StoreContext';
import { Badge } from '../../components/ui/Badge';

interface OnboardingWizardProps {
  onComplete: () => void;
}

const INDUSTRIES: { id: IndustryType; label: string; desc: string; icon: any }[] = [
  { id: 'Waste', label: 'Waste Management', desc: 'Route optimization, bin tracking, hazardous compliance.', icon: Icons.Alert },
  { id: 'FMCG', label: 'FMCG / Retail', desc: 'Time-sensitive delivery, multi-stop routing, SLA dashboards.', icon: Icons.Package },
  { id: 'Construction', label: 'Construction / Heavy', desc: 'Asset tracking, load optimization, oversize handling.', icon: Icons.Wrench },
  { id: 'Courier', label: 'Courier / E-commerce', desc: 'Last-mile routing, POD capture, customer notifications.', icon: Icons.Map },
  { id: 'Pharma', label: 'Pharma / Cold Chain', desc: 'Temp monitoring, regulatory compliance, multi-modal.', icon: Icons.Temp },
];

const TIERS: { id: SubscriptionTier; name: string; price: string; range: string; desc: string; features: string[] }[] = [
  { 
    id: 'Starter', name: 'Starter', price: '$99', range: '1-10 Vehicles', 
    desc: 'Basic visibility for small operations.',
    features: ['Basic GPS Tracking', 'Alerts', 'Standard Dashboards']
  },
  { 
    id: 'Growth', name: 'Growth', price: '$249', range: '11-50 Vehicles', 
    desc: 'Efficiency tools for growing fleets.',
    features: ['Real-time GPS', 'Route Planning', 'Full Dashboards', 'Notifications']
  },
  { 
    id: 'Professional', name: 'Professional', price: '$499', range: '51-150 Vehicles', 
    desc: 'Advanced intelligence & compliance.',
    features: ['AI Routing', 'Predictive Maintenance', 'Compliance Engine', 'SLA Monitoring']
  },
  { 
    id: 'Enterprise', name: 'Enterprise', price: '$999+', range: '151+ Vehicles', 
    desc: 'Custom scale & integration.',
    features: ['Custom Integration', 'Multi-Region', 'API Access', 'Dedicated Support']
  }
];

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ onComplete }) => {
  const { login } = useStore();
  const [step, setStep] = useState(1);
  const [industry, setIndustry] = useState<IndustryType | null>(null);
  const [fleetSize, setFleetSize] = useState<number>(1);
  const [tier, setTier] = useState<SubscriptionTier | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const getRecommendedTier = (size: number): SubscriptionTier => {
    if (size <= 10) return 'Starter';
    if (size <= 50) return 'Growth';
    if (size <= 150) return 'Professional';
    return 'Enterprise';
  };

  const handleFinish = () => {
    setIsProcessing(true);
    setTimeout(() => {
      // Create user context with selected plan
      login({
        id: 'u-new',
        name: 'Admin User',
        email: 'admin@company.com',
        role: 'admin',
        industry: industry || 'General',
        subscriptionTier: tier || 'Starter',
        fleetSize
      });
      // Login will redirect to dashboard automatically via StoreContext logic
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header */}
      <div className="bg-black text-white py-4 px-6 flex justify-between items-center shadow-md">
         <div className="flex items-center gap-2">
            <Icons.Truck className="w-6 h-6 text-safety-orange" />
            <span className="font-bold text-lg tracking-tight">The Ball <span className="text-gray-500 font-normal text-sm font-mono uppercase">| Onboarding</span></span>
         </div>
         <div className="flex gap-2">
            {[1, 2, 3].map(i => (
               <div key={i} className={`w-2 h-2 rounded-full ${step >= i ? 'bg-safety-orange' : 'bg-gray-700'}`}></div>
            ))}
         </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-4xl w-full bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden flex flex-col md:flex-row min-h-[500px]">
           
           {/* Sidebar Info */}
           <div className="bg-slate-900 text-white p-8 md:w-1/3 flex flex-col justify-between">
              <div>
                 <h2 className="text-2xl font-black uppercase mb-4 text-safety-orange tracking-tight">
                    {step === 1 ? 'Fleet Profile' : step === 2 ? 'Select Plan' : 'Activation'}
                 </h2>
                 <p className="text-gray-400 text-sm leading-relaxed">
                    {step === 1 && "Tell us about your operations so we can configure 'The Ball' for your specific industry needs."}
                    {step === 2 && "Choose a subscription tier that matches your fleet size and operational complexity."}
                    {step === 3 && "Confirm your details to activate your secure environment."}
                 </p>
              </div>
              
              <div className="mt-8">
                 <div className="flex items-center gap-3 mb-4 text-sm font-mono text-gray-500">
                    <Icons.Check className={`w-4 h-4 ${step > 1 ? 'text-green-500' : 'text-gray-700'}`} />
                    <span className={step >= 1 ? 'text-white' : ''}>Fleet Details</span>
                 </div>
                 <div className="flex items-center gap-3 mb-4 text-sm font-mono text-gray-500">
                    <Icons.Check className={`w-4 h-4 ${step > 2 ? 'text-green-500' : 'text-gray-700'}`} />
                    <span className={step >= 2 ? 'text-white' : ''}>Subscription</span>
                 </div>
                 <div className="flex items-center gap-3 text-sm font-mono text-gray-500">
                    <Icons.Check className={`w-4 h-4 ${step > 3 ? 'text-green-500' : 'text-gray-700'}`} />
                    <span className={step >= 3 ? 'text-white' : ''}>Payment & Setup</span>
                 </div>
              </div>
           </div>

           {/* Content Area */}
           <div className="p-8 md:w-2/3 overflow-y-auto">
              
              {/* STEP 1: INDUSTRY & SIZE */}
              {step === 1 && (
                 <div className="space-y-6 animate-fade-in">
                    <div>
                       <label className="block text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide">Select Industry Modality</label>
                       <div className="grid grid-cols-1 gap-3">
                          {INDUSTRIES.map(ind => (
                             <div 
                                key={ind.id}
                                onClick={() => setIndustry(ind.id)}
                                className={`p-4 rounded-lg border-2 cursor-pointer transition-all flex items-center gap-4 ${
                                   industry === ind.id 
                                      ? 'border-nz-blue bg-blue-50' 
                                      : 'border-slate-100 hover:border-slate-300'
                                }`}
                             >
                                <div className={`p-2 rounded-full ${industry === ind.id ? 'bg-nz-blue text-white' : 'bg-slate-100 text-slate-500'}`}>
                                   <ind.icon className="w-5 h-5" />
                                </div>
                                <div>
                                   <div className="font-bold text-slate-900">{ind.label}</div>
                                   <div className="text-xs text-slate-500">{ind.desc}</div>
                                </div>
                             </div>
                          ))}
                       </div>
                    </div>

                    <div>
                       <label className="block text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide">Fleet Size</label>
                       <input 
                          type="number" 
                          min="1"
                          value={fleetSize}
                          onChange={(e) => setFleetSize(parseInt(e.target.value))}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-nz-blue outline-none font-mono text-lg"
                       />
                       <p className="text-xs text-slate-500 mt-2">Used to recommend the optimal subscription tier.</p>
                    </div>

                    <div className="flex justify-end pt-4">
                       <button 
                          disabled={!industry}
                          onClick={() => {
                             const rec = getRecommendedTier(fleetSize);
                             setTier(rec);
                             setStep(2);
                          }}
                          className="px-8 py-3 bg-black text-white font-bold uppercase tracking-widest rounded hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
                       >
                          Next Step
                       </button>
                    </div>
                 </div>
              )}

              {/* STEP 2: SUBSCRIPTION */}
              {step === 2 && (
                 <div className="space-y-6 animate-fade-in">
                    <div className="flex items-center justify-between bg-emerald-50 border border-emerald-100 p-4 rounded-lg mb-6">
                       <div className="flex items-center gap-3">
                          <Icons.Star className="w-5 h-5 text-emerald-600" />
                          <div>
                             <p className="text-sm font-bold text-emerald-800">Recommended for you</p>
                             <p className="text-xs text-emerald-600">Based on {fleetSize} vehicles in {industry}</p>
                          </div>
                       </div>
                       <Badge variant="success">{getRecommendedTier(fleetSize)}</Badge>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                       {TIERS.map(t => (
                          <div 
                             key={t.id}
                             onClick={() => setTier(t.id)}
                             className={`p-4 rounded-lg border-2 cursor-pointer transition-all relative ${
                                tier === t.id ? 'border-nz-blue bg-blue-50 ring-1 ring-nz-blue' : 'border-slate-200 hover:border-slate-300'
                             }`}
                          >
                             <div className="flex justify-between items-center mb-2">
                                <h3 className="font-bold text-slate-900">{t.name}</h3>
                                <span className="font-mono font-bold text-lg">{t.price}<span className="text-xs font-normal text-slate-500">/mo</span></span>
                             </div>
                             <p className="text-xs text-slate-500 mb-3">{t.range} • {t.desc}</p>
                             <div className="flex flex-wrap gap-2">
                                {t.features.slice(0, 3).map((f, i) => (
                                   <span key={i} className="text-[10px] bg-white border border-slate-200 px-2 py-1 rounded text-slate-600">{f}</span>
                                ))}
                             </div>
                          </div>
                       ))}
                    </div>

                    <div className="flex justify-between pt-4">
                       <button onClick={() => setStep(1)} className="text-slate-500 hover:text-slate-800 font-bold text-sm">Back</button>
                       <button 
                          onClick={() => setStep(3)}
                          className="px-8 py-3 bg-black text-white font-bold uppercase tracking-widest rounded hover:bg-slate-800"
                       >
                          Proceed to Payment
                       </button>
                    </div>
                 </div>
              )}

              {/* STEP 3: PAYMENT */}
              {step === 3 && (
                 <div className="space-y-6 animate-fade-in">
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                       <h3 className="font-bold text-slate-900 mb-2">Summary</h3>
                       <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-600">Plan</span>
                          <span className="font-bold">{tier} Tier</span>
                       </div>
                       <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-600">Industry Config</span>
                          <span className="font-bold">{industry}</span>
                       </div>
                       <div className="flex justify-between text-sm pt-2 border-t border-slate-200 mt-2">
                          <span className="text-slate-900 font-bold">Total Due Now</span>
                          <span className="font-mono font-bold text-lg">{TIERS.find(t => t.id === tier)?.price}</span>
                       </div>
                    </div>

                    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleFinish(); }}>
                       <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Cardholder Name</label>
                          <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded text-sm outline-none focus:border-nz-blue" placeholder="John Doe" required />
                       </div>
                       <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Card Number</label>
                          <div className="relative">
                             <Icons.Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                             <input type="text" className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded text-sm outline-none focus:border-nz-blue font-mono" placeholder="0000 0000 0000 0000" required />
                          </div>
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                          <div>
                             <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Expiry</label>
                             <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded text-sm outline-none focus:border-nz-blue font-mono" placeholder="MM/YY" required />
                          </div>
                          <div>
                             <label className="block text-xs font-bold text-slate-700 uppercase mb-1">CVC</label>
                             <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded text-sm outline-none focus:border-nz-blue font-mono" placeholder="123" required />
                          </div>
                       </div>

                       <div className="pt-4">
                          <button 
                             type="submit"
                             disabled={isProcessing}
                             className="w-full py-4 bg-safety-orange hover:bg-orange-600 text-white font-bold uppercase tracking-widest rounded shadow-lg transition-all flex items-center justify-center gap-2"
                          >
                             {isProcessing ? (
                                <>Processing <Icons.Activity className="w-5 h-5 animate-spin" /></>
                             ) : (
                                <>Activate Subscription <Icons.Check className="w-5 h-5" /></>
                             )}
                          </button>
                          <p className="text-center text-xs text-slate-400 mt-3 flex items-center justify-center gap-1">
                             <Icons.Lock className="w-3 h-3" /> 256-bit SSL Encrypted Payment
                          </p>
                       </div>
                    </form>
                 </div>
              )}

           </div>
        </div>
      </div>
    </div>
  );
};