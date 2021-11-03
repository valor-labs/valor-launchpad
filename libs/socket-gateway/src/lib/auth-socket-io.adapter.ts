import { IoAdapter } from '@nestjs/platform-socket.io';
import { INestApplicationContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ServerOptions } from 'socket.io';

export class AuthSocketIoAdapter extends IoAdapter {
  private readonly jwtService: JwtService;
  constructor(private app: INestApplicationContext) {
    super(app);
    this.jwtService = this.app.get(JwtService);
  }

  createIOServer(port: number, options?: ServerOptions) {
    options.allowRequest = async (request, allowFunction) => {
      const token = request.headers.authorization;
      let verified = false;
      try {
        verified = !!(
          token &&
          token.length > 0 &&
          (await this.jwtService.verify(token))
        );
      } catch (e) {
        verified = false;
      }
      if (verified) {
        return allowFunction(null, true);
      }
      return allowFunction('Unauthorized', false);
    };
    return super.createIOServer(port, options);
  }
}
