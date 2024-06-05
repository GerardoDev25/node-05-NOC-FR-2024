export enum LogSeverityLevel {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

interface LogEntityOptions {
  createAt?: Date;
  message: string;
  level: LogSeverityLevel;
  origin: string;
}

export class LogEntity {
  public createAt: Date;
  public message: string;
  public level: LogSeverityLevel;
  public origin: string;
  constructor(options: LogEntityOptions) {
    const { level, message, origin, createAt = new Date() } = options;

    this.message = message;
    this.level = level;
    this.origin = origin;
    this.createAt = createAt;
  }

  static fromJson(json: string): LogEntity {
    const { message, createAt, level, origin } = JSON.parse(json) as LogEntity;
    const log = new LogEntity({ message, level, origin });
    log.createAt = new Date(createAt);
    return log;
  }
}
