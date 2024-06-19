import { LogEntity } from '../../entities/log.entity';
import { CheckService } from './check-service';

describe('check-service.ts', () => {
  const mockLogRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const successCallback = jest.fn();
  const errorCallback = jest.fn();

  const checkService = new CheckService(
    mockLogRepository,
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

    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
  });
  test('should return promise callback when fetch return false', async () => {
    const resp = await checkService.execute('https//not_url_valid.com');

    expect(resp).toBe(false);
    expect(successCallback).not.toHaveBeenCalled();
    expect(errorCallback).toHaveBeenCalledTimes(1);

    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
  });
});
