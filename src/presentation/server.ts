import { CronJob } from 'cron';

export class Server {
  static start() {
    console.log('Server started...');
    const job = new CronJob('*/2 * * * * *', () => {
      const date = new Date();
      console.log(date);
    });
    job.start()
  }
}
