import {Body, Controller, Post, Req, UseGuards} from "@nestjs/common";
import {LocalAuthGuard} from "./guards/local-auth-guard";
import {RequestWithSession} from "../common/RequestWithSession";
import {AuthService} from "./auth.service";

@Controller('v1')
export class AuthController {
  constructor(private authService: AuthService) {
  }
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() body, @Req() req: RequestWithSession) {
    const loginResponse = await this.authService.login(body);
    req.session.token = loginResponse.access_token;
    req.session.user = loginResponse.user;
    return await this.authService.login(body);
  }
}
