import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { HotelService } from './hotel.service';
import { CreateHotelInput } from './dto/create-hotel.input';
import { UpdateHotelInput } from './dto/update-hotel.input';
import { Hotel } from './entities/hotel.entity';

@Resolver(() => Hotel)
export class HotelResolver {
  constructor(private readonly hotelService: HotelService) {}

  @Mutation(() => Hotel)
  async createHotel(
    @Args('createHotelInput') createHotelInput: CreateHotelInput,
  ) {
    return await this.hotelService.create(createHotelInput);
  }

  @Query(() => [Hotel], { name: 'hotels' })
  async findAll() {
    return await this.hotelService.findAll();
  }

  @Query(() => Hotel, { name: 'hotel' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return await this.hotelService.findOne(id);
  }

  @Mutation(() => Hotel)
  async updateHotel(
    @Args('updateHotelInput') updateHotelInput: UpdateHotelInput,
  ) {
    return await this.hotelService.update(
      updateHotelInput.id,
      updateHotelInput,
    );
  }

  @Mutation(() => Boolean)
  async removeHotel(@Args('id', { type: () => Int }) id: number) {
    return await this.hotelService.remove(id);
  }
}
