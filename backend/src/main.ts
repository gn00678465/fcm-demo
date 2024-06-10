import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import admin, { type ServiceAccount } from 'firebase-admin';
import * as serviceAccount from '../serviceAccount.json';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
  });

  await app.listen(3000);
}
bootstrap();
