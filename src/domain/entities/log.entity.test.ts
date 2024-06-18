import { LogEntity, LogSeverityLevel } from './log.entity';

describe('log.entity.ts', () => {
  test('should cerate a LogEntity instance', () => {
    const dataObj = {
      level: LogSeverityLevel.high,
      message: 'message',
      origin: 'log.entity.test.ts',
    };

    const log = new LogEntity(dataObj);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(dataObj.message);
    expect(log.level).toBe(dataObj.level);
    expect(log.origin).toBe(dataObj.origin);
    expect(log.createAt).toBeInstanceOf(Date);
  });

  test('should create an entity fromJson function', () => {
    const json = `{"message":"service https://google.com working","level":"low","origin":"check-service.ts","createAt":"2024-06-13T00:59:30.714Z"}`;

    const log = LogEntity.fromJson(json);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe('service https://google.com working');
    expect(log.level).toBe('low');
    expect(log.origin).toBe('check-service.ts');
    expect(log.createAt).toBeInstanceOf(Date);
  });

  test('should create an entity fromObject function', () => {
    const dataObj = {
      level: LogSeverityLevel.high,
      message: 'message',
      origin: 'log.entity.test.ts',
    };

    const log = LogEntity.fromObject(dataObj);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(dataObj.message);
    expect(log.level).toBe(dataObj.level);
    expect(log.origin).toBe(dataObj.origin);
    expect(log.createAt).toBeInstanceOf(Date);
  });
});
