import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class SendEmailService {
  private readonly logger = new Logger('mailer');
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}
  sendEmail() {
    this.logger.log('send email');
    try {
      this.mailerService.sendMail({
        from: this.configService.get('EMAIL_USER'),
        to: 'tes100t@test.com',
        text: 'welcome',
        subject: 'subject',
      });
    } catch (error) {
      this.logger.error('send email error');
      throw new InternalServerErrorException();
    }
  }
}
