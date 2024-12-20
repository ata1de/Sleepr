import { Controller, Post } from '@nestjs/common';
import { RegisterDto } from './users/dto/users.dto';
import { UsersService } from './users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  async register(createBodyDto: RegisterDto) {
    return await this.usersService.create(createBodyDto);
  }
}
