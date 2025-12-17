import { AuditLog } from '../types';

// Mock generator for audit logs
const generateMockLogs = (count: number): AuditLog[] => {
  const actions = ['LOGIN', 'UPDATE_VEHICLE', 'CREATE_TRIP', 'DELETE_DRIVER', 'EXPORT_REPORT', 'UPDATE_SETTINGS'];
  const resources = ['Auth', 'Vehicle', 'Trip', 'Driver', 'System', 'System'];
  const actors = ['John Doe', 'System Admin', 'Jane Smith', 'Auto-System'];
  
  return Array.from({ length: count }).map((_, i) => ({
    id: `aud_${Math.random().toString(36).substr(2, 9)}`,
    action: actions[Math.floor(Math.random() * actions.length)],
    actorId: `u_${Math.floor(Math.random() * 5)}`,
    actorName: actors[Math.floor(Math.random() * actors.length)],
    resourceType: resources[Math.floor(Math.random() * resources.length)] as AuditLog['resourceType'],
    resourceId: `res_${Math.floor(Math.random() * 1000)}`,
    details: 'Operation completed successfully via web client.',
    timestamp: new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toISOString(),
    ipAddress: `192.168.1.${Math.floor(Math.random() * 255)}`,
    status: (Math.random() > 0.05 ? 'Success' : 'Failure') as AuditLog['status']
  })).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

export const AuditService = {
  getLogs: async (limit: number = 100): Promise<AuditLog[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    return generateMockLogs(limit);
  },

  logAction: (action: string, details: string) => {
    console.log(`[AUDIT] ${action}: ${details}`);
    // In production: await supabase.from('audit_logs').insert(...)
  }
};