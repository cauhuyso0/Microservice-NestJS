import { Injectable } from '@nestjs/common';
import { MailService } from '../mail/mail.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Injectable()
export class MailConsumerService {
  constructor(private readonly mailService: MailService) {}

  @MessagePattern('send-mail-topic')
  async handleMail(@Payload() message: any) {
    try {
      const mailData = message.value; // Kafka sends data in the `value` property
      console.log(mailData);

      await this.mailService.sendMail(
        mailData.to,
        mailData.subject,
        mailData.text,
      );
    } catch (error) {
      console.log(error);
    }
  }
}
