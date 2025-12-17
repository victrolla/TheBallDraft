import { logger } from '../utils/logger';

export interface AIResponse {
  type: 'insight' | 'action' | 'error';
  content: string;
  data?: any;
}

export const aiService = {
  processSpreadsheet: async (file: File): Promise<AIResponse> => {
    logger.info(`Uploading file for AI analysis: ${file.name}`);
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate processing
    
    return {
      type: 'insight',
      content: `Analyzed ${file.name}. Found 142 trip records. 12 trips flagged for route inefficiency (potential savings: 150km).`,
      data: { efficiencyScore: 88, flaggedCount: 12 }
    };
  },

  processVoiceCommand: async (audioBlob: Blob | null, textMock: string): Promise<AIResponse> => {
    logger.info('Processing voice command...');
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simple intent matching mock
    if (textMock.toLowerCase().includes('schedule')) {
      return { type: 'action', content: 'Opening Route Planner with parameters from voice command.' };
    }
    if (textMock.toLowerCase().includes('alert')) {
      return { type: 'action', content: 'Alert acknowledged. Notification sent to driver.' };
    }
    return { type: 'insight', content: `Command received: "${textMock}". I didn't understand the intent.` };
  }
};