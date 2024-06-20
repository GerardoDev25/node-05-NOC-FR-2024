import nodemailer from 'nodemailer';
import { EmailService, SendMailOptions } from './email.service';

describe('email.service.ts', () => {
  const mockSendMail = jest.fn();
  
  nodemailer.createTransport = mockSendMail.mockReturnValue({
    sendMail: mockSendMail,
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should send email', async () => {
    const emailService = new EmailService();
    const options: SendMailOptions = {
      to: 'test@example.com',
      subject: 'Test email',
      htmlBody: '<p>This is a test email</p>',
    };
    
    await emailService.sendEmail(options);
    
    expect(mockSendMail).toHaveBeenCalledWith({
      to: 'test@example.com',
      subject: 'Test email',
      html: '<p>This is a test email</p>',
      attachments: expect.any(Array),
    });
  });
  
  // todo see this later
  
  // test('should send email with attachments', async () => {
  //   const emailService = new EmailService();
  //   await emailService.sendEmailWithFileSystemLogs('test@example.com');

  //   expect(mockSendMail).toHaveBeenCalledWith({
  //     attachments: [
  //       {
  //         filename: 'logs-all.log',
  //         path: './logs/logs-all.log',
  //       },
  //       {
  //         filename: 'logs-medium.log',
  //         path: './logs/logs-medium.log',
  //       },
  //       {
  //         filename: 'logs-high.log',
  //         path: './logs/logs-high.log',
  //       },
  //     ],
  //     html: '<p>This is a test email</p>',
  //     subject: 'Test email',
  //     to: 'test@example.com',
  //   });
  // });
});
