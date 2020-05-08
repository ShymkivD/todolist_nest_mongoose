import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { TodoDto } from "../models/todo/todo.dto";
import { Todo } from "../models/todo/todo.interface";
import { User } from "../models/user/user.interface";

const shortid = require("shortid");

@Injectable()
export class TodoService {
  constructor(@InjectModel("User") private readonly userModel: Model<User>) {}

  // Добавить пункт в todolist
  async create(userId: String, createTodoDto: TodoDto): Promise<Todo> {
    const { title, date, done } = createTodoDto;
    const id = shortid.generate();
    await this.userModel
      .findById(userId)
      .updateOne({ $push: { todos: { title, date, done, id } } });

    return { title, date, done, id };
  }

  async findAll(userId: String): Promise<Todo[]> {
    return await this.userModel.findById(userId, "todos");
  }

  // Получить список пунктов (самые свежие идут первыми)
  async findAllByDate(userId: String): Promise<Todo[]> {
    const { todos } = await this.userModel.findById(userId, "todos");
    return todos.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  async findOneTodo(id: String, userId: String): Promise<Todo> {
    const { todos } = await this.userModel.findById(userId, "todos");
    return todos.filter((todo) => todo.id === id)[0];
  }

  // Удалить пункт с todolist
  async removeTodo(id: String, userId: String): Promise<void> {
    return await this.userModel
      .findById(userId, "todos")
      .updateOne({ $pull: { todos: { id: id } } });
  }

  // Редактировать пункт в todolist
  async updateTodo(todo: TodoDto, id: String, userId: String): Promise<Todo> {
    const { title, date, done } = todo;
    await this.userModel.findByIdAndUpdate(userId).updateOne(
      { "todos.id": id },
      {
        $set: {
          "todos.$.title": title,
          "todos.$.date": date,
          "todos.$.done": done,
        },
      },
      { new: true }
    );
    return { ...todo, id };
  }

  // Выполнить пункт с todolist
  async markAsDone(id: String, userId: String): Promise<Todo> {
    const { todos } = await this.userModel.findById(userId, "todos");
    const todo = todos.filter((todo) => todo.id === id)[0];
    await this.userModel
      .findById(userId, "todos")
      .updateOne(
        { "todos.id": id },
        { $set: { "todos.$.done": !todo.done } },
        { new: true }
      );
    !todo.done;
    return todo;
  }
}
