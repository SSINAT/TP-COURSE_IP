import { Resolver, Query, Mutation, Args, Int, GraphQLISODateTime } from '@nestjs/graphql';
import { HotelBooking } from './hotel-booking.entity';
import { CreateBookingInput } from './create-booking.input';
import { UpdateBookingInput } from './update-booking.input';
import { NotFoundException, BadRequestException } from '@nestjs/common';

@Resolver(() => HotelBooking)
export class HotelBookingResolver {
  private hotelBookings: HotelBooking[] = [
    {
      id: 1,
      start_date: new Date('2025-06-20T10:00:00Z'),
      end_date: new Date('2025-06-22T12:00:00Z'),
      hotel_id: 101,
      is_checked_in: false,
      price: 200,
    },
    {
      id: 2,
      start_date: new Date('2025-06-25T14:00:00Z'),
      end_date: new Date('2025-06-27T11:00:00Z'),
      hotel_id: 102,
      is_checked_in: true,
      price: 300,
    },
  ];

  @Query(() => [HotelBooking])
  async getAllBookings() {
    return this.hotelBookings;
  }

  @Mutation(() => HotelBooking)
  async createBooking(@Args('input') input: CreateBookingInput) {
    const { start_date, end_date, hotel_id, price } = input;

    if (end_date <= start_date) {
      throw new BadRequestException('End date must be after start date');
    }

    const overlapping = this.hotelBookings.some(
      (booking) =>
        booking.hotel_id === hotel_id &&
        booking.start_date <= end_date &&
        booking.end_date >= start_date,
    );
    if (overlapping) {
      throw new BadRequestException(
        'Booking dates overlap with an existing booking',
      );
    }

    const newBooking: HotelBooking = {
      id:
        this.hotelBookings.length > 0
          ? Math.max(...this.hotelBookings.map((b) => b.id)) + 1
          : 1,
      start_date,
      end_date,
      hotel_id,
      is_checked_in: false,
      price,
    };
    this.hotelBookings.push(newBooking);
    return newBooking;
  }

  @Mutation(() => HotelBooking)
  async updateBooking(@Args('input') input: UpdateBookingInput) {
    const index = this.hotelBookings.findIndex((b) => b.id === input.id);
    if (index === -1) {
      throw new NotFoundException('Booking not found');
    }

    if (
      input.start_date &&
      input.end_date &&
      input.end_date <= input.start_date
    ) {
      throw new BadRequestException('End date must be after start date');
    }

    const hotel_id = input.hotel_id ?? this.hotelBookings[index].hotel_id;
    const start_date = input.start_date ?? this.hotelBookings[index].start_date;
    const end_date = input.end_date ?? this.hotelBookings[index].end_date;

    const overlapping = this.hotelBookings.some(
      (booking) =>
        booking.id !== input.id &&
        booking.hotel_id === hotel_id &&
        booking.start_date <= end_date &&
        booking.end_date >= start_date,
    );
    if (overlapping) {
      throw new BadRequestException(
        'Booking dates overlap with an existing booking',
      );
    }

    this.hotelBookings[index] = { ...this.hotelBookings[index], ...input };
    return this.hotelBookings[index];
  }

  @Query(() => [HotelBooking])
  async getBookingsByDateRange(
    @Args('start_date', { type: () => GraphQLISODateTime }) start_date: Date,
    @Args('end_date', { type: () => GraphQLISODateTime }) end_date: Date,
  ) {
    return this.hotelBookings.filter(
      (booking) =>
        booking.start_date <= end_date && booking.end_date >= start_date,
    );
  }

  @Mutation(() => Boolean)
  async cancelBooking(@Args('id', { type: () => Int }) id: number) {
    const bookingIndex = this.hotelBookings.findIndex(
      (booking) => booking.id === id,
    );
    if (bookingIndex === -1) {
      throw new NotFoundException('Booking not found');
    }
    this.hotelBookings.splice(bookingIndex, 1);
    return true;
  }

  @Mutation(() => HotelBooking)
  async checkInBooking(@Args('id', { type: () => Int }) id: number) {
    const bookingIndex = this.hotelBookings.findIndex(
      (booking) => booking.id === id,
    );
    if (bookingIndex === -1) {
      throw new NotFoundException('Booking not found');
    }
    if (this.hotelBookings[bookingIndex].is_checked_in) {
      throw new BadRequestException('Already checked in');
    }
    this.hotelBookings[bookingIndex].is_checked_in = true;
    return this.hotelBookings[bookingIndex];
  }
}
