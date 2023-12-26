import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ParsingInterceptor } from './interceptors/parsing.interceptor';
import { HttpExceptionFilter } from './exception/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ParsingInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
