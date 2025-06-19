// src/hotel/dto/update-hotel.input.ts
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateHotelInput } from './create-hotel.input';

@InputType()
export class UpdateHotelInput extends PartialType(CreateHotelInput) {
  @Field(() => Int)
  id: number;
}
