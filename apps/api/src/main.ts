import * as compression from 'compression';
import {Logger, ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import * as bodyParser from 'body-parser'
import {AppModule} from './app/app.module';
import * as dotenv from "dotenv";
import * as connectRedis from 'connect-redis';
import * as expressSession from 'express-session';
import * as redis from 'redis';
import * as cookieParser from 'cookie-parser';

dotenv.config({path: process.cwd() + '/apps/api/.env'});

const RedisStore = connectRedis(expressSession)
const redisClient = redis.createClient({
  host: 'localhost',
  port: 6379,
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const rawBodyBuffer = (req, res, buffer, encoding) => {
    if (!req.headers['stripe-signature']) { return; }

    if (buffer && buffer.length) {
      req.rawBody = buffer.toString(encoding || 'utf8');
    }
  };

  app.use(bodyParser.urlencoded({ verify: rawBodyBuffer, extended: true }));
  app.use(bodyParser.json({ verify: rawBodyBuffer }));

  app.use(compression());
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.use(expressSession({
    store: new RedisStore({client: redisClient}),
    secret: '12345',
    cookie: {maxAge: 2 * 60 * 60 * 1000},
    resave: false,
    saveUninitialized: false,
  }));

  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
