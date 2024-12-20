import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reservations } from './models/reservations.schema';

@Injectable()
export class ReservationsRepository extends AbstractRepository<Reservations> {
  protected readonly logger = new Logger(ReservationsRepository.name);

  constructor(
    @InjectModel(Reservations.name)
    reservationModel: Model<Reservations>,
  ) {
    super(reservationModel);
  }
}
