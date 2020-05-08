import { Matches, MinLength, IsString, MaxLength } from "class-validator";

export class UserAuthDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  readonly username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  readonly password: string;
}
