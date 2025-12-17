import React from 'react';
import { Icons } from './Icons';

interface SidebarProps {
  currentView: string;
  setView: (view: string) => void;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, isOpen, setIsOpen, onLogout }) => {
  const menuGroups = [
    {
      title: "COMMAND",
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: Icons.Dashboard },
        { id: 'live-map', label: 'Live Map', icon: Icons.Map },
        { id: 'alert-center', label: 'Alerts', icon: Icons.Alert },
        { id: 'customer-portal', label: 'Client Portal', icon: Icons.Globe }, // Added
      ]
    },
    {
      title: "INTELLIGENCE", // New Section
      items: [
        { id: 'ai-integration', label: 'AI & Voice', icon: Icons.Zap },
        { id: 'reports', label: 'Analytics', icon: Icons.Chart },
      ]
    },
    {
      title: "SCHEDULING",
      items: [
        { id: 'calendar', label: 'Calendar', icon: Icons.Calendar },
        { id: 'bookings', label: 'Bookings', icon: Icons.FileText },
        { id: 'trips', label: 'Route Planner', icon: Icons.Nav },
      ]
    },
    {
      title: "FIELD OPS",
      items: [
        { id: 'stops', label: 'Stop Management', icon: Icons.Pin },
        { id: 'returns', label: 'Return Logistics', icon: Icons.Target },
        { id: 'depot', label: 'Depot Control', icon: Icons.Layers },
      ]
    },
    {
      title: "ASSETS",
      items: [
        { id: 'vehicles', label: 'Vehicles', icon: Icons.Truck },
        { id: 'drivers', label: 'Personnel', icon: Icons.Drivers },
        { id: 'maintenance', label: 'Service', icon: Icons.Maintenance },
        { id: 'fuel', label: 'Expenses', icon: Icons.Fuel },
      ]
    },
    {
      title: "SYSTEM",
      items: [
        { id: 'alert-history', label: 'Alert History', icon: Icons.Clock },
        { id: 'audit-logs', label: 'Audits', icon: Icons.Shield },
        { id: 'system-health', label: 'Health', icon: Icons.Activity },
        { id: 'settings', label: 'Config', icon: Icons.Settings },
      ]
    }
  ];

  return (
    <>
      <div 
        className={`fixed inset-0 bg-industrial-graphite/40 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />

      <div className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white text-industrial-graphite transform transition-transform duration-300 lg:transform-none ${isOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col border-r border-industrial-border shadow-xl lg:shadow-none`}>
        {/* Header - Brand Block */}
        <div className="flex items-center h-16 px-6 border-b border-industrial-border shrink-0 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-industrial-graphite flex items-center justify-center rounded-sm shadow-sm">
              <Icons.Truck className="text-white w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight font-mono text-industrial-graphite leading-none">THE_BALL</span>
              <span className="text-[9px] text-industrial-slate uppercase tracking-widest mt-0.5">FleetCmd</span>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="lg:hidden ml-auto text-industrial-slate hover:text-industrial-graphite">
            <Icons.Close className="w-5 h-5" />
          </button>
        </div>

        {/* Menu */}
        <div className="flex-1 overflow-y-auto py-6 px-3 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-industrial-border">
          <nav className="space-y-8">
            {menuGroups.map((group, idx) => (
              <div key={idx}>
                <div className="flex items-center gap-2 px-3 mb-3">
                  <span className="w-1 h-1 bg-industrial-border rounded-full"></span>
                  <div className="text-[10px] font-mono text-industrial-slate/70 uppercase tracking-[0.2em] font-bold">
                    {group.title}
                  </div>
                </div>
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const isActive = currentView === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setView(item.id);
                          setIsOpen(false);
                        }}
                        className={`w-full flex items-center relative px-3 py-2.5 text-sm font-medium transition-all duration-200 group overflow-hidden ${
                          isActive 
                            ? 'text-industrial-graphite' 
                            : 'text-industrial-slate hover:text-industrial-graphite'
                        }`}
                      >
                        {/* Active Indicator: Thin glowing line */}
                        {isActive && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-signal-amber shadow-[0_0_8px_rgba(245,158,11,0.6)] rounded-r-full"></div>
                        )}
                        
                        {/* Hover Underline: Center Out */}
                        <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] bg-industrial-border transition-all duration-300 ease-out ${isActive ? 'w-0' : 'w-0 group-hover:w-full opacity-50'}`}></div>

                        <item.icon className={`w-4 h-4 mr-3 transition-colors ${isActive ? 'text-signal-amber' : 'text-industrial-slate group-hover:text-industrial-graphite'}`} />
                        <span className={isActive ? 'font-bold' : ''}>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Footer - Logout Block */}
        <div className="p-4 border-t border-industrial-border bg-industrial-surface/50 shrink-0">
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center px-4 py-2 text-xs font-mono uppercase tracking-wider text-industrial-slate hover:text-signal-red hover:bg-white rounded-sm border border-transparent hover:border-industrial-border transition-all duration-200 group"
          >
            <Icons.Logout className="w-3.5 h-3.5 mr-2 group-hover:translate-x-0.5 transition-transform" />
            End Session
          </button>
        </div>
      </div>
    </>
  );
};