export enum LogSeverityLevel {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export class LogEntity {
  public createAt: Date;

  constructor(public message: string, public level: LogSeverityLevel) {
    this.createAt = new Date();
  }

  static fromJson(json: string): LogEntity {
    const { message, createAt, level } = JSON.parse(json) as LogEntity;
    const log = new LogEntity(message, level);
    log.createAt = new Date(createAt);
    return log;
  }
}
