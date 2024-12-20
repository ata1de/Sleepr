import { Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async register(createBodyDto: RegisterDto) {
    return await this.usersService.create(createBodyDto);
  }
}
