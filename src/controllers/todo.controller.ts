import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  ValidationPipe,
} from "@nestjs/common";
import { TodoService } from "../services/todo.service";
import { Todo } from "../models/todo/todo.interface";
import { TodoDto } from "../models/todo/todo.dto";

import { AuthGuard } from "@nestjs/passport";

@UseGuards(AuthGuard("jwt"))
@Controller("todo")
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(
    @Body(ValidationPipe) createTodoDto: TodoDto,
    @Req() req
  ): Promise<Todo> {
    return this.todoService.create(req.user.userId, createTodoDto);
  }

  @Get()
  async findAll(@Req() req): Promise<Todo[]> {
    return this.todoService.findAll(req.user.userId);
  }

  @Get("findByDate")
  async findAllByDate(@Req() req): Promise<Todo[]> {
    return this.todoService.findAllByDate(req.user.userId);
  }

  @Get(":id")
  async findOneTodo(@Param() params, @Req() req): Promise<Todo> {
    return this.todoService.findOneTodo(params.id, req.user.userId);
  }

  @Delete(":id")
  async removeTodo(@Param() params, @Req() req) {
    await this.todoService.removeTodo(params.id, req.user.userId);
  }

  @Put(":id")
  async updateTodo(
    @Body() newTodo: TodoDto,
    @Param() params,
    @Req() req
  ): Promise<Todo> {
    return await this.todoService.updateTodo(
      newTodo,
      params.id,
      req.user.userId
    );
  }

  @Get(":id/done")
  async markAsDone(@Param() params, @Req() req): Promise<Todo> {
    return await this.todoService.markAsDone(params.id, req.user.userId);
  }
}
