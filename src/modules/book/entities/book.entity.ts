import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Book {
  // Renamed from Booking
  @Field(() => ID)
  id: number;

  @Field()
  title: string;

  @Field()
  author: string;

  @Field(() => Int)
  price: number;
}
