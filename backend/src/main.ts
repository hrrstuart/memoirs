import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import { join } from 'path';
import { config } from 'dotenv';
import { AppModule } from './app.module';

config({ path: join(process.cwd(), 'src/.env') })

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: (1000 * 60 * 60 * 24 * 365)
    }
  }))
  await app.listen(3000);
}
bootstrap();
