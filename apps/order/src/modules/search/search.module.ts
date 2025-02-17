import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { CONFIGURATION } from '../../utilities';

@Module({
  imports: [
    ConfigModule,
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        node: configService.get<string>(CONFIGURATION.ELASTICSEARCH_NODE),
        auth: {
          username: configService.get<string>(
            CONFIGURATION.ELASTICSEARCH_USERNAME,
          ),
          password: configService.get<string>(
            CONFIGURATION.ELASTICSEARCH_PASSWORD,
          ),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [ElasticsearchModule],
})
export class SearchModule {}
