import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  Session,
  ValidationPipe,
} from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { UserAuthDto } from "../models/user/user.auth.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Регистрировать пользователей
  @Post("register")
  async register(@Body(ValidationPipe) user: UserAuthDto, @Res() res) {
    const regRes = await this.authService.register(user).then((res) => res);

    if (regRes.msg === "USERNAME IS ALREADY TAKEN")
      return res.status(403).json({
        msg: regRes.msg,
      });
    else
      return res.status(200).json({
        msg: regRes.msg,
      });
  }

  // Авторизировать пользователей
  @Post("login")
  async logIn(
    @Body(ValidationPipe) user: UserAuthDto,
    @Res() res,
    @Req() req,
    @Session() session
  ) {
    const loginRes = await this.authService.logIn(user).then((res) => res);

    if (loginRes.tokenExists) {
      session.token = loginRes.accessToken;
      req.session.token = loginRes.accessToken;
      return res.sendStatus(200);
    } else return res.sendStatus(403);
  }

  @Get("isAuthenticated")
  async isAuthenticated(@Res() res, @Req() req) {
    const JWTValidity = await this.authService.verifyJWT(req.session.token);
    return JWTValidity
      ? res.status(200).json({ bearer: req.session.token })
      : res.sendStatus(403);
  }
}
