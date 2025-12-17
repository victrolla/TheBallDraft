import React from 'react';
import { Icons } from '../../components/Icons';

export const RoutePlannerPage: React.FC = () => {
  return (
    <div className="h-[calc(100vh-140px)] flex flex-col md:flex-row gap-4">
      {/* Sidebar Controls */}
      <div className="w-full md:w-80 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col">
        <div className="p-4 border-b border-slate-200">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Icons.Map className="w-4 h-4 text-nz-blue" />
            Route Planner
          </h3>
        </div>
        
        <div className="p-4 space-y-4 flex-1 overflow-y-auto">
          <div>
            <label className="text-xs font-medium text-slate-500 uppercase mb-1 block">Origin</label>
            <div className="relative">
              <Icons.Pin className="absolute left-3 top-2.5 w-4 h-4 text-green-600" />
              <input type="text" className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-sm" placeholder="Search start location..." />
            </div>
          </div>

          <div className="flex flex-col gap-2 relative">
             <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200 -z-10 border-l border-dashed border-slate-300"></div>
             
             {/* Stops mockup */}
             <div className="flex items-center gap-2 p-2 bg-slate-50 rounded border border-slate-200 ml-4">
               <div className="w-2 h-2 rounded-full bg-slate-400"></div>
               <span className="text-sm text-slate-600">Hamilton Depot</span>
             </div>
             <div className="flex items-center gap-2 p-2 bg-slate-50 rounded border border-slate-200 ml-4">
               <div className="w-2 h-2 rounded-full bg-slate-400"></div>
               <span className="text-sm text-slate-600">Distribution Center A</span>
             </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-500 uppercase mb-1 block">Destination</label>
            <div className="relative">
              <Icons.Pin className="absolute left-3 top-2.5 w-4 h-4 text-red-600" />
              <input type="text" className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-sm" placeholder="Search end location..." />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200">
             <div className="flex justify-between text-sm mb-2">
               <span className="text-slate-500">Distance</span>
               <span className="font-bold text-slate-800">145.2 km</span>
             </div>
             <div className="flex justify-between text-sm mb-2">
               <span className="text-slate-500">Est. Time</span>
               <span className="font-bold text-slate-800">2h 15m</span>
             </div>
             <div className="flex justify-between text-sm">
               <span className="text-slate-500">Est. Cost</span>
               <span className="font-bold text-slate-800">$180.50</span>
             </div>
          </div>
        </div>

        <div className="p-4 border-t border-slate-200 bg-slate-50 rounded-b-xl">
          <button className="w-full bg-nz-blue text-white py-2 rounded-lg font-medium hover:bg-blue-700 shadow-sm mb-2">
            Optimize Route
          </button>
          <button className="w-full bg-white text-slate-700 py-2 rounded-lg font-medium border border-slate-300 hover:bg-slate-50">
            Save Trip
          </button>
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 bg-slate-200 rounded-xl relative overflow-hidden border border-slate-300 shadow-inner">
         <div className="absolute inset-0 flex items-center justify-center text-slate-400">
            <div className="text-center">
              <Icons.Map className="w-16 h-16 mx-auto mb-2 opacity-30" />
              <p>Map View (Mapbox Integration Placeholder)</p>
            </div>
         </div>
      </div>
    </div>
  );
};