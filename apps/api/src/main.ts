import * as compression from 'compression';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import { AppModule } from './app/app.module';
import * as dotenv from 'dotenv';
import * as connectRedis from 'connect-redis';
import * as expressSession from 'express-session';
import * as redis from 'redis';
import * as cookieParser from 'cookie-parser';
import { PrismaService } from '@valor-launchpad/prisma';
import { parseDomain, ParseResultType } from 'parse-domain';
import { AuthController } from '@valor-launchpad/auth-api';

dotenv.config({ path: process.cwd() + '/apps/api/.env' });

const RedisStore = connectRedis(expressSession);
const redisClient = redis.createClient({
  url: process.env.REDIS_URL
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const rawBodyBuffer = (req, res, buffer, encoding) => {
    if (!req.headers['stripe-signature']) {
      return;
    }

    if (buffer && buffer.length) {
      req.rawBody = buffer.toString(encoding || 'utf8');
    }
  };

  app.enableCors({
    credentials: true,
    origin: [process.env.HOST]
  });

  app.use(bodyParser.urlencoded({ verify: rawBodyBuffer, extended: true, limit: '50mb' }));
  app.use(bodyParser.json({ verify: rawBodyBuffer, limit: '50mb' }));
  app.use(compression());
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({transform: true}));
  app.use(expressSession({
    store: new RedisStore({ client: redisClient }),
    secret: '12345',
    cookie: { maxAge: 2 * 60 * 60 * 1000 },
    resave: false,
    saveUninitialized: false
  }));
  // app.use('/public', express.static(join(__dirname, '/assets')))

  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);

  // extract domain from `HOST` env
  const hostname = new URL(process.env.HOST).hostname;
  const domainParsedResult = parseDomain(hostname);
  let cookieDomain: string;
  switch (domainParsedResult.type) {
    case ParseResultType.Listed:
      cookieDomain = `${domainParsedResult.domain}.${domainParsedResult.topLevelDomains.join('.')}`;
      break;
    default:
      cookieDomain = hostname;
      break;
  }
  Logger.log(`Will set cookie to domain: ${cookieDomain}`);
  const authController = app.get(AuthController);
  authController.setCookieDomain(cookieDomain);

  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    Logger.log('Allowing CORS requests from: ' + process.env.HOST);
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
