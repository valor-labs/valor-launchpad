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
import {PrismaService} from '@valor-launchpad/prisma';

dotenv.config({path: process.cwd() + '/apps/api/.env'});

const RedisStore = connectRedis(expressSession)
const redisClient = redis.createClient({
  url: process.env.REDIS_URL
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
  const whitelist = [
    'http://localhost:4200/',
    'http://localhost:4200',
    'https://valor-launchpad.testadmindomain.xyz/',
    'https://valor-launchpad.testadmindomain.xyz',
    '*',
    undefined,
  ];

  app.enableCors({
    origin: function (origin, callback) {
      console.log(origin);
      if (whitelist.filter((x) => x && x.startsWith(origin))) {
        console.log('The CORS policy for this site allow access from ', origin);
        callback(null, true);
      } else {
        console.log(
          '\n\n\nThe CORS policy for this site does not allow access from ',
          origin,
        );
        callback(
          new Error(
            '\n\n\n\n\n The CORS policy for this site does not allow access from ' +
            origin,
          ),
          false,
        );
      }
    },
    allowedHeaders:
      'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
    methods: 'GET, OPTIONS',
    credentials: true,
    preflightContinue: true,
    optionsSuccessStatus: 200,
  });

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

  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app)

  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
