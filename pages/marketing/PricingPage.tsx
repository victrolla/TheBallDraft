import React from 'react';
import { MarketingLayout } from '../../components/layout/MarketingLayout';
import { Icons } from '../../components/Icons';

export const PricingPage: React.FC = () => {
  const plans = [
    {
      name: 'Starter Fleet',
      price: '$19',
      unit: '/vehicle/mo',
      desc: 'Essential tracking for small businesses.',
      features: ['Real-time GPS Tracking', '3 Months History', 'Basic Reports', 'Email Support'],
      cta: 'Start Free Trial',
      highlight: false
    },
    {
      name: 'Pro Logistics',
      price: '$39',
      unit: '/vehicle/mo',
      desc: 'Advanced compliance & optimization for growing fleets.',
      features: ['Everything in Starter', 'RUC & Fuel Compliance', 'Route Optimization AI', 'Driver Behavior Scorecard', 'API Access'],
      cta: 'Get Pro',
      highlight: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      unit: '',
      desc: 'Full-scale operating system for national carriers.',
      features: ['Unlimited History', 'Custom Integrations', 'Dedicated Account Manager', 'SLA & Uptime Guarantee', 'On-premise Options'],
      cta: 'Contact Sales',
      highlight: false
    }
  ];

  return (
    <MarketingLayout>
      <div className="bg-slate-50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-nz-blue font-bold tracking-wider uppercase text-sm mb-3">Transparent Pricing</h2>
            <h1 className="text-4xl font-extrabold text-slate-900 mb-6">Choose the Plan That Fits Your Fleet</h1>
            <p className="text-lg text-slate-600">No hidden fees. Change plans anytime. All prices in NZD.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, idx) => (
              <div key={idx} className={`relative bg-white rounded-2xl shadow-xl border ${plan.highlight ? 'border-nz-blue ring-4 ring-blue-50' : 'border-slate-200'} p-8 flex flex-col`}>
                {plan.highlight && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-nz-blue text-white px-4 py-1 rounded-full text-sm font-bold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <p className="text-slate-500 text-sm mb-6">{plan.desc}</p>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-slate-900">{plan.price}</span>
                  <span className="text-slate-500">{plan.unit}</span>
                </div>
                <button className={`w-full py-3 rounded-xl font-bold transition-all mb-8 ${plan.highlight ? 'bg-nz-blue text-white hover:bg-blue-700 shadow-lg' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                  {plan.cta}
                </button>
                <ul className="space-y-4 flex-1">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                      <Icons.Check className="w-5 h-5 text-green-500 shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
};