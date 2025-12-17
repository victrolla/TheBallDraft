import React from 'react';
import { Icons } from './Icons';
import { MOCK_ALERTS, MOCK_FREIGHT, MOCK_VEHICLES, MOCK_TRIPS } from '../constants';
import { LiveMap } from './LiveMap';
import { Badge } from './ui/Badge';

export const Dashboard: React.FC = () => {
  const activeAlerts = MOCK_ALERTS.filter(a => !a.resolved);
  const activeVehicles = MOCK_VEHICLES.filter(v => v.status === 'In Transit').length;
  const maintenanceVehicles = MOCK_VEHICLES.filter(v => v.status === 'Maintenance').length;
  
  // Mock Weather Data
  const weather = {
    location: 'Waikato Region',
    temp: 14,
    condition: 'Heavy Rain',
    wind: 24
  };

  return (
    <div className="h-full flex flex-col gap-4 animate-fade-in text-industrial-graphite">
      {/* 1. COMMAND HEADER & TICKER */}
      <div className="flex flex-col gap-0 border-b-2 border-industrial-graphite pb-1">
        <div className="flex justify-between items-end mb-2">
          <div>
            <h2 className="text-4xl font-black text-industrial-graphite tracking-tighter leading-none">COMMAND_CENTRE</h2>
            <div className="flex items-center gap-3 mt-1">
               <span className="text-xs font-mono font-bold bg-industrial-graphite text-white px-2 py-0.5 rounded-sm">NZ_NORTH</span>
               <span className="text-xs font-mono text-industrial-slate">OPS_LEVEL_1</span>
            </div>
          </div>
          <div className="flex gap-2">
             <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-industrial-border shadow-sm hover:border-industrial-graphite transition-colors text-xs font-bold font-mono">
                <Icons.Layers className="w-3 h-3" />
                VIEW_LAYOUT
             </button>
             <button className="flex items-center gap-2 px-3 py-1.5 bg-industrial-graphite text-white shadow-sm hover:bg-slate-800 transition-colors text-xs font-bold font-mono">
                <Icons.Activity className="w-3 h-3" />
                SYS_DIAGNOSTICS
             </button>
          </div>
        </div>
        {/* Live Ticker */}
        <div className="bg-slate-100 border-y border-slate-200 py-1 overflow-hidden relative">
          <div className="flex animate-sweep whitespace-nowrap gap-12 text-[10px] font-mono font-medium text-slate-600 w-[200%]">
             <span className="flex items-center gap-2"><Icons.Sensor className="w-3 h-3 text-emerald-500" /> FLEET_GPS_SYNC: 100%</span>
             <span className="flex items-center gap-2"><Icons.CloudRain className="w-3 h-3 text-blue-500" /> WEATHER_ALERT: HEAVY RAIN WAIKATO</span>
             <span className="flex items-center gap-2"><Icons.Alert className="w-3 h-3 text-amber-500" /> RUC_WARNING: VEHICLE V002 EXPIRING &lt; 500KM</span>
             <span className="flex items-center gap-2"><Icons.Trend className="w-3 h-3 text-slate-500" /> SLA_PERFORMANCE: 98.4% (LAST 24H)</span>
          </div>
        </div>
      </div>

      {/* 2. MAIN GRID LAYOUT (BENTO STYLE) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-0">
        
        {/* LEFT COLUMN: TACTICAL METRICS (Cols 1-3) */}
        <div className="lg:col-span-3 flex flex-col gap-4 overflow-y-auto pr-1">
           {/* KPI: Utilization */}
           <div className="bg-white border border-slate-200 shadow-sm rounded-sm p-4 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                 <Icons.Activity className="w-16 h-16" />
              </div>
              <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1">Fleet Utilization</p>
              <div className="flex items-baseline gap-2">
                 <span className="text-4xl font-black text-slate-900">{Math.round((activeVehicles / MOCK_VEHICLES.length) * 100)}%</span>
                 <span className="text-xs font-bold text-emerald-600">▲ 4%</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 mt-3 rounded-full overflow-hidden">
                 <div className="bg-slate-900 h-full" style={{ width: `${(activeVehicles / MOCK_VEHICLES.length) * 100}%` }}></div>
              </div>
              <p className="text-[10px] text-slate-500 mt-2 font-mono">{activeVehicles} ACTIVE / {maintenanceVehicles} MAINT / {MOCK_VEHICLES.length - activeVehicles - maintenanceVehicles} IDLE</p>
           </div>

           {/* KPI: Compliance */}
           <div className="bg-white border border-slate-200 shadow-sm rounded-sm p-4 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                 <Icons.Security className="w-16 h-16" />
              </div>
              <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1">Compliance Score</p>
              <div className="flex items-baseline gap-2">
                 <span className="text-4xl font-black text-slate-900">94.2</span>
                 <span className="text-xs font-bold text-amber-600">▼ 1.2</span>
              </div>
              <div className="mt-3 flex gap-1">
                 <Badge variant="warning" className="text-[9px]">2 RUC</Badge>
                 <Badge variant="error" className="text-[9px]">1 FATIGUE</Badge>
              </div>
           </div>

           {/* Weather Widget */}
           <div className="bg-slate-800 text-white border border-slate-900 shadow-sm rounded-sm p-4">
              <div className="flex justify-between items-start mb-2">
                 <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Local Conditions</span>
                 <Icons.MapPin className="w-3 h-3 text-slate-400" />
              </div>
              <div className="flex items-center gap-4">
                 <Icons.CloudRain className="w-10 h-10 text-blue-400" />
                 <div>
                    <div className="text-2xl font-bold">{weather.temp}°C</div>
                    <div className="text-xs text-slate-300 font-mono">{weather.condition.toUpperCase()}</div>
                 </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-700">
                 <div>
                    <div className="text-[9px] text-slate-500 uppercase font-mono">WIND</div>
                    <div className="text-sm font-bold">{weather.wind} km/h</div>
                 </div>
                 <div>
                    <div className="text-[9px] text-slate-500 uppercase font-mono">VISIBILITY</div>
                    <div className="text-sm font-bold">POOR</div>
                 </div>
              </div>
           </div>

           {/* Fuel Radar (Simplified Visual) */}
           <div className="bg-white border border-slate-200 shadow-sm rounded-sm p-4 flex-1">
              <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-3">Fuel Levels (Lowest)</p>
              <div className="space-y-3">
                 {MOCK_VEHICLES.sort((a,b) => a.fuelLevel - b.fuelLevel).slice(0,3).map(v => (
                    <div key={v.id} className="flex items-center justify-between">
                       <span className="text-xs font-bold text-slate-700">{v.registration}</span>
                       <div className="flex items-center gap-2 w-1/2">
                          <div className="flex-1 h-2 bg-slate-100 rounded-sm overflow-hidden">
                             <div 
                                className={`h-full ${v.fuelLevel < 20 ? 'bg-red-500' : 'bg-amber-500'}`} 
                                style={{ width: `${v.fuelLevel}%` }}
                             ></div>
                          </div>
                          <span className="text-[10px] font-mono w-8 text-right">{v.fuelLevel}%</span>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* CENTER COLUMN: LIVE MAP (Cols 4-9) */}
        <div className="lg:col-span-6 flex flex-col bg-slate-100 rounded-sm border border-slate-300 shadow-inner relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 z-10 bg-slate-900/90 backdrop-blur text-white px-3 py-1 flex justify-between items-center border-b border-slate-700">
               <span className="text-[10px] font-mono font-bold tracking-widest">LIVE_OPERATIONS_MAP</span>
               <div className="flex gap-2">
                  <span className="flex items-center gap-1 text-[9px] font-mono text-slate-400"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> ACTIVE</span>
                  <span className="flex items-center gap-1 text-[9px] font-mono text-slate-400"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> MAINT</span>
                  <span className="flex items-center gap-1 text-[9px] font-mono text-slate-400"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> IDLE</span>
               </div>
            </div>
            <LiveMap className="flex-1 w-full h-full" />
        </div>

        {/* RIGHT COLUMN: ALERTS & ACTIVE TASKS (Cols 10-12) */}
        <div className="lg:col-span-3 flex flex-col gap-4 overflow-y-auto pl-1">
           
           {/* Alert Summary Panel */}
           <div className="bg-white border border-slate-200 shadow-sm rounded-sm overflow-hidden flex flex-col max-h-[40%]">
              <div className="bg-slate-900 text-white px-3 py-2 flex justify-between items-center shrink-0">
                 <span className="text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2">
                    <Icons.AlertOctagon className="w-3 h-3 text-red-500" />
                    Priority Alerts
                 </span>
                 <Badge variant="error" className="bg-red-600 text-white border-none">{activeAlerts.length}</Badge>
              </div>
              <div className="overflow-y-auto p-0 scrollbar-thin">
                 {activeAlerts.map(alert => (
                    <div key={alert.id} className="p-3 border-b border-slate-100 hover:bg-slate-50 transition-colors group cursor-pointer border-l-4 border-l-transparent hover:border-l-red-500">
                       <div className="flex justify-between items-start mb-1">
                          <span className={`text-[10px] font-bold px-1.5 rounded-sm ${
                             alert.type === 'CRITICAL' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                          }`}>{alert.type}</span>
                          <span className="text-[10px] font-mono text-slate-400">{alert.timestamp}</span>
                       </div>
                       <p className="text-xs font-bold text-slate-800 leading-tight mb-1">{alert.message}</p>
                       <p className="text-[10px] text-slate-500 font-mono">ID: {alert.entityId}</p>
                    </div>
                 ))}
                 {activeAlerts.length === 0 && <div className="p-4 text-center text-xs text-slate-400">All Systems Normal</div>}
              </div>
           </div>

           {/* Active Trips Ticker */}
           <div className="bg-white border border-slate-200 shadow-sm rounded-sm flex-1 flex flex-col">
              <div className="bg-slate-100 px-3 py-2 border-b border-slate-200 flex justify-between items-center shrink-0">
                 <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                    <Icons.Nav className="w-3 h-3" />
                    Active Missions
                 </span>
              </div>
              <div className="overflow-y-auto p-2 space-y-2 flex-1 scrollbar-thin">
                 {MOCK_TRIPS.filter(t => t.status === 'Active' || t.status === 'Scheduled').map(trip => (
                    <div key={trip.id} className="bg-slate-50 border border-slate-200 p-2 rounded-sm hover:border-nz-blue transition-colors cursor-pointer relative overflow-hidden">
                       <div className="flex justify-between items-center mb-1 relative z-10">
                          <span className="text-xs font-bold text-nz-blue">{trip.id}</span>
                          <span className="text-[9px] font-mono bg-white border border-slate-200 px-1 rounded text-slate-500">{trip.status}</span>
                       </div>
                       <div className="flex items-center gap-2 text-xs text-slate-700 mb-1 relative z-10">
                          <span className="truncate max-w-[40%]">{trip.origin}</span>
                          <Icons.ArrowRight className="w-3 h-3 text-slate-300" />
                          <span className="truncate max-w-[40%]">{trip.destination}</span>
                       </div>
                       <div className="w-full bg-slate-200 h-1 rounded-full mt-1 overflow-hidden">
                          <div className="bg-emerald-500 h-full w-[60%]"></div>
                       </div>
                    </div>
                 ))}
                 <button className="w-full py-2 border border-dashed border-slate-300 rounded-sm text-xs font-bold text-slate-400 hover:text-nz-blue hover:border-nz-blue transition-colors">
                    + Dispatch New Trip
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};