import { logger } from '../utils/logger';

interface SyncAction {
  id: string;
  type: string;
  payload: any;
  timestamp: number;
}

class SyncService {
  private queue: SyncAction[] = [];
  private STORAGE_KEY = 'nz_fleet_sync_queue';

  constructor() {
    // Load persisted queue
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      this.queue = JSON.parse(saved);
      logger.info(`SyncService initialized with ${this.queue.length} pending actions`);
    }
  }

  addToQueue(type: string, payload: any) {
    const action: SyncAction = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      payload,
      timestamp: Date.now()
    };
    this.queue.push(action);
    this.persist();
    logger.info(`Action queued: ${type}`, action);
  }

  getQueueSize() {
    return this.queue.length;
  }

  async processQueue() {
    if (this.queue.length === 0) return;

    logger.info('Processing sync queue...');
    const snapshot = [...this.queue];
    
    // Simulate processing
    for (const action of snapshot) {
      try {
        await this.mockApiCall(action);
        // Remove from queue if successful
        this.queue = this.queue.filter(a => a.id !== action.id);
        this.persist();
      } catch (err) {
        logger.error(`Failed to process action ${action.id}`, err);
        // Keep in queue to retry later
      }
    }
    logger.info('Sync completed');
  }

  private persist() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.queue));
  }

  private async mockApiCall(action: SyncAction) {
    return new Promise(resolve => setTimeout(resolve, 500));
  }
}

export const syncService = new SyncService();