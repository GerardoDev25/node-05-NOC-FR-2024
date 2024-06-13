import { envs } from '../config/plugin/envs.plugin';
import { LogSeverityLevel } from '../domain/entities/log.entity';
import { CheckService } from '../domain/use-cases/checks/check-service';
import { CheckServiceMultiple } from '../domain/use-cases/checks/check-service-multiple';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource';
import { MongoLogDataSource } from '../infrastructure/datasources/mongo-log.datasource';
import { PostgresLogDataSource } from '../infrastructure/datasources/postgres-log.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/infrastructure';
import { CronService } from './cron/cron.service';
import { EmailService } from './email/email.service';

const LogRepository = new LogRepositoryImpl(
  // new FileSystemDataSource()
  // new MongoLogDataSource()
  new PostgresLogDataSource()
);
const fsLogRepository = new LogRepositoryImpl(new FileSystemDataSource());
const mongoLogRepository = new LogRepositoryImpl(new MongoLogDataSource());
const postgresLogRepository = new LogRepositoryImpl(
  new PostgresLogDataSource()
);
// const emailService = new EmailService();

export class Server {
  static async start() {
    console.log('Server started...');

    // * send email
    // new SendEmailLogs(emailService, fileSystemLogRepository).execute([
    //   envs.MAILER_EMAIL,
    //   'gerardo1234321@gmail.com',
    // ]);

    // * create logs
    // CronService.createJob('*/5 * * * * *', () => {
    //   // const url = 'http://localhost:3000/posts';
    //   const url = 'https://google.com';
    //   new CheckService(
    //     LogRepository,
    //     () => console.log(`${url} is ok`),
    //     (error) => console.error(error)
    //   ).execute(url);
    // });

    // * multiple checkLos
    
    // CronService.createJob('*/5 * * * * *', () => {
    //   // const url = 'http://localhost:3000/posts';
    //   const url = 'https://google.com';
    //   new CheckServiceMultiple(
    //     [fsLogRepository, mongoLogRepository, postgresLogRepository],
    //     () => console.log(`${url} is ok`),
    //     (error) => console.error(error)
    //   ).execute(url);
    // });

    // const logs = await LogRepository.getLogs(LogSeverityLevel.high);
    // console.log(logs);
  }
}
