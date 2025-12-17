import React from 'react';
import { Icons } from '../../components/Icons';
import { MarketingLayout } from '../../components/layout/MarketingLayout';
import { useStore } from '../../context/StoreContext';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = () => {
  const { setView } = useStore();

  const capabilities = [
    {
      title: "Real-Time Fleet Intelligence",
      subtitle: "See your entire fleet — as it operates.",
      desc: "Live GPS, telematics, and event data streamed securely. No refresh cycles. No stale data.",
      points: ["Live vehicle location", "Driver status", "Freight visibility", "Continuous ETA"],
      icon: Icons.Map,
    },
    {
      title: "Routing & Optimization",
      subtitle: "Routing that thinks ahead.",
      desc: "The routing engine continuously adapts to real-world conditions like traffic and weather.",
      points: ["AI multi-stop planning", "Live re-routing", "Delivery window enforcement", "Driver constraints"],
      icon: Icons.Nav,
    },
    {
      title: "Predictive Maintenance",
      subtitle: "Fix problems before they happen.",
      desc: "Analyze engine diagnostics and usage patterns to identify risks before they cause downtime.",
      points: ["Vehicle health scoring", "Automated service reminders", "Telematics alerts", "Trend analysis"],
      icon: Icons.Wrench,
    },
    {
      title: "NZ Compliance Engine",
      subtitle: "Built for NZ Transport compliance.",
      desc: "Automated tracking ensuring your fleet remains audit-ready at all times.",
      points: ["RUC tracking", "Logbook enforcement", "License monitoring", "Hazardous freight"],
      icon: Icons.Compliance,
    },
    {
      title: "Operations Control Center",
      subtitle: "Control from one interface.",
      desc: "Dispatch, assign, monitor, and resolve operational issues without switching tools.",
      points: ["Assignment workflows", "Live alerts", "Incident resolution", "Secure comms"],
      icon: Icons.Dashboard,
    },
    {
      title: "Analytics & Reporting",
      subtitle: "Data that drives decisions.",
      desc: "Transform raw fleet data into clear, exportable insights for daily and long-term planning.",
      points: ["Fuel efficiency", "Cost per KM", "Driver behavior", "Fleet utilization"],
      icon: Icons.Chart,
    },
    {
      title: "Customer Experience",
      subtitle: "Transparency for clients.",
      desc: "Give clients visibility via tracking links and SLA updates without exposing complexity.",
      points: ["Live shipment tracking", "Delivery confirmation", "SLA visibility"],
      icon: Icons.Globe,
    },
    {
      title: "Reliability & Offline",
      subtitle: "Built for real-world conditions.",
      desc: "Operations don't stop when connectivity drops. Designed for variable network conditions.",
      points: ["Offline workflows", "Automatic sync", "Network awareness"],
      icon: Icons.Sensor,
    },
    {
      title: "Security & Access",
      subtitle: "Secure by design.",
      desc: "Role-based access control and encrypted storage built into every layer.",
      points: ["RBAC", "Encrypted storage", "Full audit logs", "Secure auth"],
      icon: Icons.Security,
    },
    {
      title: "Scalability",
      subtitle: "Scales with your fleet.",
      desc: "From five vehicles to five thousand — performance remains consistent and reliable.",
      points: ["Consistent performance", "Frictionless growth", "National scale"],
      icon: Icons.Trend,
    }
  ];

  return (
    <MarketingLayout>
      {/* Ticker Tape - LIVE SYSTEM STATUS */}
      <div className="bg-black text-white text-xs font-mono py-3 overflow-hidden border-b-2 border-signal-amber sticky top-0 z-40">
        <div className="flex animate-sweep whitespace-nowrap gap-12 w-[200%]">
          {[...Array(10)].map((_, i) => (
             <span key={i} className="flex items-center gap-4 opacity-100 font-bold tracking-widest">
               <span className="w-2 h-2 bg-signal-amber rounded-sm animate-pulse"></span>
               SYSTEM_STATUS: <span className="text-signal-amber">OPERATIONAL</span> // NZ_REGION // REAL-TIME SYNC: ENABLED
             </span>
          ))}
        </div>
      </div>

      {/* HERO — COMMAND & CONTROL */}
      <section className="relative pt-24 pb-40 lg:pt-40 lg:pb-64 overflow-hidden bg-slate-50 border-b-4 border-black">
        <div className="absolute inset-0 bg-tech-grid bg-grid-lg opacity-10 pointer-events-none"></div>
        {/* Ambient Glow */}
        <div className="absolute top-[-20%] right-[-10%] w-[1000px] h-[1000px] bg-signal-amber/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white border-2 border-black rounded-none text-black text-xs font-mono font-black uppercase tracking-widest mb-10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all">
              <span className="w-3 h-3 rounded-full bg-signal-amber animate-pulse"></span>
              The Ball by NZ FleetCommand
            </div>
            
            <h1 className="text-7xl lg:text-9xl font-black text-black leading-[0.85] tracking-tighter mb-10 uppercase break-words">
              Precision.<br/>
              Logistics.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-signal-amber to-orange-600">Control.</span>
            </h1>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-500 mb-10 font-mono uppercase tracking-tight">
              The operating system for modern fleets.
            </h2>

            <p className="text-xl lg:text-2xl text-slate-600 mb-16 leading-relaxed max-w-3xl font-light border-l-8 border-signal-amber pl-8">
              The Ball brings real-time visibility, regulatory confidence, and operational intelligence into a single, unified platform. 
              Designed for dispatchers, managers, and operators who need absolute clarity.
              <br/><br/>
              <span className="font-black text-black">Track assets live. Enforce compliance automatically. Optimize routes dynamically.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <button 
                onClick={() => setView('signup')} 
                className="group relative w-full sm:w-auto px-10 py-6 bg-signal-amber text-black font-mono font-black uppercase tracking-widest text-lg border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
              >
                <span className="relative z-10 group-hover:text-black transition-colors">Initialize Demo</span>
              </button>
              
              <button className="group w-full sm:w-auto px-10 py-6 bg-white border-2 border-black text-black font-mono font-black uppercase tracking-widest text-lg hover:bg-black hover:text-white transition-all shadow-[6px_6px_0px_0px_rgba(200,200,200,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 flex items-center justify-center gap-3">
                <Icons.Dashboard className="w-5 h-5" />
                System Overview
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM — WHY THE BALL EXISTS */}
      <section className="py-32 bg-black text-white relative border-b border-white/20">
        <div className="absolute inset-0 bg-tech-grid-dark opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-signal-amber font-mono font-bold tracking-widest uppercase text-sm mb-6 flex items-center gap-3">
                <span className="w-8 h-1 bg-signal-amber"></span>
                The Problem
              </h2>
              <h3 className="text-5xl lg:text-7xl font-black mb-8 uppercase tracking-tighter leading-none">Fleet operations<br/>are fragmented.</h3>
              <p className="text-gray-400 text-2xl leading-relaxed mb-10 font-light">
                Most fleet businesses operate across a patchwork of tools — GPS providers, maintenance logs, compliance spreadsheets, and manual reporting.
                <br/><br/>
                The result is <span className="text-white font-bold bg-signal-amber/20 px-2">operational drag</span>. Fragmented tools create blind spots. Blind spots cost time, money, and trust.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6">
               {[
                 "Location data lives in one system",
                 "Compliance tracking lives in another",
                 "Maintenance planning is reactive",
                 "Visibility is delayed",
                 "Decisions made without context"
               ].map((item, i) => (
                 <div key={i} className="group bg-zinc-900 border border-zinc-800 p-8 flex items-center gap-6 hover:bg-signal-amber hover:border-signal-amber transition-all duration-300 hover:-translate-x-2 cursor-default">
                    <div className="p-3 bg-black rounded-none group-hover:bg-white transition-colors">
                      <Icons.Alert className="w-6 h-6 text-signal-amber group-hover:text-black" />
                    </div>
                    <span className="text-xl font-mono text-gray-300 group-hover:text-black font-bold">{item}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTION — SINGLE OPERATING SYSTEM */}
      <section className="py-32 bg-zinc-100 relative border-b border-black/10">
         <div className="container mx-auto px-6 text-center max-w-5xl mx-auto">
            <h2 className="text-black font-mono font-black tracking-widest uppercase text-sm mb-6">The Solution</h2>
            <h3 className="text-6xl lg:text-8xl font-black text-black mb-10 uppercase tracking-tighter leading-none">One system.<br/>Total visibility.</h3>
            <p className="text-2xl text-slate-700 mb-16 leading-relaxed font-light">
               The Ball centralizes vehicle telemetry, driver activity, compliance rules, routing intelligence, and analytics into a single operational interface.
               Instead of reacting to issues after they happen, operators gain continuous situational awareness.
            </p>
            <div className="inline-block px-12 py-8 bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all">
               <p className="text-black font-black font-mono text-2xl uppercase tracking-wider">
                  This is not a dashboard.<br/>It is an operating system.
               </p>
            </div>
         </div>
      </section>

      {/* CORE CAPABILITIES — OVERVIEW */}
      <section id="features" className="py-32 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="mb-24 text-center max-w-4xl mx-auto">
            <h2 className="text-signal-amber font-mono font-bold tracking-widest uppercase text-sm mb-6">Core Capabilities</h2>
            <h3 className="text-5xl lg:text-7xl font-black text-black uppercase tracking-tighter leading-none">Industrial-Grade Performance</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {capabilities.map((cap, idx) => (
              <div key={idx} className="group bg-slate-50 p-10 border-2 border-transparent hover:border-signal-amber transition-all duration-300 relative overflow-hidden hover:scale-105 hover:shadow-2xl hover:z-10">
                <div className="flex items-start gap-8 relative z-10">
                   <div className="p-5 bg-white border-2 border-black text-black group-hover:bg-signal-amber group-hover:border-signal-amber group-hover:text-black transition-colors shrink-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <cap.icon className="w-8 h-8" />
                   </div>
                   <div>
                      <h4 className="text-2xl font-black text-black mb-2 uppercase font-mono transition-colors">{cap.title}</h4>
                      <p className="text-sm font-bold text-signal-amber uppercase tracking-wider mb-6">{cap.subtitle}</p>
                      <p className="text-slate-600 text-lg mb-8 leading-relaxed transition-colors">{cap.desc}</p>
                      <ul className="grid grid-cols-2 gap-y-3 gap-x-6">
                         {cap.points.map((p, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm font-mono text-slate-500">
                               <span className="w-1.5 h-1.5 bg-signal-amber rounded-none"></span>
                               {p}
                            </li>
                         ))}
                      </ul>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING TEASER */}
      <section className="py-32 bg-black text-white border-y border-white/10">
         <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-16">
            <div className="lg:w-2/3">
               <h3 className="text-4xl lg:text-6xl font-black uppercase mb-6 tracking-tighter">Pricing that fits your fleet.</h3>
               <p className="text-gray-400 text-xl max-w-2xl mb-8 leading-relaxed">
                  The Ball uses flexible pricing models aligned with fleet size and operational needs — without lock-in contracts or unnecessary complexity.
               </p>
               <div className="flex flex-wrap gap-6 text-base font-mono text-signal-amber font-bold">
                  <span className="bg-white/10 px-3 py-1">TRANSPARENT PRICING</span>
                  <span className="bg-white/10 px-3 py-1">SCALES AS YOU GROW</span>
                  <span className="bg-white/10 px-3 py-1">NZ-BASED SUPPORT</span>
               </div>
            </div>
            <button onClick={() => setView('pricing')} className="w-full lg:w-auto px-12 py-6 bg-white text-black hover:bg-signal-amber font-mono font-black uppercase tracking-widest text-lg transition-colors border-4 border-transparent hover:border-white">
               View Pricing
            </button>
         </div>
      </section>

      {/* ABOUT — BUILT IN NZ */}
      <section className="py-32 bg-zinc-100">
         <div className="container mx-auto px-6 text-center">
            <div className="w-20 h-20 mx-auto bg-black text-white flex items-center justify-center mb-8 shadow-xl">
               <Icons.Map className="w-10 h-10" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-black uppercase mb-6 tracking-tight">Built in New Zealand.<br/>Trusted by Operators.</h2>
            <p className="text-slate-600 text-xl max-w-3xl mx-auto mb-12">
               The Ball is designed and built with New Zealand fleets in mind — aligned with local compliance requirements and operational realities.
            </p>
            <div className="inline-block px-6 py-3 bg-black text-white font-mono text-sm uppercase tracking-widest font-bold">
               Global-grade engineering. Local understanding.
            </div>
         </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-40 bg-orange-600 relative overflow-hidden">
         <div className="absolute inset-0 bg-tech-grid opacity-20 mix-blend-overlay"></div>
         <div className="container mx-auto px-6 relative z-10 text-center">
            <h2 className="text-8xl lg:text-9xl font-black text-black uppercase tracking-tighter mb-10 leading-[0.8]">
               Get on<br/>The Ball.
            </h2>
            <p className="text-2xl lg:text-3xl text-black font-bold mb-16 max-w-3xl mx-auto">
               Take control of your fleet operations with a system designed for clarity, compliance, and performance.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-8">
               <button onClick={() => setView('signup')} className="px-16 py-6 bg-black text-white font-black font-mono uppercase tracking-widest text-xl hover:bg-white hover:text-black transition-all shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  Initialize Demo
               </button>
               <button onClick={() => setView('contact')} className="px-16 py-6 border-4 border-black text-black font-black font-mono uppercase tracking-widest text-xl hover:bg-black hover:text-white transition-all">
                  Contact Sales
               </button>
            </div>
         </div>
      </section>
    </MarketingLayout>
  );
};