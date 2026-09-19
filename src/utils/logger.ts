/**
 * Centralized logging service
 * Can be easily integrated with Sentry or other monitoring tools in the future.
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

class Logger {
  private isProduction = import.meta.env.PROD;

  private log(level: LogLevel, message: string, data?: any) {
    if (this.isProduction && level === 'debug') return;

    const timestamp = new Date().toISOString();
    const formattedMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;

    switch (level) {
      case 'info':
        console.info(formattedMessage, data || '');
        break;
      case 'warn':
        console.warn(formattedMessage, data || '');
        break;
      case 'error':
        console.error(formattedMessage, data || '');
        // Potential place to trigger Sentry.captureException
        break;
      case 'debug':
        console.debug(formattedMessage, data || '');
        break;
    }
  }

  info(message: string, data?: any) { this.log('info', message, data); }
  warn(message: string, data?: any) { this.log('warn', message, data); }
  error(message: string, data?: any) { this.log('error', message, data); }
  debug(message: string, data?: any) { this.log('debug', message, data); }
}

export const logger = new Logger();
