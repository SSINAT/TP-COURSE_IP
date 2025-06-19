import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateHotelInput {
  @Field()
  name: string;

  @Field()
  address: string;

  @Field()
  phone: string;
}
