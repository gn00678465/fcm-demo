import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import admin, { type ServiceAccount } from 'firebase-admin';
import * as serviceAccount from '../serviceAccount.json';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
  });

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(13000, '0.0.0.0');
}
bootstrap();
