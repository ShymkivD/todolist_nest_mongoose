import { Module } from '@nestjs/common';
import { TodoService } from "./todo.service";
import { TodoController } from "./todo.controller";
import { MongooseModule } from '@nestjs/mongoose';
import { TodoSchema } from "./todo.schema";
import { UserSchema } from '../user/user.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Todo', schema: TodoSchema }]),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
    ],
    controllers: [TodoController],
    providers: [TodoService]
})
export class TodoModule {}
