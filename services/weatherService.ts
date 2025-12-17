// Mock service for Weather API integration (e.g. MetService or OpenWeatherMap)

export interface WeatherCondition {
  temp: number;
  condition: 'Sunny' | 'Rain' | 'Storm' | 'Cloudy' | 'Snow';
  windSpeedKm: number;
  warning?: string;
}

export const WeatherService = {
  getCurrentWeather: async (lat: number, lng: number): Promise<WeatherCondition> => {
    // Simulate API call
    return {
      temp: 18,
      condition: 'Rain',
      windSpeedKm: 25,
      warning: 'Heavy Rain Warning for Waikato Region'
    };
  },

  checkRouteWeather: async (routeId: string): Promise<boolean> => {
    // Returns true if severe weather impacts route
    return false;
  }
};