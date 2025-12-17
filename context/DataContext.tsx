import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
  Vehicle, Driver, Trip, Booking, Alert, 
  VehicleStatus, Freight, FreightStatus, FreightType,
  FuelLog, MaintenanceRecord 
} from '../types';
import { 
  MOCK_VEHICLES, MOCK_DRIVERS, MOCK_TRIPS, MOCK_ALERTS, 
  MOCK_FREIGHT, MOCK_FUEL_LOGS, MOCK_MAINTENANCE 
} from '../constants';
import { useToast } from '../components/ui/Toast';

// Mock Bookings Data (Moving from inline to context)
const INITIAL_BOOKINGS: Booking[] = [
  { id: 'B-3920', client: 'Fonterra Co-op', type: 'Pickup', date: '2024-10-24', status: 'Pending', priority: 'High', origin: 'Hamilton', dest: 'Auckland Port' },
  { id: 'B-3921', client: 'Mitre 10 Mega', type: 'Delivery', date: '2024-10-25', status: 'Confirmed', priority: 'Medium', origin: 'Auckland DC', dest: 'Tauranga' },
  { id: 'B-3922', client: 'Countdown', type: 'Refrigerated', date: '2024-10-25', status: 'In Progress', priority: 'High', origin: 'Pukekohe', dest: 'Wellington' },
  { id: 'B-3923', client: 'Fletcher Building', type: 'Heavy Haul', date: '2024-10-26', status: 'Draft', priority: 'Low', origin: 'Penrose', dest: 'Albany' },
];

interface DataContextType {
  vehicles: Vehicle[];
  drivers: Driver[];
  trips: Trip[];
  bookings: Booking[];
  alerts: Alert[];
  freight: Freight[];
  fuelLogs: FuelLog[];
  maintenance: MaintenanceRecord[];
  
  addVehicle: (vehicle: Omit<Vehicle, 'id'>) => void;
  addDriver: (driver: Omit<Driver, 'id'>) => void;
  addTrip: (trip: Omit<Trip, 'id'>) => void;
  addBooking: (booking: Omit<Booking, 'id'>) => void;
  addFreight: (freight: Omit<Freight, 'id'>) => void;
  
  updateVehicleStatus: (id: string, status: VehicleStatus) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { addToast } = useToast();
  
  const [vehicles, setVehicles] = useState<Vehicle[]>(MOCK_VEHICLES);
  const [drivers, setDrivers] = useState<Driver[]>(MOCK_DRIVERS);
  const [trips, setTrips] = useState<Trip[]>(MOCK_TRIPS);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [alerts, setAlerts] = useState<Alert[]>(MOCK_ALERTS);
  const [freight, setFreight] = useState<Freight[]>(MOCK_FREIGHT);
  const [fuelLogs, setFuelLogs] = useState<FuelLog[]>(MOCK_FUEL_LOGS);
  const [maintenance, setMaintenance] = useState<MaintenanceRecord[]>(MOCK_MAINTENANCE);

  const addVehicle = (vehicleData: Omit<Vehicle, 'id'>) => {
    const newVehicle = { ...vehicleData, id: `V${100 + vehicles.length + 1}` };
    setVehicles(prev => [...prev, newVehicle]);
    addToast(`Vehicle ${newVehicle.registration} added successfully`, 'success');
  };

  const addDriver = (driverData: Omit<Driver, 'id'>) => {
    const newDriver = { ...driverData, id: `D${100 + drivers.length + 1}` };
    setDrivers(prev => [...prev, newDriver]);
    addToast(`Driver ${newDriver.name} added successfully`, 'success');
  };

  const addTrip = (tripData: Omit<Trip, 'id'>) => {
    const newTrip = { ...tripData, id: `T${900 + trips.length + 1}` };
    setTrips(prev => [...prev, newTrip]);
    addToast(`Trip ${newTrip.id} scheduled`, 'success');
  };

  const addBooking = (bookingData: Omit<Booking, 'id'>) => {
    const newBooking = { ...bookingData, id: `B-${4000 + bookings.length + 1}` };
    setBookings(prev => [...prev, newBooking]);
    addToast(`Booking ${newBooking.id} created`, 'success');
  };

  const addFreight = (freightData: Omit<Freight, 'id'>) => {
    const newFreight = { ...freightData, id: `F${2000 + freight.length + 1}` };
    setFreight(prev => [...prev, newFreight]);
    addToast(`Freight ${newFreight.id} manifest created`, 'success');
  };

  const updateVehicleStatus = (id: string, status: VehicleStatus) => {
    setVehicles(prev => prev.map(v => v.id === id ? { ...v, status } : v));
    addToast(`Vehicle ${id} status updated to ${status}`, 'info');
  };

  return (
    <DataContext.Provider value={{
      vehicles, drivers, trips, bookings, alerts, freight, fuelLogs, maintenance,
      addVehicle, addDriver, addTrip, addBooking, addFreight, updateVehicleStatus
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};