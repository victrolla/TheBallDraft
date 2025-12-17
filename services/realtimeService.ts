import { logger } from '../utils/logger';

// In a real app, this would use Supabase Realtime or Socket.io
class RealtimeService {
  private isConnected: boolean = false;
  private subscriptions: Map<string, Function[]> = new Map();
  private mockInterval: any = null;

  connect() {
    if (this.isConnected) return;
    logger.info('Connecting to Realtime Telemetry Stream...');
    this.isConnected = true;
    
    // Simulate incoming data
    this.mockInterval = setInterval(() => {
      this.broadcast('telemetry', {
        vehicleId: 'V001',
        speed: Math.floor(Math.random() * 20) + 70,
        timestamp: new Date().toISOString()
      });
    }, 3000);
  }

  disconnect() {
    if (this.mockInterval) clearInterval(this.mockInterval);
    this.isConnected = false;
    logger.info('Disconnected from Realtime Stream');
  }

  subscribe(channel: string, callback: Function) {
    if (!this.subscriptions.has(channel)) {
      this.subscriptions.set(channel, []);
    }
    this.subscriptions.get(channel)?.push(callback);
    logger.debug(`Subscribed to channel: ${channel}`);
    
    // Return unsubscribe function
    return () => this.unsubscribe(channel, callback);
  }

  unsubscribe(channel: string, callback: Function) {
    const subs = this.subscriptions.get(channel);
    if (subs) {
      this.subscriptions.set(channel, subs.filter(cb => cb !== callback));
    }
  }

  private broadcast(channel: string, data: any) {
    const subs = this.subscriptions.get(channel);
    if (subs) {
      subs.forEach(cb => cb(data));
    }
  }
}

export const realtimeService = new RealtimeService();