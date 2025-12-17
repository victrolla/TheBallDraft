import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Icons } from '../../components/Icons';
import { CreateItemModal, FieldConfig } from '../../components/modals/CreateItemModal';
import { NZ_LOCATIONS } from '../../constants';

export const DriverListPage: React.FC = () => {
  const { drivers, addDriver } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formFields: FieldConfig[] = [
    { name: 'name', label: 'Full Name', type: 'text', required: true },
    { name: 'email', label: 'Email Address', type: 'email', required: true },
    { name: 'phone', label: 'Phone Number', type: 'text', required: true },
    { name: 'licenseClass', label: 'License Class', type: 'select', required: true, options: ['1', '2', '4', '5'] },
    { name: 'licenseExpiry', label: 'License Expiry', type: 'date', required: true },
    { name: 'status', label: 'Status', type: 'select', options: ['Active', 'Resting', 'Off Duty'], defaultValue: 'Active' },
  ];

  const handleCreate = (data: any) => {
    addDriver({
      ...data,
      drivingHoursToday: 0,
      safetyScore: 100,
      location: NZ_LOCATIONS.AUCKLAND
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Drivers & HR</h2>
          <p className="text-slate-500 text-sm">Monitor compliance, fatigue, and performance.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-nz-blue text-white rounded-lg hover:bg-blue-700 shadow-sm"
        >
          <Icons.Plus className="w-4 h-4 mr-2" />
          Add Driver
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Driver</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">License</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Driving Hrs</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Safety Score</th>
                <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {drivers.map((driver) => (
                <tr key={driver.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold">
                        {driver.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-slate-900">{driver.name}</div>
                        <div className="text-xs text-slate-500">{driver.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      driver.status === 'Active' ? 'bg-green-100 text-green-800' : 
                      driver.status === 'Resting' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-800'
                    }`}>
                      {driver.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900">Class {driver.licenseClass}</div>
                    <div className="text-xs text-slate-500">Exp: {driver.licenseExpiry}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                     <div className="flex items-center gap-2">
                       <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                         <div 
                           className={`h-full ${driver.drivingHoursToday > 10 ? 'bg-red-500' : 'bg-nz-blue'}`} 
                           style={{ width: `${(driver.drivingHoursToday / 13) * 100}%` }}
                         ></div>
                       </div>
                       <span className="text-sm text-slate-600">{driver.drivingHoursToday}h</span>
                     </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-bold ${driver.safetyScore >= 90 ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {driver.safetyScore}/100
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-nz-blue hover:text-blue-900">View Logbook</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CreateItemModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Register New Driver"
        fields={formFields}
        onSubmit={handleCreate}
      />
    </div>
  );
};