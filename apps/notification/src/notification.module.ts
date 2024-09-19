// src/notification/notification.module.ts
import { Module } from '@nestjs/common';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [
    MailModule,
    KafkaModule,
    ConfigModule.forRoot({
      envFilePath: './apps/notification/.env',
    }),
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
