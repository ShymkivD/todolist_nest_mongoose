import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo/todo.interface';
import { TodoDto } from '../models/todo/todo.dto';

import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() createTodoDto: TodoDto, @Req() req) {
    console.log(createTodoDto);
    this.todoService.create(req.user.userId, createTodoDto);
  }

  @Get()
  async findAll(@Req() req): Promise<Todo[]> {
    return this.todoService.findAll(req.user.userId); 
  }

  @Get('findAllByDate')
  async findAllByDate(@Req() req) : Promise<Todo[]>{
    return this.todoService.findAllByDate(req.user.userId);
  }

  @Delete(':id')
  async removeToDo(@Param() params, @Req() req) {
    await this.todoService.removeToDo(params.id, req.user.userId);
  }

  @Put(':id')
  changeToDoStatus(@Body() newTodo : TodoDto, @Param() params, @Req() req) {
    this.todoService.changeToDo(newTodo, params.id, req.user.userId);
  }

  @Get(':id/done')
  changeTofDoStatus(@Param() params , @Req() req) {
    this.todoService.markAsDone(params.id, req.user.userId);
  }

}
