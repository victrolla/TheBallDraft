import React, { useState, useMemo, memo } from 'react';
import { MOCK_VEHICLES } from '../constants';
import { Icons } from './Icons';

// Simple normalized map coordinates
const normalize = (lat: number, lng: number) => {
  const latMin = -47, latMax = -34;
  const lngMin = 166, lngMax = 179;
  const y = ((lat - latMax) / (latMin - latMax)) * 100;
  const x = ((lng - lngMin) / (lngMax - lngMin)) * 100;
  return { x, y };
};

interface Cluster {
  id: string;
  count: number;
  x: number;
  y: number;
  vehicles: string[]; // IDs
}

// Marker Component - Memoized for performance
const MapMarker = memo(({ x, y, isCluster, count, isSelected, onClick, label, status }: any) => (
  <div 
    className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 cursor-pointer z-10`}
    style={{ top: `${y}%`, left: `${x}%` }}
    onClick={onClick}
  >
    {isCluster ? (
      <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-900 text-white font-bold shadow-lg border-2 border-white hover:scale-110 transition-transform text-xs md:text-sm">
        {count}
      </div>
    ) : (
      <>
        {isSelected && <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-25 animate-ping"></span>}
        <div className={`relative flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full border-2 shadow-lg transition-transform ${
          isSelected ? 'bg-nz-blue border-white scale-125' : 
          status === 'Available' ? 'bg-emerald-500 border-white' :
          status === 'Maintenance' ? 'bg-amber-500 border-white' :
          'bg-white border-nz-blue'
        } hover:scale-110`}>
          <Icons.Truck className={`w-3 h-3 md:w-4 md:h-4 ${isSelected || status !== 'In Transit' ? 'text-white' : 'text-nz-blue'}`} />
        </div>
        {!isCluster && <div className={`absolute left-1/2 bottom-full mb-2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded whitespace-nowrap font-mono ${isSelected ? 'block' : 'hidden group-hover/map:block'}`}>{label}</div>}
      </>
    )}
  </div>
));

interface LiveMapProps {
  className?: string;
}

export const LiveMap: React.FC<LiveMapProps> = ({ className = "h-[calc(100vh-140px)]" }) => {
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Clustering Logic
  const mapItems = useMemo(() => {
    if (zoomLevel > 2) {
      // At high zoom, disable clustering
      return MOCK_VEHICLES.map(v => ({
        ...normalize(v.location.lat, v.location.lng),
        type: 'vehicle',
        data: v
      }));
    }

    // Simple grid-based clustering
    const clusters: Record<string, Cluster> = {};
    const gridSize = 10; // % of map

    MOCK_VEHICLES.forEach(v => {
      const pos = normalize(v.location.lat, v.location.lng);
      const key = `${Math.floor(pos.x / gridSize)}-${Math.floor(pos.y / gridSize)}`;
      
      if (!clusters[key]) {
        clusters[key] = { id: key, count: 0, x: 0, y: 0, vehicles: [] };
      }
      const c = clusters[key];
      c.x = (c.x * c.count + pos.x) / (c.count + 1); // Running average position
      c.y = (c.y * c.count + pos.y) / (c.count + 1);
      c.count++;
      c.vehicles.push(v.id);
    });

    // Flatten results
    const results = [];
    Object.values(clusters).forEach(c => {
      if (c.count === 1) {
        // Re-find the original vehicle for single items (simplified)
        const v = MOCK_VEHICLES.find(veh => veh.id === c.vehicles[0]);
        if (v) results.push({ ...normalize(v.location.lat, v.location.lng), type: 'vehicle', data: v });
      } else {
        results.push({ ...c, type: 'cluster' });
      }
    });
    return results;

  }, [zoomLevel]);

  return (
    <div className={`w-full bg-slate-200 rounded-sm overflow-hidden relative border border-slate-300 shadow-inner group/map ${className}`}>
      {/* Map Background */}
      <div className="absolute inset-0 bg-[#cbd5e1] opacity-50 pointer-events-none">
        <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      
      {/* NZ Outline (Abstract) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M40,10 L55,20 L60,35 L50,45 L40,35 Z" fill="#64748b" />
        <path d="M35,55 L45,60 L40,85 L30,80 Z" fill="#64748b" />
      </svg>

      {/* Markers */}
      {mapItems.map((item: any) => (
        <MapMarker 
          key={item.id || item.data.id}
          x={item.x}
          y={item.y}
          isCluster={item.type === 'cluster'}
          count={item.count}
          status={item.type === 'vehicle' ? item.data.status : ''}
          label={item.type === 'vehicle' ? item.data.registration : ''}
          isSelected={item.type === 'vehicle' && selectedVehicle === item.data.id}
          onClick={() => {
            if (item.type === 'cluster') setZoomLevel(prev => prev + 1);
            else setSelectedVehicle(item.data.id);
          }}
        />
      ))}

      {/* Info Panel Overlay */}
      {selectedVehicle && (
        <div className="absolute top-4 right-4 w-64 bg-slate-900/90 backdrop-blur text-white rounded-sm shadow-xl border-l-4 border-nz-blue p-4 z-20 animate-fade-in">
          {MOCK_VEHICLES.filter(v => v.id === selectedVehicle).map(v => (
            <div key={v.id} className="space-y-3">
              <div className="flex justify-between items-start">
                 <div>
                   <h3 className="font-bold font-mono">{v.registration}</h3>
                   <p className="text-xs text-slate-400">{v.make} {v.model}</p>
                 </div>
                 <button onClick={() => setSelectedVehicle(null)}><Icons.Close className="w-4 h-4 text-slate-400 hover:text-white" /></button>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="bg-white/10 p-1.5 rounded-sm">
                  <span className="block text-slate-400 text-[9px]">SPEED</span>
                  {v.telematics.speed} km/h
                </div>
                <div className="bg-white/10 p-1.5 rounded-sm">
                  <span className="block text-slate-400 text-[9px]">DRIVER</span>
                  {v.assignedDriverId}
                </div>
              </div>
              <div className="flex justify-between text-xs pt-2 border-t border-white/10">
                <span className="text-slate-400">Status</span>
                <span className={`font-bold ${v.status === 'Available' ? 'text-emerald-400' : 'text-blue-400'}`}>{v.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Map Controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-1">
        <button onClick={() => setZoomLevel(prev => Math.min(prev + 1, 3))} className="w-8 h-8 bg-white border border-slate-300 rounded-sm shadow flex items-center justify-center text-slate-700 hover:bg-slate-50 font-bold">+</button>
        <button onClick={() => setZoomLevel(prev => Math.max(prev - 1, 1))} className="w-8 h-8 bg-white border border-slate-300 rounded-sm shadow flex items-center justify-center text-slate-700 hover:bg-slate-50 font-bold">-</button>
      </div>

      {/* Overlay Status */}
      <div className="absolute top-4 left-4 pointer-events-none">
        <div className="bg-white/90 backdrop-blur px-3 py-1 rounded-sm border border-slate-300 shadow-sm flex items-center gap-2">
           <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
           <span className="text-[10px] font-bold text-slate-700 font-mono tracking-wider">LIVE_FEED: CONNECTED</span>
        </div>
      </div>
    </div>
  );
};