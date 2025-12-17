import React from 'react';
import { MOCK_FUEL_LOGS } from '../../constants';
import { Icons } from '../../components/Icons';

export const FuelLogPage: React.FC = () => {
  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Fuel & Expenses</h2>
          <p className="text-slate-500 text-sm">Track fuel efficiency and operating costs.</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-nz-blue text-white rounded-lg hover:bg-blue-700 shadow-sm">
          <Icons.Plus className="w-4 h-4 mr-2" />
          Log Fuel Entry
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
           <p className="text-slate-500 text-xs uppercase font-medium">Avg Fuel Price</p>
           <h3 className="text-2xl font-bold text-slate-900 mt-1">$2.45 <span className="text-sm font-normal text-slate-400">/L</span></h3>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
           <p className="text-slate-500 text-xs uppercase font-medium">Total Consumption</p>
           <h3 className="text-2xl font-bold text-slate-900 mt-1">230 <span className="text-sm font-normal text-slate-400">Liters</span></h3>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
           <p className="text-slate-500 text-xs uppercase font-medium">Total Cost</p>
           <h3 className="text-2xl font-bold text-slate-900 mt-1">$563.50</h3>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
           <p className="text-slate-500 text-xs uppercase font-medium">Efficiency</p>
           <h3 className="text-2xl font-bold text-emerald-600 mt-1">2.8 <span className="text-sm font-normal text-slate-400">km/L</span></h3>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 font-bold text-slate-800">Recent Logs</div>
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Vehicle</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Volume</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Cost</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Receipt</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {MOCK_FUEL_LOGS.map(log => (
              <tr key={log.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{log.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{log.vehicleId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{log.location}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{log.liters} L</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">${log.totalCost.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-nz-blue hover:underline cursor-pointer">View PDF</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};