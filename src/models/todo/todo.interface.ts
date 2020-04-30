import { Document } from 'mongoose';

export interface Todo extends Document {
  readonly id: string;
  readonly title: string;
  readonly date: Date;
  readonly done: boolean;
}
