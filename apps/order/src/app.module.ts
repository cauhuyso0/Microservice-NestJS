import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { SearchModule } from './modules/search/search.module';
import { OrderModule } from './modules/order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './apps/order/.env',
      isGlobal: true,
    }),
    DatabaseModule.register(),
    SearchModule,
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
