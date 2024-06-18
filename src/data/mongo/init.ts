import mongoose from 'mongoose';
interface ConnectionOptions {
  mongoUrl: string;
  dbName: string;
}

export class MongoDatabase {
  constructor() {}

  static async connect(options: ConnectionOptions) {
    const { dbName, mongoUrl } = options;

    try {
      await mongoose.connect(mongoUrl, {
        dbName,
      });

      // console.log('MongoDB connected');
      return true;
    } catch (error) {
      // console.error('Mongo connection error');
      throw error;
    }
  }
}
