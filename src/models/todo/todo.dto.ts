import * as mongoose from 'mongoose';
export class TodoDto {
  id: string;
  readonly title: string;
  readonly date: Date;
  readonly done: boolean;
}
