import { User, UserRole, Permission } from '../types';

const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  admin: ['view_fleet', 'edit_fleet', 'view_financials', 'edit_trips', 'view_reports', 'manage_users'],
  dispatcher: ['view_fleet', 'edit_fleet', 'edit_trips', 'view_reports'],
  driver: ['view_fleet'], // Limited view of own vehicle usually
  viewer: ['view_fleet', 'view_reports']
};

export const hasPermission = (user: User | null, permission: Permission): boolean => {
  if (!user) return false;
  const permissions = ROLE_PERMISSIONS[user.role];
  return permissions.includes(permission);
};

export const canEditFleet = (user: User | null) => hasPermission(user, 'edit_fleet');
export const canViewFinancials = (user: User | null) => hasPermission(user, 'view_financials');
export const canManageUsers = (user: User | null) => hasPermission(user, 'manage_users');

export const getRedirectPathForRole = (role: UserRole): string => {
  switch (role) {
    case 'driver': return 'trips';
    case 'viewer': return 'dashboard';
    default: return 'dashboard';
  }
};