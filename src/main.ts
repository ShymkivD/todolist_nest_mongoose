import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

import * as passport from "passport";
import cookieParser = require("cookie-parser");
import cookieSession = require("cookie-session");
import flash = require("connect-flash");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.use(cookieParser());

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  await app.listen(3000);
}
bootstrap();
