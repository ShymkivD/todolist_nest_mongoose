import { IsNotEmpty, IsBoolean } from "class-validator";
export class TodoDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly date: Date;

  @IsBoolean()
  readonly done: boolean;
}
