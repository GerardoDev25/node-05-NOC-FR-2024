import { CronService } from './cron/cron-service';

export class Server {
  static start() {
    console.log('Server started...');
    CronService.createJob('*/5 * * * * *', () => {});
  }
}
