import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function configSwagger(
  app: INestApplication,
  version: string,
  appName: string,
  route: string,
  description?: string,
) {
  const config = new DocumentBuilder()
    .setTitle(`E-Commerce ${appName} API`)
    .setDescription(`## The ${appName} ${description ?? 'description'}`)
    .setVersion(version)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(route, app, document);
}
