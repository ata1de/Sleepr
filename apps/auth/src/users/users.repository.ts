import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from './models/user.schema';

@Injectable()
export class UsersRepository extends AbstractRepository<Users> {
  protected readonly logger = new Logger(UsersRepository.name);

  constructor(
    @InjectModel(Users.name)
    usersModel: Model<Users>,
  ) {
    super(usersModel);
  }
}
