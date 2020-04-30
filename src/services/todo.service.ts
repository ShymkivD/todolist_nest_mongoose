import {Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {TodoDto} from "../models/todo/todo.dto";
import {Todo} from "../models/todo/todo.interface";
import { User } from '../models/user/user.interface';

const shortid = require('shortid');

@Injectable()
export class TodoService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    // Добавить пункт в todolist
    async create(userId: String, createTodoDto: TodoDto) {
        createTodoDto.id = shortid.generate();
        console.log(createTodoDto.id);
        return await this.userModel.findById(userId).updateOne({ $push: {todos: createTodoDto}});
    }

    async findAll(userId: String): Promise<Todo[]> {
        return await this.userModel.findById(userId, 'todos');
    }

    // Получить список пунктов (самые свежие идут первыми)
    async findAllByDate(userId: String) : Promise<Todo[]> {
        const { todos } = (await this.userModel.findById(userId, 'todos'));
        return todos.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime() );
    }

    // Удалить пункт с todolist
    async removeToDo(id: String, userId: String) {
        return await this.userModel.findById(userId, 'todos').updateOne({ $pull: { 'todos': { id: id } } });
    }

    // Редактировать пункт в todolist
    async changeToDo(todo: TodoDto, id: String, userId: String) : Promise<Todo> {
        console.log(todo);
        return await this.userModel.findByIdAndUpdate(userId,).updateOne({'todos.id': id},
        { $set: {'todos.$.title': todo.title, 'todos.$.date': todo.date, 'todos.$.done': todo.done}}, {new : true});
    }

    // Выполнить пункт с todolist
    async markAsDone(id: String, userId: String) {
        const { todos } = (await this.userModel.findById(userId, 'todos'));
        return await this.userModel.findById(userId, 'todos').updateOne({'todos.id': id}, 
        { $set: { 'todos.$.done': !todos.done } });
    }
}
