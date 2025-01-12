import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Response } from 'express';
import { CurrentUserDecorator } from './decorators/currentUser.decorator';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LocalGuard } from './guards/local.guard';
import { RegisterDto } from './users/dto/users.dto';
import { UsersService } from './users/users.service';

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

  @UseGuards(JwtAuthGuard)
  @MessagePattern('authenticate')
  async authenticate({ email, password }: { email: string; password: string }) {
    return this.usersService.validateUser(email, password);
  }
}
