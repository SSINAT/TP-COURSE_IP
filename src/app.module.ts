import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

import { TypeOrmModule } from '@nestjs/typeorm';

import { HotelBookingResolver } from './hotel-booking/hotel-booking.resolver';
import { BookResolver } from './modules/book/book.resolver';
import { HotelModule } from './hotel/hotel.module'; // ✅ Import
import { Hotel } from './hotel/entities/hotel.entity';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'hotel.db',
      entities: [Hotel],
      synchronize: true,
    }),
    HotelModule, // ✅ Use module instead of manual registration
  ],
  providers: [BookResolver, HotelBookingResolver],
})
export class AppModule {}
