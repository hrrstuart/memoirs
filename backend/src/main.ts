import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import { join } from 'path';
import * as passport from 'passport';
import { config } from 'dotenv';
import { TypeormStore } from 'connect-typeorm'
import { getRepositoryToken } from '@nestjs/typeorm';

import { AppModule } from './app.module';
import { SessionEntity } from './typeorm';

config({ path: join(process.cwd(), 'src/.env') })

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const sessionRepository = app.get(getRepositoryToken(SessionEntity), {
    strict: false
  })
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: (1000 * 60 * 60 * 24 * 365)
    },
    store: new TypeormStore().connect(sessionRepository)
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000);
}
bootstrap();
