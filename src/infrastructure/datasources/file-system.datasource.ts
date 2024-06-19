import fs from 'node:fs';

import { LogDataSource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

export class FileSystemDataSource implements LogDataSource {
  private readonly logPath: string = 'logs/';
  private readonly allLogsPaths = `logs/logs-all.log`;
  private readonly mediumLogsPaths = `logs/logs-medium.log`;
  private readonly highLogsPaths = `logs/logs-high.log`;

  constructor() {
    this.createLogsFile();
  }

  private createLogsFile() {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }

    [this.allLogsPaths, this.mediumLogsPaths, this.highLogsPaths].forEach(
      (path) => {
        if (!fs.existsSync(path)) {
          fs.writeFileSync(path, '');
        }
      }
    );
  }

  async saveLog(newLog: LogEntity): Promise<void> {
    const logAsJson = `${JSON.stringify(newLog)}\n`;

    fs.appendFileSync(this.allLogsPaths, logAsJson);
    if (newLog.level === LogSeverityLevel.low) return;
    if (newLog.level === LogSeverityLevel.medium) {
      fs.appendFileSync(this.mediumLogsPaths, logAsJson);
    } else {
      fs.appendFileSync(this.highLogsPaths, logAsJson);
    }
  }

  private getLogsFromFile(path: string): LogEntity[] {
    const content = fs.readFileSync(path, 'utf-8');
    if (content === '') return [];

    const logs = content.split('\n').map(LogEntity.fromJson);
    logs.pop();
    return logs;
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    switch (severityLevel) {
      case LogSeverityLevel.low:
        return this.getLogsFromFile(this.allLogsPaths);
      case LogSeverityLevel.medium:
        return this.getLogsFromFile(this.mediumLogsPaths);
      case LogSeverityLevel.high:
        return this.getLogsFromFile(this.highLogsPaths);
      default:
        throw new Error(`Invalid severity level: ${severityLevel}`);
    }
  }
}
