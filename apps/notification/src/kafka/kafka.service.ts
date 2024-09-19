import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaService implements OnModuleInit {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('send-mail-topic');
    await this.kafkaClient.connect();
  }

  async sendMail(mailData: any) {
    this.kafkaClient.emit('send-mail-topic', mailData);
  }
}
