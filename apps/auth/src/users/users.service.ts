import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { RegisterDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findOneByEmail(email: string) {
    return this.usersRepository.findOne({ email });
  }

  async create(user: RegisterDto) {
    return this.usersRepository.create({
      ...user,
      role: 'MEMBER',
    });
  }
}
