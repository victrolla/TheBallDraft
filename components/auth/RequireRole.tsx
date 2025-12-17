import React from 'react';
import { useStore } from '../../context/StoreContext';
import { UserRole } from '../../types';

interface RequireRoleProps {
  children: React.ReactNode;
  roles: UserRole[];
  fallback?: React.ReactNode;
}

export const RequireRole: React.FC<RequireRoleProps> = ({ children, roles, fallback = null }) => {
  const { user } = useStore();

  if (!user || !roles.includes(user.role)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};