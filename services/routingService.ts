import { Coordinates } from '../types';

interface RouteSegment {
  points: Coordinates[];
  distanceKm: number;
  durationMinutes: number;
  trafficFactor: number; // 1.0 = clear, 1.5 = heavy
}

// Mock service - in production this would call Mapbox/Google Routes API
export const RoutingService = {
  
  calculateETA: async (origin: string, destination: string): Promise<number> => {
    // Simulate API latency
    await new Promise(resolve => setTimeout(resolve, 500));
    // Mock calculation based on simplified string logic
    const baseTime = 60; // minutes
    const randomTraffic = Math.random() * 20;
    return Math.floor(baseTime + randomTraffic);
  },

  optimizeRoute: async (stops: string[]): Promise<string[]> => {
    // Simulate reordering for optimization (Traveling Salesman)
    await new Promise(resolve => setTimeout(resolve, 800));
    // Just return generic reorder for demo
    return [...stops].sort(); 
  },

  getTrafficSegment: (lat: number, lng: number): 'Clear' | 'Moderate' | 'Heavy' => {
    const r = Math.random();
    if (r > 0.8) return 'Heavy';
    if (r > 0.5) return 'Moderate';
    return 'Clear';
  }
};