import { EmailService } from '../../../presentation/email/email.service';
import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';

interface SendLogEmailUseCase {
  execute: (to: string | string[]) => Promise<boolean>;
}

export class SendEmailLogs implements SendLogEmailUseCase {
  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository
  ) {}

  async execute(to: string | string[]): Promise<boolean> {
    try {
      const send = await this.emailService.sendEmailWithFileSystemLogs(to);
      if (!send) {
        throw new Error('Email Log was not send');
      }
      const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: 'log email send',
        origin: 'send-email-log.ts',
      });
      this.logRepository.saveLog(log);
      return true;
    } catch (error) {
      const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: 'email not send',
        origin: 'send-email-log.ts',
      });
      this.logRepository.saveLog(log);
      return false;
    }
  }
}
