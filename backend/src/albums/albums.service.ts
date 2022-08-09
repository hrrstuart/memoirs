import { Repository } from 'typeorm';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/posts/post.entity';
import { PostsService } from 'src/posts/posts.service';
import { UserService } from 'src/user/user.service';
import { CreateAlbumInput } from './dto/create-album.input';
import { Album } from './album.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class AlbumsService {
    constructor(
        @InjectRepository(Album) private albumRepository: Repository<Album>,
        @Inject(forwardRef(() => UserService)) private userService: UserService,
        @Inject(forwardRef(() => PostsService)) private postService: PostsService
    ) {}

    create(createAlbumInput: CreateAlbumInput): Promise<Album> {
        const newAlbum = this.albumRepository.create(createAlbumInput);

        return this.albumRepository.save(newAlbum);
    }

    findAll(): Promise<Album[]> {
        return this.albumRepository.find();
    }

    findAllByOwner(user_id: string): Promise<Album[]> {
      return this.albumRepository.findBy({ user_id });
    }

    findOne(id: string): Promise<Album> {
        return this.albumRepository.findOneBy({ id });
    }

    getPosts(album_id: string): Promise<Post[]> {
        return this.postService.findAllByAlbum(album_id);
    }

    getOwner(ownerId: string): Promise<User> {
        return this.userService.findOne(ownerId)
    }
}
