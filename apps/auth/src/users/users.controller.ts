import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CurrentUserDecorator } from '../decorators/currentUser.decorator';
import { User } from './models/user.schema';
import { JwtAuthGuard } from '../guards/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUser(@CurrentUserDecorator() user: User) {
    return user;
  }
}
