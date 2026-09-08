import fs from 'fs';
import path from 'path';

const logsDir = './logs';

// Create logs directory if it doesn't exist
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

class Logger {
  constructor() {
    this.logFile = path.join(logsDir, `app-${new Date().toISOString().split('T')[0]}.log`);
  }

  write(message, level = 'INFO') {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level}] ${message}\n`;
    fs.appendFileSync(this.logFile, logMessage);
    console.log(logMessage);
  }

  info(message) {
    this.write(message, 'INFO');
  }

  error(message) {
    this.write(message, 'ERROR');
  }

  warn(message) {
    this.write(message, 'WARN');
  }

  debug(message) {
    if (process.env.NODE_ENV === 'development') {
      this.write(message, 'DEBUG');
    }
  }

  stream = {
    write: (message) => this.write(message.trim(), 'HTTP')
  };
}

export const logger = new Logger();
