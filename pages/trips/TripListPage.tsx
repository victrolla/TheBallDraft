import React from 'react';
import { Icons } from '../../components/Icons';
import { MOCK_TRIPS } from '../../constants';
import { Badge } from '../../components/ui/Badge';

export const TripListPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Trip Management</h2>
          <p className="text-slate-500 text-sm">Schedule and monitor active routes.</p>
        </div>
        <div className="flex gap-2">
           <button className="flex items-center px-4 py-2 border border-slate-300 bg-white rounded-lg hover:bg-slate-50 shadow-sm text-slate-700">
            <Icons.Calendar className="w-4 h-4 mr-2" />
            Schedule
          </button>
          <button className="flex items-center px-4 py-2 bg-nz-blue text-white rounded-lg hover:bg-blue-700 shadow-sm">
            <Icons.Plus className="w-4 h-4 mr-2" />
            New Trip
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex gap-4">
           {['All', 'Active', 'Scheduled', 'Completed'].map(f => (
             <button key={f} className="text-sm font-medium text-slate-600 hover:text-nz-blue px-2 py-1 rounded hover:bg-slate-50">{f}</button>
           ))}
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Trip ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Origin / Destination</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Driver / Vehicle</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Timing</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {MOCK_TRIPS.map(trip => (
                <tr key={trip.id} className="hover:bg-slate-50 group cursor-pointer" onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'trip-detail' }))}>
                   {/* Note: In a real React Router setup, we'd use Link. Here we rely on parent state handling in App.tsx. 
                       Since I can't easily pass props down through the Router simulation without context, I'll just use a hack or better yet, assume the user clicks "View" button */}
                   <td className="px-6 py-4 whitespace-nowrap font-medium text-nz-blue">{trip.id}</td>
                   <td className="px-6 py-4 whitespace-nowrap">
                     <div className="text-sm text-slate-900">{trip.origin}</div>
                     <div className="text-xs text-slate-400">to {trip.destination} ({trip.distanceKm} km)</div>
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap">
                     <div className="text-sm text-slate-900">{trip.driverId}</div>
                     <div className="text-xs text-slate-400">{trip.vehicleId}</div>
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                     {trip.startTime}
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap">
                     <Badge variant={trip.status === 'Active' ? 'success' : 'neutral'}>{trip.status}</Badge>
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap text-right">
                     <button className="text-slate-400 hover:text-nz-blue group-hover:translate-x-1 transition-transform">
                       <Icons.ChevronRight className="w-5 h-5" />
                     </button>
                   </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};