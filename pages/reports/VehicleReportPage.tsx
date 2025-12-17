import React from 'react';
import { Icons } from '../../components/Icons';
import { MOCK_VEHICLES } from '../../constants';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export const VehicleReportPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Vehicle Utilization & Costs</h2>
          <p className="text-slate-500 text-sm">Fleet efficiency, maintenance costs, and lifecycle tracking.</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 shadow-sm">
          <Icons.Upload className="w-4 h-4 mr-2" />
          Export CSV
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_VEHICLES.map(vehicle => (
          <Card key={vehicle.id} className="hover:shadow-md transition-shadow">
             <div className="flex justify-between items-start mb-4">
               <div>
                  <h3 className="text-lg font-bold text-slate-900">{vehicle.registration}</h3>
                  <p className="text-sm text-slate-500">{vehicle.make} {vehicle.model}</p>
               </div>
               <Badge variant={vehicle.status === 'In Transit' ? 'info' : 'neutral'}>{vehicle.status}</Badge>
             </div>
             
             <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-3 bg-slate-50 rounded-lg">
                   <p className="text-xs text-slate-500 uppercase">Mileage (YTD)</p>
                   <p className="text-lg font-bold text-slate-800">45,200 km</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                   <p className="text-xs text-slate-500 uppercase">Cost / km</p>
                   <p className="text-lg font-bold text-slate-800">$1.85</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                   <p className="text-xs text-slate-500 uppercase">Maintenance</p>
                   <p className="text-lg font-bold text-slate-800">$2,400</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                   <p className="text-xs text-slate-500 uppercase">Fuel Efficiency</p>
                   <p className="text-lg font-bold text-emerald-600">2.1 km/L</p>
                </div>
             </div>

             <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-sm">
                <span className="text-slate-500">Next Service: <span className="font-medium text-slate-800">{vehicle.nextServiceDate}</span></span>
                <button className="text-nz-blue font-medium hover:underline">Full Report</button>
             </div>
          </Card>
        ))}
      </div>
    </div>
  );
};