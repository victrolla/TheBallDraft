// Simple production-grade logger abstraction
// In a real app, this would connect to Sentry, LogRocket, or Datadog

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

class Logger {
  private env = process.env.NODE_ENV || 'development';

  private formatMessage(level: LogLevel, message: string, meta?: any) {
    const timestamp = new Date().toISOString();
    return {
      timestamp,
      level,
      message,
      meta,
      userAgent: navigator.userAgent
    };
  }

  log(level: LogLevel, message: string, meta?: any) {
    const logEntry = this.formatMessage(level, message, meta);
    
    // In dev, print to console
    if (this.env === 'development') {
      const style = {
        info: 'color: #0066cc',
        warn: 'color: #f59e0b',
        error: 'color: #ef4444; font-weight: bold',
        debug: 'color: #64748b'
      };
      console.log(`%c[${level.toUpperCase()}]`, style[level], message, meta || '');
    } else {
      // In prod, this would be: Sentry.captureMessage(message, level)
      // For now we assume console is captured by monitoring tools
      if (level === 'error') console.error(JSON.stringify(logEntry));
      else console.log(JSON.stringify(logEntry));
    }
  }

  info(message: string, meta?: any) { this.log('info', message, meta); }
  warn(message: string, meta?: any) { this.log('warn', message, meta); }
  error(message: string, meta?: any) { this.log('error', message, meta); }
  debug(message: string, meta?: any) { this.log('debug', message, meta); }
}

export const logger = new Logger();