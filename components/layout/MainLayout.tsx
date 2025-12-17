import React from 'react';
import { Sidebar } from '../Sidebar';
import { Icons } from '../Icons';
import { useStore } from '../../context/StoreContext';

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { 
    currentView, 
    setView, 
    sidebarOpen, 
    toggleSidebar, 
    logout,
    user 
  } = useStore();

  return (
    <div className="flex h-screen bg-industrial-surface font-sans overflow-hidden">
      {/* Sidebar - Precision Nav */}
      <Sidebar 
        currentView={currentView} 
        setView={setView} 
        isOpen={sidebarOpen} 
        setIsOpen={(val) => toggleSidebar(val)}
        onLogout={logout}
      />

      <div className="flex-1 flex flex-col min-w-0">
        {/* SYSTEM STATUS BAR - Industrial Motif */}
        <header className="relative bg-white border-b border-industrial-border h-16 shrink-0 z-20 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          {/* Animated Gradient Sweep Border */}
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-signal-green to-transparent opacity-50 bg-[length:200%_100%] animate-sweep"></div>

          <div className="flex items-center justify-between h-full px-6">
            <div className="flex items-center">
              <button 
                onClick={() => toggleSidebar(true)}
                className="lg:hidden p-2 -ml-2 mr-4 text-industrial-slate hover:text-industrial-graphite transition-colors"
              >
                <Icons.Menu className="w-5 h-5" />
              </button>
              
              {/* Breadcrumb / Status */}
              <div className="flex items-baseline gap-3">
                <h1 className="text-lg font-bold text-industrial-graphite uppercase tracking-tight">
                  {currentView.replace('-', ' ')}
                </h1>
                <div className="hidden md:flex items-center gap-2">
                  <span className="text-industrial-border">/</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-signal-green animate-pulse-mechanical"></span>
                  <span className="text-[10px] font-mono text-signal-green uppercase tracking-widest tabular-nums">
                    Sys_Active 98ms
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              {/* Search */}
              <div className="hidden md:flex relative group">
                <input 
                  type="text" 
                  placeholder="SEARCH_MANIFEST..." 
                  className="w-64 pl-9 pr-3 py-1.5 bg-industrial-surface border border-industrial-border focus:border-signal-amber focus:ring-0 rounded-sm text-xs font-mono transition-colors outline-none text-industrial-graphite placeholder-industrial-slate/50"
                />
                <Icons.Search className="absolute left-3 top-2 w-3.5 h-3.5 text-industrial-slate group-focus-within:text-signal-amber transition-colors" />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4">
                <button className="relative p-2 text-industrial-slate hover:text-industrial-graphite transition-colors">
                  <Icons.Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-signal-amber rounded-full ring-2 ring-white"></span>
                </button>
                
                <div 
                  className="flex items-center gap-3 pl-6 border-l border-industrial-border cursor-pointer group"
                  onClick={() => setView('profile')}
                >
                  <div className="text-right hidden sm:block">
                    <p className="text-xs font-bold text-industrial-graphite leading-none group-hover:text-signal-blue transition-colors">
                      {user?.name || 'Operator'}
                    </p>
                    <p className="text-[10px] text-industrial-slate font-mono uppercase mt-1">
                      {user?.role || 'Viewer'}
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-sm bg-industrial-graphite text-white flex items-center justify-center font-mono text-xs font-bold shadow-sm ring-1 ring-industrial-graphite/10">
                    {user?.name ? user.name.substring(0,2).toUpperCase() : 'OP'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area - Grid Background Visible Through Translucency */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-transparent p-6 lg:p-8 scroll-smooth relative">
          <div className="max-w-7xl mx-auto animate-fade-in-up">
             {children}
          </div>
        </main>
      </div>
    </div>
  );
};