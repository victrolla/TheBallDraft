import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Icons } from '../Icons';

interface AssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAssign: (id: string) => void;
  type: 'Driver' | 'Vehicle';
  entityName: string; // The thing being assigned TO (e.g. Trip T991)
}

export const AssignmentModal: React.FC<AssignmentModalProps> = ({ isOpen, onClose, onAssign, type, entityName }) => {
  const [search, setSearch] = useState('');
  
  // Mock data for assignment list
  const list = type === 'Driver' 
    ? [ { id: 'D001', name: 'Hemi Taylor', status: 'Available' }, { id: 'D002', name: 'Sarah Jones', status: 'Resting' } ]
    : [ { id: 'V001', name: 'Volvo FH16', status: 'Available' }, { id: 'V002', name: 'Isuzu N-Series', status: 'In Transit' } ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Assign ${type} to ${entityName}`} size="md">
      <div className="space-y-4">
        <div className="relative">
          <Icons.Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder={`Search ${type}s...`}
            className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="max-h-60 overflow-y-auto border rounded-lg border-slate-200 divide-y divide-slate-100">
          {list.map(item => (
            <div key={item.id} className="p-3 flex items-center justify-between hover:bg-slate-50 cursor-pointer" onClick={() => { onAssign(item.id); onClose(); }}>
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-xs font-bold text-slate-600">
                   {item.name.charAt(0)}
                 </div>
                 <div>
                   <p className="text-sm font-medium text-slate-900">{item.name}</p>
                   <p className="text-xs text-slate-500">{item.id}</p>
                 </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${item.status === 'Available' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};