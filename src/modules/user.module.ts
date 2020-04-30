import { Module } from '@nestjs/common';
import { UserService } from "../services/user.service";
import { UserController } from "../controllers/user.controller";
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from "../models/user/user.schema";

@Module({
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {}
