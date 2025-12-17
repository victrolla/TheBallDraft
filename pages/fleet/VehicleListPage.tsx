import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Icons } from '../../components/Icons';
import { VehicleStatus } from '../../types';
import { NZ_LOCATIONS } from '../../constants';
import { CreateItemModal, FieldConfig } from '../../components/modals/CreateItemModal';

export const VehicleListPage: React.FC = () => {
  const { vehicles, addVehicle } = useData();
  const [filter, setFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStatusColor = (status: VehicleStatus) => {
    switch(status) {
      case VehicleStatus.IN_TRANSIT: return 'bg-blue-100 text-blue-800';
      case VehicleStatus.AVAILABLE: return 'bg-emerald-100 text-emerald-800';
      case VehicleStatus.MAINTENANCE: return 'bg-orange-100 text-orange-800';
      case VehicleStatus.BREAKDOWN: return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const filteredVehicles = filter === 'All' ? vehicles : vehicles.filter(v => v.status === filter);

  const formFields: FieldConfig[] = [
    { name: 'registration', label: 'Registration Plate', type: 'text', required: true, placeholder: 'e.g. KLA392' },
    { name: 'make', label: 'Make', type: 'text', required: true, placeholder: 'Volvo' },
    { name: 'model', label: 'Model', type: 'text', required: true, placeholder: 'FH16' },
    { name: 'type', label: 'Vehicle Type', type: 'select', required: true, options: ['Truck', 'Van', 'Trailer', 'Refrigerated'] },
    { name: 'status', label: 'Initial Status', type: 'select', required: true, options: Object.values(VehicleStatus), defaultValue: 'Available' },
    { name: 'odometer', label: 'Current Odometer (km)', type: 'number', required: true },
    { name: 'fuelLevel', label: 'Fuel Level (%)', type: 'number', required: true, defaultValue: 100 },
  ];

  const handleCreate = (data: any) => {
    addVehicle({
      ...data,
      location: NZ_LOCATIONS.AUCKLAND,
      nextServiceDate: '2024-12-01',
      rucStatus: 'Valid',
      telematics: { speed: 0, engineTemp: 0, batteryVoltage: 24 }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Vehicle Fleet</h2>
          <p className="text-slate-500 text-sm">Manage heavy transport assets and assignments.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-nz-blue text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Icons.Plus className="w-4 h-4 mr-2" />
          Add Vehicle
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {['All', 'In Transit', 'Available', 'Maintenance'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filter === status ? 'bg-slate-800 text-white' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVehicles.map(vehicle => (
          <div key={vehicle.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
            <div className="p-5">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                    <Icons.Truck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{vehicle.registration}</h3>
                    <p className="text-xs text-slate-500">{vehicle.make} {vehicle.model}</p>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(vehicle.status)}`}>
                  {vehicle.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div className="space-y-1">
                  <p className="text-slate-500 text-xs">Odometer</p>
                  <p className="font-medium text-slate-900">{Number(vehicle.odometer).toLocaleString()} km</p>
                </div>
                <div className="space-y-1">
                  <p className="text-slate-500 text-xs">Fuel Level</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: `${vehicle.fuelLevel}%` }}></div>
                    </div>
                    <span className="font-medium text-slate-900">{vehicle.fuelLevel}%</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Icons.User className="w-3 h-3" />
                  {vehicle.assignedDriverId ? 'Assigned' : 'Unassigned'}
                </div>
                {vehicle.rucStatus !== 'Valid' && (
                  <div className="flex items-center gap-1 text-xs text-amber-600 font-bold">
                    <Icons.Alert className="w-3 h-3" />
                    RUC Expiring
                  </div>
                )}
              </div>
            </div>
            <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="text-sm font-medium text-slate-600 hover:text-nz-blue">View History</button>
              <button className="text-sm font-medium text-nz-blue hover:text-blue-800">Edit Details</button>
            </div>
          </div>
        ))}
      </div>

      <CreateItemModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Add New Vehicle"
        fields={formFields}
        onSubmit={handleCreate}
      />
    </div>
  );
};