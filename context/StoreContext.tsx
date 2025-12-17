import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface AppState {
  isAuthenticated: boolean;
  user: User | null;
  currentView: string;
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  isLoading: boolean;
}

interface StoreContextType extends AppState {
  login: (user: User) => void;
  logout: () => void;
  setView: (view: string) => void;
  toggleSidebar: (isOpen?: boolean) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setLoading: (loading: boolean) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState('landing');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isLoading, setIsLoading] = useState(false);

  const login = (userData: User) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsAuthenticated(true);
      setUser(userData);
      // Determine landing view based on role or onboarding status if needed
      setCurrentView('dashboard');
      setIsLoading(false);
    }, 800);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setCurrentView('landing');
  };

  const setView = (view: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSidebar = (isOpen?: boolean) => {
    setSidebarOpen(prev => isOpen !== undefined ? isOpen : !prev);
  };

  return (
    <StoreContext.Provider value={{
      isAuthenticated,
      user,
      currentView,
      theme,
      sidebarOpen,
      isLoading,
      login,
      logout,
      setView,
      toggleSidebar,
      setTheme,
      setLoading: setIsLoading
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};