import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
function applyMiddileWare(app: NestExpressApplication): void {
  app.enableCors();
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  applyMiddileWare(app);

  const options = new DocumentBuilder()
    .setTitle('Client Demo API Document')
    .setDescription('The document about list of API for Client System')
    .setVersion('1.0')
    .setContact(
      'Digitech Solution',
      'https://vndigitech.com',
      'business@digitechglobalco.com',
    )
    .addBasicAuth()
    .addBearerAuth()
    .setBasePath('v1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-doc', app, document);

  await app.listen(process.env.port);
  Logger.log(`
  =============================================

  Server is running on: ${await app.getUrl()}

  =============================================
  `);
}
bootstrap();
