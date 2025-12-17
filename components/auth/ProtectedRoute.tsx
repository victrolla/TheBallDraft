import React, { useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { UserRole } from '../../types';
import { LoadingSkeleton } from '../common/LoadingSkeleton';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, setView, isLoading } = useStore();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setView('login');
    }
  }, [isAuthenticated, isLoading, setView]);

  if (isLoading) {
    return (
      <div className="p-8">
        <LoadingSkeleton className="mb-4" height="h-8" />
        <LoadingSkeleton count={5} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect via useEffect
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-6">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
           <span className="text-2xl">🔒</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Access Denied</h2>
        <p className="text-slate-500 max-w-md">You do not have permission to view this page. Please contact your administrator if you believe this is an error.</p>
        <button 
          onClick={() => setView('dashboard')} 
          className="mt-6 px-6 py-2 bg-nz-blue text-white rounded-lg hover:bg-blue-700"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return <>{children}</>;
};