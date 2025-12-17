import React from 'react';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';
import { Icons } from '../Icons';

export const OfflineBanner: React.FC = () => {
  const isOnline = useNetworkStatus();

  if (isOnline) return null;

  return (
    <div className="bg-slate-900 text-white px-4 py-2 flex items-center justify-center gap-2 text-sm font-medium animate-fade-in-up z-50 sticky top-0 shadow-lg">
      <Icons.Alert className="w-4 h-4 text-amber-500" />
      <span>You are currently offline. Changes will be saved locally and synced when connection is restored.</span>
    </div>
  );
};