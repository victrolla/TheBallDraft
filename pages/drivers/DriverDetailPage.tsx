import React from 'react';
import { Icons } from '../../components/Icons';
import { MOCK_DRIVERS, MOCK_TRIPS } from '../../constants';
import { Badge } from '../../components/ui/Badge';

export const DriverDetailPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const driver = MOCK_DRIVERS[0]; // Mocking first driver
  const trips = MOCK_TRIPS.filter(t => t.driverId === driver.id);

  return (
    <div className="space-y-6 animate-fade-in">
       <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <Icons.ChevronRight className="w-6 h-6 rotate-180 text-slate-500" />
          </button>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center text-xl font-bold text-slate-600">
              {driver.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{driver.name}</h1>
              <p className="text-slate-500 text-sm">ID: {driver.id} • Class {driver.licenseClass} License</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center px-4 py-2 border border-slate-300 rounded-lg text-slate-700 bg-white hover:bg-slate-50">
            <Icons.Reports className="w-4 h-4 mr-2" /> Logbook
          </button>
          <button className="flex items-center px-4 py-2 bg-nz-blue text-white rounded-lg hover:bg-blue-700">
            <Icons.Truck className="w-4 h-4 mr-2" /> Assign Vehicle
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
           {/* Work Hours Stats */}
           <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
             <h3 className="font-bold text-slate-800 mb-4">Current Shift (NZ Work Time)</h3>
             <div className="relative pt-6">
               <div className="flex mb-2 items-center justify-between">
                 <div>
                   <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                     Work Time
                   </span>
                 </div>
                 <div className="text-right">
                   <span className="text-xs font-semibold inline-block text-blue-600">
                     {driver.drivingHoursToday} / 13 Hours
                   </span>
                 </div>
               </div>
               <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-100">
                 <div style={{ width: `${(driver.drivingHoursToday / 13) * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
               </div>
               <p className="text-sm text-slate-500">Rest break due in <span className="font-bold text-slate-800">1h 45m</span> to comply with fatigue management.</p>
             </div>
           </div>

           {/* Recent Trips */}
           <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
             <div className="p-4 border-b border-slate-100 font-bold text-slate-800">Recent Assignments</div>
             <table className="min-w-full divide-y divide-slate-100">
               <thead className="bg-slate-50">
                 <tr>
                   <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Trip ID</th>
                   <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Route</th>
                   <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Distance</th>
                   <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase">Status</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                 {trips.length > 0 ? trips.map(trip => (
                   <tr key={trip.id} className="hover:bg-slate-50">
                     <td className="px-6 py-4 text-sm font-medium text-nz-blue">{trip.id}</td>
                     <td className="px-6 py-4 text-sm text-slate-600">{trip.origin} → {trip.destination}</td>
                     <td className="px-6 py-4 text-sm text-slate-600">{trip.distanceKm} km</td>
                     <td className="px-6 py-4 text-right"><Badge variant="info">{trip.status}</Badge></td>
                   </tr>
                 )) : (
                    <tr><td colSpan={4} className="px-6 py-4 text-center text-slate-500 text-sm">No recent trips found.</td></tr>
                 )}
               </tbody>
             </table>
           </div>
        </div>

        <div className="space-y-6">
           <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
             <h3 className="font-bold text-slate-800 mb-4">HR & Safety</h3>
             <ul className="space-y-4">
               <li className="flex justify-between items-center">
                 <span className="text-sm text-slate-500">Safety Score</span>
                 <span className={`font-bold ${driver.safetyScore > 90 ? 'text-emerald-600' : 'text-amber-600'}`}>{driver.safetyScore}/100</span>
               </li>
               <li className="flex justify-between items-center">
                 <span className="text-sm text-slate-500">License Expiry</span>
                 <span className="text-sm text-slate-800">{driver.licenseExpiry}</span>
               </li>
               <li className="flex justify-between items-center">
                 <span className="text-sm text-slate-500">Phone</span>
                 <span className="text-sm text-slate-800">{driver.phone}</span>
               </li>
               <li className="flex justify-between items-center">
                 <span className="text-sm text-slate-500">Email</span>
                 <span className="text-sm text-slate-800 truncate max-w-[150px]">{driver.email}</span>
               </li>
             </ul>
             <div className="mt-6 pt-4 border-t border-slate-100">
               <button className="w-full text-red-600 text-sm font-medium hover:bg-red-50 p-2 rounded text-center">Report Incident</button>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};