import { envs } from '../config/plugin/envs.plugin';
import { CheckService } from '../domain/use-cases/checks/check-service';
import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/infrastructure';
import { CronService } from './cron/cron.service';
import { EmailService } from './email/email.service';

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDataSource()
);

export class Server {
  static start() {
    console.log('Server started...');

    // * send email
    // const emailService = new EmailService();
    // emailService.sendEmailWithFileSystemLogs([
    //   envs.MAILER_EMAIL,
    //   'gerardo1234321@gmail.com',
    // ]);

    // * envs
    // console.log(envs);

    // * create logs
    // CronService.createJob('*/5 * * * * *', () => {
    //   // const url = 'http://localhost:3000/posts';
    //   const url = 'https://google.com';
    //   new CheckService(
    //     fileSystemLogRepository,
    //     () => console.log(`${url} is ok`),
    //     (error) => console.error(error)
    //   ).execute(url);
    // });
  }
}
