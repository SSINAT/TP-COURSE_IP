import { InputType, Field, Int } from '@nestjs/graphql';
import { GraphQLISODateTime } from '@nestjs/graphql';

@InputType()
export class CreateBookingInput {
  @Field(() => GraphQLISODateTime)
  start_date: Date;

  @Field(() => GraphQLISODateTime)
  end_date: Date;

  @Field(() => Int)
  hotel_id: number;

  @Field(() => Int)
  price: number;
}
