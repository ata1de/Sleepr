import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { RegisterDto } from './dto/users.dto';
import * as bcrypt from 'bcrypt';

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
      password: await bcrypt.hash(user.password, 10),
    });
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });

    const password_hash = await bcrypt.hash(password, 10);

    if (!user || !(await bcrypt.compare(password, password_hash))) {
      return null;
    }

    return user;
  }
}
