import React from 'react';
import { Icons } from '../../components/Icons';

export const CalendarPage: React.FC = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Mock Calendar Data
  const bookings = [
    { id: 'B-102', client: 'Fonterra', time: '08:00', vehicle: 'V001', day: 2, duration: 4 },
    { id: 'B-105', client: 'Countdown', time: '14:00', vehicle: 'V002', day: 2, duration: 3 },
    { id: 'B-109', client: 'Fletchers', time: '09:00', vehicle: 'V003', day: 3, duration: 8 },
    { id: 'B-112', client: 'Mainfreight', time: '07:00', vehicle: 'V001', day: 4, duration: 6 },
    { id: 'B-115', client: 'Foodstuffs', time: '13:00', vehicle: 'V002', day: 5, duration: 4 },
  ];

  return (
    <div className="space-y-6 h-[calc(100vh-140px)] flex flex-col animate-fade-in">
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Operations Calendar</h2>
          <p className="text-slate-500 text-sm">Schedule management and resource allocation.</p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center bg-white border border-slate-300 rounded-lg p-1 mr-4">
             <button className="px-3 py-1 text-sm font-medium bg-slate-100 text-slate-800 rounded shadow-sm">Month</button>
             <button className="px-3 py-1 text-sm font-medium text-slate-600 hover:text-slate-900">Week</button>
             <button className="px-3 py-1 text-sm font-medium text-slate-600 hover:text-slate-900">Day</button>
          </div>
          <button className="p-2 border border-slate-300 rounded-lg hover:bg-slate-50 bg-white">
            <Icons.ChevronRight className="w-5 h-5 rotate-180" />
          </button>
          <span className="font-bold text-lg px-4 py-1 flex items-center">October 2024</span>
          <button className="p-2 border border-slate-300 rounded-lg hover:bg-slate-50 bg-white">
            <Icons.ChevronRight className="w-5 h-5" />
          </button>
          <div className="w-4"></div>
          <button className="flex items-center px-4 py-2 bg-nz-blue text-white rounded-lg hover:bg-blue-700 shadow-sm">
            <Icons.Plus className="w-4 h-4 mr-2" />
            New Booking
          </button>
        </div>
      </div>

      <div className="flex-1 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
        {/* Day Header */}
        <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50">
          {days.map(day => (
            <div key={day} className="py-3 text-center text-sm font-bold text-slate-600 uppercase tracking-wide border-r border-slate-200 last:border-r-0">
              {day}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-7 flex-1">
          {Array.from({ length: 35 }).map((_, idx) => {
            const dayNum = idx - 2; // Offset for demo
            const currentBookings = bookings.filter(b => b.day === (idx % 7));
            const isToday = dayNum === 24;

            return (
              <div key={idx} className={`border-r border-b border-slate-100 p-2 min-h-[120px] relative ${idx % 7 === 6 ? 'bg-slate-50/50' : ''}`}>
                {dayNum > 0 && dayNum <= 31 && (
                  <span className={`text-sm font-mono block mb-2 ${isToday ? 'bg-nz-blue text-white w-6 h-6 flex items-center justify-center rounded-full' : 'text-slate-500'}`}>
                    {dayNum}
                  </span>
                )}
                
                <div className="space-y-1">
                  {dayNum > 0 && dayNum <= 31 && currentBookings.map((b, i) => (
                    <div key={i} className="bg-blue-50 border border-blue-100 rounded px-2 py-1 cursor-pointer hover:bg-blue-100 transition-colors group">
                      <div className="flex justify-between text-[10px] text-blue-800 font-bold mb-0.5">
                        <span>{b.time}</span>
                        <span>{b.vehicle}</span>
                      </div>
                      <div className="text-xs font-medium text-slate-800 truncate">{b.client}</div>
                    </div>
                  ))}
                  
                  {/* Mock Maintenance Block */}
                  {dayNum === 15 && (
                    <div className="bg-amber-50 border border-amber-100 rounded px-2 py-1 flex items-center gap-1">
                       <Icons.Wrench className="w-3 h-3 text-amber-600" />
                       <span className="text-[10px] font-bold text-amber-700">Service V003</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};