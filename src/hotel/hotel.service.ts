import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hotel } from './entities/hotel.entity';
import { CreateHotelInput } from './dto/create-hotel.input';
import { UpdateHotelInput } from './dto/update-hotel.input';

@Injectable()
export class HotelService {
  constructor(
    @InjectRepository(Hotel)
    private hotelRepository: Repository<Hotel>,
  ) {}

  async create(createHotelInput: CreateHotelInput): Promise<Hotel> {
    const hotel = this.hotelRepository.create(createHotelInput);
    return await this.hotelRepository.save(hotel);
  }

  async findAll(): Promise<Hotel[]> {
    return this.hotelRepository.find();
  }

  async findOne(id: number): Promise<Hotel> {
    const hotel = await this.hotelRepository.findOne({ where: { id } });
    if (!hotel) {
      throw new NotFoundException(`Hotel with id ${id} not found`);
    }
    return hotel;
  }

  async update(id: number, updateHotelInput: UpdateHotelInput): Promise<Hotel> {
    const hotel = await this.hotelRepository.findOne({ where: { id } });
    if (!hotel) {
      throw new NotFoundException(`Hotel with id ${id} not found`);
    }
    Object.assign(hotel, updateHotelInput);
    return this.hotelRepository.save(hotel);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.hotelRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Hotel with id ${id} not found`);
    }
    return true;
  }
}
