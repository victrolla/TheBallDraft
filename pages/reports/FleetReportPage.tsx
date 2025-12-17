import React from 'react';
import { Icons } from '../../components/Icons';

export const FleetReportPage: React.FC = () => {
  const reports = [
    { title: 'Fleet Utilization', desc: 'Vehicle uptime, idle time, and efficiency analysis.', icon: Icons.Truck },
    { title: 'Driver Performance', desc: 'Safety scores, logbook compliance, and incident reports.', icon: Icons.Drivers },
    { title: 'Fuel & Emissions', desc: 'Cost analysis and CO2 tracking for NZ environmental standards.', icon: Icons.Fuel },
    { title: 'Trip Analysis', desc: 'On-time delivery rates, route deviations, and delay causes.', icon: Icons.Map },
    { title: 'Maintenance Costs', desc: 'Service history costs vs budget forecasting.', icon: Icons.Maintenance },
    { title: 'Freight Summary', desc: 'Volume moved, damaged goods, and insurance claims.', icon: Icons.Freight },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Reports & Analytics</h2>
        <p className="text-slate-500 text-sm">Generate comprehensive insights for stakeholders.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 text-nz-blue rounded-lg group-hover:bg-nz-blue group-hover:text-white transition-colors">
                <report.icon className="w-6 h-6" />
              </div>
              <Icons.ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-500" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">{report.title}</h3>
            <p className="text-sm text-slate-500 mb-6">{report.desc}</p>
            <div className="flex gap-2">
              <button className="flex-1 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">Preview</button>
              <button className="flex-1 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 flex items-center justify-center">
                <Icons.Upload className="w-3 h-3 mr-2" /> Export
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};