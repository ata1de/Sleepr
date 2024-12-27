import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { RegisterDto } from './dto/users.dto';
import * as bcrypt from 'bcrypt';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findOneByEmail(email: string) {
    return this.usersRepository.findOne({ email });
  }

  async create(user: RegisterDto) {
    await this.validateCreateUser(user);

    return this.usersRepository.create({
      ...user,
      role: 'MEMBER',
      password: await bcrypt.hash(user.password, 10),
    });
  }

  async validateCreateUser(user: RegisterDto) {
    const existingUser = await this.findOneByEmail(user.email);

    if (existingUser) {
      throw new UnprocessableEntityException('Invalid Credentials');
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });

    const password_hash = await bcrypt.hash(password, 10);

    if (!user || !(await bcrypt.compare(password, password_hash))) {
      return null;
    }

    return user;
  }

  async getUserById({ id }: GetUserDto) {
    return this.usersRepository.findOne({ _id: id });
  }
}
