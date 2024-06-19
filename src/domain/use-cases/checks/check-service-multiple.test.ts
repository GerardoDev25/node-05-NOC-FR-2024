import { LogEntity } from '../../entities/log.entity';
import { CheckServiceMultiple } from './check-service-multiple';

describe('check-service.ts', () => {
  const mockLogRepository1 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };
  const mockLogRepository2 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };
  const mockLogRepository3 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const successCallback = jest.fn();
  const errorCallback = jest.fn();

  const checkService = new CheckServiceMultiple(
    [mockLogRepository1, mockLogRepository2, mockLogRepository3],
    successCallback,
    errorCallback
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return promise callback when fetch return true', async () => {
    const resp = await checkService.execute('https://google.com');

    expect(resp).toBe(true);
    expect(successCallback).toHaveBeenCalledTimes(1);
    expect(errorCallback).not.toHaveBeenCalled();

    expect(mockLogRepository1.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
    expect(mockLogRepository2.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
    expect(mockLogRepository3.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
  });

  test('should return promise callback when fetch return false', async () => {
    const resp = await checkService.execute('https//not_url_valid.com');

    expect(resp).toBe(false);
    expect(successCallback).not.toHaveBeenCalled();
    expect(errorCallback).toHaveBeenCalledTimes(1);

    expect(mockLogRepository1.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
    expect(mockLogRepository2.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
    expect(mockLogRepository3.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
  });
});
