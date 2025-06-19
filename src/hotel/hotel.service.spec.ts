import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotel } from './entities/hotel.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HotelService {
  findHotelById(hotel_id: number) {
    throw new Error('Method not implemented.');
  }
  deleteHotel(id: number) {
      throw new Error('Method not implemented.');
  }
  updateHotel(id: number, name: string | undefined, address: string | undefined, phone: string | undefined) {
      throw new Error('Method not implemented.');
  }
  createHotel(name: string, address: string, phone: string) {
      throw new Error('Method not implemented.');
  }
  getAllHotels() {
      throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Hotel)
    private hotelRepo: Repository<Hotel>,
  ) {}

  create(data: Partial<Hotel>) {
    return this.hotelRepo.save(this.hotelRepo.create(data));
  }

  findAll() {
    return this.hotelRepo.find();
  }

  findOne(id: number) {
    return this.hotelRepo.findOneBy({ id });
  }

  update(id: number, data: Partial<Hotel>) {
    return this.hotelRepo.update(id, data);
  }

  remove(id: number) {
    return this.hotelRepo.delete(id);
  }
}
