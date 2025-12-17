import React, { useState } from 'react';
import { Icons } from '../../components/Icons';
import { MOCK_TRIPS, NZ_LOCATIONS } from '../../constants';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { TelemetryFeed } from '../../components/telemetry/TelemetryFeed';
import { ConfirmationModal } from '../../components/modals/ConfirmationModal';
import { AssignmentModal } from '../../components/modals/AssignmentModal';

export const TripDetailPage: React.FC<{ onBack: () => void, tripId?: string }> = ({ onBack, tripId }) => {
  const trip = MOCK_TRIPS[0]; // Mock use
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <Icons.ChevronRight className="w-6 h-6 rotate-180 text-slate-500" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              Trip {trip.id}
              <Badge variant="info">{trip.status}</Badge>
            </h1>
            <p className="text-slate-500 text-sm">{trip.origin} <Icons.ChevronRight className="w-3 h-3 inline" /> {trip.destination}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setIsCancelModalOpen(true)} className="px-4 py-2 border border-red-200 text-red-700 rounded-lg hover:bg-red-50 font-medium text-sm">
            Cancel Trip
          </button>
          <button onClick={() => setIsAssignModalOpen(true)} className="flex items-center px-4 py-2 bg-nz-blue text-white rounded-lg hover:bg-blue-700 shadow-sm">
            <Icons.User className="w-4 h-4 mr-2" />
            Reassign Driver
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
           <Card title="Route & Progress">
              <div className="bg-slate-100 rounded-lg h-64 flex items-center justify-center text-slate-400 border border-slate-200 mb-6">
                 <div className="text-center">
                    <Icons.Map className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    Mapbox Route Overlay
                 </div>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                 <div>
                    <p className="text-slate-500">Departure</p>
                    <p className="font-bold text-slate-900">{trip.startTime}</p>
                    <p className="text-xs text-slate-400">Hamilton Depot</p>
                 </div>
                 <div className="flex-1 px-8 text-center">
                    <div className="w-full bg-slate-100 rounded-full h-2 mb-2 relative">
                       <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                       <div className="absolute top-1/2 left-[65%] w-4 h-4 bg-white border-2 border-emerald-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow"></div>
                    </div>
                    <p className="text-emerald-600 font-bold text-xs">On Time - 65% Completed</p>
                 </div>
                 <div className="text-right">
                    <p className="text-slate-500">ETA</p>
                    <p className="font-bold text-slate-900">14:30 Today</p>
                    <p className="text-xs text-slate-400">Auckland Central</p>
                 </div>
              </div>
           </Card>

           <Card title="Freight Manifest">
              <table className="min-w-full divide-y divide-slate-100">
                 <thead className="bg-slate-50">
                    <tr>
                       <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">ID</th>
                       <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">Item</th>
                       <th className="px-4 py-2 text-right text-xs font-medium text-slate-500 uppercase">Weight</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                    <tr>
                       <td className="px-4 py-3 text-sm font-mono text-nz-blue">F1001</td>
                       <td className="px-4 py-3 text-sm text-slate-700">Dairy Products (Chilled)</td>
                       <td className="px-4 py-3 text-sm text-slate-700 text-right">1,200 kg</td>
                    </tr>
                 </tbody>
              </table>
           </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
           <TelemetryFeed />
           
           <Card title="Driver & Vehicle">
              <div className="space-y-4">
                 <div className="flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-100">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-slate-200">
                          <Icons.User className="w-5 h-5 text-slate-500" />
                       </div>
                       <div>
                          <p className="font-bold text-slate-900">Hemi Taylor</p>
                          <p className="text-xs text-slate-500">D001 • Class 5</p>
                       </div>
                    </div>
                    <button className="text-nz-blue hover:text-blue-800"><Icons.Search className="w-4 h-4" /></button>
                 </div>
                 
                 <div className="flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-100">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-slate-200">
                          <Icons.Truck className="w-5 h-5 text-slate-500" />
                       </div>
                       <div>
                          <p className="font-bold text-slate-900">Volvo FH16</p>
                          <p className="text-xs text-slate-500">V001 • KLA392</p>
                       </div>
                    </div>
                    <button className="text-nz-blue hover:text-blue-800"><Icons.Search className="w-4 h-4" /></button>
                 </div>
              </div>
           </Card>
        </div>
      </div>

      <ConfirmationModal 
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={() => { alert('Trip Cancelled'); }}
        title="Cancel Trip?"
        message="Are you sure you want to cancel Trip T991? This will notify the driver and warehouse immediately."
        type="danger"
        confirmText="Yes, Cancel Trip"
      />
      
      <AssignmentModal 
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        onAssign={(id) => { alert(`Assigned driver ${id}`); }}
        type="Driver"
        entityName="Trip T991"
      />
    </div>
  );
};