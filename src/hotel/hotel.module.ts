// hotel.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HotelService } from './hotel.service';
import { HotelResolver } from './hotel.resolver';
import { Hotel } from './entities/hotel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hotel])],
  providers: [HotelService, HotelResolver],
  exports: [HotelService],
})
export class HotelModule {}
