import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from 'src/typeorm';
import { AlbumsController } from './controllers/albums/albums.controller';
import { AlbumsService } from './services/albums/albums.service';

@Module({
    imports: [TypeOrmModule.forFeature([Album])],
    controllers: [AlbumsController],
    providers: [AlbumsService],
  })
export class AlbumsModule {}
