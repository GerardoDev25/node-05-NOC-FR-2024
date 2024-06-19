import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { PrismaClient } from '@prisma/client';
import { PostgresLogDataSource } from './postgres-log.datasource';

describe('postgres-log.datasource.ts', () => {
  const prismaClient = new PrismaClient();
  const postgresLogDataSource = new PostgresLogDataSource();

  test('should first', () => {
    expect(true).toBe(true);
  });

  const log = new LogEntity({
    level: LogSeverityLevel.medium,
    message: 'test message',
    origin: 'mongo-log.datasource.test.ts',
  });

  beforeAll(async () => {
    await prismaClient.$connect();
  });

  afterEach(async () => {
    await prismaClient.logModel.deleteMany();
  });

  afterAll(async () => {
    prismaClient.$disconnect();
  });
  test('should get logs', async () => {
    await postgresLogDataSource.saveLog(log);
    await postgresLogDataSource.saveLog(log);
    await postgresLogDataSource.saveLog(log);
    const logs = await postgresLogDataSource.getLogs(LogSeverityLevel.medium);

    expect(logs).toHaveLength(3);
    expect(logs[0].level).toBe(LogSeverityLevel.medium.toUpperCase());
    expect(logs[0].message).toBe('test message');
    expect(logs[0].origin).toBe('mongo-log.datasource.test.ts');
    expect(logs[0].createAt).toStrictEqual(expect.any(Date));
  });
});
