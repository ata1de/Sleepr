import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { FilterQueryDto } from './dto/filter-query.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
  ) {}

  create(createReservation: CreateReservationDto) {
    return this.reservationsRepository.create({
      ...createReservation,
      timestamp: new Date(),
    });
  }

  findOne(_id: string) {
    return this.reservationsRepository.findOne({ _id });
  }

  findAll(filterQuery: FilterQueryDto) {
    return this.reservationsRepository.findAll(filterQuery);
  }

  findAndUpdate(_id: string, updateReservation: UpdateReservationDto) {
    return this.reservationsRepository.findAndUpdate(
      { _id },
      { $set: updateReservation },
    );
  }

  findAndDelete(_id: string) {
    return this.reservationsRepository.findAndDelete({ _id });
  }
}
