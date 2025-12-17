import React, { useState } from 'react';
import { MOCK_FREIGHT } from '../constants';
import { Icons } from './Icons';
import { FreightStatus } from '../types';

export const FreightTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const getStatusColor = (status: FreightStatus) => {
    switch (status) {
      case FreightStatus.IN_TRANSIT: return 'bg-blue-100 text-blue-700';
      case FreightStatus.DELIVERED: return 'bg-emerald-100 text-emerald-700';
      case FreightStatus.DELAYED: return 'bg-amber-100 text-amber-700';
      case FreightStatus.DAMAGED: return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const filteredFreight = MOCK_FREIGHT.filter(f => 
    f.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
    f.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Table Header / Toolbar */}
      <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative max-w-sm w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icons.Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-nz-blue focus:border-nz-blue sm:text-sm transition-shadow"
            placeholder="Search Waybill, ID, or Description"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50">
            <Icons.Settings className="w-4 h-4 mr-2" /> Filter
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-nz-blue hover:bg-blue-700 shadow-sm">
            <Icons.Freight className="w-4 h-4 mr-2" /> Add Freight
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">ID / Desc</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Origin / Dest</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Sensors</th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {filteredFreight.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-nz-blue">{item.id}</div>
                      <div className="text-sm text-slate-500">{item.description}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-slate-900">{item.origin}</div>
                  <div className="text-xs text-slate-400">to {item.destination}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                  <div className="text-xs text-slate-400 mt-1">ETA: {item.eta}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  {item.type}
                  {item.hazardClass && (
                     <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] font-bold bg-orange-100 text-orange-800 border border-orange-200">HAZ</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  {item.temperature && (
                    <div className="flex items-center gap-1">
                      <Icons.Temp className="w-4 h-4 text-slate-400" />
                      <span className={item.temperature > 5 ? 'text-red-500 font-bold' : 'text-emerald-600'}>{item.temperature}°C</span>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a href="#" className="text-nz-blue hover:text-blue-900">Track</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-slate-50 px-4 py-3 border-t border-slate-200 flex items-center justify-between sm:px-6">
          <div className="text-sm text-slate-500">Showing <span className="font-medium">{filteredFreight.length}</span> results</div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-slate-300 rounded-md text-sm bg-white hover:bg-slate-50 text-slate-600 disabled:opacity-50">Previous</button>
            <button className="px-3 py-1 border border-slate-300 rounded-md text-sm bg-white hover:bg-slate-50 text-slate-600">Next</button>
          </div>
      </div>
    </div>
  );
};