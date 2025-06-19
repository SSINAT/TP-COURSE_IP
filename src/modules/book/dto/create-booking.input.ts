// create-booking.input.ts
import { InputType, Field, Int, Float } from '@nestjs/graphql';

@InputType()
export class CreateBookingInput {
  @Field()
  start_date: Date;

  @Field()
  end_date: Date;

  @Field(() => Int)
  hotel_id: number;

  @Field(() => Float)
  price: number;
}
