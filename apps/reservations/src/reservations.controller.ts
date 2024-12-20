import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsService } from './reservations.service';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get()
  findAll() {
    return this.reservationsService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(id);
  }

  @Put(':id')
  findAndUpdate(
    @Param('id') id: string,
    @Body() updateReservation: UpdateReservationDto,
  ) {
    return this.reservationsService.findAndUpdate(id, updateReservation);
  }

  @Post()
  create(@Body() createReservation: CreateReservationDto) {
    return this.reservationsService.create(createReservation);
  }

  @Delete(':id/delete')
  findAndDelete(@Param('id') id: string) {
    return this.reservationsService.findAndDelete(id);
  }
}
