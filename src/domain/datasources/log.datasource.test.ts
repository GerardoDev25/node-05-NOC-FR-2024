import { LogEntity, LogSeverityLevel } from '../entities/log.entity';
import { LogDataSource } from './log.datasource';

describe('log.datasource.ts', () => {
  const newLog = new LogEntity({
    level: LogSeverityLevel.low,
    message: 'test log data source',
    createAt: new Date(),
    origin: 'log.datasource.test.ts',
  });

  class MockLogDataSource implements LogDataSource {
    async saveLog(log: LogEntity): Promise<void> {
      return;
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
      return [newLog];
    }
  }

  test('should test the abstract class', async () => {
    const mockLogDataSource = new MockLogDataSource();

    expect(mockLogDataSource).toBeDefined();
    expect(typeof mockLogDataSource.getLogs).toBe('function');
    expect(typeof mockLogDataSource.saveLog).toBe('function');
    expect(mockLogDataSource).toBeInstanceOf(MockLogDataSource);

    await mockLogDataSource.saveLog(newLog);
    const logs = await mockLogDataSource.getLogs(newLog.level);

    expect(logs).toHaveLength(1);
    expect(logs[0]).toBeInstanceOf(LogEntity);
  });
});
