import React from 'react';
import { Icons } from '../../components/Icons';
import { MOCK_VEHICLES, MOCK_MAINTENANCE } from '../../constants';
import { Badge } from '../../components/ui/Badge';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const VehicleDetailPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const vehicle = MOCK_VEHICLES[0]; // Using first vehicle as mock
  const maintenance = MOCK_MAINTENANCE.filter(m => m.vehicleId === vehicle.id);

  // Mock telematics data
  const data = [
    { time: '08:00', speed: 45, rpm: 1200 },
    { time: '09:00', speed: 85, rpm: 2100 },
    { time: '10:00', speed: 82, rpm: 2000 },
    { time: '11:00', speed: 0, rpm: 0 },
    { time: '12:00', speed: 90, rpm: 2300 },
    { time: '13:00', speed: 88, rpm: 2200 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <Icons.ChevronRight className="w-6 h-6 rotate-180 text-slate-500" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              {vehicle.registration}
              <Badge variant="info">{vehicle.type}</Badge>
            </h1>
            <p className="text-slate-500 text-sm">{vehicle.make} {vehicle.model} • {vehicle.id}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center px-4 py-2 border border-slate-300 rounded-lg text-slate-700 bg-white hover:bg-slate-50">
            <Icons.Maintenance className="w-4 h-4 mr-2" /> Log Maintenance
          </button>
          <button className="flex items-center px-4 py-2 bg-nz-blue text-white rounded-lg hover:bg-blue-700">
            <Icons.Map className="w-4 h-4 mr-2" /> Live Track
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Telematics Chart */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Icons.Sensor className="w-5 h-5 text-nz-blue" /> 
              Real-time Telematics
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorSpeed" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0066cc" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#0066cc" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="speed" stroke="#0066cc" fillOpacity={1} fill="url(#colorSpeed)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4 text-center">
               <div className="p-3 bg-slate-50 rounded-lg">
                 <div className="text-xs text-slate-500 uppercase">Avg Speed</div>
                 <div className="font-bold text-lg">68 km/h</div>
               </div>
               <div className="p-3 bg-slate-50 rounded-lg">
                 <div className="text-xs text-slate-500 uppercase">Max RPM</div>
                 <div className="font-bold text-lg">2,400</div>
               </div>
               <div className="p-3 bg-slate-50 rounded-lg">
                 <div className="text-xs text-slate-500 uppercase">Fuel Used</div>
                 <div className="font-bold text-lg">124 L</div>
               </div>
            </div>
          </div>

          {/* Maintenance History */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-800">Maintenance History</h3>
              <button className="text-sm text-nz-blue hover:underline">View All</button>
            </div>
            <table className="min-w-full divide-y divide-slate-200">
              <tbody className="divide-y divide-slate-100">
                {maintenance.map(rec => (
                  <tr key={rec.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">{rec.type}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{rec.date}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{rec.provider}</td>
                    <td className="px-6 py-4 text-right">
                       <Badge variant={rec.status === 'Completed' ? 'success' : 'warning'}>{rec.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
           <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
             <h3 className="font-bold text-slate-800 mb-4">Specs & Compliance</h3>
             <div className="space-y-4">
               <div className="flex justify-between items-center py-2 border-b border-slate-100">
                 <span className="text-sm text-slate-500">Odometer</span>
                 <span className="font-mono font-medium">{vehicle.odometer.toLocaleString()} km</span>
               </div>
               <div className="flex justify-between items-center py-2 border-b border-slate-100">
                 <span className="text-sm text-slate-500">Fuel Level</span>
                 <span className="font-mono font-medium">{vehicle.fuelLevel}%</span>
               </div>
               <div className="flex justify-between items-center py-2 border-b border-slate-100">
                 <span className="text-sm text-slate-500">RUC Status</span>
                 <Badge variant={vehicle.rucStatus === 'Valid' ? 'success' : 'error'}>{vehicle.rucStatus}</Badge>
               </div>
               <div className="flex justify-between items-center py-2 border-b border-slate-100">
                 <span className="text-sm text-slate-500">Next Service</span>
                 <span className="text-sm text-slate-700">{vehicle.nextServiceDate}</span>
               </div>
               <div className="flex justify-between items-center py-2">
                 <span className="text-sm text-slate-500">Assigned Driver</span>
                 <span className="text-sm font-medium text-nz-blue cursor-pointer hover:underline">{vehicle.assignedDriverId}</span>
               </div>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
};