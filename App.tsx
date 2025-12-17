import React, { useEffect } from 'react';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { LiveMap } from './components/LiveMap';
import { FreightInputPage } from './pages/io/FreightInputPage';
import { FreightOutputPage } from './pages/io/FreightOutputPage';
import { VehicleListPage } from './pages/fleet/VehicleListPage';
import { VehicleDetailPage } from './pages/fleet/VehicleDetailPage';
import { DriverListPage } from './pages/drivers/DriverListPage';
import { DriverDetailPage } from './pages/drivers/DriverDetailPage';
import { RoutePlannerPage } from './pages/trips/RoutePlannerPage';
import { TripListPage } from './pages/trips/TripListPage';
import { TripDetailPage } from './pages/trips/TripDetailPage';
import { MaintenanceCalendarPage } from './pages/maintenance/MaintenanceCalendarPage';
import { FuelLogPage } from './pages/fuel/FuelLogPage';
import { FleetReportPage } from './pages/reports/FleetReportPage';
import { DriverReportPage } from './pages/reports/DriverReportPage';
import { VehicleReportPage } from './pages/reports/VehicleReportPage';
import { SettingsPage } from './pages/settings/SettingsPage';
import { ProfilePage } from './pages/settings/ProfilePage';
import { AuditLogPage } from './pages/admin/AuditLogPage';
import { SystemHealthPage } from './pages/admin/SystemHealthPage';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { OnboardingWizard } from './pages/auth/OnboardingWizard';
import { PasswordResetPage } from './pages/auth/PasswordResetPage';
import { LandingPage } from './pages/landing/LandingPage';
import { PricingPage } from './pages/marketing/PricingPage';
import { ContactPage } from './pages/marketing/ContactPage';

// New Pages
import { CalendarPage } from './pages/bookings/CalendarPage';
import { BookingListPage } from './pages/bookings/BookingListPage';
import { BookingDetailPage } from './pages/bookings/BookingDetailPage';
import { StopOffPage } from './pages/stops/StopOffPage';
import { ReturnSchedulerPage } from './pages/stops/ReturnSchedulerPage';
import { DepotManagementPage } from './pages/depot/DepotManagementPage';
import { AlertCenterPage } from './pages/alerts/AlertCenterPage';
import { AlertHistoryPage } from './pages/alerts/AlertHistoryPage';
import { AIIntegrationPage } from './pages/ai/AIIntegrationPage'; // Added
import { CustomerPortalPage } from './pages/portal/CustomerPortalPage'; // Added

import { Icons } from './components/Icons';
import { ToastProvider } from './components/ui/Toast';
import { StoreProvider, useStore } from './context/StoreContext';
import { DataProvider } from './context/DataContext'; 
import { MainLayout } from './components/layout/MainLayout';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { OfflineBanner } from './components/common/OfflineBanner';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { realtimeService } from './services/realtimeService';
import { syncService } from './services/syncService';
import { useNetworkStatus } from './hooks/useNetworkStatus';

