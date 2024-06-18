import mongoose from 'mongoose';
import { MongoDatabase } from './init';

describe('init mongodb', () => {
  afterAll(async () => {
    await mongoose.disconnect();
  });

  test('should connect to mongoDB', async () => {
    const { MONGO_URL, MONGO_DB_NAME } = process.env;

    const isConnected = await MongoDatabase.connect({
      dbName: MONGO_DB_NAME!,
      mongoUrl: MONGO_URL!,
    });
    expect(isConnected).toBeTruthy();
  });
  test('should throw an error connection', async () => {
    try {
      await MongoDatabase.connect({
        dbName: process.env.MONGO_DB_NAME!,
        mongoUrl: 'mongodb://gerardo:12345689@otherhost:27017/',
      });

      expect(true).toBe(false);
    } catch (error) {}
  });
});
