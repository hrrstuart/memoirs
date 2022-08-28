import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { CreateAlbumFollowInput } from './dto/create-album_follow.input';
import { AlbumFollow } from './album_follow.entity';
import { AlbumsService } from 'src/resources/user_created/albums/albums.service';

@Injectable()
export class AlbumFollowService {
  constructor(
    @InjectRepository(AlbumFollow) private followAlbumRepository: Repository<AlbumFollow>,
    @Inject(forwardRef(() => UserService)) private userService: UserService,
    @Inject(forwardRef(() => AlbumsService)) private albumsService: AlbumsService
  ) {}

  create(createFOllowAlbumInput: CreateAlbumFollowInput, followerId: string) {
    const newFollow = this.followAlbumRepository.create({
      followerId,
      ...createFOllowAlbumInput
    });

    return this.followAlbumRepository.save(newFollow);
  }

  findAll() {
    return this.followAlbumRepository.find();
  }

  //  Find all albums a user is following
  findAlbumsFollowing(user_id: string) {
    return this.followAlbumRepository.findBy({
      followerId: user_id
    })
  }

  //  Find all followers of an album
  findFollowers(albumId: string): Promise<AlbumFollow[]> {
    return this.followAlbumRepository.findBy({ albumId });
  }

  getFollower(id: string) {
    return this.userService.findOne("id", id);
  }

  getFollowing(albumId: string) {
    return this.albumsService.findOne(albumId);
  }
}
