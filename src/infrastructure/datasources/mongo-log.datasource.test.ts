import mongoose from 'mongoose';
import { MongoDatabase } from '../../data/mongo';
import { LogModel } from '../../data/mongo/models/log.model';
import { MongoLogDataSource } from './mongo-log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

describe('mongo-log.datasource.ts', () => {
  const logDataSource = new MongoLogDataSource();

  const log = new LogEntity({
    level: LogSeverityLevel.medium,
    message: 'test message',
    origin: 'mongo-log.datasource.test.ts',
  });

  beforeAll(async () => {
    await MongoDatabase.connect({
      dbName: process.env.MONGO_DB_NAME!,
      mongoUrl: process.env.MONGO_URL!,
    });
  });

  afterEach(async () => {
    await LogModel.deleteMany();
  });

  afterAll(async () => {
    mongoose.connection.close();
  });

  test('should create a log', async () => {
    const logSpy = jest.spyOn(console, 'log');

    await logDataSource.saveLog(log);

    expect(logSpy).toHaveBeenCalledWith(
      'Mongo log created id: ',
      expect.any(String)
    );
  });

  test('should get Logs', async () => {
    await logDataSource.saveLog(log);
    const logs = await logDataSource.getLogs(LogSeverityLevel.medium);

    expect(logs).toHaveLength(1);
    expect(logs[0].level).toEqual(LogSeverityLevel.medium);
  });
});
