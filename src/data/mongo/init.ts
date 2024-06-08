import { MongoClient } from 'mongodb';
interface ConnectionOptions {
  mongoUrl: string;
  dbName: string;
}

export class MongoDatabase {
  constructor() {}

  static async connect(options: ConnectionOptions) {
    const { dbName, mongoUrl } = options;

    try {
      const client = await MongoClient.connect(mongoUrl);
      const db = client.db(dbName);

      console.log('MongoDB connected');
      return db;
    } catch (error) {
      console.error('Mongo connection error');
      throw error;
    }
  }
}
