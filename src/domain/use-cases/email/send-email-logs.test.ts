import { EmailService } from '../../../presentation/email/email.service';
import { LogEntity } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';
import { SendEmailLogs } from './send-email-logs';

describe('send-email-logs.ts', () => {
  const mockEmailService = {
    sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true),
  };

  const mockLogRepository: LogRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const sendEmailLogs = new SendEmailLogs(
    mockEmailService as unknown as EmailService,
    mockLogRepository as LogRepository
  );

  test('should call sendEmail and saveLog', async () => {
    const result = await sendEmailLogs.execute('test@example.com');

    expect(result).toBeTruthy();
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledWith(
      'test@example.com'
    );
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
  });
  
  test('should call sendEmail and saveLog when fail', async () => {

    mockEmailService.sendEmailWithFileSystemLogs.mockReturnValue(false);
    
    
    const result = await sendEmailLogs.execute('test@example.com');

    expect(result).toBeFalsy();
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledWith(
      'test@example.com'
    );
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
  });
});
