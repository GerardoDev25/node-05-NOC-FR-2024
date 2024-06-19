import fs from 'node:fs';
import path from 'node:path';
import { FileSystemDataSource } from './file-system.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

describe('file-system.datasource.ts', () => {
  const logPath = path.join(__dirname, '../../../logs');

  beforeEach(() => {
    fs.rmSync(logPath, { recursive: true, force: true });
  });

  test("should create log files if they don't exist", () => {
    new FileSystemDataSource();

    const files = fs.readdirSync(logPath);

    expect(files).toEqual(['logs-all.log', 'logs-high.log', 'logs-medium.log']);
  });

  test('should save a log in logs-all.log', () => {
    const fileSystemDataSource = new FileSystemDataSource();

    const log = new LogEntity({
      message: 'test low',
      level: LogSeverityLevel.low,
      origin: 'file-system.datasource.test.ts',
    });

    fileSystemDataSource.saveLog(log);

    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
    expect(allLogs).toContain(JSON.stringify(log));
  });

  test('should save a log in logs-medium.log', () => {
    const fileSystemDataSource = new FileSystemDataSource();

    const log = new LogEntity({
      message: 'test medium',
      level: LogSeverityLevel.medium,
      origin: 'file-system.datasource.test.ts',
    });

    fileSystemDataSource.saveLog(log);

    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
    const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, 'utf-8');
    expect(allLogs).toContain(JSON.stringify(log));
    expect(mediumLogs).toContain(JSON.stringify(log));
  });

  test('should save a log in logs-high.log', () => {
    const fileSystemDataSource = new FileSystemDataSource();

    const log = new LogEntity({
      message: 'test high',
      level: LogSeverityLevel.high,
      origin: 'file-system.datasource.test.ts',
    });

    fileSystemDataSource.saveLog(log);

    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
    const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, 'utf-8');
    expect(allLogs).toContain(JSON.stringify(log));
    expect(highLogs).toContain(JSON.stringify(log));
  });

  test('should return all log by severity', async () => {
    const fileSystemDataSource = new FileSystemDataSource();

    const logLow = new LogEntity({
      message: 'test low',
      level: LogSeverityLevel.low,
      origin: 'file-system.datasource.test.ts',
    });
    const logMedium = new LogEntity({
      message: 'test medium',
      level: LogSeverityLevel.medium,
      origin: 'file-system.datasource.test.ts',
    });
    const logHigh = new LogEntity({
      message: 'test high',
      level: LogSeverityLevel.high,
      origin: 'file-system.datasource.test.ts',
    });

    fileSystemDataSource.saveLog(logLow);
    fileSystemDataSource.saveLog(logMedium);
    fileSystemDataSource.saveLog(logHigh);

    const lowLogs = await fileSystemDataSource.getLogs(LogSeverityLevel.low);
    const mediumLogs = await fileSystemDataSource.getLogs(
      LogSeverityLevel.medium
    );
    const highLogs = await fileSystemDataSource.getLogs(LogSeverityLevel.high);

    expect(lowLogs).toEqual(
      expect.arrayContaining([logLow, logMedium, logHigh])
    );
    expect(mediumLogs).toEqual(expect.arrayContaining([logMedium]));
    expect(highLogs).toEqual(expect.arrayContaining([logHigh]));
  });

  test('should not throw and error if path exist', () => {
    new FileSystemDataSource();
    new FileSystemDataSource();

    expect(true).toBeTruthy();
  });

  test('should throw and error if severityLevel is not defined', async () => {
    const fileSystemDataSource = new FileSystemDataSource();
    const customSeverityLevel = 'CUSTOM_SEVERITY_LEVEL' as LogSeverityLevel;

    try {
      await fileSystemDataSource.getLogs(customSeverityLevel);
      expect(true).toBeFalsy();
    } catch (error) {
      const errorMessage = `${error}`;

      expect(errorMessage).toBe(
        `Error: Invalid severity level: ${customSeverityLevel}`
      );
    }
  });

  test('should get and empty array if there is no log', async () => {
    const fileSystemDataSource = new FileSystemDataSource();

    const logs = await fileSystemDataSource.getLogs(LogSeverityLevel.low);

    expect(logs).toEqual([]);
  });
});
