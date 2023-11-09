import { Module } from '@nestjs/common';
import { SendEmailService } from './send-email.service';
import { SendEmailController } from './send-email.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { google } from 'googleapis';
@Module({
  controllers: [SendEmailController],
  providers: [SendEmailService],
  imports: [
    ConfigModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const OAuth2 = google.auth.OAuth2;
        const oauth2Client = new OAuth2(
          configService.get('CLIENTEID'),
          configService.get('CLIENTESECRET'),
          'https://developers.google.com/oauthplayground',
        );

        oauth2Client.setCredentials({
          refresh_token: configService.get('REFRESH_TOKEN_GMAIL'),
        });
        const accessToken = (await oauth2Client.getAccessToken()).token;

        return {
          transport: {
            host: configService.get('STMP_HOST'),
            port: configService.get('EMAIL_PORT'),
            secure: true,
            auth: {
              type: 'OAuth2',
              user: 'wsp.clone.arg@gmail.com',
              clientId: configService.get('CLIENTEID'),
              clientSecret: configService.get('CLIENTESECRET'),
              refreshToken: accessToken,
            },
          },
        };
      },
    }),
  ],
})
export class SendEmailModule {}
