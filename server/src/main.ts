import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import datasource from './datasource/datasource';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('Datasource isInitialized:', datasource.isInitialized);
  await app.listen(3000);
}
bootstrap();
