import nodemailer from 'nodemailer';
import { envs } from '../../config/plugin/envs.plugin';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

interface Attachment {
  filename: string;
  path: string;
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  constructor() {}

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { htmlBody, subject, to, attachments = [] } = options;

    try {
      const sendInformation = await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments,
        // from: envs.MAILER_EMAIL,
      });

      const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: 'email send',
        origin: 'email.service.ts',
      });

      return true;
    } catch (error) {
      const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: 'email not send',
        origin: 'email.service.ts',
      });

      return false;
    }
  }

  async sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject = 'server logs ';
    const htmlBody = `
      <h3>Server Logs</h3>
      <p>"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
      "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."
      </p>
      <p>
        <a href="/logs"> See server Logs</a>
      </p>
    `;

    const attachments: Attachment[] = [
      {
        filename: 'logs-all.log',
        path: './logs/logs-all.log',
      },
      {
        filename: 'logs-medium.log',
        path: './logs/logs-medium.log',
      },
      {
        filename: 'logs-high.log',
        path: './logs/logs-high.log',
      },
    ];

    return this.sendEmail({ to, subject, htmlBody, attachments });
  }
}
