export enum LogSeverityLevel {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export class LogEntity {
  constructor(
    public level: LogSeverityLevel,
    public message: string,
    public createAt: Date = new Date()
  ) {}
}
