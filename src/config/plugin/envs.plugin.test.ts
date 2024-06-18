import { envs } from './envs.plugin';

describe('envs.plugin.test.ts', () => {
  test('should return options', () => {
    expect(envs).toEqual({
      PORT: 3000,
      MAILER_SERVICE: 'gmail',
      MAILER_EMAIL: expect.any(String),
      MAILER_SECRET_KEY: expect.any(String),
      PROD: false,
      MONGO_URL: 'mongodb://gerardo:12345689@localhost:27017/',
      MONGO_DB_NAME: 'NOC-TEST',
      MONGO_USER: 'gerardo',
      MONGO_PASS: '12345689',
    });
  });

  test('should return error if not found env', async () => {
    jest.resetModules();
    process.env.PORT = 'ABC'


    try {
      await import('./envs.plugin');

      expect(true).toBe(false);
    } catch (error) {
      expect(`${error}`).toContain('"PORT" should be a valid integer');
    }
    
  });
});
