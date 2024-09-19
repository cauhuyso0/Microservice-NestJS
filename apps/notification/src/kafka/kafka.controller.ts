import { Body, Controller, Post } from '@nestjs/common';
import { KafkaService } from './kafka.service';

@Controller('kafka')
export class KafkaController {
  constructor(private readonly kafkaService: KafkaService) {}

  @Post('send_mail')
  async sendMail(
    @Body('to') to: string,
    @Body('subject') subject: string,
    @Body('text') text: string,
  ) {
    await this.kafkaService.sendMail({ to, subject, text });
    return 'Email request sent to Kafka';
  }
}
