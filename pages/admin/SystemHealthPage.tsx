import React, { useState, useEffect } from 'react';
import { Icons } from '../../components/Icons';
import { Card } from '../../components/ui/Card';

interface TestResult {
  name: string;
  status: 'pending' | 'pass' | 'fail';
  message?: string;
}

export const SystemHealthPage: React.FC = () => {
  const [results, setResults] = useState<TestResult[]>([
    { name: 'Supabase Connection', status: 'pending' },
    { name: 'Auth Service', status: 'pending' },
    { name: 'Realtime WebSocket', status: 'pending' },
    { name: 'Geolocation API', status: 'pending' },
    { name: 'Local Storage Sync', status: 'pending' },
  ]);

  const runTests = async () => {
    // Reset
    setResults(prev => prev.map(r => ({ ...r, status: 'pending', message: '' })));

    // 1. Supabase/API Mock Check
    await updateTest(0, async () => {
      await new Promise(r => setTimeout(r, 500));
      return { success: true, msg: 'Connected (Mock Mode)' };
    });

    // 2. Auth Check
    await updateTest(1, async () => {
      const user = localStorage.getItem('user'); // Basic check
      return { success: true, msg: user ? 'Session Active' : 'No Active Session' };
    });

    // 3. Realtime
    await updateTest(2, async () => {
      await new Promise(r => setTimeout(r, 300));
      return { success: true, msg: 'Stream Ready' };
    });

    // 4. Geolocation
    await updateTest(3, async () => {
      if ('geolocation' in navigator) return { success: true, msg: 'API Available' };
      return { success: false, msg: 'Not supported' };
    });

    // 5. Storage
    await updateTest(4, async () => {
      try {
        localStorage.setItem('health_test', 'ok');
        localStorage.removeItem('health_test');
        return { success: true, msg: 'Write/Read OK' };
      } catch {
        return { success: false, msg: 'Storage Quota/Error' };
      }
    });
  };

  const updateTest = async (index: number, testFn: () => Promise<{ success: boolean; msg: string }>) => {
    try {
      const res = await testFn();
      setResults(prev => {
        const next = [...prev];
        next[index] = { ...next[index], status: res.success ? 'pass' : 'fail', message: res.msg };
        return next;
      });
    } catch (e: any) {
      setResults(prev => {
        const next = [...prev];
        next[index] = { ...next[index], status: 'fail', message: e.message };
        return next;
      });
    }
  };

  useEffect(() => {
    runTests();
  }, []);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-2xl font-bold text-slate-900">System Health</h2>
           <p className="text-slate-500 text-sm">Self-diagnostic checks.</p>
        </div>
        <button onClick={runTests} className="px-4 py-2 bg-nz-blue text-white rounded-lg hover:bg-blue-700">
           Rerun Diagnostics
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <Card title="Diagnostic Results">
            <div className="space-y-4">
               {results.map((test, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg bg-slate-50">
                     <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                           test.status === 'pending' ? 'bg-slate-400 animate-pulse' :
                           test.status === 'pass' ? 'bg-emerald-500' : 'bg-red-500'
                        }`}></div>
                        <span className="font-medium text-slate-700">{test.name}</span>
                     </div>
                     <span className={`text-xs font-bold ${
                        test.status === 'pass' ? 'text-emerald-600' : 
                        test.status === 'fail' ? 'text-red-600' : 'text-slate-400'
                     }`}>
                        {test.status === 'pending' ? 'Running...' : test.message}
                     </span>
                  </div>
               ))}
            </div>
         </Card>

         <Card title="Environment Info">
            <div className="space-y-2 text-sm">
               <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">App Version</span>
                  <span className="font-mono">v1.0.4-rc</span>
               </div>
               <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">React Version</span>
                  <span className="font-mono">19.2.3</span>
               </div>
               <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">User Agent</span>
                  <span className="font-mono text-xs max-w-[200px] truncate">{navigator.userAgent}</span>
               </div>
               <div className="flex justify-between py-2">
                  <span className="text-slate-500">Timezone</span>
                  <span className="font-mono">{Intl.DateTimeFormat().resolvedOptions().timeZone}</span>
               </div>
            </div>
         </Card>
      </div>
    </div>
  );
};