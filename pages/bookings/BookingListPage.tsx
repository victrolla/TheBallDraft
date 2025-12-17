import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Icons } from '../../components/Icons';
import { Badge } from '../../components/ui/Badge';
import { useStore } from '../../context/StoreContext';
import { CreateItemModal, FieldConfig } from '../../components/modals/CreateItemModal';

export const BookingListPage: React.FC = () => {
  const { setView } = useStore();
  const { bookings, addBooking } = useData();
  const [filter, setFilter] = useState('Active');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formFields: FieldConfig[] = [
    { name: 'client', label: 'Client Name', type: 'text', required: true },
    { name: 'type', label: 'Service Type', type: 'select', options: ['Pickup', 'Delivery', 'Refrigerated', 'Heavy Haul'], required: true },
    { name: 'date', label: 'Required Date', type: 'date', required: true },
    { name: 'priority', label: 'Priority', type: 'select', options: ['Low', 'Medium', 'High'], defaultValue: 'Medium' },
    { name: 'origin', label: 'Pickup Location', type: 'text', required: true },
    { name: 'dest', label: 'Destination', type: 'text', required: true },
  ];

  const handleCreate = (data: any) => {
    addBooking({
      ...data,
      status: 'Pending'
    });
  };

  const filteredBookings = filter === 'All' ? bookings : bookings; // Simplified filter for now

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Bookings</h2>
          <p className="text-slate-500 text-sm">Manage customer requests and transport orders.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50">
             <Icons.Upload className="w-4 h-4 mr-2" /> Import CSV
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center px-4 py-2 bg-nz-blue text-white rounded-lg hover:bg-blue-700 shadow-sm"
          >
            <Icons.Plus className="w-4 h-4 mr-2" />
            Create Booking
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50">
           <div className="flex items-center gap-2">
              {['Active', 'Draft', 'History'].map(f => (
                <button 
                  key={f}
                  onClick={() => setFilter(f)} 
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${filter === f ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  {f}
                </button>
              ))}
           </div>
           <div className="relative w-full sm:w-64">
              <Icons.Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Search client or ref..." className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-nz-blue outline-none" />
           </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Ref ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Route</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {filteredBookings.map(b => (
                <tr key={b.id} className="hover:bg-slate-50 cursor-pointer transition-colors" onClick={() => setView('booking-detail')}>
                   <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-medium text-nz-blue">{b.id}</td>
                   <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-slate-900">{b.client}</div>
                      {b.priority === 'High' && <span className="text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-100">URGENT</span>}
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{b.type}</td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {b.origin} <span className="text-slate-300">→</span> {b.dest}
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{b.date}</td>
                   <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={b.status === 'Confirmed' ? 'success' : b.status === 'Pending' ? 'warning' : 'neutral'}>
                         {b.status}
                      </Badge>
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap text-right">
                      <Icons.ChevronRight className="w-4 h-4 text-slate-400" />
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
        title="Create New Booking"
        fields={formFields}
        onSubmit={handleCreate}
      />
    </div>
  );
};