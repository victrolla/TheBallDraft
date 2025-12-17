export enum FreightStatus {
  PENDING = 'Pending',
  IN_TRANSIT = 'In Transit',
  DELIVERED = 'Delivered',
  DELAYED = 'Delayed',
  DAMAGED = 'Damaged',
  WAREHOUSED = 'Warehoused'
}

export enum FreightType {
  GENERAL = 'General',
  PERISHABLE = 'Perishable',
  HAZARDOUS = 'Hazardous',
  LIVESTOCK = 'Livestock',
  FRAGILE = 'Fragile'
}

export enum VehicleStatus {
  AVAILABLE = 'Available',
  IN_TRANSIT = 'In Transit',
  MAINTENANCE = 'Maintenance',
  BREAKDOWN = 'Breakdown',
  OFFLINE = 'Offline'
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Freight {
  id: string;
  description: string;
  type: FreightType;
  weightKg: number;
  volumeM3: number;
  sender: string;
  receiver: string;
  origin: string;
  destination: string;
  status: FreightStatus;
  eta: string;
  hazardClass?: string;
  temperature?: number;
  lastScan?: string;
}

export interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  licenseClass: string; // NZ License Classes (2, 4, 5)
  licenseExpiry: string;
  status: 'Active' | 'Resting' | 'Off Duty';
  drivingHoursToday: number; // For logbook compliance
  location: Coordinates;
  safetyScore: number;
  assignedVehicleId?: string;
  avatarUrl?: string;
}

export interface Vehicle {
  id: string;
  registration: string; // NZ Rego
  make: string;
  model: string;
  type: 'Truck' | 'Van' | 'Trailer' | 'Refrigerated';
  status: VehicleStatus;
  fuelLevel: number;
  odometer: number;
  nextServiceDate: string;
  location: Coordinates;
  assignedDriverId?: string;
  rucStatus: 'Valid' | 'Expiring Soon' | 'Expired';
  telematics: {
    speed: number;
    engineTemp: number;
    batteryVoltage: number;
  };
}

export interface Trip {
  id: string;
  vehicleId: string;
  driverId: string;
  origin: string;
  destination: string;
  startTime: string;
  endTime?: string;
  distanceKm: number;
  status: 'Scheduled' | 'Active' | 'Completed' | 'Cancelled';
  freightIds: string[];
  routePath: Coordinates[];
  cost: number;
}

export interface Booking {
  id: string;
  client: string;
  type: string;
  date: string;
  status: 'Pending' | 'Confirmed' | 'In Progress' | 'Draft' | 'Completed';
  priority: 'Low' | 'Medium' | 'High';
  origin: string;
  dest: string;
}

export interface MaintenanceRecord {
  id: string;
  vehicleId: string;
  type: 'Service' | 'Repair' | 'Inspection' | 'Tire Change';
  date: string;
  cost: number;
  provider: string;
  status: 'Scheduled' | 'In Progress' | 'Completed';
  notes: string;
}

export interface FuelLog {
  id: string;
  vehicleId: string;
  date: string;
  liters: number;
  costPerLiter: number;
  totalCost: number;
  odometer: number;
  location: string;
}

export interface Alert {
  id: string;
  type: 'CRITICAL' | 'WARNING' | 'INFO';
  category: 'Vehicle' | 'Driver' | 'Freight' | 'Compliance';
  message: string;
  timestamp: string;
  entityId?: string;
  resolved: boolean;
}

export interface Customer {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  address: string;
  contractStatus: 'Active' | 'Pending' | 'Expired';
}

export interface Invoice {
  id: string;
  customerId: string;
  tripId: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  dateIssued: string;
  dueDate: string;
}

export interface TelemetryPoint {
  timestamp: string;
  speed: number;
  rpm: number;
  fuelRate: number;
  latitude: number;
  longitude: number;
  event?: 'Hard Braking' | 'Rapid Acceleration' | 'Cornering';
}

export type UserRole = 'admin' | 'dispatcher' | 'driver' | 'viewer';

export type IndustryType = 'Waste' | 'FMCG' | 'Construction' | 'Courier' | 'Pharma' | 'General';
export type SubscriptionTier = 'Starter' | 'Growth' | 'Professional' | 'Enterprise';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  industry?: IndustryType;
  subscriptionTier?: SubscriptionTier;
  fleetSize?: number;
}

export type Permission = 
  | 'view_fleet'
  | 'edit_fleet'
  | 'view_financials'
  | 'edit_trips'
  | 'view_reports'
  | 'manage_users';

export interface AuditLog {
  id: string;
  action: string;
  actorId: string;
  actorName: string;
  resourceType: 'Vehicle' | 'Driver' | 'Trip' | 'System' | 'Auth';
  resourceId: string;
  details: string;
  timestamp: string;
  ipAddress: string;
  status: 'Success' | 'Failure';
}