const AppContent: React.FC = () => {
  const { currentView, isAuthenticated, setView, login } = useStore();
  const isOnline = useNetworkStatus();

  // Initialize background services
  useEffect(() => {
    if (isAuthenticated) {
      realtimeService.connect();
    } else {
      realtimeService.disconnect();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isOnline) {
      syncService.processQueue();
    }
  }, [isOnline]);

  // Route Handling
  const renderView = () => {
    switch (currentView) {
      // Public / Marketing Pages
      case 'landing': return <LandingPage onNavigate={setView} />;
      case 'pricing': return <PricingPage />;
      case 'contact': return <ContactPage />;
      case 'about': return <LandingPage onNavigate={setView} />; 

      // Auth Pages
      case 'signup': return <SignupPage onNavigate={setView} />;
      case 'onboarding': return <OnboardingWizard onComplete={() => setView('dashboard')} />;
      case 'password-reset': return <PasswordResetPage onNavigate={setView} />;
      case 'login': return <LoginPage onLogin={() => { login({ id: 'u1', name: 'John Doe', email: 'john@fleet.nz', role: 'admin' } as any); }} onNavigate={setView} />;

      // Protected Dashboard Pages
      case 'dashboard': return <ProtectedRoute><DashboardPage /></ProtectedRoute>;
      case 'live-map': return <ProtectedRoute><LiveMap /></ProtectedRoute>;
      
      // Intelligence
      case 'ai-integration': return <ProtectedRoute><AIIntegrationPage /></ProtectedRoute>;
      case 'customer-portal': return <ProtectedRoute><CustomerPortalPage /></ProtectedRoute>; // Accessible by admin to view/manage, typically client would have separate login but using same route for demo

      // Alerts
      case 'alert-center': return <ProtectedRoute><AlertCenterPage /></ProtectedRoute>;
      case 'alert-history': return <ProtectedRoute><AlertHistoryPage /></ProtectedRoute>;

      // Bookings & Calendar
      case 'calendar': return <ProtectedRoute><CalendarPage /></ProtectedRoute>;
      case 'bookings': return <ProtectedRoute><BookingListPage /></ProtectedRoute>;
      case 'booking-detail': return <ProtectedRoute><BookingDetailPage onBack={() => setView('bookings')} /></ProtectedRoute>;

      // Stops & Depot
      case 'stops': return <ProtectedRoute><StopOffPage /></ProtectedRoute>;
      case 'returns': return <ProtectedRoute><ReturnSchedulerPage /></ProtectedRoute>;
      case 'depot': return <ProtectedRoute><DepotManagementPage /></ProtectedRoute>;

      // Fleet
      case 'vehicles': return <ProtectedRoute><VehicleListPage /></ProtectedRoute>;
      case 'vehicle-detail': return <ProtectedRoute><VehicleDetailPage onBack={() => setView('vehicles')} /></ProtectedRoute>;
      case 'drivers': return <ProtectedRoute><DriverListPage /></ProtectedRoute>;
      case 'driver-detail': return <ProtectedRoute><DriverDetailPage onBack={() => setView('drivers')} /></ProtectedRoute>;
      
      // Trips
      case 'trips': return <ProtectedRoute><RoutePlannerPage /></ProtectedRoute>;
      case 'trip-list': return <ProtectedRoute><TripListPage /></ProtectedRoute>;
      case 'trip-detail': return <ProtectedRoute><TripDetailPage onBack={() => setView('trip-list')} /></ProtectedRoute>;

      // Logistics
      case 'freight-input': return <ProtectedRoute><FreightInputPage /></ProtectedRoute>;
      case 'freight-output': return <ProtectedRoute><FreightOutputPage /></ProtectedRoute>;
      case 'freight-list': return <ProtectedRoute><FreightInputPage /></ProtectedRoute>; 
      
      // Maintenance & Fuel
      case 'maintenance': return <ProtectedRoute><MaintenanceCalendarPage /></ProtectedRoute>;
      case 'fuel': return <ProtectedRoute><FuelLogPage /></ProtectedRoute>;
      
      // Reports (Admin Only)
      case 'reports': return <ProtectedRoute allowedRoles={['admin', 'dispatcher']}><FleetReportPage /></ProtectedRoute>;
      case 'driver-reports': return <ProtectedRoute><DriverReportPage /></ProtectedRoute>;
      case 'vehicle-reports': return <ProtectedRoute><VehicleReportPage /></ProtectedRoute>;
      case 'audit-logs': return <ProtectedRoute allowedRoles={['admin']}><AuditLogPage /></ProtectedRoute>;
      case 'system-health': return <ProtectedRoute allowedRoles={['admin']}><SystemHealthPage /></ProtectedRoute>;
      
      // Settings
      case 'settings': return <ProtectedRoute><SettingsPage /></ProtectedRoute>;
      case 'profile': return <ProtectedRoute><ProfilePage /></ProtectedRoute>;
      
      default: return (
        <div className="flex flex-col items-center justify-center h-96 text-industrial-slate">
          <Icons.Truck className="w-16 h-16 mb-4 opacity-20" />
          <h2 className="text-xl font-semibold">Page Under Construction</h2>
          <p className="mt-2 text-sm font-mono text-industrial-slate">Module: {currentView}</p>
        </div>
      );
    }
  };

  const isPublicRoute = ['landing', 'login', 'signup', 'onboarding', 'password-reset', 'pricing', 'contact', 'about'].includes(currentView);

  // Layout Logic
  if (isPublicRoute) {
    return (
      <ErrorBoundary>
        <OfflineBanner />
        {renderView()}
      </ErrorBoundary>
    );
  }

  // Fallback for unauthenticated access
  if (!isAuthenticated && !isPublicRoute) {
    setView('login');
    return null;
  }

  return (
    <ErrorBoundary>
      <OfflineBanner />
      <MainLayout>
        {renderView()}
      </MainLayout>
    </ErrorBoundary>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <ToastProvider>
        <DataProvider>
          <AppContent />
        </DataProvider>
      </ToastProvider>
    </StoreProvider>
  );
}