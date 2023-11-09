import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class SendEmailService {
  constructor(private readonly mailerService: MailerService) {}
  sendEmail() {
    try {
      this.mailerService.sendMail({
        to: 'motorbreath00@gmail.com',
        text: 'welcome',
        subject: 'subject',
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
