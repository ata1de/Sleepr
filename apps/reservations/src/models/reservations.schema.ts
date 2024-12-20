import { AbstractDocument } from '@app/common/database/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class Reservations extends AbstractDocument {
  @Prop({ required: true })
  timestamp: Date;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  placeId: string;

  @Prop({ required: true })
  invoiceId: string;
}

export const ReservationsSchema = SchemaFactory.createForClass(Reservations);
