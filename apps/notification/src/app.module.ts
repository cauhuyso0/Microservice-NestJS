import { APPS_NAME, ECommerceLoggerModule } from '@lib/ecommerce-utilities';
import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { NotificationModule } from './modules/notification/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './apps/notification/.env',
    }),
    ECommerceLoggerModule.register(APPS_NAME.NOTIFICATION),
    NotificationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
