import { Controller, Get } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../models/user/user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
}
