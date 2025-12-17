import React, { useEffect, useState } from 'react';
import { Card } from '../ui/Card';
import { Icons } from '../Icons';
import { TelemetryPoint } from '../../types';

export const TelemetryFeed: React.FC = () => {
  const [feed, setFeed] = useState<TelemetryPoint[]>([]);

  useEffect(() => {
    // Simulate incoming telemetry data
    const interval = setInterval(() => {
      const newPoint: TelemetryPoint = {
        timestamp: new Date().toLocaleTimeString(),
        speed: Math.floor(Math.random() * 20) + 70, // 70-90 km/h
        rpm: Math.floor(Math.random() * 500) + 1500,
        fuelRate: Math.random() * 5 + 20,
        latitude: -37.7870,
        longitude: 175.2793,
        event: Math.random() > 0.8 ? 'Hard Braking' : undefined
      };
      setFeed(prev => [newPoint, ...prev].slice(0, 10)); // Keep last 10
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card title="Live Telemetry Stream" className="h-full">
      <div className="space-y-4">
        <div className="flex justify-between text-xs text-slate-500 px-2 uppercase font-semibold">
           <span>Time</span>
           <span>Event / Status</span>
           <span>Speed</span>
        </div>
        <div className="space-y-2">
          {feed.map((point, idx) => (
            <div key={idx} className={`flex justify-between items-center p-2 rounded text-sm animate-fade-in ${
              idx === 0 ? 'bg-blue-50 border-l-2 border-nz-blue' : 'border-l-2 border-transparent'
            }`}>
              <span className="font-mono text-slate-500">{point.timestamp}</span>
              <span className={`font-medium ${point.event ? 'text-red-600' : 'text-slate-700'}`}>
                {point.event || 'Normal Operation'}
              </span>
              <div className="flex items-center gap-2">
                 <span className="font-bold text-slate-800">{point.speed} km/h</span>
                 {point.event && <Icons.Alert className="w-3 h-3 text-red-500" />}
              </div>
            </div>
          ))}
          {feed.length === 0 && <div className="text-center py-8 text-slate-400 text-sm">Waiting for signal...</div>}
        </div>
      </div>
    </Card>
  );
};