import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { GraphQLISODateTime } from '@nestjs/graphql';

@ObjectType()
export class HotelBooking {
  @Field(() => ID)
  id: number;

  @Field(() => GraphQLISODateTime)
  start_date: Date;

  @Field(() => GraphQLISODateTime)
  end_date: Date;

  @Field(() => Int)
  hotel_id: number;

  @Field()
  is_checked_in: boolean;

  @Field(() => Int)
  price: number;
}
