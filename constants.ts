import { Driver, Freight, FreightStatus, FreightType, Vehicle, VehicleStatus, Alert, Trip, MaintenanceRecord, FuelLog } from "./types";

// Mock NZ Locations
export const NZ_LOCATIONS = {
  AUCKLAND: { lat: -36.8485, lng: 174.7633 },
  WELLINGTON: { lat: -41.2865, lng: 174.7762 },
  CHRISTCHURCH: { lat: -43.5321, lng: 172.6362 },
  HAMILTON: { lat: -37.7870, lng: 175.2793 },
  TAURANGA: { lat: -37.6878, lng: 176.1651 },
  DUNEDIN: { lat: -45.8788, lng: 170.5028 },
};

export const MOCK_DRIVERS: Driver[] = [
  { id: 'D001', name: 'Hemi Taylor', email: 'hemi.t@fleetcmd.co.nz', phone: '021 123 4567', licenseClass: '5', licenseExpiry: '2025-11-20', status: 'Active', drivingHoursToday: 6.5, location: NZ_LOCATIONS.HAMILTON, safetyScore: 94, assignedVehicleId: 'V001' },
  { id: 'D002', name: 'Sarah Jones', email: 'sarah.j@fleetcmd.co.nz', phone: '022 987 6543', licenseClass: '4', licenseExpiry: '2024-08-15', status: 'Resting', drivingHoursToday: 3.2, location: NZ_LOCATIONS.AUCKLAND, safetyScore: 98, assignedVehicleId: 'V002' },
  { id: 'D003', name: 'Rawiri Smith', email: 'rawiri.s@fleetcmd.co.nz', phone: '027 555 1234', licenseClass: '5', licenseExpiry: '2026-02-10', status: 'Active', drivingHoursToday: 8.1, location: NZ_LOCATIONS.CHRISTCHURCH, safetyScore: 88, assignedVehicleId: 'V003' },
];

export const MOCK_VEHICLES: Vehicle[] = [
  { 
    id: 'V001', registration: 'KLA392', make: 'Volvo', model: 'FH16', type: 'Truck', status: VehicleStatus.IN_TRANSIT, 
    fuelLevel: 72, odometer: 145020, nextServiceDate: '2024-06-01', location: NZ_LOCATIONS.HAMILTON, 
    assignedDriverId: 'D001', rucStatus: 'Valid', telematics: { speed: 85, engineTemp: 90, batteryVoltage: 24.1 } 
  },
  { 
    id: 'V002', registration: 'NZE123', make: 'Isuzu', model: 'N-Series', type: 'Refrigerated', status: VehicleStatus.AVAILABLE, 
    fuelLevel: 95, odometer: 54000, nextServiceDate: '2024-09-15', location: NZ_LOCATIONS.AUCKLAND, 
    assignedDriverId: 'D002', rucStatus: 'Expiring Soon', telematics: { speed: 0, engineTemp: 40, batteryVoltage: 24.5 } 
  },
  { 
    id: 'V003', registration: 'GTR456', make: 'Scania', model: 'R-Series', type: 'Truck', status: VehicleStatus.IN_TRANSIT, 
    fuelLevel: 45, odometer: 210500, nextServiceDate: '2024-05-20', location: NZ_LOCATIONS.CHRISTCHURCH, 
    assignedDriverId: 'D003', rucStatus: 'Valid', telematics: { speed: 92, engineTemp: 95, batteryVoltage: 23.9 } 
  },
];

export const MOCK_FREIGHT: Freight[] = [
  { id: 'F1001', description: 'Dairy Products', type: FreightType.PERISHABLE, weightKg: 1200, volumeM3: 4, sender: 'Fonterra', receiver: 'Countdown Akl', origin: 'Hamilton', destination: 'Auckland', status: FreightStatus.IN_TRANSIT, eta: '14:30 Today', temperature: 4.2 },
  { id: 'F1002', description: 'Construction Steel', type: FreightType.GENERAL, weightKg: 5000, volumeM3: 6, sender: 'Steel & Tube', receiver: 'Fletcher Construction', origin: 'Auckland', destination: 'Wellington', status: FreightStatus.PENDING, eta: 'Tomorrow', hazardClass: 'None' },
  { id: 'F1003', description: 'Medical Supplies', type: FreightType.FRAGILE, weightKg: 150, volumeM3: 2, sender: 'EBOS', receiver: 'Dunedin Hospital', origin: 'Christchurch', destination: 'Dunedin', status: FreightStatus.IN_TRANSIT, eta: '16:00 Today', hazardClass: 'Bio' },
];

export const MOCK_ALERTS: Alert[] = [
  { id: 'A001', type: 'CRITICAL', category: 'Vehicle', message: 'Vehicle V003 - Engine Temp Warning', timestamp: '10:45 AM', entityId: 'V003', resolved: false },
  { id: 'A002', type: 'WARNING', category: 'Compliance', message: 'Driver D002 - Logbook Break Due', timestamp: '11:00 AM', entityId: 'D002', resolved: false },
  { id: 'A003', type: 'INFO', category: 'Freight', message: 'Freight F1001 - Temperature Deviation Detected', timestamp: '10:15 AM', entityId: 'F1001', resolved: true },
];

export const MOCK_TRIPS: Trip[] = [
  { id: 'T991', vehicleId: 'V001', driverId: 'D001', origin: 'Hamilton', destination: 'Auckland', startTime: '2024-05-20 08:00', distanceKm: 125, status: 'Active', freightIds: ['F1001'], routePath: [], cost: 450 }
];

export const MOCK_MAINTENANCE: MaintenanceRecord[] = [
  { id: 'M001', vehicleId: 'V001', type: 'Service', date: '2024-06-01', cost: 1200, provider: 'TruckStop NZ', status: 'Scheduled', notes: 'Regular 50k service' },
  { id: 'M002', vehicleId: 'V003', type: 'Tire Change', date: '2024-02-15', cost: 3500, provider: 'Bridgestone Commercial', status: 'Completed', notes: 'Replaced all rear tires' },
];

export const MOCK_FUEL_LOGS: FuelLog[] = [
  { id: 'FL001', vehicleId: 'V001', date: '2024-05-19', liters: 150, costPerLiter: 2.45, totalCost: 367.50, odometer: 144800, location: 'Z Station Hamilton' },
  { id: 'FL002', vehicleId: 'V002', date: '2024-05-18', liters: 80, costPerLiter: 2.45, totalCost: 196.00, odometer: 53800, location: 'BP Auckland' },
];