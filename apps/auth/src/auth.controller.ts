import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { RegisterDto } from './users/dto/users.dto';
import { UsersService } from './users/users.service';
import { LocalGuard } from './guards/local.guard';
import { CurrentUserDecorator } from './decorators/currentUser.decorator';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(LocalGuard)
  @Post('login')
  async register(
    createBodyDto: RegisterDto,
    @CurrentUserDecorator() user,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.usersService.create(createBodyDto);

    res.send(user);
  }
}
