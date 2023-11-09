import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { EmailDto } from 'src/common/dto/email.dto';
@Injectable()
export class SendEmailService {
  private readonly logger = new Logger('mailer');
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}
  sendEmail(to: string, text: string, subject: string) {
    this.logger.log('send email');
    try {
      this.mailerService.sendMail({
        from: this.configService.get('EMAIL_USER'),
        to,
        text,
        subject,
      });
    } catch (error) {
      this.logger.error('send email error');
      throw new InternalServerErrorException();
    }
  }

  userCreationEmail(emailDto: EmailDto) {
    const { email } = emailDto;
    return this.sendEmail(email, 'Bienvenido', 'Bienvenido');
  }
}
