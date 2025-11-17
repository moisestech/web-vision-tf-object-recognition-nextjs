/**
 * Structured logging utility for SOP Demo
 * Logs are formatted for easy parsing and debugging
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  category: string;
  message: string;
  data?: Record<string, unknown>;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
}

class Logger {
  private logs: LogEntry[] = [];
  private maxLogs = 1000;
  private enabled = true;

  log(entry: Omit<LogEntry, 'timestamp'>): void {
    if (!this.enabled) return;

    const fullEntry: LogEntry = {
      ...entry,
      timestamp: new Date().toISOString(),
    };

    this.logs.push(fullEntry);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    // Console output with structured format
    const prefix = `[${fullEntry.timestamp}] [${fullEntry.level.toUpperCase()}] [${fullEntry.category}]`;
    const message = fullEntry.message;
    const output = fullEntry.data
      ? `${prefix} ${message} | Data: ${JSON.stringify(fullEntry.data)}`
      : `${prefix} ${message}`;

    switch (fullEntry.level) {
      case 'debug':
        console.debug(output);
        break;
      case 'info':
        console.info(output);
        break;
      case 'warn':
        console.warn(output);
        break;
      case 'error':
        console.error(output, fullEntry.error);
        break;
    }
  }

  debug(category: string, message: string, data?: Record<string, unknown>): void {
    this.log({ level: 'debug', category, message, data });
  }

  info(category: string, message: string, data?: Record<string, unknown>): void {
    this.log({ level: 'info', category, message, data });
  }

  warn(category: string, message: string, data?: Record<string, unknown>): void {
    this.log({ level: 'warn', category, message, data });
  }

  error(
    category: string,
    message: string,
    error?: Error,
    data?: Record<string, unknown>
  ): void {
    this.log({
      level: 'error',
      category,
      message,
      error: error
        ? {
            name: error.name,
            message: error.message,
            stack: error.stack,
          }
        : undefined,
      data,
    });
  }

  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  getLogsAsJSON(): string {
    return JSON.stringify(this.logs, null, 2);
  }

  clearLogs(): void {
    this.logs = [];
  }

  exportLogs(): string {
    return this.getLogsAsJSON();
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }
}

export const logger = new Logger();

// Export convenience functions
export const log = {
  debug: (category: string, message: string, data?: Record<string, unknown>) =>
    logger.debug(category, message, data),
  info: (category: string, message: string, data?: Record<string, unknown>) =>
    logger.info(category, message, data),
  warn: (category: string, message: string, data?: Record<string, unknown>) =>
    logger.warn(category, message, data),
  error: (
    category: string,
    message: string,
    error?: Error,
    data?: Record<string, unknown>
  ) => logger.error(category, message, error, data),
  export: () => logger.exportLogs(),
  getLogs: () => logger.getLogs(),
  clear: () => logger.clearLogs(),
};





