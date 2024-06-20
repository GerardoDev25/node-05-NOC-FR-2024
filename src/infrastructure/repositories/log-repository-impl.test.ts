import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { LogRepositoryImpl } from './log-repository-impl';

describe('log-repository-impl.ts', () => {
  const mockLogDataSource = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const logRepositoryImpl = new LogRepositoryImpl(mockLogDataSource);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('saveLog should call the datasource with arguments', async () => {
    const log = new LogEntity({
      level: LogSeverityLevel.low,
      message: 'test',
      origin: 'log-repository-impl.test.ts',
    });

    await logRepositoryImpl.saveLog(log);

    expect(mockLogDataSource.saveLog).toHaveBeenCalledWith(log);
  });
  test('getLogs should call the datasource with arguments', async () => {
    await logRepositoryImpl.getLogs(LogSeverityLevel.high);

    expect(mockLogDataSource.getLogs).toHaveBeenCalledWith(
      LogSeverityLevel.high
    );
  });
});
