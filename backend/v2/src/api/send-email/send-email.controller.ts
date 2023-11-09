import { Controller, Get } from '@nestjs/common';
import { SendEmailService } from './send-email.service';

@Controller('send-email')
export class SendEmailController {
  constructor(private readonly sendEmailService: SendEmailService) {}

  @Get()
  findAll() {
    return this.sendEmailService.sendEmail();
  }
}
