import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TodoModule } from "./todo/todo.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";

import { CookieSessionMiddleware } from "@nest-middlewares/cookie-session";

import { AuthController } from "./auth/auth.controller";

@Module({
  imports: [
    TodoModule,
    UserModule,
    AuthModule,
    MongooseModule.forRoot(
      "mongodb+srv://todolistUser:Password123@cluster0-rirel.mongodb.net/test?retryWrites=true&w=majority"
    ),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    CookieSessionMiddleware.configure({
      name: "auth",
      keys: ["hello-world"],
      secure: false,
      maxAge: 60 * 60 * 10000,
    });
    consumer.apply(CookieSessionMiddleware).forRoutes(AuthController);
  }
}
