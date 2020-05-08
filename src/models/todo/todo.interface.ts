import { Document } from "mongoose";

export interface Todo extends Document {
  readonly id: String;
  readonly title: String;
  readonly date: Date;
  readonly done: boolean;
}
