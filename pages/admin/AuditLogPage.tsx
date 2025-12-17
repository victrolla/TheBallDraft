import React, { useEffect, useState } from 'react';
import { AuditLog } from '../../types';
import { AuditService } from '../../services/auditService';
import { VirtualTable } from '../../components/common/VirtualTable';
import { Icons } from '../../components/Icons';
import { Badge } from '../../components/ui/Badge';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';

export const AuditLogPage: React.FC = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    setLoading(true);
    const data = await AuditService.getLogs(500); // Fetch 500 records
    setLogs(data);
    setLoading(false);
  };

  const columns = [
    { 
      header: 'Timestamp', 
      width: 'w-48',
      accessor: (log: AuditLog) => <span className="font-mono text-xs text-slate-500">{new Date(log.timestamp).toLocaleString()}</span> 
    },
    { 
      header: 'Actor', 
      width: 'w-40',
      accessor: (log: AuditLog) => (
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-xs text-slate-600 font-bold">
            {log.actorName.charAt(0)}
          </div>
          <span className="truncate">{log.actorName}</span>
        </div>
      )
    },
    { 
      header: 'Action', 
      width: 'w-32',
      accessor: (log: AuditLog) => <span className="font-bold text-slate-700 text-xs">{log.action}</span> 
    },
    { 
      header: 'Resource', 
      width: 'w-32',
      accessor: (log: AuditLog) => <Badge variant="neutral" className="text-[10px]">{log.resourceType}</Badge>
    },
    { 
      header: 'Details', 
      accessor: (log: AuditLog) => <span className="text-slate-500 truncate">{log.details}</span> 
    },
    { 
      header: 'Status', 
      width: 'w-24',
      accessor: (log: AuditLog) => (
        <Badge variant={log.status === 'Success' ? 'success' : 'error'}>
          {log.status}
        </Badge>
      )
    },
  ];

  return (
    <div className="space-y-6 h-[calc(100vh-100px)] flex flex-col">
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Audit Logs</h2>
          <p className="text-slate-500 text-sm">Security and compliance trail (NZ Transport Act).</p>
        </div>
        <div className="flex gap-2">
          <button onClick={loadLogs} className="p-2 text-slate-500 hover:text-nz-blue border border-slate-300 rounded-lg bg-white">
            <Icons.Clock className="w-4 h-4" />
          </button>
          <button className="flex items-center px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700">
            <Icons.Upload className="w-4 h-4 mr-2" />
            Export Audit File
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        {loading ? (
          <div className="bg-white p-6 rounded-lg border border-slate-200 h-full">
            <LoadingSkeleton count={10} height="h-10" />
          </div>
        ) : (
          <VirtualTable 
            data={logs} 
            columns={columns} 
            rowHeight={50} 
            height={600} 
            className="shadow-sm"
          />
        )}
      </div>
    </div>
  );
};